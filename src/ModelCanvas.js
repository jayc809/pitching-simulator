import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Edges } from '@react-three/drei'
import { StrikeZoneModel, HomePlateModel, MoundModel, PitchPathModel } from './Models';
import { HOME_PLATE_REAR_TO_MOUND_REAR, HOME_PLATE_HEIGHT, GROUND_OFFSET, TOTAL_HEIGHT, STRIKE_ZONE_HEIGHT, STRIKE_ZONE_BOTTOM_TO_GROUND, HOME_PLATE_THICKNESS, MOUND_LENGTH, MOUND_REAR_HEIGHT, HOME_PLATE_REAR_TO_RELEASE_POINT, RELEASE_HEIGHT } from './Constants'
import { useDataContext } from './DataProvider';

const ModelCanvas = () => {
    const {data, setData} = useDataContext();
    
    const cameraPosition = [HOME_PLATE_REAR_TO_MOUND_REAR * 0.17 * -1, STRIKE_ZONE_HEIGHT * 0.4, HOME_PLATE_REAR_TO_MOUND_REAR * 0.1];
    const cameraOffsetX = HOME_PLATE_REAR_TO_MOUND_REAR * 0.4;
    const cameraOffsetY = STRIKE_ZONE_HEIGHT * 0.2;
    const target = [HOME_PLATE_REAR_TO_MOUND_REAR * 0.0283 * -1, STRIKE_ZONE_HEIGHT * 0.01, 0];
    const [reset, setReset] = useState(0);
    const [showHelp, setShowHelp] = useState(false);

    const onResetCamera = () => {
        setReset(reset + 1);
    };

    return (
        <>
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
                <button style={{color: 'white', backgroundColor: 'black', border: '1px solid white', borderRadius: '5px', padding: '10px', marginLeft: '20px'}}>Play Animation</button>
            </div>
            <Canvas key={reset} style={{height: '100%', width: '100%', backgroundColor: 'black', cursor: 'crosshair'}} camera={{fov: 50, position: cameraPosition}}>
                <OrbitControls enableDamping={false} target={target}/>
                <ambientLight intensity={1}/>
                <StrikeZoneModel 
                    posX={HOME_PLATE_REAR_TO_MOUND_REAR / 2 * -1 + HOME_PLATE_HEIGHT + cameraOffsetX} 
                    posY={GROUND_OFFSET + STRIKE_ZONE_HEIGHT / 2 + STRIKE_ZONE_BOTTOM_TO_GROUND + cameraOffsetY} 
                    posZ={0}
                />
                <HomePlateModel 
                    posX={HOME_PLATE_REAR_TO_MOUND_REAR / 2 * -1 + HOME_PLATE_HEIGHT / 2 + cameraOffsetX} 
                    posY={GROUND_OFFSET + HOME_PLATE_THICKNESS / 2 + cameraOffsetY} 
                    posZ={0}
                />
                <MoundModel
                    posX={HOME_PLATE_REAR_TO_MOUND_REAR / 2 - MOUND_LENGTH / 2 + cameraOffsetX}
                    posY={GROUND_OFFSET + MOUND_REAR_HEIGHT / 2}
                    posZ={0}
                />
                {
                    data['pitchDatas'].map((pitchData, index) => {return(
                        <PitchPathModel
                            key={index}
                            index={index}
                            posX={HOME_PLATE_REAR_TO_MOUND_REAR / 2 * -1 + HOME_PLATE_REAR_TO_RELEASE_POINT + cameraOffsetX}
                            posY={GROUND_OFFSET + RELEASE_HEIGHT}
                            posZ={0}
                        />
                    );})
                }
                <mesh position={[0 + cameraOffsetX, 0 + cameraOffsetY - GROUND_OFFSET / 4, 0]}>
                    <boxGeometry args={[HOME_PLATE_REAR_TO_MOUND_REAR, TOTAL_HEIGHT * 1.25, TOTAL_HEIGHT]}/>
                    <meshPhongMaterial opacity={0} transparent={true} depthWrite={false}/>
                    <Edges color={'white'} />
                </mesh>
            </Canvas>
        </>
    );
};

export default ModelCanvas;