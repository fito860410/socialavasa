'use client'

import React from 'react'
import { useEffect, useState } from 'react';

function Autorice() {
  const[location, setLocation] = useState(null)
  const clientID = 'e064c356-8ac9-4cb7-8041-936fa3fb9a56';
  const redirectURI = encodeURIComponent('http://localhost:3000/dashboard/');
  const scope = encodeURIComponent('offline_access user.read mail.read');
  const state = 'authenticated';
  const tenant = 'e31dd0f2-de23-4dd1-8dea-3fed57f15c2c';
  const authorizationURL = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&response_mode=query&scope=${scope}&state=${state}`;
  
  useEffect(()=>{
    setLocation(authorizationURL);
    window.location.href = authorizationURL;
  })
};

const page = () => {    
  Autorice(); 
  return <div>Redirecting to authorization page...</div>;
}

export default page
