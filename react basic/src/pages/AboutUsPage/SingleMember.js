import React from 'react';

import './SingleMember.scss';

const SingleMember = ({ elem }) => {
  const { description, name, photo } = elem;

  return (
    <div className="our-team-item-wrapper">
      <div className="our-team-item position-relative overflow-hidden">
        <div className="our-team-item-img">
          <img src={photo} alt=""/>
        </div>
        <div className="our-team-item-info d-flex flex-column align-items-center justify-content-end">
          <h5 className="title title-lg">{name}</h5>
          <span className="text text-md">{description}</span>
        </div>
      </div>
    </div>
  )
};

export default SingleMember;
