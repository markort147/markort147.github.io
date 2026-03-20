---
layout: ide
title:  "Demo · Field Report"
language: 🇬🇧
published: false
use_code: true
use_math: true
---

# Rendering Sample — Field Report

> Testing a mix of text, tables, inline math, and media so I can tweak the design quickly.

## Snapshot grid

<figure>
  <img src="/assets/img/home-carousel/IMG_20190831_105751.jpg" alt="Morning reflections in the Dolomites" loading="lazy" decoding="async">
  <figcaption>Dolomiti · full-frame photo without zoom or filters.</figcaption>
</figure>

<figure>
  <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80" alt="Analog scope readout" loading="lazy" decoding="async">
  <figcaption>Remote image pulled from Unsplash to check CORS + sizing.</figcaption>
</figure>

## Mixed content table

| channel | type | note |
|--------|------|------|
| PRx    | float | Autoregulation index |
| ABP    | mmHg  | Systolic 124 ± 2 |
| ICP    | mmHg  | Currently \(14 \pm 1.2\) |

## Pseudocode block

```python
def prx(abp_window, icp_window):
    """Rolling PRx correlation with windowed data."""
    abp_mean = sum(abp_window) / len(abp_window)
    icp_mean = sum(icp_window) / len(icp_window)
    num = sum((a - abp_mean) * (i - icp_mean) for a, i in zip(abp_window, icp_window))
    den = (sum((a - abp_mean) ** 2 for a in abp_window) * sum((i - icp_mean) ** 2 for i in icp_window)) ** 0.5
    return num / den
```

That equation typically lives inside a band-limited feedback loop:

\\[
	\mathrm{PRx}(t) = \mathrm{corr}\_{t-T}^{t}( \mathrm{ICP}, \mathrm{ABP})
\\]

So block math, inline math, code, and images all share the same unpublished sandbox.
