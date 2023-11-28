import { createSlice } from '@reduxjs/toolkit';

const message = createSlice({
    name: 'message',
    initialState: {
        list: [],
        status: 'disconnected',
    },
    reducers: {
        putMessage: (state , { payload }) => {
            return {
                list: [...state.list, ...payload.list || []],
                status: payload.status || state.status,
            }
        }
    }
});

export const { putMessage } = message.actions;
export const messageReducer = message.reducer;
