import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppRoutes } from './config/AppRoutes'
import { Layout } from './components/Layout'

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3
      }
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined'
      }
    },
  }
})

const LearningHooksPage = lazy(() => import('./LearningHooks'))
const PostListPage = lazy(() => import('./pages/PostList'))
const PostDetailPage = lazy(() => import('./pages/PostDetail'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)

