---
layout: ide
title: home
---

# Hello, World!

<img id="home-carousel" alt="random image" style="max-width: 80%; height: auto;">

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