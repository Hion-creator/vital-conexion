import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Asistencia from './components/Asistencia';
import Usuario from './components/Usuario';
import PrivateRoute from './components/PrivateRoute';
import { auth, db } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';

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
        <Route path="/register" element={<Register setRole={setRole} />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/asistencia" element={<PrivateRoute><Asistencia handleLogout={handleLogout} /></PrivateRoute>} />
        <Route path="/usuario" element={<PrivateRoute><Usuario handleLogout={handleLogout} /></PrivateRoute>} />
        <Route path="/" element={
          user ? (
            role === 'asistencia' ? <Navigate to="/asistencia" /> : <Navigate to="/usuario" />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;
