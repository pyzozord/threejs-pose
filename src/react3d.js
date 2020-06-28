import React from 'react'
import ReactDOM from 'react-dom'
import * as Three from 'three'

const {
  Provider: Scene3DProvider,
  Consumer: Scene3DConsumer
} = React.createContext('scene3d')

const {
  Provider: Object3DProvider,
  Consumer: Object3DConsumer
} = React.createContext('object3d')

export class Scene3D extends React.Component {
  static getDerivedStateFromProps({
    scene3d,
    object3d,
    camera,
    scene,
    children,
    fov,
    near,
    far,
    ...props
  }, state
  ){
    if (state.camera) {
      Object.entries(props).forEach(([name, value]) => {
        Object.assign(state.camera[name], value)
      })
    }
    return state
  }
  static defaultProps = {
    fov: 45,
    near: 1,
    far: 100,
  }
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
      elements[0], -elements[1], elements[2], elements[3],
      elements[4], -elements[5], elements[6], elements[7],
      elements[8], -elements[9], elements[10], elements[11],
      elements[12], -elements[13], elements[14], elements[15],
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
      // border: '1px solid red',
      width: width,
      height: height,
      position: 'aboslute',
      transformStyle: 'preserve-3d',
      transform: `
        translateZ(${fov})
        matrix3d(${this.getMatrix().join(',')})
      `
    }
  }
  componentDidMount() {
    const thisDOMNode = ReactDOM.findDOMNode(this)
    const width = thisDOMNode.clientWidth
    const height = thisDOMNode.clientHeight
    const { fov, near, far } = this.props
    const camera = this.state.camera
      || new Three.PerspectiveCamera(fov, width / height, near, far)
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
          <Scene3DProvider value={{ scene, camera, width, height }}>
            {this.props.children}
          </Scene3DProvider>
        </div>
      </div>
    )
  }
}

class Object3DImplementation extends React.Component {
  static getDerivedStateFromProps({
    scene3d,
    object3d,
    object,
    children,
    ...props
  }, state
  ){
    Object.entries(props).forEach(([name, value]) => {
      Object.assign(state.object[name], value)
    })
    return state
  }
  constructor(props) {
    super(props)
    this.state = {
      object: props.object instanceof Three.Object3D
        ? props.object
        : new Three.Object3D(),
    }
  }
  getMatrix() {
    const { elements } = this.state.object.matrixWorld
    if (this.props.object3d.parent) {
      return elements
    }
    return [
      elements[0], elements[1], elements[2], elements[3],
      - elements[4], - elements[5], - elements[6], - elements[7],
      elements[8], elements[9], elements[10], elements[11],
      elements[12], elements[13], elements[14], elements[15],
    ]

  }
  getStyle() {
    const { camera, width, height } = this.props.scene3d
    const fov = `${camera.projectionMatrix.elements[5] * height/2}px`
    let styles = {
      position: 'absolute',
      transformStyle: 'preserve-3d',
      transform: `
        matrix3d(${this.getMatrix().join(',')})
      `,
    }
    styles = Object.assign(styles, {
      top: '50%',
      left: '50%',
      transform: `
        translate(-50%, -50%)
      ` + styles.transform
    })
    return styles
  }
  componentDidMount() {
    this.props.scene3d.scene.add(this.state.object)
  }
  componentWillUnmount() {
    this.props.scene3d.scene.remove(this.state.object)
  }
  render() {
    this.state.object.updateMatrixWorld()
    return (
      <div className="Object3D" style={this.getStyle()}>
        <Object3DProvider value={{ parent: this.state.object }}>
          {this.props.children}
        </Object3DProvider>
      </div>
    )
  }
}

export function Object3D({children, ...props}) {
  return (
    <Scene3DConsumer>
      {sceneProps => (
        <Object3DConsumer>
          {objectProps => (
            <Object3DImplementation {...props} scene3d={{...sceneProps}} object3d={{...objectProps}}>
              {children}
            </Object3DImplementation>
          )}
        </Object3DConsumer>
      )}
    </Scene3DConsumer>
  )
}
