import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { avatar_url, login, htmlUrl } }) => {

    return (
        <div className='card text-center'>
            <img 
                src={avatar_url} 
                className='round-img' 
                style={{ width:60 }} 
            />
            <h3>{login}</h3>
            <div>
                <Link 
                to={`/users/${login}`}
                className='btn btn-dark btn-sm my-1'>
                    More
                </Link>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem
