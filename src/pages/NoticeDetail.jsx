import { Link, useNavigate, useParams } from 'react-router';
import './NoticeDetail.scss';
import Modal from '../components/modal/Modal';
import { useState } from 'react';

const NoticeDetail = ({ deleteNotice, data }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const notice = data.find((item) => item.id === Number(id));

  if (!notice) return null;

  const handleDelete = () => {
    deleteNotice(Number(id));
    navigate('/');
  };

  return (
    <>
      <div className="notice-detail">
        <div className="notice-detail__header">
          <p className="notice-detail__title">{notice.title}</p>
          <div className="notice-detail__info">
            <p className="notice-detail__writer">{notice.writer}</p>
            <p className="notice-detail__date">{notice.date}</p>
            <p className="notice-detail__views">views: {notice.views}</p>
          </div>
        </div>
        <div className="notice-detail__content">
          <p className="notice-detail__desc">{notice.content}</p>
        </div>
        <div className="notice-detail__footer">
          <Link className="notice-detail__btn notice-detail__btn--edit" to={`/notices/${id}/edit`}>
            Edit
          </Link>
          <button className="notice-detail__btn" onClick={() => setIsPopupOpen(true)}>
            Delete
          </button>
        </div>
      </div>
      <Modal open={isPopupOpen} onClose={setIsPopupOpen} onConfirm={handleDelete} />
    </>
  );
};

export default NoticeDetail;
