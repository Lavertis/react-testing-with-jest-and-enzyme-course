module.exports = {
    ...jest.requireActual('../index'),
    __esModule: true,
    getSecretWord: jest.fn().mockReturnValue(Promise.resolve('party'))
}