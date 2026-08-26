import './auth.scss';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

const SignupComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const nickname = location.state?.nickname;

  useEffect(() => {
    if (!location.state?.fromSignup) {
      navigate('/signup', { replace: true });
    }
  }, [location.state, navigate]);

  if (!location.state?.fromSignup) {
    return null;
  }

  return (
    <div className="signup-complete">
      <span className="signup-complete__visual" aria-hidden="true"></span>
      <p className="signup-complete__title">
        <span className="signup-complete__name">{nickname}</span>님, 회원가입이 완료되었어요!
      </p>
      <p className="signup-complete__message">새로 가입한 계정으로 로그인해 주세요.</p>
      <Link className="signup-complete__btn" to="/login">
        로그인하러 가기
      </Link>
    </div>
  );
};

export default SignupComplete;
