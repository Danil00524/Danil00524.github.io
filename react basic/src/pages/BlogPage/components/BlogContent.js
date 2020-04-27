import React, { useState } from 'react';

import './BlogContent.scss';
import Button from '../../../components/Button';
import ArticleInfo from './ArticleInfo'

const BlogContent = ({ contentType, content }) => {
    const [maxIndex, setMaxIndex] = useState(16);

    const addToIndex = 4;

    const addVisibleElems = () => {
        setMaxIndex(maxIndex + addToIndex)
    };

    // ^ Visible additional items with button ^

    const tabFilter = (() => {
        if (contentType === "Все") {
            return content;
        } else {
            return content.filter(elem => elem.type === contentType)
        }
    })();

    return (
        <>
            <div className="blog-page-hoc-content">
                <div className="row-1 d-flex flex-wrap">
                    {tabFilter.map((elem, index) => {
                        if (index < maxIndex) {
                            return <ArticleInfo key={elem.id} elem={elem} />
                        } else {
                            return null;
                        }
                    })
                    }
                </div>
            </div>
            <Button
                onClick={addVisibleElems}
                className={'rounded stroked transparent black-text d-block mx-auto'}
                text={'Загрузить больше'} />
        </>
    )
}

export default BlogContent;
