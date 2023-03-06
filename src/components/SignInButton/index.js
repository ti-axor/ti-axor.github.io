import React from 'react';
import { Navbar } from 'react-bootstrap';
import { NavigationBar } from '../NavigationBar';
import logo from '../../assets/download.jpg';

function SignInButton(props) {
  return (
    <div>
        <Navbar bg="primary" variant="dark">
          <img src={logo} alt='logo axor' width='50px' style={{ borderRadius: '50%', paddingLeft: '10px' }} />
          <a style={{ padding: '0 20px 0 20px' }} className="navbar-brand" href="/">Acessar plataforma</a>
          <NavigationBar />
        </Navbar>
        <br />
        <h5><center id="title">Comunicação interna Axor</center></h5>
        <br />
        {props.children}
        <br />
    </div>
  )
}

export default SignInButton;
