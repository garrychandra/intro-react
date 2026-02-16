import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

const LearningHooksPage = lazy(() => import('./LearningHooks'))
const PostListPage = lazy(() => import('./PostList'))
const PostDetailPage = lazy(() => import('./PostDetail'))

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <BrowserRouter> 
    <Routes>
      <Route path="/learning-hooks" element={<LearningHooksPage/>} />
      <Route path="/post" element={<PostListPage/>} />
      <Route path="/post/:id" element={<PostDetailPage/>} />
    </Routes>
    {/* <App /> */}
  </BrowserRouter>
  //</StrictMode>,
)
