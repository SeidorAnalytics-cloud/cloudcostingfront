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