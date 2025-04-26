// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
// import { firebase } from '../config/firebase';
import { firebase } from '../firebase/config';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};