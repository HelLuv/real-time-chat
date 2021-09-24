import React from "react";
import axios from "axios";


const EventSourcing: React.FC = () => {
  const [messages, setMessages] = React.useState([]);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    subscribe();
  }, [])

  const subscribe = async () => {
    const eventSource = new EventSource(`http://localhost:5000/connect`);
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      // @ts-ignore
      setMessages(prev => [message, ...prev]);
    }
  }

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/new-messages', {
      message: value,
      id: Date.now()
    })
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
          <div className={'message'} key={mess.id}>
            {mess.message}
          </div>)}
      </div>
    </div>
  );
};

export default EventSourcing;