import React, {useEffect} from 'react'
import { Row,Col,OverlayTrigger,Button,Tooltip} from 'react-bootstrap'

import { Link } from 'react-router-dom';

import { useSelector,useDispatch } from 'react-redux';

import { getUsageFromThisMonthAndLast } from '../../store/slices/costing/costingThunks.js';
import { editCredentials } from '../../store/slices/costing/costingSlice.js';

import {bindActionCreators } from "redux"
//circular
import Circularprogressbar from '../../components/circularprogressbar.js'

// AOS
import AOS from 'aos'
import '../../../node_modules/aos/dist/aos'
import '../../../node_modules/aos/dist/aos.css'
//apexcharts

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.scss';


//Count-up
import CountUp from 'react-countup';
// store
import {NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode,  getcustomizerinfoMode,  SchemeDirAction, ColorCustomizerAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
import {connect} from "react-redux"

  
// install Swiper modules
SwiperCore.use([Navigation]);

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

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit
    </Tooltip>
  );



const Principal = (props)=>{

    const dispatch = useDispatch();

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const monthAndYear = currentMonth + ' ' + currentYear;

    const {cardUsageAccount,credentialToChange} = useSelector( state => state.costing )
    
    // console.log(credentialToChange)


    useEffect(() => {
        AOS.init({
            startEvent: 'DOMContentLoaded',
            disable:  function() {
              var maxWidth = 996;
              return window.innerWidth < maxWidth;
            },
            throttleDelay: 10,
            once: true,
            duration: 700,
            offset: 10
          });

          
        //   customizer
        const colorcustomizerMode = sessionStorage.getItem('color-customizer-mode');
        const colorcustomizerinfoMode = sessionStorage.getItem('colorcustominfo-mode');
        const colorcustomizerprimaryMode = sessionStorage.getItem('colorcustomprimary-mode');
        if(colorcustomizerMode===null){
            props.ColorCustomizerAction(props.customizerMode, props.cololrinfomode, props.colorprimarymode);
            document.documentElement.style.setProperty('--bs-info', props.cololrinfomode );
           
        }
        else{
            props.ColorCustomizerAction(colorcustomizerMode, colorcustomizerinfoMode, colorcustomizerprimaryMode);
            document.documentElement.style.setProperty('--bs-info', colorcustomizerinfoMode);
                
        }

        
       
        
        
        },[])

        useEffect(()=>{
            const body = {
                "tenantid":2
            }

            dispatch( getUsageFromThisMonthAndLast(body) )
           
        },[])



        const saveIndexCredential=(index)=>{
        
            dispatch( editCredentials(index) )
        }




    return(
    <>
        
        <Row>
            <Col md="12" lg="12">
                <Row className="row-cols-1">
            
               
                    <div className="overflow-hidden d-slider1 ">
                       
                        <Swiper className="p-0 m-0 mb-2 list-inline "
                            slidesPerView={5}
                            spaceBetween={32}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev'
                            }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                550: { slidesPerView: 2 },
                                991: { slidesPerView: 3 },
                                1400: { slidesPerView: 4 },
                                1500: { slidesPerView: 5 },
                                1920: { slidesPerView: 6 },
                                2040: { slidesPerView: 7 },
                                2440: { slidesPerView: 8 }
                            }} data-aos="fade-up" data-aos-delay="700"
                        >
                            {cardUsageAccount.map((data,index)=>(
                            <SwiperSlide className="card card-slide w-25 p-4" >
                                
                                <div className="icon-box position-absolute top-0 end-0 m-3"  style={{width: '15%', height: '20%'}}>
                                    <div className="overlay">
                                    <OverlayTrigger placement="top"  delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                                        <Link to='/cloudcosting/accounts'>
                                        <Button variant="btn btn-sm btn-soft-primary" data-toggle="Edit" data-bs-toggle="tooltip" data-bs-placement="top" data-copy-target="#dual-svg-container-44" onClick={()=>saveIndexCredential(index)}   title="Copy">Edit</Button>
                                        </Link>
                                    </OverlayTrigger>
                                    </div>
                                    <div id="dual-svg-container-44"  >
                                        <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"/>
                                            <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"/>
                                            <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                </div>




                                <h4 className='pb-1'>{data.accountName}</h4>
                                <div className="card-body ">
                                    <div className="progress-widget " >
                                    
                                        <Circularprogressbar  stroke={props.coloralertmode} width="80px" height="80px" Linecap='rounded'  trailstroke='#ddd' strokewidth="4px" style={{width:80, height:80}} value={data.percentageChange} id="circle-progress-01" 
                                        >
                                            <img style={{ width: 40, marginTop: -5 }} src='/aws.png' alt="AWS logo" />
                                        </Circularprogressbar>
                                        <div className="progress-detail">
                                            <p  className="mb-2">{monthAndYear}</p>
                                            <h4 className="counter">$<CountUp  start={0} end={data.currentMonthCost}  duration={3}/></h4>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                              ))}
                            </Swiper>
                        
                            </div>
                          


                          
                        </Row>
                    </Col>
                </Row>
            </>
           

    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Principal)
