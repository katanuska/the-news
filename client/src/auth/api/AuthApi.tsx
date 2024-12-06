import { apiFetch } from '../../api';
import { LoginCredentials } from '../model/LoginCredentials';
import { User } from '../model/User';

interface AuthApi {
  getCurrentUser: () => Promise<User>;
  signIn: (loginCredentials: LoginCredentials) => Promise<User>;
  signUp: (user: User) => Promise<User>;
}

const AuthApiImpl: AuthApi = {
  getCurrentUser: async () => {
    const currentUser = await apiFetch('/auth/user', {
      method: 'GET',
    });
    return currentUser as User;
  },
  signIn: async (loginCredentials: LoginCredentials) => {
    const signedInUser = await apiFetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(loginCredentials),
    });
    return signedInUser as User;
  },
  signUp: async (user: User) => {
    const signedUpUser = await apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    return signedUpUser as User;
  },
};

export default AuthApiImpl;
