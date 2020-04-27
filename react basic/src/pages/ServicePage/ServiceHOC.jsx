import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import './ServiceHOC.scss';
import OurServiceContainer from './components/OurServiceContainer'
import TabsControl from "../../components/TabsControl";

import { getService } from '../../reducers/serviceReducer'
import { serviceRequest } from '../../requests/serviceRequest';

import store from '../../store/configureStore';

const ServiceHOC = () => {
  const [contentType, setContentType] = useState('Проектирование');
  const tabsList = ['Проектирование', 'Производство', 'Строительство'];

  const serviceList = store.getState().service.serviceList;

  const [content, setContent] = useState(serviceList)

  const checkService = () => {
    if (!serviceList) {
      serviceRequest()
        .then(res => setContent(res.data))
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    checkService()
  }, [])

  if (content) {
    return (
      <section className="service-our-services-section">
        <div className="container d-flex flex-column">
          <TabsControl
            tabsList={tabsList}
            activeTabIndex={0}
            className={'mx-auto'}
            setContent={setContentType} />
          <OurServiceContainer
            contentType={contentType}
            content={content} />
        </div>
      </section>
    )
  } else {
    return null;
  }
};
export default connect(getService)(ServiceHOC);
