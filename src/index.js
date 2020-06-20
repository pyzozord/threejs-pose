import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Three from 'three'
import FPC from './FirstPersonControls.js'
import {Scene3D, Object3D} from './react3d'

let frames = 0

function Rick({children}) {
  return (
    <Object3D position={{ z: -100 }} rotation={{ y: -frames/600 }}>
      <div style={{fontSize: '30px'}}>🐓 Michal's screen save 🐓</div>
      <img
        style={{width: '450px'}}
        src="https://media2.giphy.com/media/1USKMDPjuH4ovL7J5h/giphy.gif"
      />
      <div>Lekker, eh?</div>
      {children}
    </Object3D>
  )
}

function Morty() {
  return (
    <Object3D rotation={{ y: frames/200 }}>
      <Object3D position={{ z: 300 }}>
        <div
          style={{
            display: 'block',
            width: '200px',
            height: '200px',
            borderRadius: '200px',
            background: 'center center url(https://i.giphy.com/media/LYHjZcIV7lnsQ/giphy.webp)',
            backgroundSize: '400px',
          }}
        />
      </Object3D>
    </Object3D>
  )
}


class App extends React.Component {
  render() {
    console.log('asdasdasd');
    return (
      <Scene3D fov={75} position={{ z: 400 }} >
        <Morty />
        <Rick />
      </Scene3D>
    )
  }
}

setInterval(()=>{
  frames++
  // controls.update(1)
  ReactDOM.render(<App />, document.getElementById('root'));
}, 1000/60)
