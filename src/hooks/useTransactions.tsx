import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transactions {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdDate: Date;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

type TransactionInput = Omit<Transactions, 'id' | 'createdDate'>

interface TransactionsContextProps {
  transactions: Transactions[];
  createTransaction: (x: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps);

export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    api.get('http://localhost:3000/api/transactions')
    .then(res => setTransactions(res.data.transactions));
  }, []);

  const createTransaction = async (transactionData: TransactionInput) => {
    const res = await api.post('/transactions', { ...transactionData, createdDate: new Date() });
    const { transaction } = res.data;

    setTransactions([ ...transactions, transaction ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}