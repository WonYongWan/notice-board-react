import './auth.scss';
import { supabase } from '../../services/supabase';
import { Link, useNavigate } from 'react-router';
import useInput from '../../hooks/useInput';
import { useRef, useState } from 'react';

const Signup = () => {
  const email = useInput();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRef = useRef();
  const [emailError, setEmailError] = useState(false);
  const password = useInput();
  const passwordRef = useRef();
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordFormatError, setPasswordFormatError] = useState(false);
  const name = useInput();
  const nameRef = useRef();
  const [nameError, setNameError] = useState(false);
  const nickname = useInput();
  const nicknameRef = useRef();
  const [nicknameError, setNicknameError] = useState(false);
  const [nicknameLengthOver, setNicknameLengthOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorStatus429Flag, setErrorStatus429Flag] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    email.onChange(e);
    setEmailError(!emailRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    password.onChange(e);

    const isTooShort = value.length < 6;
    setPasswordLengthError(isTooShort);

    if (value.length >= 6) {
      const hasAlphabet = /[A-Za-z]/.test(value);
      const hasNumber = /\d/.test(value);

      setPasswordFormatError(!hasAlphabet || !hasNumber);
    } else {
      setPasswordFormatError(false);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    name.onChange(e);
    setNameError(value.trim().length < 2);
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    const length = value.trim().length;
    nickname.onChange(e);
    setNicknameError(length < 1 || length > 20);
    setNicknameLengthOver(length > 20);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorFlag(false);
    setErrorStatus429Flag(false);

    if (!emailRegex.test(email.value)) {
      setErrorFlag(true);
      setEmailError(true);
      emailRef.current.focus();
      return;
    }

    if (password.value.length < 6) {
      setErrorFlag(true);
      setPasswordLengthError(true);
      passwordRef.current.focus();
      return;
    }

    if (!/[A-Za-z]/.test(password.value) || !/\d/.test(password.value)) {
      setErrorFlag(true);
      setPasswordFormatError(true);
      passwordRef.current.focus();
      return;
    }

    if (name.value.trim().length < 2) {
      setErrorFlag(true);
      setNameError(true);
      nameRef.current.focus();
      return;
    }

    if (nickname.value.trim().length < 1 || nickname.value.trim().length > 20) {
      setErrorFlag(true);
      setNicknameError(true);
      nicknameRef.current.focus();
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.value.trim(),
      password: password.value,
      options: {
        data: {
          name: name.value.trim(),
          nickname: nickname.value.trim(),
        },
      },
    });

    console.log('signup data:', data);
    console.log('signup error:', error);
    console.log('session:', data?.session);
    console.log('user:', data?.user);

    setLoading(false);

    if (error) {
      console.error(error);
      setErrorFlag(true);
      if (error.status === 429) {
        setErrorStatus429Flag(true);
      }
      return;
    }

    navigate('/signup-complete', {
      state: { fromSignup: true, nickname: data.user.user_metadata.nickname },
    });
  };

  return (
    <div className="signup">
      <h2 className="signup__title">
        <Link to={'/'}>
          <span>FREE NOTICE</span>
        </Link>
        에 오신것을 환영합니다.
      </h2>
      <p className="signup__desc">자유롭게 글을 작성해 봐요!</p>
      <h3 className="signup__sub-title">SNS 회원가입</h3>
      <div className="signup__sns">
        <button className="signup__btn signup__btn--sns" type="button" onClick={handleGoogleLogin}>
          <span className="icon icon--google"></span>
        </button>
      </div>
      <h3 className="signup__sub-title signup__sub-title--id-login">
        <span>회원가입에 필요한 기본정보를 입력해주세요.</span>
      </h3>
      <form className="signup__form" onSubmit={handleSignup}>
        {errorFlag && errorStatus429Flag && (
          <div className="login__failed">
            <span className="login__failed-title">
              <span className="icon icon--failed" aria-hidden="true"></span>회원가입 실패
            </span>
            <span className="login__failed-desc">요청이 많아 처리할 수 없습니다. 잠시 후 다시 시도해주세요.</span>
          </div>
        )}
        <div className={errorFlag && emailError ? 'signup__field signup__field--empty' : `signup__field`}>
          <span className="signup__label">
            이메일&nbsp;<span className="accent">*</span>
          </span>
          <input className="input" type="email" placeholder="이메일을 입력해주세요" required ref={emailRef} value={email.value} onChange={handleEmailChange} />
          {errorFlag && emailError && <span className="signup__empty-message">유효한 이메일 주소를 입력해주세요.</span>}
        </div>
        <div className={errorFlag && (passwordLengthError || passwordFormatError) ? 'signup__field signup__field--empty' : `signup__field`}>
          <span className="signup__label">
            비밀번호&nbsp;<span className="accent">*</span>
          </span>
          <input className="input" type="password" placeholder="최소 6자 이상(알파벳, 숫자 필수)" required ref={passwordRef} value={password.value} onChange={handlePasswordChange} />
          {errorFlag && passwordLengthError && <span className="signup__empty-message">비밀번호는 6자 이상 입력해주세요.</span>}
          {errorFlag && passwordFormatError && <span className="signup__empty-message">비밀번호는 알파벳과 숫자를 포함해주세요.</span>}
        </div>
        <div className={errorFlag && nameError ? 'signup__field signup__field--empty' : `signup__field`}>
          <span className="signup__label">
            실명&nbsp;<span className="accent">*</span>
          </span>
          <input className="input" type="text" placeholder="홍길동" required ref={nameRef} value={name.value} onChange={handleNameChange} />
          {errorFlag && nameError && <span className="signup__empty-message">실명은 최소 2자 이상 입력하세요.</span>}
        </div>
        <div className={errorFlag && nicknameError ? 'signup__field signup__field--empty' : `signup__field`}>
          <span className="signup__label">
            닉네임&nbsp;<span className="accent">*</span>
          </span>
          <input className="input" type="text" placeholder="별명은 20자 이하로 입력해주세요." required ref={nicknameRef} value={nickname.value} onChange={handleNicknameChange} />
          {errorFlag && nicknameError && <span className="signup__empty-message">{!nicknameLengthOver ? '닉네임은 최소 1자 이상으로 입력하세요.' : '닉네임은 최대 20자 이하로 입력하세요.'}</span>}
        </div>
        {loading ? (
          <button className="signup__btn signup__btn--submit" type="submit" disabled>
            <span className="login__loading"></span> 회원가입 중...
          </button>
        ) : (
          <button className="signup__btn signup__btn--submit" type="submit">
            회원가입
          </button>
        )}
        <p className="signup__desc signup__desc--signup">
          이미 회원이신가요?&nbsp;
          <Link to={'/login'}>로그인</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
