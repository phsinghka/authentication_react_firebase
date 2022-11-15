import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FormField from '../components/formField.component';
import {logInWithEmailAndPass} from '../utils/firebase.utils';

const defaultFormCase = {
  email: '',
  password: '',
};

const SignInPage = () => {
  const [formFields, setFormFields] = useState(defaultFormCase);
  const {email, password} = formFields;
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToProfile = () => {
    navigate('/profile');
  };


  /**
  * Handle change in input value
  * @param {Object} event - Event generated by input
  * Take the {name, value} and assigns it to setFormFields
  */

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormFields({...formFields, [name]: value});
  };

  /**
  * Handle submit from sign up button
  * @param {Object} event - Event generated by form
  * Log in user with passing email and password to firebase
  */

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {user} = await logInWithEmailAndPass(email, password);
      goToProfile();
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
          console.error(error);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <h1>Sign In Page</h1>
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
          <button type='button' onClick={goToSignUp}>
            Go To Sign Up Instead ?
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
