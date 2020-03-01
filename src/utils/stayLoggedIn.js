import { checkToken } from '../store/actions/authActions';
import store from '../store/store';

const stayLoggedIn = async () => {
 await store.dispatch(checkToken());
}

export default stayLoggedIn;