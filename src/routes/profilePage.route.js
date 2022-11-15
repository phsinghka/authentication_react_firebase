import { getUserDataWithAuth } from '../utils/firebase.utils';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user.context';

const defaultProfilePage = {
  name: '',
  imgUrl: '',
};

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState(defaultProfilePage);
  const { currentUser } = useContext(UserContext);
  const { email, url } = profileInfo;

  useEffect(() => {
    const getDataFromUID = async () => {
      const { email, url } = await getUserDataWithAuth(currentUser);
      setProfileInfo({ email, url });
    };
    getDataFromUID();
  }, []);

  return (
    <div>
      <h1>{email}</h1>
      <img src={url} alt='profile' />
    </div>
  );
};

export default ProfilePage;
