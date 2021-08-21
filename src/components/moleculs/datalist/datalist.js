import './datalist.css'
import axios from 'axios'
import Slider from '../../atoms/slider/slider'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

const Carousel = ({ category }) => {
    const [data, setData] = useState(null)
    const [perPage, serPerPage] = useState(10)
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const history = useHistory()

    let url = 'https://api.github.com/orgs/arduino-libraries/repos'
    const abortController = new AbortController()

    let per_page = perPage && `per_page=${perPage}`
    let query = per_page

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
    }, [])

    return (
        <section>
            <section>
                <span className="section-title">
                    <p className="section-mark">.</p>
                    <p>Repo List</p>
                </span>
                <div className="data-wrapper">
                    {isLoading ? <div className="loading-wrapper">
                        <div className="loading" />
                    </div> :
                        data != null && data.map((item, index) =>
                            <div className="data-card" onClick={() => history.push(`/${item.id}`)} key={index}>
                                <p className="data-title">{item.name}</p>
                                <p className="data-released">{item.full_name}</p>
                                <p className="data-released">{item.language}</p>
                            </div>
                        )}
                </div>
            </section>
        </section>
    )
}

export default Carousel