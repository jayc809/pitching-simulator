import React, { useState, useRef } from 'react';
import ModelCanvas from './ModelCanvas';
import { Canvas } from '@react-three/fiber'
import { HOME_PLATE_REAR_TO_MOUND_REAR, STRIKE_ZONE_HEIGHT, PITCH_TYPE_TO_NAME } from './Constants'
import { useDataContext } from './DataProvider';

const ModelViewer = () => {
    const {data, setData, showPitchAnnotation} = useDataContext();
    
    const cameraPosition = [HOME_PLATE_REAR_TO_MOUND_REAR * 0.17 * -1, STRIKE_ZONE_HEIGHT * 0.4, HOME_PLATE_REAR_TO_MOUND_REAR * 0.1];
    const cameraOffsetX = HOME_PLATE_REAR_TO_MOUND_REAR * 0.4;
    const cameraOffsetY = STRIKE_ZONE_HEIGHT * 0.2;
    const target = [HOME_PLATE_REAR_TO_MOUND_REAR * 0.0283 * -1, STRIKE_ZONE_HEIGHT * 0.01, 0];
    const [resetCamera, setResetCamera] = useState(0);
    const [showHelp, setShowHelp] = useState(false);
    const [canPlayAnimation, setCanPlayAnimation] = useState(true);
    const animationData = useRef({playAnimation: false, pathsCompleted: 0, startClockTime: null, ready: false, initialLoad: true, initialPathsReady: 0});

    const onResetCamera = () => {
        setResetCamera(resetCamera + 1);
        const dataCopy = {...data};
        dataCopy['pitchDataChanged'] = -1;
        setData(dataCopy);
    };

    const onPlayAnimation = () => {
        animationData.current['playAnimation'] = true;
        setCanPlayAnimation(false);
        setTimeout(() => {
            setCanPlayAnimation(true);
        }, 1000);
    }

    return (<>
        {
            showPitchAnnotation !== null ? 
            <div style={{height: '33vh', width: '20vw', position: 'absolute', left: `calc(${showPitchAnnotation[1]}px - 20vw / 2)`, top: `calc(${showPitchAnnotation[2]}px - 33vh - 30px)`, zIndex: 110, border: '1px solid white', backgroundColor: 'black', boxSizing: 'border-box', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <h3 style={{margin: '5px'}}>{`Pitch ${showPitchAnnotation[0] + 1}`}</h3>
                <h5 style={{margin: '5px'}}>{`Pitch Type: ${PITCH_TYPE_TO_NAME[data['pitchDatas'][showPitchAnnotation[0]]['pitchType']]}`}</h5>
                <h5 style={{margin: '5px'}}>{`Velocity: ${data['pitchDatas'][showPitchAnnotation[0]]['velocity']} mph`}</h5>
                <h5 style={{margin: '5px'}}>{`Spin Rate: ${data['pitchDatas'][showPitchAnnotation[0]]['spinRate']} rpm`}</h5>
                <h5 style={{margin: '5px'}}>{`Spin Axis: ${data['pitchDatas'][showPitchAnnotation[0]]['spinAxis']}°`}</h5>
                <h5 style={{margin: '5px'}}>{`Horizontal Break: ${data['pitchDatas'][showPitchAnnotation[0]]['horizontalBreak']} inches`}</h5>
                <h5 style={{margin: '5px'}}>{`Veritcal Break: ${data['pitchDatas'][showPitchAnnotation[0]]['verticalBreak']} inches`}</h5>
                <h5 style={{margin: '5px'}}>{`Hitter Reaction Time: ${data['pitchDatas'][showPitchAnnotation[0]]['hitterReactionTime']} seconds`}</h5>
            </div> :
            <></>
        }
        {
            showHelp ? 
            <div style={{width: '25vw', height: '25vh', position: 'absolute', left: '30vw', top: '40vh', zIndex: 110, border: '1px solid white', backgroundColor: 'black', boxSizing: 'border-box', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <h5 style={{margin: '5px'}}>Pan: one finger hold and drag</h5>
                <h5 style={{margin: '5px'}}>Move: two finger hold and drag</h5>
                <h5 style={{margin: '5px'}}>Zoom: two finger pinch or scroll</h5>
                <h5 style={{margin: '5px'}}>Adjust sliders: hold and drag or click and use arrow keys</h5>
                <h5 style={{margin: '5px'}}>* Model is based on a 6-foot, right-handed pitcher * </h5>
            </div> :
            <></>
        }
        <div style={{width: '80vw', position: 'absolute', zIndex: 100, right: '20vw', boxSizing: 'border-box', padding: '20px 0', display: 'flex', justifyContent: 'end'}}>
            <button onMouseEnter={() => {setShowHelp(true)}} onMouseLeave={() => {setShowHelp(false)}} style={{color: 'white', backgroundColor: 'black', border: '1px solid white', borderRadius: '1000px', padding: '0 14px', fontSize: '18px', marginLeft: '20px'}}>?</button> 
            <button onClick={onResetCamera} style={{color: 'white', backgroundColor: 'black', border: '1px solid white', borderRadius: '5px', padding: '10px', marginLeft: '20px'}}>Reset Camera</button> 
            <button onClick={onPlayAnimation} disabled={!canPlayAnimation} style={{color: canPlayAnimation ? 'white' : 'grey', backgroundColor: 'black', border: canPlayAnimation ? '1px solid white' : '1px solid grey', borderRadius: '5px', padding: '10px', marginLeft: '20px'}}>Play Animation</button>
        </div>
        <Canvas key={resetCamera} style={{height: '100%', width: '100%', backgroundColor: 'black', cursor: 'crosshair'}} camera={{fov: 50, position: cameraPosition}}>
            <ModelCanvas cameraOffsetX={cameraOffsetX} cameraOffsetY={cameraOffsetY} target={target} animationData={animationData}/>
        </Canvas>
    </>);
};

export default ModelViewer;