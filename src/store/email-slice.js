import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = {sentItems: [], receivedItems: []};

const emailSlice = createSlice({
    name: 'emailStore',
    initialState: initialEmailState,
    reducers: {
        sendEmail(state,action){
            state.sentItems.push({
                body: action.payload.body,
                toEmail: action.payload.toEmail,
                subject: action.payload.subject,
            })
        },
        replaceEmail(state,action){
            state.sentItems = action.payload.sentItems;
        },
        inboxEmails(state,action){
            state.receivedItems = action.payload.receivedItems
        }
    }
})

export const emailActions = emailSlice.actions;

export default emailSlice.reducer;