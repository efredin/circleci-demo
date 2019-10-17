module.exports = {
    verbose: true,
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
};
