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
    const { camera } = this.state
    const fov = `${camera.projectionMatrix.elements[5] * this.state.height/2}px`
    return {
      position: 'fixed',
      width: '100%',
      height: '100%',
      perspective: fov,
    }
  }
  getStyleCamera() {
    const matrix = this.getMatrix().join(',')
    return {
      width: 0,
      height: 0,
      transformStyle: 'preserve-3d',
      transform: `matrix3d(${matrix})`
    }
  }
  componentDidMount() {
    if (!this.state.camera) {
      const thisDOMNode = ReactDOM.findDOMNode(this)
      const width = thisDOMNode.clientWidth
      const height = thisDOMNode.clientHeight
      const camera = new Three.PerspectiveCamera(75, width / height, 1, 100)
      camera.position.z = 1
      camera.position.x = width/2
      camera.position.y = height/2
      camera.updateMatrixWorld()
      this.setState({ camera, height, width })
    }
  }
  render() {
    const { scene, camera } = this.state
    if (!scene || !camera) {
      return <div className="Scene3D" />
    }
    scene.updateMatrixWorld()
    camera.updateMatrixWorld()
    return (
      <div className="Scene3D" style={this.getStyleScene()}>
        <div className="Camera3D" style={this.getStyleCamera()}>
          <Provider value={{ scene, camera }}>
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
  getStyle(object) {
    return {
      display: 'inline-block',
      osition: 'absolute',
      transform: `matrix3d(${this.getMatrix().join(',')})`,
    }
  }
  componentDidMount() {
    this.props.scene.add(this.state.object)
  }
  componentWillUnmount() {
    this.props.scene.remove(this.state.object)
  }
  render() {
    const { object } = this.state
    object.updateMatrixWorld()
    const style = this.getStyle()
    const { children, ...props } = this.props
    return (
      <div className="Object3D" style={style}>
        {(typeof children === 'string' && children)
          || React.cloneElement(children, {...props, object})
        }
      </div>
    )
  }
}

export function withObject3D(Component) {
  return props => (
    <Consumer>
      {consumerProps => (
        <Object3DInternal {...props} {...consumerProps}>
          <Component />
        </Object3DInternal>
      )}
    </Consumer>
  )
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


