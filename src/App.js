import SignUpPage from './routes/signUpPage.route';
import SignInPage from './routes/signInPage.route';
import ProfilePage from './routes/profilePage.route';
import {Route, Routes} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
