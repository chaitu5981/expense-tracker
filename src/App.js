import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import Summary from "./Summary";
import Transactions from "./Transactions";
import TopExpenses from "./TopExpenses";
const categories = ["food", "entertainment", "travel"];

export const ExpenseContext = createContext();
const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const fetchedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (fetchedExpenses) return fetchedExpenses;
    else return [];
  });
  const [balance, setBalance] = useState(() => {
    const fetchedBalance = localStorage.getItem("balance");
    if (fetchedBalance === null) return 5000;
    else return JSON.parse(fetchedBalance);
  });
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  useEffect(() => {
    const data = categories.map((c) => {
      const value = expenses
        .filter((e) => e.category === c)
        .reduce((acc, e) => acc + e.price, 0);
      return { name: c.slice(0, 1).toUpperCase() + c.slice(1), value };
    });
    setChartData(data);
  }, [expenses]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        balance,
        setBalance,
        categories,
        chartData,
        setChartData,
      }}
    >
      <div className="container">
        <div className="tracker">
          <h1>Expense Tracker</h1>
          <Summary />
          <div className="details">
            <Transactions />
            <TopExpenses />
          </div>
        </div>
      </div>
    </ExpenseContext.Provider>
  );
};

export default App;
