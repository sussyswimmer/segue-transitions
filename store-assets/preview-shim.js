// Throwaway stub of the chrome.* surface so sidepanel.js runs in a plain page.
const store = { apiKey: 'sk-preview', auto: true, showRare: false };
const sampleContext = {
  before: 'Coastal mangroves along the Can Gio shoreline hold back roughly a third of the tidal erosion recorded before 2019.',
  after: '',
  atStart: false,
  field: 'Essay draft · text area',
  url: 'https://example.test/'
};

window.chrome = {
  storage: {
    local: {
      get: async (keys) => Object.fromEntries(keys.map((k) => [k, store[k]])),
      set: async (obj) => Object.assign(store, obj)
    }
  },
  tabs: {
    query: async () => [{ id: 1 }],
    sendMessage: (_id, msg, cb) => {
      if (msg.type === 'GET_CONTEXT') cb(sampleContext);
      if (msg.type === 'INSERT') cb({ ok: true, inserted: ' ' + msg.phrase + ' ' });
    },
    onActivated: { addListener() {} },
    onUpdated: { addListener() {} }
  },
  runtime: {
    lastError: null,
    sendMessage: async () => ({ ok: true }),
    onMessage: { addListener() {} }
  }
};

// Stand in for the DeepSeek round trip.
window.fetch = async () => ({
  ok: true,
  json: async () => ({
    choices: [
      {
        message: {
          content: JSON.stringify({
            relation: 'effect',
            read: 'draw out what this makes possible',
            suggestions: [
              { phrase: 'As a result,', why: 'plainest link to the consequence' },
              { phrase: 'Consequently,', why: 'formal, slightly heavier' },
              { phrase: 'Which is why', why: 'keeps the sentence running on' },
              { phrase: 'The upshot is', why: 'conversational, sums up' },
              { phrase: 'It follows that', why: 'signals a reasoned step' },
              { phrase: 'Thereby', why: 'compresses cause into effect' },
              { phrase: 'In consequence,', why: 'measured, essayistic' },
              { phrase: 'Ipso facto,', why: 'Latin, for a self-evident result' }
            ]
          })
        }
      }
    ]
  })
});
