import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Asistencia from './components/asistencia/Asistencia';
import Usuario from './components/user/Usuario';
import Calidad from './components/asistencia/Calidad';
import HistoriaClinica from './components/asistencia/HistoriaClinica';
import ActividadesAsistencia from './components/asistencia/Actividades';
import DatosInteres from './components/user/DatosInteres';
import Contactanos from './components/user/Contactos';
import ActividadesUsuario from './components/user/Actividades';
import PrivateRoute from './components/PrivateRoute';
import { auth, db } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import SplashScreen from './components/SplashScreen';

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const docRef = doc(db, "registro", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        } else {
          console.log("No such document!");
        }
      }
      setRoleLoading(false);
    };

    fetchUserRole();
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
    setRole(null); // Limpiar el estado de role
  };

  if (loading || roleLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/inicio" element={<SplashScreen />} />
        <Route path="/register" element={<Register setRole={setRole} />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/asistencia" element={<PrivateRoute><Asistencia handleLogout={handleLogout} /></PrivateRoute>} />
        <Route path="/asistencia/calidad" element={<PrivateRoute><Calidad /></PrivateRoute>} />
        <Route path="/asistencia/historia-clinica" element={<PrivateRoute><HistoriaClinica /></PrivateRoute>} />
        <Route path="/asistencia/actividades" element={<PrivateRoute><ActividadesAsistencia /></PrivateRoute>} />
        <Route path="/usuario" element={<PrivateRoute><Usuario handleLogout={handleLogout} /></PrivateRoute>} />
        <Route path="/usuario/datos-interes" element={<PrivateRoute><DatosInteres /></PrivateRoute>} />
        <Route path="/usuario/contactanos" element={<PrivateRoute><Contactanos /></PrivateRoute>} />
        <Route path="/usuario/actividades" element={<PrivateRoute><ActividadesUsuario /></PrivateRoute>} />
        <Route path="/" element={
          user ? (
            role === 'asistencia' ? <Navigate to="/asistencia" /> : <Navigate to="/usuario" />
          ) : (
            <Navigate to="/inicio" />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;
