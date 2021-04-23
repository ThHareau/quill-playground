import React, {useEffect, useRef, useState} from 'react'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import VariableBlot from './Blots/VariableBlot'
import InputBlot from './Blots/InputBlot'
import EmbedSelector from './Modules/EmbedSelector'
import TabNavigator from './Modules/TabNavigator'

const getValue = (variableName, variables) => variables.find(({name}) => name === variableName)?.value || `[NODEF ${variableName}]`

const replaceVariablesInInsert = (op, variables) => {
  if (!op.insert) return op

  const {insert} = op
  if (insert.variable)
    return {...op, insert: getValue(insert.variable.name, variables)}

  return op
}

const replaceVariables = (delta, variables) => {
  const {ops} = delta

  return {
    ...delta,
    ops: ops.map((op) => replaceVariablesInInsert(op, variables))
  }
}

Quill.register('blots/embed', VariableBlot);
Quill.register('blots/embed', InputBlot);
Quill.register('modules/embedSelector', EmbedSelector);
Quill.register('modules/tabNavigator', TabNavigator);

const formats = ["variable", "bold", 'input', "list", "header"] // add custom format name + any built-in formats you need

export default ({text, onChange, template, variables}) => {
  const ref = useRef()

  const [shouldRerenderVariables, setShouldRerenderVariables] = useState(true)

  useEffect(() => {
    onChange(template)
    setShouldRerenderVariables(true)
  }, [template, onChange, variables])

  useEffect(() => {
    if (!shouldRerenderVariables) return
    if (!ref.current) return

    const editor = ref.current.getEditor()
    const delta = editor.getContents()
    const updatedDelta = replaceVariables(delta, variables)

    setShouldRerenderVariables(false)
    editor.setContents(updatedDelta, Quill.sources.API)
  }, [text, shouldRerenderVariables, variables])


  return <ReactQuill theme="snow" value={text} onChange={onChange} formats={formats} ref={ref} modules={
    {
      embedSelector: {
        blots: [InputBlot],
        action: 'select',
      },
      tabNavigator: {
        blots: [InputBlot],
      },
    }
  }/>
}
