import { fetchBackend } from "./fetch";


export const getAwsResults = async(body) => {
    const resp = await fetchBackend('aws/differencepermonth', body ,'POST')
    const respJson =  resp.json()
    return respJson

}

export const getConnection = async(body) =>{
    const resp = await fetchBackend('aws/testcredentials',body , 'POST')
    const respJson =  resp.json()
    return respJson
}

export const setCredentials = async(body) =>{
    const resp = await fetchBackend('aws/setnewcredentials',body , 'POST')
    const respJson =  resp.json()
    return respJson
}

export const updateCredentials = async(body) =>{
    const resp = await fetchBackend('aws/updatecredentials',body , 'POST')
    const respJson =  resp.json()
    return respJson
}


export const getDataDashbords = async(body) =>{
    const resp = await fetchBackend('aws/getyearlydata',body, 'POST')
    const respJson =  resp.json()
    return respJson
}

export const updateDataDashbordsFetch = async(body) =>{
    const resp = await fetchBackend('aws/setyearlycost',body, 'POST')
    const respJson =  resp.json()
    return respJson
}
