# Satoshi NK-1 — Bitcoin Audio Playground (2019)

The original Bitcoin Audio browser instrument: read a block, slice its hash, play it.
This repository is the 2019 source of that playground and the earliest home of the
**Sound Money** idea. It is kept as an archive — it is not the current build.

## Live

- Landing page — <https://bitcoinaudio.github.io/satoshi-nk-1.github.io/>
- **Satoshi NK-1 pads** — <https://bitcoinaudio.github.io/satoshi-nk-1.github.io/page2.html>

Pages serves this as a **project site**, so the address is
`bitcoinaudio.github.io/satoshi-nk-1.github.io/`. The name `satoshi-nk-1.github.io`
is not a host GitHub can serve from this repository — `*.github.io` only resolves for
the account that owns the name. Use the links above.

## What it does

1. Ask Blockstream for a block by height.
2. Take the **Merkle root** or the **hash** as a string.
3. Slice that string (start/end, next/prev, whole/half).
4. Play the slice through a synth voice — AMSynth, DuoSynth, FMSynth, MembraneSynth,
   MonoSynth, NoiseSynth, PolySynth — with pads, knobs, a colour sequencer and
   WebAudioRecorder for capture.

`page2.html` is the instrument. `index.html` is the front door from that period.

## What is in here

- `index.html` — 2019 landing page
- `page2.html` — Satoshi NK-1 pads, the working instrument
- `js/` — playground, sequencer, pads, knobs, MIDI and recorder code
- `build/Tone.js` — Tone.js build the pages load locally
- `audio/` — `Box_5_*` drum one-shots and `Satoshi_Genesis-Block-Mix-030919.wav`
- `Sound Money/` — three 2019 recipes: block height, hash clip, instrument, delay
- `examples/`, `effect/`, `instrument/`, `knobs/` — instrument and effect pages from
  the same period

## The `Sound Money/` recipes

Added in the first commit (2019-10-05), before there was a band:

```json
{ "height": 0, "clip": "4a5e1e4b4a5e1e4b", "instrument": "Membrane", "delay": 150, "effect": "" }
```

Three files in that shape. That is the album's working method, written down years
before the record had players.

## Archived, not maintained

The code is 2019-era: jQuery, Bootstrap 4, Tone.js 13, Polymer-style components, no
build step, Pages served straight from `master`. Expect dead ends. The path fixes here
only keep the pages loading; nothing has been modernised.

Successor work: [radicalproof.com](https://radicalproof.com) — Radical Proof,
*Sound Money*, Sunny Above the Clouds Records.
