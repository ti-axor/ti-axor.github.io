import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { loginRequest } from '../authConfig';

export const NavigationBar = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
		let token = '';
      const login = instance.loginRedirect(loginRequest)
          .catch((error) => console.log(error))
			await login.then((e) => token = e.accessToken);
			localStorage.setItem('token', JSON.stringify(token));
  }

	const {
    REACT_APP_ENV_DEV,
    REACT_APP_ENV_PROD,
} = process.env;

const URL = process.env.NODE_ENV === 'development' ? REACT_APP_ENV_DEV : REACT_APP_ENV_PROD;

  return (
      <>
				<AuthenticatedTemplate>
					<Button
						onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: URL })}
						variant="warning"
					>
						Log out
					</Button>
						{/* <DropdownButton variant="warning" className="ml-auto" drop="left" title="Log-off">
								<Dropdown.Item as="button" onClick={() => instance.logoutPopup({ postLogoutRedirectUri: "/", mainWindowRedirectUri: "/"})}>Sign out using Popup</Dropdown.Item>
								<Dropdown.Item as="button" onClick={() => instance.logoutRedirect({postLogoutRedirectUri: "/"})}>Sign out using Redirect</Dropdown.Item>
						</DropdownButton> */}
				</AuthenticatedTemplate>
				<UnauthenticatedTemplate>
					<Button
						onClick={() => handleLogin()}
						variant="success"
					>
						Log in
					</Button>
						{/* <DropdownButton variant="secondary" className="ml-auto" drop="left" title="Log-in">
								<Dropdown.Item as="button" onClick={handleLogin}>Sign in using Popup</Dropdown.Item>
								<Dropdown.Item as="button" onClick={() => instance.loginRedirect(loginRequest)}>Sign in using Redirect</Dropdown.Item>
						</DropdownButton> */}
				</UnauthenticatedTemplate>
      </>
  );
};
