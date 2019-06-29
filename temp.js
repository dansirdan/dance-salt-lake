// Form

export function Form(props) {
  return (
    <form method="POST" action={props.route}>
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
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function Dropdown(props) {
  return (
    <div>
      <section {...props}>
        {props.children}
      </section>
    </div>
  )
}

export function Submit(props) {
  return (
    <button {...props} type="submit" >
      {props.children}
    </button>
  );
}