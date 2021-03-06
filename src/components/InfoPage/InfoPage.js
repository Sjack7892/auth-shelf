import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from '../ItemList/ItemList';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  state = {
    item: ''
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_ITEMS' })
    console.log(this.state)

  }

  handleClick = () => {
    console.log('clicked!');
    this.props.dispatch({
      type: 'ADD_ITEMS',
      payload: this.state.item
    })
    console.log('send this to Saga :',this.state.item)
  }

  handleChangeFor = (event, property) => {
    console.log('changing:', event.target.value);
    this.setState({
        item: event.target.value,
    })
  }
  

  render() {
    return (
      <div>
        <h1>Info Page</h1>
        <input type="text" placeholder="Add item..." onChange={this.handleChangeFor} />
        {/* <input placeholder="add image URL" onChange={ this.handleChangeFor} /> */}
        <button onClick={this.handleClick}>ADD</button>

        {this.props.reduxState.itemsReducer.map((item) => {
          return (
            <div key={item.id}>
              {/* <p>{item.description}</p>
              <img src={item.image_url}></img> */}
              <ItemList
                itemData={item}
                dispatch={this.props.dispatch}
              />
            </div>
          )
        })}
      </div>
    )
  }
};

const putReduxStateOnState = (reduxState) => ({ reduxState });
export default connect(putReduxStateOnState)(InfoPage);
