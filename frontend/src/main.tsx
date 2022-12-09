import './index.css';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import { Provider } from 'react-redux';
import { store } from './config/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
