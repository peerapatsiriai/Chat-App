import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import Swal from 'sweetalert2';
import loader from '../assets/loader.gif';
import { Buffer } from 'buffer';

function SetAvatar() {
  const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const getAvatars = async () => {
    try {
      const data = [];
      for (let i = 0; i < 5; i++) {
        const image = await Axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsloading(false);
    } catch (error) {
      getAvatars();
    }
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      alert('Please select an avatar');
    } else {
      try {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        const { data } = await Axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem('chat-app-user', JSON.stringify(user));
          navigate('/');
        } else {
            alert('Something went wrong');
        }
      } catch (error) {
        console.log(error);
        alert('Something went wrong2');
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
    } else if (JSON.parse(localStorage.getItem('chat-app-user')).isAvatarImageSet) {
        navigate('/');
    }
    getAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img
            src={loader}
            alt='loading'
            className='loader'
          />
        </Container>
      ) : (
        <Container>
          <div className='title-container'>
            <h1>Pick An Avatar As Your Profile Picture</h1>
          </div>
          <div className='avatars'>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt='avatar'
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <div className='btn'>
            <button
              className='submit-btn'
              onClick={setProfilePicture}>
              {' '}
              Set as Profile Picture
            </button>
            <button className='reset-btn'> Reset</button>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: red;
      transition: 0.5s ease-in-out;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
  }
  .reset-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: red;
      transition: 0.5s ease-in-out;
    }
  }
`;

export default SetAvatar;
