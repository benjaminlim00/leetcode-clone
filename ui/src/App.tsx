import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { ViewUpdate } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { SuccessButton } from './common/Buttons';
import axios from 'axios';

type TStatus = 'True' | 'False';

function App() {
  const [code, setCode] = useState(`
import sys;

def add(a, b):
  return a + b

if __name__ == "__main__":
  a = int(sys.argv[1])
  b = int(sys.argv[2])
  result = int(sys.argv[3])
  print(add(a, b) == result)`);

  const [question, setQuestion] = useState(
    'Create a function that adds two numbers in Python.'
  );

  const [statuses, setStatuses] = useState<TStatus[]>([]);
  const [isError, setIsError] = useState(false);

  const submitCode = () => {
    axios
      .post('http://localhost:80/python', { code })
      .then(({ data }) => {
        setStatuses([data.status]);
      })
      .catch(err => {
        console.warn(err);
        setIsError(true);
      });
  };

  const onChange = React.useCallback(
    (value: string, viewUpdate: ViewUpdate) => {
      setCode(value);
    },
    []
  );
  return (
    <main className="p-16">
      <h2 className="text-white text-lg mb-4">{question}</h2>

      {isError && (
        <h3 className={`p-3 rounded-md text-white mb-2 bg-red-500`}>
          Server crashed &#128128;
        </h3>
      )}

      {!isError &&
        statuses.map((status, i) => (
          <div
            key={i}
            className={`p-3 rounded-md text-white mb-2 ${
              status === 'True' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {status}
          </div>
        ))}

      <CodeMirror
        value={code}
        height="50vh"
        extensions={[python()]}
        onChange={onChange}
        theme={dracula}
      />

      <div className="mt-6">
        <SuccessButton text="Submit" onClick={submitCode} />
      </div>
    </main>
  );
}
export default App;
