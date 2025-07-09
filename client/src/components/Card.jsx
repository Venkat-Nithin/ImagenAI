import React from 'react';
import { download } from '../assets';
import { downloadImage } from '../utils';
import './Card.css';

const Card = ({ _id, name, prompt, photo }) => (
  <div className="card">
    <img className="card-image" src={photo} alt={prompt} />

    <div className="card-info">
      <p className="card-prompt">{prompt}</p>

      <div className="card-footer">
        <div className="card-user">
          <div className="card-avatar">{name[0]}</div>
          <p className="card-username">{name}</p>
        </div>
        <button
          type="button"
          onClick={() => downloadImage(_id, photo)}
          className="download-button"
        >
          <img src={download} alt="download" className="download-icon" />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
