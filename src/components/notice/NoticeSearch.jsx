import './NoticeSearch.scss';

const NoticeSearch = ({ searchInput, setSearchInput, setSearchValue, setCurrentPage }) => {
  const search = () => {
    setSearchValue(searchInput);
    setCurrentPage(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const inputSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const deleteBtnClickEvent = () => {
    setSearchInput('');
  };

  return (
    <div className="notice-search">
      <div className="notice-search__input-wrap">
        <input className="input" name="search" type="text" placeholder="검색" value={searchInput} onKeyDown={handleKeyDown} onChange={inputSearch} />
        <button className={`notice-search__btn notice-search__btn--delete ${searchInput.length > 0 ? 'is-active' : ''}`} type="button" aria-label="삭제" onClick={deleteBtnClickEvent}>
          <span className="icon icon--delete-search" aria-hidden="true"></span>
        </button>
      </div>
      <button className="notice-search__btn notice-search__btn--search" type="button" aria-label="검색하기" onClick={search}>
        <span className="icon icon--search" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default NoticeSearch;
