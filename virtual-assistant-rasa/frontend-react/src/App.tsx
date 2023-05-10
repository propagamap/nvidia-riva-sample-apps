import { useState } from 'react'
import { ReactMic } from 'react-mic'
import { startAudioBuffer } from './microStream'
//import { ReactMediaRecorder } from 'react-media-recorder'

function App(): React.ReactElement {
  const [count, setCount] = useState(0)
  const [record, setRecord] = useState(false)


  const onData = (recordedBlob: any): void =>{
    console.log('chunk of real-time data is: ', recordedBlob)
  }

  const onStop = (recordedBlob: any): void =>{
    console.log('recordedBlob is: ', recordedBlob)
    const link = document.createElement('a')
    link.download = 'record.wav'

    link.href = URL.createObjectURL(recordedBlob.blob)
    link.click()
    URL.revokeObjectURL(link.href)

  }

  
  /*const handleStopStream = (): void => {
  }*/

  const handleRecord = ():void => {
    //const recordButton = document.querySelector('#record-button');
    //const stopButton = document.querySelector('#stop-button');
    const data: BlobPart[] = []
    let recording: MediaRecorder
    const context = new AudioContext()
    const sourceNode = context.createBufferSource()
    sourceNode.connect(context.destination)

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      //recordButton.onclick = () => recording = record(stream);
      //stopButton.onclick = () => recording.stop();

      recording = record(stream)

      function record(stream: MediaStream): MediaRecorder {
        recording = new MediaRecorder(stream)
        recording.start()
        recording.ondataavailable = event => data.push(event.data)
        recording.onstop = () => {
          new Blob(data).arrayBuffer()
            .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => sourceNode.buffer = audioBuffer)
          sourceNode.start()
        }
        console.log(recording)
        return recording
      }
    })
  }


  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <div>
          <ReactMic
            record={record}
            className="sound-wave"
            onStop={onStop}
            onData={onData}
            strokeColor="#000000"
            backgroundColor="#FF4081"
            mimeType="audio/wav"/>
          <button onClick={()=>{setRecord(true)}} type="button">Start</button>
          <button onClick={()=>{setRecord(false)}} type="button">Stop</button>
          <button onClick={()=>{startAudioBuffer()}} type="button">WhiteStream</button>
          <button onClick={()=>{handleRecord()}} type="button">Stream</button>
        </div>
      </div>
    </div>
  )
}

export default App
