import React from "react";
import "../styles/transactions.css";
import AnimatedNumber from "animated-number-react";
import rupeebutton from "../images/rupeebutton.svg";
import { NavLink, Link } from "react-router-dom";
import { useEffect } from "react";

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
import { useState } from "react";
import { useSelector } from "react-redux";

const Transactions = () => {

    const substituteData = useSelector(state => state);

    const [income, setIncome] = useState(0);
    const [expenditure, setExpenditure] = useState(0);

    const formatValue = (value) => {
        return `₹ ${value.toFixed(0)}`;
    };

    const [user, setUser] = useState([]);
    const [transaction, setTransaction] = useState([]);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novermber", "December"];

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
                    return (ui.username == substituteData.username);
                })
            )
        });
    }, []);

    useEffect(() => {
        if (user.length > 0) {
            console.log(user[0].transactions)
            setTransaction(user[0].transactions)
            const arr = new Array(2).fill(0);
            user[0].transactions.forEach((transaction, index) => {
                if (transaction.type === "income") {
                    arr[0] += (parseInt(transaction.amount));
                }
                else {
                    arr[1] += (parseInt(transaction.amount));
                }
            })
            setIncome(arr[0]);
            setExpenditure(arr[1]);
        }
    }, [user])

    return (
        <>
            <div className="mouse400 my-5 flexy page-headings">Balance</div>

            <div className="row mx-0 mb-5">
                <div className="col col-6 mouse400 flexy">
                    <div className="curr-balance border-r-success flexy">
                        <div>
                            <div className="text-center">Income</div>
                            <div className="mt-4">
                                <AnimatedNumber
                                    component={"text"}
                                    className={`animate-amount mouse600`}
                                    value={income}
                                    duration={1000}
                                    formatValue={formatValue}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-6 mouse400 flexy">
                    <div className="curr-balance border-r-danger flexy">
                        <div>
                            <div className="text-center">Expenses</div>
                            <div className="mt-4">
                                <AnimatedNumber
                                    component={"text"}
                                    className={`animate-amount mouse600`}
                                    value={expenditure}
                                    duration={1000}
                                    formatValue={formatValue}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="transactions-div row mx-0">

                {transaction.map((lotpot, index) => {

                    return (
                        (index !== 0 && transaction[index].date === transaction[index - 1].date) ?
                            <>
                                <div className="col col-12 flexy my-3">
                                    <div className="transaction-ui mouse400 d-flex justify-content-center">
                                        <div className="full-width">
                                            <div className="category-class d-flex justify-content-end py-1 pe-2">
                                                <div className="category-style flexy py-1 px-2">
                                                    <div
                                                        className={`pokemon-tag bg-${lotpot.category.split(' ')[0]} me-1`}
                                                    >
                                                        {console.log(lotpot.category.split(' ')[0])}
                                                    </div>
                                                    <div>{lotpot.category}</div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2">
                                                <div className="col col-8">{lotpot.reason}</div>
                                                <div className="col col-4">₹ {lotpot.amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>

                                <div className="mouse400 flexy mt-1">
                                    {`${lotpot.date}/${lotpot.month}/${lotpot.year}`}
                                </div>

                                <div className="col col-12 flexy my-3">
                                    <div className="transaction-ui mouse400 d-flex justify-content-center">
                                        <div className="full-width">
                                            <div className="category-class d-flex justify-content-end py-1 pe-2">
                                                <div className="category-style flexy py-1 px-2">
                                                    <div
                                                        className={`pokemon-tag bg-success me-1`}
                                                    ></div>
                                                    <div>{lotpot.category}</div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 py-2">
                                                <div className="col col-8">{lotpot.reason}</div>
                                                <div className="col col-4">₹ {lotpot.amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </>
                    );
                })

                }
            </div>

            <Link exact to="/add">
                <img alt="" className="AddTransactionButton" src={rupeebutton} />
            </Link>
        </>
    );
};

export default Transactions;
