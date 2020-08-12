import React, {useState} from 'react';
import './App.css';
import Variables from './Components/Variables'

const App = () => {
    const [variables, setVariables] = useState([
        {
            name: 'last-name',
            value: '',
        },
        {
            name: 'first-name',
            value: '',
        }
    ])
    const [clickedVariable, setClickedVariable] = useState()

    return (<div className="App" style={{maxWidth: '80%', margin: 'auto'}}>
        <div style={{width: '500px', margin: '5em'}}>
            <Variables variables={variables} setVariables={setVariables}/>
        </div>
        <div style={{display: 'flex'}}>
            <div style={{border: 1, flex: 4}}>
                <h3>Quill</h3>
                <p>Clicked variable: {clickedVariable?.value || ''}</p>
            </div>
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <h3>Variables</h3>
                {variables.filter(({value}) => !!value)
                    .map((variable) => <button key={variable.name}
                                               onClick={() => setClickedVariable(variable)}>{variable.name}</button>)
                }
            </div>
        </div>
    </div>);
}

export default App;
