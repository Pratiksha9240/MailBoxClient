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
                return () => {dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'Something went wrong!!!'
                  }));

                  setTimeout(() => {
                    dispatch(uiActions.setIsLoading());
                  },2000)}
            }
        }

        try{
            await storeData();
        }
        catch(error){
    
        }
    }
}


export const storeInboxEmail = (emailData,emailId) => {

    let email1 = [];
    let emailData1 = [];


    if(emailData){
        emailData.sentItems.map(e => (
            email1.push(e.toEmail)
        ))


        return async (dispatch) => {
            const storeData = async(e2,emailData1) => {
                const response = await fetch(`https://mailboxclient-c9aed-default-rtdb.firebaseio.com/${e2}/emails/receivedItems.json`,{
                    method: 'PUT',
                    body: JSON.stringify(emailData1)
                });
        
                if(!response.ok){
                    return () => {dispatch(uiActions.showNotification({
                        status: 'error',
                        message: 'Something went wrong!!!'
                      }));
    
                      setTimeout(() => {
                        dispatch(uiActions.setIsLoading());
                      },2000)}
                }
            }
    
            try{
                for(const e1 in email1){
                    const e2 = email1[e1].replace(/[|&;$%@"<>.()+,]/g, "")
                    emailData1 = emailData.receivedItems.filter(t => t.toEmail === email1[e1])
                    // emailData1 = [emailData1,emailData.sentItems.filter(t => t.toEmail === email1[e1])]
                    dispatch(emailActions.inboxEmails({
                        receivedItems: emailData.receivedItems || []
                    }))
                    console.log(emailData1)
                    await storeData(e2,emailData1);
                }
            }
            catch(error){
        
            }
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
                return () => {dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'Something went wrong!!!'
                  }));

                  setTimeout(() => {
                    dispatch(uiActions.setIsLoading());
                  },2000)}
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

export const getInboxEmails = (emailId) => {
    let email;
    if(emailId){
        email = emailId.replace(/[|&;$%@"<>.()+,]/g, "");
    }
    return async (dispatch) => {
        const getEmails = async () => {
            const response = await fetch(`https://mailboxclient-c9aed-default-rtdb.firebaseio.com/${email}/emails.json`);
    
            if(!response.ok){
                return () => {dispatch(uiActions.showNotification({
                    status: 'error',
                    message: 'Something went wrong!!!'
                  }));

                  setTimeout(() => {
                    dispatch(uiActions.setIsLoading());
                  },2000)}
            }

            const data = await response.json();

            return data;
        }

        try{
            const emailData = await getEmails();

            dispatch(emailActions.inboxEmails({
                receivedItems: emailData.receivedItems || []
            }))

        }
        catch(error){

        }
    }
}
