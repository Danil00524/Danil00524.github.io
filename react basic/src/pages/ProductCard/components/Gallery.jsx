import React from 'react';

import './Gallery.scss';

const Gallery = ({ elem }) => {
  const { img, planning, video } = elem;

  return (
    <>
      {img.map((item, index) =>
        <div className={`slide photo`} key={index}>
          <img src={item.photo} alt="" />
        </div>
      )}
      {planning.map((item, index) =>
        <div className={`slide planning`} key={index}>
          <img src={item.planning} alt="" />
        </div>
      )}
      {video.map((item, index) =>
        <div className={`slide video`} key={index}>
          <video src={item.video} autoPlay={true}></video>
        </div>
      )}
    </>
  )
};

export default Gallery;
