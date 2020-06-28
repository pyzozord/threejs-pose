import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Three from 'three'
import FPC from './FirstPersonControls.js'
import {Scene3D, Object3D} from './react3d'

const fps = 60;
const interval = 1000 / fps;
let then = (new Date()).getTime();
let frame = { now: then, time: 0 };
let requestRef = undefined;

function Rick({children}) {
	const angleRef = React.useRef(0);
	angleRef.current = (angleRef.current + 1/20 * frame.time/1000) % 1;
  return (
    <Object3D position={{ z: -100 }} rotation={{ y: -1 * angleRef.current * 2 * Math.PI }}>
      <div style={{fontSize: '30px'}}>Michał's homepage</div>
      <img
        style={{width: '450px'}}
        src="https://media.giphy.com/media/uxRWsv9xToXQI/giphy.gif"
      />
      <div>Is currently under contstruction 👷</div>
      {children}
    </Object3D>
  )
}

function Morty({position}) {
	const angle = React.useRef(0);
	const zoom = React.useRef(0);
	angle.current = (angle.current + 1/10 * frame.time/1000) % 1;
	const z = Math.sin(zoom.current * 10);
  return (

	<Object3D 
		rotation={{ 
			y: angle.current * 2 * Math.PI,
		}}
	>
      <Object3D position={{ ...position, z: position.z }}>
        <div
          style={{
            display: 'block',
            width: '200px',
            height: '200px',
            borderRadius: '200px',
            background: 'center center url(https://media.giphy.com/media/11c7UUfN4eoHF6/giphy.gif)',
            backgroundSize: '200px',
          }}
        />
    </Object3D>
    </Object3D>
  )
}

function App() {
  return (
		<Scene3D fov={75} position={{ z: 400 }} >
			<Morty position={{ z: 300, }} />
			<Rick />
		</Scene3D>
  )
}

function animate(){
		requestAnimationFrame(animate);
		const now = (new Date()).getTime();
		const delta = now - then;
		if (delta >= interval) {
				then = now - (delta % interval);
				frame.now = now;
				frame.time = delta;
				ReactDOM.render(<App />, document.getElementById('root'));
		}
};

requestRef = requestAnimationFrame(animate);
