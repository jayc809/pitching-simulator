import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_DATA } from './Constants';

const DataContext = createContext()

const useDataContext = () => {
    return useContext(DataContext);
}

const DataProvider = ({ children }) => {
    const [data, setData] = useState({...DEFAULT_DATA});
    const [showPitchAnnotation, setShowPitchAnnotation] = useState(null);
    
    return (
        <DataContext.Provider value={{data, setData, showPitchAnnotation, setShowPitchAnnotation}}>
            { children }
        </DataContext.Provider>
    );
};

export { useDataContext };

export default DataProvider;