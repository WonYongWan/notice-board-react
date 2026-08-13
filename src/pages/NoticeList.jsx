import './NoticeList.scss';
import { Link } from 'react-router';
import Pagination from '../components/pagination/Pagination';
import NoticeSort from '../components/notice/NoticeSort';
import NoticeFilter from '../components/notice/NoticeFilter';
import NoticeSearch from '../components/notice/NoticeSearch';
import NoticeEmpty from '../components/notice/NoticeEmpty';
import Loading from '../components/loading/Loading';

const NoticeList = ({ data, isLoading, categoryList, category, setCategory, sortType, setSortType, currentPage, setCurrentPage, setSearchValue, searchInput, setSearchInput, increaseViews }) => {
  const itemLength = data.length;
  const pageLength = Math.ceil(itemLength / 10);
  const start = currentPage * 10;
  const end = start + 10;
  const currentNoticeList = data.slice(start, end);

  const handleWriteClick = () => {
    setCategory(categoryList[0]);
  };

  return (
    <>
      <div className="notice-list__header">
        <NoticeSearch searchInput={searchInput} setSearchInput={setSearchInput} setSearchValue={setSearchValue} setCurrentPage={setCurrentPage} />
        <div className="notice-list__actions">
          <NoticeFilter categoryList={categoryList} category={category} setCategory={setCategory} setCurrentPage={setCurrentPage} />
          <NoticeSort sortType={sortType} setSortType={setSortType} setCurrentPage={setCurrentPage} />
        </div>
      </div>
      <ul className="notice-list">
        {isLoading ? (
          <li className="notice-list__item notice-list__item--loading">
            <Loading />
          </li>
        ) : currentNoticeList.length === 0 ? (
          <li className="notice-list__item notice-list__item--empty">
            <NoticeEmpty />
          </li>
        ) : (
          currentNoticeList.map((noticeItem) => (
            <li className="notice-list__item" key={noticeItem.id}>
              <Link to={`/notices/${noticeItem.id}`} onClick={() => increaseViews(noticeItem.id)}>
                <div className="notice-list__item-box">
                  <div className="notice-list__info">
                    <p>{noticeItem.id}</p>
                    <p>{noticeItem.title}</p>
                  </div>
                  <div className="notice-list__sub-info">
                    {noticeItem.views} | {noticeItem.writer} | {noticeItem.updated_at.split('T')[0]}
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
      <div className="notice-list__footer">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageLength={pageLength} />
        <Link className="notice-list__btn notice-list__btn--write" to={'/write'} onClick={handleWriteClick}>
          Write
        </Link>
      </div>
    </>
  );
};

export default NoticeList;
