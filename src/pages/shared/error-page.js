const React = require('react');

module.exports = props => {
  document.title = 'Error - dailydrinks';
  const message = props.error ? `${props.error}` : props.params.error;
  return <h2 className="text-center">{message}</h2>
};
