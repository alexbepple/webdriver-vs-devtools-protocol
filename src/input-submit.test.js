import __ from 'hamjest'
import { withWd, withDtp } from './setup'
import * as r from 'ramda'

const selectors = {
  nameInput: '#name',
  submitButton: '[type=submit]',
  greeting: '#greeting'
}

const name = 'foo'
const containsName = r.contains(name)

describe('Type in input field, submit form and verify result', () => {
  withWd(async (browser, baseUrl) => {
    await browser
      .url(baseUrl)
      .setValue(selectors.nameInput, name)
      .click(selectors.submitButton)
      .waitUntil(() => browser.getText(selectors.greeting).then(containsName))
  })

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
