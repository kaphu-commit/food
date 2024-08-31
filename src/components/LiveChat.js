import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    // Simulate response from support
    setTimeout(() => {
      setMessages([...messages, { text: input, sender: 'user' }, { text: 'Support response', sender: 'support' }]);
    }, 1000);
  };

  return (
    <Container>
      <h2>Live Chat</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
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
