import { createContext, useEffect, useState } from "react"

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
}

interface TransactionContextProviderProps {
  children: React.ReactNode
}

export const TransactionsContext = createContext<TransactionsContextType>({} as TransactionsContextType)

export function TransactionsContextProvider({ children }: TransactionContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}