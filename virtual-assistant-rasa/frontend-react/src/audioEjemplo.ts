export function grabar():void{
  /*navigator.mediaDevices.getUserMedia({ audio:true }).then(stream => {
    const data: BlobPart[] = []
    let recording
    const context = new AudioContext()
    const sourceNode = context.createBufferSource()
    sourceNode.connect(context.destination)
    recordButton.onclick = () => recording = record(stream)
    stopButton.onclick = () => recording.stop()
    function record(stream) {
      recording = new MediaRecorder(stream)
      recording.start()
      recording.ondataavailable = event => data.push(event.data)
      recording.onstop = () => {
        new Blob(data).arrayBuffer()
          .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
          .then(audioBuffer => sourceNode.buffer = audioBuffer)
        sourceNode.start()
      }
      return recording
    }
  })*/
}