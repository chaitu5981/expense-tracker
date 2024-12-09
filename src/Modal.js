import React, { useContext, useState } from "react";
import "./Modal.css";
import ReactModal from "react-modal";
import { ExpenseContext } from "./App";
import { enqueueSnackbar } from "notistack";
const Modal = ({ isOpen, close, type, id }) => {
  const { balance, setBalance } = useContext(ExpenseContext);

  const [income, setIncome] = useState();

  const handleAddIncome = () => {
    if (!Number(income))
      return enqueueSnackbar("Enter valid income", { variant: "error" });
    setBalance(balance + Number(income));
    enqueueSnackbar("Wallet balance updated", { variant: "success" });
    close();
  };

  if (type === "add-bal")
    return (
      <ReactModal isOpen={isOpen} className="modal" contentLabel="Add Balance">
        <h3>Add Balance</h3>
        <div className="modal-form">
          <input
            type="text"
            placeholder="Income Amount"
            className="input"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <button
            className="add-balance-btn modal-btn"
            onClick={handleAddIncome}
          >
            Add Balance
          </button>
          <button onClick={close} className="cancel-btn">
            Cancel
          </button>
        </div>
      </ReactModal>
    );
  else
    return (
      <ReactModal isOpen={isOpen} className="modal" contentLabel="Add Balance">
        <h3>Add Expenses</h3>
        {!id ? (
          <ExpenseForm isOpen={isOpen} close={close} btnTitle="Add Expense" />
        ) : (
          <ExpenseForm
            isOpen={isOpen}
            close={close}
            id={id}
            btnTitle="Update Expense"
          />
        )}
      </ReactModal>
    );
};

const ExpenseForm = ({ isOpen, close, btnTitle, id }) => {
  const defaultExpense = {
    title: "",
    price: "",
    category: "",
    date: "",
    id: "",
  };
  const { expenses, setExpenses, categories, balance, setBalance } =
    useContext(ExpenseContext);

  const [expense, setExpense] = useState(() => {
    return id ? expenses.find((exp) => exp.id === id) : defaultExpense;
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };
  const validate = (expense) => {
    const { title, price, category, date } = expense;
    if (!title) {
      enqueueSnackbar("Title is required", { variant: "error" });
      return false;
    }
    if (!Number(price)) {
      enqueueSnackbar("Enter valid price", { variant: "error" });
      return false;
    }
    if (!category) {
      enqueueSnackbar("Category is required", { variant: "error" });
      return false;
    }
    if (!date) {
      enqueueSnackbar("Date is required", { variant: "error" });
      return false;
    }

    return true;
  };
  const addExpense = () => {
    const { title, price, category, date } = expense;
    if (!validate(expense)) return;
    if (Number(price) > balance)
      return enqueueSnackbar("Expense is greater than wallet balance", {
        variant: "error",
      });
    const price1 = Number(price);
    const date1 = new Date(date);
    setExpenses([
      ...expenses,
      {
        title,
        price: price1,
        category,
        date: date1,
        id: Math.floor(Math.random() * 1000),
      },
    ]);
    setBalance(balance - price);
    enqueueSnackbar("Expense added", { variant: "success" });
    setExpense(defaultExpense);
    close();
  };

  const updateExpense = (id) => {
    const { title, price, category, date } = expense;
    if (!validate(expense)) return;
    const price1 = Number(price);
    const date1 = new Date(date);
    let expenses1 = expenses;
    let oldExpense = expenses1.find((exp) => exp.id === id);
    if (price1 > balance + oldExpense.price)
      return enqueueSnackbar("Wallet balance is less", {
        variant: "error",
      });
    setBalance(balance + oldExpense.price - price);
    oldExpense.price = price1;
    oldExpense.title = title;
    oldExpense.category = category;
    oldExpense.date = date1;
    setExpenses(expenses1);
    close();
  };
  return (
    <div className="modal-form">
      <input
        type="text"
        placeholder="Title"
        className="input"
        value={expense.title}
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Price"
        onChange={handleChange}
        className="input"
        name="price"
        value={expense?.price}
      />
      <select
        className="select"
        placeholder="Select Category"
        name="category"
        onChange={handleChange}
        value={expense?.category}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option value={c} key={c}>
            {c.slice(0, 1).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>
      <input
        type="date"
        className="input date"
        name="date"
        value={
          expense.date ? new Date(expense.date).toISOString().split("T")[0] : ""
        }
        onChange={handleChange}
      />
      <button
        className="modal-btn"
        onClick={() => {
          id ? updateExpense(id) : addExpense();
        }}
      >
        {btnTitle}
      </button>
      <button
        onClick={() => {
          close();
          setExpense(defaultExpense);
        }}
        className="cancel-btn"
      >
        Cancel
      </button>
    </div>
  );
};
export default Modal;
