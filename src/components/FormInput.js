import React from "react";

export default function FormInput(props)  {
        return (
            <>
            <div className={props.formInputClassName}>
            <label className={props.labelClassName}>{props.title}</label>
                <input type={props.type} className={props.inputClassName} value={props.value} onChange={(e) => props.onChange(e)}  />
                {props.validation===true ? <label className="error">{props.errorMessage}</label> :''}
                </div>
            </>
        )

}

