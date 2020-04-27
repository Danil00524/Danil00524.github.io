import React from "react";

import './HouseFeatures.scss';
import houseFeaturesList from "./houseFeaturesList";
import {useBreakpoint} from "../../../components/Breakpoints";

const HouseFeatures = ({className}) => {
  const breakpoints = useBreakpoint();
  return (
      <>
        <div className={`house-features w-100 ${(className || '')}`}>
          <ul className="house-features-list d-flex flex-wrap justify-content-center">
            {
              houseFeaturesList.map((item, index) => {
                if (breakpoints.md && index >= 2) return;
                if (breakpoints.xl && index >= 4) return;
                
                return (
                    <li
                      className={`house-features-item ${houseFeaturesList.length - 1 === index ? 'd-flex' : 'd-flex'} flex-column`}
                      key={index}
                    >
                      <div className="item-icon d-flex justify-content-center align-items-center">
                        {item.icon}
                      </div>
                      <div className="item-name text-center text-color-white">
                        <span className="text text-sm">{item.name}</span>
                      </div>
                    </li>
                );
              })
            }
          </ul>
        </div>
      </>
  );
};

export default HouseFeatures;
