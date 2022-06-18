/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

import React from 'react';
import { Switch, Route , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from 'store/actions/userActions';
import { NAVBAR_TYPE, LOGIN_TYPE } from 'consts';
import { RSTOOL_ROUTES } from 'consts/RSTools_Consts';
import PrivateRoute from './PrivateRoute';
import NavBarMain from 'components/navbar/navbarMain/navbarMain.lazy';
import Notification from 'components/notification/Notification/Notification.lazy';
import Login from 'components/navbar/Login/Login.lazy';
import SignUp from 'components/navbar/SignUp/SignUp.lazy';
import ForgotPassword from 'components/navbar/ForgotPassword/ForgotPassword.lazy';
import RSDash from 'components/RSTools/RSDash/RSDash.lazy';
import Dailys from 'components/RSTools/Dailys/Dailys.lazy';
import SearchDaily from 'components/RSTools/Dailys/SearchDaily/SearchDaily.lazy';
import AddDaily from 'components/RSTools/Dailys/AddDaily/AddDaily.lazy';
import EditOrder from 'components/RSTools/Dailys/EditOrder/EditOrder.lazy';
import EditDaily from 'components/RSTools/Dailys/EditDaily/EditDaily.lazy';
import FarmRuns from 'components/RSTools/FarmRuns/FarmRuns.lazy';
import FarmRun from 'components/RSTools/FarmRuns/FarmRun/FarmRun.lazy';
import FarmRunBuilder from 'components/RSTools/FarmRuns/FarmRunBuilder/FarmRunBuilder.lazy';
import PvM from 'components/RSTools/PvM/PvM.lazy';
import PvmEnemy from 'components/RSTools/PvM/PvmEnemy/PvmEnemy.lazy';
import PvmBuilder from 'components/RSTools/PvM/PvmEnemy/PvmBuilder/PvmBuilder.lazy';
import PvmTaskBuilder from 'components/RSTools/PvM/PvmTasks/PvmTaskBuilder/PvmTaskBuilder.lazy';
import PvmTaskViewer from 'components/RSTools/PvM/PvmTasks/PvmTaskViewer/PvmTaskViewer.lazy';
import Activities from 'components/RSTools/Activities/Activities.lazy';
import Activity from 'components/RSTools/Activities/Activity/Activity.lazy';
import ActivityBuilder from 'components/RSTools/Activities/ActivityBuilder/ActivityBuilder.lazy';
import ActivityViewer from 'components/RSTools/Activities/Activity/ActivityViewer/ActivityViewer.lazy';
import Equipment from 'components/RSTools/Equipment/Equipment.lazy';
import Presets from 'components/RSTools/Equipment/Presets/Presets.lazy';
import Items from 'components/RSTools/Equipment/Item/Items/Items.lazy';
import Abilitys from 'components/RSTools/Equipment/Ability/Abilitys/Abilitys.lazy';
import PresetWizard from 'components/RSTools/Equipment/PresetWizard/PresetWizard.lazy';
import PresetViewer from 'components/RSTools/Equipment/PresetComponents/PresetViewer/PresetViewer.lazy';
import BronzeManMode from 'components/RSTools/BronzeManMode/BronzeManMode/BronzeManMode.lazy';
import Footer from 'components/navbar/Footer/Footer.lazy';
import NotFound from 'errors/NotFound';
import PropTypes from 'prop-types';

class RSRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <div className="RSTools">
                <NavBarMain type={NAVBAR_TYPE.RS_TOOLS}/>
                <Notification />
                <Switch>
                    <Route exact path={RSTOOL_ROUTES.LOGIN} render={(props) => <Login {...props} type={LOGIN_TYPE.RS_TOOLS} />} /> 
                    <Route exact path={RSTOOL_ROUTES.SIGNUP} component={SignUp} /> 
                    <Route exact path={RSTOOL_ROUTES.FORGOTPASS} component={ForgotPassword} /> 
                    <PrivateRoute exact path={RSTOOL_ROUTES.DASH} redirect={RSTOOL_ROUTES.LOGIN} component={RSDash} />
                    {/* DAILYS */}
                    <PrivateRoute exact path={RSTOOL_ROUTES.DAILYS} redirect={RSTOOL_ROUTES.LOGIN} component={Dailys} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.DAILYSEARCH} redirect={RSTOOL_ROUTES.LOGIN} component={SearchDaily} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.ADDDAILY} redirect={RSTOOL_ROUTES.LOGIN} component={AddDaily} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.EDITORDER} redirect={RSTOOL_ROUTES.LOGIN} component={EditOrder} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.EDITDAILY} redirect={RSTOOL_ROUTES.LOGIN} component={EditDaily} />
                    {/* FARM RUNS */}
                    <PrivateRoute exact path={RSTOOL_ROUTES.FARMRUNS} redirect={RSTOOL_ROUTES.LOGIN} component={FarmRuns} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.FARMRUN_TYPE} redirect={RSTOOL_ROUTES.LOGIN} component={FarmRun} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.FARMRUN_BUILDER} redirect={RSTOOL_ROUTES.LOGIN} component={FarmRunBuilder} />
                    {/* PVM */}
                    <PrivateRoute exact path={RSTOOL_ROUTES.PVM} redirect={RSTOOL_ROUTES.LOGIN} component={PvM} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.PVM_ENEMY} redirect={RSTOOL_ROUTES.LOGIN} component={PvmEnemy} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.PVM_BUILDER} redirect={RSTOOL_ROUTES.LOGIN} component={PvmBuilder} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.PVM_TASK_BUILDER} redirect={RSTOOL_ROUTES.LOGIN} component={PvmTaskBuilder} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.PVM_TASK_VIEWER} redirect={RSTOOL_ROUTES.LOGIN} component={PvmTaskViewer} />
                    {/* ACTIVITIES */}
                    <PrivateRoute exact path={RSTOOL_ROUTES.ACTIVITIES} redirect={RSTOOL_ROUTES.LOGIN} component={Activities} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.ACTIVITY} redirect={RSTOOL_ROUTES.LOGIN} component={Activity} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.ACTIVITY_BUILDER} redirect={RSTOOL_ROUTES.LOGIN} component={ActivityBuilder} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.ACTIVITY_VIEWER} redirect={RSTOOL_ROUTES.LOGIN} component={ActivityViewer} />
                    {/* EQUIPMENT */}
                    <PrivateRoute exact path={RSTOOL_ROUTES.EQUIPMENT} redirect={RSTOOL_ROUTES.LOGIN} component={Equipment} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.PRESETS} redirect={RSTOOL_ROUTES.LOGIN} component={Presets} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.PRESET_BUILDER} redirect={RSTOOL_ROUTES.LOGIN} component={PresetWizard} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.PRESET_VIEWER} redirect={RSTOOL_ROUTES.LOGIN} component={PresetViewer} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.ITEMS} redirect={RSTOOL_ROUTES.LOGIN} component={Items} />
                    <PrivateRoute exact path={RSTOOL_ROUTES.ABILITYS} redirect={RSTOOL_ROUTES.LOGIN} component={Abilitys} />
                    {/* BRONZE MAN MODE */}
                    <PrivateRoute exact path={RSTOOL_ROUTES.BRONZE_MAN} redirect={RSTOOL_ROUTES.LOGIN} component={BronzeManMode} />
                    <Route component={NotFound} />
                </Switch>
                <Footer type={LOGIN_TYPE.RS_TOOLS} />
            </div>
        );
    }
}

RSRouter.propTypes = {
    getUser: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(RSRouter));
