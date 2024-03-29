import React, {useRef, useState} from 'react';
import './App.css';
import RichTextViewer from './Components/RichTextViewer'
import Variables from './Components/Variables'
import TemplateEditor from './Components/TemplateEditor'
import RenderedEditor from './Components/RenderedEditor'

const VariablesPanel = ({variables, onVariableClicked}) => (
  <>
    <h3>Variables</h3>
    {variables.filter(({value}) => !!value)
      .map((variable) =>
        <button
          type="button"
          key={variable.name}
          onClick={() => onVariableClicked(variable)}
        >
          {variable.name}
        </button>
      )
    }
  </>
)

const InputsPanel = ({onInputClicked}) => (
  <>
    <h3>Inputs</h3>
    <button type="button" onClick={() => {
      // eslint-disable-next-line no-alert
      const displayName = prompt('Display name of your input?')
      const name = Date.now()
      onInputClicked({displayName, name})
    }}>New input
    </button>
  </>
)

export default () => {
  const ref = useRef()
  const [variables, setVariables] = useState([
    {
      name: 'last-name',
      value: 'Doe',
    },
    {
      name: 'first-name',
      value: 'Joan',
    }
  ])
  const [template, setTemplate] = useState('')
  const [text, setText] = useState(template)
  const [search, setSearch] = useState('')

  return (<div className="App">
    <div className="variableEditorView">
      <Variables variables={variables} setVariables={setVariables}/>
    </div>
    <div className="row">
      <div className="templateView">
        <h3>Quill</h3>
        <TemplateEditor text={template} onChange={setTemplate} ref={ref}/>
      </div>
      <div className="row column variableView">
        <VariablesPanel
          variables={variables}
          onVariableClicked={(variableName) => ref.current.variable(variableName)}
        />
        <InputsPanel onInputClicked={ref.current?.input}/>
      </div>
    </div>

    <div className="row">
      <div className="viewer">
        <h2>Result</h2>

        <div>
          <RenderedEditor template={template} text={text} onChange={setText} variables={variables}/>
        </div>
      </div>
      <div className="viewer">

        <h2>Rich text viewer</h2>
        <input placeholder="Search a word" onChange={({target: {value}}) => setSearch(value)} value={search}/>
        <div>
          <RichTextViewer text={text} search={search}/>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="viewer">
        <h2>Text result</h2>
        <div>
          {text}
        </div>
      </div>

      <div className="viewer">
        <h2>Template result</h2>
        <div>
          {template}
        </div>
      </div>
    </div>
  </div>);
}
