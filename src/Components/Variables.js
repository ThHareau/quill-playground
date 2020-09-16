import React from 'react'

const Variable = ({name, value, onValueNameChange}) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <label style={{flex: 1}} htmlFor={name}>{name}: </label>

    <input type="text" value={value} style={{flex: 2}} id={name}
           onChange={({target: {value: change}}) => onValueNameChange(change)}/>
  </div>
)

export default ({variables, setVariables}) => {
  const setVariable = (name, value) => {
    setVariables(variables.map((variable) => variable.name === name ? {...variable, name, ...value} : variable))
  }

  return (<form>
    {variables.map(({name, value, displayName}) => (
      <Variable
        name={name}
        value={value}
        key={name}
        displayName={displayName}
        onDisplayNameChange={(update) => setVariable(name, {value, displayName: update})}
        onValueNameChange={(update) => setVariable(name, {displayName, value: update})}
      />))}
  </form>)
}
