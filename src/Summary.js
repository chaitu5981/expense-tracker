import React, { useContext, useState } from "react";
import "./Summary.css";
import { ExpenseContext } from "./App";
import Modal from "./Modal";
import PieChart from "./PieChart";

const Summary = () => {
  const { expenses, balance } = useContext(ExpenseContext);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const getTotalExpenses = () => {
    if (expenses.length === 0) return 0;
    return expenses?.reduce((acc, exp) => acc + exp.price, 0);
  };
  return (
    <div className="summary">
      <div className="text-summary">
        <div className="wallet">
          <h3 className="">
            Wallet Balance : <span className="balance">{balance}</span>
          </h3>
          <button
            className="add-income-btn"
            onClick={() => {
              setShowModal(true);
              setModalType("add-bal");
            }}
          >
            + Add Income
          </button>
        </div>
        <div className="expenses-total">
          <h3>
            Expenses : <span className="total">{getTotalExpenses()}</span>
          </h3>
          <button
            className="add-expense-btn"
            onClick={() => {
              setShowModal(true);
              setModalType("add-exp");
            }}
          >
            +Add Expense
          </button>
        </div>
      </div>
      <div className="pie-chart">
        <PieChart />
      </div>
      <Modal
        isOpen={showModal}
        close={() => setShowModal(false)}
        type={modalType}
      />
    </div>
  );
};

export default Summary;
