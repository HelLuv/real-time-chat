import React from "react";
import axios from "axios";


const WebSock: React.FC = () => {
  const [messages, setMessages] = React.useState([]);
  const [value, setValue] = React.useState('');
  const socket = React.useRef();
  const [connected, setConnected] = React.useState(false);
  const [username, setUsername] = React.useState('');


  const connect = () => {
    // @ts-ignore
    socket.current = new WebSocket('ws://localhost:5000');

    if (socket.current) {
      // @ts-ignore
      socket.current.onopen = () => {
        setConnected(true);
        const message = {
          event: 'connection',
          username,
          id: Date.now(),
        }
        // @ts-ignore
        socket.current.send(JSON.stringify(message));
      }
      // @ts-ignore
      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        // @ts-ignore
        setMessages((prev) => [message, ...prev]);
      }
      // @ts-ignore
      socket.current.onclose = () => {
        console.log('Socket was closed')
      }
      // @ts-ignore
      socket.current.onerror = () => {
        console.log('A Socket error has occurred')
      }
    }


  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message'
    }
    // @ts-ignore
    socket.current.send(JSON.stringify(message));
    setValue('');
  }

  if (!connected) {
    return (
      <div className={'center'}>
        <div className="form">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder={'Enter your name'}/>
          <button onClick={connect}>Connect</button>
        </div>
      </div>
    )
  }

  return (
    <div className={'center'}>
      <div className={'form'}>
        <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="messages">
        {messages.map((mess: any) =>
          // @ts-ignore
          <div key={mess.id}>
            {mess.event === 'connection'
              ? <div className={'connection_message'}>User {mess.username} connected</div>
              : <div className={"message"}>{mess.username}: {mess.message}</div>}
          </div>)}
      </div>
    </div>
  );
};

export default WebSock;