---
layout: ide
title: home
---
<style>
  .home-content {
    overflow: auto;
    height: 100%;
  }

.home-carousel-frame {
  width: min(420px, 90vw);
  aspect-ratio: 4 / 3;
  margin: 15px auto;
  overflow: hidden;        /* required for proper cropping */
}

#home-carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;          /* avoids inline gap */
}

  .cards  {
    padding: 15px;
    display: flex;
    flex-direction: column;
  }

  .card {
    border-left: solid 0.5px var(--fg);
    margin: 10px 0;
    padding: 0 5px;
  }
</style>

<div class='home-content'>
  <div class="home-carousel-frame">
    <img id="home-carousel-img" alt="Random frame from my photo roll" width="1000" height="1000" loading="lazy"
      decoding="async">
  </div>
  
  <div class='cards'>
  {% for p in site.posts %}
  <figure class='card'>
    <a href='{{p.url}}'>{{p.title}}</a>
    <p>{{ p.excerpt }}</p>
  </figure>
  {% endfor %}
</div>

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
