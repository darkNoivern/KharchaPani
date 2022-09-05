import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../styles/navbar.css'
import Rupee from '../images/rupee.png'

const Navbar = (props) => {
    
    const logout = () => {
        props.toggleUser(false)
    }

  return (
    <>
      
        <nav className="navbar navbar-expand-md navbar-light">
            <div className="container-fluid">
                <Link exact to="/" className="navbar-brand mouse400 py-2">
                    KharchaPani
                    <img className='ms-2 navbar-logo' src={Rupee} alt="" />
                </Link>

                <button
                    className="navbar-toggler voltorb-navbar-toggler bg-gate"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse mt-2" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink
                                exact to={'/'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Home
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Home
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                exact to={'/transactions'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Transactions
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/transactions'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Transactions
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                exact to={'/add'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Add Transactions
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/add'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Add Transactions
                                </span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                exact to={'/manage'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    Manage
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/manage'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    Manage
                                </span>
                            </NavLink>
                        </li>

                        {
                            props.user === true
                            ?
                            <li className="nav-item">
                                        <NavLink
                                            onClick={() => (logout())}
                                            exact to={'/signin'}
                                            activeclassname="active"
                                            className="nav-link d-sm-none">
                                            <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                                Logout
                                            </span>
                                        </NavLink>
                                        <NavLink
                                            onClick={() => (logout())}
                                            exact to={'/signin'}
                                            activeclassname="active"
                                            className="nav-link d-none d-sm-block">
                                            <span>
                                                Logout
                                            </span>
                                        </NavLink>
                                    </li>
                                    :


                        <li className="nav-item">
                            <NavLink
                                exact to={'/signup'}
                                activeclassname="active"
                                className="nav-link d-sm-none">
                                <span data-bs-target="#navbarNav" data-bs-toggle="collapse">
                                    SignUp
                                </span>
                            </NavLink>
                            <NavLink
                                exact to={'/signin'}
                                activeclassname="active"
                                className="nav-link d-none d-sm-block">
                                <span>
                                    SignUp
                                </span>
                            </NavLink>
                        </li>
                        }

                    </ul>
                    </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar