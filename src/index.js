import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Three from 'three'
import {Container3D, Object3D} from './react3d'
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeigh, 1, 100)
const icon = new Three.Object3D()
const hello = new Three.Object3D()
const text = new Three.Object3D()

// <Object3D object={text}>
//   <div>Hello</div>
// </Object3D>

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

// text.position.z = 260
// text.position.z -= 0.1
// icon.position.z = -500
// icon.rotation.y += 9.05
setInterval(()=>{
  icon.rotation.y -= 0.01
  ReactDOM.render(<App />, document.getElementById('root'));
}, 16)

// class App extends React.Component {
//   componentDidMount() {
//     const thisDOMNode = ReactDOM.findDOMNode(this)
//     const width = thisDOMNode.clientWidth
//     const height = thisDOMNode.clientHeight

//     this.scene = new Three.Scene()
//     this.renderer = new CSS3DRenderer()
//     this.camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000)
//     this.renderer.setSize(width, height);
//     thisDOMNode.appendChild(this.renderer.domElement)

//     const spriteDOMNode = document.createElement('div')
//     ReactDOM.render('hello', spriteDOMNode)
//     const sprite = new CSS3DObject(spriteDOMNode)
//     sprite.rotateX(Three.Math.degToRad(30))
//     this.scene.add(sprite)

//     this.camera.position.z = 20
//     this.renderer.render(this.scene, this.camera)
//   }
//   render() {
//     return <div id="app" />
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'));
