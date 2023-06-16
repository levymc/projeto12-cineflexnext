import styled from "styled-components";
import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/router';

export default function BtnHome() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Navega de volta para a página anterior
  };

  return (
    <SecBtn>
      <BsArrowLeft onClick={handleGoBack} data-test="go-home-header-btn" id="arrowIcon" />
    </SecBtn>
  );
}

const SecBtn = styled.section`
  position: absolute;
  height: auto;
  top: 1rem;
  left: 1.5rem;
  z-index: 999;

  #arrowIcon {
    cursor: pointer;
    color: black;
  }
`;
