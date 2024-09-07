import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useTheme } from '../utilities/ThemeContext'
import { Route, Routes } from "react-router-dom";
import Navbar from '../layouts/Navbar'
import Homepage from '../pages/Homepage'
import Footer from '../layouts/Footer'
import LeftMenu from '../layouts/LeftMenu';
import MoneyTransfers from '../pages/MoneyTransfers';
import MyAccounts from '../pages/MyAccounts';
import TransactionHistory from '../pages/TransactionHistory';
import { useSelector } from 'react-redux'
import "../styles/HomepageDashboard.css"

export default function HomepageDashboard() {

  const navigate = useNavigate();
  const { theme } = useTheme();

  const { authUsername } = useSelector(state => state.user)

  useEffect(() => {
    const themeLink = document.getElementById('theme-link');
    if (themeLink) {
      themeLink.href = `https://unpkg.com/primereact/resources/themes/${theme}/theme.css`;
    } else {
      const newThemeLink = document.createElement('link');
      newThemeLink.id = 'theme-link';
      newThemeLink.rel = 'stylesheet';
      newThemeLink.href = `https://unpkg.com/primereact/resources/themes/${theme}/theme.css`;
      document.head.appendChild(newThemeLink);
    }
  }, [theme]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token === null || authUsername === null) {
      navigate("/");
    }

  }, []);

  console.log("token :" + sessionStorage.getItem("token"));

  const [screenWidth, setScreenWidth] = useState(window.innerWidth); //tarayıcı penceresinin mevcut genişliği  
  const [screenHeight, setScreenHeight] = useState(window.innerHeight); // tarayıcı penceresinin mevcut yüksekliği

  useEffect(() => {

    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);

  }, []);


  return (

    <div className="container-fluid">

      <div></div>
      <div></div>
      <div className="row">
        <div className="col-12">
          <Navbar />
        </div>
      </div>

      <div className="row" style={{ minHeight: `${screenHeight * 0.75}px` }}>
        <div className="col-12 col-md-2">
          <div className="d-flex justify-content-center justify-content-md-start">
            <LeftMenu />
          </div>
        </div>

        <div className="col-12 col-md-10">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/my-accounts" element={<MyAccounts />} />
            <Route exact path="/money-transfers" element={<MoneyTransfers />} />
            <Route exact path="/transaction-history" element={<TransactionHistory />} />
          </Routes>
        </div>
      </div>

      <div className="row" style={{ position: "relative", bottom: "0",width:"100%" }}>
        <div className="col-12">
          <Footer />
        </div>
      </div>    

    </div>

  
  );

}
