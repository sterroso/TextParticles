# TextParticles
---

Simulates text composed by mobile particles repelled by the mouse pointer.

It starts by creating an [HTML Canvas](https://developer.mozilla.org/ms/docs/HTML/Canvas) where a small text is written and the scanned to transform each pixel into a filled circle (particle), each sith its own behaviour to drift away from the mouse pointer when it gets near, and go back to its initial position when it goes away.

Uses a custom class to store the Particle's properties and behaviours. 

A `mouse` object stores the mouse pointer's position and captures 
its movement events.

Attached a `resize` event handler to the window to adjust the `canvas` dimensions (width and height).

---

## Credits

This was made thanks to [Frank's laboratory](https://twitter.com/code_laboratory) [free tutorial on YouTube](https://www.youtube.com/watch?v=XGioNBHrFU4).

You might learn a lot about the `<canvas>` HTML element, game programming and particles animation in his [YouTube Channel](https://www.youtube.com/channel/UCEqc149iR-ALYkGM6TG-7vQ) and [TikTok profile](https://www.tiktok.com/@franks_laboratory).

Visit his [CodePen portfolio](https://codepen.io/franksLaboratory) to find out more code like this.

Thank you very much!

---

## TODO:

* Add an entry point from the `index.html` page.
* Accept input from the user to change the text shown.
* Accept input from the user to customize other properties as:
  * Font family.
  * Background color.
  * Foreground color(s).
  * Support for gradients in Background and Foreground.
  * Particle radius (size).
  * Mouse repel radius.
  * Support for images in addition to text.
* Estimate the least possible area to scan into `getImageData` to optimize memory and cpu usage.
* Find general optimization opportunities.