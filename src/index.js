import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Three from 'three'
import FPC from './FirstPersonControls.js'
import {Container3D, Object3D} from './react3d'

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
const controls = new FPC(camera)
controls.movementSpeed *= 10
const icon = new Three.Object3D()
const hello = new Three.Object3D()
const text = new Three.Object3D()

class App extends React.Component {
  render() {
    return (
      <Container3D camera={camera}>
        <Object3D object={icon}>
            <div style={{fontSize: '30px'}}>🌎👋Hello world</div>
            <img
              style={{width: '450px'}}
              src="https://media2.giphy.com/media/1USKMDPjuH4ovL7J5h/giphy.gif"
            />
        </Object3D>
      </Container3D>
    )
  }
}

// icon.position.z -= 1000
setInterval(()=>{
  // icon.rotation.y -= 0.01
  controls.update(1)
  ReactDOM.render(<App />, document.getElementById('root'));
}, 16)
