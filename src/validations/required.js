module.exports = (value) => {
  if (value == null) {
    return 'This field is required.';
  }
  if (`${value}`.trim() === '') {
    return 'This field is required.';
  }
};
