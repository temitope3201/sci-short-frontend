import {createAuthProvider} from 'react-token-auth'
import { baseUrl } from '.'


export const {useAuth, authFetch, login, logout} =
    createAuthProvider({
        accesTokenKey: 'access_token',
        onUpdateToken: (token)=> fetch(`${baseUrl}/users/refresh`, {
            method: 'POST',
            body: token.refresh_token
        })
        .then(r => r.json())

        
    })