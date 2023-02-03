import React, { useEffect } from 'react';

const useNotificationApp = () => {
    useEffect(() => {
        console.warn('================================================================');
        console.log(
            `%c Активное приложение ${process.env.REACT_APP_NAME}`,
            'color:DodgerBlue;font-size:large',
        );
        console.log(`%c ${process.env.REACT_APP_V}`, 'color:red;font-size:large');
        console.warn('================================================================');
    }, []);
};

export default useNotificationApp;
