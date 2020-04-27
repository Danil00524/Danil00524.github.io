import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import store from './../../store/configureStore';
import { getTeam } from '../../reducers/teamReducer';
import { teamRequest } from '../../requests/teamRequest';

import './AboutUsHOC.scss';
import OurTeamContainer from "./OurTeamContainer";
import TabsControl from "../../components/TabsControl";


const AboutUsHOC = () => {
  const [contentType, setContentType] = useState('Строители');

  const teamList = store.getState().team.teamList;
  const [content, setContent] = useState(teamList)

  const checkTeam = () => {
    if (!teamList) {
      teamRequest()
        .then(res => setContent(res.data))
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    checkTeam()
  }, [])

  const tabsList = ['Менеджеры', 'Строители', 'Плотники'];
  if (content) {
    return (
      <section className="our-team-section d-flex bg-color-darkbrown text-color-white position-relative">
        <div className="container d-flex flex-column section-letter letter-d2">
          <h2 className="title title-xxl text-center">Наша команда</h2>
          <TabsControl
            tabsList={tabsList}
            activeTabIndex={1}
            className={'mx-auto'}
            setContent={setContentType} />

          <OurTeamContainer
            contentType={contentType}
            content={content} />
        </div>
      </section>
    )
  } else {
    return null;
  }
};

export default connect(getTeam)(AboutUsHOC);
