import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "registro", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRole(docSnap.data().role);
      } else {
        console.log("No such document!");
      }
      
      navigate('/'); // Redirige a la raíz, que manejará la redirección basada en el rol
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    }
  };

  return (
    <div className="static h-screen flex flex-col justify-center items-center bg-cover bg-[url('/src/img/circulos.svg')]">
      <h2 className="text-2xl">Bienvenido!</h2>
      <img src="/logo1.png" className="md:absolute bottom-0 left-0" alt="logo" />
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4 w-80">
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
          className="block w-full mt-4 pl-4 py-2 border rounded-full"
        />
        <button type="submit" className="mt-12 px-4 py-2 w-full bg-cyan-400 hover:bg-cyan-500 text-white rounded">Iniciar</button>
      </form>
      <p>no tienes una cuenta
      <button onClick={() => navigate('/register')} className="mt-4 pl-2 text-cyan-500">Crear cuenta</button></p>
    </div>
  );
};

export default Login;