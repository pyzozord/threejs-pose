import React from 'react'
import ReactDOM from 'react-dom'
import * as Three from 'three'

const {Provider, Consumer} = React.createContext('scene3d')

export class Container3D extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scene: new Three.Scene(),
      camera: this.props.camera || undefined,
    }
  }
  getMatrix() {
    const { elements } = this.state.camera.matrixWorld
    return elements
  }
  getStyleScene() {
    const { camera, width, height } = this.state
    const fov = `${camera.projectionMatrix.elements[5] * height/2}px`
    return {
      perspective: fov,
    }
  }
  getStyleCamera() {
    const { camera, width, height } = this.state
    const fov = `${camera.projectionMatrix.elements[5] * height/2}px`
    return {
      // width: width,
      // height: height,
      // position: 'aboslute',
      transformStyle: 'preserve-3d',
      transform: `
        translate3d(${width/2}px, ${height/2}px, ${fov})
        matrix3d(${this.getMatrix().join(',')})
      `
    }
  }
  componentDidMount() {
    const thisDOMNode = ReactDOM.findDOMNode(this)
    const width = thisDOMNode.clientWidth
    const height = thisDOMNode.clientHeight
    const camera = this.state.camera
      || new Three.PerspectiveCamera(75, width / height, 1, 100)
    this.setState({ camera, height, width })
  }
  render() {
    const { scene, camera, width, height } = this.state
    if (!scene || !camera) {
      return <div className="Scene3D" />
    }
    scene.updateMatrixWorld()
    camera.updateMatrixWorld()
    return (
      <div className="Scene3D" style={this.getStyleScene()}>
        <div className="Camera3D" style={this.getStyleCamera()}>
          <Provider value={{ scene, camera, width, height }}>
            {this.props.children}
          </Provider>
        </div>
      </div>
    )
  }
}

class Object3DInternal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      object: this.props.object || new Three.Object3D(),
    }
  }
  getMatrix() {
    const { elements } = this.state.object.matrixWorld
    return elements
  }
  getStyle() {
    const fov = `-${this.props.camera.projectionMatrix.elements[5] * this.props.height/2}px`
    return {
      // display: 'inline-block',
      position: 'absolute',
      transform: `
        translate3d(-50%, -50%, ${fov})
        matrix3d(${this.getMatrix().join(',')})
      `,
    }
  }
  componentDidMount() {
    this.props.scene.add(this.state.object)
  }
  componentWillUnmount() {
    this.props.scene.remove(this.state.object)
  }
  render() {
    this.state.object.updateMatrixWorld()
    return (
      <div className="Object3D" style={this.getStyle()}>
        {this.props.children}
      </div>
    )
  }
}

export function Object3D({children, ...props}) {
  return (
    <Consumer>
      {consumerProps => (
        <Object3DInternal {...props} {...consumerProps}>
          {children}
        </Object3DInternal>
      )}
    </Consumer>
  )
}


