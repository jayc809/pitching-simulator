import React, { useEffect, useState } from 'react';
import { Edges } from '@react-three/drei';
import { HOME_PLATE_HEIGHT, HOME_PLATE_RECTANGLE_HEIGHT, HOME_PLATE_THICKNESS, HOME_PLATE_WIDTH, PITCHERS_PLATE_TO_MOUND_REAR_FRONT, MOUND_LENGTH, MOUND_REAR_HEIGHT, MOUND_REAR_LENGTH, MOUND_REAR_WIDTH, PITCHERS_PLATE_HEIGHT, PITCHERS_PLATE_THICKNESS, PITCHERS_PLATE_WIDTH, STRIKE_ZONE_HEIGHT, STRIKE_ZONE_THICKNESS, HOME_PLATE_REAR_TO_RELEASE_POINT, BASEBALL_RADIUS, GRAVITY_ACCELERATION, PITCH_INDEX_TO_COLOR, AIR_RESISTANCE_CONSTANT, BASEBALL_MASS } from './Constants';
import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { useDataContext } from './DataProvider';

const StrikeZoneModel = ({ posX, posY, posZ }) => {
    return (
        <>
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
        </>
    );
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

    return (
        <>
            <mesh geometry={moundGeometry} position={[posX, posY, posZ]}>
                <meshPhongMaterial color={'black'}/>
                <Edges color={'white'}/>
            </mesh>
            <mesh position={[posX - MOUND_LENGTH / 2 + (MOUND_LENGTH - MOUND_REAR_LENGTH) + PITCHERS_PLATE_TO_MOUND_REAR_FRONT, posY + MOUND_REAR_HEIGHT, posZ]}>
                <boxGeometry args={[PITCHERS_PLATE_HEIGHT, PITCHERS_PLATE_THICKNESS, PITCHERS_PLATE_WIDTH]}/>
                <meshPhongMaterial color={'white'}/>
                <Edges color={'black'}/>
            </mesh>
        </>
    );
};

const BaseballModel = ({ posX, posY, posZ }) => {
    return (
        <mesh position={[posX, posY, posZ]}>
            <sphereGeometry args={[BASEBALL_RADIUS]}/>
            <meshPhongMaterial color={'white'}/>
        </mesh>
    );
};

const PitchPathModel = ({ index, posX, posY, posZ }) => {
    const {data} = useDataContext();

    const [endPos, setEndPos] = useState([]);
    const [pathCurve, setPathCurve] = useState(null);

    useEffect(() => {
        if (data['pitchDataChanged'] !== index && data['pitchDataChanged'] !== -1) return;

        const [initialVelocityX, initialVelocityY, initialVelocityZ] = getXYZComponents(data['pitchDatas'][index]['velocity'] * 1.609344 * 1000 / 3600, data['pitchDatas'][index]['releaseAngle'][0], data['pitchDatas'][index]['releaseAngle'][1]);

        const averageVelocityZ = getAverageVelocityFromDistance(initialVelocityZ, HOME_PLATE_REAR_TO_RELEASE_POINT) * -1;
        const timeToReachHomePlateRear = HOME_PLATE_REAR_TO_RELEASE_POINT / Math.abs(averageVelocityZ);
        const averageVelocityY = getAverageVelocityFromTime(initialVelocityY, timeToReachHomePlateRear);
        const averageVelocityX = getAverageVelocityFromTime(initialVelocityX, timeToReachHomePlateRear) * -1;
        
        let currPosX = posX;
        let currPosY = posY;
        let currPosZ = posZ;
        const pathPoints = [new THREE.Vector3(currPosX, currPosY, currPosZ)];
        const NUM_PATH_POINTS = 10;
        // const temp = [[currPosX, currPosY, currPosZ]];
        for (let i = 1; i < NUM_PATH_POINTS + 1; i ++) {
            const t = timeToReachHomePlateRear / NUM_PATH_POINTS * i;
            currPosX = posX + averageVelocityZ * t;
            currPosY = posY + averageVelocityY * t - GRAVITY_ACCELERATION * Math.pow(t, 2) / 2;
            currPosZ = posZ + averageVelocityX * t;
            pathPoints.push(new THREE.Vector3(currPosX, currPosY, currPosZ));
            // temp.push([currPosX, currPosY, currPosZ]);
        }
        setEndPos([currPosX, currPosY, currPosZ]);
        setPathCurve(new THREE.CatmullRomCurve3(pathPoints));
    }, [data, posX, posY, posZ]);

    if (pathCurve === null) {
        return (<></>);
    }
    return (
        <>
            <mesh>
                <tubeGeometry args={[pathCurve, 64, BASEBALL_RADIUS * 0.8, 20, false]}/>
                <meshPhongMaterial color={PITCH_INDEX_TO_COLOR[index]} opacity={0.5} transparent={true} depthWrite={false}/>
            </mesh>
            <BaseballModel posX={endPos[0]} posY={endPos[1]} posZ={endPos[2]}/>
            <BaseballModel posX={posX} posY={posY} posZ={posZ}/>
            {/* {
                temp.map(pos => {return <BaseballModel posX={pos[0]} posY={pos[1]} posZ={pos[2]}/>})
            } */}
        </>
    );
};

const getQuadraticSolutions = (a, b, c) => {
    const discriminantRooted = Math.sqrt(Math.pow(b, 2) - (4 * a * c));
    return [(-b + discriminantRooted) / (2 * a), (-b - discriminantRooted) / (2 * a)];
}

const getXYZComponents = (magnitude, xAngle, yAngle) => {
    const xzPlaneProjection = magnitude * Math.cos(yAngle * Math.PI / 180);
    const yzPlaneProjection = magnitude * Math.cos(xAngle * Math.PI / 180);
    const xComponent = xzPlaneProjection * Math.sin(xAngle * Math.PI / 180);
    const yComponent = yzPlaneProjection * Math.sin(yAngle * Math.PI / 180);
    const zComponent = xzPlaneProjection * Math.cos(xAngle * Math.PI / 180);
    return [xComponent, yComponent, zComponent];
}

const getAverageVelocityFromDistance = (initialVelocity, distance) => {
    const airResistanceAcceleration = AIR_RESISTANCE_CONSTANT * Math.pow(initialVelocity, 2) / BASEBALL_MASS;
    const a = airResistanceAcceleration * -1;
    const b = 2 * initialVelocity;
    const c = 2 * distance * -1;
    const timeToReachDistance = Math.min(...getQuadraticSolutions(a, b, c));
    if (timeToReachDistance < 0) {
        alert('Error: Some calculation went wrong');
    }
    const endVelocity = initialVelocity - airResistanceAcceleration * timeToReachDistance;
    const averageVelocity = (initialVelocity + endVelocity) / 2
    return averageVelocity;
}

const getAverageVelocityFromTime = (initialVelocity, time) => {
    const airResistanceAcceleration = AIR_RESISTANCE_CONSTANT * Math.pow(initialVelocity, 2) / BASEBALL_MASS;
    const endVelocity = initialVelocity - airResistanceAcceleration * time;
    const averageVelocity = (initialVelocity + endVelocity) / 2
    return averageVelocity;
}

export { StrikeZoneModel, HomePlateModel, MoundModel, PitchPathModel, BaseballModel };