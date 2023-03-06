export const IdTokenClaims = (props) => {
  return (
      <div id="token-div">
          <p><strong>Audience: </strong> {props.idTokenClaims.aud}</p>
          <p><strong>Issuer: </strong> {props.idTokenClaims.iss}</p>
          <p><strong>OID: </strong> {props.idTokenClaims.oid}</p>
          <p><strong>UPN: </strong> {props.idTokenClaims.preferred_username}</p>
      </div>
  );
}
