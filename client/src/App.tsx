import { UserProvider } from './auth/user/UserContext';
import Layout from './layout/Layout';

function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
}

export default App;
