import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import Swal from 'sweetalert2';
// Register page component
function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleVerify = () => {
    const { username, email, password, confirmPassword } = userData;

    // Check if any field is empty
    if (!username || !email || !password || !confirmPassword) {
      Swal.fire({
        title: "Please Fill In All Fields",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#4287f5",
        background: "#131324",
        color: "#ffffff",  
      });
     
      return false;
    }

    // Check username length
    if (username.length <= 7) {
      
      Swal.fire({
        title: "Username must be at least 8 characters",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#4287f5",
        background: "#131324",
        color: "#ffffff",  
      });
      return false;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Invalid email address",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#4287f5",
        background: "#131324",
        color: "#ffffff",  
      });
      return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Passwords do not match",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#4287f5",
        background: "#131324",
        color: "#ffffff",  
      });
      return false;
    }

    // If all validations pass
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isVerified = handleVerify();
    if (isVerified) {
      try {
        await Axios.post(registerRoute, userData);
        Swal.fire({
          title: "Registration successful. Please login.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#4287f5",
          background: "#131324",
          color: "#ffffff",  
        });

        navigate('/login');
      } catch (error) {
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
          iconColor: "#4287f5",
          background: "#131324",
          color: "#ffffff",  
        });
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className='brand'>
          <h1>Register Page</h1>
        </div>
        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={(event) => handleChange(event)}
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={(event) => handleChange(event)}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={(event) => handleChange(event)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          onChange={(event) => handleChange(event)}
        />
        <button type='submit'>Create User</button>
        <span>
          Already have an account ? <Link to='/login'>Login</Link>
        </span>
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  // background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
    img {
      height: 10rem;
    }

    h1 {
      text-transform: uppercase;
      color: white;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #00FEFB;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        outline: none;
        border: 0.1rem solid #1786F9;
      }
    }
    button {
      background-color: #00FEFB;
      color: #131324;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #1786F9;
        color: #ffffff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #1786F9;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
