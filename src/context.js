import React, { Component } from 'react';
import axios from 'axios';

export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top Tracks',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    axios(
      'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=Eminem'
    )
      .then(res => {
        this.setState({ track_list: res.data.results });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
