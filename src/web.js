// Style
require('@fortawesome/fontawesome-free/css/all.css');
require('bootstrap/dist/css/bootstrap.css');
require('nprogress/nprogress.css');
require('./scss/_web.scss');

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

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}
nprogress.configure({showSpinner: false});

router.listen('ChangeStart', () => {
  nprogress.start();
  $('.navbar-toggler[aria-expanded=true]').click();
});
router.listen('ChangeSuccess', (action) => {
  nprogress.done();
  if (action === 'PUSH') {
    try {
      window.scrollTo(0, 0);
    } catch (e) {}
  }
});
router.listen('ChangeError', () => nprogress.done());
router.start();

ReactDOM.render(
  <RouterView>
    <p className="text-center text-muted h3 pt-5">
      <i className="fa fa-spinner fa-pulse fa-fw"/> Loading...
    </p>
  </RouterView>,
  document.getElementById('root')
);
