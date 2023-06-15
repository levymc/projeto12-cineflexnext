import Link from 'next/link';
import styled from "styled-components"
import axios from 'axios';
import React, { useState } from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
// import BtnHome from "./components/BtnHome";
import NavContainer from '../components/NavContainer';
import ResetStyle from '../style/ResetStyle';
import GlobalStyle from '../style/GlobalStyle';


export default function HomePage(props) {
  const teste = "hellow"

  axios.defaults.headers.common['Authorization'] = 'JrVC988hm5rkhTQCtGv4DBlq';

    const [allMovies, setAllMovies] = useState([]);

    const [allSeats, setAllSeats] = useState([])

    React.useEffect(() => {
        const getMovies = async () => {
          try {
            const response = await axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');
            setAllMovies(response.data);
          } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
            setAllMovies([]);
          }
        };
        
        getMovies();
    }, []);
    if(allMovies.length === 0){
        return <div>....Carregando</div>
    }else{ {/* <Link href={`/HomePage/${encodeURIComponent(teste)}`}></Link> */}
        return (
            <PageContainer>
                <NavContainer />
                Selecione o filme
    
                <ListContainer>
                    {allMovies.map((movie, i) => 
                        <MovieContainer key={movie.id} data-test="movie">
                            <img 
                                id={movie.id} 
                                key={movie.id} 
                                src={movie.posterURL} 
                                alt={movie.title} 
                                onClick={() => {
                                    console.log(movie.id)
                                    navigateTo(`/sessoes/${movie.id}`, {
                                        state: {
                                            movieId: movie.id
                                        }
                                    });
                                }}
                            />
                        </MovieContainer>
                    )}
                </ListContainer>
    
            </PageContainer>
        )
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
    font-family: 'Roboto', sans-serif;
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