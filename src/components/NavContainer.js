import BtnHome from "./BtnHome"
import styled from "styled-components"


export default function NavContainer(props){
    return (
        <SCNavContainer>
            {/* <BtnHome />  */}
            CINEFLEX
        </SCNavContainer>
    )
}

const SCNavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    z-index:1;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`