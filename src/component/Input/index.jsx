import './index.scss';

const Input = (props) => {
  switch (props.type) { 
    case "checkbox":
      return (
        <div className='checkbox'>
          <input className={props.error && 'is-invalid'} {...props} />
          <label>{props.label}</label>
          {props.error && props.error.map(err => <p key={err} className="invalid">* {err}</p>)}
        </div>
      )
    case "select":
      return (
        <div>
          <label>{props.label}</label>
          <select className={`form-control ${props.error && 'is-invalid'}`} {...props}>
            {props.children}
          </select>
          {props.error && props.error.map(err => <p key={err} className="invalid">* {err}</p>)}
        </div>
      )    
    case "textarea":
      return (
        <div>
          <label>{props.label}</label>
          <textarea className={`form-control ${props.error && 'is-invalid'}`} {...props}></textarea>
          {props.error && props.error.map(err => <p key={err} className="invalid">* {err}</p>)}
        </div>
      )
    default:
      return (
        <div>
          <label>{props.label}</label>
          <input className={`form-control ${props.error && 'is-invalid'}`} {...props} />
          {props.error && props.error.map(err => <p key={err} className="invalid">* {err}</p>)}
        </div>
      )
  }
}

export default Input;