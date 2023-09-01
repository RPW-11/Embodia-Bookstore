import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Main from './pages/main/Main';
import Bookmark from './pages/bookmark/Bookmark';
import Cart from './pages/cart/Cart';
import Profile from './pages/profile/Profile';
import Auth from './pages/auth/Auth';

function App() {
  const loc = useLocation();
  return (
    <div className="App font-main bg-main max-w-screen h-screen py-5 flex">
      { loc.pathname !== "/auth" && <Navbar/> }
      <Routes>
        <Route path="/auth" element={ <Auth /> } />
        <Route path="/" element={ <Main /> } />
        <Route path="/bookmark" element={ <Bookmark /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
