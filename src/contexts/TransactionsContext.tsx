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
}

interface TransactionContextProviderProps {
  children: React.ReactNode
}

export const TransactionsContext = createContext<TransactionsContextType>({} as TransactionsContextType)

export function TransactionsContextProvider({ children }: TransactionContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query
      }
    })

    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      fetchTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}