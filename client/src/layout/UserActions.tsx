import { Link } from 'react-router-dom';
import './UserActions.scss';
import { useUser } from '../user/UserContext';

const UserActions = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <div className="user-button">{user?.firstName}</div>
      ) : (
        <Link className="user-button" to="/signin">
          Sign in
        </Link>
      )}
    </>
  );
};

export default UserActions;
