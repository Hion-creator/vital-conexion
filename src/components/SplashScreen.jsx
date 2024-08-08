import React from 'react';
import { Link } from 'react-router-dom';

const SplashScreen = () => (
  <div className="h-screen flex flex-col justify-center items-center bg-gray-100 bg-cover bg-[url('/src/img/circulos.svg')]">    
    <img src="/vitalconexion.png" alt="logo" />
    <p className="text-center text-cyan-600">Transformando datos en acciones, y vidas en esperanza.</p>
    <Link to="/register">
      <button className="mt-6 w-80 px-4 py-2 bg-cyan-400 text-white rounded">Iniciemos</button>
    </Link>
  </div>
);

export default SplashScreen;