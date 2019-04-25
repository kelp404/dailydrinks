const classNames = require('classnames');
const React = require('react');
const {BasicTextArea, asField} = require('informed');

module.exports = asField(props => {
  const {fieldState} = props;
  const classTable = {
    input: classNames(props.className, {
      'is-invalid': fieldState.error || fieldState.asyncError
    })
  };

  return (
    <>
      <BasicTextArea initialValue=""
                     {...props}
                     className={classTable.input}/>
      <div className="invalid-feedback">{fieldState.error || fieldState.asyncError}</div>
    </>
  );
});
