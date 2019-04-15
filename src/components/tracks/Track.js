import React from 'react';
import { Link } from 'react-router-dom';

const Track = props => {
  const { track } = props;

  return (
    <div className='col s12 m6 track'>
      <div className='card grey lighten-4 shadow-lg'>
        <div className='card-content black-text darken-3'>
          <blockquote className='track__name card-title'>
            {track.artistName}
          </blockquote>
          <p className='track__detail'>
            <i className='material-icons play'>play_arrow</i>
            <strong>Track:</strong> <span>{track.trackName}</span>
          </p>
          <p className='track__detail'>
            <i className='material-icons play'>album</i>
            <strong>Album:</strong> <span>{track.collectionName}</span>
          </p>
        </div>
        <div className='card-action'>
          <Link
            className='waves-effect waves-light btn light-blue accent-4'
            to={`/lyrics/track/${track.trackId}`}
          >
            View Lyrics
          </Link>
          <a
            className='custom__btn waves-effect waves-light btn light-blue accent-4'
            href={track.artistViewUrl}
            target='_blank'
          >
            Visit Artist
          </a>
        </div>
      </div>
    </div>
  );
};

export default Track;
