import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ITEMS' })
  }

  render() {
    return (
      <div>
        <h1>Info Page</h1>
        
          Info here: {this.props.reduxState.itemsReducer.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.description}</p>
            </div>
          )
        })}
        
      </div>
    )
  }
};

const putReduxStateOnState = (reduxState) => ({ reduxState });
export default connect(putReduxStateOnState)(InfoPage);
