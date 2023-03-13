import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./ComposeEmail.css";
import { useDispatch } from "react-redux";
import { emailActions } from "../store/email-slice";
import { uiActions } from "../store/ui-slice";
import emailjs from '@emailjs/browser';

const ComposeEmail = () => {
  const [editorState, setState] = useState(() => EditorState.createEmpty());

  const receiverInputRef = useRef();
  const subjectInputRef = useRef();

  const dispatch = useDispatch();

  const handleChange = (rawDraftContentState) => {
    // console.log(rawDraftContentState.getCurrentContent().getPlainText());
  };

  const fromEmail = localStorage.getItem("email");

  const sendEmailHandler = (event) => {
    event.preventDefault();

    const enteredEmail = receiverInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;
    const enteredBody = editorState.getCurrentContent().getPlainText();

    dispatch(emailActions.sendEmail({
        body: enteredBody,
        toEmail: enteredEmail,
        subject: enteredSubject,
        fromEmail: fromEmail,
        isRead: false
    }))      

    dispatch(uiActions.showNotification({
      status: 'ok',
      message: 'Email Sent Successfully!!!'
    }));

    setTimeout(() => {
      dispatch(uiActions.setIsLoading());
    },2000)

    emailjs
    .send(
      "default_service",
      'template_7ixhog4',
      {
        senderEmail: fromEmail,
        receiverEmail: enteredEmail,
        subject: enteredSubject,
        body: enteredBody
      },
      'WbbruxmY311pDsfhL'
    )
    .then(res => {
      if (res.status === 200) {
        // setFormSubmitSuccessful(true)
      }
    })
    // Handle errors here however you like
    .catch(err => console.error("Failed to send feedback. Error: ", err))
  }

  return (
    <div style={{ margin: "200px" }}>
      <input type="text" className="text-line" value={fromEmail} readOnly />
      <br />
      <br />
      <br />
      <input
        type="text"
        className="text-line"
        placeholder="To"
        ref={receiverInputRef}
      />
      <br />
      <br />
      <br />
      <input type="text" className="text-line" placeholder="Subject" ref={subjectInputRef}/>
      <br />
      <br />
      <br />
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(editorState) => {
          setState(editorState);
          handleChange(editorState);
        }}
      />
      <hr />
      <Button variant="success" type="submit" onClick={sendEmailHandler}>Send</Button>
    </div>
  );
};

export default ComposeEmail;
