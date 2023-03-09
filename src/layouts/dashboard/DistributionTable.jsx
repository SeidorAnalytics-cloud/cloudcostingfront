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
import '@inovua/reactdatagrid-enterprise/index.css'
import '@inovua/reactdatagrid-community/base.css'
// import '@inovua/reactdatagrid-community/theme/default-dark.css'

// import '@inovua/reactdatagrid-community/style/theme/default-dark/index.scss';




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


function transformData(dataAbsolute,dataPercentaje, centroIndices) {
  // Inicializar el array de resultados
  const results = [];

  // Recorrer los datos y crear los objetos con el formato deseado
  for (let i = 0; i < dataAbsolute.length; i++) {
    const item = dataAbsolute[i];
    const percent = dataPercentaje[i]
    let keys = Object.keys(item);
    let indices = Object.keys(centroIndices);


    for (let i = 0; i < keys.length; i++) {
      for(let z=0 ; z<indices.length; z++){
        if(keys[i]===indices[z]){
        console.log(percent[indices[z]])
        const newObject = {
          dimensionDescription: indices[z],
          idDistributionDimension:centroIndices[indices[z]],
          idHiredService: item.idHiredService,
          resultAmount:parseFloat(item[indices[z]]),
          resultsPercentaje:parseFloat(percent[indices[z]])
        };
        results.push(newObject);

      }
    }
  }

   }

  return results;
}



