import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import uibuilder from 'node-red-contrib-uibuilder/front-end/src/uibuilderfe.js'

function App() {
  const [count, setCount] = useState(0)
  const [receivedTopic, setReceivedTopic] = useState('');
  const [receivedPayload, setReceivedPayload] = useState('');

  useEffect(()=>{
    uibuilder.start();

    uibuilder.onChange('msg', (message)=>{
      if(message !== null) {
        setReceivedTopic(message.topic);
        setReceivedPayload(message.payload);
      }
    });

  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React + Node-Red + UiBuilder!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <div className="App-message">
          <p className="App-message">{`Received Topic: ${receivedTopic}`}
          </p>
          <p className="App-message">Received Payload: {receivedPayload}
          </p>
        </div>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
