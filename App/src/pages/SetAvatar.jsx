import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';
import Swal from 'sweetalert2';
import loader from '../assets/loader.gif';
import { Buffer } from 'buffer';
import avatar1 from '../assets/avatars/1.png';
import avatar2 from '../assets/avatars/2.png';
import avatar3 from '../assets/avatars/3.png';
import avatar4 from '../assets/avatars/4.png';
import avatar5 from '../assets/avatars/5.png';
import avatar6 from '../assets/avatars/6.png';
import avatar7 from '../assets/avatars/7.png';
import avatar8 from '../assets/avatars/8.png';

function SetAvatar() {
  // merge all avatars into one array
  const allAvatarImage = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,  
    avatar7,
    avatar8,
  ];

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const getAvatars = async () => {
    try {
      setTimeout(() => {
        let availableAvatars = [...allAvatarImage];
        const data = [];
        
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * availableAvatars.length);
          data.push(availableAvatars[randomIndex]);
          availableAvatars.splice(randomIndex, 1);
        }
        setAvatars(data);
        setIsloading(false);
      }, 1000);
    } catch (error) {
      console.error("Avatar fetch error:", error);
      Swal.fire({
        title: "Error fetching avatars",
        text: "Please try again later",
        icon: "error",
        showConfirmButton: true,
        iconColor: "#4287f5",
        background: "#131324",
        color: "#ffffff",  
      });
      setIsloading(false);
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
                    src={`${avatar}`}
                    alt='avatar'
                    key={index}
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
