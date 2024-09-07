import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios'; // Import axios for making HTTP requests

const MoneyTransfers = () => {

    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethodOptions] = useState([
        { label: 'Bank Transfer', value: 'bank' },
        { label: 'Credit Card', value: 'card' },
        { label: 'PayPal', value: 'paypal' }
    ]);

    const [userAccounts, setUserAccounts] = useState([
        { label: 'Account 1', value: '12345' },
        { label: 'Account 2', value: '67890' },
        { label: 'Account 3', value: '11223' }
    ]);

    const [accountInfo, setAccountInfo] = useState(null); // State to store account info
    const [transferDetails, setTransferDetails] = useState({});
    const toast = useRef(null);

    useEffect(() => {
        const fetchAccountInfo = async () => {
            if (accountNumber) {
                try {
                    // Replace with your API endpoint
                    const response = await axios.get(`/api/accounts/${accountNumber}`);
                    if (response.data) {
                        setAccountInfo(response.data);
                    } else {
                        setAccountInfo(null);
                    }
                } catch (error) {
                    setAccountInfo(null);
                }
            }
        };
        fetchAccountInfo();
    }, [accountNumber]);

    // Step 1: Payment Method, Account Number, and Amount Input
    const handleNext = () => {
        if (!paymentMethod || !accountNumber || !amount) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please fill all fields!', life: 3000 });
            return;
        }
        if (!accountInfo) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Account not found!', life: 3000 });
            return;
        }
        setTransferDetails({
            paymentMethod,
            accountNumber,
            amount,
            userName: accountInfo.userName // Include userName in transferDetails
        });
        setStep(2);
    };

    // Step 2: Preview and Confirmation
    const handleConfirm = () => {
        // Here you would usually handle the transfer logic
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Transfer completed successfully!', life: 3000 });
        // Resetting for new transfer
        setStep(1);
        setPaymentMethod(null);
        setAccountNumber('');
        setAmount('');
        setAccountInfo(null); // Clear accountInfo
    };

    // Step 2: Go Back to Step 1
    const handleBack = () => {
        setStep(1);
    };

    // Data for the confirmation table
    const confirmationData = [
        { desc: 'Payment Method', value: transferDetails.paymentMethod },
        { desc: 'Recipient Account Number', value: transferDetails.accountNumber },
        { desc: 'Recipient Name', value: transferDetails.userName }, // Add userName to confirmation data
        { desc: 'Amount', value: `$${transferDetails.amount}` }
    ];

    return (
        <div style={{ width: '100%', height: "100%" }}>
            <Toast ref={toast} />
            {step === 1 && (
                <Card>
                    <h3>Step 1: Enter Transfer Details</h3>
                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="payment-method" style={{ marginBottom: '0.5rem', display: 'block' }}>Payment Method</label>
                        <Dropdown
                            id="payment-method"
                            value={paymentMethod}
                            options={paymentMethodOptions}
                            onChange={(e) => setPaymentMethod(e.value)}
                            placeholder="Select a Payment Method"
                            style={{ width: '100%' }} // Ensure full width
                        />
                    </div>
                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="account-number" style={{ marginBottom: '0.5rem', display: 'block' }}>Recipient Account Number</label>
                        <InputText
                            id="account-number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="Enter Account Number"
                            style={{ width: '100%' }} // Ensure full width
                        />
                    </div>
                    {accountInfo && (
                        <div className="p-field" style={{ marginBottom: '1rem' }}>
                            <label htmlFor="account-info" style={{ marginBottom: '0.5rem', display: 'block' }}>Recipient Information</label>
                            <InputText
                                id="account-info"
                                value={accountInfo.userName || ''}
                                readOnly
                                style={{ width: '100%' }} // Ensure full width
                            />
                        </div>
                    )}
                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="amount" style={{ marginBottom: '0.5rem', display: 'block' }}>Amount</label>
                        <InputText
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter Amount"
                            style={{ width: '100%' }} // Ensure full width
                        />
                    </div>
                    <Button label="Next" icon="pi pi-arrow-right" onClick={handleNext} style={{ marginTop: '1rem' }} />
                </Card>
            )}
            {step === 2 && (
                <Card>
                    <h3>Step 2: Confirm Transfer Details</h3>
                    <DataTable value={confirmationData} paginator={false} rows={confirmationData.length}>
                        <Column field="desc" header="Description" />
                        <Column field="value" header="Value" />
                    </DataTable>
                    <div style={{ marginTop: '1rem' }}>
                        <Button label="Back" icon="pi pi-arrow-left" className="p-button-secondary" onClick={handleBack} style={{ marginRight: '1rem' }} />
                        <Button label="Confirm" icon="pi pi-check" className="p-button-success" onClick={handleConfirm} />
                    </div>
                </Card>
            )}
            
        </div>
    );
};

export default MoneyTransfers;
