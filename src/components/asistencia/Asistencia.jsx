import React from 'react';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Asistencia = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await signOut(auth);
    handleLogout();
    navigate('/login');
  };

  console.log('Usuario logueado:', auth.currentUser);
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-2xl font-bold">Men asistencia</h2>
      <ul>
        <li><Link to="/asistencia/calidad">Calidad</Link>
        </li>
        <li><Link to="/asistencia/historia-clinica">Historia clínica</Link>
        </li>
        <li><Link to="/asistencia/actividades">Actividades</Link>
        </li>
      </ul>
      <button onClick={handleLogoutClick} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  );
};

export default Asistencia;