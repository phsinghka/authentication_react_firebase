import {getUserDataWithAuth, logout} from '../utils/firebase.utils';
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../context/user.context';

const defaultProfilePage = {
  email: '',
  url: '',
};

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState(defaultProfilePage);
  const {currentUser} = useContext(UserContext);
  const {email, url} = profileInfo;
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate('/signin');
  };

  useEffect(() => {
    if (!currentUser) {
      goToSignIn();
    } else {
      const getDataFromUID = async () => {
        const {email, url} = await getUserDataWithAuth(currentUser);
        setProfileInfo({email, url});
      };
      getDataFromUID();
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Profile Page</h1>
      <img src={url} alt='Profile' />
      <h3>{email}</h3>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};

export default ProfilePage;
