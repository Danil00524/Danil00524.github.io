import React from 'react';

import './OurTeamContainer.scss';
import SingleMember from "./SingleMember";


const OurTeamContainer = ({ contentType, content }) => {
  const teamFilter = content.filter(member => member.type === contentType);

  return (
    <div className="our-team-container d-flex flex-wrap z-index-1">
      {teamFilter.map(elem => {
        return (
          <SingleMember
            elem={elem}
            key={elem.id} />
        )
      })
      }
    </div>
  )
};
export default OurTeamContainer;
