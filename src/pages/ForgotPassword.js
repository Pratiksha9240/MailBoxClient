import { useRef } from "react";
import { Container,Button,Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { useHistory } from "react-router-dom";
import classes from "./Login.module.css";

const ForgotPassword = () => {

    const emailInputRef = useRef();

    const history = useHistory();

    const dispatch = useDispatch();

    const submitHandler = async (event) => {
        event.preventDefault();
    
        const enteredEmail = emailInputRef.current.value;
    
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDK-atOMz2itQQrkZp8QOunHUD25DyQeUw",
            {
              method: "POST",
              body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: enteredEmail,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
    
          if (!response.ok) {
            console.log(response)
            throw new Error();
          }
    
          const data = await response.json();
          console.log(data)
    
          dispatch(uiActions.showNotification({
            status: 'ok',
            message: 'Password reset link sent to your email'
          }));
    
          history.replace('/login')
    
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                message: 'Something went wrong!!!'
              }));
        }
    
        emailInputRef.current.value = '';
      };

    return(
        <Container>
        <Form className={classes.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={submitHandler}
          className={classes.submit}
        >
          Send Password Reset Link
        </Button>
      </Form>
    </Container>
    )
}

export default ForgotPassword;