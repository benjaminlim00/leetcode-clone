import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { ViewUpdate } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { SuccessButton } from './common/Buttons';

function App() {
  const [code, setCode] = useState(`console.log('hello world!');`);

  const [question, setQuestion] = useState(
    'Create a function that adds two numbers in JavaScript.'
  );

  const onChange = React.useCallback(
    (value: string, viewUpdate: ViewUpdate) => {
      console.log('value:', value);
      setCode(value);
    },
    []
  );
  return (
    <main className="p-16">
      <h2 className="text-white text-lg mb-4">{question}</h2>
      <CodeMirror
        value={code}
        height="50vh"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={dracula}
      />

      <div className="mt-6">
        <SuccessButton text="Submit" onClick={() => {}} />
      </div>
    </main>
  );
}
export default App;
