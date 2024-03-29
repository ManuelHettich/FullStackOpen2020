import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ header }) => (
    <div>
      <h2>{ header }</h2>
    </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad
  const weightedSum = props.good - props.bad

  if (sum === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="all" value={sum} />
        <Statistic text="average" value={weightedSum / sum} />
        <Statistic text="positive" value={100 * props.good / sum} />
        </tbody>
      </table>
    )
  }
}

const Statistic = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}{(props.text === "positive") ? " %" : null}
      </td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header={"give feedback"} />
      <Button handleClick={addGood} text={"good"} />
      <Button handleClick={addNeutral} text={"neutral"} />
      <Button handleClick={addBad} text={"bad"} />

      <Header header={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)