const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  return year + '-' + month;
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

          const [dataSourceAbsolute, setdataSourceAbsolute] = useState(0);
          
          const [dataSourcePercentaje, setdataSourcePercentaje] = useState(0);

          //agregar al state inicial , la fecha actual 
          const [monthToDb , setmonthToDb] = useState(getTodayDate())
          
          
          const [isPercentView, setIsPercentView] = useState(false);

          


          useEffect(() => {
            getLast13Months()
        
          }, [])
          



          useEffect(()=>{
            seleccionarOpcion(cardUsageAccount[0].accountName,cardUsageAccount[0].accountId)
            buldingBoard()
          },[])

          
          let columnsData=dataDistribution.columns
          let columnWithId=dataDistribution.columnsWithId

          let columns = []


          if (columnsData!== undefined){
  
          columns = [
            { name: 'service', header: 'Service', minWidth: 50, defaultFlex: 2, editable: false ,style: {fontWeight: 'bold' }},
            { name: 'cost', header: 'Cost',style: {fontWeight: 'bold' },maxWidth: 1000, defaultFlex: 1, type: 'number',textAlign: 'end', editable: false },
            
            



            //arranca a iterar para crear las columnas que estan grabadas en la bd 
            
            ...columnsData.map(column => ({
              name: column,
              header: column,
              maxWidth: 1000,
              defaultFlex: 1,
              type: 'number',
              editable: true,
              textAlign: 'end',
      
            })),

            {
              name: 'total',
              header: 'Total',
              maxWidth: 1000,
              defaultFlex: 1,
              type: 'number',
              textAlign: 'end',
              style: {fontWeight: 'bold'},
              editable: false,
              renderCell: ({ data }) => {
                console.log(data)
                const total = data.reduce((acc, row) => {
                  return acc + Object.keys(row).reduce((acc2, key) => {
                    if (columnsData.includes(key)) {
                      return acc2 + row[key];
                    }
                    return acc2;
                  }, 0);
                }, 0);
                return <div style={{ backgroundColor: total > data[0].cost ? 'red' : 'inherit' }}>{total}</div>;
              },
              cellProps: ({ value, row, column }) => ({
                style: {
                  backgroundColor: row.total < row.cost ? 'red' : 'inherit',
                },
              }),
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
  }



  //Comienzo a armar los datos para los tableros, pero se maneja un porcentaje para cada driver que tenga esa cuenta
  //estoy armando dos set de datos, que depende el tipo de vista, depende el datasource que se utiliza para renderizar el tablero
  //hay que tener en cuenta que a la hora de la modificacion en linea, se deben modificar ambos A RESOLVER 

  const buldingBoard = ()=>{
    if(dataDistribution.data !== undefined){


      const dataGrouped = dataDistribution.data.reduce((acc, item) => {
        // Crear un objeto para el servicio si todavía no existe
        if (!acc[item.service]) {
          acc[item.service] = { service: item.service, cost: item.cost, id: item.idHiredService, percentaje: item.percentaje };
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
          percentaje:serviceData.percentaje,
          total: total,
        };
        index+=1
        dataDistribution.columns.forEach(column => {
          dataRow[column] = serviceData[column];
        });

        
        return dataRow;
        });


        const dataGroupedPercentaje = dataDistribution.data.reduce((acc, item) => {
          // Crear un objeto para el servicio si todavía no existe
          if (!acc[item.service]) {
            acc[item.service] = { service: item.service, cost: item.cost, id: item.idHiredService, percentaje: item.percentaje };
            dataDistribution.columns.forEach(column => {
              acc[item.service][column] = 0;
            });
          }
          // Agregar la dimensión y el resultado al objeto del servicio correspondiente
                
          acc[item.service][item.dimensionDescription] = item.percentaje;
  
          
          return acc;
        }, {});


        //armo dos tipo de datos para poder renderizar uno que tiene los datos con los valor en consumos y el otro los porcentajes 
        index=0
        const dataRowsPercentaje = Object.keys(dataGroupedPercentaje).map(key => {
        
        const serviceDataPercentaje = dataGroupedPercentaje[key];
        let total = 0;
        dataDistribution.columns.forEach(column => {
          total += serviceDataPercentaje[column];
        });
        let dataRowsPercentaje = {
          id:index,
          idHiredService: serviceDataPercentaje.id,
          service: serviceDataPercentaje.service,
          cost: serviceDataPercentaje.cost,
          percentaje:serviceDataPercentaje.percentaje,
          total: total,
        };
        index+=1
        dataDistribution.columns.forEach(column => {
          dataRowsPercentaje[column] = serviceDataPercentaje[column];
        });

        
        return dataRowsPercentaje;
        });



        setdataSourcePercentaje(dataRowsPercentaje)
        setdataSourceAbsolute(dataRows)

      
    }

         

  }


  useEffect(() => {
    seleccionarOpcion(seleccionado,accountId)
    buldingBoard()
  }, [monthToDb])


  useEffect(() => {
    buldingBoard()
        
  }, [dataDistribution,monthToDb])
  


        const onEditComplete = useCallback(({ value, columnId, rowId }) => {
        
        
        //lo que hago aca ews resolver si la vista es porcentual o abosulta y en base a eso modifico ambos set de datos ,
        //pero a la vez reconozco el tipo de dato que se esta ingresando ya sea si es porcentual o absoluto

        /////////////////////////////////////////////////////////////////////////////////
        //Ver como hacer para que la suma de total tambien se actualize de ambos lados tanto de lo porcentual como de lo absoluto
        if (!isPercentView) {
          const data = [...dataSourceAbsolute];
          data[rowId][columnId] = value;
          setdataSourceAbsolute(data);
          data[rowId]['total']=0
          columnsData.map(key=>{
            data[rowId]['total']+= parseFloat(data[rowId][key])
          })

          //prueba para que sume tanto en el lado de porcentaje como en e; de absoluto
          columnsData.map(key=>{
            dataSourcePercentaje[rowId]['total']+= parseFloat(dataSourcePercentaje[rowId][key])
          })

          let percentajeCell =  ( value * 100)/data[rowId]['cost']
          percentajeCell = percentajeCell.toFixed(1);
          dataSourcePercentaje[rowId][columnId]=percentajeCell
          setdataSourceAbsolute(data)
        }


        else{
          const data = [...dataSourcePercentaje];
          data[rowId][columnId] = value;
          setdataSourcePercentaje(data);
          data[rowId]['total']=0
          columnsData.map(key=>{
            data[rowId]['total']+= parseFloat(data[rowId][key])
          })
          
          columnsData.map(key=>{
            dataSourceAbsolute[rowId]['total']+= parseFloat(dataSourceAbsolute[rowId][key])
          })


          let absoluteCell = data[rowId]['cost'] * (value/100)  
          absoluteCell = absoluteCell.toFixed(1);
          dataSourceAbsolute[rowId][columnId]=absoluteCell
          setdataSourcePercentaje(data)
        
        }
       
        }, [dataSourceAbsolute,dataSourcePercentaje])




        //funcion con la que se guarda o actualiza la info en la bd sobre el tablero
        const saveData = ()=>{
          let results=transformData(dataSourceAbsolute,dataSourcePercentaje,columnWithId)
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
          buldingBoard()
        }
//==================================================================================================================================


//da estilo a la fila par que se coloree en caso de que la suma de los drivers sea mayoy  al total 
const rowStyle = ({ data }) => {


  let coincidencias
  if(columnsData !== undefined){

    let columns= Object.keys(data)

    coincidencias = columns.filter(elemento => columnsData.includes(elemento));
    let acumulador = 0
    coincidencias.forEach(element => {
        acumulador += parseFloat(data[element])
    });
      console.log(acumulador,data['cost'])
      if(acumulador > data['cost']){
        return {backgroundColor:'#d47681'}

      }
    }

  }



  const handleSwitchChange = (event) => {
    setIsPercentView(event.target.checked);

  }


        
    return(
    <>  
     <Row className='mt-5'>
            <Col md="12" >

                
         <div className='grid-container mt-5'>
            <div className="card-header d-flex justify-content-between mb-3">
             <div> 
            <h3>Distribution</h3>


             <div class="form-check form-switch form-check-inline">
              <input class="form-check-input" type="checkbox" id="switch1" onChange={handleSwitchChange} checked={isPercentView} />
              <label class="form-check-label pl-2" for="switch1">Percent View</label>
            </div>



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
              style={{ minHeight: height  }}
              onEditComplete={onEditComplete}
              editable={true}
              columns={columns}
              dataSource={!isPercentView?dataSourceAbsolute:dataSourcePercentaje}
              sortColumn="service"
              sortDirection="ASC"
              showEmptyRows={false}
              showZebraRows={true}
              
              rowStyle={rowStyle}
              
            />
    </div>
    
    </Col>
    </Row>
    </>
           

    )
};
export default connect(mapStateToProps, mapDispatchToProps)(DistributionTable)



