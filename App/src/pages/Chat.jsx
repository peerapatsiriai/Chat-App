import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, []);

  return (
    <div>Chat</div>
  )
}

export default Chat