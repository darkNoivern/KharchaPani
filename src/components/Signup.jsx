import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { auth } from '../firebase.config';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { collection } from 'firebase/firestore';
import { db } from '../firebase.config';
import { addDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';

import avatar1 from '../images/avatar1.svg'
import avatar2 from '../images/avatar2.svg'
import avatar3 from '../images/avatar3.svg'
import avatar4 from '../images/avatar4.svg'
import '../styles/signup.css'

const SignUp = (props) => {

    function isAlphanumeric(str) {
        return /^[a-z0-9]+$/i.test(str)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [userNameAlert, setUserNameAlert] = useState(false);
    const [err, setErr] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [currentUserName, setCurrentUserName] = useState("");

    const [avatarNumber, setAvatarNumber] = useState(1);

    const [alphaNumberError, setAlphaNumberError] = useState(false);

    //  FIREBASE
    const usersCollectionRef = collection(db, "userdetails");
    useEffect(() => {
        onSnapshot(usersCollectionRef, (snapshot) => {
            setUserlist(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    }, []);


    //  SIGNUP FUNCTION
    const signInWithGoogle = () => {

        if(!isAlphanumeric(currentUserName)){
            setAlphaNumberError(true);
            return ;
        }

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                const user = auth.currentUser;

                const checkEmailPresent = userlist.find((individual) => {
                    return (individual.email === user.email);
                })

                const checkUsernamePresent = userlist.find((individual) => {
                    return (individual.username === currentUserName);
                })

                if (checkEmailPresent !== undefined) {  //  EMAIL FOUND

                    setAlert(true);
                    //  LOGOUT AUTH
                    props.toggleUser(false)
                    dispatch({
                        type: 'LOGOUT',
                    });

                    return;
                }

                if (checkUsernamePresent !== undefined) {  //  EMAIL FOUND

                    setUserNameAlert(true);
                    //  LOGOUT AUTH
                    props.toggleUser(false)
                    dispatch({
                        type: 'LOGOUT',
                    });

                    return;
                }

                //  AUTH SIGNUP
                addDoc(usersCollectionRef, {
                    username: currentUserName,
                    email: user.email,
                    avatarid: avatarNumber,
                    position: "user",
                    transactions: new Array(),
                });

                //  REDUX
                const payloadOBJ = {
                    username: currentUserName,
                    email: user.email,
                    avatarid: avatarNumber,
                    position: "user",
                }

                //  TOGGLE : REDUX : NAVIGATE
                props.toggleUser(true);
                dispatch({
                    type: 'SIGNIN',
                    payload: payloadOBJ,
                });
                navigate('/transactions')
            })
            .catch((error) => {
                setErr(true)
                console.log(error);
            });
    };

    return (
        <>
            <div className="page px-3 px-md-5 flexy">
                <div className='sign-up-box my-5'>
                    <div className="avatar">
                        <div className="row mx-0 d-flex justify-content-between">
                            <div className="col col-6 col-md-3 flexy mb-3">
                                <img
                                    onClick={() => { setAvatarNumber(0); }}
                                    className={`profile-pic-options ${(avatarNumber === 0) ? "active-avatar" : ""}`}
                                    src={avatar1}
                                    alt="Avatar_1" />
                            </div>
                            <div className="col col-6 col-md-3 flexy mb-3">
                                <img
                                    onClick={() => { setAvatarNumber(1); }}
                                    className={`profile-pic-options ${(avatarNumber === 1) ? "active-avatar" : ""}`}
                                    src={avatar2}
                                    alt="Avatar_2" />
                            </div>
                            <div className="col col-6 col-md-3 flexy mb-3">
                                <img
                                    onClick={() => { setAvatarNumber(2); }}
                                    className={`profile-pic-options ${(avatarNumber === 2) ? "active-avatar" : ""}`}
                                    src={avatar3}
                                    alt="Avatar_3" />
                            </div>
                            <div className="col col-6 col-md-3 flexy mb-3">
                                <img
                                    onClick={() => { setAvatarNumber(3); }}
                                    className={`profile-pic-options ${(avatarNumber === 3) ? "active-avatar" : ""}`}
                                    src={avatar4}
                                    alt="Avatar_4" />
                            </div>
                        </div>

                    </div>

                    {(err &&
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <div>
                                <i className="fas fa-exclamation-triangle" />&nbsp;
                                Something went wrong TRY AGAIN !!
                            </div>
                        </div>
                    )}

                    {(userNameAlert &&
                        <div className="alert alert-warning d-flex align-items-center" role="alert">
                            <div>
                                <i className="fas fa-exclamation-triangle" />
                                &nbsp; This username is already in database ; Try to &nbsp;
                                <Link className="text-dark" exact to="/signin">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    )}

                    {(alert &&
                        <div className="alert alert-warning d-flex align-items-center" role="alert">
                            <div>
                                <i className="fas fa-exclamation-triangle" />
                                &nbsp;This mail is already in database ; Try to &nbsp;
                                <Link className="text-dark" exact to="/signin">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="my-5">
                        <div class="alert alert-warning d-flex align-items-center my-2" role="alert">
                            <i class="info icon mb-2 me-2"></i>
                            <div>
                                Please use only alphanumeric characters
                            </div>
                        </div>
                        <label for="exampleFormControlInput1" className="mouse400 form-label">Username</label>
                        {(
                                    alphaNumberError &&
                                    <div class="alert alert-danger d-flex align-items-center my-2" role="alert">
                                    <i class="x icon mb-2 me-2"></i>
                                        <div>
                                            Please use only alphanumeric charcters
                                        </div>
                                    </div>
                                )}
                        <input
                            onChange={(event) => { 
                                setCurrentUserName(event.target.value);
                                setAlphaNumberError(false); 
                            }}
                            type="text"
                            className="mouse400 form-control username-input"
                            id="exampleFormControlInput1" />
                    </div>
                    <div className='flexy'>
                        {(currentUserName !== "") ?
                            <button
                                onClick={() => signInWithGoogle()}
                                className='mouse400 button basic ui sign-btn bg-gate text-white sign-round mx-0 my-3'>
                                <i class="google icon me-2"></i>Sign Up with Google
                            </button> :
                            <button disabled className='mouse400 basic button ui sign-btn bg-gate text-white sign-round mx-0 my-3'>
                                <i class="google icon me-2"></i>Sign Up with Google
                            </button>
                        }
                    </div>
                    <div className="flexy">
                        <Link className="mouse400 text-white" exact to="/signin" >Already have an account ??</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp