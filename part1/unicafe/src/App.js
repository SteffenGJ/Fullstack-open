import { useState } from 'react'

const Button = ({name, handleClick}) => {
  return (
    <button onClick={() => handleClick(prev => prev + 1)}>{name}</button>
  )
}

const Feedback = ({setGood, setNeutral, setBad}) => {
  return (
    <div>
      <h1>Feedback</h1>
      <Button name="good" handleClick={setGood}/>
      <Button name="neutral" handleClick={setNeutral}/>
      <Button name="bad" handleClick={setBad}/>
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return ( 
    <div>
      {good + neutral + bad > 0 ?
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={good}/>
            <StatisticsLine text="Neutral" value={neutral}/>
            <StatisticsLine text="Bad" value={bad}/>
            <StatisticsLine text="All" value={good + neutral + bad}/>
            <StatisticsLine text="Average" value={(good - bad) / (good + neutral + bad)}/>
            <StatisticsLine text="Positive" value={`${good / (good + neutral + bad) * 100}%`}/>
          </tbody>
        </table>
      </div>
      : <p>No feedback given</p>
      }
    </div>
    
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
