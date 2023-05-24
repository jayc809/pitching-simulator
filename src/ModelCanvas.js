import React from 'react';
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Edges } from '@react-three/drei'
import { StrikeZoneModel, HomePlateModel, MoundModel, PitchPathModel } from './Models';
import { HOME_PLATE_REAR_TO_MOUND_REAR, HOME_PLATE_HEIGHT, GROUND_OFFSET, TOTAL_HEIGHT, STRIKE_ZONE_HEIGHT, STRIKE_ZONE_BOTTOM_TO_GROUND, HOME_PLATE_THICKNESS, MOUND_LENGTH, MOUND_REAR_HEIGHT, HOME_PLATE_REAR_TO_RELEASE_POINT, RELEASE_HEIGHT, ANIMATION_RANGE_MAX, ANIMATION_RANGE_STEP, ANIMATION_FRAMES, BASEBALL_RADIUS } from './Constants'
import { useDataContext } from './DataProvider';

const ModelCanvas = ({ cameraOffsetX, cameraOffsetY, target, animationData }) => {
    const {data} = useDataContext();

    useFrame(({ clock }) => {
        if (!(
            animationData.current['playAnimation'] || 
            (animationData.current['initialLoad'] && animationData.current['initialPathsReady'] === data['pitchDatas'].length)
        )) return;
        
        const currTime = clock.getElapsedTime();
        const totalPaths = data['pitchDatas'].length;

        if (!animationData.current['ready']) {
            animationData.current['startClockTime'] = currTime;
            animationData.current['pathsCompleted'] = 0;
            for (let i = 0; i < totalPaths; i++) {
                const animationRangeEnd = animationData.current[`pitch${i}`][2];
                animationRangeEnd.current = 0;
            }
            animationData.current['ready'] = true;
        }

        for (let i = 0; i < totalPaths; i++) {
            const [pathMeshRef, ballMeshRef, animationRangeEnd, totalTime, endPosX, endPosY, endPosZ] = animationData.current[`pitch${i}`];
            
            if (pathMeshRef.current === null || ballMeshRef.current === null) continue;
            if (animationRangeEnd.current === ANIMATION_RANGE_MAX) continue;
            const timeElapsed = currTime - animationData.current['startClockTime'];
            
            const frameCount = Math.min(Math.round(timeElapsed / totalTime * ANIMATION_FRAMES), ANIMATION_FRAMES)
            animationRangeEnd.current = frameCount * ANIMATION_RANGE_STEP;
            pathMeshRef.current.geometry.setDrawRange(0, animationRangeEnd.current);
            const positionArray = pathMeshRef.current.geometry.attributes.position.array;
            let currPosIndex;
            if (frameCount <= ANIMATION_FRAMES) {
                currPosIndex = positionArray.length / (ANIMATION_FRAMES + 1) * frameCount;
                ballMeshRef.current.position.x = positionArray[currPosIndex];
                ballMeshRef.current.position.y = positionArray[currPosIndex + 1];
                ballMeshRef.current.position.z = positionArray[currPosIndex + 2] - BASEBALL_RADIUS * 0.8;
            } else {
                ballMeshRef.current.position.x = endPosX;
                ballMeshRef.current.position.y = endPosY;
                ballMeshRef.current.position.z = endPosZ;
            }
            
            if (animationRangeEnd.current === ANIMATION_RANGE_MAX) {
                animationData.current['pathsCompleted'] += 1;
            }
        }

        if (animationData.current['pathsCompleted'] === totalPaths) {
            animationData.current['playAnimation'] = false;
            animationData.current['ready'] = false;
            animationData.current['initialLoad'] = false;
        }
        
    })

    return (<>
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
            data['pitchDatas'].map((_, index) => {return(
                <PitchPathModel
                    key={index}
                    index={index}
                    posX={HOME_PLATE_REAR_TO_MOUND_REAR / 2 * -1 + HOME_PLATE_REAR_TO_RELEASE_POINT + cameraOffsetX}
                    posY={GROUND_OFFSET + RELEASE_HEIGHT}
                    posZ={0}
                    animationData={animationData}
                />
            );})
        }
        <mesh position={[0 + cameraOffsetX, 0 + cameraOffsetY - GROUND_OFFSET / 4, 0]}>
            <boxGeometry args={[HOME_PLATE_REAR_TO_MOUND_REAR, TOTAL_HEIGHT * 1.25, TOTAL_HEIGHT]}/>
            <meshPhongMaterial opacity={0} transparent={true} depthWrite={false}/>
            <Edges color={'white'} />
        </mesh>
    </>);
};

export default ModelCanvas;