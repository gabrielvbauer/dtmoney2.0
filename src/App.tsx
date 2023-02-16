import { ThemeProvider } from 'styled-components'

import { Transactions } from './pages/Transactions'
import { TransactionsContextProvider } from './contexts/TransactionsContext'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsContextProvider>
        <GlobalStyle />

        <Transactions />
      </TransactionsContextProvider>
    </ThemeProvider>
  )
}
