import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const teste = 'oi';

  return (
    <>
      {/* Restante do código... */}
      <Link href={`/HomePage/${encodeURIComponent(teste)}`}>
        <a>Ir para HomePage</a>
      </Link>
    </>
  );
}