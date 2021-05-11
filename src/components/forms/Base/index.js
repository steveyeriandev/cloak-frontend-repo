import Form from "react-bootstrap/Form";

function BaseForm({ children, ...rest }) {
  // A form element for our other forms to derive from.
  return <Form {...rest}>{children}</Form>;
}

export default BaseForm;
