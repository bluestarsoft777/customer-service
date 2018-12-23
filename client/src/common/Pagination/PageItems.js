import React from 'react'
import PageItem from './PageItem'
import { getPaginationItems, getVisiblePagesForPagination } from './pagination-utilities'

const PageItems = ({ currentPage, pageCount, onPageClick }) => {
  const pages = getVisiblePagesForPagination(currentPage, pageCount)
  const paginationItems = getPaginationItems(pages)

  const pageElements = paginationItems.map((page, index) => {
    const key = `${index}-${page}`
    return (
      <li key={key}>
        <PageItem page={page} activePage={currentPage} onPageClick={onPageClick} />
      </li>
    )
  })

  return (
    <ul className='pagination-list'>
      {pageElements}
    </ul>
  )
}

export default PageItems
