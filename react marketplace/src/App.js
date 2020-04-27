import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SearchSalonScreen from './view/pages/SearchSalonScreen';
import NotFound404 from './view/pages/NotFound404';
import queryString from 'query-string'
import Marketplace from './view/pages/Marketplace';
import Profile from './view/pages/Profile'


// searchBy
const [CATEGORY, SALON] = ['category', 'salon'];

function ControlledRootRoute(props) {
    const parsedSearchParams = queryString.parse(props.location.search);
    const isSalonSearching = 'searchBy' in parsedSearchParams && 'salon_id' in parsedSearchParams;

    if(isSalonSearching && parsedSearchParams.searchBy === SALON) {
        const salonId = parsedSearchParams.salon_id;

        return <Redirect to={{
            pathname: `/${salonId}`,
            ...props
        }} />
    } else if('searchBy' in parsedSearchParams && parsedSearchParams.searchBy === CATEGORY){
        return <SearchSalonScreen {...props}/>
    } else {
        // TODO: throw 404 page ??
        return <SearchSalonScreen {...props}/>
    }
}

// TODO: create routes folder
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('ws_marketplace_token');
        if (token) {
            dispatch({
                type: 'GET_PROFILE',
                meta: {
                    token,
                    callback: ({ payload: { data } }) => {
                        dispatch({
                            type: 'SIGN_IN',
                            payload: data
                        });
                    }
                }
            });
        }
    }, []);

    return (
        <div className={'app'}>
            <Router>
                <Switch>
                    {/* <Route exact path={'/'} component={ControlledRootRoute} /> */}
                    <Route exact path="/" component={Marketplace}/>
                    <Route path="/search-services" component={SearchSalonScreen}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path={'/:salon_id'} component={() => <h1>Salon id</h1>} />
                    <Route render={NotFound404} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
