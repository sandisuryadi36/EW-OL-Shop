import './index.scss';

const Input = (props) => {
  if(props.type === 'checkbox') {
    return (
      <div className='checkbox'>
        <input className={props.error && 'is-invalid'} {...props} />
        <label>{props.label}</label>
        { props.error && props.error.map(err => <p key={err} className="invalid">* {err}</p>)}
      </div>
    )
  } else if (props.type === 'select') {
    return (
      <div>
        <label>{props.label}</label>
        <select className={`form-control ${props.error && 'is-invalid'}`} {...props}>
          { props.children }
        </select>
        { props.error && props.error.map(err => <p key={err} className="invalid">* {err}</p>)}
      </div>
    )    
  } else {
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