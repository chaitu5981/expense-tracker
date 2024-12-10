import React, { useContext, useEffect, useRef, useState } from "react";
import "./Transactions.css";
import { ExpenseContext } from "./App";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import Modal from "./Modal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoPizzaOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { LuLuggage } from "react-icons/lu";
const categoryIcons = [<IoPizzaOutline />, <GoGift />, <LuLuggage />];
const Transactions = () => {
  const { expenses } = useContext(ExpenseContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagedExpenses, setPagedExpenses] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);
  const leftRef = useRef();
  const rightRef = useRef();
  useEffect(() => {
    let n = expenses.length;
    if (n % 4 === 0) setNoOfPages(n / 4);
    else setNoOfPages(Math.floor(n / 4) + 1);
    let i = 0;
    let pagedExpenses1 = [];
    while (i + 4 < n) {
      pagedExpenses1.push(expenses.slice(i, i + 4));
      i = i + 4;
    }
    if (i < n) pagedExpenses1.push(expenses.slice(i, n));
    setPagedExpenses(pagedExpenses1);
  }, [expenses]);
  useEffect(() => {
    if (currentPage === 0) leftRef.current.disabled = true;
    else leftRef.current.disabled = false;
    if (currentPage === noOfPages - 1) rightRef.current.disabled = true;
    else rightRef.current.disabled = false;
  }, [currentPage, noOfPages]);
  const gotoNextPage = () => {
    if (currentPage < noOfPages - 1) setCurrentPage(currentPage + 1);
  };
  const gotoPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="transactions">
      <h3>Recent Transactions</h3>
      <div className="table-container">
        <Table expensePage={pagedExpenses[currentPage]} />
        <div className="pages">
          <button className="arrow-btn" onClick={gotoPrevPage} ref={leftRef}>
            <FaArrowLeft />
          </button>
          <div className="page">{currentPage + 1}</div>
          <button className="arrow-btn" onClick={gotoNextPage} ref={rightRef}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

const Table = ({ expensePage }) => {
  return (
    <div className="table">
      {expensePage?.map((exp) => (
        <Transaction key={exp.id} expense={exp} />
      ))}
    </div>
  );
};

const Transaction = ({ expense }) => {
  const { id, title, price, date, category } = expense;
  const { categories } = useContext(ExpenseContext);
  const { expenses, setExpenses, balance, setBalance } =
    useContext(ExpenseContext);

  const [isOpen, setIsOpen] = useState(false);
  const formatDate = (date) => {
    if (!date) return "";
    const date1 = new Date(date);
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date1
    );
    const year = date1.getFullYear();
    const day = date1.getDate();
    return `${month} ${day},${year}`;
  };
  const deleteExpense = () => {
    const oldExpense = expenses.find((exp) => exp.id === id);
    setBalance(balance + oldExpense.price);
    const expenses1 = expenses.filter((exp) => exp.id !== id);
    setExpenses(expenses1);
  };
  return (
    <div className="transaction">
      <div className="category-icon">
        {categoryIcons[categories.indexOf(category)]}
      </div>
      <div className="title-box">
        <p className="title">{title}</p>
        <p className="date-display">{formatDate(date)}</p>
      </div>
      <p className="price-display">₹{price}</p>
      <button className="delete-btn btn1" onClick={() => deleteExpense(id)}>
        <TiDeleteOutline />
      </button>
      <button className="edit-btn btn1" onClick={() => setIsOpen(true)}>
        <FiEdit2 />
      </button>
      <Modal
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        type="update-bal"
        id={id}
      />
    </div>
  );
};
export default Transactions;
