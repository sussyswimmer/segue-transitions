// The signposting bank — the moves an essay makes beyond connecting two sentences.
// Same shape as RELATIONS so the panel can render either bank without a special case.
// `glyph` names the move in the margin, the way a marker would annotate it.

export const SIGNPOSTS = [
  {
    id: 'thesis',
    name: 'Stating the claim',
    glyph: 'thesis',
    gloss: 'putting your argument on the table',
    common: [
      'This essay argues that', 'I contend that', 'The central claim is that',
      'My argument is that', 'What follows will show that', 'The case here is that',
      'This paper sets out to show', 'The position taken here is'
    ],
    rare: [
      'The thesis advanced here holds that', 'I shall maintain that',
      'It will be argued throughout that', 'The burden of this essay is to show'
    ]
  },
  {
    id: 'roadmap',
    name: 'Mapping the essay',
    glyph: 'roadmap',
    gloss: 'telling the reader where this is going',
    common: [
      'The first section examines', 'I begin by', 'Having established that, I turn to',
      'The remainder of this essay', 'Three points follow.', 'I take these in turn.',
      'The discussion proceeds in three parts.', 'Before that, some context:'
    ],
    rare: [
      'The argument unfolds as follows:', 'By way of preface,',
      'The structure of what follows is straightforward:', 'It remains to consider'
    ]
  },
  {
    id: 'source',
    name: 'Bringing in a source',
    glyph: 'cite',
    gloss: 'handing the floor to someone else',
    common: [
      'As X argues,', 'X observes that', 'In X’s account,', 'X puts it this way:',
      'Writing in Y, X notes', 'X has shown that', 'Drawing on X,', 'X makes the case that'
    ],
    rare: [
      'X would have it that', 'To borrow X’s phrase,', 'On X’s reading,',
      'As X reminds us,', 'Following X,'
    ]
  },
  {
    id: 'counter',
    name: 'Raising a counterargument',
    glyph: 'counter',
    gloss: 'giving the other side its say',
    common: [
      'It might be objected that', 'One could argue that', 'Critics contend that',
      'A common response is that', 'Against this it is said that', 'Some would reply that',
      'The obvious objection is', 'Here a sceptic would ask'
    ],
    rare: [
      'It may be urged that', 'The opposing view runs thus:', 'One might press the point:',
      'An advocate of the contrary position would say'
    ]
  },
  {
    id: 'reply',
    name: 'Answering the objection',
    glyph: 'reply',
    gloss: 'taking the counterargument apart',
    common: [
      'This objection fails because', 'But that misreads', 'The reply is straightforward:',
      'This holds only if', 'The difficulty with this is', 'Even granting that,',
      'That may be true, but', 'The objection proves too much:'
    ],
    rare: [
      'The rejoinder is that', 'This will not do, because', 'The objection cuts the other way:',
      'Such a view cannot be sustained, since'
    ]
  },
  {
    id: 'hedge',
    name: 'Hedging a claim',
    glyph: 'hedge',
    gloss: 'claiming only as much as you can defend',
    common: [
      'The evidence suggests', 'It seems likely that', 'This may indicate', 'Arguably,',
      'On the available evidence,', 'It would be fair to say', 'This points toward',
      'To some degree,', 'One reading is that'
    ],
    rare: [
      'The data are consistent with', 'Tentatively,', 'If the reading holds,',
      'Provisionally, one might say', 'Prima facie,'
    ]
  },
  {
    id: 'define',
    name: 'Defining a term',
    glyph: 'define',
    gloss: 'fixing what a word will mean here',
    common: [
      'By X I mean', 'Throughout, X refers to', 'X is understood here as',
      'For present purposes, X means', 'The term is used narrowly:', 'A distinction is needed:',
      'It helps to separate X from Y.'
    ],
    rare: [
      'X is to be taken in the sense of', 'Let X denote', 'On the definition adopted here,',
      'The word carries two senses; I use the second.'
    ]
  },
  {
    id: 'stakes',
    name: 'Naming the stakes',
    glyph: 'stakes',
    gloss: 'saying why any of this matters',
    common: [
      'What is at stake here is', 'This matters because', 'The consequence is not trivial:',
      'The implication is', 'This bears directly on', 'The practical upshot is',
      'The significance lies in'
    ],
    rare: [
      'Much turns on this.', 'The question is far from academic:',
      'Nothing less than X depends on it.', 'The stakes are these:'
    ]
  },
  {
    id: 'wrap',
    name: 'Closing a paragraph',
    glyph: 'wrap',
    gloss: 'landing the point before you move on',
    common: [
      'The point, then, is', 'This suggests', 'Taken together, these show',
      'What this establishes is', 'So far, then,', 'The pattern is clear:',
      'This much is settled.'
    ],
    rare: [
      'So much for X.', 'With that established,', 'The ground is now prepared for',
      'Enough has been said to show'
    ]
  },
  {
    id: 'close',
    name: 'Closing the essay',
    glyph: 'close',
    gloss: 'ending on the argument, not a summary',
    common: [
      'The argument comes to this:', 'If this is right, then', 'What remains is',
      'The question this leaves open is', 'None of this settles', 'The larger point is',
      'It follows that we should'
    ],
    rare: [
      'I have argued that', 'The case, I hope, is made.', 'Where this leads is another matter.',
      'The conclusion is unavoidable:'
    ]
  }
];

export const SIGNPOST_BY_ID = Object.fromEntries(SIGNPOSTS.map((s) => [s.id, s]));
