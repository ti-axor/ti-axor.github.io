import React, { useEffect, useState } from 'react';
import {
  Button, Navbar, OverlayTrigger,
} from 'react-bootstrap';
import { useMsal } from '@azure/msal-react';
import { NavigationBar } from '../NavigationBar';
import PropTypes from 'prop-types';
import logo from '../../assets/download.jpg';
import Tooltip from '../Tooltip';

function SignInButton(props) {
  const [idTokenClaims, setIdTokenClaims] = useState({ name: '', username: '' });
  const { accounts } = useMsal();

  useEffect(() => {
    accounts.length > 0 && setIdTokenClaims(accounts[0]);
  }, [accounts]);

  const { name, username } = idTokenClaims;

  const navbarName = () => {
    if (name && name !== '') {
      return `Olá, ${name}`;
    }
    return 'Acessar plataforma';
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <img src={logo} alt="logo axor" width="50px" style={{ borderRadius: '50%', paddingLeft: '10px' }} />
        <a style={{ padding: '0 20px 0 20px' }} className="navbar-brand" href="/">{navbarName()}</a>
        <NavigationBar />
        <OverlayTrigger placement="auto" overlay={Tooltip(name, username)}>
          <Button style={{ position: 'absolute', right: '20px' }} variant="info">
            Settings
          </Button>
        </OverlayTrigger>
      </Navbar>
      <br />
      <h5><center id="title">Comunicação interna Axor</center></h5>
      <br />
      {props.children}
      <br />
    </div>
  );
}
SignInButton.propTypes = {
  children: PropTypes.node,
}.isRequired;


export default SignInButton;
