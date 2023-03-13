import "./InboxEmailItem.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { emailActions } from "../../store/email-slice";

const InboxEmailItem = (props) => {

    const {fromEmail,subject,body,isRead} = props;

    const [show,setShow] = useState(false);

    const dispatch = useDispatch();

    const openEmailHandler = () => {
      const h = true
        setShow(!show)
        dispatch(emailActions.updateIsRead({subject,h}));
    }


    const deleteEmailHandler = () => {
      dispatch(emailActions.removeInboxItem(subject))
    }

  return (
    <>
      <tr style={{backgroundColor: `${isRead === false ? 'lightblue' : 'white'}`}}>
      <td>{fromEmail}</td>
        <td>{subject}</td>
        <td><Button variant="success" onClick={openEmailHandler}>Open Email</Button></td>
        <td><Button variant="danger" onClick={deleteEmailHandler}>Delete Email</Button></td>
      </tr>

      {show && <tr><td>{body}</td></tr>}
    </>
  );
};

export default InboxEmailItem;
