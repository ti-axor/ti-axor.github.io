import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useState } from "react";
import fundoPrincipal from '../../assets/axorlogotipo.png';
// import { IdTokenClaims } from "./IdTokenClaims";

const IdTokenContent = () => {
  const { accounts } = useMsal();
  // const [idTokenClaims, setIdTokenClaims] = useState(null);

  // function GetIdTokenClaims() {
  //     setIdTokenClaims(accounts[0].idTokenClaims)
  // }

  return (
      <>
          {accounts.length > 0 ? 
              <h5
                className="card-title"
                style={{ padding: '0 0 30px 0' }}
              >
                Bem-vindo(a) {accounts[0].name}
              </h5>
              :
              <></>
          }
          
          {/* {idTokenClaims ?
              <IdTokenClaims idTokenClaims={idTokenClaims} />
              :
              <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>
          } */}
      </>
  );
};

const {
  REACT_APP_AUTH,
  REACT_APP_REP_ID,
} = process.env;

export const MainContent = () => {
  const [partDay, setPartDay] = useState('Bom Dia');
  const time = new Date();
  if (partDay === 'Bom Dia' && time.getHours() > 12 && time.getHours() < 18) {
    setPartDay('Boa Tarde');
  }
  if ((partDay === 'Bom Dia' || partDay === 'Bom Tarde') && time.getHours() > 18) {
    setPartDay('Boa Noite');
  }
  return (
      <div className="App">
        <AuthenticatedTemplate>
          <IdTokenContent />
          <iframe
            title="contabilidade"
            width="1820"
            height="900"
            src={`https://app.powerbi.com/reportEmbed?reportId=${REACT_APP_REP_ID}&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <h5 className="card-title">{partDay}</h5>
          {console.log(REACT_APP_AUTH, REACT_APP_REP_ID)}
          <div>
            <img src={fundoPrincipal} alt='fundo axor' style={{ backgroundColor: 'white', width: '1000px', padding: '10px', marginTop: '30px' }} />
          </div>
        </UnauthenticatedTemplate>
      </div>
  );
};

// https://github.com/Azure-Samples/ms-identity-javascript-react-tutorial/tree/main/1-Authentication/1-sign-in/SPA/src