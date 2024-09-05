import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useTheme } from '../utilities/ThemeContext'; // ThemeContext dosyanızın doğru yolu
import { Route, Routes } from "react-router-dom";
import Navbar from '../layouts/Navbar'
import Homepage from '../pages/Homepage'
import Footer from '../layouts/Footer'
import LeftMenu from '../layouts/LeftMenu';
import MoneyTransfers from '../pages/MoneyTransfers';
import MyAccounts from '../pages/MyAccounts';
import TransactionHistory from '../pages/TransactionHistory';

import EditUser from '../pages/EditUser';

export default function HomepageDashboard() {

  const navigate = useNavigate();
  const { theme } = useTheme();

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
    const username = sessionStorage.getItem("username");

    if (token === null || username === null) {
      navigate("/");
    }

  }, []);

  console.log("token :" + sessionStorage.getItem("token"));

  const [screenWidth, setScreenWidth] = useState(window.innerWidth); //tarayıcı penceresinin mevcut genişliği  
  const [screenHeight, setScreenHeight] = useState(window.innerHeight); // tarayıcı penceresinin mevcut yüksekliği

  useEffect(() => {
    // Function to update screen dimensions on resize
    //Bu fonksiyon, ekran boyutları güncellendiğinde çağrılacak ve setScreenWidth ve setScreenHeight ile yeni genişlik ve yüksekliği state'lere set edecektir.
    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    //console.log("screenWidth : " + screenWidth)
   // console.log("screenHeight : " + screenHeight)
    // Event listener to handle resize
    // tarayıcı penceresinin boyutu değiştiğinde çağrılacak olan updateDimensions fonksiyonu bir event listener'a eklenir.
    window.addEventListener('resize', updateDimensions);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', updateDimensions);

  }, []);


  return (

    <div className="container-fluid">

      <div></div>
      <div></div>
      <div className="row" style={{ marginRight: "0", marginLeft: "0" }}>
        <div className="col-12">
          <Navbar />
        </div>
      </div>

      <div className="row" style={{ marginRight: "0", marginLeft: "0", minHeight: `${screenHeight * 0.75}px` }}>
        <div className="col-12 col-md-2" style={{ paddingLeft: "0", paddingRight: "0" }}>
          <div className="d-flex justify-content-center justify-content-md-start">
            <LeftMenu />
          </div>
        </div>

        <div className="col-12 col-md-10" style={{ paddingLeft: "0.8%" }}>
          <Routes>
            <Route exact path="/home" element={<Homepage />} />
            <Route exact path="/my-accounts" element={<MyAccounts />} />
            <Route exact path="/money-transfers" element={<MoneyTransfers />} />
            <Route exact path="/transaction-history" element={<TransactionHistory />} />
          </Routes>
        </div>
      </div>

      <div className="row" style={{ position: "relative", marginRight: "0", marginLeft: "0", bottom: "0",width:"100%" }}>
        <div className="col-12">
          <Footer />
        </div>
      </div>

      <style jsx>
        {`
          /* Ensures the columns are displayed correctly */
          .row {
            display: flex;
            flex-wrap: nowrap; /* Prevents wrapping of columns */
          }
    
          /* Ensure the ForeignExchange component is on the left and the other content is on the right */
          .col-md-2 {
            flex: 0 0 16.666667%; /* Ensures the column takes up 2/12 (or 1/6) of the width */
            max-width: 16.666667%;
          }
    
          .col-md-10 {
            flex: 0 0 83.333333%; /* Ensures the column takes up 10/12 (or 5/6) of the width */
            max-width: 83.333333%;
          }
    
          /* Optional: Add some padding or margin if needed */
          .col-md-2, .col-md-10 {
            padding: 0.5rem;
          }
    
          /* Ensures correct layout on smaller screens */
          @media (max-width: 767px) {
            .row {
              flex-wrap: wrap; /* Allows wrapping on small screens */
            }
            .col-md-2, .col-md-10 {
              flex: 0 0 100%; /* Full width on small screens */
              max-width: 100%;
            }
          }
      `}
      </style>

    </div>

  );

}
