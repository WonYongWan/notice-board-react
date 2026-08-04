import { useEffect, useRef, useState } from 'react';

const NoticeFilter = ({ categoryList, category, setCategory, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectCategory = (value) => {
    setCategory(value);
    setCurrentPage?.(0);
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
        <span className="dropdown__label">{category}</span>
        <span className="icon icon--arrow-bottom" aria-hidden="true"></span>
      </button>
      <div className="select-box">
        <ul className="select-box__list">
          {categoryList.map((value) => (
            <li className="select-box__item" key={value}>
              <button className="select-box__btn" type="button" onClick={() => selectCategory(value)}>
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticeFilter;
