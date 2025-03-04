import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { GlobalStyle } from './GlobalStyle.ts'
import App from './App.tsx'
import ErrorFallback from './lib/components/ErrorFallback/ErrorFallback.tsx'
import AppRoutes from './routes/AppRoutes.tsx'
import { AuthProvider } from './contexts/AuthContext/AuthContext.tsx'
import { CartProvider } from './contexts/CartContext/CartContext.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <GlobalStyle />
          <AuthProvider>
            <CartProvider>
              <AppRoutes />
              <App />
            </CartProvider>
          </AuthProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
