import React, { useEffect, useState } from "react";
import "../styles/addtransactions.css";
import moneypig2 from "../images/moneypig.svg";
import party from "party-js";
import expend from "../images/expend.svg"

const Addtransactions = () => {

  const [swi, setSwi] = useState(true);
  const [popup, setPopup] = useState(false);
  const [category, setCategory] = useState("Dropdown Button");

  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setPopup(false);
    }, 3000);
    return () => clearInterval(interval);
  }, [popup === true]);

  return (
    <>
      <div className="mouse600 flexy page-headings my-4">Add Transactions</div>

      <div className="container-fluid mt-4 question-box px-lg-5 px-3 mouse400">
        <div class="ui top attached tabular question-discuss-border menu">
          <span
            onClick={() => {
              setSwi(true);
              setCategory("Dropdown Button");
              setReason("");
              setAmount("");
              setPopup(false);
            }}
            className={
              swi === true
                ? `discuss-active tabular-button item active`
                : `discuss-active mouse600 tabular-button item`
            }
          >
            Expenditure
          </span>
          <span
            onClick={() => {
              setSwi(false);
              setCategory("Dropdown Button");
              setReason("");
              setAmount("");
              setPopup(false);
            }}
            className={
              swi === false
                ? `discuss-active mouse600 tabular-button item active`
                : `discuss-active mouse600 tabular-button item`
            }
          >
            Income
          </span>
        </div>


        <div className="ui attached segment">

          
            {/* popup && (
              <div class="alert alert-success d-flex align-items-center my-2 mx-2" role="alert">
                <i class="check icon mb-2"></i>
                <div>
                  Transaction Added
                </div>
              </div>
            ) */}
          

          {swi === true ? (
            <>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Category
                </label>
                <div class="dropdown">
                  <button class="button ui basic dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {category}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li className="dropdown-item" onClick={() => { setCategory("Groceries") }}>Groceries</li>
                    <li className="dropdown-item" onClick={() => { setCategory("Bills") }}>Bills</li>
                    <li className="dropdown-item" onClick={() => { setCategory("Entertainment") }}>Entertainment</li>
                    <li className="dropdown-item" onClick={() => { setCategory("Insurance & EMIs") }}>Insurance & EMIs</li>
                    <li className="dropdown-item" onClick={() => { setCategory("Educations") }}>Education</li>
                    <li className="dropdown-item" onClick={() => { setCategory("Shopping") }}>Shopping</li>
                    <li className="dropdown-item" onClick={() => { setCategory("Household Needs") }}>Household Needs</li>
                    <li className="dropdown-item" onClick={() => { setCategory("Others") }}>Others</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Reason
                </label>
                <input
                  onChange={(event) => { setReason(event.target.value) }}
                  placeholder="Add Details"
                  value={reason} type="text"
                  className="index-form form-control" />
              </div>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Amount
                </label>
                <input
                  onChange={(event) => { setAmount(event.target.value) }}
                  placeholder="Add Amount"
                  value={amount} type="text" className="index-form form-control" />
              </div>

              <div className="flexy">
                <button
                  onClick={() => {
                    setCategory("Dropdown Button");
                    setAmount("");
                    setReason("");
                    setPopup(true);
                    // party.confetti(
                    //   document.querySelector(".add-transaction-btn"),
                    //   {
                    //     count: party.variation.range(20, 40)
                    //   }
                    // );
                  }}
                  className="button add-transaction-btn text-dark curvy-btn ui mt-4"
                >
                  Add
                </button>
              </div>
            </>
          ) : (
            <>


              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Category
                </label>
                <div class="dropdown">
                  <button class="button ui basic dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {category}
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li className="dropdown-item" onClick={() => { setCategory("Salary") }}>Salary</li>
                    <li className="dropdown-item" onClick={() => { setCategory("Others") }}>Others</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Reason
                </label>
                <input
                  onChange={(event) => { setReason(event.target.value) }}
                  placeholder="Add Details"
                  value={reason} type="text"
                  className="index-form form-control" />
              </div>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Amount
                </label>
                <input
                  onChange={(event) => { setAmount(event.target.value) }}
                  placeholder="Add Amount"
                  value={amount} type="text" className="index-form form-control" />
              </div>

              <div className="flexy">

                <button
                  onClick={() => {
                    setCategory("Dropdown Button");
                    setAmount("");
                    setReason("");
                    setPopup(true);
                    party.confetti(
                      document.querySelector(".add-transaction-btn"),
                      {
                        count: party.variation.range(20, 40)
                      }
                    );
                  }}
                  className="button add-transaction-btn text-dark curvy-btn ui mt-4"
                >
                  Add
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {popup && (
        <div className="popup flexy">
          <img alt="" className="popup-img" src={swi === true ? expend : moneypig2} />
        </div>
      )}


    </>
  );
};

export default Addtransactions;