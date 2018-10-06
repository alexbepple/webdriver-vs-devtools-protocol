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
  withWd((browser, baseUrl) =>
    browser
      .url(baseUrl)
      .setValue(selectors.nameInput, name)
      .click(selectors.submitButton)
      .waitUntil(() => browser.getText(selectors.greeting).then(containsName))
  )

  withDtp(async (page, baseUrl) => {
    await page.goto(baseUrl)
    await page.type(selectors.nameInput, name)

    // Interestingly, this is not much faster than
    // waiting for the content to appear, like in the WD version.
    // Thus, there is no need to mirror the WD approach.
    const navigation = page.waitForNavigation()
    await page.click(selectors.submitButton)
    await navigation

    const greeting = await page.$eval(selectors.greeting, (el) => el.innerText)
    __.assertThat(containsName(greeting), __.is(true))
  })
})
