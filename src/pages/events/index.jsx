import React, { useEffect, useState } from 'react'

const index = () => {
  const [count,setCount] = useState(0);

  useEffect(() => {
    console.log('Effect Runs');
    
    return () => {
      console.log("Unmount",count);
      
    }
  }, [count])
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Events {count}
    </button>
  )
}

export default index
