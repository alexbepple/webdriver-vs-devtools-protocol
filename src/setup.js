import * as r from 'ramda'
import * as wdio from 'webdriverio'
import pptr from 'puppeteer-core'

export const baseUrl = 'http://localhost:8000'
const parseInt = (x) => Number.parseInt(x, 10)
export const sampleSize = r.compose(
  parseInt,
  r.defaultTo(1)
)(process.env.SAMPLE_SIZE)

export const withWd = (fn) =>
  describe('WD', () => {
    let wd, _wd
    before(() => {
      _wd = wdio
        .remote({ desiredCapabilities: { browserName: 'chrome' } })
        .init()
      return (wd = _wd)
    })
    after(() => _wd.end())

    beforeEach(() => _wd.newWindow('', '', ''))
    afterEach(() => _wd.close() /*window*/)

    r.range(0, sampleSize).forEach((i) => it(`#${i}`, () => fn(wd, baseUrl)))
  })

export const withDtp = (fn) =>
  describe('DTP', () => {
    let _browser
    before(async () => {
      _browser = await pptr.launch({
        headless: false,
        executablePath:
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      })
    })
    after(() => _browser.close())

    let page
    beforeEach(async () => (page = await _browser.newPage()))
    afterEach(() => page.close())

    r.range(0, sampleSize).forEach((i) => it(`#${i}`, () => fn(page, baseUrl)))
  })
