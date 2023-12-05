import React, { createContext, useState, useContext } from 'react';

const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showSpinner = () => {
        setLoading(true);
    };

    const hideSpinner = () => {
        setLoading(false);
    };

    return (
        <SpinnerContext.Provider value={{ loading, showSpinner, hideSpinner }}>
            {children}
        </SpinnerContext.Provider>
);
};

export const useSpinner = () => {
    return useContext(SpinnerContext);
};
