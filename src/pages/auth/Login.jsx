import './auth.scss';
import { supabase } from '../../services/supabase';
import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailEmptyFlag, setEmailEmptyFlag] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordEmptyFlag, setPasswordEmptyFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      emailRef.current.focus();
      return;
    }

    if (!password.trim()) {
      passwordRef.current.focus();
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorFlag(true);
      return;
    }

    navigate('/');
  };

  const onChangeEmaill = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailEmptyFlag(value.trim().length === 0);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordEmptyFlag(value.trim().length === 0);
  };

  return (
    <div className="login">
      <h2 className="login__title">
        <Link to={'/'}>
          <span>FREE NOTICE</span>
        </Link>
        에 오신것을 환영합니다.
      </h2>
      <p className="login__desc">자유롭게 글을 작성해 봐요!</p>
      <h3 className="login__sub-title">SNS 로그인</h3>
      <div className="login__sns">
        <button className="login__btn login__btn--sns" type="button" onClick={handleGoogleLogin}>
          <span className="icon icon--google"></span>
        </button>
      </div>
      <h3 className="login__sub-title login__sub-title--id-login">
        <span>FREE NOTICE 로그인</span>
      </h3>
      <form className="login__form" onSubmit={handleLogin}>
        {errorFlag && (
          <div className="login__failed">
            <span className="login__failed-title">
              <span className="icon icon--failed" aria-hidden="true"></span>로그인 실패
            </span>
            <span className="login__failed-desc">아이디 또는 비밀번호가 틀렸습니다.</span>
            {/* <span className="login__failed-desc">요청이 많아 처리할 수 없습니다. 잠시 후 다시 시도해주세요.</span> */}
          </div>
        )}
        <div className={errorFlag && emailEmptyFlag ? 'login__field login__field--empty' : `login__field`}>
          <label className="login__label">
            이메일&nbsp;<span className="accent">*</span>
          </label>
          <input className="input" type="email" placeholder="이메일를 입력해주세요" required ref={emailRef} value={email} onChange={onChangeEmaill} />
          {errorFlag && emailEmptyFlag && <span className="login__empty-message">아이디를 입력해주세요.</span>}
        </div>
        <div className={errorFlag && passwordEmptyFlag ? 'login__field login__field--empty' : `login__field`}>
          <label className="login__label">
            비밀번호&nbsp;<span className="accent">*</span>
          </label>
          <input className="input" type="password" placeholder="비밀번호를 입력해주세요" required ref={passwordRef} value={password} onChange={onChangePassword} />
          {errorFlag && passwordEmptyFlag && <span className="login__empty-message">비밀번호를 입력해주세요.</span>}
        </div>
        <div className="login__forgot">
          <Link className="login__btn login__btn--forgot" to={'/forgot'}>
            계정찾기
          </Link>
        </div>
        {loading ? (
          <button className="login__btn login__btn--submit" type="submit" disabled>
            <span className="login__loading"></span> 로그인 중...
          </button>
        ) : (
          <button className="login__btn login__btn--submit" type="submit">
            로그인
          </button>
        )}
        <p className="login__desc login__desc--signup">
          아직 회원이 아니신가요?&nbsp;
          <Link to={'/signup'}>회원가입</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
