import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import './styles.scss';

const Message = ({ text, username }) => (
    <div className='message'>
        <div className='message-username'>{username}</div>
        <div className='message-text'>{text}</div>
    </div>
);

const MessageWindow = () => {
    const messages = useSelector((state) => state.messages.list);
    const messageWindowRef = useRef();

    useEffect(() => {
        const messageWindow = messageWindowRef.current;
        messageWindow.scrollTop = messageWindow.scrollHeight - messageWindow.clientHeight;
    }, [messages]);

    return (
        <div className='message-window' ref={messageWindowRef}>
            {messages.length
                ? messages.map((message, i) => (
                    <Message key={i} text={message.text} username={message.username} />
                ))
                : <div className='no-messages'>No messages</div>
            }
            <div>&nbsp;</div>
        </div>
    );
}

export default MessageWindow;
