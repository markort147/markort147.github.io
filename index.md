---
layout: ide
title: home
---

# Hello, World!

<img id="home-carousel" alt="random image" style="max-width: 80%; max-height: 60vh;">

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


> “And why should we feel anger at the world? As if the world would notice!” 
> 
> Marcus Aurelius