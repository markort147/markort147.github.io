---
layout: ide
title:  "Demo · Lab Notebook"
language: 🇬🇧
published: false
use_code: true
use_math: true
---

Use this post to sanity-check the typography stack and how the 0xProto sidebar pairs with a humanist body font.

## Code experiment

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	tick := time.NewTicker(500 * time.Millisecond)
	defer tick.Stop()

	for range tick.C {
		fmt.Println("🧪 sampling", time.Now().Format(time.RFC1123))
		break
	}
}
```

Inline `code()` should keep the 0xProto texture, while the paragraph stays humanist.

## Math refresher

The energy in a driven oscillator:

\\[
E(t) = \frac{1}{2}mv^2(t) + \frac{1}{2}k x^2(t)
\\]

And a quick inline reminder \( e^{i \pi} + 1 = 0 \).

## Image check

![Brain perfusion dashboard sketch](/assets/img/home-carousel/IMG_20210706_183936~2.jpg "Original frame from the carousel folder")

This is a raw frame from the carousel directory so you can confirm that the new rounded container shows the full photo without grayscale filters.
