import React, { Component } from 'react';
import { Context } from '../../context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import img from './No_Image_Available.jpg';
import moment from 'moment';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: ''
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { track_list } = this.context;
    const track = track_list.filter(track => {
      return track.trackId === parseInt(id);
    });
    const trackData = Object.assign({}, track[0]);

    axios(
      `https://api.lyrics.ovh/v1/${trackData.artistName}/${trackData.trackName}`
    )
      .then(res => {
        this.setState({
          track: trackData,
          lyrics: res.data.lyrics
        });
      })
      .catch(err => console.log(err));
  }

  // componentWillUnmount() {
  //   this.setState({
  //     track: {},
  //     lyrics: ''
  //   });
  // }

  render() {
    const { track, lyrics } = this.state;
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      lyrics === ''
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <div className='container lyrics__container'>
            <div className='row'>
              <div className='col s12 track'>
                <div className='card grey lighten-4 shadow-lg'>
                  <div className='card__header'>
                    <img
                      src={track.artworkUrl100 ? track.artworkUrl100 : img}
                      alt='album'
                    />
                    <div className='card-content black-text darken-3'>
                      <blockquote className='track__name card-title'>
                        {track.trackName}
                      </blockquote>
                      <p className='track__detail'>
                        <i className='material-icons play'>label</i>
                        <strong>Artist:</strong> <span>{track.artistName}</span>
                      </p>
                      <p className='track__detail'>
                        <i className='material-icons play'>label</i>
                        <strong>Kind:</strong>{' '}
                        <span>{track.primaryGenreName}</span>
                      </p>
                      <p className='track__detail'>
                        <i className='material-icons play'>label</i>
                        <strong>Country:</strong> <span>{track.country}</span>
                      </p>
                      <p className='track__detail'>
                        <i className='material-icons play'>label</i>
                        <strong>Release Date:</strong>{' '}
                        <span>{moment(track.releaseDate).calendar()}</span>
                      </p>
                    </div>
                  </div>
                  <div className='card-content black-text darken-3'>
                    <blockquote className='track__name card-title'>
                      Lyrics
                    </blockquote>
                    <p className='track__detail'>{lyrics}</p>
                  </div>
                  <div className='card-action'>
                    <Link
                      to='/'
                      className='waves-effect waves-light btn light-blue accent-4'
                    >
                      Go Back
                    </Link>
                    <a
                      className='custom__btn waves-effect waves-light btn light-blue accent-4'
                      href={track.trackViewUrl}
                      target='_blank'
                    >
                      Visit Track
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

Lyrics.contextType = Context;

export default Lyrics;
