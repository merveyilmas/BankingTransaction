import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getAllAccountsByAuthUser } from '../store/actions/AccountAction';
import TransactionService from '../services/TransactionService';
import AccountService from '../services/AccountService';
import "../styles/MoneyTransfer.css"

const MoneyTransfers = () => {

    const toast = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const transactionService = new TransactionService();
    const accountService = new AccountService();

    const { accounts } = useSelector(state => state.account)

    const [step, setStep] = useState(1);
    const [sourceAccount, setSourceAccount] = useState(null);
    const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
    const [amount, setAmount] = useState('');

    const [destinationAccountInfo, setDestinationAccountInfo] = useState(null);
    const [transferDetails, setTransferDetails] = useState({});

    useEffect(() => {

        dispatch(getAllAccountsByAuthUser());

        if (accounts.length === 0) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Accounts can not fetch!', life: 3000 });
        }

    }, [dispatch]);

    const accountOptions = accounts.map(account => ({
        label: account.name,
        value: account.id
    }));

    const destinationAccountHandleChange = (e) => {

        const desAccountNumber = e.target.value
        setDestinationAccountNumber(desAccountNumber);

        accountService.getAccountByNumber(desAccountNumber).then(result => {

            if (result.status === 200) {
                setDestinationAccountInfo(result.data)
            }

        }).catch(error => {
            // console.error(error);
            // toast.current.show({ severity: 'error', summary: 'Error', detail: "Occured an error while fetch data!", life: 3000 });
            setDestinationAccountInfo("")
        });

    };

    const handleNext = () => {

        if (!sourceAccount || !destinationAccountNumber || !amount) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please fill all fields!', life: 3000 });
            return;
        }
        if (!destinationAccountInfo) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Destination account not found!', life: 3000 });
            return;
        }

        const sourceAccountName = accountOptions.find(option => option.value === sourceAccount).label;

        setTransferDetails({
            sourceAccountName,
            destinationAccountNumber,
            amount,
            userName: destinationAccountInfo.user.username
        });
        setStep(2);
    };

    const handleConfirm = () => {

        const transferDatas = {
            sourceAccountId: sourceAccount,
            destinationAccountNumber: destinationAccountNumber,
            amount: amount
        }

        transactionService.transferMoney(transferDatas).then(result => {

            if (result.status === 200) {

                console.log(result.data)
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Transfer completed successfully!', life: 3000 });

                setStep(1);
                setSourceAccount(null);
                setDestinationAccountNumber('');
                setAmount('');
                setDestinationAccountInfo(null);

                navigate("/home/my-accounts")
            }

        }).catch(error => {
            // console.error(error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: "Occured an error while transfer money, please control your transfer amount!", life: 3000 });
        });

    };

    const handleBack = () => {
        setStep(1);
    };

    const confirmationData = [
        { desc: 'Payment Method', value: transferDetails.sourceAccountName },
        { desc: 'Recipient Account Number', value: transferDetails.destinationAccountNumber },
        { desc: 'Recipient Name', value: transferDetails.userName },
        { desc: 'Amount', value: `${transferDetails.amount}` }
    ];

    return (

        <div className="money-transfer-container">
            <Toast ref={toast} />

            {step === 1 && (
                <Card className="money-transfer-card">

                    <h3 className="money-transfer-header" >Transfer Money</h3>

                    <h3>Step 1: Enter Transfer Details</h3>
                    <div className="money-transfer-field">
                        <label htmlFor="payment-method" className="money-transfer-label">Payment Method</label>
                        <Dropdown
                            id="payment-method"
                            value={sourceAccount}
                            options={accountOptions}
                            onChange={(e) => setSourceAccount(e.value)}
                            placeholder="Select an Account"
                            className="money-transfer-dropdown"
                        />
                    </div>
                    <div className="money-transfer-field">
                        <label htmlFor="account-number" className="money-transfer-label">Recipient Account Number</label>
                        <InputText
                            id="account-number"
                            value={destinationAccountNumber}
                            onChange={destinationAccountHandleChange}
                            placeholder="Enter Account Number"
                            className="money-transfer-input"
                        />
                    </div>
                    {destinationAccountInfo && (
                        <div className="money-transfer-field">
                            <label htmlFor="account-info" className="money-transfer-label">Recipient Information</label>
                            <InputText
                                id="account-info"
                                value={destinationAccountInfo.user.username}
                                readOnly
                                className="money-transfer-input"
                            />
                        </div>
                    )}
                    <div className="money-transfer-field">
                        <label htmlFor="amount" className="money-transfer-label">Amount</label>
                        <InputText
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter Amount"
                            className="money-transfer-input"
                        />
                    </div>
                    <Button label="Next" icon="pi pi-arrow-right" onClick={handleNext} className="money-transfer-button" />
                </Card>
            )}

            {step === 2 && (
                <Card className="money-transfer-card">
                    <h3>Step 2: Confirm Transfer Details</h3>
                    <DataTable value={confirmationData} paginator={false} rows={confirmationData.length}>
                        <Column field="desc" />
                        <Column field="value" />
                    </DataTable>
                    <div className="money-transfer-action-buttons">
                        <Button label="Back" icon="pi pi-arrow-left" className="p-button-secondary" onClick={handleBack} />
                        <Button label="Confirm" icon="pi pi-check" className="p-button-success" onClick={handleConfirm} />
                    </div>
                </Card>
            )}
        </div>


    );
};

export default MoneyTransfers;
