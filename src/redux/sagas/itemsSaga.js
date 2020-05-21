import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchItems() {
  console.log('get data from server:')
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/shelf', config);
    yield put({
      type: 'SET_ITEMS',
      payload: response.data
    });
    console.log('------>get items from server', response.data)
  } catch (error) {
    console.log('items get request failed', error);
  }
}

function* itemsSaga() {
  yield takeEvery('FETCH_ITEMS', fetchItems);
}

export default itemsSaga;
