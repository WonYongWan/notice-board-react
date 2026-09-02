import NoticeEditor from '@/components/notice/NoticeEditor';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../../context/auth/useAuth';

const NoticeWrite = ({ createNotice }) => {
  const { user } = useAuth();
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const navigate = useNavigate();

  const handleWrite = async () => {
    const newNotice = {
      title: noticeTitle,
      views: 0,
      content: noticeContent,
    };

    try {
      const creactNotice = await createNotice(newNotice, user.id);
      navigate(`/notices/${creactNotice.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onTitleChange = (e) => {
    setNoticeTitle(e.target.value);
  };

  return <NoticeEditor title={noticeTitle} content={noticeContent} onTitleChange={onTitleChange} onContentChange={setNoticeContent} onSave={handleWrite} cancelTo="/" />;
};

export default NoticeWrite;
