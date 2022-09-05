import React from 'react'
import moneypig from '../images/moneypig.svg'
import { Link } from 'react-router-dom'
import '../styles/home.css'

const Home = () => {
    return (
        <>
            <div className='home-page px-3 px-md-5'>
                <div className="row mx-0 my-5">
                    <div className="col col-12 col-lg-6 mb-4 mb-lg-5 flexy homepage-columns">
                        <div>
                            <div className='homepage-text mouse600 center-crow'>
                                Money moves from those who don't manage it to those who do;
                            </div>
                            <div className="flexy">
                                <Link exact to="/transactions" className='mouse400 ui button curve-btn bg-gate text-amigo my-3'>
                                    {`Get Started`}<i class="arrow right icon"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col col-12 col-lg-6 mb-4 mb-lg-5 flexy p-0">
                        <img className='oscillate' src={moneypig} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home