import __ from 'hamjest'
import { withDtp } from './setup'

describe('Type in input field, submit form and verify result', () => {
  withDtp(async (page, baseUrl) => {
    await page.goto(baseUrl)
    await page.type('#name', 'foo')

    const navigation = page.waitForNavigation()
    await page.click('[type=submit]')
    await navigation

    const greeting = await page.$eval('#greeting', (el) => el.innerText)
    __.assertThat(greeting, __.containsString('foo'))
  })
})
