import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import '../styles/manage.css'

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
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const Manage = () => {


    const substituteData = useSelector(state => state);

    const [user, setUser] = useState([]);
    const [transaction, setTransaction] = useState([]);

    const [form, setForm] = useState({
        groceries: 0,
        bill: 0,
        entertainment: 0,
        insurance: 0,
        education: 0,
        shopping: 0,
        household: 0,
        others: 0,
    });

    const [dataArray, setDataArray] = useState([0, 0, 0, 0, 0, 0, 0, 0])

    const data = {
        labels: ["Groceries", "Bill", "Entertainment", "Insurance & EMIs", "Education", "Shopping", "Household Needs", "Others"],
        datasets: [
            {
                label: "# of Votes",
                data: dataArray, 
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(214, 51, 132, 0.2)",
                    "rgba(10, 102, 25, 0.2)",
                    "rgba(108, 117, 125, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(214, 51, 132, 1)",
                    "rgba(10, 102, 25, 1)",
                    "rgba(108, 117, 125, 1)",
                ],
                borderWidth: 1
            }
        ]
    };

    const usersCollectionRef = collection(db, "userdetails");

    useEffect(() => {

        onSnapshot(usersCollectionRef, (snapshot) => {
            const users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            })

            const user = users.filter((ui, index) => {
                return (ui.username == substituteData.username);
            })
            console.log(user)
            if (user.length > 0) {
                console.log(user[0].transactions)
                setTransaction(user[0].transactions)
    
                
                const updatedAreas = [...dataArray];
                user[0].transactions.forEach((transaction, index) => {
                    console.log(form)
                    console.log('transaction',transaction)
                    if (transaction.category === "Groceries") {
                        updatedAreas[0]+=parseInt(transaction.amount);
                        setDataArray(updatedAreas);
                        console.log(updatedAreas)
                    }
                    else if (transaction.category === "Bills") {
                        updatedAreas[1]+=parseInt(transaction.amount);
                        setDataArray(updatedAreas);
                        console.log(updatedAreas)
                    }
                    else if (transaction.category === "Entertainment") {
                        updatedAreas[2]+=parseInt(transaction.amount);
                        setDataArray(updatedAreas);
                    }
                    else if (transaction.category === "Insurance & EMIs") {
                        updatedAreas[3]+=parseInt(transaction.amount);
                        setDataArray(updatedAreas);
                    }
                    else if (transaction.category === "Education") {
                        updatedAreas[4]+=parseInt(transaction.amount);
                        setDataArray(updatedAreas);
                    }
                    else if (transaction.category === "Shopping") {
                        updatedAreas[5]+=parseInt(transaction.amount);
                        setDataArray(updatedAreas);
                    }
                    else if (transaction.category === "Household Needs") {
                        updatedAreas[6]+=parseInt(transaction.amount);
                        setDataArray(updatedAreas);
                    }
                    else if (transaction.category === "Others") {
                        updatedAreas[7]+=parseInt(transaction.amount);
                        setDataArray(updatedAreas);
                        console.log(updatedAreas)
                    }
                })
            }
        });
    }, [])

    return (
        <>
            <div className="mouse600 page-headings flexy mt-4 mb-3 page-headings">
                Manage
            </div>
            <div className="p-4">
                <Doughnut
                    className="graph-holder mouse400"
                    height={300}
                    width={400}
                    data={data}
                    options={{
                        responsive: true
                    }}
                />
            </div>
        </>
    )
}

export default Manage