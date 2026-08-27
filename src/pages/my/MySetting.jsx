const MySetting = () => {
  return (
    <div className="my">
      <h2 className="my__title">마이페이지</h2>
      <div className="my__container">
        <div className="my__user">
          <button className="my__btn my__btn--edit" type="button"></button>
          <div className="my__user-info">
            <img className="my__user-avatar" src="" alt="프로필 이미지"></img>
            <div className="my__user-names">
              <span className="my__user-name">원용완</span>
              <span className="my__user-nickname">ㅇㅇㅇ</span>
            </div>
          </div>
          <div className="my__user-bio">
            <p className="my__user-bio-desc">"React와 TypeScript를 공부합니다"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySetting;
