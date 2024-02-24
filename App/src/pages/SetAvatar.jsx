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

  const resetAvatars = async() => {
    setAvatars([]);
    setIsloading(true);
    getAvatars();
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      Swal.fire({
        title: "Please select an avatar",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#4287f5",
        background: "#131324",
        color: "#ffffff",  
      });
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
          Swal.fire({
            title: "Can't No Fetch",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            iconColor: "#4287f5",
            background: "#131324",
            color: "#ffffff",  
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Can't No Fetch",
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

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    } else if (
      JSON.parse(localStorage.getItem('chat-app-user')).isAvatarImageSet
    ) {
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
            <button className='reset-btn' onClick={resetAvatars}> Reset</button>
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
  //background-color: #131324;
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
      border: 0.4rem solid #00fefb;
    }
  }
  .submit-btn {
    background-color: #00fefb;
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
      background-color: #1786f9;
      color: #ffffff;
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
    background-color: #00fefb;
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
      background-color: #1786f9;
      color: #ffffff;   
    }
  }
`;

export default SetAvatar;
