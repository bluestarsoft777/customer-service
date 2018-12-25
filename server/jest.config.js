module.exports = {
  'roots': [
    '<rootDir>/src'
  ],
  'moduleDirectories': ['node_modules', 'src'],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ]
}
