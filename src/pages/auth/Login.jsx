import './auth.scss';
import { supabase } from '../../services/supabase';
import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import useInput from '../../hooks/useInput';

const Login = () => {
  const email = useInput();
  const password = useInput();
  const [loading, setLoading] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [rateLimitError, setRateLimitError] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
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

    if (!email.value.trim()) {
      emailRef.current.focus();
      return;
    }

    if (!password.value.trim()) {
      passwordRef.current.focus();
      return;
    }

    setErrorFlag(false);
    setRateLimitError(false);
    setEmailNotConfirmed(false);

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value,
    });

    setLoading(false);

    if (error) {
      console.log(error);

      if (error.status === 429) {
        setRateLimitError(true);
        setErrorFlag(true);
        return;
      }

      if (error.message === 'Email not confirmed') {
        setEmailNotConfirmed(true);
        setErrorFlag(true);
        return;
      }

      setErrorFlag(true);
      return;
    }

    navigate('/');
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
            {rateLimitError ? <span className="login__failed-desc">요청이 많아 처리할 수 없습니다. 잠시 후 다시 시도해주세요.</span> : emailNotConfirmed ? <span className="login__failed-desc">이메일 인증을 완료해주세요.</span> : <span className="login__failed-desc">아이디 또는 비밀번호가 틀렸습니다.</span>}
          </div>
        )}
        <div className={errorFlag && email.flag ? 'login__field login__field--empty' : `login__field`}>
          <label className="login__label">
            이메일&nbsp;<span className="accent">*</span>
          </label>
          <input className="input" type="email" placeholder="이메일를 입력해주세요" required ref={emailRef} value={email.value} onChange={email.onChange} />
          {errorFlag && email.flag && <span className="login__empty-message">아이디를 입력해주세요.</span>}
        </div>
        <div className={errorFlag && password.flag ? 'login__field login__field--empty' : `login__field`}>
          <label className="login__label">
            비밀번호&nbsp;<span className="accent">*</span>
          </label>
          <input className="input" type="password" placeholder="비밀번호를 입력해주세요" required ref={passwordRef} value={password.value} onChange={password.onChange} />
          {errorFlag && password.flag && <span className="login__empty-message">비밀번호를 입력해주세요.</span>}
        </div>
        <div className="login__forgot">
          <Link className="login__btn login__btn--forgot" to={'/account-find'}>
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
