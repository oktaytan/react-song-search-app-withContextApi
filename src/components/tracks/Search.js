import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
  state = {
    artistName: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  findTracks = (dispatch, e) => {
    e.preventDefault();
    axios(
      `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${
        this.state.artistName
      }`
    )
      .then(res => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.results
        });
        this.setState({ artistName: '' });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className='row'>
              <div className='col s12'>
                <h4 className='center-align light-blue-text'>
                  <i className='material-icons play'>play_arrow</i>Search For A
                  Song
                </h4>
                <p className='center-align grey-text'>
                  Get the lyrics for any song
                </p>
                <form
                  className='center-align'
                  onSubmit={this.findTracks.bind(this, dispatch)}
                >
                  <div className='input-field col s8 offset-s2'>
                    <input
                      id='artistName'
                      name='artistName'
                      type='text'
                      value={this.state.artistName}
                      onChange={this.onChange}
                    />
                    <label htmlFor='artistName'>Artist Name</label>
                  </div>
                  <button
                    type='submit'
                    className='waves-effect waves-light btn light-blue accent-4'
                  >
                    Get Tracks
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
