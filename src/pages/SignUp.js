import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDK-atOMz2itQQrkZp8QOunHUD25DyQeUw",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong!!!");
      }

      const data = await response.json();
      console.log(data)
    } catch (error) {
      alert(error);
    }
  };

  return (
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={submitHandler}
          className={classes.submit}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
