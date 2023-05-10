export function startAudioBuffer():void {
  console.log('White noise started.')
    
  const audioCtx = new AudioContext()
  const channels = 1
  const frameCount = audioCtx.sampleRate * 2.0
  const source = audioCtx.createBufferSource()

  const buffer = new AudioBuffer({
    numberOfChannels: channels,
    length: frameCount,
    sampleRate: audioCtx.sampleRate,
  })
  
  for (let channel = 0; channel < channels; channel++) {
    const nowBuffering = buffer.getChannelData(channel)
    for (let i = 0; i < frameCount; i++) {
      nowBuffering[i] = Math.random() * 2 - 1
    }
  }
  source.buffer = buffer


  source.connect(audioCtx.destination)
  source.start()

  source.onended = () => {
    console.log('White noise finished.')
  }
}