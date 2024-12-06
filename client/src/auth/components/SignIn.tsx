import React, { useState } from 'react';
import { LoginCredentials } from '../model/LoginCredentials';
import { useUser } from '../UserContext';
import AuthApi from '../api/AuthApi';
import './Auth.scss';

type SignInProps = {
  onSignUp: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};
const SignIn: React.FC<SignInProps> = ({ onSignUp, onSuccess, onError }) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<boolean>(false);

  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const signedUser = await AuthApi.signIn(formData);
      setUser(signedUser);
      onSuccess?.();
    } catch (error) {
      setError(true);
      onError?.();
    }
  };

  // TODO: Add eye icon for reveling password and use same component on signin and signup

  return (
    <div className="sign-in">
      <h2>Welcome to articles database</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="on"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <div>
        New to The News?{' '}
        <button className="link" onClick={onSignUp}>
          Sign up
        </button>
        {error && <div>Error signing in.</div>}
      </div>
    </div>
  );
};

export default SignIn;
