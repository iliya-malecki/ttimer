import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface TimerItemProps {
  item: number,
  index: number,
  onChange: (index: number, value: number) => void
}

function TimerItem(props: TimerItemProps) {
  return <div className='flex items-center gap-2 border-b p-2'>
    <input
      type='number'
      value={props.item}
      onChange={e => { props.onChange(props.index, +e.target.value) }}
      min={0}
    />
    <span>seconds</span>
  </div>
}

function App() {
  const [items, setItems] = useState<number[]>([])

  function handleAdd() {
    setItems(prevItems => [...prevItems, 0])
  }
  function handleChange(index: number, value: number) {
    setItems(prevItems => prevItems.map((item, i) => {
      if (i === index) return value
      return item
    }))
  }
  return (
    <div className='mx-auto flex flex-col gap-4 max-w-lg'>
      <h1>T Timer</h1>
      {
        items.map((item, index) => (
          <TimerItem
            key={`timer-item-${index}`}
            item={item}
            index={index}
            onChange={handleChange}
          />
        ))
      }
      <button onClick={handleAdd}>+</button>
      <button>RUN</button>
    </div>
  )
}

export default App
