import React from 'react'
import PageItems from './PageItems'

class Pagination extends React.Component {
  goToPreviousPage = () => {
    const { currentPage, onPageClick } = this.props
    if (currentPage === 1) return
    onPageClick(currentPage - 1)
  }

  goToNextPage = () => {
    const { currentPage, onPageClick, pageCount } = this.props
    if (currentPage === pageCount) return
    onPageClick(currentPage + 1)
  }

  isPreviousButtonDisabled = () => {
    return this.props.currentPage === 1
  }

  isNextButtonDisabled = () => {
    return this.props.currentPage >= this.props.pageCount
  }

  render () {
    return (
      <nav className='pagination' role='navigation' aria-label='pagination'>
        <button
          className='pagination-previous'
          onClick={this.goToPreviousPage}
          disabled={this.isPreviousButtonDisabled()}
        >
          Previous
        </button>
        <button
          className='pagination-next'
          onClick={this.goToNextPage}
          disabled={this.isNextButtonDisabled()}
        >
          Next page
        </button>
        <PageItems {...this.props} />
      </nav>
    )
  }
}

export default Pagination
