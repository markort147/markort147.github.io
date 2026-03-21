---
layout: ide
title: home
---

<figure class="home-carousel">
  <div class="home-carousel__frame">
    <img id="home-carousel-img" alt="Random frame from my photo roll" width="1600" height="1066" loading="lazy"
      decoding="async">
  </div>
</figure>

<script>
  const images = [
    {% assign imgs = site.static_files | where_exp: "f", "f.path contains '/assets/img/home-carousel/'" %}
    {% for f in imgs %}
      "{{ f.path }}"{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
  const pick = images[Math.floor(Math.random() * images.length)];
  const frame = document.getElementById("home-carousel-img");
  if (frame) frame.src = pick;
</script>
