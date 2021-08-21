import './filter.css'

const FilterComponent = ({ id, title, year, setID, setTitle, setYear, handleFilter, handleReset }) => {

    return (
        <div>
            <form action="submit">
                <div className="form-wrapper">
                    <div className="form-filter-title">
                        Filter by id
                        <input
                            className="form-filter"
                            placeholder="Filter by id"
                            type="text"
                            value={id}
                            onChange={(e) => setID(e.target.value)}
                        />
                    </div>

                    <div className="form-filter-title">
                        Filter by title
                        <input
                            className="form-filter"
                            placeholder="Filter by title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-filter-title">
                        Filter by year
                        <input
                            className="form-filter"
                            placeholder="Filter by year"
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                </div>

                <button className="form-filter-btn" onClick={(e) => { e.preventDefault(); handleFilter() }}>Filter</button>
                <p className="form-filter-reset" onClick={handleReset}>Reset</p>
            </form>
        </div>
    );
}

export default FilterComponent;
