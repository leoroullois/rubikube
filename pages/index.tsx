import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const Home: NextPage = () => {
  return (
    <>
      <Navbar/> 
  <main>
      <h1>Rubikube</h1> 
  </main>
      <Footer/>
    </>)
}

export default Home
