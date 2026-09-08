// The standing library. Always available, no network, no key.
// `common` shows by default; `rare` appears when a group's rare tier is opened.
// `glyph` states the logical relation the group encodes — it is information, not decoration.

export const RELATIONS = [
  {
    id: 'addition',
    name: 'Addition',
    glyph: 'A + B',
    gloss: 'stacking another point on the same side',
    common: [
      'Moreover,', 'Furthermore,', 'In addition,', 'Additionally,', 'What is more,', 'Also,',
      'Besides that,', 'On top of that,', 'Not only that —', 'Equally,', 'Then there is',
      'Another point:', 'Beyond that,', 'Add to this', 'Alongside this,', 'Second to this,',
      'And crucially,', 'There is more:'
    ],
    rare: [
      'By the same token,', 'In like manner,', 'To say nothing of', 'Coupled with this,',
      'No less important,', 'Further to that,', 'Nor is that all.', 'Over and above this,',
      'As if that were not enough,', 'Conjointly,', 'In addition thereto,', 'Not to mention'
    ]
  },
  {
    id: 'similarity',
    name: 'Similarity',
    glyph: 'A ≈ B',
    gloss: 'showing the next point runs parallel',
    common: [
      'Likewise,', 'Similarly,', 'In the same way,', 'Correspondingly,', 'Just as', 'So too',
      'Along the same lines,', 'Equally,', 'In much the same vein,', 'The same holds for',
      'As with', 'Much like', 'This echoes', 'The parallel is'
    ],
    rare: [
      'By the same token,', 'Mutatis mutandis,', 'In like fashion,', 'Analogously,',
      'Parallel to this,', 'Comparably,', 'In a similar spirit,', 'After the same pattern,',
      'Not unlike'
    ]
  },
  {
    id: 'contrast',
    name: 'Contrast',
    glyph: 'A ≠ B',
    gloss: 'turning against what you just said',
    common: [
      'However,', 'By contrast,', 'On the other hand,', 'Conversely,', 'Yet', 'Still,',
      'Instead,', 'Rather,', 'Then again,', 'Whereas', 'While', 'In contrast,',
      'The opposite is true of', 'That is not the case for', 'But', 'Even so,',
      'Against that,', 'The reverse holds for'
    ],
    rare: [
      'Notwithstanding this,', 'Be that as it may,', 'On the contrary,', 'Contrariwise,',
      'For all that,', 'That said,', 'All the same,', 'Set beside this,',
      'Where this breaks down is', 'Per contra,', 'By way of contrast,', 'Howbeit,'
    ]
  },
  {
    id: 'concession',
    name: 'Concession',
    glyph: 'A, yet B',
    gloss: 'granting a point before you push past it',
    common: [
      'Although', 'Even though', 'Admittedly,', 'Granted,', 'Of course,', 'To be sure,',
      'While it is true that', 'Naturally,', 'It is fair to say', 'No doubt',
      'There is something to this:', 'Certainly,', 'I accept that', 'Fair enough —',
      'This much is true:'
    ],
    rare: [
      'Albeit', 'Notwithstanding that', 'For all its', 'However much', 'True enough,',
      'One may concede that', 'Grant for the moment that', 'Even granting this,',
      'Allowing for that,', 'Whatever its merits,'
    ]
  },
  {
    id: 'refutation',
    name: 'Refutation',
    glyph: '¬ A',
    gloss: 'taking an objection apart',
    common: [
      'On the contrary,', 'Far from it —', 'This misses the point:', 'In truth,', 'Actually,',
      'The objection fails because', 'That assumes', 'But this overlooks',
      'The trouble with this is', 'Nothing follows from', 'This gets it backwards:',
      'The evidence says otherwise:', 'That confuses'
    ],
    rare: [
      'Pace', 'Contra', 'To the contrary,', 'Quite the reverse:', 'The claim will not survive',
      'This begs the question:', 'Nothing could be further from', 'The premise is faulty:',
      'Reductio: if that held,'
    ]
  },
  {
    id: 'cause',
    name: 'Cause',
    glyph: 'B ← A',
    gloss: 'naming what produced the thing',
    common: [
      'Because', 'Since', 'As', 'For', 'Owing to', 'Due to', 'In that', 'Given that',
      'The reason is', 'This stems from', 'Driven by', 'On the strength of', 'Thanks to',
      'This comes down to', 'Rooted in'
    ],
    rare: [
      'Inasmuch as', 'Seeing that', 'By virtue of', 'On account of',
      'For the simple reason that', 'In light of the fact that', 'Whereby', 'Forasmuch as',
      'Attributable to', 'Prompted by'
    ]
  },
  {
    id: 'effect',
    name: 'Effect',
    glyph: 'A → B',
    gloss: 'drawing out what follows from it',
    common: [
      'Therefore,', 'Consequently,', 'As a result,', 'Thus,', 'Hence,', 'Accordingly,', 'So',
      'Which is why', 'For this reason,', 'The upshot is', 'This leaves', 'It follows that',
      'The result is', 'This means that', 'In turn,'
    ],
    rare: [
      'Ergo,', 'In consequence,', 'Thereby', 'Ipso facto,', 'Wherefore,', 'Whence',
      'With the result that', 'The corollary is', 'Perforce,', 'From which it emerges that'
    ]
  },
  {
    id: 'purpose',
    name: 'Purpose',
    glyph: 'A ⟶ goal',
    gloss: 'naming what the move is for',
    common: [
      'So that', 'In order to', 'To that end,', 'With this in mind,', 'For the purpose of',
      'So as to', 'Toward that,', 'The aim being to', 'In pursuit of', 'The point of this is'
    ],
    rare: [
      'Lest', 'With a view to', 'To the end that', 'With an eye to', 'In the service of',
      'For fear that', 'In furtherance of', 'To the intent that'
    ]
  },
  {
    id: 'condition',
    name: 'Condition',
    glyph: 'A ⇒ B',
    gloss: 'hanging the claim on a proviso',
    common: [
      'If', 'Unless', 'Provided that', 'As long as', 'In the event that', 'Otherwise,',
      'Assuming that', 'Where this holds,', 'Only if', 'Should', 'Supposing that',
      'On the assumption that', 'When that happens,'
    ],
    rare: [
      'On condition that', 'Insofar as', 'Should it prove that', 'Failing that,', 'Save where',
      'But for', 'Contingent on', 'Were it the case that', 'Subject to', 'Given only that'
    ]
  },
  {
    id: 'exception',
    name: 'Exception',
    glyph: 'A – B',
    gloss: 'carving out what does not fit',
    common: [
      'Except that', 'Apart from', 'Other than', 'Aside from', 'Barring', 'With one exception:',
      'Short of', 'Leaving aside', 'The exception is', 'Everywhere but'
    ],
    rare: [
      'Save for', 'Excepting', 'But for', 'With the exception of', 'Setting aside for now',
      'Absent', 'Bar none, except', 'Outside of'
    ]
  },
  {
    id: 'alternative',
    name: 'Alternative',
    glyph: 'A ∨ B',
    gloss: 'offering the other road',
    common: [
      'Alternatively,', 'Or', 'Either way,', 'On another reading,', 'Another option is',
      'Failing that,', 'Instead of this,', 'Equally possible is', 'A second route is',
      'Or else,'
    ],
    rare: [
      'In the alternative,', 'Or, if you prefer,', 'Barring that,', 'As a second resort,',
      'Whether or no,', 'One could as easily'
    ]
  },
  {
    id: 'sequence',
    name: 'Sequence',
    glyph: 'A ▸ B',
    gloss: 'ordering steps or moments in time',
    common: [
      'First,', 'Second,', 'Third,', 'Next,', 'Then', 'Subsequently,', 'Afterward,', 'Finally,',
      'At last,', 'To begin with,', 'From there,', 'Lastly,', 'After that,', 'Following this,',
      'The first step is', 'Which brings us to'
    ],
    rare: [
      'Thereafter,', 'Hitherto,', 'In the first instance,', 'At the outset,', 'In due course,',
      'Penultimately,', 'Firstly and foremost,', 'In closing sequence,'
    ]
  },
  {
    id: 'time',
    name: 'Time',
    glyph: 'A ∥ B',
    gloss: 'placing two things in the same stretch of time',
    common: [
      'Meanwhile,', 'At the same time,', 'In the meantime,', 'Simultaneously,',
      'As this happened,', 'Before long,', 'Soon after,', 'Once', 'By then,', 'Until then,',
      'Since then,', 'Later,', 'Earlier,', 'Eventually,'
    ],
    rare: [
      'Concurrently,', 'In the interim,', 'All the while,', 'No sooner had', 'Whereupon',
      'Pending that,', 'Coincident with this,', 'Ere long,', 'Of late,'
    ]
  },
  {
    id: 'emphasis',
    name: 'Emphasis',
    glyph: 'A !',
    gloss: 'leaning on the point you already made',
    common: [
      'Indeed,', 'In fact,', 'Above all,', 'Most importantly,', 'Notably,', 'Especially',
      'Certainly,', 'Undeniably,', 'What matters here is', 'Crucially,', 'Chiefly,',
      'Not least,', 'Critically,', 'The heart of it is', 'More than anything,'
    ],
    rare: [
      'A fortiori,', 'All the more so,', 'What is more to the point,', 'Needless to say,',
      'Emphatically,', 'It bears repeating that', 'Mark this:', 'Above all else,',
      'Let there be no doubt:'
    ]
  },
  {
    id: 'example',
    name: 'Example',
    glyph: 'A ⊃ B',
    gloss: 'coming down from claim to instance',
    common: [
      'For example,', 'For instance,', 'To illustrate,', 'Namely,', 'Specifically,',
      'In particular,', 'Consider', 'Such as', 'Take', 'One case is', 'As seen in',
      'Look at', 'A clear instance is', 'Say,'
    ],
    rare: [
      'A case in point:', 'By way of illustration,', 'Viz.,', 'To take one instance,', 'Witness',
      'Exempli gratia,', 'Not least among these,', 'To cite but one,', 'As instanced by'
    ]
  },
  {
    id: 'evidence',
    name: 'Evidence',
    glyph: 'A ⊨ B',
    gloss: 'putting weight behind the claim',
    common: [
      'According to', 'As shown by', 'Research suggests', 'The evidence indicates', 'Drawing on',
      'Studies find', 'The data show', 'Reported by', 'Documented in', 'As recorded in',
      'The figures bear this out:', 'Survey results point to', 'In the words of'
    ],
    rare: [
      'Per', 'As attested by', 'On the authority of', 'The record bears out', 'Corroborated by',
      'By all accounts,', 'As borne out by', 'On the testimony of', 'Empirically,'
    ]
  },
  {
    id: 'clarification',
    name: 'Clarification',
    glyph: "A = A'",
    gloss: 'saying the same thing more exactly',
    common: [
      'That is,', 'In other words,', 'Put differently,', 'To be clear,', 'More precisely,',
      'What this means is', 'Or rather,', 'To put it plainly,', 'By this I mean',
      'To be specific,', 'Said another way,', 'Which is to say,'
    ],
    rare: [
      'Id est,', 'Viz.,', 'Stated otherwise,', 'To put it another way,', 'Properly understood,',
      'Strictly speaking,', 'To translate that:', 'In plainer terms,'
    ]
  },
  {
    id: 'comparison',
    name: 'Comparison',
    glyph: 'A vs B',
    gloss: 'weighing one against the other',
    common: [
      'Compared with', 'By comparison,', 'Relative to', 'More than that,', 'Even more so,',
      'To a lesser extent,', 'Against', 'Where the two differ is', 'On balance,',
      'Set against', 'Weighed together,', 'Next to'
    ],
    rare: [
      'A fortiori,', 'Proportionally,', 'Correspondingly less,', 'Measured against',
      'Weighed beside', 'In inverse measure,', 'Vis-à-vis', 'By the same measure,'
    ]
  },
  {
    id: 'generalization',
    name: 'Generalisation',
    glyph: 'A ⊂ all',
    gloss: 'widening out from the instance',
    common: [
      'In general,', 'Broadly,', 'As a rule,', 'On the whole,', 'Typically,', 'For the most part,',
      'More widely,', 'Across the board,', 'In most cases,', 'Commonly,', 'Time and again,',
      'Almost without exception,'
    ],
    rare: [
      'By and large,', 'In the main,', 'Generally speaking,', 'As a general matter,',
      'Ordinarily,', 'In the common run of things,', 'For the generality of cases,'
    ]
  },
  {
    id: 'qualification',
    name: 'Qualification',
    glyph: 'A, partly',
    gloss: 'narrowing the claim before it overreaches',
    common: [
      'To some extent,', 'In part,', 'Up to a point,', 'Arguably,', 'It seems that',
      'Broadly speaking,', 'At least in', 'More or less,', 'Within limits,', 'On this reading,',
      'If only', 'Something like'
    ],
    rare: [
      'Prima facie,', 'Ceteris paribus,', 'With qualifications,', 'In a manner of speaking,',
      'So far as it goes,', 'Modulo', 'Roughly and provisionally,', 'To a first approximation,'
    ]
  },
  {
    id: 'topicshift',
    name: 'Topic shift',
    glyph: '⇥ B',
    gloss: 'moving to the next thing on purpose',
    common: [
      'Turning to', 'As for', 'With respect to', 'On the question of', 'In the case of',
      'Moving on,', 'Now consider', 'This brings us to', 'Where X is concerned,',
      'Shifting ground,', 'A second issue is'
    ],
    rare: [
      'Anent', 'Touching on', 'Regarding, then,', 'To pass to', 'Coming now to',
      'By way of transition,'
    ]
  },
  {
    id: 'reference',
    name: 'Reference back',
    glyph: '↩ A',
    gloss: 'pointing to ground you already covered',
    common: [
      'As noted,', 'As discussed,', 'Recall that', 'As shown above,', 'Having established that',
      'Returning to', 'As mentioned earlier,', 'To pick up the earlier thread,',
      'In line with the above,', 'As we saw,'
    ],
    rare: [
      'Per the foregoing,', 'As adduced above,', 'Ut supra,', 'Reverting to',
      'In accordance with what precedes,', 'As intimated earlier,'
    ]
  },
  {
    id: 'digression',
    name: 'Digression',
    glyph: 'A ~ B',
    gloss: 'stepping sideways for a moment',
    common: [
      'Incidentally,', 'By the way,', 'As an aside,', 'On a related note,', 'Speaking of which,',
      'It is worth noting that', 'Briefly,', 'A small note:'
    ],
    rare: [
      'Parenthetically,', 'En passant,', 'Apropos of that,', 'To digress for a moment,',
      'If I may step aside,', 'Obiter,'
    ]
  },
  {
    id: 'conclusion',
    name: 'Conclusion',
    glyph: 'A → end',
    gloss: 'closing the argument out',
    common: [
      'In short,', 'In sum,', 'Overall,', 'To conclude,', 'Ultimately,', 'On the whole,',
      'All in all,', 'In the end,', 'The point is', 'What this adds up to is', 'Taken together,',
      'To close,', 'The lesson is', 'Which leaves us with'
    ],
    rare: [
      'In fine,', 'When all is said and done,', 'In the final analysis,', 'To sum up,',
      'The upshot is', 'In the last resort,', 'Summa summarum,', 'To draw the threads together,'
    ]
  }
];

export const RELATION_BY_ID = Object.fromEntries(RELATIONS.map((r) => [r.id, r]));
export const RELATION_IDS = RELATIONS.map((r) => r.id);
