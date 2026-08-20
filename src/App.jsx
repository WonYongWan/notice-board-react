import { useEffect, useMemo, useState } from 'react';
import Router from './router/Router';
import { getNoticeList } from './services/noticeService';
import { createNoticeApi, deleteNoticeApi, increaseViewApi, updateNoticeApi } from './api/noticeApi';
import { supabase } from './services/supabase';

function App() {
  const [noticeList, setNoticeList] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('전체');
  const [sortType, setSortType] = useState('전체순');
  const [currentPage, setCurrentPage] = useState(0);
  const categoryList = useMemo(() => {
    return ['전체', ...new Set(noticeList.map((item) => item.category))];
  }, [noticeList]);

  const createNotice = async (notice) => {
    try {
      const newNotice = await createNoticeApi(notice);
      setNoticeList((prev) => [...prev, newNotice]);
      return newNotice;
    } catch (error) {
      console.error('게시글 생성 실패: ', error);
    }
  };

  const deleteNotice = async (id) => {
    try {
      await deleteNoticeApi(id);
      setNoticeList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('게시글 삭제 실패: ', error);
      throw error;
    }
  };

  const editNotice = async (id, notice) => {
    try {
      const updateNotice = await updateNoticeApi(id, notice);

      setNoticeList((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                title: updateNotice.title,
                content: updateNotice.content,
                updated_at: updateNotice.updated_at,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error('게시글 업데이트 실패', error);
    }
  };

  const increaseViews = async (id) => {
    try {
      const newViews = await increaseViewApi(id);
      setNoticeList((prev) => prev.map((item) => (item.id === id ? { ...item, views: newViews } : item)));
    } catch (error) {
      console.error('조회수 증가 실패', error);
    }
  };

  const processedNoticeList = useMemo(() => {
    let result = [...noticeList];
    // console.log(result);

    if (searchValue.trim().length !== 0) {
      result = result.filter((item) => item.title.replace(/\s/g, '').toLowerCase().includes(searchValue.trim().replace(/\s/g, '').toLowerCase()));
    }

    if (category !== '전체') {
      result = result.filter((item) => item.category === category);
    }

    if (sortType === '조회순') {
      result = result.sort((a, b) => b.views - a.views);
    } else if (sortType === '최신순') {
      result = result.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    } else if (sortType === '오래된순') {
      result = result.sort((a, b) => a.updated_at.localeCompare(b.updated_at));
    }

    return result;
  }, [noticeList, category, sortType, searchValue]);

  const noticeProps = {
    createNotice,
    deleteNotice,
    editNotice,
    increaseViews,
    data: processedNoticeList,
    isLoading,
    categoryList,
    category,
    setCategory,
    sortType,
    setSortType,
    currentPage,
    setCurrentPage,
    setSearchValue,
    searchInput,
    setSearchInput,
  };

  useEffect(() => {
    const fetchNoticeList = async () => {
      try {
        setIsLoding(true);

        const data = await getNoticeList();
        setNoticeList(data);
      } catch (error) {
        console.error('게시글 조회 실패', error);
      } finally {
        setIsLoding();
      }
    };

    fetchNoticeList();
  }, []);

  const [session, setSession] = useState(null);
  useEffect(() => {
    // 처음 앱이 실행됐을 때 현재 로그인 상태 확인
    supabase.auth.getSession().then(({ data }) => {
      // console.log('현재 세션:', data.session);
      // console.log('현재 사용자:', data.session?.user);

      setSession(data.session);
    });

    // 로그인 / 로그아웃 상태 변화 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      // console.log('Auth 이벤트:', _event);
      // console.log('변경된 세션:', newSession);
      // console.log('변경된 사용자:', newSession?.user);

      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Router notice={noticeProps} />
    </>
  );
}

export default App;
