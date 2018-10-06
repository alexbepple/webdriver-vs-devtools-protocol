import __ from 'hamjest'
import * as wdio from 'webdriverio'
import * as r from 'ramda'
import pptr from 'puppeteer-core'
import { baseUrl, sampleSize } from './setup'

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

  r.range(0, sampleSize).forEach((i) =>
    it(`types in input field, submits form and verifies result #${i}`, async () => {
      await page.goto(baseUrl)
      await page.type('#name', 'foo')

      const navigation = page.waitForNavigation()
      await page.click('[type=submit]')
      await navigation

      const greeting = await page.$eval('#greeting', (el) => el.innerText)
      __.assertThat(greeting, __.containsString('foo'))
    })
  )
})
