import classNames from 'classnames'
import React from 'react'

import styles from './Candle.module.css'

type CandleProps = {
  on?: boolean
  x?: number
  y?: number
  bodyStyle?: React.CSSProperties
  flameStyle?: React.CSSProperties
  className?: string
}

const basePosition = { x: 7.5, y: 38 }

function Candle({
  on = true,
  x = 7.5,
  y = 38,
  bodyStyle = { fill: '#fff8e8' },
  flameStyle = { fill: '#faaa35' },
}: CandleProps) {
  return (
    <g
      transform={`translate(${x - basePosition.x}, ${y - basePosition.y})`}
    >
      <path
        d="M7.501,38.008c-1.681,-0 -3.042,-1.361 -3.042,-3.042l-0,-21.286c-0,-1.681 1.361,-3.042 3.042,-3.042c1.68,0 3.041,1.361 3.041,3.042l0,21.289c0,1.678 -1.361,3.039 -3.041,3.039Z"
        style={bodyStyle}
      />
      <path
        className={classNames(styles.flame, on || styles['flame--off'])}
        d="M7.501,18.241c-3.228,-0 -5.767,-1.478 -6.792,-3.953c-0.892,-2.147 -1.331,-6.805 5.717,-13.85c0.594,-0.594 1.555,-0.594 2.15,0c7.047,7.047 6.605,11.703 5.716,13.85c-1.025,2.475 -3.564,3.953 -6.791,3.953Z"
        style={flameStyle}
      />
    </g>
  )
}

export default Candle
