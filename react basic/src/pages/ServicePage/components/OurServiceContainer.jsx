import React from 'react'

import SingleItem from './SingleItem';
import './OurServiceContainer.scss';

const OurServiceContainer = ({ contentType, content }) => {
  const serviceFilter = content.filter(member => member.type === contentType);

  return (
    <div className="tabs-container d-flex flex-wrap">
      {serviceFilter.map(elem => {
        return (
          <SingleItem
            elem={elem}
            key={elem.id} />
        )
      })
      }
    </div>
  )
};

export default OurServiceContainer;
