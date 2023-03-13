import { createSlice } from "@reduxjs/toolkit";

const initialEmailState = {sentItems: [], receivedItems: [], unReadCount: 0, allMails: []};

const emailSlice = createSlice({
    name: 'emailStore',
    initialState: initialEmailState,
    reducers: {
        sendEmail(state,action){
            state.sentItems.push({
                body: action.payload.body,
                toEmail: action.payload.toEmail,
                subject: action.payload.subject,
                fromEmail: action.payload.fromEmail,
                isRead: action.payload.isRead
            })
            state.allMails.push({
                body: action.payload.body,
                fromEmail: action.payload.fromEmail,
                subject: action.payload.subject,
                toEmail: action.payload.toEmail,
                isRead: action.payload.isRead
            })
            state.unReadCount++;
        },
        replaceEmail(state,action){
            state.sentItems = action.payload.sentItems;
            state.unReadCount = action.payload.unReadCount;
        },
        inboxEmails(state,action){
            console.log(action.payload.receivedItems)
            state.receivedItems = action.payload.receivedItems;
            // state.unReadCount = action.payload.unReadCount;
            console.log(state.receivedItems)
        },
        removeSentEmail(state,action){
            state.sentItems = state.sentItems.filter(mail => mail.subject !==action.payload)
        },
        removeInboxItem(state,action){
            state.receivedItems = state.receivedItems.filter(mail => mail.subject !==action.payload)
            state.allMails = state.allMails.filter(mail => mail.subject !==action.payload)
        },
        updateIsRead(state,action){
            const item = state.receivedItems.find(t => t.subject === action.payload.subject).isRead

            if(item === true){
                return
            }
            else{
                state.receivedItems.find(t => t.subject === action.payload.subject).isRead = action.payload.h;
                state.allMails.find(t => t.subject === action.payload.subject).isRead = action.payload.h;
                state.unReadCount--
            }
        },
       
        replaceAllEmail(state,action){
            state.allMails = action.payload.allMails;
            state.unReadCount = action.payload.unReadCount;
        },
    }
})

export const emailActions = emailSlice.actions;

export default emailSlice.reducer;