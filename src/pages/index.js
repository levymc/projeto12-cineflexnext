import Link from 'next/link';
import styled from "styled-components"
import axios from 'axios';
import React, { useState } from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
// import BtnHome from "./components/BtnHome";
import NavContainer from '../components/NavContainer';

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

  return (
      <PageContainer>
        <NavContainer />
        <Link href={`/HomePage/${encodeURIComponent(teste)}`}><button>Home</button></Link>
      </PageContainer>
  )
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