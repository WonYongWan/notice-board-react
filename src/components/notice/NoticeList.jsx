import './NoticeList.scss';
import { Link } from 'react-router';
import NoticeEmpty from './NoticeEmpty';
import Loading from '../loading/Loading';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import { useEffect, useState } from 'react';

const NoticeList = ({ data, isLoading, currentPage, increaseViews }) => {
  const start = currentPage * 10;
  const end = start + 10;
  const currentNoticeList = data.slice(start, end);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
                  <div className="notice-list__user">
                    <img className="notice-list__avatar" src={noticeItem.profile?.profile_image} alt="프로필 이미지" />
                    <span className="notice-list__nickname">{noticeItem.profile?.nickname}</span>
                    <span className="notice-list__time">{formatRelativeTime(noticeItem.updated_at, now)}</span>
                  </div>
                  <p className="notice-list__title">{noticeItem.title}</p>
                </div>
                <div className="notice-list__sub-info">
                  <span className="notice-list__views">views : {noticeItem.views}</span>
                  <span className="notice-list__comment">comment : 10</span>
                  <span className="notice-list__like">like : 10</span>
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
