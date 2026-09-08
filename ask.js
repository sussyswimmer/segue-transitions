// The DeepSeek call, shared by the side panel and the background worker.
// Content scripts can't reach api.deepseek.com directly (MV3 subjects their fetches to
// CORS), so the inline popup routes its request through the background worker instead.

import { RELATION_IDS } from './transitions.js';

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';

export const REGISTER_NOTE = {
  plain: 'Keep every suggestion plain and everyday. No archaic or Latin forms.',
  balanced: 'Mix plain options with two or three less common or more formal ones.',
  formal: 'Favour formal, literary and rare connectives, including Latin forms where they fit.'
};

export function systemPrompt(register, count = 8, avoid = []) {
  const avoidLine = avoid.length
    ? `\n- The writer has already used these in this passage — do not suggest them again: ${avoid.join(', ')}.`
    : '';

  return `You are a rhetoric editor. Given the tail of a passage someone is writing, decide what the NEXT sentence must do in relation to what came before, then offer transition words or phrases that open it.

Reply with JSON only, in this exact shape:
{
  "relation": one of ${RELATION_IDS.map((id) => '"' + id + '"').join(' | ')},
  "read": a clause of at most 12 words naming what the next sentence should do,
  "suggestions": [ { "phrase": "...", "why": "..." } ]
}

Rules:
- Give ${count} suggestions, ordered best-fit first.
- ${REGISTER_NOTE[register] || REGISTER_NOTE.balanced}${avoidLine}
- "phrase" is the literal text to drop in at the caret, punctuation included, capitalised as if starting a sentence.
- "why" is at most 9 words on the shade of meaning it carries.
- Match the register of the writing. No commentary outside the JSON.`;
}

export function readableApiError(status, detail) {
  if (status === 401) return 'DeepSeek rejected the key. Check it in Settings.';
  if (status === 402) return 'DeepSeek account is out of balance.';
  if (status === 429) return 'Rate limited by DeepSeek — pausing a moment.';
  if (status >= 500) return 'DeepSeek is having trouble. Library still works.';
  return `DeepSeek error ${status}${detail ? ': ' + detail.slice(0, 120) : ''}`;
}

/**
 * @returns {Promise<{relation?: string, read?: string, suggestions: Array<{phrase: string, why?: string}>}>}
 */
export async function askDeepSeek({ apiKey, register, passage, count = 8, avoid = [], signal }) {
  const response = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.6,
      max_tokens: 800,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt(register, count, avoid) },
        {
          role: 'user',
          content: `Passage so far (the caret sits at the very end):\n"""${passage.slice(-900)}"""`
        }
      ]
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(readableApiError(response.status, detail));
  }

  const data = await response.json();
  const parsed = JSON.parse(data?.choices?.[0]?.message?.content ?? '{}');
  return {
    relation: parsed.relation,
    read: parsed.read,
    suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : []
  };
}
