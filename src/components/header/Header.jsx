import { Link } from 'react-router';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">
        <Link to={'/'}>
          <span className="header__logo" aria-hidden="true"></span>
        </Link>
      </h1>
    </header>
  );
};

export default Header;
