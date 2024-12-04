import Header from './Header';
import './Layout.scss';
import ArticlesPage from '../articles/ArticlesPage';

function Layout() {
  return (
    <>
      <Header />
      <div className="app">
        <ArticlesPage />
      </div>
    </>
  );
}

export default Layout;
