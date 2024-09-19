import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { auth } from '../firebase'; 

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return; 

    const newMessages = [...messages, { text: input, sender: user ? user.email : 'Anonymous' }];
    setMessages(newMessages);
    setInput('');

   
    setTimeout(() => {
      setMessages([...newMessages, { text: 'Support response', sender: 'support' }]);
    }, 1000);
  };

  return (
    <Container>
      <h2>Live Chat</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === (user ? user.email : 'Anonymous') ? 'right' : 'left' }}>
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <Form.Group>
        <Form.Control
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
      </Form.Group>
      <Button onClick={handleSend}>Send</Button>
    </Container>
  );
};

export default LiveChat;
