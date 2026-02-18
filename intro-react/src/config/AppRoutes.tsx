import { lazy } from "react"
import { Routes, Route, Navigate } from "react-router"
import { useAppSelector } from "../hooks/useAppSelector"

const HomePage = lazy(() => import('../pages/HomePage'))
const PostListPage = lazy(() => import('../pages/PostList'))
const PostDetailPage = lazy(() => import('../pages/PostDetail'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const YourPostsPage = lazy(() => import('../pages/YourPostPage'))
export const AppRoutes = () => {
  const { userInfo, isLoading } = useAppSelector(state => state.auth)

  if(isLoading) {
    return <div>Loading...</div>
  }
  
  return <Routes>
    <Route path='/login' element={!userInfo ? <LoginPage /> : <Navigate to="/" />} />
    <Route path='/' element={userInfo ? <HomePage /> : <Navigate to="/login" />} />
    <Route path='/post' element={userInfo ? <PostListPage /> : <Navigate to="/login" />} />
    <Route path='/post/:id' element={userInfo ? <PostDetailPage /> : <Navigate to="/login" />} />
    <Route path='/profile' element={userInfo ? <ProfilePage /> : <Navigate to="/login" />} />
    <Route path='/yourpost' element={userInfo ? <YourPostsPage /> : <Navigate to="/login" />} />
  </Routes>
}