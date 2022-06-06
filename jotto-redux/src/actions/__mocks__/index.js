module.exports = {
    ...jest.requireActual('../index'),
    __esModule: true,
    getSecretWord: jest.fn().mockReturnValue({type: 'mock'})
}