function ollamaResources() {
  const api = 'http://ia.culturematch.nl'
  return {
    home: `${api}/`,
    chat: `${api}/chat`
  }
}
export const RESOURCES = {
  ollama: ollamaResources()
}
