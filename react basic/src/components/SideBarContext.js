import {createContext} from 'react';

const SideBarContext = createContext({});
export const SideBarProvider = SideBarContext.Provider;
export const SideBarConsumer = SideBarContext.Consumer;
