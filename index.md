---
layout: ide
title: home
---

# Hello, World!

<div class="quote">
  <blockquote class="quote-text">
    And why should we feel anger at the world? As if the world would notice!
  </blockquote>
  <figcaption class="quote-meta">
    <!-- <span class="quote-from">Meditations</span> —  -->
    <span class="quote-author">Marcus Aurelius</span>
  </figcaption>
</div>

<div align="center">
<img id="home-carousel" alt="random image" style="max-width: 100%">
</div>

<script>
  const images = [
    {% assign imgs = site.static_files | where_exp: "f", "f.path contains '/assets/img/home-carousel/'" %}
    {% for f in imgs %}
      "{{ f.path }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  const pick = images[Math.floor(Math.random() * images.length)];
  document.getElementById("home-carousel").src = pick;
</script>