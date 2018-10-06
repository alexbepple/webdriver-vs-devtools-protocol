import __ from 'hamjest'
import { withDtp, withWd } from './setup'

const assertOnTitle = (title) => __.assertThat(title, __.is('Greeter'))

describe('Read page title', () => {
  withWd((browser, baseUrl) =>
    browser
      .url(baseUrl)
      .getTitle()
      .then(assertOnTitle)
  )

  withDtp(async (page, baseUrl) => {
    await page.goto(baseUrl)
    assertOnTitle(await page.title())
  })
})
