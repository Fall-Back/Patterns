Subtitles
=========

[html5 Doctor: How to mark up subheadings, subtitles, alternative titles and taglines](http://html5doctor.com/howto-subheadings/)

Inline subtitle
---------------

```
<header>
    <h2>Title <span aria-hidden="false" hidden>Stubtitle: </span><b>subtitle</b></h2>
</header>
```

`<b>` becuse in HTML5 it means 'stylistically offset'.

Seperate Subtitle or Tagline
----------------------------

```
<header>
    <h2>Title</h2>
    <p>Subtitle</p>
</header>
```