import React from 'react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Usuario = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await signOut(auth);
    handleLogout(); // Llamar a handleLogout para limpiar el estado de role
    navigate('/login');
  };

  // Verificar usuario en consola
  console.log('Usuario logueado:', auth.currentUser);
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-2xl font-bold">MEN usuario</h2>
      <ul>
        <li>Datos de interés
          <ul>
            <li>Información general</li>
            <li>Recomendaciones usuarios PQR</li>
          </ul>
        </li>
        <li>Contáctanos
          <ul>
            <li>WhatsApp</li>
          </ul>
        </li>
        <li>Actividades
          <ul>
            <li>Actividades que pueda hacer con patología (por usuario es diferente)</li>
          </ul>
        </li>
      </ul>
      <button onClick={handleLogoutClick} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  );
};

export default Usuario;