const services = {}

const host = 'http://www.baidu.com/'

services.api = {
  signIn: host + 'signIn',
  signUp: host + 'signUp',
}

module.exports = services