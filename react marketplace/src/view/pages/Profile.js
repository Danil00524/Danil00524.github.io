import React, { useEffect, useState } from 'react'

import FormProfile from '../features/formProfile/formProfile'
import { getProfile } from '../../API/handlers/auth'

const Profile = id => {
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('ws_marketplace_token');
            const profile = getProfile(token)

            const response = await fetch(profile.url, {
                headers: profile.headers,
                method: profile.method
            }).then(data => data.json())
            .catch(err => console.error(err))

            setProfile(response)
        })()
    }, [])

    if (profile) {
        return (
           <>
               <FormProfile profile={profile}/>
           </>
        )
    } else {
        return null;
    }

}

export default Profile;
