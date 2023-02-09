import {React, useState} from "react"
import { Link } from 'react-router-dom';
import {Form,Button,Spinner,Alert,Modal} from 'react-bootstrap'
import Card from "../../components/Card"
import { useSelector,useDispatch } from 'react-redux';
import { updateProvider,resetSateCredentials,updateStateFalseModalCredencialesSave,updatecardUsageAccount } from "../../store/slices/costing/costingSlice";
import { testConnection,setNewCredentials,updateCredentials } from "../../store/slices/costing/costingThunks";




const Accounts = ()=>{

    

    const {cloudProvider,status,credentialsOk,alertCredentialsInvalid,modalCredencialesSave,credentialToChange,cardUsageAccount} = useSelector( state => state.costing )

    const dispatch = useDispatch();

    const[classInvalidAccessKey,setClassInvalidAccessKey] = useState(true);

    const[classInvalidSecretKey,setClassSecretKey] = useState(true);
    
    const[stateinputAccountName,setstateinputAccountName] = useState(true);
    

    const[submitButton,setsubmitButton] = useState(false);
    
    const handleChange = (event) => {
        
        dispatch(updateProvider(event.target.value));
      };

    
    

    const handleSubmit = () => {

        let cloudProviderElement = document.getElementById('cloudProviderSelect').value

        if(cloudProviderElement==='AWS'){
            const body={
             cloudProvider: cloudProviderElement,
             accountName:document.getElementById('inputAccountName').value,
             accessKeyId : document.getElementById('inputAccesKeyId').value,
             secretAccessKey : document.getElementById('inputSecretAccessKey').value,
            }

            const bodyJson = JSON.stringify(body)
            dispatch( setNewCredentials(bodyJson) )
            handleCancel()
        }

    }



//ver como hacer de que el estado se actualize antes de enviarlo
    const handleUpdate =async  () => {
        let cloudProviderElement = document.getElementById('cloudProviderSelect').value

        if(cloudProviderElement==='AWS'){
            const body={
             cloudProvider: cloudProviderElement,
             accountName:document.getElementById('inputAccountName').value,
             accessKeyId : document.getElementById('inputAccesKeyId').value,
             secretAccessKey : document.getElementById('inputSecretAccessKey').value,
             index:credentialToChange.index
            }

            //esto cuando llegue el momento hay que pasarle el id del tenant, por ahora solo harcodeado
            dispatch(updatecardUsageAccount(body))
           
            
           
            // dispatch( updateCredentials(cardUsageAccount) )
            // dispatch( setNewCredentials(bodyJson) )
            // handleCancel()
        }
    }

    const pruebaFuncion = ()=>{

        dispatch( updateCredentials(cardUsageAccount) )
    }




    const handleTestConnection= ()=>{
        
       
        const inputAccesKeyId = document.getElementById("inputAccesKeyId").value
        const inputSecretAccessKey = document.getElementById("inputSecretAccessKey").value;
        const inputAccountName= document.getElementById("inputAccountName").value;
        

            if (inputAccesKeyId && inputSecretAccessKey && inputAccountName) {
                setClassInvalidAccessKey(true)
                setClassSecretKey(true)
                setstateinputAccountName(true)
                let accessKeyId=document.getElementById("inputAccesKeyId").value
                let secretAccessKey = document.getElementById('inputSecretAccessKey').value
                const body = {accessKeyId,secretAccessKey}
                
                dispatch(testConnection(body))

                
            }else{
                if (!inputAccesKeyId){setClassInvalidAccessKey(false)}else{setClassInvalidAccessKey(true)}
                if(!inputSecretAccessKey){setClassSecretKey(false)}else{setClassSecretKey(true)}
                if(!inputAccountName){setstateinputAccountName(false)}else{setstateinputAccountName(true)}
                
            }


            
        
    }

    

    


    const handleCancel = () => {
            const inputUrl = document.getElementById("Inputurl");
            if (inputUrl) {
                inputUrl.value = "";
            }
            const roleSelect = document.getElementById("roleSelect");
            if (roleSelect) {
                roleSelect.value = "";
            }
            const inputAccountName = document.getElementById("inputAccountName");
            if (inputAccountName) {
                inputAccountName.value = "";
            }
            const inputWarehouse = document.getElementById("inputWarehouse");
            if (inputWarehouse) {
                inputWarehouse.value = "";
            }
            const inputAccesKeyId = document.getElementById("inputAccesKeyId");
            if (inputAccesKeyId) {
                inputAccesKeyId.value = "";
            }
            const inputSecretAccessKey = document.getElementById("inputSecretAccessKey");
            if (inputSecretAccessKey) {
                inputSecretAccessKey.value = "";
            }

            dispatch( resetSateCredentials() )

        }


        const validInputAccountName = (event)=>{
            if (event.target.value !== '' ) {
                setsubmitButton(true)
            }else{
                setsubmitButton(false)
            }
        }

        const changeState = ()=>{

            dispatch(updateStateFalseModalCredencialesSave())
        }
        
        // console.log(status,credentialToChange.index,credentialToChange.state)
        

    return (
        <div>
    <Modal
            show={modalCredencialesSave}
            // onHide={false}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>New Credential Saved</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                I will not close if you click outside me. Don't even try to press
                escape key.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={changeState}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
        
    <Card>
     <Card.Header className="d-flex justify-content-between">
         <div className="header-title">
             <h4 className="card-title">{credentialToChange.state ? 'Edit Credentials' :  'New Credential '}</h4>
         </div>
     </Card.Header>
     <Card.Body>
         <p>Load your account data and credentials to access your consumption</p>
         <Form id="newCredentials">


        { alertCredentialsInvalid === false &&
         <Alert variant="danger d-flex align-items-center" role="alert">
            <svg className="me-2" id="exclamation-triangle-fill" fill="currentColor" width="20" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
            </svg>
            <div>
            Credentials Invalid
            </div>
        </Alert> 
        }


        {alertCredentialsInvalid === true &&
        <Alert variant="success d-flex align-items-center" role="alert">
        
            <svg className="me-2" id="check-circle-fill" width="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
            </svg>
            <div>
            Valid credentials
            </div>
        </Alert>
        }

           
            <Form.Group className="form-group">
                <Form.Label htmlFor="inputAccountName">Account Name</Form.Label>
                <Form.Control type="text" defaultValue={credentialToChange.state ? cardUsageAccount[credentialToChange.index].accountName : ''} id="inputAccountName" disabled={ credentialsOk  && submitButton  ? true : false } className= {stateinputAccountName ? '' : "is-invalid"}   onChange={validInputAccountName} placeholder="Main AWS Account" />
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label htmlFor="exampleInputEmail3">Cloud Provider</Form.Label>
                <Form.Control as="select" id="cloudProviderSelect" defaultValue={cloudProvider} onChange={handleChange} disabled={ credentialsOk  && submitButton  ? true : false }>
                    <option value="AWS">AWS</option>
                    <option value="Azure">Azure</option>
                    <option value="GCP">GCP</option>
                    <option value="Snowflake">Snowflake</option>
                </Form.Control>
            </Form.Group>


            {cloudProvider === 'Snowflake' ? (
    <>
        <Form.Group className="form-group">
            <Form.Label htmlFor="Inputurl">Url Account</Form.Label>
            <Form.Control type="url" id="Inputurl" placeholder="ma43123260.ca-central-1.aws" />
        </Form.Group>
        <Form.Group className="form-group">
            <Form.Label htmlFor="exampleInputEmail3">Rol</Form.Label>
            <Form.Control as="select" id="roleSelect">
                <option value="Account Admin">Account Admin</option>
                <option value="User">User</option>
                <option value="Sys">Sys Admin</option>
            </Form.Control>
        </Form.Group>
        <Form.Group className="form-group">
            <Form.Label htmlFor="inputWarehouse">Warehouse</Form.Label>
            <Form.Control type="text" id="inputWarehouse" placeholder="Warehouse" />
        </Form.Group>
    </>
        ) : null}

            {/* //falta cambiar en el back para que tambien devuelva las credenciales  */}

             <Form.Group className="form-group">
                 <Form.Label  htmlFor="inputAccesKeyId">{cloudProvider === 'Snowflake' ? 'User' : 'Access Key ID'} </Form.Label>
                 <Form.Control type="text"   defaultValue={credentialToChange.state ? cardUsageAccount[credentialToChange.index].accessKey : ''} id="inputAccesKeyId" disabled={ credentialsOk  && submitButton  ? true : false } className= {classInvalidAccessKey ? '' : "is-invalid"} placeholder={cloudProvider === 'Snowflake' ? 'myusersnowflake' : 'ARHJKSAHJKDBVKA'} />
             </Form.Group>
             <Form.Group className="form-group">
                 <Form.Label  htmlFor="inputSecretAccessKey">{cloudProvider === 'Snowflake' ? 'Password' : 'Secret Access Key'} </Form.Label>
                 <Form.Control type="text"  defaultValue={credentialToChange.state ? cardUsageAccount[credentialToChange.index].secretKey : ''} id="inputSecretAccessKey" disabled={ credentialsOk  && submitButton  ? true : false } className= {classInvalidSecretKey ? '' : "is-invalid"}  placeholder="Enter Password"/>
             </Form.Group>
            


             <Button type="button"  onClick={handleTestConnection} variant="outline-success" >

             {status === 'ready' ? 'Test connection' : 'Loading...'}
             {status !== 'ready' && <Spinner animation="grow" size="sm" role="status" aria-hidden="true" />}

             </Button>
             {!credentialToChange.state ?
             <><Button type="button" onClick={handleSubmit} disabled={credentialsOk && submitButton ? false : true} className="m-2" variant="btn btn-primary"> Save </Button><Button type="button" onClick={handleCancel} variant="btn btn-danger">Clear</Button></>
             :
            
             <><Button type="button" onClick={handleUpdate} disabled={credentialsOk && submitButton ? false : true} className="m-2" variant="btn btn-primary"> Update </Button>
             <Link to='/cloudcosting'>
             <Button type="button" onClick={handleCancel} variant="btn btn-danger">Cancel</Button></Link></>
            }
         </Form>
        </Card.Body>
    </Card>
    </div>
    
)
            }

export default Accounts