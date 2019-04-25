const React = require('react');
const {Form} = require('informed');
const validationRequired = require('../validations/required');
const Text = require('../components/text');

module.exports = class Order extends React.Component{
  constructor(props) {
    super(props);
  }

  submit(form) {
    console.log('submit');
    console.log(form);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Order</h2>
            <hr/>
            <Form onSubmit={this.submit}>
              <div className="form-group">
                <label htmlFor="input-name">Name</label>
                <Text field="name"
                      validate={validationRequired} maxLength="1024"
                      validateOnChange
                      id="input-name" type="text" className="form-control" autoFocus/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};
