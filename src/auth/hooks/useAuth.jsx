import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();

  const handlerLogin = async (data) => {
    try {
      const response = await login(data);
      const token = response.data.token;

      sessionStorage.setItem(
        'login',
        JSON.stringify({
          isAuth: true,
        }),
      );
      sessionStorage.setItem('token', `Bearer ${token}`);
      navigate('/app');
    } catch (error) {
      if (error.response?.status == 401) {
        Swal.fire('Error Login', 'Username o password invalidos', 'error');
      } else if (error.response?.status == 403) {
        Swal.fire('Error Login', 'No tiene acceso al recurso o permisos!', 'error');
      } else {
        throw error;
      }
    }
  };

  const handlerLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
    sessionStorage.clear();
  };
  return {
    login: {
      isAuth,
    },
    handlerLogin,
    handlerLogout,
  };
};
