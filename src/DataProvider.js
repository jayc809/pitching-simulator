import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext()

const useDataContext = () => {
    return useContext(DataContext);
}

const DataProvider = ({ children }) => {
    const [data, setData] = useState({pitchDatas: [
        {velocity: 100, spinRate: 2300, spinAxis: 180, releaseDirection: [0, 0], pitchType: '4-Seam Fastball'},
    ]});
    
    return (
        <DataContext.Provider value={{data, setData}}>
            { children }
        </DataContext.Provider>
    );
};

export { useDataContext };

export default DataProvider;