import React from 'react';
import MessageWindow from './components/MessageWindow';
import TextBar from './components/TextBar';
import './App.scss';

const App = () => (
    <div className='container'>
        <div className='container-title'>Simple Chat</div>
        <MessageWindow />
        <TextBar />
    </div>
);

export default App;
