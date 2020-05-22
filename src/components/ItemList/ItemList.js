import React, { Component } from 'react';

class ItemList extends Component {

    handleDelete = () => {
        console.log('item deleted!');
        this.props.dispatch({
            type: 'DELETE_ITEM',
            payload: this.props.itemData.id
        });
    }

    render() {
        return (
            <div>
                <p>{this.props.itemData.description}</p>
                <p>Picture id: {this.props.itemData.id}</p>
                <img src={this.props.itemData.image_url} />
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
};

export default ItemList;
