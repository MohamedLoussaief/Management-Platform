import {createContext, useReducer, Dispatch, useEffect}  from 'react'


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

// checking if user still logged in
useEffect(()=>{

const user = JSON.parse(localStorage.getItem('user') as string)

if(user){

dispatch({type:'LOGIN', payload:user})

}

},[]);


console.log('AuthContext state: ', state)

return (
    
<AuthContext.Provider value={{ ...state, dispatch }}>
{children}
</AuthContext.Provider>



)



}

