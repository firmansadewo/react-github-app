
import { useMemo, useState } from 'react';
import './pagination.css'


const Pagination = ({ options, setOptions, fetch }) => {
    const [page, setPage] = useState(options.page)


    const length = useMemo(() => {
        return Math.ceil(parseInt(options.totalPages) / parseInt(options.itemsPerPage))
    }, [options.totalPages, options.itemsPerPage])

    const getPage = () => {
        var data = []
        if (length <= options.visible) {
            for (let i = 0; i < length; i++) {
                data.push(i + 1)
            }
            return data
        }

        if (page > 1) data.push(1)

        if (page > 2 && length > options.visible + 1) data.push(undefined)

        if (page <= length - options.visible) {
            for (let i = 0; i < options.visible; i++) {
                var total = page + i;

                if (total < length) data.push(page + i)
            }
        }

        if (page > length - options.visible) {
            var val = length - options.visible + 1;

            for (let i = val; i < length; i++) {
                data.push(i)
            }
        }

        if (options.visible + page < length) data.push(undefined)

        if (options.visible + page <= length) data.push(length)

        return data
    }

    const clickPage = (item) => {
        let val = parseInt(item)
        if (!val) return;

        setPage(val)
        fetch(`_page=${val}&_limit${options.itemsPerPage}`)
    }

    const clickPrev = () => {
        if (page === 1) return;

        setPage(v => v - 1)
        fetch(`_page=${page - 1}&_limit${options.itemsPerPage}`)
    }

    const clickNext = () => {
        if (page === length) return;

        setPage(v => v + 1)
        fetch(`_page=${page + 1}&_limit${options.itemsPerPage}`)
    }

    return (
        <div>
            <ul className="pagination-wrapper">
                <div onClick={clickPrev}>
                    <li className={page == 1 ? 'pagination-nav-disabled' : 'pagination-nav'}>
                        <div className={page == 1 ? 'arrow-left-disabled' : 'arrow-left'} />
                    </li>
                </div>
                {getPage().map((item, index) =>
                    <li
                        className={[
                            page == item ?
                                'page-active' :
                                'pages'
                        ]}
                        onClick={(e) => clickPage(e.target.textContent)}
                        key={index}>
                        {item || "..."}
                    </li>
                )}
                <div onClick={clickNext}>
                    <li className={page == length ? 'pagination-nav-disabled' : 'pagination-nav'}>
                        <div className={page == length ? 'arrow-right-disabled' : 'arrow-right'} />
                    </li>
                </div>
            </ul>

            <div style={{ color: '#ffffff', display: 'grid' }}>
                <span>{page}</span>
                <span>{length}</span>
                <span>{options.itemsPerPage}</span>
                <span>{getPage()}</span>
            </div>

        </div>
    )
}

export default Pagination;