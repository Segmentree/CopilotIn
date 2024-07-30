import axios from 'axios'
const ENC_UTF_8 = new TextDecoder('utf-8')

export const apiService = {
  get(url) {
    return axios.get(url)
  },
  async *getStream(url) {
    const response = await fetch(url)
    const reader = response.body.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      const chunk = JSON.parse(ENC_UTF_8.decode(value))
      yield chunk
    }
  },
  async *postStream(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const reader = response.body.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      let str = ENC_UTF_8.decode(value)
      str = str.replaceAll('{', '')
      const chunks = str.split('}')
      for (const idx in chunks) {
        const chunk = chunks[idx]
        if (chunk) {
          yield JSON.parse(`{${chunk}}`)
        }
      }
    }
  }
}
