import SignUpPage from './routes/signUpPage.route';
import SignInPage from './routes/signInPage.route';
import ProfilePage from './routes/profilePage.route';
import { Route, Routes } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContext } from './context/user.context';
import './App.css';

function App() {
  // const navigate = useNavigate();
  // const { currentUser } = useContext(UserContext);
  // const goToSignIn = () => {
  //   navigate('/signin');
  // };
  // const goToSignUp = () => {
  //   navigate('/signup');
  // };
  return (
    <div className='App'>
      <Routes>
        <Route index element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      {/* {currentUser ? goToSignIn() : goToSignUp()} */}
    </div>
  );
}

export default App;
