import './UserActions.scss';
import { useUser } from './user/UserContext';
import Modal from '../components/Modal';
import SignIn from './SignIn';
import { useEffect, useState } from 'react';
import SignUp from './SignUp';
import { apiFetch } from '../api';

const UserActions = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [action, setAction] = useState<'signUp' | 'signIn' | null>(null);

  const { user, signin } = useUser();

  const getCurrentUser = async () => {
    const currentUser = await apiFetch('/auth/user', {
      method: 'GET',
    });
    signin(currentUser);
  };

  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, [user]);

  const handleOpenSignUp = () => {
    setModalOpen(true);
    setAction('signUp');
  };

  const handleOpenSignIn = () => {
    setModalOpen(true);
    setAction('signIn');
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setAction(null);
  };

  return (
    <div className="user-button">
      {user ? (
        <>
          <div className="user-button">{user?.firstName}</div>
          <img src="/User.svg" alt="User" />
        </>
      ) : (
        <button onClick={handleOpenSignIn}>
          <img src="/User.svg" alt="User" />
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {action === 'signIn' && (
          <SignIn onSuccess={handleModalClose} onSignUp={handleOpenSignUp} />
        )}
        {action === 'signUp' && <SignUp onSignIn={handleOpenSignIn} />}
      </Modal>
    </div>
  );
};

export default UserActions;
