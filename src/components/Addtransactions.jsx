import React, { useEffect, useState } from "react";
import "../styles/addtransactions.css";
import moneypig2 from "../images/moneypig.svg";
import party from "party-js";
import expend from "../images/expend.svg"

import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";

import { useSelector } from 'react-redux';

const Addtransactions = () => {

    const [swi, setSwi] = useState(true);
    const [popup, setPopup] = useState(false);

    const [user, setUser] = useState([]);

    const [category, setCategory] = useState("Dropdown Button");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState("");

    const [numberError, setNumberError] = useState(false);

    function isNumeric(str) {
        console.log(str)
        return /^[0-9]+$/.test(str);
    }

    const substituteData = useSelector(state => state);
    const email = substituteData.email;
    const avatarid = substituteData.avatarid;

    const usersCollectionRef = collection(db, "userdetails");

    useEffect(() => {

        onSnapshot(usersCollectionRef, (snapshot) => {
            const users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })

            setUser(
                users.filter((ui, index) => {
                    return (ui.username === substituteData.username);
                })
            )
        });

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPopup(false);
        }, 2000);
        return () => clearInterval(interval);
    }, [popup === true]);


    const submitTransaction = () => {

        if (!isNumeric(amount)) {
            setNumberError(true);
            return;
        }

        const date = new Date();
        const form = {
            category,
            reason,
            amount,
            type: (swi ? "expenditure" : "income"),
            fulldate: date,
            day: date.getDay(),
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }

        setPopup(true);
        party.confetti(
            document.querySelector(".add-transaction-btn"),
            {
                count: party.variation.range(20, 40)
            }
        );

        let arr = user[0].transactions;
        arr.unshift(form);
        const updateOBJ = {
            transactions: arr,
            avatarid: user[0].avatarid,
            email: user[0].email,
            position: user[0].position,
            username: user[0].username,
        }
        console.log(updateOBJ)
        setDoc(doc(db, 'userdetails', user[0].id), updateOBJ)

        setCategory("Dropdown Button");
        setReason("");
        setAmount("");
    }

    return (
        <>
            <div className="mouse600 flexy page-headings my-5 page-headings">Add Transactions</div>

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
                                        <li className="dropdown-item" onClick={() => { setCategory("Education") }}>Education</li>
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
                                {(
                                    numberError &&
                                    <div class="alert alert-danger d-flex align-items-center my-2" role="alert">
                                        <i class="check icon mb-2"></i>
                                        <div>
                                            Please use only numbers
                                        </div>
                                    </div>
                                )}
                                <input
                                    onChange={(event) => { 
                                        setAmount(event.target.value);
                                        setNumberError(false); 
                                    }}
                                    placeholder="Add Amount"
                                    value={amount} type="text" className="index-form form-control" />
                            </div>

                            <div className="flexy">
                                {
                                    (category !== "Dropdown Button" && reason !== "" && amount !== "") ?
                                        <button
                                            onClick={() => {
                                                submitTransaction();
                                            }}
                                            className="button add-transaction-btn text-dark curvy-btn ui mt-4"
                                        >
                                            Add
                                        </button> :
                                        <button
                                            disabled
                                            onClick={() => {
                                                submitTransaction();
                                            }}
                                            className="button add-transaction-btn text-dark curvy-btn ui mt-4"
                                        >
                                            Add
                                        </button>
                                }
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
                                {(
                                    numberError &&
                                    <div class="alert alert-danger d-flex align-items-center my-2" role="alert">
                                        <i class="x icon mb-2 me-2"></i>
                                        <div>
                                            Please use only numbers
                                        </div>
                                    </div>
                                )}
                                <input
                                    onChange={(event) => { 
                                        setAmount(event.target.value);
                                        setNumberError(false); 
                                    }}
                                    placeholder="Add Amount"
                                    value={amount} type="text" className="index-form form-control" />
                            </div>

                            <div className="flexy">
                                {
                                    (category !== "Dropdown Button" && reason !== "" && amount !== "") ?
                                        <button
                                            onClick={() => {
                                                submitTransaction();
                                            }}
                                            className="button add-transaction-btn text-dark curvy-btn ui mt-4"
                                        >
                                            Add
                                        </button> :
                                        <button
                                            disabled
                                            onClick={() => {
                                                submitTransaction();
                                            }}
                                            className="button add-transaction-btn text-dark curvy-btn ui mt-4"
                                        >
                                            Add
                                        </button>
                                }
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