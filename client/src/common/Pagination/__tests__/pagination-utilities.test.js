import { getPaginationItems, getVisiblePagesForPagination } from '../pagination-utilities'

describe('getPaginationItems', () => {
  test('handles empty array properly', () => {
    const actual = getPaginationItems([])
    const expected = []
    expect(actual).toEqual(expected)
  })

  test('handles single page properly', () => {
    const actual = getPaginationItems([1])
    const expected = [1]
    expect(actual).toEqual(expected)
  })

  test('handle gaps in pages correctly', () => {
    const input = [1, 3, 4, 5, 10]
    const actual = getPaginationItems(input)
    const expected = [1, '...', 3, 4, 5, '...', 10]
    expect(actual).toEqual(expected)
  })

  test('handle gaps near start correctly', () => {
    const input = [1, 2, 3, 10]
    const actual = getPaginationItems(input)
    const expected = [1, 2, 3, '...', 10]
    expect(actual).toEqual(expected)
  })

  test('handle gaps near end correctly', () => {
    const input = [1, 8, 9, 10]
    const actual = getPaginationItems(input)
    const expected = [1, '...', 8, 9, 10]
    expect(actual).toEqual(expected)
  })

  test('handle pages without gaps correcty', () => {
    const input = [1, 3, 4, 5, 10]
    const actual = getPaginationItems(input)
    const expected = [1, '...', 3, 4, 5, '...', 10]
    expect(actual).toEqual(expected)
  })
})

describe('getVisiblePagesForPagination', () => {
  test('handles single page properly', () => {
    const actual = getVisiblePagesForPagination(1, 1)
    const expected = [1]
    expect(actual).toEqual(expected)
  })

  test('handle active page on start', () => {
    const currentPage = 1
    const pageCount = 10
    const actual = getVisiblePagesForPagination(currentPage, pageCount)
    const expected = [1, 2, 10]
    expect(actual).toEqual(expected)
  })

  test('handle multiple pages in middle', () => {
    const currentPage = 5
    const pageCount = 10
    const actual = getVisiblePagesForPagination(currentPage, pageCount)
    const expected = [1, 4, 5, 6, 10]
    expect(actual).toEqual(expected)
  })

  test('handle multiple pages on end', () => {
    const currentPage = 9
    const pageCount = 10
    const actual = getVisiblePagesForPagination(currentPage, pageCount)
    const expected = [1, 8, 9, 10]
    expect(actual).toEqual(expected)
  })
})
