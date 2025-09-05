---
layout: ide
title: home
---

# Hello, World!

<img id="home-carousel" alt="random image" style="max-width: 80%; height: auto;">

<script>
  const n = 13; 
  const rand = Math.floor(Math.random() * n) + 1;
  document.getElementById("home-carousel").src = `/assets/img/home-carousel/${rand}.jpg`;
</script>