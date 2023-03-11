import { useSelector } from "react-redux";

 

const SentEmails = () => {

    const emails = useSelector(state => state.emailStore.sentItems);

    return(
        <ul>
            {emails.map(email => (
                <li>
                    <h4>{email.subject}</h4>
                    <h5>{email.body}</h5>
                </li>
            ))}
        </ul>
    )
}

export default SentEmails;