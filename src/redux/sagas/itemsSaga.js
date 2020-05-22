import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* getItems() {
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

function* postItems(action) {
  let item = {item: action.payload}
  console.log('in postItems saga:',item);
  try {
    yield axios.post('/api/shelf', item);
    yield put({
      type: 'GET_ITEMS',
    });
    console.log('------send this to server:', item);
  } catch (error) {
    console.log(error);
  }
}

function* deleteItem(action) {
  let id = action.payload;
  console.log('in deleteItem', action.payload);
  try {
    const response = yield axios.delete(`/api/shelf/${id}`);
    yield put({
      type: 'GET_ITEMS'
    })
  } catch (error) {
    console.log(error);
  }
}

function* itemsSaga() {
  yield takeEvery('GET_ITEMS', getItems);
  yield takeEvery('ADD_ITEMS', postItems);
  yield takeEvery('DELETE_ITEM', deleteItem);
}

export default itemsSaga;
