import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchItems() {

  try {
  

    // the config includes credentials which
    // allow the server session to recognize the items
    // If a items is logged in, this will return their information
    // from the server session (req.items)
    const response = yield axios.get('/api/shelf');
    
    // now that the session has given us a items object
    // with an id and itemsname set the client-side items object to let
    // the client-side code know the items is logged in
    yield put({ type: 'SET_ITEMS', payload: response.data });
    console.log('------>get items from server',response.data)
  } catch (error) {
    console.log('items get request failed', error);
  }
}

function* itemsSaga() {
  yield takeEvery('FETCH_ITEMS', fetchItems);
}

export default itemsSaga;
