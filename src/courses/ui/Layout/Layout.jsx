import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </>
  );
};
