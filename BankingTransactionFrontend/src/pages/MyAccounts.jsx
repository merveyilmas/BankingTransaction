import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import AccountTable from '../layouts/AccountTable';
import AccountService from '../services/AccountService';

export default function MyAccounts() {

  const toast = useRef(null);
  const accountService = new AccountService();

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {

    accountService.getAllAccountsByAuthUser().then(result => {
      if (result.status === 200) {
        setAccounts(result.data); 
      }
    }).catch(error => {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
    });

  };

  const handleDelete = (selectedAccounts) => {
    if (selectedAccounts && selectedAccounts.length > 0) {
      fetchAccounts(); // Güncel hesapları çekmek için
      toast.current.show({ severity: 'success', summary: 'Deleted', detail: 'Selected accounts have been deleted', life: 3000 });
    }
  };

  const handleCreate = () => {

    accountService.createAccount().then(result => {

      if (result.status === 200) {
        fetchAccounts(); // Yeni hesabı ekledikten sonra güncel hesapları çekin
        toast.current.show({ severity: 'success', summary: 'Account Created', detail: 'New account has been created', life: 3000 });
      }

    }).catch(error => {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
    });

  };

  const handleUpdate = (updatedAccount) => {
    accountService.updateAccount(updatedAccount).then(result => {
      if (result.status === 200) {
        fetchAccounts(); // Hesap güncellemesi yaptıktan sonra güncel hesapları çekin
        toast.current.show({ severity: 'success', summary: 'Account Updated', detail: 'Account has been updated', life: 3000 });
      }
    }).catch(error => {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
    });
  };

  return (
    <div style={{ width: '100%', height: "100%" }}>
      <Toast ref={toast} />
      <Card>
        <h3 style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>Accounts</h3>
        <AccountTable
          accounts={accounts}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      </Card>
    </div>
  );
}
