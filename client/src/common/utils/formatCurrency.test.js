import formatCurrency from './formatCurrency'

test('formatCurrency normal numbers', () => {
  const expected = '$123,456.00'
  const input = 123456
  expect(formatCurrency(input)).toEqual(expected)
})


test('formatCurrency zero value', () => {
  const expected = '$0.00'
  const input = 0
  expect(formatCurrency(input)).toEqual(expected)
})
