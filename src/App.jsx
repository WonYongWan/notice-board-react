import { useEffect, useMemo, useState } from 'react';
import Router from './router/Router';
import { getNoticeList } from './services/noticeService';
import { STORAGE_KEY } from './api/noticeApi';

function App() {
  const [noticeList, setNoticeList] = useState(() => getNoticeList());
  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('전체');
  const [sortType, setSortType] = useState('전체순');
  const [currentPage, setCurrentPage] = useState(0);
  const categoryList = useMemo(() => {
    return ['전체', ...new Set(noticeList.map((item) => item.category))];
  }, [noticeList]);

  const createNotice = (notice) => {
    setNoticeList((prev) => [...prev, notice]);
  };

  const deleteNotice = (id) => {
    setNoticeList((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const editNotice = (id, title, content) => {
    setNoticeList((prev) => {
      return prev.map((item) => {
        return item.id === id
          ? {
              ...item,
              title: title,
              content: content,
            }
          : item;
      });
    });
  };

  const increaseViews = (id) => {
    setNoticeList((prev) => prev.map((item) => (item.id === id ? { ...item, views: Number(item.views) + 1 } : item)));
  };

  const processedNoticeList = useMemo(() => {
    let result = [...noticeList];

    if (searchValue.trim().length !== 0) {
      result = result.filter((item) => item.title.replace(/\s/g, '').toLowerCase().includes(searchValue.trim().replace(/\s/g, '').toLowerCase()));
    }

    if (category !== '전체') {
      result = result.filter((item) => item.category === category);
    }

    if (sortType === '조회순') {
      result = result.sort((a, b) => b.views - a.views);
    } else if (sortType === '최신순') {
      result = result.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sortType === '오래된순') {
      result = result.sort((a, b) => a.date.localeCompare(b.date));
    }

    return result;
  }, [noticeList, category, sortType, searchValue]);

  const noticeProps = {
    createNotice,
    deleteNotice,
    editNotice,
    increaseViews,
    data: processedNoticeList,
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(noticeList));
  }, [noticeList]);

  return (
    <>
      <Router notice={noticeProps} />
    </>
  );
}

export default App;
