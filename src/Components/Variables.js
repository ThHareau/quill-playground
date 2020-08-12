import React from 'react'

const Variable = ({name, value, onChange}) => (
    <div style={{display: 'flex'}}>
        <label htmlFor={`variable-${name}`} style={{flex: 1}}>{name}: </label>
        <input type="text" name={name} value={value} id={`variable-${name}`} style={{flex: 2}}
               onChange={({target: {value}}) => onChange(value)}/>
    </div>
)

export default ({variables, setVariables}) => {
    const setVariable = (name, value) => {
        setVariables(variables.map((variable) => variable.name === name ? {...variable, name, value} : variable))
    }

    return (<form>
        {variables.map(({name, value}) => (
            <Variable name={name} value={value} key={name} onChange={(update) => setVariable(name, update)}/>))}
    </form>)
}