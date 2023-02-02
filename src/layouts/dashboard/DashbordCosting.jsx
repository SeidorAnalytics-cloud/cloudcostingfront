import React, {useEffect} from 'react'
import { Row,Col,Dropdown,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import {bindActionCreators} from "redux"
//circular
import Circularprogressbar from '../../components/circularprogressbar.js'

// AOS
import AOS from 'aos'
import '../../../node_modules/aos/dist/aos'
import '../../../node_modules/aos/dist/aos.css'
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from '../../components/progress.js'
//img
import shapes1 from '../../assets/images/shapes/01.png'
import shapes2 from '../../assets/images/shapes/02.png'
import shapes3 from '../../assets/images/shapes/03.png'
import shapes4 from '../../assets/images/shapes/04.png'
import shapes5 from '../../assets/images/shapes/05.png'

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







const DashbordCosting = (props)=>{
    
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
            
              
            })
        
            const chart1={
                options : {
                    chart: {
                        fontFamily: '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        toolbar: {
                            show: false
                        },
                        sparkline: {
                            enabled: false,
                        }
                    },
                    colors: [props.colorprimarymode, props.cololrinfomode],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3,
                    },
                    yaxis: {
                        show: true,
                        labels: {
                        show: true,
                        minWidth: 19,
                        maxWidth: 19,
                        style: {
                            colors: "#8A92A6",
                        },
                        offsetX: -5,
                        },
                    },
                    legend: {
                        show: false,
                    },
                    xaxis: {
                    labels: {
                        minHeight:22,
                        maxHeight:22,
                        show: true,
                        style: {
                            colors: "#8A92A6",
                        },
                    },
                    lines: {
                        show: false  //or just here to disable only x axis grids
                    },
                    categories: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"]
                 },
                    grid: {
                        show: false,
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: "vertical",
                            shadeIntensity: 0,
                            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                            inverseColors: true,
                            opacityFrom: .4,
                            opacityTo: .1,
                            stops: [0, 50, 80],
                            colors: [props.colorprimarymode, props.cololrinfomode]
                        }
                    },
                    tooltip: {
                        enabled: true,
                    },
            },
                series: [{
                    name: 'total',
                    data: [94, 80, 94, 80, 94, 80, 94]
                }, {
                    name: 'pipline',
                    data: [72, 60, 84, 60, 74, 60, 78]
                }]
                
                
            }
            
          //chart2
            const chart2 ={
                options : {
                colors: [props.colorprimarymode, props.cololrinfomode],
                plotOptions: {
                    radialBar: {
                    hollow: {
                        margin: 10,
                        size: "50%",
                    },
                    track: {
                        margin: 10,
                        strokeWidth: '50%',
                    },
                    dataLabels: {
                        show: false,
                    }
                    }
                },
                labels: ['Apples', 'Oranges'],
                },
                series: [55, 75],
            }
            const chart3={
                options : {
                    chart: {
                    stacked: true,
                    toolbar: {
                        show:false
                        }
                    },
                    colors: [props.colorprimarymode, props.cololrinfomode],
                    plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '28%',
                        endingShape: 'rounded',
                        borderRadius: 5,
                    },
                    },
                    legend: {
                    show: false
                    },
                    dataLabels: {
                    enabled: false
                    },
                    stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                    },
                    xaxis: {
                    categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'M', 'T', 'W'],
                    labels: {
                        minHeight:20,
                        maxHeight:20,
                        style: {
                        colors: "#8A92A6",
                        },
                    }
                    },
                    yaxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        minWidth: 19,
                        maxWidth: 19,
                        style: {
                            colors: "#8A92A6",
                        },
                    }
                    },
                    fill: {
                    opacity: 1
                    },
                    tooltip: {
                    y: {
                        formatter: function (val) {
                        return "$ " + val + " thousands"
                        }
                    }
                    }
                },
                series: [{
                    name: 'Successful deals',
                    data: [30, 50, 35, 60, 40, 60, 60, 30, 50, 35,]
                }, {
                    name: 'Failed deals',
                    data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 100]
                }]
            }




    return(
        <>
                    {/* <Col md="12" lg="8"> */}
                        <Row>
                            <Col md="12">
                                <div className="card" data-aos="fade-up" data-aos-delay="800">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">$855.8K</h4>
                                            <p className="mb-0">Usage</p>          
                                        </div>
                                        <div className="d-flex align-items-center align-self-center">
                                            <div className="d-flex align-items-center text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-2">
                                                <span className="text-secondary">AWS</span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center ms-3 text-info">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-2">
                                                    <span className="text-secondary">Azure</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle as={Button} href="#" variant=" text-secondary dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                This Week
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
                                                <li><Dropdown.Item href="#">This Week</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Month</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Year</Dropdown.Item></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="card-body">
                                        <Chart  options={chart1.options} series={chart1.series} type="area"   height="245"  />
                                    </div>
                                </div>
                            </Col>
                            <Col md="12" xl="6">
                                <div className="card" data-aos="fade-up" data-aos-delay="900">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Earnings</h4>            
                                        </div>   
                                        <Dropdown>
                                            <Dropdown.Toggle as={Button} href="#" variant=" text-secondary" id="dropdownMenuButton1" aria-expanded="false">
                                                This Week
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className=" dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                <li><Dropdown.Item href="#">This Week</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Month</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Year</Dropdown.Item></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex-wrap d-flex align-items-center justify-content-between">
                                            <Chart className="col-md-8 col-lg-8" options={chart2.options} series={chart2.series} type="radialBar"   height="250"  />
                                            <div className="d-grid gap col-md-4 col-lg-4">
                                                <div className="d-flex align-items-start">
                                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#3a57e8">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="#3a57e8"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-3">
                                                    <span className="text-secondary">Fashion</span>
                                                    <h6>251K</h6>
                                                </div>
                                                </div>
                                                <div className="d-flex align-items-start">
                                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#4bc7d2">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="#4bc7d2"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-3">
                                                    <span className="text-secondary">Accessories</span>
                                                    <h6>176K</h6>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="12" xl="6">
                                <div className="card" data-aos="fade-up" data-aos-delay="1000">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Conversions</h4>            
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle as={Button} href="#" variant=" text-secondary" id="dropdownMenuButton3" aria-expanded="false">
                                                This Week
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton3">
                                                <li><Dropdown.Item href="#">This Week</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Month</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Year</Dropdown.Item></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="card-body">
                                        <Chart className="d-activity" options={chart3.options} series={chart3.series} type="bar"   height="230"  />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    {/* </Col>         */}
                </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DashbordCosting)
