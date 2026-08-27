import './Home.scss';
import NoticeSearch from '../components/notice/NoticeSearch';
import Pagination from '../components/pagination/Pagination';
import NoticeList from '../components/notice/NoticeList';
import NoticeSort from '../components/notice/NoticeSort';
import { Link } from 'react-router';

const Home = ({ notice }) => {
  const { data, searchInput, setSearchInput, setSearchValue, currentPage, setCurrentPage, sortType, setSortType } = notice;
  const itemLength = data.length;
  const pageLength = Math.ceil(itemLength / 10);

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__banner">
          <iframe src="" frameborder="0"></iframe>
        </div>
        <div className="home__main">
          <div className="home__header">
            <NoticeSearch searchInput={searchInput} setSearchInput={setSearchInput} setSearchValue={setSearchValue} setCurrentPage={setCurrentPage} />
            <div className="home__actions">
              <NoticeSort sortType={sortType} setSortType={setSortType} setCurrentPage={setCurrentPage} />
              <Link className="home__btn home__btn--write" to={'/write'}>
                +
              </Link>
            </div>
          </div>
          <NoticeList {...notice} />
        </div>
        <div className="home__banner">
          <iframe src="" frameborder="0"></iframe>
        </div>
      </div>

      {itemLength !== 0 && (
        <div className="home__pagination">
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageLength={pageLength} />
        </div>
      )}
    </div>
  );
};

export default Home;
