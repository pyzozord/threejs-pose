import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Three from 'three'
import {Container3D, Object3D} from './react3d'

class App extends React.Component {
  render() {
    const object = new Three.Object3D()
    object.position.z=200
    object.rotateX(Three.Math.degToRad(45))
    return (
      <Container3D>
        <Object3D object={object}>
          asdasd
        </Object3D>
      </Container3D>
    )
  }
}

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

ReactDOM.render(<App />, document.getElementById('root'));
