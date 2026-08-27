import { Link, useNavigate } from 'react-router';
import './NoticeWrite.scss';
import Modal from '../../components/modal/Modal';
import { useState } from 'react';

const NoticeWrite = ({ createNotice }) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const navigate = useNavigate();

  const handleWrite = async () => {
    if (noticeTitle.trim().length === 0 || noticeContent.trim().length === 0) {
      setIsWriteModalOpen(false);
      setIsReturnModalOpen(true);
      return;
    }

    const newNotice = {
      title: noticeTitle,
      writer: '유저',
      views: 0,
      content: noticeContent,
    };

    try {
      const creactNotice = await createNotice(newNotice);
      navigate(`/notices/${creactNotice.id}`);
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
      <div className="notice-write">
        <div className="notice-write__header">
          <input className="notice-write__title" type="text" placeholder="제목을 적어주세요" value={noticeTitle} onChange={inputTitle} />
        </div>
        <div className="notice-write__content">
          <textarea className="notice-write__desc" placeholder="내용을 적어주세요" value={noticeContent} onChange={inputContent}></textarea>
        </div>
        <div className="notice-write__footer">
          <Link className="notice-write__btn notice-write__btn--cancel" to={`/`}>
            Cancel
          </Link>
          <button className="notice-write__btn" onClick={() => setIsWriteModalOpen(true)}>
            Save
          </button>
        </div>
      </div>
      <Modal open={isWriteModalOpen} onClose={setIsWriteModalOpen} onConfirm={handleWrite} message={'게시글을 저장 하시겠습니까'} />
      <Modal open={isReturnModalOpen} onClose={setIsReturnModalOpen} onConfirm={() => setIsReturnModalOpen(false)} message={'내용을 적어주세요'} confirmOnly />
    </>
  );
};

export default NoticeWrite;
