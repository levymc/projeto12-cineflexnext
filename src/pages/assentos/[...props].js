import styled from "styled-components"
import axios from 'axios';
import React, { useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import { useRouter } from "next/router";
import { useContext } from 'react';
import { SeatContext } from "./SeatContext";
import NavContainer from "@/components/NavContainer";
import BtnHome from "@/components/BtnHome";
import Link from "next/link";



export default function SeatsPage(props) {
    const router = useRouter();
    const { sessionId, movieId, time, day } = router.query;

    const [isLoading, setIsLoading] = useState(true);
    const { allSeats } = useContext(SeatContext);
    const { setAllSeats } = useContext(SeatContext);
    

    const icons = {
        selecionado: {
            border: "1px solid #0E7D71",
            backGroundColor: "#1AAE9E",
            msg: "Selecionado",
        },
        disponivel: {
            border: "1px solid #7B8B99",
            backGroundColor: "#C3CFD9",
            msg: "Disponível",
        },
        indisponivel: {
            border: "1px solid #F7C52B",
            backGroundColor: "#FBE192",
            msg: "Indisponível",
        }
    }
    const iconsArray = Object.entries(icons);

    const [isSelected, setIsSelected] = useState([])
    const [movie, setMovie] = useState([])

    const [reservados, setReservados] = useState([])

    const [nomeComprador, setNomeComprador] = useState('');
    const [cpfComprador, setCpfComprador] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Enviar os dados para o servidor
        router.push("/sucesso", {
            state: {
                nomeComprador: nomeComprador,
                cpfComprador: cpfComprador,
                isSelected: isSelected,
                allSeats: allSeats,
                indexSelectedSeat: indexSelectedSeat
            }
        });
    };

    React.useEffect(() => {
        const getMovie = async () => {
          try {
            const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`);
            setMovie(response.data);
          } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
            setMovie([]);
          }
        };
        getMovie(); 
    }, []);

    React.useEffect(() => {
            atualiza();
        }, [allSeats]); // Adicione este useEffect com dependência em props.allSeats
        const atualiza = () => {
            setIsSelected(
                allSeats.seats.map((selec, i) => selec.isAvailable === true ? "vazio" : "indisponivel") || []
            );
    }; 

    const [indexSelectedSeat, setIndexSelectedSeat] = useState([]);

    const changeSelect = (index, newValue, seat) => {
        if (seat.isAvailable) {
          const newArray = [...isSelected];
          newArray[index] = newArray[index] === "selecionado" ? "vazio" : newValue;
          setIsSelected(newArray);
      
          const updatedIndexSelectedSeat = newArray.reduce((indices, selec, i) => {
            if (selec === 'selecionado') {
              indices.push(i);
            }
            return indices;
          }, []);
          setIndexSelectedSeat(updatedIndexSelectedSeat);
        } else {
          alert("Assento indisponível!");
        }
      };
      
    return (
        <PageContainer>
            <NavContainer />
            <BtnHome/>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {allSeats.seats && allSeats.seats.map((seat, i) => 
                    <SeatItem 
                        isSelected = {isSelected[i]}
                        isAvailable = {seat.isAvailable}
                        data-test="seat"
                        onClick={() =>
                            changeSelect(i, "selecionado", seat)
                        }
                        key={seat.id}>
                        {seat.name}
                    </SeatItem>
                )}
            </SeatsContainer>

            <CaptionContainer>
                {iconsArray.map(([key, value]) => (
                    <CaptionItem key={key}>
                        <CaptionCircle 
                            iconsArray={iconsArray} 
                            key={key} 
                            border={value.border} 
                            backGroundColor={value.backGroundColor} 
                            
                        />
                        {value.msg}
                    </CaptionItem>
                    ))
                }
            </CaptionContainer>

            <FormContainer onSubmit={handleSubmit}>
                <label>
                    Nome do Comprador:
                    <input data-test="client-name"
                        value={nomeComprador}
                        onChange={(event) => setNomeComprador(event.target.value) } 
                        type="text" 
                        placeholder="Digite seu nome..." 
                    />
                </label>

                <label>
                    CPF do Comprador:
                    <input
                    type="text"
                    data-test="client-cpf"
                    value={cpfComprador}
                    onChange={(event) => setCpfComprador(event.target.value)}
                    placeholder="Digite seu CPF..."
                    />
                </label>

                <Link 
                    className="waves-effect waves-light orange btn-small" 
                    data-test="book-seat-btn"
                    href={{
                        pathname: '/sucesso',
                        // query: {
                        // nomeComprador: nomeComprador,
                        // cpfComprador: cpfComprador,
                        // isSelected: isSelected,
                        // allSeats: allSeats,
                        // indexSelectedSeat: indexSelectedSeat
                        // }
                    }}
                >
                    Reservar Assento(s)
                </Link>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{day} - {time}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const LoadingContainer = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 100px;
`;


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    width:100%;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    gap: 1rem;
    width: 100%; 
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    font-size: 18px;
    padding-top: 1.5rem;
    margin-bottom: 1rem;
    button {
        align-self: center;
        z-index: 0 !important;
    }
    input {

        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`

const CaptionCircle = styled.div`
    border: ${(props) => props.border};
    background-color: ${(props) => props.backGroundColor};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: ${(props) =>
        props.isSelected === "selecionado"
            ? "#1AAE9E"
            : props.isSelected === "indisponivel"
            ? "#FBE192"
            : "#C3CFD9"};
    cursor: pointer;
    background-color: ${(props) =>
        props.isSelected === "selecionado" ? "#1AAE9E": props.isSelected === "indisponivel" ? '#FBE192' : "lightblue"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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
`