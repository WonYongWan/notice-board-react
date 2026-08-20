import { Link } from 'react-router';
import './Header.scss';
import Container from '../layout/Container';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <h1 className="header__title">
          <Link to={'/'}>
            <span>FREE NOTICE</span>
          </Link>
        </h1>
        <div className="header__actions">
          <Link className="header__btn" to={'/login'}>
            로그인
          </Link>
          <Link className="header__btn header__btn--variant-1" to={'/signup'}>
            회원가입
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
