import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "registro", user.uid), {
        name,
        email,
        role
      });

      navigate('/');
    } catch (error) {
      console.error("Error registering:", error);
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-2xl font-bold">Bienvenido a bordo!</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Ingresa tu nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mt-2 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mt-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mt-2 p-2 border rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full mt-2 p-2 border rounded"
        >
          <option value="usuario">Usuario</option>
          <option value="asistencia">Asistencia</option>
        </select>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Registrarse</button>
      </form>
      <button onClick={() => navigate('/login')} className="mt-4 text-blue-500">Ya tienes una cuenta? Ingresar</button>
    </div>
  );
};

export default Register;