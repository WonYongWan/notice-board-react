import { useNavigate, useParams } from 'react-router';
import './NoticeEdit.scss';
import { useState } from 'react';
import NoticeEditor from '@/components/notice/NoticeEditor';

const NoticeEdit = ({ editNotice, data }) => {
  const { id } = useParams();

  const notice = data?.find((item) => item.id === Number(id));

  if (!notice) {
    return null;
  }

  return <NoticeEditForm notice={notice} editNotice={editNotice} id={id} />;
};

const NoticeEditForm = ({ notice, editNotice, id }) => {
  const navigate = useNavigate();

  const [noticeTitle, setNoticeTitle] = useState(notice.title);
  const [noticeContent, setNoticeContent] = useState(notice.content);

  const handleEdit = async () => {
    try {
      await editNotice(Number(id), {
        ...notice,
        title: noticeTitle,
        content: noticeContent,
      });

      navigate(`/notices/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onTitleChange = (e) => {
    setNoticeTitle(e.target.value);
  };

  return <NoticeEditor title={noticeTitle} content={noticeContent} onTitleChange={onTitleChange} onContentChange={setNoticeContent} onSave={handleEdit} cancelTo={`/notices/${id}`} />;
};

export default NoticeEdit;
