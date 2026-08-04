import './Pagination.scss';

const Pagination = ({ currentPage, setCurrentPage, pageLength }) => {
  const numArray = (() => {
    if (pageLength <= 5) {
      return Array.from({ length: pageLength }, (_, i) => i + 1);
    } else if (currentPage <= 2) {
      return Array.from({ length: 5 }, (_, i) => i + 1);
    } else if (currentPage >= pageLength - 2) {
      const lastNum = pageLength - 4;
      return Array.from({ length: 5 }, (_, i) => lastNum + i);
    } else {
      const startNum = currentPage - 1;
      return Array.from({ length: 5 }, (_, i) => startNum + i);
    }
  })();

  const numsClickEvent = (num) => {
    setCurrentPage(num - 1);
  };

  const prevClickEvent = () => {
    if (currentPage <= 0) return;

    setCurrentPage((prev) => prev - 1);
  };

  const nextClickEvent = () => {
    if (currentPage >= pageLength - 1) return;

    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="pagination">
      <button className="pagination__btn pagination__btn--prev" onClick={prevClickEvent} disabled={currentPage === 0 || pageLength < 2}>
        Prev
      </button>
      <ul className="pagination__nums">
        {numArray.map((item) => (
          <li key={item}>
            <button className={`pagination__num ${item - 1 === currentPage ? 'pagination__num--active' : ''}`} type="button" onClick={() => numsClickEvent(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
      <button className="pagination__btn pagination__btn--next" onClick={nextClickEvent} disabled={currentPage === pageLength - 1 || pageLength < 2}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
