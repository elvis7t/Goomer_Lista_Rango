module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  coverageProvider: "v8",
  collectCoverage: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts', // Ajuste conforme a estrutura do seu projeto
    '!src/**/*.spec.ts', // Exclui arquivos de teste
    '!src/index.ts', // Exclui o arquivo principal, se houver
  ],

  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'coverage', outputName: 'junit.xml' }],
    ['jest-sonar', { outputDirectory: 'coverage', outputName: 'sonar-report.xml' }],
  ],
};
