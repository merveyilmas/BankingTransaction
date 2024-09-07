import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import AccountTable from '../layouts/AccountTable';
import AccountService from '../services/AccountService';
import { useSelector, useDispatch } from 'react-redux'
import { getAllAccountsByAuthUser } from '../store/actions/AccountAction';

export default function MyAccounts() {

  const toast = useRef(null);
  const dispatch = useDispatch()
  const accountService = new AccountService();

  const { accounts } = useSelector(state => state.account)

  useEffect(() => {
    fetchAccounts();
  }, [dispatch]);

  const fetchAccounts = async ()  => {

    dispatch(getAllAccountsByAuthUser());

    if(accounts.length === 0){
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Accounts can not fetch!', life: 3000 });
    }

  };

  const handleDelete = async(selectedAccounts) => {

    if (selectedAccounts && selectedAccounts.length > 0) {
      try {
          // Tüm hesapları silme işlemlerini yapacak bir dizi oluşturun
          const deletePromises = selectedAccounts.map(account =>
              accountService.deleteAccount(account.id)
          );
  
          // Tüm silme işlemlerini bekleyin
          await Promise.all(deletePromises);
  
          // Hesapları güncelleyin
          await fetchAccounts();
  
          // Başarı mesajını gösterin
          toast.current.show({  severity: 'success',  summary: 'Deleted',   detail: 'Selected accounts have been deleted', life: 3000 });
      } catch (error) {
          console.error(error);
          toast.current.show({
              severity: 'error',
              summary: 'Error',
              detail: error.response ? error.response.data.message : 'An error occurred',
              life: 3000
          });
      }
  }
  
  };

  const handleCreate = async() => {
    
    accountService.createAccount().then(async result => {

      if (result.status === 201) {

        await fetchAccounts();       
        toast.current.show({ severity: 'success', summary: 'Account Created', detail: 'New account has been created', life: 3000 });
      }

    }).catch(error => {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.data.message, life: 3000 });
    });

  };

  const handleUpdate = async(updatedAccount) => {

    accountService.updateAccount(updatedAccount.id, updatedAccount).then(async result => {

      if (result.status === 200) {
        await fetchAccounts();
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
        <h3 style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>My Accounts</h3>
        <AccountTable
          accounts={accounts}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          fetchAccounts={fetchAccounts}
        />
      </Card>
    </div>
  );
}
