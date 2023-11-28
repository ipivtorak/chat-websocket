import { take, put, call, fork } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { createAction } from '@reduxjs/toolkit';
import { putMessage } from './reducers';


export function webSocketListener(serviceWebSocket) {
    return eventChannel((emitter) => {
        serviceWebSocket.onmessage = ({ data }) => emitter(data);
        serviceWebSocket.onclose = () => emitter(END);
        serviceWebSocket.onerror = () => emitter(END);
        return () => serviceWebSocket.close();
    });
}

export function* webSocketSaga() {
    try {
        const serviceWebSocket = new WebSocket('ws://localhost:8080/chat');
        const socket = yield call(webSocketListener, serviceWebSocket);

        yield put(putMessage({ status: 'connected' }));
        yield fork(sendMessageSaga, serviceWebSocket);

        while (true) {
            const payload = JSON.parse(yield take(socket));
            yield put(putMessage({ list: Array.isArray(payload) ? payload : [payload] }));
        }

    } finally {
        yield put(putMessage({
            list: [{ username: 'Client', text: 'Disconnected from server.' }],
            status: 'disconnected'
        }));
    }
}

export const sendMessage = createAction('chat/sendMessage');
export function* sendMessageSaga(serviceWebSocket) {
    while (true) {
        const { payload } = yield take(sendMessage.toString());
        try {
            yield call([serviceWebSocket, 'send'], JSON.stringify(payload));
        } catch (error) {
            yield put(putMessage({
                list: [{ username: 'Client', text: 'Error sending last message.' }]
            }));
        }
    }
}
