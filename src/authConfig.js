/* eslint-disable no-undef */
import { LogLevel } from "@azure/msal-browser";

const {
    REACT_APP_CLIENT_ID,
    REACT_APP_ENV_DEV,
    REACT_APP_ENV_PROD,
} = process.env;

const URL = process.env.NODE_ENV === 'development' ? REACT_APP_ENV_DEV : REACT_APP_ENV_PROD;

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: REACT_APP_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/common", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: URL, // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
        postLogoutRedirectUri: URL, // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        asyncPopups: true,
        allowRedirectInIframe: true,
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        return console.error('Error', message);
                    case LogLevel.Info:
                        return console.info('Info', message);
                    case LogLevel.Verbose:
                        return console.debug('Verbose', message);
                    case LogLevel.Warning:
                        return console.warn('Warning', message);
                    default:
                      return console.log('Default');
                }
            }
        },
        pollIntervalMilliseconds: 10
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["User.Read"]
};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
    scopes: ["openid", "profile"],
    loginHint: "example@domain.net"
};
