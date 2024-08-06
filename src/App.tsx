import { useEffect, useRef, useState } from 'react'
import { Play, Plus, Square } from 'lucide-react'
import './App.css'
import cn from 'classnames'

interface TimerItemProps {
  item: number,
  index: number,
  onChange: (index: number, value: number) => void
  running: boolean
}

function TimerItem(props: TimerItemProps) {
  return <div className={cn(
    'flex items-center justify-center gap-2 border-b-2 border-green-300 p-4 text-lg',
    props.running && props.index === 0 && 'animate-bg-switch'
  )}>
    <input
      className='w-10 text-right bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      type='number'
      value={props.item}
      onChange={e => { props.onChange(props.index, +e.target.value) }}
      min={0}
      max={9999}
    />
    <span>seconds</span>
  </div>
}

function App() {
  const [items, setItems] = useState<number[]>([])
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number>()

  function handleAdd() {
    setItems(prevItems => [...prevItems, 0])
  }
  function handleChange(index: number, value: number) {
    setItems(prevItems => prevItems.map((item, i) => {
      if (i === index) return value
      return item
    }))
  }
  function handleRun() {
    if (!running) {
      setRunning(true)
      intervalRef.current = setInterval(() => {
        setItems(prevItems => {
          const [first, ...other] = prevItems
          if (first === 1) {
            return [...other]
          }
          return [first - 1, ...other]
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current);
      setRunning(false)
    }
  }
  useEffect(() => {
    if (intervalRef.current &&
      items.length === 0) {
      clearInterval(intervalRef.current);
      setRunning(false)
    }
  }, [items])
  return (
    <div className='w-screen h-screen bg-gray-200 text-gray-800'>
      <div className='mx-auto flex flex-col p-4 gap-4 max-w-lg'>
        <h1 className='text-2xl text-center'>🍵 T Timer</h1>
        {
          items.map((item, index) => (
            <TimerItem
              key={`timer-item-${index}`}
              item={item}
              index={index}
              onChange={handleChange}
              running={running}
            />
          ))
        }
        <button disabled={running} className='disabled:opacity-50 ml-auto rounded-full bg-green-300 text-white w-8 h-8 grid place-items-center' onClick={handleAdd}><Plus /></button>
        {items.length > 0 &&
          <button
            onClick={handleRun}
            className='ml-auto rounded-full bg-green-300 text-white w-8 h-8 grid place-items-center'>
            {running ? <Square /> : <Play />}
          </button>
        }
      </div></div>
  )
}

export default App
