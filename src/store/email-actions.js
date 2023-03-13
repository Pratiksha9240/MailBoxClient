import { emailActions } from "./email-slice";
import { uiActions } from "./ui-slice";

export const storeEmail = (emailData, emailId) => {
  let email;
  if (emailId) {
    email = emailId.replace(/[|&;$%@"<>.()+,]/g, "");
  }
  return async (dispatch) => {
    const storeData = async () => {
      const response = await fetch(
        `https://mailboxclient-c9aed-default-rtdb.firebaseio.com/${email}/emails.json`,
        {
          method: "PUT",
          body: JSON.stringify(emailData),
        }
      );

      if (!response.ok) {
        return () => {
          dispatch(
            uiActions.showNotification({
              status: "error",
              message: "Something went wrong!!!",
            })
          );

          setTimeout(() => {
            dispatch(uiActions.setIsLoading());
          }, 2000);
        };
      }
    };

    try {
      await storeData();
    } catch (error) {}
  };
};

export const storeInboxEmail = (emailData) => {
  if (emailData) {
    // emailData.allMails.map((e) => email1.push(e.toEmail));

    return async (dispatch) => {
      const storeData = async () => {
        const response = await fetch(
          `https://mailboxclient-c9aed-default-rtdb.firebaseio.com/emails.json`,
          {
            method: "PUT",
            body: JSON.stringify(emailData),
          }
        );
        if (!response.ok) {
          return () => {
            dispatch(
              uiActions.showNotification({
                status: "error",
                message: "Something went wrong!!!",
              })
            );

            setTimeout(() => {
              dispatch(uiActions.setIsLoading());
            }, 2000);
          };
        }
      };

      try {
        await storeData();
      } catch (error) {}
    };
  }
};

export const getSentEmails = (emailId) => {
  let email;
  if (emailId) {
    email = emailId.replace(/[|&;$%@"<>.()+,]/g, "");
  }
  return async (dispatch) => {
    const getEmails = async () => {
      const response = await fetch(
        `https://mailboxclient-c9aed-default-rtdb.firebaseio.com/${email}/emails.json`
      );

      if (!response.ok) {
        return () => {
          dispatch(
            uiActions.showNotification({
              status: "error",
              message: "Something went wrong!!!",
            })
          );

          setTimeout(() => {
            dispatch(uiActions.setIsLoading());
          }, 2000);
        };
      }

      const data = await response.json();

      return data;
    };

    try {
      const emailData = await getEmails();
      console.log('SentItems',emailData)

      dispatch(
        emailActions.replaceEmail({
          sentItems: emailData.sentItems || [],
          unReadCount: emailData.unReadCount,
        })
      );
    } catch (error) {}
  };
};

export const getInboxEmails = (emailId) => {

  let email;
  if (emailId) {
    email = emailId.replace(/[|&;$%@"<>.()+,]/g, "");
  }
  return async (dispatch) => {
    const getEmails = async () => {
      const response = await fetch(
        `https://mailboxclient-c9aed-default-rtdb.firebaseio.com/emails.json`
      );

      if (!response.ok) {
        return () => {
          dispatch(
            uiActions.showNotification({
              status: "error",
              message: "Something went wrong!!!",
            })
          );

          setTimeout(() => {
            dispatch(uiActions.setIsLoading());
          }, 2000);
        };
      }

      const data = await response.json();

      return data;
    };

    try {
      const emailData = await getEmails();
      console.log('All mails',emailData.allMails);
      

        const emailData1 = emailData.allMails.filter((t) => t.toEmail === emailId);
        const count = emailData.allMails.filter(t => t.isRead === false && t.toEmail === emailId).length;
        console.log(count)
        console.log("emailData 1", emailData1);

       
        dispatch(emailActions.inboxEmails({
          receivedItems: emailData1 || [],
        }))

        dispatch(emailActions.replaceAllEmail({
          allMails: emailData.allMails,
          unReadCount: count
        }))
      // }
    } catch (error) {}
  };
};
