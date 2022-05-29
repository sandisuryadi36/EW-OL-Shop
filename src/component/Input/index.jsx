import TextEditor from '../textEditor';
import './index.scss';

const Input = (props) => {
  switch (props.type) {
    case "checkbox":
      return (
        <div className='checkbox d-flex justify-content-end align-items-center'>
          <label>{props.label}</label>
          <input className={props.error && 'is-invalid'} {...props} />
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
    case "editor":
      return (
        <div>
          <label>{props.label}</label>
          <TextEditor name={props.name} value={props.defaultValue} />
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