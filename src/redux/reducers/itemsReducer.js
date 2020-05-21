const itemsReducer = (state = [], action) => {
    console.log(action.payload);
    switch (action.type) {
      case 'SET_ITEMS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // info will be on the redux state at:
  // state.info
  export default itemsReducer;