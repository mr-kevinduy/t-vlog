import React from 'react';

class FormInput extends React.Component {
  render() {
    const { type, name, label, messages, error } = this.props;

    return (
      <>
        <label
          className="form-label"
          htmlFor={ name }
        >{ label }</label>
        <input
          className="w-full"
          id={ name }
          name={ name }
          type={ type ? type : "text"}
          {...this.props}
        />
        { messages && messages.map((message, index) => (<p key={index} className={`message is-${message.type} text-xs italic`}>{ message.text }</p>)) }
        { error && <p className={`message is-error text-xs italic`}>{ error }</p> }
      </>
    );
  }
}

export default FormInput;
