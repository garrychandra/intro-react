import { Button, Container, Box } from "@mui/material";
import { Title } from "../components/Title";
import { Link } from "react-router";
import { useAppSelector } from "../hooks/useAppSelector";

export default function HomePage() {
  const userInfo = useAppSelector(state => state.auth.userInfo)
  
  return (
    <Container>
      <Box sx={{ maxWidth: 600, mx: 'auto', my: 4, textAlign: 'center' }}>
        <Title>Hello {userInfo?.name}!</Title>
        <Link to='/post'>
          <Button sx={{ mt: 2 }}>Go To Posts</Button>
        </Link>
      </Box>
    </Container>
  )
}