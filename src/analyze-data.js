import * as r from 'ramda'
import fs from 'fs'
import * as t from './test-type'
import * as stat from 'simple-statistics'

const readRaw = r.pipe(
  () => fs.readFileSync('temp/tests.json', { encoding: 'utf8' }),
  JSON.parse
)

r.pipe(
  readRaw,
  r.map(t.pickAll),
  r.groupBy(t.getBaseName),
  r.map(t.pluck.duration),
  r.map(
    r.applySpec({
      median: stat.median,
      mad: stat.medianAbsoluteDeviation
    })
  ),
  r.tap(console.log)
)()
