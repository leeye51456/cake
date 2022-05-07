import React from 'react'

import Candle from './Candle'

type CakeSvgProps = {
  className?: string
}

function CakeSvg({ className }: CakeSvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="dish__bottom"
        d="M50,100c27.614,0 50,-12.437 50,-27.778c0,-15.341 -22.386,-27.778 -50,-27.778c-27.614,0 -50,12.437 -50,27.778c0,15.341 22.386,27.778 50,27.778Z"
        fill="#8899a6"
      />
      <path
        className="dish__top"
        d="M50,95.139c27.614,-0 50,-12.437 50,-27.778c0,-15.341 -22.386,-27.778 -50,-27.778c-27.614,0 -50,12.437 -50,27.778c0,15.341 22.386,27.778 50,27.778Z"
        fill="#ccd6dd"
      />

      <path
        className="cake__bottom"
        d="M90.764,65.792c-0,11.833 -18.25,21.422 -40.764,21.422c-22.514,-0 -40.764,-9.589 -40.764,-21.422c0,-11.828 18.25,-21.42 40.764,-21.42c22.511,0 40.764,9.592 40.764,21.42Z"
        fill="#dd2e44"
      />

      <path
        className="cake__side"
        d="M89.536,62.619c0,27.373 -79.072,27.373 -79.072,0l-0,-24.33l79.072,-0l0,24.33Z"
        fill="#f4abba"
      />

      <path
        className="cake__top-overflowed"
        d="M49.956,50.461c-24.956,0 -39.495,-11.478 -39.495,-11.478c0,0 -0.044,2.567 -0.044,4.681c-0,-0 0.089,13.605 7.144,13.605c6.831,0 6.333,6.523 10.65,7.198c4.281,0.669 4.756,-2.606 10.07,-2.606c5.313,0 6.25,5.85 11.675,5.85c6.358,0 6.88,-5.85 12.191,-5.85c5.311,0 5.922,3.4 9.406,2.458c4.186,-1.133 2.261,-7.047 10.797,-7.047c7.056,0 7.231,-12.911 7.231,-12.911c-0,-2.111 -0.048,-5.375 -0.048,-5.375c0,0 -14.619,11.475 -39.577,11.475Z"
        fill="#dd2e44"
      />
      <path
        className="cake__top"
        d="M90.764,35.381c-0,11.83 -18.25,21.422 -40.764,21.422c-22.514,-0 -40.764,-9.592 -40.764,-21.422c0,-11.831 18.25,-21.423 40.764,-21.423c22.511,0 40.764,9.592 40.764,21.423Z"
        fill="#ea596e"
      />

      <Candle x={71.288} y={38.281} />
      <Candle x={50} y={47.403} />
      <Candle x={28.71} y={38.281} />
    </svg>
  )
}

export default CakeSvg