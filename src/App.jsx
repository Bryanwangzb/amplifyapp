//@ts-check

import logo from './logo.svg';
import './App.css';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { API, Storage,Auth } from 'aws-amplify'
import awsConfig from './aws-exports'
import SongList from './components/SongList'
import {Button} from '@material-ui/core'

Amplify.configure(awsConfig)

function App() {

  const signOut = async() =>{
    try{
      await Auth.signOut()
    }catch(error){
      console.log('error signing out',error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained" color="primary" onClick={signOut}>
          Sign Out
          </Button>
        <h2>Kozipro App</h2>
      </header>
        <SongList />
    </div>
  );
}

export default withAuthenticator(App);

