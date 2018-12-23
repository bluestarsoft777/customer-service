import React from 'react'

const PageItem = ({ page, activePage, onPageClick }) => {
  if (page === '...') {
    return <span className='pagination-ellipsis'>&hellip;</span>
  } else if (page === activePage) {
    return (
      <a
        href='#'
        className='pagination-link is-current'
        aria-label={`Page ${page}`}
        aria-current='page'
        onClick={e => onPageClick(page)}
      >
        {page}
      </a>
    )
  } else {
    return (
      <a
        href='#'
        className='pagination-link'
        aria-label={`Goto page ${page}`}
        onClick={e => onPageClick(page)}
      >
        {page}
      </a>
    )
  }
}

export default PageItem
