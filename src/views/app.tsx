import  React,{useEffect} from 'react';
import  OutRouter from './route/outRouter';
import  '@assets/style/global'
import to from 'await-to-js';
import commonModules from '@commonModules/index';
const {store,service}  = commonModules;
const { loginService, globalService } = service;

export default class Outrouter extends React.Component {

    render() {
        return <OutRouter />;
    }
}




















