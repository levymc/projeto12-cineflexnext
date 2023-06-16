import Link from 'next/link';
import styled from "styled-components"
import axios from 'axios';
import React, { useState, useEffect } from "react";
import NavContainer from '../components/NavContainer';
import ResetStyle from '../style/ResetStyle';
import GlobalStyle from '../style/GlobalStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
    const customId = "custom-id";
    const notify = () => toast('🦄 Carregando...', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                toastId: customId,
                            });

    axios.defaults.headers.common['Authorization'] = 'JrVC988hm5rkhTQCtGv4DBlq';

    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovies = async () => {
          try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');
            setAllMovies(response.data);
          } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
            setAllMovies([]);
          } finally {
            setLoading(false);
          }
        };
        
        getMovies();
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
                    theme="dark"
                />
            </PageContainer>
        );
    } else {
        return (
            <PageContainer>
                <NavContainer />
                Selecione o filme
    
                <ListContainer>
                    {allMovies.map((movie, i) => 
                        <MovieContainer key={movie.id} data-test="movie">
                            <Link href={`/sessoes/${movie.id}`} passHref>
                                <img
                                id={movie.id}
                                key={movie.id}
                                src={movie.posterURL}
                                alt={movie.title}
                                />
                            </Link>
                        </MovieContainer>
                    )}
                </ListContainer>
    
            </PageContainer>
        );
    }
}

const PageContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 360px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        cursor: pointer;
        width: 130px;
        height: 190px;
    }
`