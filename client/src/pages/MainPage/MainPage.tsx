import React, {FC} from 'react';
import Navbar from "../../components/Navbar/Navbar";


const MainPage:FC = () => {

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <h2>Enter the system. Choose Login or Register</h2>
                </div>
            </div>
        </div>

    );
};

export default MainPage;