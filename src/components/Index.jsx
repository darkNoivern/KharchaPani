import React, { useEffect } from 'react'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'
import Transactions from './Transactions';
import Addtransactions from './Addtransactions';
import Manage from './Manage';
import Signin from './Signin';
import Error from './Error';
import Signup from './Signup';
import { useSelector } from 'react-redux';

const Index = () => {

    const substituteData = useSelector(state => state);
    // console.log(substituteData)
    const [user, setUser] = useState(substituteData.loggedin);
    const [avatarID, setAvatarID] = useState(substituteData.avatarid);

    const toggleUser = (set) => {
        setUser(set)
    }
    useEffect(()=>{
        if(user){
            setAvatarID(substituteData.avatarid)
        }
    },[user])
    
    return (
        <>
            <Router>
                <Navbar user={user} username={substituteData.username} avatarid={substituteData.avatarid} toggleUser={toggleUser} />
                <div>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/transactions" element={ (user===true) ? <Transactions /> : <Signin toggleUser={toggleUser}  /> } />
                        <Route exact path="/add" element={ (user===true) ? <Addtransactions /> : <Signin toggleUser={toggleUser}  /> } />
                        <Route exact path="/manage" element={ (user===true) ? <Manage /> : <Signin toggleUser={toggleUser}  /> } />
                        <Route exact path="/signin" element={<Signin toggleUser={toggleUser} />} />
                        <Route exact path="/signup" element={<Signup toggleUser={toggleUser} />} />
                        <Route path= '*' element={<Error />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default Index