import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Three from 'three'

class App extends React.Component {
  componentDidMount() {
    const thisDOMNode = ReactDOM.findDOMNode(this)
    const width = thisDOMNode.clientWidth
    const height = thisDOMNode.clientHeight

    this.scene = new Three.Scene()
    this.renderer = new Three.WebGLRenderer()
    this.camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.renderer.setSize(width, height);
    thisDOMNode.appendChild(this.renderer.domElement)

    const geometry = new Three.BoxGeometry(1, 1, 1)
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Three.Mesh(geometry, material)
    this.scene.add(cube)
    this.camera.position.z = 5
    this.renderer.render(this.scene, this.camera)
  }
  render() {
    return <div id="app" />
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
