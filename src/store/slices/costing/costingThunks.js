import { processingRequest,getAwsUsage,updateStateCredentials,readyRequest,updatealertCredentialsInvalidTrue,updatealertCredentialsInvalidFalse,updateStateTrueModalCredencialesSave,getDataDashbord } from "./costingSlice"
import { getAwsResults,getConnection,setCredentials,getDataDashbords } from "../../../helpers/costing"

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
        }else{
            dispatch(readyRequest())
            dispatch(updatealertCredentialsInvalidFalse())
        }
      
    }
}

export const setNewCredentials = (body)=>{
    return async( dispatch ) => {
        
        dispatch( processingRequest() )
        const respJson = await setCredentials(body)
        if(respJson.status === 'true'){
            dispatch(updateStateTrueModalCredencialesSave())
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


export const getDataforDashbords = (body)=>{
    return async( dispatch ) => {
        
        dispatch( processingRequest() )
        const respJson = await getDataDashbords(body)
        dispatch(getDataDashbord(respJson))
        
      
    }
}
