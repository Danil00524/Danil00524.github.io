import React, { useState } from 'react';

import './CatalogContent.scss';
import SingleContentElem from './SingleContentElem';
import SingleContentElemBanner from './SingleContentElemBanner';
import Button from "../../Button";

const CatalogContent = ({ state, contentType, filterOption }) => {
  if (contentType == 'Беседки') {
    filterOption.bedroom = '';
    filterOption.floors = '';
  }

  // See too more product card
  const [maxIndex, setMaxIndex] = useState(8);
  const addToIndex = 4;

  const addVisibleElems = () => {
    setMaxIndex(maxIndex + addToIndex);
  };

  // Tab filter on content type
  const tabFilter = () => {
    if (contentType === "Все") {
      return state
    } else {
      return state.filter(content => content.type === contentType)
    }
  };

  const tab = tabFilter();

  // Filtration on user params, example: rooms, floors and other.
  function detectMethod(value) {
    if (String(value).includes('+')) {
      return { method: '>', value: parseInt(value) };
    } else if (String(value).includes('-')) {
      const [left, right] = value.split('-');
      return {
        method: 'range',
        left: parseInt(left),
        right: parseInt(right),
      };
    }
    return { method: '===', value: value };
  }

  let buffer = tab;
  if (Object.keys(filterOption).length) {
    buffer = tab.filter(item => {
      for (let key in filterOption) {
        if (filterOption[key] == '') {
          continue;
        }

        const method = detectMethod(filterOption[key]);

        if (method.method === '===') {
          if (!(item[key] === method.value)) {
            return false;
          }
        } else if (method.method === '>') {
          if (!(item[key] >= method.value)) {
            return false;
          }
        } else if (method.method === 'range') {
          if (!(item[key] <= method.right && item[key] >= method.left)) {
            return false;
          }
        }
      }
      return true;
    });
  }

  return (
    <>
      <div className="container d-flex flex-column position-relative z-index-1">
        <div className="catalog-wrapper d-flex flex-wrap">
          {buffer.map((elem, index) => {
            if (index < maxIndex) {
              if (index === 4) {
                return (
                  <SingleContentElemBanner key={index} />
                )
              } if (index === 9) {
                return (
                  <SingleContentElemBanner key={index} />
                )
              } if (index === 15) {
                return (
                  <SingleContentElemBanner key={index} />
                )
              } else {
                return <SingleContentElem
                  elem={elem}
                  index={index + 1}
                  key={index} />
              }
            } else {
              return null;
            }
          })}
        </div>
        <Button
          onClick={addVisibleElems}
          className="rounded stroked transparent black-text mx-auto"
          text="Загрузить больше" />
      </div>
    </>
  )
};
export default CatalogContent;
