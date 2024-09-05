import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';

const BankAccountTable = ({ accounts, onDelete, onCreate, onUpdate }) => {

    const toast = useRef(null);
    const navigate = useNavigate();

    const [selectedAccounts, setSelectedAccounts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [accountDetailsVisible, setAccountDetailsVisible] = useState(false); // Hesap detayları için dialog kontrolü
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [accountUpdateData, setAccountUpdateData] = useState({ name: '', balance: '' });

    const onRowSelect = (e) => {
        setSelectedAccount(e.data);  // Seçilen hesap bilgilerini kaydet
        setAccountDetailsVisible(true);  // Detayları göstermek için modal aç
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
                const newAccount = { id: accounts.length + 1, number: `AC-${Date.now()}`, name: 'New Account', balance: 0 };
                onCreate(newAccount);
                toast.current.show({ severity: 'success', summary: 'Account Created', detail: 'New account has been created.', life: 3000 });
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
            <span className="p-input-icon-left">
                <i className="pi pi-search ml-2" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="    Search..." />
            </span>
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
                value={accounts}
                selection={selectedAccounts}
                onSelectionChange={(e) => setSelectedAccounts(e.value)}
                globalFilter={globalFilter}
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

            {/* Hesap güncelleme için Dialog */}
            <Dialog visible={dialogVisible} onHide={() => setDialogVisible(false)} header="Update Account" modal>
                <div>
                    <div className="p-field">
                        <label htmlFor="name">Account Name</label>
                        <InputText id="name" value={accountUpdateData.name} onChange={(e) => setAccountUpdateData({ ...accountUpdateData, name: e.target.value })} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="balance">Balance</label>
                        <InputText id="balance" value={accountUpdateData.balance} onChange={(e) => setAccountUpdateData({ ...accountUpdateData, balance: e.target.value })} />
                    </div>
                </div>
                <Button label="Update" icon="pi pi-check" onClick={onSaveUpdate} />
            </Dialog>

            {/* Hesap Detayları için Dialog */}
            <Dialog visible={accountDetailsVisible} onHide={() => setAccountDetailsVisible(false)} header="Account Details" modal>
                {selectedAccount && (
                    <div>
                        <p><strong>Account Number:</strong> {selectedAccount.number}</p>
                        <p><strong>Account Name:</strong> {selectedAccount.name}</p>
                        <p><strong>Balance:</strong> {selectedAccount.balance}</p>
                    </div>
                )}
            </Dialog>

            <ConfirmDialog />
        </div>
    );
};

export default BankAccountTable;
