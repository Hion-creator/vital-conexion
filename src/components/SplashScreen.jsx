import React from 'react';
import { Link } from 'react-router-dom';

const SplashScreen = () => (
  <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
    <h1 className="text-4xl font-bold">Vital Conexión</h1>
    <p className="mt-4 text-xl">Soluciones para enfermedades huérfanas!</p>
    <Link to="/register">
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">Iniciemos</button>
    </Link>
  </div>
);

export default SplashScreen;