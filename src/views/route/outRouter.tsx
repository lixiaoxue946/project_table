import  React from 'react';
import { Route, Switch, Redirect ,HashRouter} from 'react-router-dom';
import Login from '@views/login/login';
import Standard from '@views/standard/standard';
import PmStop from '@views/pmStop/pmStop';
import TransferStation from '@views/transferStation/transferStation'// 商户信息录入-门店信息
import Pm from '@views/pm/pm';// 协议
//动态加载路由报错 舍!!



const outRouter = ()=>{
    return (
        <HashRouter>
            <Switch>
                <Route exact  key="/login"  path="/login" component={Login} />
                <Route exact  key="/standard"  path="/standard" component={Standard} />
                <Route exact key="/pm" path="/pm" component={Pm} />
                <Route exact key="/pmStop" path="/pmStop" component={PmStop} />
                <Route exact key="/transferStation" path="/transferStation" component={TransferStation} />
                <Route key="/" path='/' render={() => (<Redirect to='/login' />)} />
            </Switch>
        </HashRouter>
    );
}

//<Route  path="/mobxExample" component={MobxExample} />
export default outRouter;
