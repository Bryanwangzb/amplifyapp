import logo from './logo.svg';
import './App.css';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { API, Storage } from 'aws-amplify'
import awsConfig from './aws-exports'
import SongList from './components/SongList'

Amplify.configure(awsConfig)

function App() {

  

  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>Kozipro App</h2>
      </header>
        <SongList />
    </div>
  );
}

export default withAuthenticator(App);

