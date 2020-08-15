import React, { useMemo, useCallback } from 'react';

// import { Container } from './styles';

function Paginate({currentPage, totalPage, totalRow, perPage, handleLoadNewPage}) {
  

  const handlePaginate = useCallback(async (page) => {
    await handleLoadNewPage(page)
  }, [handleLoadNewPage])

  const pages = useMemo(() => {
    let mountPage = []
    let count = 0;
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (currentPage <= 2) {
        count + 1 <= totalPage && mountPage.push(count + 1);
      } else if (currentPage === totalPage) {
        mountPage.push(currentPage - (count === 0 ? 2 : count === 1 ? 1 : 0));
      } else {
        mountPage.push(currentPage + (count === 0 ? -1 : count === 1 ? 0 : 1));
      }
      count++;
    }
    return mountPage;
  }, [currentPage, totalPage])

  if (totalRow <= perPage) {
    return <div />;
  }

  return (
    <nav className="d-inline-block">
      <ul className="pagination mb-0">
        <li className={((currentPage === 1) ? "page-item disabled" : "page-item")}>
          <button className="page-link" tabIndex={-1} onClick={() => handlePaginate(currentPage-1)}>
            <i className="fas fa-chevron-left" />
          </button>
        </li>
        {pages.map((value, i) => (
          <li key={i} className={((value === currentPage) ? "page-item active" : "page-item")}>
            <button className="page-link" onClick={() => handlePaginate(value)}>
              {value}
            </button>
          </li>
        ))}
        <li className={((currentPage === totalPage) ? "page-item disabled" : "page-item")}>
          <button className="page-link" onClick={() => handlePaginate(currentPage+1)}>
            <i className="fas fa-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Paginate;