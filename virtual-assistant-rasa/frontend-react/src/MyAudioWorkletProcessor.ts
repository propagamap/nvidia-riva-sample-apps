// Definir un procesador de AudioWorklet personalizado
export class MyAudioWorkletProcessor  {
  process(inputs: any[], outputs: any[], parameters: any):boolean {
    const input = inputs[0]
    const output = outputs[0]
  
    // Procesar cada muestra de entrada
    for (let channel = 0; channel < input.length; ++channel) {
      const inputData = input[channel]
      const outputData = output[channel]
  
      for (let i = 0; i < inputData.length; ++i) {
        // Aplicar un filtro de paso bajo a la muestra de entrada
        outputData[i] = inputData[i] * 0.5
      }
    }
  
    return true
  }
}
  
// Registrar el procesador de AudioWorklet personalizado
const audioContext = new AudioContext()
  
audioContext.audioWorklet.addModule('my-audio-worklet-processor.js')
  .then(() => {
    // Obtener acceso al micrófono y conectarlo al procesador de AudioWorklet
    let mediaStream: MediaStream
    let workletNode: AudioNode
  
    const startButton = document.querySelector('#start-button')
    const stopButton = document.querySelector('#stop-button')
  
    startButton.addEventListener('click', () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaStream = stream
  
          const microphoneNode = audioContext.createMediaStreamSource(stream)
          workletNode = new AudioWorkletNode(audioContext, 'my-audio-worklet-processor')
  
          microphoneNode.connect(workletNode)
          workletNode.connect(audioContext.destination)
 
        })
        .catch(error => {
          console.error(error)
        })
    })
  
    stopButton.addEventListener('click', () => {
      mediaStream.getTracks().forEach(track => track.stop())
      workletNode.disconnect()

    })
  })
  .catch(error => {
    console.error(error)
  })
  