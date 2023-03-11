import { emailActions } from "./email-slice";
import { uiActions } from "./ui-slice";

export const storeEmail = (emailData,emailId) => {
    let email;
    if(emailId){
        email = emailId.replace(/[|&;$%@"<>.()+,]/g, "");
    }
    
    return async (dispatch) => {
        const storeData = async() => {
            const response = await fetch(`https://mailboxclient-c9aed-default-rtdb.firebaseio.com/${email}/emails.json`,{
                method: 'PUT',
                body: JSON.stringify(emailData)
            });
    
            if(!response.ok){
                return dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'Something went wrong!!!'
                  }));
            }

            dispatch(uiActions.showNotification({
                status: 'ok',
                message: 'Email Sent Successfully!!!'
              }));
        }

        try{
            await storeData();
        }
        catch(error){
    
        }
    }
}


export const getSentEmails = (emailId) => {
    let email;
    if(emailId){
        email = emailId.replace(/[|&;$%@"<>.()+,]/g, "");
    }
    return async (dispatch) => {
        const getEmails = async () => {
            const response = await fetch(`https://mailboxclient-c9aed-default-rtdb.firebaseio.com/${email}/emails.json`);
    
            if(!response.ok){
                return dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'Something went wrong!!!'
                  }));
            }

            const data = await response.json();

            return data;
        }

        try{
            const emailData = await getEmails();

            dispatch(emailActions.replaceEmail({
                sentItems: emailData.sentItems || []
            }))

        }
        catch(error){

        }
    }
}
