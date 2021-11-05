import logo from './logo.svg';
import './App.css';
import { AmplifySignOut,withAuthenticator } from '@aws-amplify/ui-react';
import Amplify,{API} from 'aws-amplify'
import awsConfig from './aws-exports'

Amplify.configure(awsConfig)

function App() {

  const fetchSongs = async () => {
    try{
      const songData = await API.graphql(graphqlOperation(listSongs))

    }catch(error){

    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>Kozipro App</h2>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
