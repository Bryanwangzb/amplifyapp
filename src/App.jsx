
import logo from './logo.svg';
import './App.css';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { API, Storage, Auth } from 'aws-amplify'
import awsConfig from './aws-exports'
import SongList from './components/SongList'
import { Button } from '@material-ui/core'
import { useState,useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import SignIn from './components/SignIn'


Amplify.configure(awsConfig)

function App() {

  const [loggedIn,setLoggedIn] = useState(false);

  useEffect( () =>{
    AssessLoggedInState()
  },[])
    

  const AssessLoggedInState = () => {
    Auth.currentAuthenticatedUser().then(()=>{
      setLoggedIn(true)
    }).catch(() => {
      setLoggedIn(false)
    })
  }


  const signOut = async () => {
    try {
      await Auth.signOut();
      setLoggedIn(false)
    } catch (error) {
      console.log('error signing out', error)
    }
  }

  const onSignIn = () =>{
    setLoggedIn(true);
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header"> 
          { loggedIn ? <Button variant="contained" color="primary" onClick={signOut}>
            Sign Out
          </Button> : 
          (
            <Link to="/signin">
          <Button variant="contained" color="primary" >
            Sign In
            </Button>
          </Link>
          )}
          <h2>Kozipro App</h2>
        </header>
        <Switch>
          <Route exact path="/">
            <SongList />
          </Route>
          <Route path="/signin">
            <SignIn onSignIn={onSignIn}></SignIn>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;

