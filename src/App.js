import React from 'react'
import 'antd/dist/antd.css';
import { Route, BrowserRouter as Router, Switch, Redirect,useHistory} from 'react-router-dom';
import Login from './views/Login/Login';
import Home from './views/layOut/Index';

export default function App() {

  return (
    <div>
      <Router>
        <Route path="/"  render={()=><Redirect to="/index/home"></Redirect>}></Route>
        <Route path="/index" render={(props) => {
          if (sessionStorage.getItem("token")) {
            // history.push('/index/home')
          
            return <Home {...props}></Home>
          } else {
            return <Redirect to="/login"></Redirect>
          }
        }}></Route>
        
        <Route path="/login" render={() => {
          if (sessionStorage.getItem("token")) {
            return <Redirect to="/index/home"></Redirect>
          } else {
            return <Login></Login>  
          }
        }}></Route>
      </Router>
    </div>
  )
}
