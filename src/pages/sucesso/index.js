import styled from "styled-components"
import React, { useState } from "react";
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css';
import { useRouter } from "next/router";
import Link from "next/link";
import NavContainer from "@/components/NavContainer";
import BtnHome from "@/components/BtnHome";
import { useContext } from 'react';
import Head from "next/head";
import { SeatContext } from "../assentos/SeatContext";

export default function SuccessPage() {
    const router = useRouter();
    const { nomeComprador, cpfComprador, isSelected } = router.query;
    const { allSeats } = useContext(SeatContext);
    const { indexSelectedSeat, setIndexSelectedSeat } = useContext(SeatContext);

    // console.log("Aqui",nomeComprador, cpfComprador, isSelected, allSeats, indexSelectedSeat )

    let ids = []

    if (Array.isArray(indexSelectedSeat)) {
        indexSelectedSeat.forEach((element) => {
            console.log(allSeats.seats[element].id);
            ids.push(allSeats.seats[element].id);
            console.log(ids);
        });
    } else if (Number.isInteger(indexSelectedSeat)) {
        console.log(allSeats.seats[indexSelectedSeat].id);
        ids.push(allSeats.seats[indexSelectedSeat].id);
        console.log(ids);
    } else {
        console.log("O valor de indexSelectedSeat não é um número inteiro ou um array.");
    }
    React.useEffect(()=>{
        axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', {ids: ids, name: nomeComprador, cpf: cpfComprador.replace(/[.-]/g, "")}).then(response =>{
            console.log(response)
        }).catch(e => {
            console.log(e)
        })
    }, [])
    
    return (
        <PageContainer>
            <Head>
                <title>CineFlex NextJS</title>
            </Head>
            <NavContainer />
            <BtnHome />
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer  data-test="movie-info">
                <strong><p>Filme e Sessão</p></strong>
                <p>{allSeats.movie.title}</p>
                <p>{allSeats.day.weekday} {allSeats.day.date} - {allSeats.name}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {indexSelectedSeat.map((indice, i) => <p>Assento {allSeats.seats[indice].name}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {nomeComprador}</p>
                <p>CPF: {cpfComprador}</p>
            </TextContainer>

            <Link href="/" data-test="go-home-btn" className="waves-effect waves-light orange btn-small">
                Voltar para Home
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`