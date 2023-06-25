import React, { createContext, useState } from 'react';
import axios from 'axios';

// Crie o contexto
export const SeatContext = createContext();

// Crie o provedor do contexto
export const SeatProvider = ({ children }) => {
    const [allSeats, setAllSeats] = useState([]);
    const [movieId, setMovieId] = useState('');
    const [indexSelectedSeat, setIndexSelectedSeat] = useState([]);

    React.useEffect(() => {
        if (movieId !== "") {
            const getSeats = async () => {
                try {
                    const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${movieId}/seats`);
                    setAllSeats(response.data);
                } catch (error) {
                    console.error('Erro ao buscar os assentos:', error);
                    setAllSeats([]);
                }
            };
            console.log(allSeats)
            getSeats();
        }
    }, [movieId]);

    return (
        <SeatContext.Provider value={{ allSeats, setAllSeats, movieId, setMovieId, indexSelectedSeat, setIndexSelectedSeat}}>
            {children}
        </SeatContext.Provider>
    );
};
