'use client'

import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';

async function Page() {
 
  
  /* Utilizada para obtener el parametro code de la URL */
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  /* Parametros URL*/
  const tenant = process.env.TENANT;
  const endpointToken = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectURI = 'http://localhost:3000/dashboard/';  

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientID);
  params.append('client_secret', clientSecret);
  params.append('redirect_uri', redirectURI);
  params.append('code', code);
   
  try {
    /* Realizando la consulta del Token de acceso*/
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
    
    const apellidos = response1.data.surname;
    console.log(response1.data)

    return apellidos

    //console.log('Token de Acceso:', accessToken);
    //console.log('Expira en:', expiresIn);
  } catch (error) {
    
  }

   return (
    
    <>
      {apellidos ? (
        <h1>{apellidos}</h1>
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
