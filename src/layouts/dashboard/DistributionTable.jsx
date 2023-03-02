import {React, useEffect,useState,useCallback} from 'react'
import { Row,Col,Button,Dropdown} from 'react-bootstrap'


import { useSelector,useDispatch } from 'react-redux'




import {bindActionCreators } from "redux"
//circular

// AOS
// import AOS from 'aos'
// import '../../../node_modules/aos/dist/aos'
// import '../../../node_modules/aos/dist/aos.css'



import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'



import { getDataforDistribution,setDataforDistribution } from '../../store/slices/costing/costingThunks.js'




// store
import {NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode,  getcustomizerinfoMode,  SchemeDirAction, ColorCustomizerAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
import {connect} from "react-redux"

const moment = require('moment');


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


function transformData(data, centroIndices) {
  // Inicializar el array de resultados
  const results = [];

  // Recorrer los datos y crear los objetos con el formato deseado
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let keys = Object.keys(item);
    let indices = Object.keys(centroIndices);
    // console.log(keys[0]) 
    // console.log(indices[0])

    for (let i = 0; i < keys.length; i++) {
      for(let z=0 ; z<indices.length; z++){
        if(keys[i]===indices[z]){

        const newObject = {
          dimensionDescription: indices[z],
          idDistributionDimension:centroIndices[indices[z]],
          idHiredService: item.idHiredService,
          resultAmount:parseFloat(item[indices[z]]),
          // service: item.service,
        };
        results.push(newObject);

      }

    }
  }

   }

  return results;
}







  

  let dataSourceExample=[]



const DistributionTable = ()=>{


  const [height, setHeight] = useState(500);
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = document.querySelector('.card-header').offsetHeight;
      const minHeight = 500;
      const maxHeight = windowHeight - headerHeight - 200;
      setHeight(Math.min(maxHeight, Math.max(minHeight, windowHeight - headerHeight - 200)));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);    


  



          const {cardUsageAccount,status,dataDistribution,dataDashbord} = useSelector( state => state.costing )


          const dispatch = useDispatch();

          const [seleccionado, setSeleccionado] = useState(cardUsageAccount[0].accountName || '');
          //con esto me guardo en este estado el id de la cuenta la cual esta seleecionado en el dropdown
          const [accountId,setAccountId] = useState(cardUsageAccount[0].accountId || 0)

          let formattedDate = moment(dataDashbord.lastUpdate).format('MMM DD YYYY HH:mm z');

          const [months, setMonths] = useState([]);

          const [monthToDb , setmonthToDb] = useState()
          
          
          useEffect(() => {
            getLast13Months()
        
          }, [])
          



          useEffect(()=>{
            seleccionarOpcion(cardUsageAccount[0].accountName,cardUsageAccount[0].accountId)
            
          },[])

          
          let columnsData=dataDistribution.columns
          let columnWithId=dataDistribution.columnsWithId

          let columns = []


          if (columnsData!== undefined){
  
          columns = [
            { name: 'service', header: 'Service', minWidth: 50, defaultFlex: 2, editable: false },
            { name: 'cost', header: 'Cost', maxWidth: 1000, defaultFlex: 1, type: 'number', editable: false },
            ...columnsData.map(column => ({
              name: column,
              header: column,
              maxWidth: 1000,
              defaultFlex: 1,
              type: 'number',
              editable: true
            })),
            {
              name: 'total',
              header: 'Total',
              maxWidth: 1000,
              defaultFlex: 1,
              type: 'number',
              editable: false,
              renderCell: ({ data }) => {
                const total = data.reduce((acc, row) => {
                  return acc + Object.keys(row).reduce((acc2, key) => {
                    if (columnsData.includes(key)) {
                      return acc2 + row[key];
                    }
                    return acc2;
                  }, 0);
                }, 0);
                return <div>{total}</div>;
              }
            }
          ];
        }
  



