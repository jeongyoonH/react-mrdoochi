import React, { Component } from 'react';
import Alert from 'react-s-alert'
import { Route, Switch } from 'react-router-dom';
import { Completereport } from './pages';
import Header from './components/Header';
import Home from './components/home/HomeComponet'
import List from './components/list/ListComponent';
import Analysis from './components/analysis/AnalysisComponet';
import Government from './components/government/Government';
import Accounting from './components/account/Accounting';
import DocumentManagement from './components/documentManagement/DocumentManagementComponet';
import Auth from './components/login/AuthComponent'
import AddCompany from './components/company/AddCompany';
import MemberManage from './components/addmember/MemberManage';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact = {true} component={Home}/>
                    <Route exact path="/AddCompany/" component={AddCompany}/>
	                  <Route exact path="/Marketing/" component={List}/>
	                  <Route exact path="/Analysis/:name" component={Analysis}/>
                    <Route exact path="/Government/" component={Government}/>
                    <Route exact path="/Accounting/" component={Accounting}/>
                    <Route exact path="/Document/" component={DocumentManagement}/>
                    <Route exact path="/Login/" component={Auth}/>
                    <Route exact path="/Completereport/:name" component={Completereport}/>
                    <Route exact path="/MemberManage" component={MemberManage}/>
                    
                    {/*<Route component={NotFound} />*/}
                </Switch>
                <Alert stack={true} timeout={5000} />
            </div>
        );
    }
}

export default App;