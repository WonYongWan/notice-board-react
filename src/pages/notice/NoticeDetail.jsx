import { Link, useNavigate, useParams } from 'react-router';
import './NoticeDetail.scss';
import Modal from '../../components/modal/Modal';
import { useEffect, useState } from 'react';
import NoticeContent from '@/components/notice/NoticeContent';
import { formatRelativeTime } from '@/utils/formatRelativeTime';

const NoticeDetail = ({ deleteNotice, data, setCurrentPage }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const { id } = useParams();
  const navigate = useNavigate();

  const notice = data?.find((item) => item.id === Number(id));

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!notice) return null;

  const handleDelete = async () => {
    try {
      await deleteNotice(Number(id));
      setCurrentPage?.(0);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="notice-detail">
        <div className="notice-detail__header">
          <p className="notice-detail__title">{notice.title}</p>
          <div className="notice-detail__actions">
            <div className="notice-detail__info">
              <p className="notice-detail__nickname">{notice.profile?.nickname}</p>
              <span class="separator" aria-hidden="true">
                ·
              </span>
              <p className="notice-detail__date">{formatRelativeTime(notice.updated_at, now)}</p>
              <span class="separator" aria-hidden="true">
                ·
              </span>
              <p className="notice-detail__views">{notice.views}</p>
            </div>
            <div className="notice-detail__btn-box">
              <Link className="notice-detail__btn notice-detail__btn--edit" to={`/notices/${id}/edit`}>
                Edit
              </Link>
              <button className="notice-detail__btn" onClick={() => setIsPopupOpen(true)}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="notice-detail__content">
          <NoticeContent content={notice.content} />
        </div>
        <div className="notice-detail__footer"></div>
      </div>
      <Modal open={isPopupOpen} onClose={setIsPopupOpen} onConfirm={handleDelete} />
    </>
  );
};

export default NoticeDetail;
