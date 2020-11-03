import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // useState = variable in react
  // useEffect = run code on a condition in react

  useEffect(() => {
    // run once when the app component loads
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
      });
  }, [])

  useEffect(() => {
    // run code here
    // it its blank inside [], this code runs ONCE when the app component loads
    // const username = prompt('Please enter your name');
    // setUsername(prompt('Please enter your name'));
    const username = prompt('This info will not be shared with anyone! \nPlease enter an anonymous name with which you want to register the complaint');
    setUsername(username);
    window.confirm(`Remember this name - "${username}" \nThis id/name will be asked later!`)
  }, []) // condition 

  // console.log(input);
  // console.log(messages);
  
  const sendMessage = (event) => {
    // all the logic to send message goes here
    event.preventDefault();
    
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    // setMessages([...messages, { username: username, text: input }]);
    setInput('');
  }
  
  return (
    <div className="App">
      <img src="https://www.flaticon.com/svg/static/icons/svg/33/33308.svg" />
      <h1>Admin Desk</h1>
      <h2>{username} tell us about your concern.</h2>
      <h4>Don't use it as a spam as we can trace you back with your IP and MAC address!<br></br>Thank You!</h4>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter the complaint description..."value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
              <SendIcon  />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;