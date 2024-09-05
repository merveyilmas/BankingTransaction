import React, { useRef, useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

export default function TransactionHistory() {
  const toast = useRef(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Fetch accounts when the component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Replace with your API endpoint to fetch accounts
        const response = await axios.get('/api/accounts');
        setAccounts(response.data);
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load accounts', life: 3000 });
      }
    };

    fetchAccounts();
  }, []);

  // Fetch transactions when selectedAccount changes
  useEffect(() => {
    if (selectedAccount) {
      const fetchTransactions = async () => {
        try {
          // Replace with your API endpoint to fetch transactions for the selected account
          const response = await axios.get(`/api/accounts/${selectedAccount}/transactions`);
          setTransactions(response.data);
        } catch (error) {
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load transactions', life: 3000 });
        }
      };

      fetchTransactions();
    }
  }, [selectedAccount]);

  return (
    <div style={{ width: '100%', height: "100%", padding: '2rem' }}>
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
            options={accounts}
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
