import axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/store';
import RouteContainer from './Routes/RouteContainer';

axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  return (
    <Provider store={store}>
      <RouteContainer />
    </Provider>
  );
}

export default App;
