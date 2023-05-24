import React from 'react';
import { useDataContext } from './DataProvider';
import PitchModal from './PitchModal';
import { PITCH_TYPE_TO_BASE_DATA } from './Constants';

const Controller = () => {
    const {data, setData} = useDataContext();

    const onAddPitchClick = () => {
        if (data['pitchDatas'].length === 10) return;
        const dataCopy = {...data};
        dataCopy['pitchDatas'].push({...PITCH_TYPE_TO_BASE_DATA['4SB'], isDefault: false});
        dataCopy['pitchDataChanged'] = dataCopy['pitchDatas'].length - 1;
        setData(dataCopy);
        setTimeout(() => {
            document.getElementById(`pitch-modal-${dataCopy['pitchDatas'].length - 1}`).scrollIntoView();
        }, 500);
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
                </div>
            </div>
        </div>
    );
};

export default Controller;