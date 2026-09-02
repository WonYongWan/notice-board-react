import './NoticeEditor.scss';
import '../../assets/styles/components/_tiptap.scss';
import { Link } from 'react-router';
import Modal from '../../components/modal/Modal';
import { useState } from 'react';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

const NoticeEditor = ({ title, content, onTitleChange, onContentChange, onSave, cancelTo }) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  const handleSaveClick = () => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      setIsWriteModalOpen(false);
      setIsReturnModalOpen(true);
      return;
    }
  };

  return (
    <>
      <div className="notice-editor">
        <div className="notice-editor__header">
          <input className="notice-editor__title" type="text" placeholder="제목을 입력하세요" value={title} onChange={onTitleChange} />
        </div>
        <div className="notice-editor__content">
          <SimpleEditor content={content} onChange={onContentChange} />
        </div>
        <div className="notice-editor__footer">
          <div className="notice-editor__footer-container">
            <Link className="notice-editor__btn notice-editor__btn--cancel" to={cancelTo}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
              </svg>
              나가기
            </Link>
            <div className="notice-editor__btn-box">
              <button className="notice-editor__btn" onClick={() => setIsWriteModalOpen(true)}>
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isWriteModalOpen} onClose={setIsWriteModalOpen} onConfirm={handleSaveClick} message={'게시글을 저장 하시겠습니까'} />
      <Modal open={isReturnModalOpen} onClose={setIsReturnModalOpen} onConfirm={() => setIsReturnModalOpen(false)} message={'내용을 적어주세요'} confirmOnly />
    </>
  );
};

export default NoticeEditor;
