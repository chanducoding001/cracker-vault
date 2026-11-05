import React, { useContext, useEffect } from 'react'
import { baseUrlInstance } from '../app/baseUrlInstance';
import { crackersContext, loadingStates } from '../app/contextApi';
import ReusableTable from '../reusables/ReusableTable';

const DisplayCrackersData = () => {
    const {state, dispatch} = useContext(crackersContext);
    const {getCrackersData} = state;

    const fetchCrackersData = async () => {
        try{
            const response = await baseUrlInstance.get(import.meta.env.VITE_GET_UPLOADED_CSV_DATA_URL);
            if (response.status === 200) {
                const data = response?.data;
                console.log('Crackers data:', data);
                const payload = {
                    loading: loadingStates.fulfilled,
                    data: data,
                    error: null,
                }
                dispatch({ type: "SET_CRACKERS_DATA", payload: payload });
            }else{
                console.error('Failed to fetch crackers data. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching crackers data:', error);
            const payload = {
                loading: loadingStates.rejected,
                data: [],
                error: error.message,
            };
            dispatch({ type: "SET_CRACKERS_DATA", payload: payload });
        }
    };
    useEffect(() => {
        // console.log("outside crackers",getCrackersData);
        if(getCrackersData?.loading===loadingStates.idle){
            // console.log("inside crackers");
            
            fetchCrackersData();
        }
    }, [getCrackersData?.loading]); // Fetch data when loading state changes
  return (

    <>
        <ReusableTable
        excludedColumns={getCrackersData?.data?.columns?.emptyColumns || []} 
        defaultSelectedColumns={getCrackersData?.data?.columns?.dataColumns ||[]}
        data={getCrackersData?.data?.data || []}
        />
    </>
  )
}

export default DisplayCrackersData;
