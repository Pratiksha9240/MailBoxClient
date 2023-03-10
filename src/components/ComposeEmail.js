import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import './ComposeEmail.css'

const ComposeEmail = () => {
  const [editorState, setState] = useState(() => EditorState.createEmpty());

  const receiverInputRef = useRef();

  const handleChange = (rawDraftContentState) => {
    // no need for convertToRaw or stateToHtml anymore
    console.log(rawDraftContentState);
  };

  return (

    <div style={{margin: '200px'}}>
        <input type="text" className="text-line" placeholder="To" ref={receiverInputRef}/>
        <br />
        <br />
        <br />
        <input type="text" className="text-line" placeholder="Subject"/>
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
    <Button variant="success">Send</Button>
    </div>
  );
};

export default ComposeEmail;
