import __ from 'hamjest'
import * as wd from 'webdriverio'

describe('WD', () => {
  it('reads page title', () => {
    const options = { desiredCapabilities: { browserName: 'chrome' } }
    return wd
      .remote(options)
      .init()
      .url('http://localhost:8080')
      .getTitle()
      .then((title) => __.assertThat(title, __.containsString('nginx')))
      .end()
  })
})
