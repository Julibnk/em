import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import './config/i18n';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
