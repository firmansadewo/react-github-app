import './search.css'
import searchImg from '../../../assets/img/search.svg'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useHistory } from 'react-router'

import axios from 'axios'

const Search = ({ placeholder }) => {
    const [data, setData] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [activeItem, setActiveItem] = useState(0)
    const [error, setError] = useState('')
    const history = useHistory()



    let url = 'https://api.github.com/search/users'
    const searchData = async () => {
        setisLoading(true)
        let search = await axios.get(`${url}?q=${searchTerm}`)
        setisLoading(false)

        setData(search.data.items)
    }

    const searchResult = useMemo(() => {
        if (data != null || data.length != 0) {
            return data.filter(item => item.login.toLowerCase().includes(searchTerm.toLowerCase()))
        }
        return ""
    })

    const handleInput = (e) => {
        setSearchTerm(e.target.value)
        setShowOptions(true)
    }

    const handleClick = (item) => {
        setSearchTerm(item.login)
        setShowOptions(true)
        setActiveItem(item.imdbID)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.length != 0) {
                searchData()
            }
        }, 700)
        return () => { clearTimeout(timer) }
    }, [searchTerm])



    return (
        <div className="search-bar" onBlur={searchTerm.length == 0 ? () => setShowOptions(false) : () => { }}>
            <input
                className="search-field"
                type="text"
                value={searchTerm}
                onChange={handleInput}
                placeholder={placeholder}
            />
            <img className="search-img" src={searchImg} alt="" />
            {/* section autocompletenya */}
            <div className="dropdown-class" onClick={() => setShowOptions(true)} >
                {showOptions && <ul>
                    {isLoading ?
                        <li className="item-class">Searching user by username...</li>
                        : searchResult.length == 0 && isLoading == false && error == 'Too many results.' ?
                            <li className="item-class">Data terlalu banyak.</li>
                            : searchResult.length == 0 && isLoading == false ?
                                <li className="item-class">Tidak ada data.</li>
                                : searchResult.filter((_, idx) => idx < 5).map((item, index) =>
                                    <li onClick={() => { handleClick(item); history.push(`/?username=${item.login}`) }} className="item-class" key={index}>
                                        <span class="avatar-wrapper">
                                            {item.login}
                                            <img className="avatar-class" src={item.avatar_url} alt="profile-pic" />
                                        </span>
                                    </li>
                                )}
                </ul>}
            </div>
        </div >
    )

}

export default Search