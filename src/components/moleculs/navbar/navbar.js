import './navbar.css'
import logo from '../../../assets/img/logo.png'

import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

import Search from '../../atoms/search/search'



const NavBar = () => {
    const history = useHistory()

    return (
        <div className="navbar">
            <div className="nav-wrapper">
                <Link to="/">
                    <div className="logo-nav-wrapper">
                        <img className="logo-nav" src={logo} alt="tmc_logo" />
                    </div>
                </Link>

                <div className="nav-menu">
                </div>
                {/* search bar */}
                <div className="search-wrapper">
                    <Search placeholder="Search user by username" />
                </div>
            </div>
        </div>
    )
}

export default NavBar