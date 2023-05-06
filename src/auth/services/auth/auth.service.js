import { useMutation } from '@tanstack/react-query';
import { createUser, doLogin } from './auth.repo';

export const useLogin = (opts) => {
  return useMutation({
    mutationFn: (user) => doLogin(user),
    ...opts,
  });
};

export const useCreateUser = (opts) => {
  return useMutation({
    mutationFn: (user) => createUser(user),
    ...opts,
  });
};
