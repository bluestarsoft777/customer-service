export function getLimitAndOffset(page = 1, size = 20) {
  return {
    limit: size,
    offset: (page - 1) * size
  }
}

