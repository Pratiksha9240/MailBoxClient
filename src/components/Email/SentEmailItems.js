import "./InboxEmailItem.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { emailActions } from "../../store/email-slice";

const SentEmailItems = (props) => {

    const {toEmail,subject,body} = props;

    const [show,setShow] = useState(false);

    const dispatch = useDispatch();

    const openEmailHandler = () => {
        setShow(!show)
    }


    const deleteEmailHandler = () => {
      dispatch(emailActions.removeSentEmail(subject))
    }

  return (
    <>
      <tr>
      <td>{toEmail}</td>
        <td>{subject}</td>
        <td><Button variant="success" onClick={openEmailHandler}>Open Email</Button></td>
        <td><Button variant="danger" onClick={deleteEmailHandler}>Delete Email</Button></td>
      </tr>

      {show && <tr><td>{body}</td></tr>}
    </>
  );
};

export default SentEmailItems;
