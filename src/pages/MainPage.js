import Datalist from '../components/moleculs/datalist/datalist'
import backdrop from '../assets/img/backdrop.jpg'
import './MainPage.css'

const MainPage = () => {
    return (
        <section>
            <div className="greeting-card-wrapper">
                <span>
                    {/* <img className="greeting-img" src={backdrop} alt="" /> */}
                </span>
                <div className="greeting-card">
                    <p className="greeting-text first-greet">Welcome to <b>React Github App!</b></p>
                    <p className="greeting-text second-greet">Search repositories here!</p>
                </div>
            </div>
            <div className="first-list">
                <Datalist category="latest" />
            </div>
        </section>
    )
}

export default MainPage