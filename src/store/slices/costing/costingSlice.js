import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    status: 'ready', //ready , procesing
    cardUsageAccount:[],
    cloudProvider: 'AWS',
    credentialsOk:false,
    alertCredentialsInvalid:'',
    modalCredencialesSave:false,
    credentialToChange:{
        index:null,
        state:false
    },
    dataDashbord:{}
    
}


export const costingSlice= createSlice({
    name: 'costing',
    initialState,
    reducers: {

        processingRequest: (state) => {
            state.status = 'processing';
        },
        readyRequest: (state) => {
            state.status = 'ready';
        },
        getAwsUsage: (state,{payload})=>{
            state.status = 'ready';
            state.cardUsageAccount=payload
        },
        updateProvider: (state,newProvider)=>{
            state.cloudProvider= newProvider.payload
        },

        updateStateCredentials: (state)=>{
            state.credentialsOk = true
            state.status = 'ready';
        },
        resetSateCredentials: (state)=>{
            state.credentialsOk = false
            state.alertCredentialsInvalid=''
            state.status = 'ready';
        },
        updatealertCredentialsInvalidTrue:(state)=>{
            state.alertCredentialsInvalid = true
        },
        updatealertCredentialsInvalidFalse:(state)=>{
            state.alertCredentialsInvalid = false
        },
        updateStateTrueModalCredencialesSave:(state)=>{
            state.modalCredencialesSave = true
        },
        updateStateFalseModalCredencialesSave:(state)=>{
            state.modalCredencialesSave = false
        },
        editCredentials:(state,index)=>{
            state.credentialToChange.state = true
            state.credentialToChange.index = index.payload
        },
        updatecardUsageAccount: (state,{payload})=>{
            
            let body={
                cloudProvider: payload.cloudProvider,
                accountName:payload.accountName,
                accessKeyId : payload.accessKeyId,
                secretAccessKey : payload.secretAccessKey,
            }
            state.cardUsageAccount[payload.index]=body
        },
        getDataDashbord: (state,{payload})=>{
            state.dataDashbord=payload.data
        },
        clearDataDashbord: (state)=>{
            state.dataDashbord={}
        },

        
    }
})


export const {clearDataDashbord,getDataDashbord,updatecardUsageAccount,editCredentials,updateStateFalseModalCredencialesSave,updateStateTrueModalCredencialesSave,processingRequest,getAwsUsage,updateProvider,updateStateCredentials,readyRequest,resetSateCredentials,updatealertCredentialsInvalidTrue,updatealertCredentialsInvalidFalse} = costingSlice.actions
