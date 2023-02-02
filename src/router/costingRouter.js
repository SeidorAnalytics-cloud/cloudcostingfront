import React from 'react'
import {Switch,Route} from 'react-router-dom'

//TransitionGroup
import {TransitionGroup,CSSTransition} from "react-transition-group";

import Accounts from '../layouts/dashboard/Accounts';
import Principal from '../layouts/dashboard/IndexCosting';
import DashbordCosting from '../layouts/dashboard/DashbordCosting';
import DistrubitionTable from '../layouts/dashboard/DistributionTable';

const CostingRouter = () => {
    return (
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Switch>

                    {/* Desde default router lo que haces es ver en que ruta esta parado y de ahi renderiza el body del DOM */}


                    {/* agrego rutas de cloud costing */}


                    <Route path="/cloudcosting" exact component={Principal} />
                    
                    <Route path="/cloudcosting/accounts" exact component={Accounts} />

                    <Route path="/cloudcosting/dashbord" exact component={DashbordCosting} />

                    <Route path="/cloudcosting/distribution" exact component={DistrubitionTable} />


                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default CostingRouter
