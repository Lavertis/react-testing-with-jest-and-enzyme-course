export const findByTestAttribute = (wrapper, value) => {
    return wrapper.find(`[data-test='${value}']`);
}