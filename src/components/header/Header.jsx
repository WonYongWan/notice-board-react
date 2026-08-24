import { Link, useNavigate } from 'react-router';
import './Header.scss';
import Container from '../layout/Container';
import { useAuth } from '../../context/useAuth';
import { supabase } from '../../services/supabase';

const Header = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃 실패', error);
      return;
    }

    navigate('/');
  };

  if (loading) return null;

  return (
    <header className="header">
      <Container>
        <h1 className="header__title">
          <Link to={'/'}>
            <span>FREE NOTICE</span>
          </Link>
        </h1>
        {!user && (
          <div className="header__actions">
            <Link className="header__btn" to={'/login'}>
              로그인
            </Link>
            <Link className="header__btn header__btn--variant-1" to={'/signup'}>
              회원가입
            </Link>
          </div>
        )}
        {user && (
          <div className="header__actions">
            <div className="header__user">
              <button className="header__btn"></button>
            </div>
            <button className="header__btn header__btn--variant-1" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
