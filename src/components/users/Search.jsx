import React, { useContext, useState } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [search, setSearch] = useState('');

  const _onSubmit = e => {
    e.preventDefault();

    if(search){
        githubContext.searchUsers(search);
        setSearch('');
    }else{
       alertContext.setAlert('Please enter something', 'light')
    }

  };

  return (
    <div>
      <form className='form' onSubmit={_onSubmit}>
        <input 
            type='text' 
            name='text' 
            placeholder='Search Users...' 
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
        <input 
            type='submit' 
            value='Search' 
            className='btn btn-dark btn-block' 
        />
      </form>
      {githubContext.users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>Clear</button>
      )}
    </div>
  )
}

export default Search
