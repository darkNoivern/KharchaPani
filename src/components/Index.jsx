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

const Index = () => {
    
    const [user, setUser] = useState(false);

    const toggleUser = (set) => {
        setUser(set)
    }

    return (
        <>
            <Router>
                <Navbar user={user} toggleUser={toggleUser} />
                <div>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/transactions" element={ (user===true) ? <Transactions /> : <Signin toggleUser={toggleUser}  /> } />
                        <Route exact path="/add" element={ (user===true) ? <Addtransactions /> : <Signin toggleUser={toggleUser}  /> } />
                        <Route exact path="/manage" element={ (user===true) ? <Manage /> : <Signin toggleUser={toggleUser}  /> } />
                        <Route exact path="/signin" element={<Signin toggleUser={toggleUser} />} />
                        <Route path= '*' element={<Error />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default Index