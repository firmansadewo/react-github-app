import './datalist.css'
import axios from 'axios'
import not_found from '../../../assets/img/not_found.png'

import { useState, useEffect } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router'
import Pagination from '../../atoms/pagination/pagination'
import PerPage from '../../atoms/perPage/perPage'

const DataList = () => {
    const [data, setData] = useState(null)
    const [options, setOptions] = useState({
        page: 1,
        visible: 5,
        per_page: [5, 10],
        itemsPerPage: 5,
        totalPages: 1,
        filter: ''
    })
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const history = useHistory()

    const location = useLocation()
    let split = location.search.split("username=")
    let username = split[1]

    const SetPerPage = (newVal) => {
        setOptions(options => ({ ...options, itemsPerPage: newVal, }))
        setOptions(options => ({ ...options, page: 1 }))
    }

    let url = `https://api.github.com/users/${username}/repos`
    const abortController = new AbortController()

    let perPage = options.itemsPerPage && `per_page=${options.itemsPerPage}`
    let query = perPage

    const fetchData = async () => {
        try {
            const data = await axios.get(`${url}?${query}`, { signal: abortController.signal })

            if (data.status == 403 || data.status == "403") {
                return setData(null)
            }

            setData(data.data)

            setisLoading(false)
        } catch (err) {
            setError(err)
            setisLoading(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData()
        }, 700)
        return () => abortController.abort()
    }, [options.itemsPerPage, username])

    return (
        <section>
            <section>
                <div className="section-header">
                    <span className="section-title">
                        <p className="section-mark">.</p>
                        <p>Repo List</p>
                    </span>
                    <PerPage options={options} setPerPage={SetPerPage} />
                </div>
                <div className="data-wrapper">
                    {isLoading ? <div className="loading-wrapper">
                        <div className="loading" />
                    </div> :
                        data == null || data.length == 0 ?
                            <div className="data-notfound-wrapper">
                                <img className="data-not-found" src={not_found} alt="not_found" />
                            </div> :
                            data.map((item, index) =>
                                <div>
                                    <div className="data-card" onClick={() => window.location.href = `https://github.com/${item.full_name}`} key={index}>
                                        <p className="data-title">{item.name}</p>
                                        <p className="data-released">{item.full_name}</p>
                                        <p className="data-released">{item.language}</p>
                                    </div>
                                </div>
                            )
                    }
                </div>
                <div className="section-pagination">
                    <Pagination options={options} fetch={fetchData} />
                </div>
            </section>
        </section>
    )
}

export default DataList