import React, { useEffect, useState } from 'react'

import getRmsFromFloat32Array from '../core/getRmsFromFloat32Array'
import noOperationFunction from '../core/noOperationFunction'
import RmsQueue from '../core/RmsQueue'
import useAudioDevice from '../hooks/useAudioDevice'

type BlowSensorProps = {
  onAttack?: (...args: any[]) => unknown
  onRelease?: (...args: any[]) => unknown
}

type BlowSensorProgress = 'init' | 'released' | 'attacked' | 'term'

// TODO - Find proper threshold values
const peakThreshold = 0.97
const attackThresholdRatio = 16
const releaseThresholdRatio = 8 / attackThresholdRatio

let context: AudioContext | undefined = undefined
let sourceNode: MediaStreamAudioSourceNode | undefined = undefined
let analyserNode: AnalyserNode | undefined = undefined
let destinationNode: MediaStreamAudioDestinationNode | undefined = undefined
let timeDomainData: Float32Array | undefined = undefined
let rmsQueue: RmsQueue | undefined = undefined

let intervalId: number | undefined = undefined
let attackLevel: number = 0
let progress: BlowSensorProgress = 'init'

function BlowSensor({
  onAttack = noOperationFunction,
  onRelease = noOperationFunction,
}: BlowSensorProps) {
  const stream = useAudioDevice()
  const [isContextReady, setIsContextReady] = useState(false)
  const [initTime, setInitTime] = useState(Date.now())
  const [lastupdate, setLastUpdate] = useState(0)

  useEffect(
    () => {
      if (!stream || context) {
        return
      }

      context = new AudioContext()

      sourceNode = new MediaStreamAudioSourceNode(
        context,
        { mediaStream: stream }
      )

      analyserNode = new AnalyserNode(context, {
        fftSize: 4096,
        minDecibels: -96,
        maxDecibels: 0,
      })
      timeDomainData = new Float32Array(analyserNode.frequencyBinCount)

      destinationNode = new MediaStreamAudioDestinationNode(context)

      sourceNode
        .connect(analyserNode)
        .connect(destinationNode)

      rmsQueue = new RmsQueue(41)

      setIsContextReady(true)
    },
    [stream]
  )

  useEffect(
    () => {
      if (!isContextReady || !context || typeof intervalId === 'number') {
        return
      }

      progress = 'init'
      setInitTime(Date.now())

      intervalId = window.setInterval(
        () => setLastUpdate(Date.now()),
        1000 / 16
      )

      return () => {
        window.clearInterval(intervalId)
        intervalId = undefined
      }
    },
    [isContextReady]
  )

  useEffect(
    () => {
      if (
        initTime > Date.now() - 500 ||
        !stream ||
        !context ||
        !sourceNode ||
        !analyserNode ||
        !timeDomainData ||
        !rmsQueue
      ) {
        return
      }

      // FIXME - Zero data on iPhone series (bypassed?)
      analyserNode.getFloatTimeDomainData(timeDomainData)
      const rms = getRmsFromFloat32Array(timeDomainData)
      rmsQueue.push(rms)

      if (progress === 'init') {
        progress = 'released'
      } else if (
        progress === 'released' &&
        rms > Math.min(peakThreshold, rmsQueue.average * attackThresholdRatio)
      ) {
        attackLevel = rms
        progress = 'attacked'
        onAttack({ attackLevel, average: rmsQueue.average })
      } else if (
        progress === 'attacked' &&
        rms <= Math.min(peakThreshold, attackLevel * releaseThresholdRatio)
      ) {
        progress = 'released'
        onRelease({ attackLevel, average: rmsQueue.average })
      }
    },
    [stream, initTime, lastupdate, onAttack, onRelease]
  )

  return <></>
}

export default BlowSensor
