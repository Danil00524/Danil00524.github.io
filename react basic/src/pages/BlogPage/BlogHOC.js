import React, { useState } from 'react';

import TabsControl from '../../components/TabsControl';
import BlogContent from './components/BlogContent';
import './BlogHOC.scss'

const BlogHOC = ({ articles }) => {
  const [contentType, setContentType] = useState('Все');
  const tabsList = ['Все', 'Материалы', 'Истории', 'Новости', 'Команда', 'Интерьер'];

  return (
    <>
      <section className="blog-page-hoc-section">
        <div className="container d-flex flex-column">
          <TabsControl
            tabsList={tabsList}
            activeTabIndex={0}
            className={'mx-auto'}
            setContent={setContentType}
            theme="white" />
          <BlogContent
            contentType={contentType}
            content={articles} />
        </div>
      </section>
    </>
  )
}

export default BlogHOC;
