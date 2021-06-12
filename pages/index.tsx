import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <p>This is carpooler</p>
      <a href="/profile">Profile</a> <br></br>
      <a href="/api/auth/login">Login</a> <br></br>
      <a href="/api/auth/logout">Logout</a>
    </>
  )
}
