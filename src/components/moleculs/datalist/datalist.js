import './datalist.css'
import axios from 'axios'
import Slider from '../../atoms/slider/slider'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import Pagination from '../../atoms/pagination/pagination'
import PerPage from '../../atoms/perPage/perPage'

const DataList = () => {
    const [data, setData] = useState(null)
    const [options, setOptions] = useState({
        page: 1,
        visible: 5,
        per_page: [5, 10, 15],
        itemsPerPage: 5,
        totalPages: 1,
        filter: ''
    })
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const history = useHistory()

    const SetPerPage = (newVal) => {
        setOptions(options => ({ ...options, itemsPerPage: newVal, }))
        setOptions(options => ({ ...options, page: 1 }))
    }

    let url = 'https://api.github.com/orgs/arduino-libraries/repos'
    const abortController = new AbortController()

    let perPage = options.itemsPerPage && `per_page=${options.itemsPerPage}`
    let query = perPage

    const fetchData = async () => {
        try {
            const data = await axios.get(`${url}?${query}`, { signal: abortController.signal })

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
    }, [options.itemsPerPage])

    return (
        <section>
            <section>
                <span className="section-title">
                    <p className="section-mark">.</p>
                    <p>Repo List</p>
                    <PerPage options={options} setPerPage={SetPerPage} />
                </span>
                <div className="data-wrapper">
                    {isLoading ? <div className="loading-wrapper">
                        <div className="loading" />
                    </div> :
                        data != null && data.map((item, index) =>
                            <div>
                                <div className="data-card" onClick={() => history.push(`/${item.id}`)} key={index}>
                                    <p className="data-title">{item.name}</p>
                                    <p className="data-released">{item.full_name}</p>
                                    <p className="data-released">{item.language}</p>
                                </div>
                            </div>
                        )}
                </div>
                <Pagination options={options} fetch={fetchData} />
            </section>
        </section>
    )
}

export default DataList