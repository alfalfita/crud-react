import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from '@mui/material/Container';

export const Header = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

  const config = () => {
    return {
      headers: {
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    };
  };

  const handlerLogout = () => {
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
    sessionStorage.clear();
    navigate('/');
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['repoDataUser'],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/search/${username}`, config()).then((res) => res.data),
  });

  if (data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
  }

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1DA1F2', marginBottom: '2rem' }}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
            Hello {data?.firstName} {data?.lastName}!
          </Typography>
          <Button color="inherit" href="/app">
            Dashboard
          </Button>
          <Typography variant="h7" component="div" onClick={handlerLogout}>
            Logout
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
