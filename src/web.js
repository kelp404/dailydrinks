// Style
require('@fortawesome/fontawesome-free/css/all.css');
require('bootstrap/dist/css/bootstrap.css');
require('nprogress/nprogress.css');

// Vendor
require('babel-polyfill');
require('jquery/dist/jquery');
require('bootstrap/dist/js/bootstrap.bundle.js');

// Mock server
require('./mock-server');

const {RouterView} = require('capybara-router');
const nprogress = require('nprogress');
const React = require('react');
const ReactDOM = require('react-dom');
const router = require('./router');

nprogress.configure({showSpinner: false});

router.listen('ChangeStart', () => nprogress.start());
router.listen('ChangeSuccess', () => nprogress.done());
router.listen('ChangeError', () => nprogress.done());
router.start();

ReactDOM.render(
  <RouterView>
    <p className="text-center text-muted h3" style={{padding: '20px 0'}}>
      <i className="fa fa-spinner fa-pulse fa-fw"/> Loading...
    </p>
  </RouterView>,
  document.getElementById('root')
);
