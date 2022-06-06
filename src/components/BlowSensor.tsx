import React, { useEffect } from 'react'

import getRmsFromFloat32Array from '../core/getRmsFromFloat32Array'
import noOperationFunction from '../core/noOperationFunction'
import RmsQueue from '../core/RmsQueue'
import useAudioDevice from '../hooks/useAudioDevice'

type BlowSensorProps = {
  onAttack?: (...args: unknown[]) => unknown
  onRelease?: (...args: unknown[]) => unknown
}

type BlowSensorProgress = 'released' | 'attacked'

// TODO - Find proper threshold values
const peakThreshold = 0.97
const attackThresholdRatio = 1.25
const releaseThresholdRatio = 0.8

let context: AudioContext | undefined = undefined
let sourceNode: MediaStreamAudioSourceNode | undefined = undefined
let analyserNode: AnalyserNode | undefined = undefined
let timeDomainData: Float32Array | undefined = undefined
let rmsQueue: RmsQueue | undefined = undefined

let intervalId: number | undefined = undefined
let attackLevel: number = 0
let progress: BlowSensorProgress = 'released'

function BlowSensor({
  onAttack = noOperationFunction,
  onRelease = noOperationFunction,
}: BlowSensorProps) {
  const stream = useAudioDevice()

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

      analyserNode = new AnalyserNode(context, { fftSize: 4096 })
      timeDomainData = new Float32Array(analyserNode.frequencyBinCount)

      sourceNode.connect(analyserNode)

      rmsQueue = new RmsQueue(41)
    },
    [stream]
  )

  useEffect(
    () => {
      if (!context || typeof intervalId === 'number') {
        return
      }

      intervalId = window.setInterval(
        () => {
          if (
            !stream ||
            !context ||
            !sourceNode ||
            !analyserNode ||
            !timeDomainData ||
            !rmsQueue
          ) {
            return
          }

          analyserNode.getFloatTimeDomainData(timeDomainData)
          const rms = getRmsFromFloat32Array(timeDomainData)
          rmsQueue.push(rms)

          if (
            progress === 'released' &&
            rms >= Math.min(
              peakThreshold,
              rmsQueue.average * attackThresholdRatio
            )
          ) {
            attackLevel = rms
            progress = 'attacked'
            onAttack()
          } else if (
            progress === 'attacked' &&
            rms <= Math.min(
              peakThreshold,
              attackLevel * releaseThresholdRatio
            )
          ) {
            progress = 'released'
            onRelease()
          }
        },
        1000 / 16
      )

      return () => {
        window.clearInterval(intervalId)
        intervalId = undefined
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context]
  )

  return <></>
}

export default BlowSensor
