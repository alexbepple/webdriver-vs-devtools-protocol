import __ from 'hamjest'
import * as wdio from 'webdriverio'

describe('WD', () => {
  let wd, _wd
  before(() => {
    _wd = wdio.remote({ desiredCapabilities: { browserName: 'chrome' } }).init()
    return (wd = _wd)
  })
  after(() => _wd.end())

  beforeEach(() => _wd.newWindow('', '', ''))
  afterEach(() => _wd.close() /*window*/)

  it('reads page title', () => {
    return wd
      .url('http://localhost:8080')
      .getTitle()
      .then((title) => __.assertThat(title, __.containsString('nginx')))
  })
})
