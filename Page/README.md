Page
====

Partly adapted from 'Inclusive Design Patterns' by Heydon Pickering [p143],  Page structurews need some specific HTML to make them fully inclusive.

```
<!doctype html>
<html class="no-js" lang="en-gb">
<head>    
    <meta charset="utf-8" />
    <title>Page Title | Site Name</title>
    
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <style>
        /* Tiny fallback styles */
        /* (https://github.com/Fall-Back/Base/edit/master/tiny-fallback-styles.css) */
        body{padding:1em;margin:0 auto;max-width: 50em;}
        img{max-width:100%;-ms-interpolation-mode: bicubic;}
        [hidden]{display:none;}
        main{display:block;}

        /* For YouTube via http://embedresponsively.com. May or may not be needed. */
        .embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
    </style>
    
    <!--
        Accessible font loading. FOUT is a lesser evil than FOIT.
        (https://keithclark.co.uk/articles/loading-css-without-blocking-render/)
    -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap" rel="stylesheet" media="none" onload="if(media!='all')media='all'">

    <!--
        M3 Mustard Cut
        (https://github.com/Fall-Back/CSS-Mustard-Cut#the-m3-cut-much-more-modern)
        Print (Edge doesn't apply to print otherwise)
        IE 10, 11
        Edge
        Chrome 29+, Opera 16+, Safari 6.1+, iOS 7+, Android ~4.4+
        FF 29+   
    -->
    <link rel="stylesheet" href="your-stylesheet.css" media="
        only print, screen and (min-width: 1vm),
        only all and (-ms-high-contrast: none), only all and (-ms-high-contrast: active),
        only all and (pointer: fine), only all and (pointer: coarse), only all and (pointer: none),
        only all and (-webkit-min-device-pixel-ratio:0) and (min-color-index:0),
        only all and (min--moz-device-pixel-ratio:0) and (min-resolution: 3e1dpcm)
    ">
</head>
<body role="document">

    <div class="no-style-notice  no-css-only">
        <hr />
        <p>
            <b>Notice:</b> You are viewing an unstyled version of this page. Are you using a very old browser? If so, <a href="http://browsehappy.com/">please consider upgrading</a>.
        </p>
        <hr />
    </div>	
        
    <main id="main">
    
        <h1>Page Title</h1>
    
    </main>
    
    <footer>
        <p>
            <a href="#">Top</a>
        </p>
    </footer>
</body>
</html>
```
