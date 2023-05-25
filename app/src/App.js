import './App.css';
import logo from './typing.png'
import { useStopwatch } from 'react-timer-hook';
import React, {useState, useEffect} from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";



const topRowWords = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
const middleRowWords = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
const lastRowWords = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const alphabet = [...topRowWords, ...middleRowWords, ...lastRowWords]
const topTwoRows = [...topRowWords, ...middleRowWords]
const bottomTwoRows = [...middleRowWords, ...lastRowWords]
const varTwoRows = [...topRowWords, ...lastRowWords]


function App() {
  const [sentence, setSentence] = useState("shelter direct support arrange pack")
  const [textString, setTesxtString] = useState("")
  const [textareaClass, setTextareaClass] = useState("")
  const [wordsCount, setWordsCount] = useState(5)
  const [Accuracy, setAccuracy] = useState(100)
  const [resultAccuracy, setResultAccuracy] = useState(50)
  const [wordsperMinute, setWordsPerMinute] = useState(50)
  const [resultWordsperMinute, setResultWordsPerMinute] = useState(50)
  // const [repetition, setRepetition] = useState(1)
  const [typedWordsCount, setTypedWordsCount] = useState(0)
  const [showResult ,setShowResult] = useState(false)
  const [topRowChecked, setTopRowChecked] = useState(false)
  const [middleRowChecked, setMiddleRowChecked] = useState(true)
  const [bottomRowChecked, setBottomRowChecked] = useState(false)
  const [wordsList, setWordsList] = useState(middleRowWords)
  const [maxWordCount, setmaxWordCount] = useState(5)
  const [time, setTime] = useState(0)

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  if(minutes === 5){
    reset()
  }

  useEffect(() => {
    if(textString.length === sentence.length && sentence.startsWith(textString)){
      pause()
      setResultAccuracy(parseInt(sentence.length/typedWordsCount*100))
      setResultWordsPerMinute(parseInt((wordsCount / ((seconds + minutes * 60) - time))* 60))
      setTypedWordsCount(0)
      setShowResult(true)
      setTextareaClass("")
      setTesxtString("")
      if(parseInt(sentence.length/typedWordsCount*100) >= Accuracy){
        let randomSentence = ""

        for (let i = 0; i < wordsCount; i++) {
          let wordsLen = random(2, maxWordCount)
          for (let j = 0; j < wordsLen; j++){
            randomSentence += wordsList[(Math.floor(Math.random() * wordsList.length))];
          }
          randomSentence += " "
        }
        setSentence(randomSentence.slice(0, -1))
      }
    }
    else if(typedWordsCount === 1){
      setTime(seconds + minutes * 60)
      start()
    }
    else if(textString.length > 0 && sentence.startsWith(textString)){
      setTextareaClass("succes-input")
    }else if(textString.length > 0){
      setTextareaClass("wrong-input")
    }
  }, [textString])

  useEffect(() => {
    let randomSentence = ""

    for (let i = 0; i < wordsCount; i++) {
      let wordsLen = random(2, maxWordCount)
      for (let j = 0; j < wordsLen; j++){
        randomSentence += wordsList[(Math.floor(Math.random() * wordsList.length))];
      }
      randomSentence += " "
    }
    setSentence(randomSentence.slice(0, -1))
    setTesxtString("")
  }, [wordsCount, wordsList, maxWordCount])

  useEffect(() => {
    if(topRowChecked && middleRowChecked && bottomRowChecked){
      setWordsList(alphabet)
    }
    if(topRowChecked && middleRowChecked && !bottomRowChecked){
      setWordsList(topTwoRows)
    }
    if(topRowChecked && !middleRowChecked && bottomRowChecked){
      setWordsList(varTwoRows)
    }
    if(!topRowChecked && middleRowChecked && bottomRowChecked){
      setWordsList(bottomTwoRows)
    }
    if(topRowChecked && !middleRowChecked && !bottomRowChecked){
      setWordsList(topRowWords)
    }
    if(!topRowChecked && middleRowChecked && !bottomRowChecked){
      setWordsList(middleRowWords)
    }
    if(!topRowChecked && !middleRowChecked && bottomRowChecked){
      setWordsList(lastRowWords)
    }
    if(!topRowChecked && !middleRowChecked && !bottomRowChecked){
      setWordsList(alphabet)
    }

    console.log(topRowChecked, bottomRowChecked, middleRowChecked)
  }, [topRowChecked, middleRowChecked, bottomRowChecked])

  const random = (min = 3, max = 7) => Math.floor(Math.random() * (max - min)) + min;

  const onChangeTextInput = (e) => {
    if(e.keyCode !== 8){
      setTypedWordsCount((c) => c + 1)
    }
  }


  return (
    <div className="App">
      <h1 className='app-title'>Touch Typing</h1>
      <div className='filters-containers'>
        <div className='filter-container-1'>
        <div className='filter-1'>
            <p> No of words: </p>
            <div className='add-container filter-1'>
            <button type='button' onClick={() => setWordsCount((count) => (count > 1) ? count - 1 : count)} className='add-button-container'>
              <FaMinus className='add-btn'/>
            </button>
            <p className='words-count'>{wordsCount}</p>
            <button type='button' onClick={() => setWordsCount((count) => count + 1)} className='add-button-container'>
              <FaPlus className='add-btn'/>
            </button>
            </div>
          </div>
          <div className='filter-1'>
            <p>Max-Word: </p>
            <div className='add-container filter-1'>
            <button type='button' onClick={() => setmaxWordCount((count) => count > 1 ? count - 1 : count)} className='add-button-container'>
              <FaMinus className='add-btn'/>
            </button>
            <p className='words-count'>{maxWordCount}</p>
            <button type='button' onClick={() => setmaxWordCount((count) => count < 10 ? count + 1 : count)} className='add-button-container'>
              <FaPlus className='add-btn'/>
            </button>
            </div>
          </div>
          <div className='filter-1'>
            <p>Accuracy: </p>
            <div className='add-container filter-1'>
            <button type='button' onClick={() => setAccuracy((count) => (count > 1 && count < 101) ? count - 1 : count)} className='add-button-container'>
              <FaMinus className='add-btn'/>
            </button>
            <p className='words-count'>{Accuracy}</p>
            <button type='button' onClick={() => setAccuracy((count) => (count >= 0 && count < 100) ? count + 1 : count)} className='add-button-container'>
              <FaPlus className='add-btn'/>
            </button>
            </div>
          </div>
          <div className='filter-1'>
            <p>W/M: </p>
            <div className='add-container filter-1'>
            <button type='button' onClick={() => setWordsPerMinute((count) => (count > 1 && count < 100) ? count - 1 : count)} className='add-button-container'>
              <FaMinus className='add-btn'/>
            </button>
            <p className='words-count'>{wordsperMinute}</p>
            <button type='button' onClick={() => setWordsPerMinute((count) => (count > 0 && count < 100) ? count + 1 : count)} className='add-button-container'>
              <FaPlus className='add-btn'/>
            </button>
            </div>
          </div>
        </div>
        <div className='filter-container-1'>
          <div className='filter-1 filter-2'>
            <p>Top Row: </p>
            <div className='checkbox-container'>
              <input 
                type='checkbox' 
                value={topRowChecked}
                defaultChecked= {false}
                onChange={() => setTopRowChecked((isChecked) => !isChecked)} />
            </div>
          </div>
          <div className='filter-1 filter-2'>
            <p>Middle Row: </p>
            <div className='checkbox-container'>
              <input 
                type='checkbox' 
                value={middleRowChecked}
                defaultChecked= {true}
                onChange={() => setMiddleRowChecked((isChecked) => !isChecked)} />
            </div>
          </div>
          <div className='filter-1 filter-2'>
            <p>Bottom Row: </p>
            <div className='checkbox-container'>
              <input 
                type='checkbox' 
                value={bottomRowChecked}
                defaultChecked= {false}
                onChange={() => setBottomRowChecked((isChecked) => !isChecked)} />
            </div>
          </div>
          <div className='filter-1 filter-2'>
            <p>Time:- </p>
            <div className='checkbox-container'>
              <p>{minutes} : {seconds}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-2">
        <h1 className='app-title'>Type the below Sentence</h1>
        <div className="sentence-container">
          <p className='sentence'>{sentence}</p>
          <div img-container>
          <img src={logo} alt="typing.." />
          </div>
        </div>
      {/* <button type='button' onClick={refreshSentence}>Refresh</button> */}
      <div className='typing-box-container'>
        <textarea 
          placeholder='Type here...' 
          className={`text-input ${textareaClass}`} 
          value={textString} 
          onKeyDown={onChangeTextInput} 
          onChange={(e) => setTesxtString(e.target.value)}
        />
      </div>
      <div className='show'>
        {showResult ? <p>Desired Accuracy:- {Accuracy}, Your Accuracy: {resultAccuracy}</p> : ""}
        {showResult ? <p>Desired Words Per Minute:- {wordsperMinute}, Your Words Per Minute: {resultWordsperMinute}</p> : ""}
        {showResult ? ((resultAccuracy >= Accuracy && resultWordsperMinute >= wordsperMinute) ? <p>You've done it!</p> : <p>Type Again...</p>) : ""}
      </div>
      </div>
    </div>
  );
}

export default App;
