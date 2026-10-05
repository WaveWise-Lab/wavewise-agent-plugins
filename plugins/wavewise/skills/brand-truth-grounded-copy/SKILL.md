---
name: brand-truth-grounded-copy
description: Write product and brand copy grounded only in facts the brand owner has confirmed in WaveWise. Use when the user asks for product descriptions, listing copy, FAQs, comparison pages or social posts that must stay accurate to their brand facts.
---

# Copy grounded in confirmed brand facts

Write content from the facts the brand owner has confirmed in WaveWise, cite them, and turn every gap into a proposal instead of a guess.

## Steps

1. Find the product: call `truth_search_facts` with words from its name to get its `entity_id`. If several match, ask which one.
2. Call `truth_get_product_brief` with that `entity_id` and the market (two-letter country) and channel the user names. If they did not name a market or channel, ask once.
3. Call `truth_search_facts` with the `entity_id` for any specific claim the piece needs that the brief does not cover (materials, dimensions, compatibility, certifications, care, warranty).
4. Draft the content in the user's language and the channel's format. After the draft, list each factual claim with the fact it came from.
5. For each claim the user wants that no confirmed fact supports:
   - leave it out of the draft or mark it clearly as a placeholder; and
   - offer `truth_propose_fact` (new or changed fact) or `truth_propose_correction` (a wrong value). It takes effect only after the brand owner confirms it in WaveWise.
6. If the user wants to share a statement with their workspace as a source, call `truth_share_statement` only after showing them the exact text and who will see it, and set `share_confirmed` only when they agree.

## Guardrails

- Only confirmed facts go into the copy. Do not fill gaps from memory, the web or competitor pages.
- Facts returned here are those the workspace may share. Commercial terms are never returned; do not ask for them or estimate them.
- Keep claims no stronger than the fact: "tested to" is not "certified", "compatible with" is not "designed for".
- `truth_list_open_items` shows what is still undecided. Do not present proposed facts as confirmed.
