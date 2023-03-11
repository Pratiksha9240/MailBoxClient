import "./InboxEmailItem.css";
import { Button } from "react-bootstrap";
import { useState } from "react";

const InboxEmailItem = (props) => {

    // const isRead = useSelector(state => state.ui.isRead);

    const [show,setShow] = useState(false);

    const [isRead,setIsRead] = useState(false);

    const openEmailHandler = () => {
        setShow(!show)
        setIsRead(true);
    }

  return (
    <>
      <tr style={{backgroundColor: `${isRead === false ? 'lightblue' : 'white'}`}}>
      <td>{props.fromEmail}</td>
        <td>{props.subject}</td>
        <td><Button variant="success" onClick={openEmailHandler}>Open Email</Button></td>
        <td><Button variant="danger" onClick={openEmailHandler}>Delete Email</Button></td>
      </tr>

      {show && <tr><td>{props.body}</td></tr>}
    </>
  );
};

export default InboxEmailItem;
