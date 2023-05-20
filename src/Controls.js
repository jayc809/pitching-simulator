import React from 'react';
import { useDataContext } from './DataProvider';
import PitchModal from './PitchModal';

const Controls = () => {
    const {data, setData} = useDataContext();

    const onAddPitchClick = () => {
        const dataCopy = {...data};
        dataCopy['pitchDatas'].push({velocity: 100, spinRate: 2300, spinAxis: 180, activeSpin: 100, releaseAngle: [0, 0], pitchType: '4SB'});
        setData(dataCopy);
    };

    const onSettingsClick = () => {

    };

    return (
        <div style={{height: '100%', width: '100%', backgroundColor: 'black', boxSizing: 'border-box', padding: '30px 20px'}}>
            <div style={{height: '90%', width: '100%', overflowY: 'scroll', overflowX: 'scroll'}}>
                <ul style={{padding: 0, margin: 0}}>
                    { data['pitchDatas'].map((_, index) => {return <PitchModal key={index} index={index}/>}) }
                    <br></br>
                    <br></br>
                </ul>
            </div>
            <div style={{height: '10%', width: '100%'}}>
                <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <button onClick={onAddPitchClick} style={{color: 'white', backgroundColor: 'black', border: '1px solid white', borderRadius: '5px', padding: '10px'}}>Add Pitch</button> 
                    <button onClick={onSettingsClick} style={{color: 'white', backgroundColor: 'black', border: '1px solid white', borderRadius: '5px', padding: '10px'}}>Settings</button> 
                </div>
            </div>
        </div>
    );
};

export default Controls;