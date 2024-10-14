import {createContext, useReducer, Dispatch, useEffect}  from 'react'
import {useRefreshToken} from '../hooks/useRefreshToken'


interface AuthState{
user:null | object | undefined 
}

interface AuthAction{
type:string
payload?:object
}

interface AuthContextType extends AuthState {
    dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType>({user:null, dispatch: () => {}});


export const authReducer = (state:AuthState, action:AuthAction):AuthState=>{

switch (action.type){

case 'LOGIN':
    return {user: action.payload}

case 'LOGOUT':
    return {user:null}
default:
    return state

}


}

export const AuthContextProvider = ({children}:{children:React.ReactNode})=>{

const [state, dispatch] = useReducer(authReducer, {user:null})
const {refreshToken, token} = useRefreshToken()



// checking if user still logged in
useEffect(()=>{

// refresh token at an initial render
refreshToken()    

// refreshing token every 15 minutes
const refresh = setInterval(()=>{ refreshToken() }, 15*60*1000)


if(token){ 

dispatch({type:'LOGIN', payload:{token:token}})

}

return ()=> clearInterval(refresh) 

}, [token]);


//console.log('AuthContext state: ', state)

return (
    
<AuthContext.Provider value={{ ...state, dispatch }}>
{children}
</AuthContext.Provider>



)



}

