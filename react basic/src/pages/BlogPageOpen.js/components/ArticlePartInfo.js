import React from 'react';

const ArticlePartInfo = ({elem}) => {
    const { text = null, photo = null} = elem;
    
    return (
        <div className={'article-part'}>
            <span>{text}</span>
            <img src={photo} alt=''></img>
        </div>
    )
}

export default ArticlePartInfo;
