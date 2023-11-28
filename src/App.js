import React from 'react'
import './App.scss'

import MessageWindow from './components/MessageWindow'
import TextBar from './components/TextBar'

const App = () => (
    <div className='container'>
        <div className='container-title'>Simple Chat</div>
        <MessageWindow />
        <TextBar />
    </div>
);

export default App;
