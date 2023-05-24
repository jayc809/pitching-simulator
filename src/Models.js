import React, { useEffect, useRef, useState } from 'react';
import { Edges } from '@react-three/drei';
import { HOME_PLATE_HEIGHT, HOME_PLATE_RECTANGLE_HEIGHT, HOME_PLATE_THICKNESS, HOME_PLATE_WIDTH, PITCHERS_PLATE_TO_MOUND_REAR_FRONT, MOUND_LENGTH, MOUND_REAR_HEIGHT, MOUND_REAR_LENGTH, MOUND_REAR_WIDTH, PITCHERS_PLATE_HEIGHT, PITCHERS_PLATE_THICKNESS, PITCHERS_PLATE_WIDTH, STRIKE_ZONE_HEIGHT, STRIKE_ZONE_THICKNESS, HOME_PLATE_REAR_TO_RELEASE_POINT, BASEBALL_RADIUS, GRAVITY_ACCELERATION, PITCH_TYPE_TO_COLOR, AIR_RESISTANCE_CONSTANT, BASEBALL_MASS, RADIANS_PER_SECOND_TO_RPM, AIR_DENSITY, BASEBALL_CROSS_SECTION, PITCH_TYPE_TO_MAGNUS_EFFECT_FACTOR, ANIMATION_FRAMES } from './Constants';
import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { useDataContext } from './DataProvider';

const StrikeZoneModel = ({ posX, posY, posZ }) => {
    return (<>
        <mesh position={[posX, posY + STRIKE_ZONE_HEIGHT / 3, posZ + HOME_PLATE_WIDTH / 3]}>
            <boxGeometry args={[STRIKE_ZONE_THICKNESS, STRIKE_ZONE_HEIGHT / 3, HOME_PLATE_WIDTH / 3]}/>
            <meshPhongMaterial opacity={0} transparent={true}/>
            <Edges color={'white'}/>
        </mesh>
        <mesh position={[posX, posY + STRIKE_ZONE_HEIGHT / 3, posZ]}>
            <boxGeometry args={[STRIKE_ZONE_THICKNESS, STRIKE_ZONE_HEIGHT / 3, HOME_PLATE_WIDTH / 3]}/>
            <meshPhongMaterial opacity={0} transparent={true}/>
            <Edges color={'white'}/>
        </mesh>
        <mesh position={[posX, posY + STRIKE_ZONE_HEIGHT / 3, posZ - HOME_PLATE_WIDTH / 3]}>
            <boxGeometry args={[STRIKE_ZONE_THICKNESS, STRIKE_ZONE_HEIGHT / 3, HOME_PLATE_WIDTH / 3]}/>
            <meshPhongMaterial opacity={0} transparent={true}/>
            <Edges color={'white'}/>
        </mesh>
        <mesh position={[posX, posY, posZ + HOME_PLATE_WIDTH / 3]}>
            <boxGeometry args={[STRIKE_ZONE_THICKNESS, STRIKE_ZONE_HEIGHT / 3, HOME_PLATE_WIDTH / 3]}/>
            <meshPhongMaterial opacity={0} transparent={true}/>
            <Edges color={'white'}/>
        </mesh>
        <mesh position={[posX, posY, posZ]}>
            <boxGeometry args={[STRIKE_ZONE_THICKNESS, STRIKE_ZONE_HEIGHT / 3, HOME_PLATE_WIDTH / 3]}/>
            <meshPhongMaterial opacity={0} transparent={true}/>
            <Edges color={'white'}/>
        </mesh>
        <mesh position={[posX, posY, posZ - HOME_PLATE_WIDTH / 3]}>
            <boxGeometry args={[STRIKE_ZONE_THICKNESS, STRIKE_ZONE_HEIGHT / 3, HOME_PLATE_WIDTH / 3]}/>
            <meshPhongMaterial opacity={0} transparent={true}/>
            <Edges color={'white'}/>
        </mesh>
        <mesh position={[posX, posY - STRIKE_ZONE_HEIGHT / 3, posZ + HOME_PLATE_WIDTH / 3]}>
            <boxGeometry args={[STRIKE_ZONE_THICKNESS, STRIKE_ZONE_HEIGHT / 3, HOME_PLATE_WIDTH / 3]}/>
            <meshPhongMaterial opacity={0} transparent={true}/>
            <Edges color={'white'}/>
        </mesh>
        <mesh position={[posX, posY - STRIKE_ZONE_HEIGHT / 3, posZ]}>
            <boxGeometry args={[STRIKE_ZONE_THICKNESS, STRIKE_ZONE_HEIGHT / 3, HOME_PLATE_WIDTH / 3]}/>
            <meshPhongMaterial opacity={0} transparent={true}/>
            <Edges color={'white'}/>
        </mesh>
        <mesh position={[posX, posY - STRIKE_ZONE_HEIGHT / 3, posZ - HOME_PLATE_WIDTH / 3]}>
            <boxGeometry args={[STRIKE_ZONE_THICKNESS, STRIKE_ZONE_HEIGHT / 3, HOME_PLATE_WIDTH / 3]}/>
            <meshPhongMaterial opacity={0} transparent={true}/>
            <Edges color={'white'}/>
        </mesh>
    </>);
};

