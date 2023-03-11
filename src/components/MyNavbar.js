import { Nav, Container, Navbar, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import "./MyNavbar.css";
const MyNavbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  //   const toggleHandler = () => {
  //     dispatch(modeActions.toggleMode());
  //   };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
          href="#home"
          //   style={{ color: `${mode === "light" ? "black" : "white"}` }}
        >
          MailBox
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                <NavLink className="nav-link" to="/profile">
                  MyProfile
                </NavLink>
                <NavLink className="nav-link" to="/compose-email">
                  Compose Email
                </NavLink>
                <NavLink className="nav-link" to="/sent-email">
                  Sent Emails
                </NavLink>
                <NavLink className="nav-link" to="/inbox-email">
                  Inbox
                </NavLink>
              </>
            )}
          </Nav>

          {!isLoggedIn && (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )}

          {isLoggedIn && (
            <>
              <NavLink
                className="nav-link"
                to="/login"
                style={{ marginLeft: "20px" }}
              >
                <Button variant="light" onClick={logoutHandler}>
                  Logout
                </Button>
              </NavLink>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
