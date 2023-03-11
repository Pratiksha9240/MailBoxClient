import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Notification from './components/Notifications';
import Login from './pages/Login';
import MyNavbar from './components/MyNavbar';
import SentEmails from './components/Email/SentEmails';
import InboxEmails from './components/Email/InboxEmails';
import './App.css';
import ForgotPassword from './pages/ForgotPassword';
import ComposeEmail from './components/ComposeEmail';
import { useEffect } from 'react';
import { getInboxEmails, getSentEmails, storeEmail } from './store/email-actions';

let isInitial = true;

function App() {

  const showNotification = useSelector(state => state.ui.isShowNotification);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const emailData = useSelector(state => state.emailStore);

  const emailId = useSelector(state => state.auth.email);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSentEmails(emailId))
  
},[emailId,dispatch])

useEffect(() => {
  dispatch(getInboxEmails(emailId))

},[emailId,dispatch])

  useEffect(() => {
    if(isInitial){
      isInitial = false
      return
    }
    dispatch(storeEmail(emailData,emailId))
  },[emailData,emailId,dispatch])

  return (
    <div>
      {showNotification && <Notification />}

      <MyNavbar />

      <Route exact path='/'>
        <SignUp />
      </Route>

      {!isLoggedIn && <Route path='/login'>
        <Login />
      </Route>}

      <Route path='/forgot-password'>
        <ForgotPassword />
      </Route>

      <Route path='/compose-email'>
        <ComposeEmail />
      </Route>

      <Route path='/sent-email'>
        <SentEmails />
      </Route>

      <Route path='/inbox-email'>
        <InboxEmails />
      </Route>
      
    </div>
  );
}

export default App;
