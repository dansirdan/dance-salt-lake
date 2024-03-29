import React from "react";

export function Form(props) {
  return (
    <form {...props}>
      {props.children}
    </form>
  )
}
 
export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="10" {...props} />
    </div>
  );
}

export function Dropdown(props) {
  return (
    <div className="form-group">
      <select className="form-control" {...props}>
        {props.children}
      </select>
    </div>
  )
}

export function Checkbox(props) {
  return (
    <div className="form-group form-check">
      <input type="checkbox" className="form-check-input" name={props.name} {...props} />
      <label htmlFor={props.name}>{props.lable}</label>
    </div>
  )
}
// Buttons
export function FormBtn(props) {
  return (
    <button {...props} style={{ marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}

export function Btn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-primary">
      {props.children}
    </button>
  );
}

export function LogoutBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-danger">
      {props.children}
    </button>
  );
}



