import React, { useRef, useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AccountService from '../services/AccountService';
import TransactionService from '../services/TransactionService';
import { useSelector, useDispatch } from 'react-redux'
import { getAllAccountsByAuthUser } from '../store/actions/AccountAction';

export default function TransactionHistory() {

  const toast = useRef(null);
  const dispatch = useDispatch()
  const accountService = new AccountService();
  const transactionService = new TransactionService();

  const { accounts } = useSelector(state => state.account)
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

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

  useEffect(() => {

    if (selectedAccount) {
      console.log(selectedAccount)

      const fetchTransactions = async () => {

        transactionService.getTransactionsByAccountId().then(result => {

          if (result.status === 200) {
            console.log(result.data)
            setTransactions(result.data);
          }

        }).catch(error => {
          console.error(error);
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load transactions', life: 3000 });
        });

      };

      fetchTransactions();
    }

  }, [selectedAccount]);

  return (
    <div style={{ width: '100%', height: "100%" }}>
      <Toast ref={toast} />

      <Card>

        <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
          Transaction History
        </h3>

        <div className="p-field" style={{ marginBottom: '1rem' }}>
          <label htmlFor="account-dropdown" style={{ marginBottom: '0.5rem', display: 'block' }}>Select Account</label>
          <Dropdown
            id="account-dropdown"
            value={selectedAccount}
            options={accountOptions}
            onChange={(e) => setSelectedAccount(e.value)}
            optionLabel="label"
            optionValue="value"
            placeholder="Select an Account"
            style={{ width: '100%' }}
          />
        </div>

        {selectedAccount && (
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Transaction Details</h4>
            <DataTable value={transactions} paginator rows={10}>
              <Column field="date" header="Date" />
              <Column field="description" header="Description" />
              <Column field="amount" header="Amount" />
            </DataTable>
          </div>
        )}

      </Card>
    </div>
  );
}
