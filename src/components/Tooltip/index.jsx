import React from 'react';
import { Tooltip as Tip } from 'react-bootstrap';

export default function Tooltip(name, username) {
  return (
    <Tip placement="bottom" className="in" id="tooltip-top">
      {name !== '' ? (
        <div>
          <h5>Usuário</h5>
          <div>
            Nome:
            {name}
          </div>
          <div>
            E-mail:
            {username}
          </div>
        </div>
      ) : <div>Usuário não logado</div>}
    </Tip>
  );
}
