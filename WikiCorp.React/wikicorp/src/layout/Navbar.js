import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

function Navbar({title}) { 
    return (
        <nav className="navbar-nav navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
            <a href="/" className="navbar-brand">{title}</a>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link to = "/" className="nav-link">İçerik Listesi</Link> 
                </li>
                <li className="nav-item active">
                    <Link to = "/add" className="nav-link">İçerik Ekle</Link> 
                </li>  
            </ul>
        </nav>
    )
}
Navbar.defaultProps = {
    title : "Default App"
}
Navbar.propTypes = {
    title : PropTypes.string.isRequired
}


export default Navbar;