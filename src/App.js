import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import MainContent from './components/MyContent';
import SignInButton from './components/SignInButton';
import PropTypes from 'prop-types';
import './App.css';

export default function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <SignInButton>
        <MainContent />
      </SignInButton>
    </MsalProvider>
  );
}

App.propTypes = {
  msalInstance: PropTypes.node,
}.isRequired;
