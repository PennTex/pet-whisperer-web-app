import App from './components/App';
import * as config from './config';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(<Provider store={store}><App clientId={config.AUTH0_CLIENT_ID} domain={config.AUTH0_DOMAIN} /></Provider>,
  document.getElementById('app'));