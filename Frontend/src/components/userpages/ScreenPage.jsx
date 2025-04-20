import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/css/ScreenPage.css';


export const ScreenPage = () => {
    const location = useLocation();
    const screenData = location.state?.screens;
    // console.log(screenData);

    return (
        <div className="screen-page">
            <h1 className="screen-heading">Screens In Your Area</h1>
            <div className="screen-cards">
                {screenData?.map((screen, index) => (
                    <div className="screen-card" key={index}>
                        <div className="screen-img">
                            <img src={screen.hordingURL} alt={`Screen ${index}`} />
                        </div>
                        <div className="screen-info">
                            <div className="screen-info-row">
                                <span className="label">Dimensions:</span>
                                <span className="value">{screen.hoardingDimension}</span>
                            </div>
                            <div className="screen-info-row">
                                <span className="label">Type:</span>
                                <span className="value">{screen.hoardingType}</span>
                            </div>
                            <div className="screen-info-row">
                                <span className="label">Hourly Rate:</span>
                                <span className="value">₹{screen.hourlyRate}</span>
                            </div>
                            {/* <div className="screen-info-row">
                                <span className="label">Status:</span>
                                <span className={`value ${screen.Availablity_Status ? 'status-yes' : 'status-no'}`}>
                                    {screen.Availablity_Status ? 'Available' : 'Not Available'}
                                </span>
                            </div> */}
                            <div className="screen-info-row">
                                <span className="label">Longitude:</span>
                                <span className="value">{screen.longitude}</span>
                            </div>
                            <div className="screen-info-row">
                                <span className="label">Latitude:</span>
                                <span className="value">{screen.latitude}</span>
                            </div>
                        </div>
                        <div className="screen-action">
                            <Link to="/user/check-avaibility" state={{ hoardingId: screen._id }}>
                            <button className="Book-button">Book Screen</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
