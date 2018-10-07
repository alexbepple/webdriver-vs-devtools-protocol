
## Motivation

A couple of months ago, my team debated moving away from Selenium. One piece of information that we could not find was a performance comparison of alternatives to Selenium.

In the end, we went with Puppeteer. We assumed its performance would not be worse.

This is an ex post validation of this reasoning. So far so good.


## Results so far

|   | Selenium (ms) | Puppeteer (ms) |
|---|--------------:|---------------:|
| Type in input field,  <br> submit form and verify result | 391 | 204 |
| Read page title                                          | 193 |  76 |

Sample size: 100 per cell.

The numbers are medians, not means.

All [median absolute deviations](https://en.wikipedia.org/wiki/Median_absolute_deviation) are ≤ 12. Why MADs? Every first test of a Selenium session seems to be getting a penalty of circa 200 ms. Instead of more elaborate measures of dealing with this, I used median and MAD as more robust statistics.

I did a [thorough statistical analysis of results for “Read page title”](https://gist.github.com/alexbepple/9534ade960b7a16ff754b462c8236c0a) (only renders nicely on desktop). Of course, it is entirely pointless given the middles and the dispersion.

Technical environment

* MacBook Pro (15-inch, 2016), 2.7 GHz Intel Core i7
* macOS 10.13.6
* Node v10.11.0
* Chrome Version 69.0.3497.100
* wifi off


## Run it yourself

### Setup

* `yarn`
* `npx selenium-standalone install`
  * Don’t have npx? `npm -g i npx`
* [jq](https://stedolan.github.io/jq/), e.g. `brew install jq`
* [go-task](https://taskfile.org/#/), e.g. `brew install go-task`
  * Of course, you cahow n just execute the commands from the [Taskfile](Taskfile.yml) directly.
* If you are not on a Mac, or have your Chrome in a non-standard location, change the path in [src/setup.js](src/setup.js).


### Usage

In one terminal: 

    yarn start

In another:

    env SAMPLE_SIZE=100 task
