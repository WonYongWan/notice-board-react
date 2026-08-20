import './auth.scss';
import { supabase } from '../../services/supabase';
import { Link } from 'react-router';

const Signup = () => {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
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
      <form className="signup__form">
        <div className="signup__field">
          <span className="signup__label">
            이메일&nbsp;<span className="accent">*</span>
          </span>
          <input className="input" type="email" placeholder="이메일을 입력해주세요" />
        </div>
        <div className="signup__field">
          <span className="signup__label">
            비밀번호&nbsp;<span className="accent">*</span>
          </span>
          <input className="input" type="password" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div className="signup__field">
          <span className="signup__label">
            실명&nbsp;<span className="accent">*</span>
          </span>
          <input className="input" type="password" placeholder="홍길동" />
        </div>
        <div className="signup__field">
          <span className="signup__label">
            닉네임&nbsp;<span className="accent">*</span>
          </span>
          <input className="input" type="password" placeholder="별명은 알파벳, 한글, 숫자를 20자 이하로 입력해주세요." />
        </div>
        <button className="signup__btn signup__btn--submit" type="submit">
          회원가입
        </button>
        <p className="signup__desc signup__desc--signup">
          이미 회원이신가요?&nbsp;
          <Link to={'/login'}>로그인</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
