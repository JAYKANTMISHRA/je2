import React, { useState, useEffect, useCallback } from 'react';
import UserContext from './UserContext';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const set_Data_to_cookies = useCallback((data) => {
        setUserData(data);
        setIsAuthenticate(true);
        const expiryDate = new Date(jwtDecode(data.token).exp * 1000);
        Cookies.set('userData', JSON.stringify(data), { expires: expiryDate });
    }, []);

    useEffect(() => {
        const storedAuthData = Cookies.get('userData');
        if (storedAuthData) {
            const data = JSON.parse(storedAuthData);
            const decodedToken = jwtDecode(data.token);
            if (decodedToken.exp * 1000 > Date.now()) {
                setUserData(data);
                setIsAuthenticate(true);
            } else {
                Cookies.remove('userData');
                setIsAuthenticate(false);
            }
        }
    }, []);

    const remove_Data_from_cookies = useCallback(() => {
        setUserData(null);
        Cookies.remove('userData');
        setIsAuthenticate(false);
    }, []);

    return (
        <UserContext.Provider value={{ userData, set_Data_to_cookies, remove_Data_from_cookies, isAuthenticate, setIsAuthenticate}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
