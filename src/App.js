import React, { useEffect } from 'react';
import {InputComponent} from './components/InputComponent';
import {ThemeSwitcherComponent} from './components/ThemeSwitcherComponent';
import './styles/App.scss';

function App() {
  const [values, setValues] = React.useState([ '' ]);
  const [result, setResult] = React.useState('');
  const [newItemInitiator, setNewItemInitiator] = React.useState(0);
  const [newItemCreated, setNewItemCreated] = React.useState(false);

  function addItem(e) {
    e.preventDefault();
    const index = parseInt(e.target.parentElement.getAttribute('data-index'));
    // Create copy of values to splice with new empty element
    const newValues = [...values];
    newValues.splice(index + 1, 0, '');
    setValues(newValues);
    // Reset result
    setResult('');
    // Set the newItemInitator to the index from where addItem was triggered
    setNewItemInitiator(index);
    setNewItemCreated(true);
  }

  useEffect(() => {
    // Focus the next item in the list after render
    if (newItemCreated && newItemInitiator < values.length) {
      const nextItem = document.getElementsByClassName('item')[newItemInitiator + 1];
      nextItem.focus();
      nextItem.scrollIntoView();
      setNewItemCreated(false);
    }
  }, [newItemCreated, newItemInitiator, values.length]);

  function removeItem(e) {
    e.preventDefault();
    const index = parseInt(e.target.parentElement.getAttribute('data-index'));
    // Create copy of values to splice with new empty element
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
    // Reset result
    setResult('');
  }

  function updateValue(e) {
    const index = parseInt(e.target.parentElement.getAttribute('data-index'));
    const value = e.target.value;
    // Create copy of values to update with new value
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  }

  function chooseItem(e) {
    e.preventDefault();
    const validOptions = values.filter(function (el) {
      return el !== null && el !== '';
    });
    setValues(validOptions);
    const chosenItem = validOptions[Math.floor(Math.random() * validOptions.length)];
    setResult(chosenItem);
  }

  function resetState(e) {
    e.preventDefault();
    setValues([ '' ]);
    setResult('');
  }

  return (
    <div className="app">
      { result !== '' &&
        <div
          className="app-overlay"
          onClick={() => setResult('')}
        ></div>
      }
      <ThemeSwitcherComponent/>
      <form id="choose-container">
        <div id="list">
         { values.map((value, index) => (
            <InputComponent value={value} key={index} index={index} itemCount={values.length} addItem={addItem} removeItem={removeItem} updateValue={updateValue} />
          ))}
        </div>
        <div className="submit-result-container">
          {result !== '' &&
            <div id="result" className="result">
              <h2>{result}!</h2>
              <button
                className="close-result"
                onClick={() => setResult('')}
              ><span className="visually-hidden">close result</span></button>
            </div>
          }
          <button
            id="submitButton"
            onClick={chooseItem}
            className={result !== '' ? 'hidden': ''}
            disabled={values.join('').length < 1}
          >choose!</button>
        </div>
        <p className={values.join('').length < 1 ? "hidden reset-container" : "reset-container"}>
          <button
            id="reset"
            onClick={resetState}
          >reset</button></p>
      </form>
    </div>
  );
}

export default App;
