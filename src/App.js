import logo from './logo.svg';
import './App.css';
import { AmplifySignOut,withAuthenticator } from '@aws-amplify/ui-react';
import Amplify from '@aws-amplify';
import awsConfig from './aws-exports'

Amplify.configure(awsConfig)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>My App Content</h2>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
