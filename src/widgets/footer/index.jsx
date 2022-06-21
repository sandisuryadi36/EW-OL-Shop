import "./index.scss"

const Footer = () => {
    return (
        <div className=" mt-auto">
            <footer className="footer bg-dark mt-5 pt-2">
                <div className="container">
                    <div className="row text-light">
                        <div className="col-md-6">
                            <p>&copy; 2022 <a href="https://www.linkedin.com/in/sandisuryadi36/" rel="noreferrer" target="_blank">Sandi Suryadi</a>.</p>
                        </div>
                        <div className="col-md-6 text-end">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="https://www.github.com/sandisuryadi36/" rel="noreferrer" target="_blank">
                                        <i className="bi bi-github"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="https://www.instagram.com/sandisuryadi36/" rel="noreferrer" target="_blank">
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="https://www.facebook.com/sandi.suryadi" rel="noreferrer" target="_blank">
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="https://www.twitter.com/sandisuryadi36" rel="noreferrer" target="_blank">
                                        <i className="bi bi-twitter"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="https://www.linkedin.com/in/sandisuryadi36/" rel="noreferrer" target="_blank">
                                        <i className="bi bi-linkedin"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;