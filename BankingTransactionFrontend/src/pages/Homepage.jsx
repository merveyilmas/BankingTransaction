import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux'
import "../styles/Homepage.css"

export default function Homepage() {
  
  const toast = useRef(null);
  const { authUsername } = useSelector(state => state.user)

  return (
    <div className="homepage-container">
      <Toast ref={toast} />

      <div className="homepage-card-container">
        <Card className="homepage-card">
          <h3 className="welcome-message">Hello, {authUsername}!</h3>
          <p className="greeting-text">
            Welcome to your banking dashboard. Here you can manage your accounts, view transaction history, and perform money transfers with ease.
          </p>
        </Card>        
      </div>
      
    </div>
  );
}
