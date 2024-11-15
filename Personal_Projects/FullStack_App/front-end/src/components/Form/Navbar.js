import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbarStyles.css';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">ReactApp</div>
            <button className="navbar-toggle" onClick={toggleMenu}>
                <span className="hamburger-icon">&#9776;</span>
            </button>
            <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <li><Link to="/">Home</Link></li>
                
                {!user ? (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/" onClick={logout}>Logout</Link></li>
                        
                        {user.role === 'admin' && (
                            <>
                                <li><Link to="/userlist">User List</Link></li>
                                <li><Link to="/delete">Delete User</Link></li>
                            </>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;