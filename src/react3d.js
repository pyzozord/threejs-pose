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
    const { elements } = this.state.camera.matrixWorldInverse
    return [
      elements[0], - elements[1], elements[2], elements[3],
      elements[4], - elements[5], elements[6], elements[7],
      elements[8], - elements[9], elements[10], elements[11],
      elements[12], - elements[13], elements[14], elements[15],
    ]
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
      width: width,
      height: height,
      // position: 'aboslute',
        // translate3d(${width/2}px, ${height/2}px, ${fov})
      transformStyle: 'preserve-3d',
      transform: `
        translateZ(${fov})
        matrix3d(${this.getMatrix().join(',')})
        translate(${width/2}px, ${height/2}px)
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
    return [
      elements[0], elements[1], elements[2], elements[3],
      - elements[4], - elements[5], - elements[6], - elements[7],
      elements[8], elements[9], elements[10], elements[11],
      elements[12], elements[13], elements[14], elements[15],
    ]

  }
  getStyle() {
    // const fov = `-${this.props.camera.projectionMatrix.elements[5] * this.props.height/2}px`
    return {
      // display: 'inline-block',
      position: 'absolute',
      transform: `
        translate(-50%, -50%)
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


