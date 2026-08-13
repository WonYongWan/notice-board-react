import { Link, useNavigate, useParams } from 'react-router';
import './NoticeEdit.scss';
import Modal from '../components/modal/Modal';
import { useState } from 'react';

const NoticeEdit = ({ editNotice, data }) => {
  const { id } = useParams();
  const notice = data.find((item) => item.id === Number(id));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState(notice.title);
  const [noticeContent, setNoticeContent] = useState(notice.content);
  const navigate = useNavigate();

  if (!notice) return null;

  const handleEdit = async () => {
    try {
      await editNotice(Number(id), { ...notice, title: noticeTitle, content: noticeContent });
      navigate(`/notices/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const inputTitle = (e) => {
    setNoticeTitle(e.target.value);
  };

  const inputContent = (e) => {
    setNoticeContent(e.target.value);
  };

  return (
    <>
      <div className="notice-edit">
        <div className="notice-edit__header">
          <input className="notice-edit__title" type="text" value={noticeTitle} onChange={inputTitle} />
          <div className="notice-edit__info">
            <p className="notice-edit__writer">{notice.writer}</p>
            <p className="notice-edit__date">{notice.date}</p>
            <p className="notice-edit__views">views: {notice.views}</p>
          </div>
        </div>
        <div className="notice-edit__content">
          <textarea className="notice-edit__desc" value={noticeContent} onChange={inputContent}></textarea>
        </div>
        <div className="notice-edit__footer">
          <Link className="notice-edit__btn notice-edit__btn--cancel" to={`/notices/${id}`}>
            Cancel
          </Link>
          <button className="notice-edit__btn" onClick={() => setIsPopupOpen(true)}>
            Save
          </button>
        </div>
      </div>
      <Modal open={isPopupOpen} onClose={setIsPopupOpen} onConfirm={handleEdit} message={'게시글을 저장 하시겠습니까'} />
    </>
  );
};

export default NoticeEdit;
