import { useState } from 'hono/jsx'
import { css } from 'hono/css'


export default function Counter() {
  const [count, setCount] = useState(0)
  return (
      <div>
          <p>{count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>

      </div>
  )
}
