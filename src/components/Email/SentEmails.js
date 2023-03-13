import { useSelector } from "react-redux";
import SentEmailItems from "./SentEmailItems";

 

const SentEmails = () => {

    const emails = useSelector(state => state.emailStore.sentItems);

    return(
        <table>
      <tr>
        <th>To</th>
        <th>Subject</th>
      </tr>
      {emails.map((email) => (
        <SentEmailItems
          subject={email.subject}
          body={email.body}
          toEmail={email.toEmail}
          isRead= {email.isRead}
        />
      ))}
    </table>
    )
}

export default SentEmails;