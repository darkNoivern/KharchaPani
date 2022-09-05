import React, { useEffect, useState } from "react";
import "../styles/addtransactions.css";
import moneypig2 from "../images/moneypig2.svg";
import party from "party-js";

const Addtransactions = () => {
  const [swi, setSwi] = useState(true);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPopup(false);
    }, 3000);
    return () => clearInterval(interval);
  }, [popup === true]);

  return (
    <>
      <div className="mouse400 flexy">Add Transactions</div>

      <div className="container-fluid mt-4 question-box px-lg-5 px-3 mouse400">
        <div class="ui top attached tabular question-discuss-border menu">
          <span
            onClick={() => {
              setSwi(true);
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
          {swi === true ? (
            <>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Reason
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Price
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Category
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="flexy">
                <button
                  onClick={() => {
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
          ) : (
            <>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Reason
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Price
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="mt-4">
                <label
                  htmlFor=""
                  className="d-flex justify-content-start form-label"
                >
                  Category
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="flexy">

                <button
                  onClick={() => {
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
          <img alt="" className="popup-img" src={moneypig2} />
        </div>
      )}
    </>
  );
};

export default Addtransactions;
