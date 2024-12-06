import { useEffect, useState } from 'react';
import { useUser } from '../../auth/UserContext';
import './CategoryMenu.scss';

export type Categorie =
  | 'home'
  | 'favorites'
  | 'general'
  | 'business'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

type CategoryMap = Map<Categorie, { icon: string; label: string }>;

const CATEGORY_ITEMS: CategoryMap = new Map([
  [
    'home',
    {
      icon: '/Home.svg',
      label: 'Home',
    },
  ],
  [
    'general',
    {
      icon: '/General.svg',
      label: 'General',
    },
  ],
  [
    'business',
    {
      icon: '/Business.svg',
      label: 'Business',
    },
  ],
  [
    'health',
    {
      icon: '/Health.svg',
      label: 'Health',
    },
  ],
  [
    'science',
    {
      icon: '/Science.svg',
      label: 'Science',
    },
  ],
  [
    'sports',
    {
      icon: '/Sports.svg',
      label: 'Sports',
    },
  ],
  [
    'technology',
    {
      icon: '/Technology.svg',
      label: 'Technology',
    },
  ],
]);

const FAVORITES = {
  icon: '/Favorites.svg',
  label: 'Favorites',
};

type CategorieMenuProps = {
  category: Categorie;
  onCategoryChange: (category: Categorie) => void;
};

const CategorieMenu: React.FC<CategorieMenuProps> = ({
  category: category,
  onCategoryChange,
}) => {
  const { user } = useUser();
  const [cateogries, setCategories] = useState<CategoryMap>(CATEGORY_ITEMS);

  useEffect(() => {
    if (user) {
      setCategories((previousCateogires: CategoryMap) => {
        previousCateogires.set('favorites', FAVORITES);
        return previousCateogires;
      });
    }
  }, [user]);

  return (
    <nav className="menu">
      {Array.from(cateogries).map(([key, value]) => {
        return (
          <button
            key={key}
            className={category === key ? 'selected menu-item' : 'menu-item'}
            onClick={() => onCategoryChange(key)}
          >
            <img src={value.icon} alt="home" />
            <small className="menu-text">{value.label}</small>
          </button>
        );
      })}
    </nav>
  );
};

export default CategorieMenu;
