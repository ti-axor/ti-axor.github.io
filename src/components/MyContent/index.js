/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import fundoPrincipal from '../../assets/axorlogotipo.png';
// import { PowerBIEmbed } from 'powerbi-client-react';
// import { IdTokenClaims } from "../IdTokenClaims";

function IdTokenContent() {
  const { accounts } = useMsal();
  const [idTokenClaims, setIdTokenClaims] = useState(null);

  // function GetIdTokenClaims() {
  //     setIdTokenClaims(accounts[0].idTokenClaims)
  // }
  useEffect(() => {
    let user = accounts[0];
    if (user) {
      user = user.username.split('@')[0];
    }
    setIdTokenClaims(user);
  }, [accounts]);

  console.log(idTokenClaims);

  return (
    <>
      {accounts.length > 0
        ? (
          <h5
            className="card-title"
            style={{ padding: '0 0 30px 0' }}
          >
            Bem-vindo(a)
            {' '}
            {accounts[0].name}
          </h5>
        )
        : <></>}

      {/* {idTokenClaims ?
              <IdTokenClaims idTokenClaims={idTokenClaims} />
              :
              <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>
          } */}
    </>
  );
}

const {
  REACT_APP_AUTH,
  REACT_APP_REP_ID,
} = process.env;

export default function MainContent() {
  const [partDay, setPartDay] = useState('Bom Dia');
  const [userToken, setUserToken] = useState(null);
  const { accounts } = useMsal();
  const time = new Date();

  useEffect(() => {
    let user = accounts[0];
    if (user) {
      user = user.username.split('@')[0];
    }
    setUserToken(user);
  }, [accounts]);

  console.log(userToken);

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
        {userToken === 'jmeyrelles' && (
          <iframe
            title="Clientividade"
            width="1820"
            height="1000"
            src={`https://app.powerbi.com/reportEmbed?reportId=83d4ccb6-236b-4f6e-a2fd-6dffb11b150e&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameBorder="0"
            allowFullScreen="true"
          />
        )}
        {userToken === 'jmeyrelles' && (
          <iframe
            title="cronograma_ti"
            width="1820"
            height="1000"
            src={`https://app.powerbi.com/reportEmbed?reportId=668d77e3-fabc-41d4-a2ac-6bc4584994a2&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameBorder="0"
            allowFullScreen="true"
          />
        )}
        {userToken === 'jmeyrelles' && (
          <iframe
            title="cronograma_ti"
            width="1820"
            height="800"
            src={`https://app.powerbi.com/reportEmbed?reportId=0b860ffe-a626-4ed4-9fa9-a7f5b41995fc&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameBorder="0"
            allowFullScreen="true"
          />
        )}
        {userToken === 'mbeserra' && (
          <iframe
            title="contabilidade"
            width="1820"
            height="900"
            src={`https://app.powerbi.com/reportEmbed?reportId=${REACT_APP_REP_ID}&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameBorder="0"
            allowFullScreen
          />
        )}
        {userToken === 'cmorielo' && (
          <iframe
            title="Seguro MPI"
            width="1820"
            height="900"
            src={`https://app.powerbi.com/reportEmbed?reportId=b9cbafca-bbee-43b9-b58f-fdb2202e9737&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameBorder="0"
            allowFullScreen
          />
        )}
        {userToken === 'pgomes' && (
          <iframe
            title="Clientividade"
            width="1820"
            height="900"
            src={`https://app.powerbi.com/reportEmbed?reportId=83d4ccb6-236b-4f6e-a2fd-6dffb11b150e&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameBorder="0"
            allowFullScreen
          />
        )}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className="card-title">{partDay}</h5>
        <div>
          <img
            src={fundoPrincipal}
            alt="fundo axor"
            style={{
              backgroundColor: 'white', width: '1000px', padding: '10px', marginTop: '30px',
            }}
          />
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
}

// https://github.com/Azure-Samples/ms-identity-javascript-react-tutorial/tree/main/1-Authentication/1-sign-in/SPA/src
