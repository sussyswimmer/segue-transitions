// Throwaway stub of the chrome.* surface so sidepanel.js runs in a plain page.
// `?shot=N` selects one of the store-screenshot scenes.
const SHOT = Number(new URLSearchParams(location.search).get('shot') || 1);

const PASSAGES = {
  1: 'Coastal mangroves along the Can Gio shoreline hold back roughly a third of the tidal erosion recorded before 2019.',
  2: 'Coastal mangroves along the Can Gio shoreline hold back roughly a third of the tidal erosion recorded before 2019.',
  3:
    'The council promised a review in 2019. However, the survey was never commissioned. ' +
    'Moreover, the budget line vanished the following spring. However, residents kept filing ' +
    'reports of flooding on the eastern bank. Moreover, two councillors raised it at committee. ' +
    'However, nothing ever reached the agenda.',
  4: 'Rahman reads the 2019 survey as evidence that the planting scheme worked. The data will not carry that weight.',
  5: 'Coastal mangroves along the Can Gio shoreline hold back roughly a third of the tidal erosion recorded before 2019.'
};

const REPLIES = {
  1: {
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
  },
  3: {
    relation: 'contrast',
    read: 'turn against the run of the paragraph',
    suggestions: [
      { phrase: 'Even so,', why: 'plain, and unlike the three you have used' },
      { phrase: 'Against that,', why: 'sets the objection down hard' },
      { phrase: 'Then again,', why: 'lighter, keeps the voice conversational' },
      { phrase: 'On the other side of the ledger,', why: 'signals a full turn' },
      { phrase: 'Be that as it may,', why: 'formal, concedes before it turns' },
      { phrase: 'Per contra,', why: 'Latin, for a flat opposition' }
    ]
  },
  4: {
    relation: 'refutation',
    read: 'take the reading apart',
    suggestions: [
      { phrase: 'But this overlooks', why: 'names what the reading missed' },
      { phrase: 'The trouble with this is', why: 'plain, sets up the fault' },
      { phrase: 'That assumes', why: 'goes straight at the premise' },
      { phrase: 'This proves too much:', why: 'the objection turned on itself' },
      { phrase: 'Non sequitur:', why: 'names the fallacy outright' },
      { phrase: 'Pace', why: 'formal, disagrees while crediting' }
    ]
  }
};
REPLIES[2] = REPLIES[1];
REPLIES[5] = REPLIES[1];

// A stub key so the fitted-suggestion path renders. The shipped extension
// resolves the built-in key from config.js instead.
const store = { apiKey: 'sk-preview', online: true, auto: true, showRare: false };
const sampleContext = {
  before: PASSAGES[SHOT] || PASSAGES[1],
  after: '',
  atStart: false,
  field: 'Essay draft \u00b7 text area',
  url: 'https://example.test/'
};

window.chrome = {
  storage: {
    local: {
      get: async (keys) => Object.fromEntries(keys.map((k) => [k, store[k]])),
      set: async (obj) => Object.assign(store, obj)
    },
    onChanged: { addListener() {} }
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
    choices: [{ message: { content: JSON.stringify(REPLIES[SHOT] || REPLIES[1]) } }]
  })
});
