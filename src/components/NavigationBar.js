import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { loginRequest } from '../authConfig';

export const NavigationBar = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
      instance.loginPopup(loginRequest)
          .catch((error) => console.log(error))
  }

  return (
      <>
          <AuthenticatedTemplate>
            <Button
                onClick={() => instance.logoutPopup({ postLogoutRedirectUri: "/", mainWindowRedirectUri: "/"})}
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
                onClick={handleLogin}
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
