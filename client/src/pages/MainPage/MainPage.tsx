import React, {FC} from 'react';
import {Link} from "react-router-dom";


const MainPage:FC = () => {
    return (
        <div className="container">
            <div className="row">
                <h2>Enter the system. Choose Login or Register</h2>

                <nav>
                    <div className="nav-wrapper">
                        <ul className="left">
                           <li><Link to={'/login'}>Login page</Link></li>
                            <li><Link to={'/register'}>Register page</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MainPage;