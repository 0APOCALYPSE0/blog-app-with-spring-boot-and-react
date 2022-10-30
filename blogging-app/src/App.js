import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './Pages/About';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Dashboard from './Pages/user-routes/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Profile from './Pages/user-routes/Profile';
import Post from './Pages/Post';
import UserProvider from './context/UserProvider';
import Categories from './Pages/Categories';
import UpdatePost from './Pages/UpdatePost';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position='bottom-center' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/categories/:categoryId" element={<Categories />} />
          <Route path="/user" element={<PrivateRoute />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="update/:postId" element={<UpdatePost />} />
            <Route path="profile/:userId" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
