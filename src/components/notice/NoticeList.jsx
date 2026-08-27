import './NoticeList.scss';
import { Link } from 'react-router';
import NoticeEmpty from './NoticeEmpty';
import Loading from '../loading/Loading';

const NoticeList = ({ data, isLoading, currentPage, increaseViews }) => {
  const start = currentPage * 10;
  const end = start + 10;
  const currentNoticeList = data.slice(start, end);
  // const currentNoticeList = [];

  return (
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
  );
};

export default NoticeList;
