import styled from 'styled-components';
import Link from 'next/link';

export default function HomePage(props) {
  const teste = "hellow"
  return (
      <PageContainer>
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