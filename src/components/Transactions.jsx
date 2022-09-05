import React from "react";
import "../styles/transactions.css";
import AnimatedNumber from "animated-number-react";
import rupeebutton from "../images/rupeebutton.svg";
import { NavLink, Link } from "react-router-dom";

const Transactions = () => {
  const formatValue = (value) => {
    return `₹ ${value.toFixed(0)}`;
  };

  const arr = [
    {
      type: "expenditure",
      category: "Grocery",
      item: "4 Eggs",
      price: 50,
      color: "success"
    },
    {
      type: "expenditure",
      category: "Bill",
      item: "Electricity Bill",
      price: 13000,
      color: "cyan"
    },
    {
      type: "income",
      category: "Salary",
      item: "Monthly Salary",
      price: 120000,
      color: "violet"
    },
    {
      type: "expenditure",
      category: "Grocery",
      item: "Milk",
      price: 30,
      color: "success"
    },
    {
      type: "income",
      category: "Others",
      item: "Dream 11",
      price: 1500,
      color: "secondary"
    }
  ];

  return (
    <>
      <div className="mouse400 my-5 flexy">Balance</div>

      <div className="row mx-0">
        <div className="col col-6 mouse400 flexy">
          <div className="curr-balance flexy">
            <div>
              <div>Income</div>
              <div className="mt-4">
                <AnimatedNumber
                  component={"text"}
                  className={`animate-amount mouse600`}
                  value={71000}
                  duration={1000}
                  formatValue={formatValue}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col col-6 mouse400 flexy">
          <div className="curr-balance flexy">
            <div>
              <div>Current Balance</div>
              <div className="mt-4">
                <AnimatedNumber
                  component={"text"}
                  className={`animate-amount mouse600`}
                  value={47000}
                  duration={1000}
                  formatValue={formatValue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
    
     */}

      <div className="mouse400 flexy my-5">
        {/* Transactions */}
        September 2022
      </div>

      <div className="transactions-div row mx-0">
        {arr.map((lotpot, index) => {
          return (
            <>
              <div className="col col-12 flexy my-3">
                <div className="transaction-ui mouse400 d-flex justify-content-center">
                  <div className="full-width">
                    <div className="category-class d-flex justify-content-end py-1 pe-2">
                      <div className="category-style flexy py-1 px-2">
                        <div
                          className={`pokemon-tag bg-${lotpot.color} me-1`}
                        ></div>
                        <div>{lotpot.category}</div>
                      </div>
                    </div>
                    <div className="row mx-0 py-2">
                      <div className="col col-8">{lotpot.item}</div>
                      <div className="col col-4">₹{lotpot.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <Link exact to="/add">
        <img alt="" className="AddTransactionButton" src={rupeebutton} />
      </Link>
    </>
  );
};

export default Transactions;
