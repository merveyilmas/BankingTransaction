import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';
import AccountService from '../services/AccountService';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

const BankAccountTable = ({ accounts, onDelete, onCreate, onUpdate, fetchAccounts }) => { // fetchAccounts props eklendi

    const toast = useRef(null);
    const navigate = useNavigate();
    const accountService = new AccountService();

    const [selectedAccounts, setSelectedAccounts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [accountDetailsVisible, setAccountDetailsVisible] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [accountUpdateData, setAccountUpdateData] = useState({ name: '', balance: '' });
    const [filteredAccounts, setFilteredAccounts] = useState(accounts); // Filtrelenmiş hesaplar

    useEffect(() => {
     
        const performSearch = async () => {

            if (!globalFilter || globalFilter === "") {
               
                fetchAccounts();
                setFilteredAccounts(accounts)
            } else {
                setFilteredAccounts([])

                await handleSearch(globalFilter);
            }

        };
        performSearch(); // Asenkron fonksiyonu çağır

    }, [globalFilter]);

    const handleSearch = async (filter) => {

        try {
            const result = await accountService.searchAccount(filter);
            if (result.status === 200) {
                setFilteredAccounts(result.data); 
            }
        } catch (error) {
            console.error(error);
        }

    };

    console.log(selectedAccount)
    const onRowSelect = async (e) => {

        try {
            const result = await accountService.getAccountById(e.data.id);
            if (result.status === 200) {
                setSelectedAccount(result.data);
                setAccountDetailsVisible(true);
            }
        } catch (error) {
            console.error('Error fetching account details:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch account details.', life: 3000 });
        }
    };

    const onDeleteSelected = () => {
        if (selectedAccounts && selectedAccounts.length > 0) {
            onDelete(selectedAccounts);
            setSelectedAccounts(null);
        } else {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please select an account to delete!', life: 3000 });
        }
    };

    const onCreateAccount = () => {
        confirmDialog({
            message: 'Are you sure you want to create a new account?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //const newAccount = { id: accounts.length + 1, number: `AC-${Date.now()}`, name: 'New Account', balance: 0 };
                onCreate();
                // toast.current.show({ severity: 'success', summary: 'Account Created', detail: 'New account has been created.', life: 3000 });
            }
        });
    };

    const onUpdateAccount = () => {
        if (!selectedAccounts || selectedAccounts.length !== 1) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please select one account to update!', life: 3000 });
        } else {
            const account = selectedAccounts[0];
            setAccountUpdateData({ name: account.name, balance: account.balance });
            setDialogVisible(true);
        }
    };

    const onSaveUpdate = () => {
        const updatedAccount = { ...selectedAccounts[0], ...accountUpdateData };
        onUpdate(updatedAccount);
        toast.current.show({ severity: 'success', summary: 'Account Updated', detail: 'Account has been updated.', life: 3000 });
        setDialogVisible(false);
    };

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Bank Accounts</h5>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search by Account Number or Name"
                    style={{ width: '23rem' }}
                />
            </IconField>
        </div>
    );
    

    const toolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Create Account" icon="pi pi-plus" className="p-button-success" onClick={onCreateAccount} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger ml-2" onClick={onDeleteSelected} disabled={!selectedAccounts || !selectedAccounts.length} />
                <Button label="Update Account" icon="pi pi-pencil" className="p-button-info ml-2" onClick={onUpdateAccount} disabled={!selectedAccounts || selectedAccounts.length !== 1} />
            </React.Fragment>
        );
    };

    return (
        <div>
            <Toast ref={toast} />
            <Toolbar className="mb-4" left={toolbarTemplate} />

            <DataTable
                value={globalFilter.length > 0 ? filteredAccounts : accounts} // Filtrelenmiş hesaplar gösteriliyor
                selection={selectedAccounts}
                onSelectionChange={(e) => setSelectedAccounts(e.value)}
                header={header}
                paginator
                rows={10}
                dataKey="id"
                responsiveLayout="scroll"
                onRowClick={onRowSelect}
                selectionMode="checkbox"
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="number" header="Account Number" sortable></Column>
                <Column field="name" header="Account Name" sortable></Column>
                <Column field="balance" header="Balance" sortable></Column>
            </DataTable>

            <Dialog visible={dialogVisible} onHide={() => setDialogVisible(false)} header="Update Account" modal>
                <div className="p-fluid">
                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="name">Account Name</label>
                        <InputText id="name" value={accountUpdateData.name} onChange={(e) => setAccountUpdateData({ ...accountUpdateData, name: e.target.value })} />
                    </div>
                    <div className="p-field" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="balance">Balance</label>
                        <InputText id="balance" value={accountUpdateData.balance} onChange={(e) => setAccountUpdateData({ ...accountUpdateData, balance: e.target.value })} />
                    </div>
                </div>
                <Button label="Update" icon="pi pi-check" onClick={onSaveUpdate} style={{ marginTop: '1rem' }} />
            </Dialog>

            <Dialog visible={accountDetailsVisible} onHide={() => setAccountDetailsVisible(false)} header="Account Details" modal>
                {selectedAccount && (
                    <div>
                        <p><strong>Account Number:</strong> {selectedAccount.number}</p>
                        <p><strong>Account Name:</strong> {selectedAccount.name}</p>
                        <p><strong>Balance:</strong> {selectedAccount.balance}</p>
                        <p><strong>Created At:</strong> {selectedAccount.createdAt}</p>
                        <p><strong>Updated At:</strong> {selectedAccount.updatedAt}</p>
                    </div>
                )}
            </Dialog>

            <ConfirmDialog />
        </div>
    );
};

export default BankAccountTable;
