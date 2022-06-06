function getRmsFromFloat32Array(timeDomainData: Float32Array): number {
  let sumOfSquares = 0
    for (const value of timeDomainData) {
      sumOfSquares += value ** 2
    }
    const rms = Math.sqrt(sumOfSquares / timeDomainData.length)
    return rms
}

export default getRmsFromFloat32Array
