import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({header}) => (
  <h2>
    { header }
  </h2>
)

const Anecdote = (props) => (
  <div>
    {props.text}<br />
    has {props.number} votes<br />
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const selectRandomAnecdote = () => {    
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)

    if (votesCopy[selected] > votesCopy[mostVoted]) {
      setMostVoted(selected)
    }
  }

  return (
    <div>
      <Header header={"Anecdote of the day"} />
      <Anecdote text={props.anecdotes[selected]} number={votes[selected]} />
      <Button handleClick={addVote} text={"vote"} />
      <Button handleClick={selectRandomAnecdote} text={"next anecdote"} />
      <Header header={"Anecdote with most votes"} />
      <Anecdote text={props.anecdotes[mostVoted]} number={votes[mostVoted]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)