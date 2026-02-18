import { Toolbar, AppBar, Button, Box, Stack, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { authActions } from "../store/authSlice";
import { Link } from "react-router";

export function Layout(prps: PropsWithChildren) {
  const userInfo = useAppSelector(state => state.auth.userInfo)
  const dispatch = useAppDispatch()
  
  const handleLogout = () => {
    dispatch(authActions.setUserInfo(undefined))
  }
  
  return <Stack>
    <AppBar position="static">
      <Toolbar>
        <Box display='flex' justifyContent="space-between" flexGrow={1}>
            <Box />
        <Box display='flex' alignItems='center' gap={2}>
          {!userInfo ? (
            <Link to='/login'><Button color="inherit">Login</Button></Link>
          ) : (
            <>
              <Typography variant="body1">Welcome, {userInfo.name}</Typography>
              <Button color="inherit" component={Link} to='/profile'>Profile</Button>
              <Button color="inherit" component={Link} to='/yourpost'>Your Posts</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}    
        </Box>
        </Box>
      </Toolbar>
    </AppBar>
    {prps.children}
  </Stack>
}