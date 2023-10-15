import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

interface NotFoundPageProps {
  imageUrl: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ imageUrl }) => {
  return (
    <div className="container">
      <div className="content">
        <div className="left-column">
          <img src={imageUrl} alt="Page Not Found" className="image" />
        </div>
        <div className="right-columns">
          <div>
            <h1 className="heading">404</h1>
          </div>
          <div className="text-container">
            <p className="text">Oops! Looks like the page you are looking for cannot be found.</p>
          </div>
          <div>
            <Link to="/" className="button">Go back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
