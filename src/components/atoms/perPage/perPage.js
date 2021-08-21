import './perPage.css'

const PerPage = ({ options, setPerPage }) => {

    const items = options.per_page

    return (
        <div className="perpage-wrapper">
            <select onChange={(e) => setPerPage(e.target.value)} className="perpage-box">
                {items.map((item, index) =>
                    <option key={index} value={item}>{item}</option>
                )
                }
            </select>
        </div>
    )
}

export default PerPage;