const HomePlateModel = ({ posX, posY, posZ }) => {
    const homePlateShape = new THREE.Shape();
    homePlateShape.moveTo(HOME_PLATE_WIDTH / 2 * -1, HOME_PLATE_HEIGHT / 2);
    homePlateShape.lineTo(HOME_PLATE_WIDTH / 2, HOME_PLATE_HEIGHT / 2);
    homePlateShape.lineTo(HOME_PLATE_WIDTH / 2, HOME_PLATE_HEIGHT / 2 - HOME_PLATE_RECTANGLE_HEIGHT);
    homePlateShape.lineTo(0, HOME_PLATE_HEIGHT / 2 * -1);
    homePlateShape.lineTo(HOME_PLATE_WIDTH / 2 * -1, HOME_PLATE_HEIGHT / 2 - HOME_PLATE_RECTANGLE_HEIGHT);
    homePlateShape.moveTo(HOME_PLATE_WIDTH / 2 * -1, HOME_PLATE_HEIGHT / 2);

    const extrudeSettings = { depth: HOME_PLATE_THICKNESS, bevelEnabled: false};

    return (
        <>
            <mesh position={[posX, posY + HOME_PLATE_THICKNESS / 2, posZ]} rotation={[Math.PI / 2, 0, Math.PI / 2 * -1]}>
                <extrudeGeometry args={[homePlateShape, extrudeSettings]}/>
                <meshPhongMaterial color={'white'}/>
                <Edges color={'black'}/>
            </mesh>
        </>
    );
};

const MoundModel = ({ posX, posY, posZ }) => {
    const moundVertices = [
        new THREE.Vector3(MOUND_LENGTH / 2, 0, MOUND_REAR_WIDTH / 2 * -1),
        new THREE.Vector3(MOUND_LENGTH / 2, 0, MOUND_REAR_WIDTH / 2),
        new THREE.Vector3(MOUND_LENGTH / 2 * -1, 0, MOUND_REAR_WIDTH / 2),
        new THREE.Vector3(MOUND_LENGTH / 2 * -1, 0, MOUND_REAR_WIDTH / 2 * -1),
        new THREE.Vector3(MOUND_LENGTH / 2, 0, MOUND_REAR_WIDTH / 2 * -1),
        new THREE.Vector3(MOUND_LENGTH / 2, MOUND_REAR_HEIGHT, MOUND_REAR_WIDTH / 2 * -1),
        new THREE.Vector3(MOUND_LENGTH / 2, MOUND_REAR_HEIGHT, MOUND_REAR_WIDTH / 2),
        new THREE.Vector3(MOUND_LENGTH / 2 - MOUND_REAR_LENGTH, MOUND_REAR_HEIGHT, MOUND_REAR_WIDTH / 2),
        new THREE.Vector3(MOUND_LENGTH / 2 - MOUND_REAR_LENGTH, MOUND_REAR_HEIGHT, MOUND_REAR_WIDTH / 2 * -1)
    ];
    const moundGeometry = new ConvexGeometry(moundVertices);

    return (<>
        <mesh geometry={moundGeometry} position={[posX, posY, posZ]}>
            <meshPhongMaterial color={'black'}/>
            <Edges color={'white'}/>
        </mesh>
        <mesh position={[posX - MOUND_LENGTH / 2 + (MOUND_LENGTH - MOUND_REAR_LENGTH) + PITCHERS_PLATE_TO_MOUND_REAR_FRONT, posY + MOUND_REAR_HEIGHT, posZ]}>
            <boxGeometry args={[PITCHERS_PLATE_HEIGHT, PITCHERS_PLATE_THICKNESS, PITCHERS_PLATE_WIDTH]}/>
            <meshPhongMaterial color={'white'}/>
            <Edges color={'black'}/>
        </mesh>
    </>);
};

