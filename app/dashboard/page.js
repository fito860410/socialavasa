'use client'

import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';

async function Page() {
  const [responseData, setResponseData] = useState(null);
  
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const tenant = 'e31dd0f2-de23-4dd1-8dea-3fed57f15c2c';

  const endpointToken = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;
  const clientID = 'e064c356-8ac9-4cb7-8041-936fa3fb9a56';
  const clientSecret = '5I68Q~TRsKa.h1H6TPZP_XMWvDZTBGcEYabfYatF';
  const redirectURI = 'http://localhost:3000/dashboard/';  

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientID);
  params.append('client_secret', clientSecret);
  params.append('redirect_uri', redirectURI);
  params.append('code', code);
   
  try {
    const response = await axios.post(endpointToken, params);
    const accessToken = response.data.access_token;
    const expiresIn = response.data.expires_in;

    //llamada al api    
    const baseUrlApi = 'https://graph.microsoft.com/v1.0/users'; 
  
    /* Guardando los datos en Response */
    const response1 = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response1.data)

    setResponseData(response1.data);

    //console.log('Token de Acceso:', accessToken);
    //console.log('Expira en:', expiresIn);
  } catch (error) {
    console.error('Error al solicitar el token de acceso:', error);
  }

   return (
    <>
      {responseData ? (
        <h1>{responseData.mail}</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
   );
}

export default Page


export async function Usuarios(accessToken) {
  try {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;

  } catch (error) {
    console.error('Error fetching graph data:', error);
    throw error;
  }
}