const seleccionarOpcion = (opcion,accountId)=>{
            
  setSeleccionado(opcion)
  setAccountId(accountId)
  const body = {
      tenantId: 1,
      accountId:accountId,
      month:monthToDb+'-01'
    };

  dispatch(getDataforDistribution(body))

  if(dataDistribution.data !== undefined){

    const dataGrouped = dataDistribution.data.reduce((acc, item) => {
      // Crear un objeto para el servicio si todavía no existe
      if (!acc[item.service]) {
        acc[item.service] = { service: item.service, cost: item.cost, id: item.idHiredService};
        dataDistribution.columns.forEach(column => {
          acc[item.service][column] = 0;
        });
      }
      // Agregar la dimensión y el resultado al objeto del servicio correspondiente
      acc[item.service][item.dimensionDescription] = item.resultAmount;

      return acc;
    }, {});

    let index=0
    const dataRows = Object.keys(dataGrouped).map(key => {
      
      const serviceData = dataGrouped[key];
      let total = 0;
      dataDistribution.columns.forEach(column => {
        total += serviceData[column];
      });
      let dataRow = {
        id:index,
        idHiredService: serviceData.id,
        service: serviceData.service,
        cost: serviceData.cost,
        total: total,
      };
      index+=1
      dataDistribution.columns.forEach(column => {
        dataRow[column] = serviceData[column];
      });
      return dataRow;
    });

    setDataSource(dataRows);
  }
  else{
    console.log('nop')
  }
}

       


        const [dataSource, setDataSource] = useState(dataSourceExample);

        const onEditComplete = useCallback(({ value, columnId, rowId }) => {
        const data = [...dataSource];
        data[rowId][columnId] = value;
        setDataSource(data);
        data[rowId]['total']=0
        columnsData.map(key=>{
          data[rowId]['total']+= parseFloat(data[rowId][key])
        })
        setDataSource(data)
        }, [dataSource])



        //funcion con la que se guarda o actualiza la info en la bd sobre el tablero
        const saveData = ()=>{
          let results=transformData(dataSource,columnWithId)
          const body = {
            tenantId: 1,
            accountId:accountId,
            data: results,
            month:monthToDb+'-01'
          };
          dispatch(setDataforDistribution(body))
          
         
        }


        function getLast13Months() {
          const today = new Date();
          const months = [];
          for (let i = 0; i < 13; i++) {
            const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const year = month.getFullYear();
            const monthNumber = month.getMonth() + 1;
            const monthString = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
            // const dateString = `${year}-${monthString}-01`;
            const dateString = `${year}-${monthString}`;
            months.push(dateString);
          }
          setMonths(months)
          setmonthToDb(months[0])
        }

        const changeDate = (month)=>{
          setmonthToDb(month)
          seleccionarOpcion(seleccionado,accountId)
        }
//==================================================================================================================================



const [cellSelection, setCellSelection] = useState({"2,name": true, "2,city": true});





        
    return(
    <>  
     <Row className='mt-5'>
            <Col md="12" >

                
         <div className='grid-container mt-5'>
            <div className="card-header d-flex justify-content-between mb-3">
             <div> 
            <h3>Distribution</h3>
            <Dropdown>
                    <Dropdown.Toggle as={Button} href="#" variant=" text-secondary" id="dropdownMenuButton3" aria-expanded="false">
                    {monthToDb}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton3">
                    {months.map((opcion, indice) => (
                        <li className="card-title" key={indice}>
                        <Dropdown.Item onClick={()=>{changeDate(opcion)}}  href="#">{opcion}</Dropdown.Item>
                      </li>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>


            </div>
            <Button type="button" onClick={()=>saveData()} variant="outline-primary">Save</Button>

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
              style={{ minHeight: height }}
              onEditComplete={onEditComplete}
              editable={true}
              columns={columns}
              dataSource={dataSource}
              cellSelection={cellSelection}
              onCellSelectionChange={setCellSelection}
              sortColumn="service"
              sortDirection="ASC"
            />
    </div>
    
    </Col>
    </Row>
    </>
           

    )
};
export default connect(mapStateToProps, mapDispatchToProps)(DistributionTable)



