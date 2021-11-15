//@ts-check
import React,{useState} from 'react';
import { TextField,Button } from '@material-ui/core';
import {Auth} from 'aws-amplify'
import { useHistory } from 'react-router';


const SignIn = ({onSignIn}) =>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory()

    const signIn = async () =>{
        try{
            const user = await Auth.signIn(username,password);
            history.push('/'); // redirect user to different page
            onSignIn()
        }catch(error){
            console.log('there was an error logging in ', error)
        }
    }

    return (
        
        <div className="singin">
            <TextField
                id='username'
                label='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                id='password'
                label='Password'
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button id='signInButton' color='primary' onClick={signIn}>
                SignIn
            </Button>
            </div>
           
    )
}

export default SignIn;