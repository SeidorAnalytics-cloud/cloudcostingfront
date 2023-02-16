import {React, useEffect,useState,useCallback} from 'react'
import { Row,Col,Button,Dropdown} from 'react-bootstrap'


import { useSelector,useDispatch } from 'react-redux'



import {bindActionCreators } from "redux"
//circular

// AOS
import AOS from 'aos'
import '../../../node_modules/aos/dist/aos'
import '../../../node_modules/aos/dist/aos.css'



import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'



// store
import {NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode,  getcustomizerinfoMode,  SchemeDirAction, ColorCustomizerAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
import {connect} from "react-redux"



const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        customizerMode: getcustomizerMode(state),
        cololrinfomode: getcustomizerinfoMode(state),
        colorprimarymode: getcustomizerprimaryMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state),
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
            ColorCustomizerAction,
        },
        dispatch
    )
})




const columns = [
    { name: 'service', header: 'Service', minWidth: 50, defaultFlex: 2 },
    { name: 'cost', header: 'Cost', maxWidth: 1000, defaultFlex: 1,type: 'number' }
  ]
  
  const gridStyle = { minHeight: 550 }





const DistributionTable = (props)=>{


        // const gridStyle = { minHeight: 550 };

        // const columns = [
        //   { name: 'id', header: 'Id', defaultVisible: false, minWidth: 300, type: 'number' },
        //   { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 250 },
        //   { name: 'country', header: 'Country', defaultFlex: 1, minWidth: 100 },
        //   { name: 'city', header: 'City', defaultFlex: 1, minWidth: 300 },
        //   { name: 'age', header: 'Age', minWidth: 150, type: 'number' }]


      
          
          const dataSourceExample = [
            { id: 1, service: 'John McQueen', cost: 35 },
            { id: 2, service: 'Mary Stones', cost: 25 },
            { id: 3, service: 'Robert Fil', cost: 27 },
            { id: 4, name: 'Roger Robson', cost: 81 },
            { id: 5, name: 'Billary Konwik', cost: 18 },
            { id: 6, name: 'Bob Martin', cost: 18 },
            { id: 7, name: 'Matthew Richardson', cost: 54 },
            { id: 8, name: 'Ritchie Peterson', cost: 54 },
            { id: 9, name: 'Bryan Martin', cost: 40 },
            { id: 10, name: 'Mark Martin', age: 44 },
            { id: 11, name: 'Michelle Sebastian', age: 24 },
            { id: 12, name: 'Michelle Sullivan', age: 61 },
            { id: 13, name: 'Jordan Bike', age: 16 },
            { id: 14, name: 'Nelson Ford', age: 34 },
            { id: 15, name: 'Tim Cheap', age: 3 },
            { id: 16, name: 'Robert Carlson', age: 31 },
            { id: 17, name: 'Johny Perterson', age: 40 }
          ]
        

          const {cardUsageAccount,status} = useSelector( state => state.costing )
          const dispatch = useDispatch();

          const [seleccionado, setSeleccionado] = useState(cardUsageAccount[0].accountName || '');

          const seleccionarOpcion = (opcion,accountId)=>{
            console.log(accountId)
            setSeleccionado(opcion)
           
            const body = {
                tenantId: 1,
                accountId:accountId
              };
          
            //   dispatch(getDataforDashbords(body))
        }




        const [dataSource, setDataSource] = useState(dataSourceExample);

        const onEditComplete = useCallback(({ value, columnId, rowId }) => {
        const data = [...dataSource];
        data[rowId][columnId] = value;

    setDataSource(data);
  }, [dataSource])
    return(
    <>  
     <Row>
            <Col md="12" >

                
         <div className='mt-5'>
            <div className="flex-wrap card-header d-flex justify-content-between mb-3">
            <h3>Distribution</h3>

                <Dropdown>
                    <Dropdown.Toggle as={Button} href="#" variant=" text-secondary" id="dropdownMenuButton3" aria-expanded="false">
                    {seleccionado}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton3">
                    {cardUsageAccount.map((opcion, indice) => (
                        <li className="card-title" key={indice}>
                        <Dropdown.Item onClick={() => seleccionarOpcion(opcion.accountName,opcion.accountId)} href="#">{opcion.accountName}</Dropdown.Item>
                      </li>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>


            
            </div>
            <ReactDataGrid
              idProperty="id"
              style={gridStyle}
              onEditComplete={onEditComplete}
              editable={true}
              columns={columns}
              dataSource={dataSource}
            />
    </div>

    </Col>
    </Row>
    </>
           

    )
};

export default connect(mapStateToProps, mapDispatchToProps)(DistributionTable)
