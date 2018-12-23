/**
 * Function returns which page numbers should be visible in the pagination.
 *
 * E.g.
 * Input is: activePage: 5, pageCount: 10
 * Output is: [1, 4, 5, 6, 10]
 *
 * @param {number} currentPage currently active page
 * @param {number} pageCount number of pages
 * @returns {number[]} array of numbers representing visible pages
 */
export function getVisiblePagesForPagination (currentPage, pageCount) {
  if (pageCount === 0) return []

  const neighbouringPages = [currentPage - 1, currentPage, currentPage + 1]
    .filter(page => page > 0 && page <= pageCount)
  const pages = [1, ...neighbouringPages, pageCount]
  return [...new Set(pages)]
}

/**
 * Function takes list of visible pages and returns
 * page representation including ellipsis items ('...').
 *
 * E.g.
 * Input is: [1, 4, 5, 6, 10]
 * Output is: [1, '...', 4, 5, 6, '...', 10]
 *
 * @param {number[]} pages takes a list of pages for pagination
 * @returns {string|number[]} returns a list of pages and ellipsis items
 */
export function getPaginationItems (pages) {
  return pages.reduce((pages, page, index) => {
    if (index === 0) {
      pages.push(page)
      return pages
    }

    const previousItem = pages[pages.length - 1]
    const isAdjacentPage = page - previousItem === 1
    if (!isAdjacentPage) {
      pages.push('...')
    }

    pages.push(page)

    return pages
  }, [])
}
