import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { allUserRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import Chatcontainer from '../components/Chatcontainer';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2';

function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  const getAllUser = async () => {
    try {
      const user_id = JSON.parse(localStorage.getItem('chat-app-user'))._id;
      const data = await axios.get(`${allUserRoute}/${user_id}`);
      setContacts(data.data);
      setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
    } catch (error) {
      
      Swal.fire({
        title: "Error while fetching contacts.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#4287f5",
        background: "#131324",
        color: "#ffffff",  
      });
      
    }
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    } else if (
      !JSON.parse(localStorage.getItem('chat-app-user')).isAvatarImageSet
    ) {
      navigate('/setavatar');
    } else if (
      JSON.parse(localStorage.getItem('chat-app-user')).isAvatarImageSet
    ) {
      getAllUser();
    }
  }, []);

  return (
    <>
      <Container>
        <div className='container'>
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {currentChat === undefined
            ? currentUser && <Welcome currentUser={currentUser} />
            : currentChat && (
                <Chatcontainer
                  currentChat={currentChat}
                  currentUser={currentUser}
                  socket={socket}
                />
              )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  //background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
