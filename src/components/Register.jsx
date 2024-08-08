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

      // Redirigir a la vista de login después de un registro exitoso
      navigate('/login');
    } catch (error) {
      console.error("Error registering:", error);
      setError(error.message);
    }
  };

  return (
    <div className="relative h-screen flex flex-col justify-center items-center bg-gray-100 bg-cover bg-[url('/src/img/circulos.svg')]">
      <h2 className="text-2xl font-bold">Bienvenido a bordo!</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4 w-80">
        <input
          type="text"
          placeholder="Ingresa tu nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mt-2 pl-4 py-2 border rounded-full"
        />
        <input
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mt-2 pl-4 py-2 border rounded-full"
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mt-2 pl-4 py-2 border rounded-full"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full mt-2 pl-4 py-2 border rounded-full"
        >
          <option value="usuario">Usuario</option>
          <option value="asistencia">Asistencia</option>
        </select>
        <button type="submit" className="mt-12 px-4 py-2 w-full bg-cyan-400 hover:bg-cyan-500 text-white rounded">Registrarse</button>
      </form>
      <p>Ya tienes una cuenta?
        <button onClick={() => navigate('/login')} className="mt-4 pl-4 text-blue-500"> Ingresar</button>
      </p>
      <img src="/mano.png" className="absolute h-34 w-44 bottom-0 sm:left-40" alt="logo" />
    </div>
  );
};

export default Register;