const PitchPathModel = ({ index, posX, posY, posZ, animationData }) => {
    const {data, setData, setShowPitchAnnotation} = useDataContext();
    const [pathCurve, setPathCurve] = useState(null);
    const [ballPos, setBallPos] = useState([0, 0, 0]);
    const pathMeshRef = useRef(null);
    const ballMeshRef = useRef(null);
    const animationRangeEnd = useRef(0);

    useEffect(() => {
        if (data['pitchDataChanged'] !== index && data['pitchDataChanged'] !== -1) return;

        const releaseVelocity = data['pitchDatas'][index]['velocity'] * 1.609344 * 1000 / 3600;
        const releaseAngleX = data['pitchDatas'][index]['releaseAngle'][0] * Math.PI / 180;
        const releaseAngleY = data['pitchDatas'][index]['releaseAngle'][1] * Math.PI / 180;
        const spinAxis = (data['pitchDatas'][index]['spinAxis'] + 270) * Math.PI / 180;
        const [initialVelocityZ, initialVelocityY, initialVelocityX] = getXYZComponents(releaseVelocity, releaseAngleX, releaseAngleY);
        const activeSpinRate = data['pitchDatas'][index]['spinRate'] * data['pitchDatas'][index]['activeSpin'] / 100 * RADIANS_PER_SECOND_TO_RPM;

        const pathPoints = [new THREE.Vector3(posX, posY, posZ)];
        let currPosX = posX;
        let currPosY = posY;
        let currPosZ = posZ;
        let currVelocityX = initialVelocityX * -1;
        let currVelocityY = initialVelocityY;
        let currVelocityZ = initialVelocityZ * -1;
        let timeElapsed = 0;
        const timeDelta = 0.01;
        let prevPosX, prevPosY, prevPosZ;
        
        let loopCounter = 0;
        while (currPosX > posX - HOME_PLATE_REAR_TO_RELEASE_POINT + HOME_PLATE_HEIGHT) {
            if (loopCounter > 300) {
                alert("Error: Too many loops");
                break;
            }

            prevPosX = currPosX;
            prevPosY = currPosY;
            prevPosZ = currPosZ;

            // gravity
            currVelocityY += GRAVITY_ACCELERATION * timeDelta * -1;

            // magnus effect
            const currVelocity = Math.sqrt(Math.pow(currVelocityX, 2) + Math.pow(currVelocityY, 2) + Math.pow(currVelocityZ, 2));
            const magnusCoefficient = 0.358 * (1 - Math.pow(Math.E, -0.00248 * activeSpinRate));
            const magnusAcceleration = 1 / 2 * AIR_DENSITY * BASEBALL_CROSS_SECTION * magnusCoefficient * Math.pow(currVelocity, 2) / BASEBALL_MASS;
            const magnusAccelerationZComponent = magnusAcceleration * Math.cos(spinAxis) * PITCH_TYPE_TO_MAGNUS_EFFECT_FACTOR[data['pitchDatas'][index]['pitchType']][0];
            const magnusAccelerationYComponent = magnusAcceleration * Math.sin(spinAxis) * PITCH_TYPE_TO_MAGNUS_EFFECT_FACTOR[data['pitchDatas'][index]['pitchType']][1];
            currVelocityY += magnusAccelerationYComponent * timeDelta;
            currVelocityZ += magnusAccelerationZComponent * timeDelta;

            // air resistance
            currVelocityX += (currVelocityX > 0 ? -1 : 1) * getAirResistanceAcceleration(currVelocityX) * timeDelta / 2;
            currVelocityY += (currVelocityY > 0 ? -1 : 1) * getAirResistanceAcceleration(currVelocityY) * timeDelta / 2;
            currVelocityZ += (currVelocityZ > 0 ? -1 : 1) * getAirResistanceAcceleration(currVelocityZ) * timeDelta / 2;

            currPosX += currVelocityX * timeDelta;
            currPosY += currVelocityY * timeDelta;
            currPosZ += currVelocityZ * timeDelta;
            pathPoints.push(new THREE.Vector3(currPosX, currPosY, currPosZ));

            timeElapsed += timeDelta;
            loopCounter += 1;
        }

        // fix last point
        const ratio = (prevPosX - (posX - HOME_PLATE_REAR_TO_RELEASE_POINT + HOME_PLATE_HEIGHT)) / (prevPosX - currPosX);
        currPosX = prevPosX + (currVelocityX > 0 ? 1 : -1) * ratio * Math.abs(Math.abs(prevPosX) - Math.abs(currPosX));
        currPosY = prevPosY + (currVelocityY > 0 ? 1 : -1) * ratio * Math.abs(Math.abs(prevPosY) - Math.abs(currPosY));
        currPosZ = prevPosZ + (currVelocityZ > 0 ? 1 : -1) * ratio * Math.abs(Math.abs(prevPosZ) - Math.abs(currPosZ));
        pathPoints[pathPoints.length - 1] = new THREE.Vector3(currPosX, currPosY, currPosZ);
        timeElapsed -= timeDelta * (1 - ratio);

        const dataCopy = {...data};
        const normalEndPosZ = posZ + HOME_PLATE_REAR_TO_RELEASE_POINT * Math.sin(releaseAngleX) * -1;
        const normalEndPosY = posY + HOME_PLATE_REAR_TO_RELEASE_POINT * Math.sin(releaseAngleY);
        data['pitchDatas'][index]['horizontalBreak'] = Math.round((currPosZ - normalEndPosZ) * 1000 / 2.54) / 10;
        data['pitchDatas'][index]['verticalBreak'] = Math.round((currPosY - normalEndPosY) * 1000 / 2.54) / 10;
        data['pitchDatas'][index]['hitterReactionTime'] = Math.round((timeElapsed - 0.2) * 1000) / 1000;

        dataCopy['pitchDataChanged'] = -2;
        setData(dataCopy);
        
        animationData.current[`pitch${index}`] = [pathMeshRef, ballMeshRef, animationRangeEnd, timeElapsed, currPosX, currPosY, currPosZ];

        setBallPos([currPosX, currPosY, currPosZ]);
        setPathCurve(new THREE.CatmullRomCurve3(pathPoints));
    }, [data, index, posX, posY, posZ]);

    const onPointerEnter = (e) => {
        setShowPitchAnnotation([index, e.x, e.y]);
    }

    const onPointerLeave = () => {
        setShowPitchAnnotation(null);
    }

    if (pathCurve === null) {
        return (<></>);
    }
    return (<>
        <mesh ref={pathMeshRef} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
            <tubeGeometry args={[pathCurve, ANIMATION_FRAMES, BASEBALL_RADIUS * 0.8, 8, false]}/>
            <meshPhongMaterial color={PITCH_TYPE_TO_COLOR[data['pitchDatas'][index]['pitchType']]} opacity={data['pitchDataSelected'] === index ? 1 : 0.5} transparent={true} depthWrite={false}/>
        </mesh>
        <mesh ref={ballMeshRef} position={ballPos} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
            <sphereGeometry args={[BASEBALL_RADIUS]}/>
            <meshPhongMaterial color={'white'}/>
        </mesh>
        {
            index === 0 ?
            <mesh position={[posX, posY, posZ]}>
                <sphereGeometry args={[BASEBALL_RADIUS]}/>
                <meshPhongMaterial color={'white'}/>
            </mesh> :
            <></>
        }
    </>);
};

const getXYZComponents = (magnitude, xAngle, yAngle) => {
    const xzPlaneProjection = magnitude * Math.cos(yAngle);
    const yzPlaneProjection = magnitude * Math.cos(xAngle);
    const xComponent = xzPlaneProjection * Math.sin(xAngle);
    const yComponent = yzPlaneProjection * Math.sin(yAngle);
    const zComponent = xzPlaneProjection * Math.cos(xAngle);
    return [xComponent, yComponent, zComponent];
};

const getAirResistanceAcceleration = (velocity) => {
    return AIR_RESISTANCE_CONSTANT * Math.pow(velocity, 2) / BASEBALL_MASS;
};

export { StrikeZoneModel, HomePlateModel, MoundModel, PitchPathModel };