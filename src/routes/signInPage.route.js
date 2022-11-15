import { useState } from 'react';
import FormField from '../components/formField.component';
import { logInWithEmailAndPass } from '../utils/firebase.utils';

const defaultFormCase = {
  email: '',
  password: '',
};

const SignInPage = () => {
  const [formFields, setFormFields] = useState(defaultFormCase);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await logInWithEmailAndPass(email, password);
      console.log(user);
      setFormFields(defaultFormCase);
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect Password');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };
  return (
    <div>
      <h1>Sign In Page</h1>
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

        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
