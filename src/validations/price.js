module.exports = (value) => {
  if (!/^\d+$/.test(value)) {
    return 'This field should be a number.';
  }
};
