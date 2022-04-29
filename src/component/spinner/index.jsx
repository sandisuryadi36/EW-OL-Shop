import "./index.scss";

const Spinner = (props) => {
    if (props.button) {
        return (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        )
    } else return (
        <div className="loading-bg">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner;