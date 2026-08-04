import { useEffect, useRef, useState } from 'react';

const sortOptions = ['전체순', '최신순', '오래된순', '조회순'];
const NoticeSort = ({ sortType, setSortType, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectSort = (value) => {
    setSortType(value);
    setCurrentPage(0);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`dropdown ${isOpen ? 'is-active' : ''}`}>
      <button className="dropdown__btn" type="button" onClick={toggleDropdown}>
        <span className="dropdown__label">{sortType}</span>
        <span className="icon icon--arrow-bottom" aria-hidden="true"></span>
      </button>
      <div className="select-box">
        <ul className="select-box__list">
          {sortOptions.map((value) => (
            <li className="select-box__item" key={value}>
              <button className="select-box__btn" type="button" onClick={() => selectSort(value)}>
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticeSort;
