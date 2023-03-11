import { useSelector } from "react-redux";
import InboxEmailItem from "./InboxEmailItem";
import "./InboxEmailItem.css";

const InboxEmails = () => {
  const emails = useSelector((state) => state.emailStore.receivedItems);

  return (
    <table>
      <tr>
        <th>From</th>
        <th>Subject</th>
      </tr>
      {emails.map((email) => (
        <InboxEmailItem
          subject={email.subject}
          body={email.body}
          fromEmail={email.toEmail}
        />
      ))}
    </table>
  );
};

export default InboxEmails;
