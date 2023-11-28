import React, { useState } from 'react';
import TextBarInput from "../TextBarInput";
import { useDispatch } from "react-redux";
import { sendMessage } from '../../store/chat/sagas';
import './styles.scss';

const TextBar = () => {
    const dispatch = useDispatch();

    const [text, setText] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({ username: false, text: false });

    const onChangeUsername = (e) => {
        setErrors({ ...errors, username: false });
        const { value } = e.target;
        setUsername(value);
    };

    const onChangeText = (e) => {
        setErrors({ ...errors, text: false });
        const { value } = e.target;
        setText(value);
    };

    const onSend = () => {
        if (!text || !username) {
            setErrors({ username: !username, text: !text });
        } else {
            dispatch(sendMessage({ username, text }));
            setText('');
        }
    };

    const sendMessageOnEnter = (e) => {
        if (e.keyCode === 13) {
            onSend();
        }
    };

    return (
        <div className='textbar'>
            <TextBarInput
                value={username}
                onChange={onChangeUsername}
                onKeyDown={sendMessageOnEnter}
                isError={errors.username}
                placeholder='Nickname'
            />
            <TextBarInput
                value={text}
                isError={errors.text}
                onChange={onChangeText}
                onKeyDown={sendMessageOnEnter}
                placeholder='text'
            />
            <button className='textbar-send' onClick={onSend}>
                Send
            </button>
        </div>
    )
};

export default TextBar;
