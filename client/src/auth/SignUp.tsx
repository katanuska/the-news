import React, { useState } from 'react';
import { apiFetch } from '../api';
import './Auth.scss';

type SignUpProps = {
  onSignIn: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ onSignIn, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [signUpResult, setSignUpResult] = useState<'success' | 'error' | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Add password complexity validation
    // TODO: Add forgot pasword

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSignUpResult('success');
      onSuccess?.();
    } catch (error) {
      setSignUpResult('error');
      onError?.();
    }
  };

  if (signUpResult === 'success') {
    return (
      <div className="sign-up">
        <h2>Check your email</h2>
        <p>
          Verification mail nas been sent to <i>{formData.email}</i>. Pleas
          follow the link in the email to complete your registration.
        </p>

        {/* TODO: resend verification email
        <div>
          If you did not received this email, click{' '}
          <button className="link" onClick={handleSendVerificationMail}>
            here
          </button>{' '}
          to resend it.
        </div> */}
      </div>
    );
  }

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
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
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        {signUpResult === 'error' && <div>Error signing up.</div>}
      </form>
      <div>
        Have an account?{' '}
        <button className="link" onClick={onSignIn}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default SignUp;
