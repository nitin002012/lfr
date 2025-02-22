import React, { useState, useRef, useEffect } from "react";

interface LooseObject {
    [key: string]: any
}

interface Props {
    properties: LooseObject,
    handleData: any,
    name: any,
    parentState: any,
}

export default function TextField(props: Props) {
    const { properties, handleData, name } = props
    const [error, setError] = useState(false)
    let textRef: any = useRef();

    const caseChange = (value: any) => {
        if (properties["lowercase"]) return value.toLowerCase();
        if (properties["uppercase"]) return value.toUpperCase();
        return value
    }

    const disAllowSpace = (value: any) => {
        if (properties['disAllowSpace']) return value.trim()
        return value
    }

    function checkValidation(regex: string, value: string) {
        const re = new RegExp(regex);
        if (re.test(value) || !value) {
            setError(false);
            return true;
        } else {
            setError(true);
            return false;
        }
    }

    const handleChange = (e: any) => {
        let input = e.target.value;
        let value = caseChange(input)
        value = disAllowSpace(value)
        if (properties.validationRegex) {
            handleData(value, !checkValidation(properties['validationRegex'], value))
        } else {
            handleData(value, false)
        }
    }

    return (
        <>
            <div className="llm-field-text-container">
                <h3 className="llm-field-text-label">{properties['label']}</h3>
                <input
                    id={name}
                    name={name}
                    className= {`llm-field-text ${properties['className'] ?? ''}`}
                    type="text"
                    placeholder={properties['placeholder'] ?? null}
                    value={props.parentState[name]?.value}
                    // value={''}

                    disabled={properties['readOnly'] ?? false}
                    required={properties['required'] ?? false}
                    autoFocus={properties['autoFocus'] ?? false}
                    autoComplete={properties['autoComplete'] ? "on" : "off"}
                    hidden={properties["hidden"] ?? false}
                    readOnly={properties["readonly"] ?? false}
                    maxLength={properties["maxLength"] ?? null}
                    minLength={properties["minLength"] ?? null}
                    pattern={properties['validationRegex'] ?? null}
                    onChange={(e) => { handleChange(e) }}
                    style={properties.style || {}}
                    ref={textRef}
                />
                <div className="llm-field-text-message-container">
                    <p className="llm-field-text-description">{properties['description']}</p>
                    {error ? <p className="llm-field-text-error-message">{properties?.['errorMessage'] ?? `Something went wrong in ${name} field`}</p> : null}
                </div>
            </div>

            <style>
                {`
                    .llm-field-text-container{
                        font-family: 'Nunito Sans';
                    }

                    .llm-field-text-label{
                        font-weight: 400;
                        font-size: 16px;
                        margin: 5px 0;
                    }

                    .llm-field-text{
                        width: 95%;
                        font-weight: 400;
                        font-size: 14px;
                        border: 1px solid #000;
                        border-radius: 5px;
                        padding: 7px;
                    }
                    
                    .llm-field-text-message-container{
                        margin-bottom: 20px;
                    }

                    .llm-field-text-description{
                        margin: 5px 0px;
                        font-weight: 200;
                        font-size: 14px;
                    }

                    .llm-field-text-error-message{
                        marging-top: 5px;
                        font-weight: 600;
                        font-size: 14px;
                        color: #9e001a;
                    }
                `}
            </style>
        </>
    )
}