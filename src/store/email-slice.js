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
                fromEmail: action.payload.fromEmail
            })
        },
        replaceEmail(state,action){
            state.sentItems = action.payload.sentItems;
        },
        inboxEmails(state,action){
            state.receivedItems = action.payload.receivedItems
        },
        sendInboxEmail(state,action){
            state.receivedItems.push({
                body: action.payload.body,
                fromEmail: action.payload.fromEmail,
                subject: action.payload.subject,
                toEmail: action.payload.toEmail
            })
        },
        removeSentEmail(state,action){
            console.log(action.payload)
            state.sentItems = state.sentItems.filter(mail => mail.subject !==action.payload)
        }
    }
})

export const emailActions = emailSlice.actions;

export default emailSlice.reducer;