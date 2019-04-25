const classNames = require('classnames');
const React = require('react');
const {Form} = require('informed');
const nprogress = require('nprogress');
const validationRequired = require('../validations/required');
const validationPrice = require('../validations/price');
const Text = require('../components/text');
const TextArea = require('../components/text-area');
const api = require('../api');

module.exports = class Order extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false
    };
    this.submit = this.submit.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  submit(form) {
    /*
    The user submit the form to update or create the order.
    @param form {Object}
      name: {String}
      price: {String}
      notes: {String}
     */
    const router = require('../router');
    nprogress.start();
    this.setState({isProcessing: true});
    let operation;
    if (this.props.order) {
      operation = api.order.updateOrder;
    } else {
      operation = api.order.addOrder;
    }
    operation(form)
      .then(() => {
        router.go('/');
      })
      .catch(error => {
        router.go({name: 'error', params: {error: `${error}`}})
      });
  }

  deleteOrder(event) {
    /*
    The user click the delete button to remove the order.
     */
    event.preventDefault();
    const router = require('../router');
    nprogress.start();
    this.setState({isProcessing: true});
    api.order.deleteOrder(this.props.order.id)
      .then(() => {
        router.go('/');
      })
      .catch(error => {
        router.go({name: 'error', params: {error: `${error}`}})
      });
  }

  render() {
    const pageTitle = this.props.order ? 'Order' : 'New order';
    const classTable = {
      deleteButton: classNames([
        'btn btn-link text-danger',
        {hide: this.props.order == null}
      ]),
      formGroupId: classNames([
        'form-group',
        {hide: this.props.order == null}
      ])
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>{pageTitle}</h2>
            <hr/>
            <Form initialValues={this.props.order} onSubmit={this.submit}>
              {
                this.props.order ?
                  <div className="form-group">
                    <label htmlFor="input-id">ID</label>
                    <input type="text" readOnly className="form-control-plaintext" id="input-id"
                           value={this.props.order.id}/>
                  </div> :
                  <></>
              }
              <div className="form-group">
                <label htmlFor="input-name" className="required-field">Name</label>
                <Text field="name" autoFocus
                      validate={validationRequired} maxLength="1024"
                      validateOnChange
                      id="input-name" type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="input-price" className="required-field">Price</label>
                <Text field="price"
                      validate={validationPrice} maxLength="1024"
                      validateOnChange
                      id="input-price" type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="input-notes">Notes</label>
                <TextArea field="notes"
                          maxLength="1024"
                          rows="5"
                          id="input-notes" type="text" className="form-control"/>
              </div>
              <button disabled={this.state.isProcessing}
                      type="submit" className="btn btn-primary">Save</button>
              &nbsp;
              <button disabled={this.state.isProcessing}
                      onClick={this.deleteOrder}
                      type="button" className={classTable.deleteButton}>Delete</button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};
