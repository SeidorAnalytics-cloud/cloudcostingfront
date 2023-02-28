import { clearDataDashbord,processingRequest,getAwsUsage,updateStateCredentials,readyRequest,updatealertCredentialsInvalidTrue,updatealertCredentialsInvalidFalse,updateStateTrueModalCredencialesSave,getDataDashbord,clearDataDistribution,getDataDistrbution } from "./costingSlice"
import { getAwsResults,getConnection,setCredentials,getDataDashbords,updateDataDashbordsFetch,getDataDistributionFetch,setDataDistributionFetch } from "../../../helpers/costing"

//tengo que seguir armando la llamada al back para que llamen a esta funcion desde los componentes y agregar aca todos los dispatch


export const getUsageFromThisMonthAndLast = (body) => {
    return async( dispatch ) => {
        dispatch( processingRequest() )
        
        const respJson = await getAwsResults(body)
        
        dispatch( getAwsUsage(respJson) )
    }
}


export const testConnection = (body)=>{
    return async( dispatch ) => {
        
        dispatch( processingRequest() )
        const respJson = await getConnection(body)
        
        if(respJson.status ==='true'){
            dispatch(updateStateCredentials())
            dispatch(updatealertCredentialsInvalidTrue())
            dispatch(readyRequest())
        }else{
            dispatch(readyRequest())
            dispatch(updatealertCredentialsInvalidFalse())
        }
      
    }
}

export const setNewCredentials = (body)=>{
    return async( dispatch ) => {
        
        dispatch( processingRequest() )
        console.log(body)
        const respJson = await setCredentials(body)
        if(respJson.status === 'true'){

            dispatch(updateStateTrueModalCredencialesSave())
            dispatch(readyRequest())
        }
        else{
            
            dispatch(readyRequest())
        }
        
      
    }
}


export const updateCredentials = (body)=>{
    return async( dispatch,getState ) => {
        
        // dispatch( processingRequest() )


        console.log(body)


        // const respJson = await setCredentials(data)
        // if(respJson.status === 'true'){
        //     dispatch(updateStateTrueModalCredencialesSave())
        // }
        // else{
            
        //     dispatch(readyRequest())
        // }
        
      
    }
}

//trae la data desde la db y la carga en el initalState
export const getDataforDashbords = (body)=>{
    return async( dispatch ) => {
        
        dispatch( processingRequest() )
        const respJson = await getDataDashbords(body)
        dispatch(getDataDashbord(respJson))
        dispatch(readyRequest())
    }
}

//esto solo hace un evio cuando se quiere recargar la inforamcion desde a aws a la db
export const updateDataforDashbords = (body)=>{
    return async( dispatch ) => {
        
        dispatch( processingRequest() )
        
        const respJson = await updateDataDashbordsFetch(body)
        if(respJson.status === 'true'){
            dispatch(clearDataDashbord())
            console.log('true')
            const respJson = await getDataDashbords(body)
            dispatch(getDataDashbord(respJson))
            dispatch(readyRequest())
        }
        else{
            
            console.log('nada')
        }
    }
}


export const getDataforDistribution = (body)=>{
    return async( dispatch ) => {
        
        dispatch( processingRequest() )
        
        const respJson = await getDataDistributionFetch(body)
        if(respJson.status === 'true'){
            dispatch(clearDataDistribution())
            console.log('true')
            const respJson = await getDataDistributionFetch(body)
            dispatch(getDataDistrbution(respJson))
            dispatch(readyRequest())
        }
        else{
            
            console.log('nada')
        }
    }
}


export const setDataforDistribution = (body)=>{
    return async( dispatch ) => {
        
        dispatch( processingRequest() )
        
        const respJson = await setDataDistributionFetch(body)
        if(respJson.status === 'true'){
            dispatch(clearDataDistribution())
            console.log('true')
            const respJson = await getDataDistributionFetch(body)
            dispatch(getDataDistrbution(respJson))
            dispatch(readyRequest())
        }
        else{
            
            console.log('nada')
        }
    }
}