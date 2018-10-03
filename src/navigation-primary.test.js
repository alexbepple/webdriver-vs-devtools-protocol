import __ from 'hamjest'
import * as wdio from 'webdriverio'
import * as r from 'ramda'
import pptr from 'puppeteer-core'

describe('WD', () => {
  let wd, _wd
  before(() => {
    _wd = wdio.remote({ desiredCapabilities: { browserName: 'chrome' } }).init()
    return (wd = _wd)
  })
  after(() => _wd.end())

  beforeEach(() => _wd.newWindow('', '', ''))
  afterEach(() => _wd.close() /*window*/)

  r.range(0, 20).forEach((i) =>
    it(`reads page title #${i}`, () => {
      return wd
        .url('http://localhost:8080')
        .getTitle()
        .then((title) => __.assertThat(title, __.containsString('nginx')))
    })
  )
})

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

  r.range(0, 20).forEach((i) =>
    it(`reads page title #${i}`, async () => {
      await page.goto('http://localhost:8080')
      const title = await page.title()
      __.assertThat(title, __.containsString('nginx'))
    })
  )
})
