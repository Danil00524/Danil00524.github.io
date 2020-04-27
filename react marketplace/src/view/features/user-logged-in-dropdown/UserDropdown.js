import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import femaleDefaultIcon from '../../../assets/icon/female.svg';
import './user-dropdown.scss';

const UserDropdown = ({ user }) => {
    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const dispatch = useDispatch();

    const onClickOutside = ({ target }) => {
        if (!target.closest('.user-btn')) {
            setIsShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', onClickOutside);

        return () => document.removeEventListener('click', onClickOutside);
    }, []);

    const signOut = event => {
        event.preventDefault();
        dispatch({
            type: 'SIGN_OUT'
        });
    };

    return (
        <div
            className={`user-btn ${isShowDropdown ? 'show' : ''}`}
            onClick={() => setIsShowDropdown(!isShowDropdown)}    
        >
            <button
                className={`simple-btn d-flex align-items-center text-white pl-5 pr-5 ${isShowDropdown ? 'btn--gradient' : ''}`}
            >
                <img src={femaleDefaultIcon} className="mr-2"/>
                {`${user.first_name} ${user.last_name}`}
                <span className="arrow arrow--white"></span>
            </button>
            {
                isShowDropdown &&
                <div className="user-btn__dropdown d-flex flex-column align-items-center">
                    <Link to="/profile">Profile</Link>
                    <a
                        href="#"
                        onClick={signOut}
                    >Sign Out</a>
                </div>
            }
        </div>
    );
}

export default UserDropdown;