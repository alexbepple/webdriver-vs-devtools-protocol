import * as r from 'ramda'

export const baseUrl = 'http://localhost:8000'
const parseInt = (x) => Number.parseInt(x, 10)
export const sampleSize = r.compose(
  parseInt,
  r.defaultTo(1)
)(process.env.SAMPLE_SIZE)
