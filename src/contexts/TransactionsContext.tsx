import { createContext, useEffect, useState } from "react"
import { api } from "../lib/axios"

export interface TransactionProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  value: number
  createdAt: string
}

interface TransactionsContextType {
  transactions: TransactionProps[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionContextProviderProps {
  children: React.ReactNode
}

interface CreateTransactionInput {
  description: string
  value: number
  category: string
  type: 'income' | 'outcome'
}

export const TransactionsContext = createContext<TransactionsContextType>({} as TransactionsContextType)

export function TransactionsContextProvider({ children }: TransactionContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, value, category, type } = data

    const response = await api.post('/transactions', {
      description,
      value,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions(state => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      fetchTransactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}