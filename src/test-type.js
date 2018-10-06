import * as r from 'ramda'

export const props = {
  name: 'fullTitle',
  duration: 'duration'
}

export const lenses = r.map(r.lensProp, props)
export const get = r.map(r.view, lenses)

export const pluck = r.map(r.pluck, props)

export const pickAll = r.pickAll(r.values(props))
export const getBaseName = r.pipe(
  get.name,
  r.split(' '),
  r.init,
  r.join(' ')
)
