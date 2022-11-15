import { useState } from 'react';
import FormField from '../components/formField.component';
import {
  signUpWithEmailAndPass,
  storage,
  createUserDocumentwithAuth,
} from '../utils/firebase.utils';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const defaultFormCase = {
  email: '',
  password: '',
  cnfPassword: '',
  imgUrl: '',
  imgFile: '',
};

const SignUpPage = () => {
  const [formFields, setFormFields] = useState(defaultFormCase);

  const { email, password, cnfPassword, imgFile } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    if (event.target.files !== null) {
      setFormFields({ ...formFields, imgFile: event.target.files[0] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== cnfPassword) {
      return alert(`Passwords Don't Match`);
    }

    try {
      const { user } = await signUpWithEmailAndPass(email, password);
      const storageRef = ref(storage, `/images/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => console.error(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            await createUserDocumentwithAuth(user, { url });
          });
        }
      );

      setFormFields(defaultFormCase);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          label='Email'
          type='email'
          required
          onChange={handleChange}
          value={email}
          name='email'
        />
        <FormField
          label='Password'
          type='password'
          required
          onChange={handleChange}
          value={password}
          name='password'
        />
        <FormField
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          value={cnfPassword}
          name='cnfPassword'
        />
        <FormField
          label='Profile Picture'
          type='file'
          accept='image/*'
          required
          onChange={handleChange}
          name='imgUrl'
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
