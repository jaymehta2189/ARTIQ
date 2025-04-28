
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Auth from './pages/Auth';
// import About from './pages/About';
// import Explore from './pages/Explore';
// import Profile from './pages/Profile';
// import ShowcaseArtwork from './pages/ShowcaseArtwork';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const ProtectedRoute = ({ children }) => {
//     if (!user) {
//       return <Navigate to="/auth" />;
//     }
//     return children;
//   };

//   const ArtistRoute = ({ children }) => {
//     if (!user || user.role !== 'artist') {
//       return <Navigate to="/" />;
//     }
//     return children;
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar user={user} setUser={setUser} />
//         <Routes>
//           <Route path="/" element={<Home user={user} />} />
//           <Route path="/auth" element={<Auth setUser={setUser} />} />
//           <Route path="/about" element={<About />} />
//           <Route 
//             path="/explore" 
//             element={
//               <ProtectedRoute>
//                 <Explore />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/profile" 
//             element={
//               <ProtectedRoute>
//                 <Profile user={user} setUser={setUser} />
//               </ProtectedRoute>
//             } 
//           />
//           <Route
//             path="/showcase-artwork"
//             element={
//               <ArtistRoute>
//                 <ShowcaseArtwork />
//               </ArtistRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import About from './pages/About';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import ShowcaseArtwork from './pages/ShowcaseArtwork';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  const ArtistRoute = ({ children }) => {
    if (!user || user.role !== 'artist') {
      return <Navigate to="/" />;
    }
    return children;
  };

  const AuthRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route 
            path="/auth" 
            element={
              <AuthRoute>
                <Auth setUser={setUser} />
              </AuthRoute>
            } 
          />
          <Route path="/about" element={<About />} />
          <Route 
            path="/explore" 
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile user={user} setUser={setUser} />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/showcase-artwork"
            element={
              <ArtistRoute>
                <ShowcaseArtwork />
              </ArtistRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;