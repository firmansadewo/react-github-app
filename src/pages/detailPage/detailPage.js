import './detailPage.css'
import arrow from '../../assets/img/arrow_white.svg'
import metacritic from '../../assets/img/metacritic.png'
import imdb from '../../assets/img/imdb.png'
import star_rate from '../../assets/img/star_rate.png'


import axios from 'axios'
import { useState, useEffect } from "react"
import { useParams, useHistory } from 'react-router-dom'


const DetailPage = () => {
    const [data, setData] = useState({})
    const [isLoading, setisLoading] = useState(true)
    const [metascore, setMetascore] = useState('')
    const { id } = useParams()
    const history = useHistory()

    let url = 'https://www.omdbapi.com?apikey=faf7e5bb'

    const fetchDetail = async () => {
        try {
            const data_detail = await axios.get(`${url}&i=${id}`)

            // prevention kalau api 'omdb' terlimit request nya dan tidak bisa digunakan
            if (data_detail.status != 200) {
                const data_detail = await axios.get(`/data/${id}`)
                setData(data_detail.data)
                if (parseInt(data_detail.data.Metascore) <= 39) {
                    setMetascore('red')
                }
                else if (parseInt(data_detail.data.Metascore) <= 60) {
                    setMetascore('yellow')
                }
                else if (parseInt(data_detail.data.Metascore) > 60) {
                    setMetascore('green')
                }
            }
            else {
                setData(data_detail.data)
                if (parseInt(data_detail.data.Metascore) <= 39) {
                    setMetascore('red')
                }
                else if (parseInt(data_detail.data.Metascore) <= 60) {
                    setMetascore('yellow')
                }
                else if (parseInt(data_detail.data.Metascore) > 60) {
                    setMetascore('green')
                }
            }

            setisLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetchDetail()
        }, 500)

    }, [id])


    return (
        <section >
            {/* {isLoading ? <div className="title-loading">.</div>
                : <div className="detail-title">
                    <img onClick={() => history.push('/')} className="detail-back-btn" src={arrow} alt="back" />
                    {data.Title}
                </div>} */}
            <div className="detail-backdrop">
                {isLoading ? <div className="loading-wrapper">
                    <div className="loading" />
                </div>
                    :
                    <section className="detail-wrapper">
                        {/* image section */}
                        <img onClick={() => history.goBack()} className="detail-back-btn" src={arrow} alt="back" />
                        <aside className="detail-left-section">
                            <div className="poster-detail-wrapper">
                                {data.Poster != 'N/A' ? <img className="poster-detail" src={data.Poster} alt="" /> : <div className="poster-detail">Poster Not Found</div>}
                            </div>
                            <div className="detail-rating-wrapper">
                                <div className="detail-rating-wrapper">
                                    <img className="detail-metacritic" src={metacritic} alt="metacritic" />
                                    <p
                                        className={`detail-metacritic-text ${metascore == 'red' ? 'red' : metascore == 'yellow' ? 'yellow' : metascore == 'green' ? 'green' : 'dark'}`}>
                                        {data.Metascore}
                                    </p>
                                </div>
                                <div className="detail-rating-wrapper">
                                    <img className="detail-imdb" src={imdb} alt="imdb" />
                                    <span className="detail-imdb-text">
                                        <img className="star_rate" src={star_rate} alt="star_rate" />
                                        <p className="detail-imdb-text">{data.imdbRating}</p>
                                    </span>
                                </div>
                            </div>
                        </aside>

                        {/* info section */}
                        <main className="detail-right-section">
                            <section className="detail-info-wrapper">
                                <div className="detail-info-movie-title">{data.Title}</div>
                                <div className="detail-info-year">({data.Year})</div>

                                <i className="detail-info-text">{data.Genre} - {data.Runtime}</i>

                                <div className="detail-info-title">Cast</div>
                                <div className="detail-info-text">{data.Actors}</div>

                                <div className="detail-info-title">Director</div>
                                <div className="detail-info-text">{data.Director}</div>

                                <div className="detail-info-title">Writer</div>
                                <div className="detail-info-text">{data.Writer}</div>

                                <div className="detail-info-title">Overview</div>
                                <div className="detail-info-text">{data.Plot}</div>
                            </section>
                        </main>
                    </section>
                }
            </div>
        </section>
    )
}

export default DetailPage