import logo from './logo.svg';
import './App.css';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { API } from 'aws-amplify'
import awsConfig from './aws-exports'
import { listSongs } from './graphql/queries'
import {updateSong, updateSongs} from './graphql/mutations'
import { useState } from 'react'
import { useEffect } from 'react'
import { graphqlOperation } from '@aws-amplify/api'
import { Paper,IconButton } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PauseIcon from '@material-ui/icons/Pause'

Amplify.configure(awsConfig)

function App() {

  const [songs, setSongs] = useState([])
  const [songPlaying,setSongPlaying] = useState('')

  useEffect(() => {
    fetchSongs()
  }, [])

  const toggleSong = async (idx) =>{ 
    if(songPlaying === idx){
      setSongPlaying('')
      return 
    }

    setSongPlaying(idx)
    return
  }

  const fetchSongs = async () => {
    try {
      const songData = await API.graphql(graphqlOperation(listSongs))
      const songList = songData.data.listSongs.items
      console.log('song list', songList)
      setSongs(songList)


    } catch (error) {
      console.log("error on fetching songs:", error)
    }
  };


  const addLike = async(idx) =>{
    try {
        const song = songs[idx];
        song.like = song.like + 1;
        delete song.createdAt;
        delete song.updatedAt;

        const songData = await API.graphql(graphqlOperation(updateSong,{input: song}));
        const songList = [...songs];
        songList[idx] = songData.data.updateSong;
        setSongs(songList);

    } catch (error) {
      console.log('error on adding like to song',error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>Kozipro App</h2>
      </header>
      <div className="songList">
        {songs.map((song,idx) => {
          return (
            <Paper variant="outlined" elevation={2} key={`song${idx}`}>
              <div className="songCard">
                <IconButton aria-label="play" onClick={() => toggleSong(idx)}>
                  {songPlaying === idx ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <div>
                  <div className="songTitle">{song.title}</div>
                  <div className="songOwner">{song.owner}</div>
                </div>
                <div>
                <IconButton aria-label="like" onClick={()=> addLike(idx)}>
                  <FavoriteIcon />
                </IconButton>
                {song.like}
                </div>
                <div className="songDescription">{song.description}</div>
              </div>
            </Paper>
          )
        })}
      </div>
    </div>
  );
}

export default withAuthenticator(App);