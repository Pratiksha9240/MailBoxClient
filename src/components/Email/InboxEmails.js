import { useSelector } from "react-redux";
import InboxEmailItem from "./InboxEmailItem";
import "./InboxEmailItem.css";

const InboxEmails = () => {
  const emails = useSelector((state) => state.emailStore.receivedItems);

  return (
    <table>
      <tr>
        <th>To</th>
        <th>Subject</th>
      </tr>
      {emails.map((email) => (
        <InboxEmailItem
          subject={email.subject}
          body={email.body}
          toEmail={email.toEmail}
        />
      ))}
    </table>
  );
};

export default InboxEmails;
