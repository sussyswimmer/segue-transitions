// The signposting bank — the moves an essay makes beyond connecting two sentences.
// Same shape as RELATIONS so the panel can render either bank without a special case.
// `glyph` names the move in the margin, the way a marker would annotate it.
// X and Y stand in for the author or term you will name yourself.

export const SIGNPOSTS = [
  {
    id: 'thesis',
    name: 'Stating the claim',
    glyph: 'thesis',
    gloss: 'putting your argument on the table',
    common: [
      'This essay argues that', 'I contend that', 'The central claim is that',
      'My argument is that', 'What follows will show that', 'The case here is that',
      'This paper sets out to show', 'The position taken here is', 'I want to suggest that',
      'The claim I defend is', 'In what follows I argue', 'My contention is simple:',
      'This essay makes one claim:', 'Put bluntly, my view is', 'The argument, in a sentence, is',
      'I will make the case that'
    ],
    rare: [
      'The thesis advanced here holds that', 'I shall maintain that',
      'It will be argued throughout that', 'The burden of this essay is to show',
      'The proposition to be defended is', 'I submit that', 'The thesis is twofold:',
      'It is the argument of this paper that', 'Herein I argue', 'The claim, baldly stated, is'
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
      'The discussion proceeds in three parts.', 'Before that, some context:',
      'Two questions organise this essay:', 'First, I set out', 'Then I consider',
      'The final section', 'The argument proceeds in stages.', 'A brief word on method:',
      'The essay falls into two halves.', 'Here is the plan:'
    ],
    rare: [
      'The argument unfolds as follows:', 'By way of preface,',
      'The structure of what follows is straightforward:', 'It remains to consider',
      'The order of business is this:', 'I proceed by', 'What follows is divided thus:',
      'Prefatory to the argument,', 'The plan of the essay is as follows.',
      'The exposition falls into three movements.'
    ]
  },
  {
    id: 'question',
    name: 'Posing a question',
    glyph: 'ask',
    gloss: 'framing what the section will answer',
    common: [
      'The question, then, is', 'This raises the question:', 'Why should this be?',
      'What explains this?', 'But is this so?', 'How far does this hold?', 'The puzzle is this:',
      'Which prompts a further question:', 'Two questions arise.', 'So what is going on here?',
      'What would it take to', 'Where does that leave'
    ],
    rare: [
      'The quaestio is', 'It may be asked whether', 'Whence this?',
      'The problem, stated baldly, is', 'One is entitled to ask', 'The crux may be put as a question:',
      'What, then, is to be made of'
    ]
  },
  {
    id: 'source',
    name: 'Bringing in a source',
    glyph: 'cite',
    gloss: 'handing the floor to someone else',
    common: [
      'As X argues,', 'X observes that', 'In X’s account,', 'X puts it this way:',
      'Writing in Y, X notes', 'X has shown that', 'Drawing on X,', 'X makes the case that',
      'X’s point is that', 'For X,', 'In X’s words,', 'X goes further:', 'According to X,',
      'X’s findings suggest', 'As X famously put it,', 'X is right that', 'X is surely wrong to',
      'X frames it as', 'X’s answer is'
    ],
    rare: [
      'X would have it that', 'To borrow X’s phrase,', 'On X’s reading,',
      'As X reminds us,', 'Following X,', 'X’s locus classicus on this is', 'Per X,',
      'X adumbrates', 'X’s formulation runs:', 'Apud X,', 'X’s dictum that', 'X avers that',
      'Pace X,'
    ]
  },
  {
    id: 'summary',
    name: 'Summarising a source',
    glyph: 'précis',
    gloss: 'compressing someone else’s argument',
    common: [
      'X’s argument runs as follows.', 'In brief, X holds that', 'X’s position has three parts.',
      'The gist of X is', 'Stripped down, X claims', 'X’s case rests on', 'To summarise X:',
      'The core of X’s view is', 'X’s reasoning is simple:', 'What X is really saying is',
      'The short version of X is'
    ],
    rare: [
      'X’s argument, reduced to its bones, is', 'In précis, X maintains', 'The nub of X is',
      'X’s thesis may be compendiously stated:', 'Distilled, X’s position amounts to',
      'X’s account, in outline, is this:'
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
      'The obvious objection is', 'Here a sceptic would ask', 'The strongest objection is',
      'Is this not simply', 'But surely,', 'One might reply that', 'A defender of X would say',
      'This invites the response that', 'Opponents will say', 'The obvious rejoinder is',
      'Not everyone accepts this.', 'The worry is that'
    ],
    rare: [
      'It may be urged that', 'The opposing view runs thus:', 'One might press the point:',
      'An advocate of the contrary position would say', 'It will be said that',
      'The sceptic has a ready answer:', 'A contrarian would insist',
      'On the opposing side stands', 'The dissent runs:', 'To this it may be replied',
      'The objection, in its strongest form, is'
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
      'That may be true, but', 'The objection proves too much:', 'The answer is that',
      'This does not follow.', 'But the objection assumes', 'Two things can be said in response.',
      'Even if so,', 'The point is well taken, but', 'Here the objection runs out:',
      'Grant the premise; the conclusion still fails.', 'This misses the mark because',
      'There is less to this than meets the eye:'
    ],
    rare: [
      'The rejoinder is that', 'This will not do, because', 'The objection cuts the other way:',
      'Such a view cannot be sustained, since', 'The riposte is plain:',
      'The objection is otiose, since', 'This is to mistake', 'Against this, two considerations:',
      'The reply is twofold.', 'Nothing in the objection touches',
      'The objection may be turned on its head:'
    ]
  },
  {
    id: 'weigh',
    name: 'Weighing the evidence',
    glyph: 'weigh',
    gloss: 'holding two considerations against each other',
    common: [
      'On one side,', 'On the other,', 'Weighed against this,', 'The balance tips toward',
      'Set these side by side and', 'Neither view is wholly right.', 'The trade-off is',
      'Both points have force, but', 'The scales come down on', 'There is truth on both sides.',
      'What tips it is', 'Against that must be set'
    ],
    rare: [
      'In the balance,', 'Pondered together,', 'The considerations are finely poised.',
      'Judgement here must be a matter of degree.', 'Between the horns of this,',
      'The preponderance favours', 'On a fair weighing,'
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
      'To some degree,', 'One reading is that', 'It is possible that', 'There is reason to think',
      'In all likelihood,', 'This might suggest', 'As far as can be told,', 'It appears that',
      'Perhaps', 'One might tentatively conclude', 'The picture is not settled, but',
      'With caution,', 'It is at least plausible that'
    ],
    rare: [
      'The data are consistent with', 'Tentatively,', 'If the reading holds,',
      'Provisionally, one might say', 'Prima facie,', 'The balance of probability favours',
      'Ceteris paribus, one expects', 'Subject to further evidence,',
      'The inference is defeasible, but', 'On present evidence, and no more,',
      'With due circumspection,'
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
      'It helps to separate X from Y.', 'X here means', 'I use X to mean', 'X, as I use it, is',
      'Call this X.', 'What counts as X is', 'X is not the same as Y.',
      'Two senses of X need separating.', 'Let us call it X.', 'Narrowly defined, X is',
      'Loosely, X is'
    ],
    rare: [
      'X is to be taken in the sense of', 'Let X denote', 'On the definition adopted here,',
      'The word carries two senses; I use the second.', 'Stipulatively, X shall mean',
      'X is used here in its technical sense:', 'Per definitionem,', 'I adopt X’s definition of',
      'Following usage, X denotes', 'Define X as', 'The definiens is'
    ]
  },
  {
    id: 'refine',
    name: 'Refining the claim',
    glyph: 'refine',
    gloss: 'tightening the thesis after testing it',
    common: [
      'More precisely, then,', 'The claim needs sharpening:', 'This forces a distinction.',
      'A better formulation is', 'The thesis survives, in modified form:',
      'What the objection shows is', 'The argument must be narrowed:', 'This suggests a revision:',
      'So the claim is not that X, but that Y.', 'Let me restate the point more carefully.',
      'The stronger version of the claim is'
    ],
    rare: [
      'The claim, so amended, reads:', 'Reformulated, the thesis holds that',
      'With this refinement in place,', 'The proposition may be restated thus:',
      'Mutatis mutandis, the thesis stands.', 'In its chastened form, the claim is'
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
      'The significance lies in', 'Why does this matter?', 'The cost of getting this wrong is',
      'If this is right, a great deal follows.', 'This is not a small point.',
      'A lot rides on this.', 'The practical difference is', 'Here is why it matters:',
      'What hangs on this is', 'The upshot for X is'
    ],
    rare: [
      'Much turns on this.', 'The question is far from academic:',
      'Nothing less than X depends on it.', 'The stakes are these:',
      'The ramifications extend to', 'Not a little depends on',
      'The consequences are far-reaching:', 'This is the crux on which', 'On this hinges'
    ]
  },
  {
    id: 'direct',
    name: 'Directing the reader',
    glyph: 'note',
    gloss: 'telling the reader what to watch for',
    common: [
      'Note that', 'Observe that', 'It is worth pausing on', 'Two things stand out.',
      'Notice what has happened here:', 'Keep this in mind.', 'The reader will have noticed',
      'A caution is in order:', 'Consider what this implies.', 'Look again at',
      'Hold that thought.', 'Watch what happens when'
    ],
    rare: [
      'Mark the sequence:', 'Let the reader judge.', 'Attend to the wording:',
      'The point deserves dwelling on.', 'Nota bene:', 'The reader is asked to bear in mind',
      'Observe, in passing, that'
    ]
  },
  {
    id: 'limits',
    name: 'Acknowledging limits',
    glyph: 'scope',
    gloss: 'saying what the argument does not cover',
    common: [
      'This essay does not address', 'A full treatment is beyond the scope here.',
      'I leave aside', 'This is not the place to', 'Space does not permit',
      'One limitation should be noted:', 'The argument says nothing about',
      'I bracket the question of', 'That is a question for another day.',
      'I claim nothing stronger than', 'Much has been left out, deliberately.'
    ],
    rare: [
      'I pretermit', 'These matters lie outwith the present inquiry.',
      'Such questions must await another occasion.', 'I forbear to',
      'The present study is silent on', 'This lies beyond my remit.',
      'I make no claim as to'
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
      'This much is settled.', 'In short, then,', 'The point stands.',
      'That settles the first question.', 'Two conclusions follow.',
      'This is the core of the matter.', 'The evidence, then, is decisive.',
      'Which is all to say', 'That is the first point.', 'The case so far is this:'
    ],
    rare: [
      'So much for X.', 'With that established,', 'The ground is now prepared for',
      'Enough has been said to show', 'Thus far the argument.', 'Let that stand as established.',
      'This disposes of the first objection.', 'The matter may rest here.',
      'So stands the first part.'
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
      'It follows that we should', 'In the end, the question is', 'This leaves us with',
      'The lesson, if there is one, is', 'Whatever the answer,', 'None of this is to say',
      'One thing is clear:', 'That is the argument.', 'If nothing else,', 'The choice, then, is',
      'Where does this leave us?'
    ],
    rare: [
      'I have argued that', 'The case, I hope, is made.', 'Where this leads is another matter.',
      'The conclusion is unavoidable:', 'Let the last word be', 'The rest is for others to decide.',
      'I rest the case there.', 'Such, at any rate, is the argument.',
      'The matter, I submit, is settled.', 'What remains is a question, not an answer.'
    ]
  }
];

export const SIGNPOST_BY_ID = Object.fromEntries(SIGNPOSTS.map((s) => [s.id, s]));
