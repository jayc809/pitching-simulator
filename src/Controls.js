import React from 'react';
import { useDataContext } from './DataProvider';
import PitchModal from './PitchModal';

const Controls = () => {
    const {data, setData} = useDataContext();

    const onAddPitch = () => {
        const dataCopy = {...data};
        dataCopy['pitchDatas'].push({velocity: 100, spinRate: 2300, spinAxis: 180, releaseDirection: [0, 0], pitchType: '4-Seam Fastball'});
        setData(dataCopy);
    };

    return (
        <div style={{height: '100%', width: '100%', backgroundColor: 'black', boxSizing: 'border-box', padding: '30px 20px'}}>
            <div style={{height: '100%', width: '100%', overflowY: 'scroll', overflowX: 'scroll'}}>
                <ul style={{padding: 0, margin: 0}}>
                    { data['pitchDatas'].map((_, index) => {return <PitchModal key={index} index={index}/>}) }
                    <br></br>
                    <br></br>
                    <button onClick={onAddPitch} style={{color: 'white', backgroundColor: 'black', border: '1px solid white', borderRadius: '5px', padding: '10px'}}>Add Pitch</button> 
                </ul>
            </div>
        </div>
    );
};

export default Controls;