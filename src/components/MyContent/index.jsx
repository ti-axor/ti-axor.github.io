import React, { useEffect } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useState } from "react";
import fundoPrincipal from '../../assets/axorlogotipo.png';
import axios from 'axios';
// import { PowerBIEmbed } from 'powerbi-client-react';
// import { IdTokenClaims } from "../IdTokenClaims";

const IdTokenContent = () => {
  const { accounts } = useMsal();
  const [idTokenClaims, setIdTokenClaims] = useState(null);

  // function GetIdTokenClaims() {
  //     setIdTokenClaims(accounts[0].idTokenClaims)
  // }
  useEffect(() => {
    let user = accounts[0];
    apiPowerBi().then((e) => console.log('res', e)).catch((e) => console.log('erro', e));
    if (user) {
      user = user.username.split('@')[0];
    }
    setIdTokenClaims(user)
  }, [accounts]);

  console.log(idTokenClaims);

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

const apiPowerBi = async () => {
  const api = 'https://api.powerbi.com/v1.0/myorg/reports/0b860ffe-a626-4ed4-9fa9-a7f5b41995fc';
  const config = {
    Headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  }
  const response = await axios.get(api, config);
  console.log('aqui', response);
  return response;
}

export const MainContent = () => {
  const [partDay, setPartDay] = useState('Bom Dia');
  const [userToken, setUserToken] = useState(null);
  const { accounts } = useMsal();
  const time = new Date();

  useEffect(() => {
    let user = accounts[0];
    if (user) {
      user = user.username.split('@')[0];
    }
    setUserToken(user)
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
          {(userToken === 'jmeyrelles' || userToken === 'gsilveira') && <div style={{ width: '100%', height: '60rem' }} dangerouslySetInnerHTML={{ __html: '<iframe title="projetosrj" width="100%" height="100%" src="https://axorcad.sharepoint.com/sites/vendas/Shared%20Documents/Forms/AllItems.aspx?e=5%3Ad20f7820c1f447478d2be5da263da35b&at=9&RootFolder=%2Fsites%2Fvendas%2FShared%20Documents%2FProjetos%20MDL%20RJ&FolderCTID=0x0120002241F0683182D84880A568FF699E88C9" frameborder="0" allowFullScreen="true"></iframe>' }} />}
          {/* <iframe
            title="projetosrj"
            width="100%"
            height="100%"
            src="https://axorcad.sharepoint.com/sites/vendas/Shared%20Documents/Forms/AllItems.aspx?e=5%3Ad20f7820c1f447478d2be5da263da35b&at=9&RootFolder=%2Fsites%2Fvendas%2FShared%20Documents%2FProjetos%20MDL%20RJ&FolderCTID=0x0120002241F0683182D84880A568FF699E88C9"
            frameborder="0"
            allowFullScreen="true"
          ></iframe> */}
          {userToken === 'jmeyrelles' && (<iframe
            title="cronograma_ti"
            width="1820"
            height="800"
            src={`https://app.powerbi.com/reportEmbed?reportId=0b860ffe-a626-4ed4-9fa9-a7f5b41995fc&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameborder="0"
            allowFullScreen="true"
          ></iframe>)}
          {userToken === 'mbeserra' && (<iframe
            title="contabilidade"
            width="1820"
            height="900"
            src={`https://app.powerbi.com/reportEmbed?reportId=${REACT_APP_REP_ID}&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>)}
          {userToken === 'cmorielo' && (<iframe
            title="Seguro MPI"
            width="1820"
            height="900"
            src={`https://app.powerbi.com/reportEmbed?reportId=b9cbafca-bbee-43b9-b58f-fdb2202e9737&autoAuth=true&ctid=${REACT_APP_AUTH}`}
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>)}
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <h5 className="card-title">{partDay}</h5>
          <div>
            <img src={fundoPrincipal} alt='fundo axor' style={{ backgroundColor: 'white', width: '1000px', padding: '10px', marginTop: '30px' }} />
          </div>
        </UnauthenticatedTemplate>
      </div>
  );
};

// https://github.com/Azure-Samples/ms-identity-javascript-react-tutorial/tree/main/1-Authentication/1-sign-in/SPA/src