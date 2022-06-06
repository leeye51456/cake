import { useEffect, useState } from 'react'

let stream: MediaStream | undefined = undefined

function useAudioDevice(): MediaStream | undefined {
  const [isStreamInitialized, setIsStreamInitialized] = useState(false)

  useEffect(() => {
    if (stream) {
      setIsStreamInitialized(true)
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((mediaStream) => {
        stream = mediaStream
        setIsStreamInitialized(true)
      })
      .catch((reason) => {
        console.error(reason)
      })
  }, [])

  return isStreamInitialized ? stream : undefined
}

export default useAudioDevice
