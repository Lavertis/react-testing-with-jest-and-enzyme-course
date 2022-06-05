export const findByTestAttribute = (wrapper, value) => {
    return wrapper.findWhere(node => node.prop('data-test') === value);
}