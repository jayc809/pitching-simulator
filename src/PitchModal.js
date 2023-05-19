import React, { useEffect } from 'react';
import { PITCH_INDEX_TO_COLOR } from './Constants';
import { useDataContext } from './DataProvider';
import spinAxisIcon from './static/spin-axis-icon.png'
import releaseDirectionIcon from './static/release-direction-icon.png'

const PitchModal = ({ index }) => {
    const {data, setData} = useDataContext();
    const pitchData = data['pitchDatas'][index];

    useEffect(() => {
        if (index === data['pitchDatas'].length - 1) {
            const pitchModal = document.getElementById(`pitch-modal-${index}`);
            pitchModal.scrollIntoView();
        };
    }, []);

    const onDeleteClick = () => {
        const dataCopy = {...data};
        dataCopy['pitchDatas'].splice(index, 1);
        setData(dataCopy);
    };

    const onVelocityChange = (e) => {
        const dataCopy = {...data};
        dataCopy['pitchDatas'][index]['velocity'] = Number(e.target.value);
        setData(dataCopy);
    };

    const onSpinRateChange = (e) => {
        const dataCopy = {...data};
        dataCopy['pitchDatas'][index]['spinRate'] = Number(e.target.value);
        setData(dataCopy);
    };

    const onPitchTypeChange = (e) => {
        const dataCopy = {...data};
        dataCopy['pitchDatas'][index]['pitchType'] = e.target.value;
        setData(dataCopy);
    }

    const onPitchTypeBlur = (e) => {
        e.target.value = '';
    }

    return (
        <div id={`pitch-modal-${index}`} style={{width: '100%'}}>
            {
                index === 0 ? 
                <></> : 
                <><br></br><br></br></>
            }
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>    
                <div style={{width: '25%', display: 'flex', justifyContent: 'right'}}>
                    <div style={{height: '12px', aspectRatio: 1, backgroundColor: PITCH_INDEX_TO_COLOR[index]}}></div>
                </div>
                <div>
                    <h3 style={{margin: 'auto'}}>{`Pitch ${index + 1}`}</h3>
                </div>
                <div style={{width: '25%', display: 'flex', justifyContent: 'left'}}>
                    <button style={{height: '20px', aspectRatio: 1}} className='trash-icon' onClick={onDeleteClick}></button>
                </div>
            </div>
            <br></br>
            <table style={{margin: 'auto', borderSpacing: '0'}}>
                <tbody>
                    <tr>
                        <td>
                            <h5>Velocity</h5>
                        </td>
                        <td>
                            <h5>{`${pitchData['velocity']} mph`}</h5>
                        </td>
                        <td>
                            <input type='range' min={60} max={110} step={1} defaultValue={pitchData['velocity']} onChange={onVelocityChange} style={{width: '95%'}}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Spin Rate</h5>
                        </td>
                        <td>
                            <h5>{`${pitchData['spinRate']} rpm`}</h5>
                        </td>
                        <td>
                            <input type='range' min={0} max={3500} step={50} defaultValue={pitchData['spinRate']} onChange={onSpinRateChange} style={{width: '95%'}}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Spin Axis</h5>
                        </td>
                        <td>
                            <h5>{`${pitchData['spinAxis']}°`}</h5>
                        </td>
                        <td style={{display: 'flex', justifyContent: 'center'}}>
                            <div style={{height: '4vw', margin: '10px 0', aspectRatio: 5/4}}>    
                                <SpinAxisModal data={data} setData={setData} index={index}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Release Direction</h5>
                        </td>
                        <td>
                            <h5>{`x: ${pitchData['releaseDirection'][0]}°`}<br></br>{`y: ${pitchData['releaseDirection'][1]}°`}</h5>
                        </td>
                        <td style={{display: 'flex', justifyContent: 'center'}}>
                            <div style={{height: '5vw', margin: 0, aspectRatio: 1}}>
                                <ReleaseDirectionModal data={data} setData={setData} index={index}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Pitch Type</h5>
                        </td>
                        <td>
                            <h5>{pitchData['pitchType']}</h5>
                        </td>
                        <td>
                            <input type='text' style={{width: '90%'}} onBlur={onPitchTypeBlur} onChange={onPitchTypeChange} placeholder='Type here'></input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const SpinAxisModal = ({ data, setData, index }) => {
    const pitchData = data['pitchDatas'][index];
    
    const onSpinAxisChange = (e) => {
        const dataCopy = {...data};
        dataCopy['pitchDatas'][index]['spinAxis'] = Number(e.target.value);
        setData(dataCopy);
    };

    return (
        <div style={{height: '100%', width: '100%'}}>
            <div style={{height: '100%', width: '100%', display: 'flex'}}>
                <div style={{height: '100%', width: '80%'}}>
                    <img style={{height: '100%', width: '100%', transform: `rotate(${data['pitchDatas'][index]['spinAxis'] - 180}deg)`}} src={spinAxisIcon} alt='spinAxisIcon'></img>
                </div>
                <div style={{height: '100%', width: '20%'}}>
                    <div style={{height: '20%', width: '400%', transform: 'rotate(270deg)', transformOrigin: 'top left', marginTop: '400%', marginLeft: '-30%'}}>
                        <input type='range' min={0} max={359} step={1} defaultValue={pitchData['spinAxis'][0]} onChange={onSpinAxisChange} style={{width: '95%'}}></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReleaseDirectionModal = ({ data, setData, index }) => {
    const pitchData = data['pitchDatas'][index];
    const onReleaseDirectionChange = (e) => {
        const input = e.target;
        const dataCopy = {...data};
        if (input.className === 'release-direction-x') {
            dataCopy['pitchDatas'][index]['releaseDirection'][0] = Number(e.target.value);
        } else {
            dataCopy['pitchDatas'][index]['releaseDirection'][1] = Number(e.target.value);
        }
        setData(dataCopy);
    };

    return (
        <div style={{height: '100%', width: '100%'}}>
            <div style={{height: '80%', width: '100%', display: 'flex'}}>
                <div style={{height: '100%', width: '80%', transform: `rotateX(${40 - data['pitchDatas'][index]['releaseDirection'][1] * 5}deg) rotateZ(${data['pitchDatas'][index]['releaseDirection'][0] * 5}deg)`}}>
                    <img style={{height: '100%', width: '100%', }} src={releaseDirectionIcon} alt='releaseDirectionIcon'></img>
                </div>
                <div style={{height: '100%', width: '20%'}}>
                    <div style={{height: '20%', width: '400%', transform: 'rotate(270deg)', transformOrigin: 'top left', marginTop: '400%', marginLeft: '-30%'}}>
                        <input className='release-direction-y' type='range' min={-5} max={5} step={0.1} defaultValue={pitchData['releaseDirection'][0]} onChange={onReleaseDirectionChange} style={{width: '95%'}}></input>
                    </div>
                </div>
            </div>
            <div style={{height: '20%', width: '80%', display: 'flex'}}>
                <input className='release-direction-x' type='range' min={-5} max={5} step={0.1} defaultValue={pitchData['releaseDirection'][1]} onChange={onReleaseDirectionChange} style={{width: '95%'}}></input> 
            </div>
        </div>
    );
};

export default PitchModal;