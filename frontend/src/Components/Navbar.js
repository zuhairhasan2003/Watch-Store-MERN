import React from 'react'
import { Link, useLocation } from "react-router-dom";

function Navbar() {

    let location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">TheWatchCompany</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                        <Link className={`nav-link ${location.pathname === '/Shop/All' ? 'active' : ""}`} to="/Shop/All">Catalogue</Link>
                        <Link className={`nav-link ${location.pathname === '/Cart' ? 'active' : ""}`} to="/Cart">View cart</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar