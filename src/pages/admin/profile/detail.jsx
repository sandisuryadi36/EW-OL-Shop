import { useState } from "react"

const DetailProfile = (props) => {
    const [editable, setEditable] = useState(false)
    const [properties, setProperties] = useState({
        name: props.name,
        defaultValue: props.defaultValue,
        className: "form-control m-0 border-0 bg-white " + props.className,
    })
    const [inputValue, setInputValue] = useState(props.defaultValue)

    function setEdit() {
        setEditable(!editable)
        setProperties({
            ...properties,
            className: "form-control m-0 bg-white " + props.className,
        })
    }

    function saveEdit() {
        if (inputValue !== properties.defaultValue) {
            setProperties({
                ...properties,
                className: "form-control text-success m-0 bg-white border border-2 border-success " + props.className,
            })
            setEditable(!editable)
            props.edited({ name: props.name, action: "save" })
        } else {
            setProperties({
                ...properties,
                className: "form-control m-0 border-0 bg-white " + props.className,
            })
            setEditable(!editable)
            props.edited({ name: props.name, action: "cancel" })
        }
    }

    return (
        <div className="mb-3">
            <label>{props.label}</label>
            <div className="d-flex flex-row gap-3 align-items-center">
                {editable
                    ? <>
                        <input id={"id-" + props.name} type="text" {...properties} onChange={(e) => setInputValue(e.target.value)} ></input>
                        <button type="button" className="btn btn-link m-0 p-0 text-reset" onClick={saveEdit} >
                            <i className="bi bi-check2 fs-4" />
                        </button>
                    </>
                    : <>
                        <input id={"id-" + props.name} type="text" {...properties} readOnly></input>
                        <button type="button" className="btn btn-link m-0 p-0 text-reset" onClick={setEdit} >
                            <i className="bi bi-pencil-fill fs-4" />
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default DetailProfile