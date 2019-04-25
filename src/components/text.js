const classNames = require('classnames');
const React = require('react');
const {BasicText, asField} = require('informed');

module.exports = asField(props => {
  const {fieldState} = props;
  const classTable = {
    input: classNames(props.className, {
      'is-invalid': fieldState.error || fieldState.asyncError
    })
  };

  return (
    <>
      <BasicText initialValue=""
                 type="text"
                 {...props}
                 className={classTable.input}/>
      <div className="invalid-feedback">{fieldState.error || fieldState.asyncError}</div>
    </>
  );
});
