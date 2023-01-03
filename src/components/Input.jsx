import React from 'react';
import PropTypes from 'prop-types';


function Input(props) {

    return (
        <div className='setData'>
            <span>{props.textInput}</span>
            <input
                type={props.typeInput}
                defaultValue={props.defaultValue}
                onChange={props.setDrawingProperties}
            />
        </div>
    );
}

Input.propTypes = {
    typeInput: PropTypes.string.isRequired,
    textInput: PropTypes.string.isRequired,
    defaultValue: PropTypes.any.isRequired,
    setDrawingProperties: PropTypes.func.isRequired
}

export default Input;

