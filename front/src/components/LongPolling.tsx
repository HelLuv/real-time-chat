import React from "react";
import axios from "axios";


const LongPulling: React.FC = () => {
  const [messages, setMessages] = React.useState([]);
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    subscribe();
  }, [])

  const subscribe = async () => {
    try {
      const {data} = await axios.get('http://localhost:5000/get-messages');
      // @ts-ignore
      setMessages(prev => [data, ...prev]);
      await subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500)
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

export default LongPulling;