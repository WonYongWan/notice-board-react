import { Link, useNavigate } from 'react-router';
import './Header.scss';
import Container from '../layout/Container';
import { useAuth } from '../../context/auth/useAuth';

const Header = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
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
        {user && profile && (
          <div className="header__actions">
            <div className="header__user">
              <Link className="header__btn header__btn--profile" to={'/my-setting'}>
                <img src={profile.profile_image} alt="프로필 이미지" />
              </Link>
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
