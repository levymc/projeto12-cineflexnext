import styled from "styled-components";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import { useRouter } from "next/router";
import BtnHome from "../../components/BtnHome";
import NavContainer from "../../components/NavContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SessionsPage() {
    const router = useRouter();
    const { movieId } = router.query;

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);

    const notify = () => toast('🦄 Wow so easy!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    useEffect(() => {
        const getSMovie = async () => {
            try {
                const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`);
                setMovie(response.data);
            } catch (error) {
                console.error('Erro ao buscar os filmes:', error);
                setMovie([]);
            } finally {
                setLoading(false);
            }
        };

        getSMovie();
    }, []);

    if (loading) {
        notify()
        return (
            <PageContainer>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </PageContainer>
        );
    } else {
        return (
            <PageContainer>
                <NavContainer />
                <BtnHome />
                Selecione o horário
                {movie.days && movie.days.map((day, i) =>
                    <SessionContainer key={day.id}>
                        {day.weekday} - {day.date}
                        <ButtonsContainer key={day.id} data-test="movie-day">
                            {day.showtimes.map((time, i) =>
                                <button className="waves-effect waves-light orange btn-small" data-test="showtime" onClick={() => navigateTo(`/assentos/${day.id}`, { state: { sessionId: time.id, movieId: movieId, time: time, day: day.weekday } })} key={time.id}>{time.name}</button>
                            )}
                        </ButtonsContainer>
                    </SessionContainer>
                )}

                <FooterContainer data-test="footer">
                    <div>
                        <img src={movie.posterURL} onClick={() => console.log(idFilme)} alt="poster" />
                    </div>
                    <div>
                        <p>{movie.title}</p>
                    </div>
                </FooterContainer>

            </PageContainer>
        );
    }
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`;

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;

    button {
        margin-right: 20px;
        z-index: 0 !important;
    }

    a {
        text-decoration: none;
    }
`;

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;

        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        p {
            text-align: left;

            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;
