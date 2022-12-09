import React, {useState, useEffect, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';
import User from './components/users/User';


const App = () => {  
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //search github users
  const searchUsers = async search => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${search}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setLoading(false);
    setUsers(res.data.items)
  }

  //get single user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}
    ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setLoading(false);
    setUser(res.data)
  };

  //get single user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
    console.log(res.data)
    setLoading(false);
    setRepos(res.data)
  };

  //clear users form state
  const clearUsers = () => { 
    setUsers([]); 
    setLoading(false)
  };

  //set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
   <Router>
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Alert alert={alert}/>
        <Switch>
          <Route
          exact 
          path='/'
          render={() => (
            <Fragment>
              <Search 
                searchUsers={searchUsers}
                clearUsers={clearUsers}
                showClear={users.length > 0 ? true : false}
                setAlert={showAlert}
              />
              <Users loading={loading} users={users} />
            </Fragment>
          )}
          />
         <Route exact path='/about' component={About} />
          <Route 
          exact
          path='/users/:login'
          render={props => (
            <User 
            {...props}
            getUser={getUser}
            getUserRepos={getUserRepos}
            user={user}
            loading={loading}
            repos={repos}
            />
          )}
          />
        </Switch>
      </div>
    </div>
   </Router>
  )
}

export default App;
