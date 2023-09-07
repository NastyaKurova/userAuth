import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import authStore from "../../store/AuthStore";
import {useAuth} from "../../hooks/useAuth";


const Navbar:FC = observer(() => {
    const { isAuthenticated } = authStore;
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
            <nav>
                <div className="nav-wrapper">
                    <div className="container">
                        <div className="row">
                            <ul className="left">
                                <li><Link to={'/login'}>Login page</Link></li>
                                <li><Link to={'/register'}>Register page</Link></li>
                                {isAuthenticated && <li><Link to={'/user'}>User page</Link></li>}
                            </ul>
                            <ul className="right">
                                {isAuthenticated && <li><Link to={'/'} onClick={handleLogout}> Log out</Link></li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
    );
});

export default Navbar;