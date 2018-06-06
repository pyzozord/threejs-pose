import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Three from 'three'
import FPC from './FirstPersonControls.js'
import {Scene3D, Object3D} from './react3d'

const camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// const controls = new FPC(camera)
// controls.movementSpeed *= 10
const icon = new Three.Object3D()
const icon2 = new Three.Object3D()
const icon2container = new Three.Object3D()

camera.position.z = 800
icon2.position.z = 300

function Rick({children}) {
  return (
    <Object3D object={icon}>
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
    <Object3D object={icon2container}>
      <Object3D object={icon2}>
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
    return (
      <Scene3D camera={camera}>
        <Morty />
        <Rick />
      </Scene3D>
    )
  }
}

setInterval(()=>{
  icon.rotation.y -= 0.002
  icon2container.rotateOnAxis(new Three.Vector3(1, 1, 0), 0.01)
  // icon2container.rotation.y += 0.005
  // icon2.rotation.y += 0.05
  // controls.update(1)
  ReactDOM.render(<App />, document.getElementById('root'));
}, 1000/60)
