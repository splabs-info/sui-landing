import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import 'simplebar/src/simplebar.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './store';
import { NotifiNetworkHelper } from 'modules/notifi-network/init';

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <NotifiNetworkHelper.Provider>
        <Router>
          <App />
        </Router>
      </NotifiNetworkHelper.Provider>
    </HelmetProvider>
  </Provider>
);
reportWebVitals();
