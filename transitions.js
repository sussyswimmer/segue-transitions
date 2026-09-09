// The standing library. Always available, no network, no key.
// `common` shows by default; `rare` appears when a group's rare tier is opened.
// `glyph` states the logical relation the group encodes — it is information, not decoration.
//
// `common` mixes the handbook connectives with everyday sayings that do the same job
// ("On the flip side,", "The long and short of it is"). `rare` holds the formal, literary,
// legal and Latin forms — the ones you will not get from a school list.

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
      'And crucially,', 'There is more:', 'To add to that,', 'And another thing:',
      'For good measure,', 'Into the bargain,', 'Not forgetting', 'Then too,', 'And besides,',
      'Piled on top of that,', 'That is before we even get to', 'Throw in', 'As well as this,'
    ],
    rare: [
      'By the same token,', 'In like manner,', 'To say nothing of', 'Coupled with this,',
      'No less important,', 'Further to that,', 'Nor is that all.', 'Over and above this,',
      'As if that were not enough,', 'Conjointly,', 'In addition thereto,', 'Not to mention',
      'Withal,', 'Superadded to this,', 'Cumulatively,', 'Adjunct to this,',
      'In tandem with this,', 'Not to omit', 'Yet further,', 'Added to which,',
      'And that is before we consider', 'Item:', 'Moreover, and more tellingly,',
      'To this may be joined', 'Nor should one overlook', 'In supplement,'
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
      'As with', 'Much like', 'This echoes', 'The parallel is', 'In kind,',
      'Cut from the same cloth,', 'Same story with', 'The same goes for', 'Much as',
      'On a par with this,', 'A kindred case is', 'This mirrors', 'In the same spirit,',
      'No different is', 'It is the same with', 'Two peas in a pod:'
    ],
    rare: [
      'By the same token,', 'Mutatis mutandis,', 'In like fashion,', 'Analogously,',
      'Parallel to this,', 'Comparably,', 'In a similar spirit,', 'After the same pattern,',
      'Not unlike', 'Homologously,', 'Pari passu,', 'In pari materia,', 'Of a piece with this,',
      'Ejusdem generis,', 'Under the same rubric,', 'Consonant with this,',
      'Cognate with this is', 'Isomorphic to this,', 'Twin to this is', 'In the same key,',
      'Congruently,', 'Sharing the same lineage,', 'The counterpart here is'
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
      'Against that,', 'The reverse holds for', 'Nevertheless,', 'Nonetheless,',
      'On the flip side,', 'That cuts both ways:', 'Not so with', 'The picture changes with',
      'A different story emerges with', 'Turn it around, though, and',
      'On the other side of the ledger,', 'Quite differently,', 'Here the two part company:',
      'Unlike', 'In the other direction,', 'Where this ends, another begins:'
    ],
    rare: [
      'Notwithstanding this,', 'Be that as it may,', 'On the contrary,', 'Contrariwise,',
      'For all that,', 'That said,', 'All the same,', 'Set beside this,',
      'Where this breaks down is', 'Per contra,', 'By way of contrast,', 'Howbeit,',
      'Nathless,', 'Athwart this,', 'Au contraire,', 'Over against this,', 'In counterpoint,',
      'Diametrically opposed to this,', 'Against the grain of this,', 'Cutting across this,',
      'By antithesis,', 'On the obverse,', 'Yet withal,', 'In opposition to this,',
      'At the other pole,', 'Antithetically,'
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
      'This much is true:', 'I grant that', 'Sure,', 'Yes, but', 'It is true that',
      'Nobody denies that', 'Let us allow that', 'There is no denying', 'For what it is worth,',
      'To give it its due,', 'Credit where it is due:', 'I take the point that',
      'Fine, so far as it goes:', 'It would be churlish to deny'
    ],
    rare: [
      'Albeit', 'Notwithstanding that', 'For all its', 'However much', 'True enough,',
      'One may concede that', 'Grant for the moment that', 'Even granting this,',
      'Allowing for that,', 'Whatever its merits,', 'Concededly,', 'Assuredly,', 'Arguendo,',
      'Doubtless,', 'Be it granted that', 'Say what you will,', 'Whatever else may be said,',
      'Give the devil his due:', 'Without gainsaying that', 'To do it justice,',
      'Waiving that for the moment,', 'Let it be allowed that', 'Though it be granted,',
      'I do not gainsay that'
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
      'The evidence says otherwise:', 'That confuses', 'Not quite:', 'This will not wash:',
      'Look closer and', 'The facts do not bear this out:', 'That is a red herring:',
      'This cuts no ice, because', 'Wrong on both counts:', 'This does not hold up:',
      'The argument falls apart once', 'That puts the cart before the horse:',
      'This proves nothing of the sort:', 'Hold that up to the light and'
    ],
    rare: [
      'Pace', 'Contra', 'To the contrary,', 'Quite the reverse:', 'The claim will not survive',
      'This begs the question:', 'Nothing could be further from', 'The premise is faulty:',
      'Reductio: if that held,', 'Non sequitur:', 'Post hoc, not propter hoc:',
      'This proves too much:', 'The inference does not go through:', 'A straw man, this:',
      'Tu quoque is no answer:', 'The syllogism fails at the minor premise:',
      'This mistakes the map for the territory:', 'Special pleading aside,',
      'The argument devours itself:', 'Ad hominem is not a rebuttal:',
      'The distinction is without a difference:', 'This equivocates on', 'Ignoratio elenchi:'
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
      'This comes down to', 'Rooted in', 'Behind this lies', 'At the root of this is',
      'Traceable to', 'In the wake of', 'Brought on by', 'Sparked by', 'Fuelled by',
      'This owes much to', 'The root of it is', 'Born of', 'Set in motion by',
      'What lies behind this is', 'Hence the'
    ],
    rare: [
      'Inasmuch as', 'Seeing that', 'By virtue of', 'On account of',
      'For the simple reason that', 'In light of the fact that', 'Whereby', 'Forasmuch as',
      'Attributable to', 'Prompted by', 'Considering that', 'Now that', 'Being as',
      'Consequent upon', 'In view of', 'Occasioned by', 'Engendered by', 'Proceeding from',
      'Begotten of', 'Springing from', 'The proximate cause is', 'The efficient cause is',
      'Under the impetus of', 'Whence it is that', 'By reason of'
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
      'The result is', 'This means that', 'In turn,', 'The knock-on effect is',
      'This paves the way for', 'From this flows', 'The net effect is', 'And so',
      'This sets the stage for', 'The fallout is', 'One consequence is', 'Out of this comes',
      'The downstream effect is', 'That opens the door to', 'The chain reaction is',
      'This tips the balance toward'
    ],
    rare: [
      'Ergo,', 'In consequence,', 'Thereby', 'Ipso facto,', 'Wherefore,', 'Whence',
      'With the result that', 'The corollary is', 'Perforce,', 'From which it emerges that',
      'Thence', 'It results that', 'Ex hypothesi,', 'In the event,', 'The sequel is',
      'By extension,', 'Resultantly,', 'Pursuant to this,', 'Eo ipso,', 'On this footing,',
      'Per consequens,', 'The necessary issue of this is', 'So it comes about that',
      'A fortiori it follows that'
    ]
  },
  {
    id: 'purpose',
    name: 'Purpose',
    glyph: 'A ⟶ goal',
    gloss: 'naming what the move is for',
    common: [
      'So that', 'In order to', 'To that end,', 'With this in mind,', 'For the purpose of',
      'So as to', 'Toward that,', 'The aim being to', 'In pursuit of', 'The point of this is',
      'For the sake of', 'To make sure that', 'To this end,', 'The goal here is to',
      'With the aim of', 'To get there,', 'In an effort to', 'The idea is to', 'In hopes of',
      'Bent on', 'The whole point being', 'Working toward'
    ],
    rare: [
      'Lest', 'With a view to', 'To the end that', 'With an eye to', 'In the service of',
      'For fear that', 'In furtherance of', 'To the intent that', 'In order that',
      'For the avoidance of doubt,', 'In aid of', 'Toward the end of', 'That it might',
      'For the benefit of', 'Designedly,', 'Ad hoc,', 'With intent to', 'In contemplation of',
      'To the purpose that', 'In the interests of', 'By design,'
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
      'On the assumption that', 'When that happens,', 'Say that', 'Suppose', 'In case',
      'On the proviso that', 'Whenever', 'Even if', 'If so,', 'If not,', 'Depending on',
      'So long as', 'Then and only then', 'If and only if', 'Given', 'On the off chance that',
      'Come what may,'
    ],
    rare: [
      'On condition that', 'Insofar as', 'Should it prove that', 'Failing that,', 'Save where',
      'But for', 'Contingent on', 'Were it the case that', 'Subject to', 'Given only that',
      'Provided always that', 'If at all,', 'Peradventure', 'In default of', 'Conditional upon',
      'Sub conditione,', 'Save that', 'Except insofar as', 'In the contingency that',
      'Should the case arise,', 'If and insofar as', 'The sine qua non is',
      'Absent which,', 'Were it not for'
    ]
  },
  {
    id: 'exception',
    name: 'Exception',
    glyph: 'A – B',
    gloss: 'carving out what does not fit',
    common: [
      'Except that', 'Apart from', 'Other than', 'Aside from', 'Barring', 'With one exception:',
      'Short of', 'Leaving aside', 'The exception is', 'Everywhere but', 'Bar', 'Save',
      'All but', 'Not counting', 'With the caveat that', 'The one outlier is',
      'The odd one out is', 'Until you get to', 'That leaves only', 'Except for', 'Discounting',
      'The exception that proves the rule is', 'Only'
    ],
    rare: [
      'Save for', 'Excepting', 'But for', 'With the exception of', 'Setting aside for now',
      'Absent', 'Bar none, except', 'Outside of', 'Exclusive of', 'Saving', 'Bating',
      'Excepted from this is', 'Outwith', 'Apart from which,', 'Exceptis excipiendis,',
      'De minimis aside,', 'The lone dissent is', 'Except in the case of',
      'Beyond the pale of this is', 'Other than which,', 'Excluding'
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
      'Or else,', 'Or, failing that,', 'Take your pick:', 'The other way round,',
      'A different path would be', 'One might instead', 'Or perhaps', 'Then again, one could',
      'The alternative is', 'If not that, then', 'Else,', 'The fork here is',
      'Six of one, half a dozen of the other:', 'Or rather,'
    ],
    rare: [
      'In the alternative,', 'Or, if you prefer,', 'Barring that,', 'As a second resort,',
      'Whether or no,', 'One could as easily', 'Alternately,', 'In lieu of that,',
      'By another route,', 'Or, at a pinch,', 'Should that not serve,', 'Tertium datur:',
      'By way of substitute,', 'Per contra, one might', 'In default thereof,',
      'Or, on a different footing,', 'Vel'
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
      'The first step is', 'Which brings us to', 'To start,', 'First off,', 'Once that is done,',
      'Step two:', 'Last but not least,', 'Straight after,', 'Before that,', 'Building on this,',
      'Last of all,', 'Right after that,', 'Then comes', 'At this point,', 'One step on,',
      'In the first place,'
    ],
    rare: [
      'Thereafter,', 'Hitherto,', 'In the first instance,', 'At the outset,', 'In due course,',
      'Penultimately,', 'Firstly and foremost,', 'In closing sequence,', 'Antecedently,',
      'Secondly,', 'Thirdly,', 'Primo,', 'Secundo,', 'Tertio,', 'Anon,', 'Successively,',
      'Seriatim,', 'In sequel,', 'Anterior to this,', 'Posterior to this,', 'Consecutively,',
      'In the next place,', 'Proceeding in order,'
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
      'Since then,', 'Later,', 'Earlier,', 'Eventually,', 'These days,', 'At that moment,',
      'Around then,', 'For now,', 'As of now,', 'In the long run,', 'Sooner or later,',
      'From then on,', 'In those days,', 'In the short term,', 'Every so often,', 'Presently,',
      'At length,', 'By and by,', 'Nowadays,', 'Back then,', 'In the interval,'
    ],
    rare: [
      'Concurrently,', 'In the interim,', 'All the while,', 'No sooner had', 'Whereupon',
      'Pending that,', 'Coincident with this,', 'Ere long,', 'Of late,', 'Contemporaneously,',
      'Synchronously,', 'Heretofore,', 'Thenceforth,', 'Erewhile,', 'In the fullness of time,',
      'Betimes,', 'At this juncture,', 'Pro tempore,', 'Aforetime,', 'At the eleventh hour,',
      'For the nonce,', 'In tandem,', 'Anon', 'Latterly,', 'Meantime,', 'Ad interim,'
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
      'Not least,', 'Critically,', 'The heart of it is', 'More than anything,',
      'Make no mistake:', 'To be blunt,', 'The bottom line is', 'It cannot be stressed enough that',
      'Plainly,', 'Without question,', 'First and foremost,', 'Bear in mind that',
      'Unquestionably,', 'To put it bluntly,', 'The crux is', 'It should go without saying that',
      'Of all things,', 'Let me underline this:', 'And this is the point:'
    ],
    rare: [
      'A fortiori,', 'All the more so,', 'What is more to the point,', 'Needless to say,',
      'Emphatically,', 'It bears repeating that', 'Mark this:', 'Above all else,',
      'Let there be no doubt:', 'Nota bene:', 'Verily,', 'In no uncertain terms,', 'Signally,',
      'Not for nothing is', 'Chief among these,', 'Par excellence,', 'Preeminently,',
      'In the strongest terms,', 'Note well:', 'This above all:', 'Foremost,', 'Sine dubio,',
      'Categorically,', 'Advisedly, I say', 'Most of all,'
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
      'Look at', 'A clear instance is', 'Say,', 'Think of', 'Case in point:', 'Picture',
      'Here is one:', 'Among them,', 'To name one,', 'Just look at', 'Among others,',
      'Chief among them,', 'By way of example,', 'One need look no further than',
      'Take the case of', 'To give an example,', 'Like', 'The textbook case is'
    ],
    rare: [
      'A case in point:', 'By way of illustration,', 'Viz.,', 'To take one instance,', 'Witness',
      'Exempli gratia,', 'Not least among these,', 'To cite but one,', 'As instanced by',
      'Inter alia,', 'Instance:', 'Videlicet,', 'To name but a few,', 'Illustratively,',
      'As exemplified by', 'To particularise,', 'Of which the plainest is', 'For one,',
      'The locus classicus is', 'In exemplum,', 'As typified by', 'Among the clearest is'
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
      'The figures bear this out:', 'Survey results point to', 'In the words of',
      'The numbers tell the story:', 'The record shows', 'It is well documented that',
      'Look no further than', 'On the evidence of', 'As the figures show,',
      'Consider the numbers:', 'Experts agree that', 'The findings suggest', 'As measured by',
      'Here is the proof:', 'Backed by', 'Case studies show', 'In one study,',
      'The paper trail shows'
    ],
    rare: [
      'Per', 'As attested by', 'On the authority of', 'The record bears out', 'Corroborated by',
      'By all accounts,', 'As borne out by', 'On the testimony of', 'Empirically,', 'Vide',
      'Cf.', 'Quod vide,', 'Ut infra,', 'Testimony to this is', 'The literature bears out',
      'Confirmed by', 'Substantiated by', 'On good authority,', 'Ipse dixit aside,',
      'Warranted by', 'As the archive attests,', 'Q.v.', 'The weight of authority holds',
      'As the sources concur,', 'Evidenced by'
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
      'To be specific,', 'Said another way,', 'Which is to say,', 'Let me be precise:',
      'To spell it out,', 'The short version is', 'In plain English,', 'Simply put,',
      'What I mean is', 'Read:', 'Translated,', 'To put a finer point on it,', 'That is to say,',
      'In effect,', 'Meaning', 'Put simply,', 'Namely:', 'To be exact,'
    ],
    rare: [
      'Id est,', 'Viz.,', 'Stated otherwise,', 'To put it another way,', 'Properly understood,',
      'Strictly speaking,', 'To translate that:', 'In plainer terms,', 'Scilicet,', 'Sc.',
      'To wit,', 'In plain terms,', 'Qua', 'Rephrased,', 'I.e.,', 'To gloss this:',
      'Literally,', 'By which is meant', 'In the strict sense,', 'Loosely,', 'More exactly,',
      'That is to say, more narrowly,', 'In technical terms,', 'Sensu stricto,'
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
      'Set against', 'Weighed together,', 'Next to', 'Side by side,', 'Pound for pound,',
      'Like for like,', 'Stack them up and', 'Head to head,', 'Dwarfed by',
      'On the same scale,', 'By that yardstick,', 'By a wide margin,', 'Not a patch on',
      'In relation to', 'On par with', 'Ranked against', 'The gap between',
      'Apples to apples,', 'Measured up against'
    ],
    rare: [
      'A fortiori,', 'Proportionally,', 'Correspondingly less,', 'Measured against',
      'Weighed beside', 'In inverse measure,', 'Vis-à-vis', 'By the same measure,',
      'Comparatively,', 'Pro rata,', 'In ratio to', 'On a like-for-like basis,',
      'In contradistinction to', 'Toe to toe with', 'In apposition to', 'Per capita,',
      'Juxtaposed with', 'Commensurate with', 'A minori ad maius,', 'A maiori ad minus,',
      'Relative thereto,', 'In degree rather than kind,', 'Ceteris paribus, against'
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
      'Almost without exception,', 'Nine times out of ten,', 'More often than not,',
      'In the aggregate,', 'The general rule is', 'Usually,', 'As a general rule,',
      'Taken as a whole,', 'At large,', 'Almost always,', 'Universally,', 'Across cases,',
      'Writ large,', 'The pattern holds:', 'Everywhere you look,', 'As often as not,'
    ],
    rare: [
      'By and large,', 'In the main,', 'Generally speaking,', 'As a general matter,',
      'Ordinarily,', 'In the common run of things,', 'For the generality of cases,',
      'In globo,', 'Passim,', 'In gross,', 'Ubiquitously,', 'As a matter of course,',
      'Nine parts in ten,', 'In the round,', 'Prevailingly,', 'Ut plurimum,',
      'In the general case,', 'The communis opinio holds that', 'Almost invariably,',
      'Save for outliers,', 'Customarily,', 'In the ordinary way,'
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
      'If only', 'Something like', 'To a degree,', 'With some caveats,', 'Give or take,',
      'In a sense,', 'Loosely speaking,', 'Only insofar as', 'Not entirely, but',
      'Depending on how you count,', 'On one view,', 'In a limited sense,', 'Roughly,',
      'To a point,', 'With a grain of salt,', 'With one proviso:', 'Up to a certain point,',
      'Within reason,'
    ],
    rare: [
      'Prima facie,', 'Ceteris paribus,', 'With qualifications,', 'In a manner of speaking,',
      'So far as it goes,', 'Modulo', 'Roughly and provisionally,', 'To a first approximation,',
      'Cum grano salis,', 'Secundum quid,', 'In a qualified sense,', 'Pro tanto,',
      'Subject to correction,', 'On a narrow reading,', 'Within the four corners of',
      'Advisedly,', 'In some measure,', 'With due allowance,', 'Under certain descriptions,',
      'Salva veritate,', 'Under caution,', 'Mutatis mutandis, and only so far,',
      'Within the limits of the evidence,'
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
      'Shifting ground,', 'A second issue is', 'Next up:', 'That leaves', 'Which brings me to',
      'Let us turn to', 'Now for', 'Another matter entirely is', 'Enough about that:',
      'To change tack,', 'A word now on', 'On to', 'What about', 'Setting that aside,',
      'Speaking more broadly,', 'Closer to home,', 'Zooming out,', 'Zooming in,'
    ],
    rare: [
      'Anent', 'Touching on', 'Regarding, then,', 'To pass to', 'Coming now to',
      'By way of transition,', 'Apropos', 'In re', 'As touching', 'Concerning which,',
      'On the matter of', 'Turning the page,', 'To another head:', 'Passing on,',
      'Digressing no further,', 'Whereof', 'As regards', 'In point of', 'Quoad',
      'Reverting to the main line,', 'To resume the thread,'
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
      'In line with the above,', 'As we saw,', 'As I said,', 'Remember that', 'Earlier I noted',
      'Back to', 'As already argued,', 'To return to', 'As above,',
      'Bear in mind the earlier point:', 'This ties back to', 'As promised,',
      'Picking up where we left off,', 'To circle back,', 'As the last section showed,',
      'This is where the earlier point pays off:', 'Which loops back to'
    ],
    rare: [
      'Per the foregoing,', 'As adduced above,', 'Ut supra,', 'Reverting to',
      'In accordance with what precedes,', 'As intimated earlier,', 'Supra,', 'Vide supra,',
      'As aforesaid,', 'As previously adverted to,', 'Recurring to', 'As premised,',
      'As rehearsed above,', 'As heretofore stated,', 'Ut dictum est,', 'In reprise,',
      'As already canvassed,', 'Harking back to', 'As was said at the outset,',
      'In fulfilment of the earlier promise,'
    ]
  },
  {
    id: 'digression',
    name: 'Digression',
    glyph: 'A ~ B',
    gloss: 'stepping sideways for a moment',
    common: [
      'Incidentally,', 'By the way,', 'As an aside,', 'On a related note,', 'Speaking of which,',
      'It is worth noting that', 'Briefly,', 'A small note:', 'Side note:', 'Off topic, but',
      'For what it is worth,', 'A quick detour:', 'While we are on the subject,',
      'This is a tangent, but', 'Curiously,', 'Funnily enough,', 'Which reminds me,',
      'In passing,', 'A footnote to this:', 'Not to labour it, but', 'One more thing:',
      'Oddly enough,', 'As it happens,'
    ],
    rare: [
      'Parenthetically,', 'En passant,', 'Apropos of that,', 'To digress for a moment,',
      'If I may step aside,', 'Obiter,', 'Obiter dictum:', 'Apropos of nothing,', 'Excursus:',
      'By the by,', 'To wander for a line,', 'Marginally,', 'On a tangent,',
      'In a parenthesis,', 'Sotto voce,', 'Interjecting briefly,',
      'To leave the thread a moment,', 'Ex cursu,', 'A word in the margin:',
      'Before returning to the point,'
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
      'To close,', 'The lesson is', 'Which leaves us with', 'In conclusion,',
      'The long and short of it is', 'At the end of the day,', 'Bottom line:',
      'It comes down to this:', 'To wrap up,', 'Put together,', 'All told,', 'Net-net,',
      'Summing up,', 'To draw this to a close,', 'What it all means is', 'So, in the round,',
      'And there it is:', 'That is the sum of it.', 'In brief,'
    ],
    rare: [
      'In fine,', 'When all is said and done,', 'In the final analysis,', 'To sum up,',
      'The upshot is', 'In the last resort,', 'Summa summarum,', 'To draw the threads together,',
      'Q.E.D.', 'In summa,', 'Finally, then,', 'To recapitulate,', 'To bring this to a head,',
      'Ad finem,', 'Thus far, and no farther:', 'In retrospect,', 'Here the matter rests.',
      'The case is closed:', 'So ends the argument.', 'Upon the whole,', 'To be brief,',
      'Enfin,', 'In the last analysis,', 'Ultimately, then,'
    ]
  }
];

export const RELATION_BY_ID = Object.fromEntries(RELATIONS.map((r) => [r.id, r]));
export const RELATION_IDS = RELATIONS.map((r) => r.id);
