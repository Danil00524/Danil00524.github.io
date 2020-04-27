import React, {useState} from 'react'

import { ReactComponent as Logo } from "../../../assets/logo/what_salon_log.svg";
import { ReactComponent as ProfilePhoto } from "../../../assets/img/circle.svg";
import BtnWithSpinner from '../../../share-components/btn-with-spinner/BtnWithSpinner';
import { updateProfile } from '../../../API/handlers/updateProfile'

import './formProfile.scss'

const FormProfile = ({profile}) => {
    const {first_name, last_name, email} = profile.data;

    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);

    function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('ws_marketplace_token');
        const updateRequest = updaateProfile(token, firstName, lastName)

        fetch(updateRequest.url, {
            method: updateRequest.method,
            headers: updateRequest.headers,
            body: updateRequest.data
        }).then(response => {
            console.log(response);
        }).catch(err => console.error(err))
        console.log(updateRequest.data);
    }

    return(
        <div className='container'>
            <Logo />
            <form className="profile" onSubmit={e => handleSubmit(e)}>
                <div className="photo">
                    {/* <input type="file"/> */}
                    <ProfilePhoto />
                </div>
                <h4>Personal information</h4>
                <div className="profile__name">
                    <input type='text' value={firstName}  onChange={(event) => setFirstName(event.target.value)} required></input>
                    <input type='text' value={lastName} onChange={(event) => setLastName(event.target.value)} required></input>
                </div>
                <input placeholder={email}></input>
                <div className="profile__card-info">
                    <span>Card details</span>
                    {/* {cardInfo ? <span>Delete card</span> : null} */}
                </div>
                <input></input>
                <BtnWithSpinner
                    type="submit"
                    className="btn btn--gradient"
                    borderRadius="22px">
                    Save changes
                </BtnWithSpinner>
            </form>
        </div>
    )
}

export default FormProfile;
