import '../styles/main.scss';
import routes from './routes';
console.log(routes);
const appElement = document.querySelector('#app');
const App = routes.get(appElement.dataset.route);
const props = window.cms;

const app = new App({
  target: appElement
});
