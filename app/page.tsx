"use client"


import { useState ,useRef,useEffect,ChangeEvent} from "react"

function Home() {

  const [timeduration,setTimeduration] = useState<number|string>("")
  const [timeLeft,setTimeLeft] = useState<number>(0)
  const[isActive,setIsActive] = useState<boolean>(false);
  const[isPaused,setIsPaused] = useState<boolean>(false);
const timeRef = useRef<NodeJS.Timeout|null>(null)

  function handelsetTimeDuration() {
    if (typeof timeduration === "number"&&timeduration>0 ) {
   setTimeLeft(timeduration)
   setIsActive(false)
   setIsPaused(false)
      if (timeRef.current) {
        clearInterval(timeRef.current)
        
      }
    }
  }

  function handelsetStart() {
    if (timeLeft > 0) {
      setIsActive(true)
      setIsPaused(false)
    }
  }
  const handelPaused = ()=>{
    if (isActive) {
    setIsPaused(true)
    setIsActive(false)
    if (timeRef.current) {
      clearInterval(timeRef.current)
      
    }
    }
  }
const handelReset = () =>{
  setIsActive(false);
  setIsPaused(false);
  setTimeLeft(typeof timeduration === "number" ? timeduration: 0)
  if(timeRef.current){
    clearInterval(timeRef.current)
  }
}

useEffect(() => {
  // If the timer is active and not paused
  if (isActive && !isPaused) {
    // Set an interval to decrease the time left
    timeRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        // If time is up, clear the interval
        if (prevTime <= 1) {
          clearInterval(timeRef.current!);
          return 0;
        }
        // Decrease the time left by one second
        return prevTime - 1;
      });
    }, 1000); // Interval of 1 second
  }
  // Cleanup function to clear the interval
  return () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  };
}, [isActive, isPaused]); // Dependencies array to rerun the effect
 // Function to format the time left into mm:ss format
 const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60); // Calculate minutes
  const seconds = time % 60; // Calculate seconds
  // Return the formatted string
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

  // Function to handle changes in the duration input field
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTimeduration(Number(e.target.value) || ""); // Update the duration state
  };

  
  return(
    <div className=" flex justify-center items-center ">
    <div className="h-[300px] w-[450px] border border-yellow-100  mt-[200px] rounded-2xl bg-cyan-100 ">
      <h1 className="text-center mt-8 font-bold text-2xl">Countdown Timer</h1>
      <div className="flex flex-row">
      <input className=" text-sm  border border-white-1px ml-[20px] mt-[20px] p-2 w-[300px] rounded-xl " 
      type="number"
      value={timeduration}
     onChange={handleDurationChange} 
      placeholder="Enter duration in seconds"/> 
      
      <button
       onClick={handelsetTimeDuration} className="ml-2 p-2 mt-[20px] bg-white text-black rounded h-[40px] w-[50px]">
        set
        </button>
      </div>
      
      <h1 className="text-center text-6xl font-bold mt-[10px]"> {formatTime(timeLeft)}</h1>
       <div className=" ml-[100px] flex flex-row">
        <button
        onClick={handelsetStart} className="ml-2 p-2 bg-white text-black rounded">
        
        Start 
        </button>
       
        <button
        onClick={handelPaused} className="ml-2 p-2 bg-white text-black rounded">
             {isPaused ? "Resume" : "pause"} 
        </button>
          <button
           onClick={handelReset} className="ml-2 p-2 bg-white text-black rounded">
        
           reset
           </button>
           </div> 
      
    </div>
    </div>
  )
}
export default Home




