import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Notification from './components/Notifications';
import Login from './pages/Login';
import MyNavbar from './components/MyNavbar';
import './App.css';

function App() {

  const showNotification = useSelector(state => state.ui.isShowNotification);

  return (
    <div>
      {showNotification && <Notification />}

      <Route path='/navbar'>
        <MyNavbar />
      </Route>

      <Route exact path='/'>
        <SignUp />
      </Route>

      <Route path='/login'>
        <Login />
      </Route>
      
    </div>
  );
}

export default App;
