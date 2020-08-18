import React, {useState, useRef} from 'react';
import './App.css';
import Variables from './Components/Variables'
import TemplateEditor from './Components/TemplateEditor'
import RenderedEditor from './Components/RenderedEditor'

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
    const ref = useRef()
    const [template, setTemplate] = useState('')
    const [text, setText] = useState(template)

    return (<div className="App" style={{maxWidth: '80%', margin: 'auto'}}>
        <div style={{width: '600px', margin: '5em'}}>
            <Variables variables={variables} setVariables={setVariables}/>
        </div>
        <div style={{display: 'flex'}}>
            <div style={{border: 1, flex: 4}}>
                <h3>Quill</h3>
                <TemplateEditor text={template} onChange={setTemplate} ref={ref}/>
            </div>
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <h3>Variables</h3>
                {variables.filter(({value}) => !!value)
                    .map((variable) =>
                        <button
                            key={variable.name}
                            onClick={() => ref.current.variable(variable)}
                        >
                            {variable.name}
                        </button>
                    )
                }
            </div>
        </div>

        <div>
            <h2>Result</h2>
            <div>
                <RenderedEditor template={template} text={text} onChange={setText} variables={variables}/>
            </div>
        </div>
    </div>);
}

export default App;
