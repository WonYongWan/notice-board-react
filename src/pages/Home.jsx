import './Home.scss';
import NoticeList from './notice/NoticeList';

const Home = ({ notice }) => {
  return (
    <div className="home">
      <div className="home__notice-wrap">
        <div className="home__notice home__notice--nav">
          <div className="home__notice-header">
            <p className="home__title">공지사항</p>
            <button className="home__btn home__btn--more">더보기</button>
          </div>
          <NoticeList {...notice} />
        </div>
        <div className="home__notice home__notice--main">
          <div className="home__notice-header">
            <p className="home__title">자유게시판</p>
            <button className="home__btn home__btn--more">더보기</button>
          </div>
          <NoticeList {...notice} />
        </div>
      </div>
    </div>
  );
};

export default Home;
