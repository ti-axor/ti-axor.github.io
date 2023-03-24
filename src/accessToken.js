import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const pca = new PublicClientApplication(msalConfig);
const accounts = pca.getAllAccounts();

async function getAccessToken() {
    if (accounts.length > 0) {
        const request = {
            scopes: ["User.Read"],
            account: accounts[0]
        }
        const accessToken = await pca.acquireTokenSilent(request).then((response) => {
            return response.accessToken;
        }).catch(error => {
            // Do not fallback to interaction when running outside the context of MsalProvider. Interaction should always be done inside context.
            console.log(error);
            return null;
        });

        return accessToken;
    }

    return null;
}

export default getAccessToken;