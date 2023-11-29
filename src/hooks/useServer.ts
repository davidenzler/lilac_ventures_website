import { useState } from 'react';

export const useServer = () => {
    const [apiServer, setApiServer] = useState<string>('');
    const setApiAddress = () => {
        process.env.API_SERVER ? setApiServer(process.env.API_SERVER) : setApiServer('');
    }
    return { apiServer, setApiAddress }
};