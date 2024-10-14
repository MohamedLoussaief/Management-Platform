import { useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useAuthContext } from './useAuthContext';

interface DecodedToken {
  _id: number;
  fullName:string;
  userType: string;
}

const useDecodedToken = (): DecodedToken | null => {
  const { user } = useAuthContext();
  
  const token = (user as { token: string } )?.token;
if(token && typeof token === 'string'){

  try {
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }

 }

else{

return null;

}


};

export default useDecodedToken;


