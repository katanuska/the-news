import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './auth/user/UserContext';
import Layout from './layout/Layout';
import ArticlesPage from './articles/ArticlesPage';
import SignUpPage from './auth/SignUpPage';
import SignInPage from './auth/SignInPage';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <ArticlesPage />,
          },
          {
            path: '/signup',
            element: <SignUpPage />,
          },
          {
            path: '/signin',
            element: <SignInPage />,
          },
        ],
      },
    ],
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
    <UserProvider>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </UserProvider>
  );
}

export default App;
