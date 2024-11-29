import React, { useState } from 'react';
import { apiFetch } from '../api';
import { User } from './user/LoginCredentials';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';
import { useUser } from './user/UserContext';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { signin } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const signedUser = await apiFetch('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      signin(signedUser);
      navigate('/');
    } catch (error) {
      alert('Login failed!');
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
        New to The News? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default SignIn;
