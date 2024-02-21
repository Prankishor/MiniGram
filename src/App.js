import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import MyFeed from './pages/MyFeed';
import AddPost from './pages/components/AddPost';
import ShowPost from './pages/components/ShowPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='feed' element={<Feed />} />
          <Route path='profile' element={<Profile />} />
          <Route path='myfeed' element={<MyFeed />} />
          <Route path='write' element={<AddPost />} />
          <Route path='showPost/:postId' element={<ShowPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
