import path from '../path';

const login = ({ email, password }) => {
    const url = path.login();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    return {
        url,
        method: 'POST',
        data: formData
    };
};

const getProfile = token => {
    const url = path.getProfile();

    return {
        url,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
};



export  {
    login,
    getProfile
};
