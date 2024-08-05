import React from 'react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Asistencia = ({ handleLogout }) => {
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
      <h2 className="text-2xl font-bold">Men asistencia</h2>
      <ul>
        <li>Calidad
          <ul>
            <li>Información general sobre calidad</li>
            <li>Recomendaciones usuarios PQR</li>
          </ul>
        </li>
        <li>Historia clínica
          <ul>
            <li>Formato (MVP)</li>
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

export default Asistencia;