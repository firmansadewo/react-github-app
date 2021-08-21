import { useState, useEffect } from "react";
import FilterComponent from "../../components/moleculs/filter/filter";
import arrow from '../../assets/img/arrow_white.svg'
import { useParams, useHistory } from "react-router";
import axios from 'axios'

import './filterPage.css'

const FilterPage = () => {
    const [id, setID] = useState("")
    const [title, setTitle] = useState("")
    const [year, setYear] = useState("")
    const [page, setPage] = useState(1)
    const [filteredData, setFilteredData] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const [isSubmitted, setisSubmitted] = useState(false)
    const [isBottom, setisBottom] = useState(false)

    const history = useHistory()
    const pageParams = useParams()

    let url = 'https://www.omdbapi.com?apikey=faf7e5bb'

    const handleFilter = () => {
        setisLoading(true)
        let movieId = id != '' || id.length != 0 ? `&i=${id}` : ''
        let judul = title != '' || title.length != 0 ? `&s=${title}` : ''
        let tahun = year != '' || year.length != 0 ? `&y=${year}` : ''
        let halaman = `&page=1`

        let filter = movieId + judul + tahun + halaman
        setisSubmitted(true)
        setisBottom(false)
        setFilteredData(null)
        getFilteredData(filter)
    }

    const handleReset = () => {
        setID('')
        setTitle('')
        setYear('')
        setPage(1)
        setFilteredData(null)
        setisSubmitted(false)
        setisBottom(false)
    }

    const getFilteredData = async (filter) => {
        let filtering = await axios.post(`${url}${filter}`)
        setisLoading(false)
        setPage(pageParams || 1)

        if (typeof filtering == Object) {
            setFilteredData(filtering.data)
        }
        // cek apakah data lebih dari 5 untuk infinite scroll
        else if (filtering.data?.Search?.length > 5 && !isBottom) {
            setFilteredData(filtering.data.Search.filter((_, idx) => idx < 5))
        }
        else if (filtering.data?.Search?.length > 5 && isBottom) {
            setFilteredData([...filteredData, ...filtering.data.Search.filter((_, idx) => idx > 5)])
        }
    }

    // handle scroll saat user sampai ke halaman bawah
    const handleScroll = (e) => {

        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

        if (bottom) {
            setisBottom(true)

            let movieId = id != '' || id.length != 0 ? `&i=${id}` : ''
            let judul = title != '' || title.length != 0 ? `&s=${title}` : ''
            let tahun = year != '' || year.length != 0 ? `&y=${year}` : ''

            let filter = movieId + judul + tahun

            getFilteredData(filter)
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isBottom, isSubmitted]);

    return (
        <section>
            <div className="filter-backdrop">
                {/* section filter */}
                <section className="filter-wrapper">
                    <span className="filter-title">
                        <img className="filter-back" src={arrow} alt="back" onClick={() => history.goBack()} />
                        Filter Movie
                    </span>
                    <FilterComponent
                        id={id}
                        title={title}
                        year={year}
                        setID={setID}
                        setTitle={setTitle}
                        setYear={setYear}
                        handleFilter={handleFilter}
                        handleReset={handleReset}
                    />

                </section>
            </div>


            {/* section filtered data */}
            <section>
                {isLoading ? <div className="loading-wrapper">
                    <div className="loading" />
                </div> : filteredData != null && filteredData.length != 0 ? filteredData.map((item, index) =>
                    <div onClick={() => history.push(`/${item.imdbID}`)} className="filteredData-card" key={index}>
                        {item.Poster != 'N/A' ? <img className="filter-poster" src={item.Poster} alt="movie-image" /> : <div className="filter-poster">Poster Not Found</div>}
                        <div className="filter-info-wrapper">
                            <p className="filter-info-title">{item.Title}</p>
                            <p className="filter-info-text">Year:  <b>{item.Year}</b></p>
                            <p className="filter-info-text">Type:  <b>{item.Type}</b></p>
                        </div>
                    </div>
                ) :
                    filteredData != null && typeof filteredData == Object ?
                        <div onClick={() => history.push(`/${filteredData.imdbID}`)} className="filteredData-card">
                            {filteredData.Poster != 'N/A' ? <img className="filter-poster" src={filteredData.Poster} alt="movie-image" /> : <div className="filter-poster">Poster Not Found</div>}
                            <div className="filter-info-wrapper">
                                <p className="filter-info-title">{filteredData.Title}</p>
                                <p className="filter-info-text">Year:  <b>{filteredData.Year}</b></p>
                                <p className="filter-info-text">Type:  <b>{filteredData.Type}</b></p>
                            </div>
                        </div>
                        :
                        <div className="empty-data">
                            <span>
                                <img src="" alt="" />
                                <p>Tidak ada data.</p>
                                {/* <p>{error}</p> */}
                            </span>
                        </div>}
            </section>
        </section>
    );
}

export default FilterPage;