Page
====

Partly adapted from 'Inclusive Design Patterns' by Heydon Pickering [p43],  Page structures need some specific HTML to make them fully inclusive.

```
<!doctype html>
<html class="no-js" lang="en-gb" id="page-id">
<head>
    <meta charset="utf-8">
    <title>Page Title | Site Name</title>

    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Ultra-light fallback styles for ancient browsers: -->
    <meta id="css_has_loaded" name="fallback" content="">
    <style>
        /*
            Tiny Fall-Back Styles (https://github.com/Fall-Back/Patterns/edit/master/Page/README.md)

            The following styles provide a better visual experience in cases where linked
            stylesheets aren't loaded for any reason. It's recommended that any styles that won't
            be used by the elements on the page be removed to make this as lean as possible, and
            the run through a minifier (e.g. https://cssminifier.com) to compress it as much a
            possible, since this is sent on each request and not cached.
            Note there's a section that uses attributes to apply styles to specific elements. This
            is so as not to pollute the class space and help authors make distinctions.
            There's a much long essay on this brewing and I'll add the link when it's done.

            Colour references for ease of search/replace:
            colour-1: darkslategrey
            colour-2: silver
        */

        /* --| Core styles |--------------------------------------------------------------------- */
        html {
            background: darkslategrey;
        }

        body {
            font: 1em/1.2 sans-serif;
            padding: 2em;
            margin: 0 auto;
            max-width: 50em;
            background: #fff;
        }

        /* For older browsers:(see https://github.com/aFarkas/html5shiv) */
        dialog,
        details,
        main,
        summary {
            display: block;
        }

        @supports (list-style-type: disclosure-closed) {
            summary {
                display: list-item;
            }
        }

        mark {
            background: #FF0;
            color: #000;
        }

        template,
        [hidden] {
            display: none;
        }

        /* The "older browser" message makes use of a fieldset to add a border no matter what: */
        fieldset {
            border: 1px solid;
            border-color: currentColor;
            margin: 1em 0;
            padding: 1em;
        }

        /* More responsive images: */
        /* Note ancient image tag is actually for the SVG FalBack PNG method */
        img,
        image,
        object,
        svg {
            max-width: 100%;
            -ms-interpolation-mode: bicubic;
            vertical-align: middle;
            height: auto;
            border: 0;
        }

        /* Links and image links */
        a[href] {
            color: inherit;
        }

        a[href]:hover {
            text-decoration: none;
        }

        a[href] img {
            padding: 0.3em;
            margin: 0.2em;
        }

        /*
            Putting things like tables in figures makes sense and allows them to become scrollable
            if they're too wide.
        */
        figure {
            max-width: 100%;
            overflow-x: auto;
        }

        /*
            BUT! Opera Mini doesn't support scrolling areas so hacking it out for that browser:
        */
        _:-o-prefocus, :root figure {
            max-width: initial;
            overflow-x: visible;
        }

        hr {
            border-style: solid;
            border-width: 0 0 1px 0;
            margin: 1em 0;
            color: currentColor;
        }

        pre {
            width: 100%;
            overflow-x: scroll;
            overflow-y: auto;
        }

        video {
            max-width: 100%;
            height: auto;
        }


        /* --| Form styles |--------------------------------------------------------------------- */
        /* If you're using forms, keep this: */

        button {
            background-color: lightslategray;
            color: #fff;
        }

        button,
        input,
        label,
        select,
        textarea {
            vertical-align: middle;
            vertical-align: middle;
            min-height: 2.2em;
            margin: 0.2em 0;
        }

        button,
        input[type="checkbox"],
        input[type="radio"],
        label,
        select {
            cursor: pointer;
        }

        button,
        input,
        textarea {
            padding: 0 0.5em;
            line-height: 1.5;
        }


        /* --| Table styles |-------------------------------------------------------------------- */
        /* If you're using tables, keep this: */

        table {
            width: 100%;
            border: 1px solid currentColor;
            border-collapse: collapse;
        }

        table[role="presentation"] {
            border: 0;
            table-layout: fixed;
        }

        table[role="presentation"] td {
            border: 0;
        }

        th {
            background: silver;
        }

        caption, td, th {
            padding: 0.5em;
        }

        /*
            What follows is a mix of markup patterns and attributes to help provide a more
            reasonable fallback - it's unconventional, so leave it out if you like.
        */

        /* Attributes to replicate deprecated HTML styling: */

        /* Would have been align="right": */
        [data-fs-text~="right"] {
            text-align: right;
        }

        /* Would have been align="center": */
        [data-fs-text~="center"] {
            text-align: center;
        }

        /* Would have been the 'big' element: */
        [data-fs-text~="larger"] {
            font-size: larger;
        }

        [data-fs-text~="nowrap"] {
            white-space: nowrap;
        }
    </style>
    <!--
        The above, minified:
        fieldset,hr{margin:1em 0}image,img,object,svg,video{max-width:100%;height:auto}pre,table{width:100%}html{background:#2f4f4f}body{font:1em/1.2 sans-serif;padding:2em;margin:0 auto;max-width:50em;background:#fff}details,dialog,main,summary{display:block}@supports (list-style-type:disclosure-closed){summary{display:list-item}}mark{background:#ff0;color:#000}[hidden],template{display:none}fieldset{border:1px solid currentColor;padding:1em}image,img,object,svg{-ms-interpolation-mode:bicubic;vertical-align:middle;border:0}a[href]{color:inherit}a[href]:hover{text-decoration:none}a[href] img{padding:.3em;margin:.2em}figure{max-width:100%;overflow-x:auto}_:-o-prefocus,:root figure{max-width:initial;overflow-x:visible}hr{border-style:solid;border-width:0 0 1px;color:currentColor}pre{overflow-x:scroll;overflow-y:auto}button{background-color:#778899;color:#fff}button,input,label,select,textarea{vertical-align:middle;min-height:2.2em;margin:.2em 0}button,input[type=checkbox],input[type=radio],label,select{cursor:pointer}button,input,textarea{padding:0 .5em;line-height:1.5}table{border:1px solid currentColor;border-collapse:collapse}table[role=presentation]{border:0;table-layout:fixed}table[role=presentation] td{border:0}th{background:silver}caption,td,th{padding:.5em}[data-fs-text~=right]{text-align:right}[data-fs-text~=center]{text-align:center}[data-fs-text~=larger]{font-size:larger}[data-fs-text~=nowrap]{white-space:nowrap}
    -->

    <!-- From here we're cutting off IE9- to stop all kinds of JS and CSS fails. -->
    <!--[if !IE]><!-->

    <style>
        /*
            Tiny Fall-Back Styles continued ...

            What follows is a mix of markup patterns and attributes to help provide a more
            reasonable fallback - it's unconventional, so leave it out if you like.
        */

        /* --| Block styles |-------------------------------------------------------------------- */
        [data-fs-block] {
            display: block;
            margin-left: 0;
            margin-right: 0;
        }

        [data-fs-block~="background"] {
            background: silver;
            padding: 1em;
        }

        [data-fs-block~="inverted"]  {
            background-color: darkslategrey;
            padding: 1em;
        }

        [data-fs-block~="inverted"] * {
            color: #fff;
        }


        [data-fs-block~="inverted"] img {
            background: #fff;
            padding: 0.5em;
            border: 0;
        }

        [data-fs-block~="border"] {
            border: 1px solid darkslategrey;
            margin: 1em 0;
            padding: 1em;
        }

        [data-fs-block~="rounded"] {
            border-radius: 1em;
        }

        [data-fs-block~="padding"] {
            padding: 1em;
        }

        [data-fs-block~=flush]{
            margin-left: -2em;
            margin-right: -2em;
        }

        [data-fs-block~=flush]:last-child{
            margin-bottom: -2em;
        }

        /* --| Table Layout |-------------------------------------------------------------------- */
        /*
            Useful when you have a very small amount of items you want to display side-by-side.
            Like, maybe 2, on the left and right. It doesn't wrap so the items should be small.
            There's reasonable support. Better support would be:
            `<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">`
            But we're not supposed to use deprecated 'presentational' elements and attributes.
        */
        [data-fs-block~="table"] {
            display: table;
            width: 100%;
            table-layout: fixed;
        }

        [data-fs-block~="table"] > * {
            display: table-cell;
            padding: 0.5em;
        }


        /* --| Flex Layout |--------------------------------------------------------------------- */
        /*
            More responsive and has wrapping, but less well supported than the table layout.
        */
        [data-fs-block~="flex"] {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
        }

        [data-fs-block~="flex"] > * {
            -webkit-box-flex: 1;
            -webkit-flex: 1 1 auto;
            -moz-box-flex: 1;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto
        }

        /* --| Other stuff |--------------------------------------------------------------------- */

        /* Responsive embeds (e.g. YouTube, maps) via http://embedresponsively.com. */
        [data-fs-block="video"] {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            max-width: 100%;
        }

        [data-fs-block="video"] iframe,
        [data-fs-block="video"] object,
        [data-fs-block="video"] embed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }


        /* Horizontal rules: */
        [data-fs-hr="larger"] {
            border-top-width: 10px;
        }
    </style>
    <!--
        The above, minified:
        [data-fs-block]{display:block}[data-fs-block~=background]{background:silver;padding:1em}[data-fs-block~=inverted]{background-color:#2f4f4f;padding:1em}[data-fs-block~=inverted] *{color:#fff}[data-fs-block~=inverted] img{background:#fff;padding:.5em;border:0}[data-fs-block~=border]{border:1px solid #2f4f4f;margin:1em 0;padding:1em}[data-fs-block~=rounded]{border-radius:1em}[data-fs-block~=padding]{padding:1em}[data-fs-block~=flush]{margin-left:-2em;margin-right:-2em}[data-fs-block~=flush]:last-child{margin-bottom:-2em}[data-fs-block~=table]{display:table;width:100%;table-layout:fixed}[data-fs-block~=table]>*{display:table-cell;padding:.5em}[data-fs-block~=flex]{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}[data-fs-block~=flex]>*{-webkit-box-flex:1;-webkit-flex:1 1 auto;-moz-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}[data-fs-block=video]{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%}[data-fs-block=video] embed,[data-fs-block=video] iframe,[data-fs-block=video] object{position:absolute;top:0;left:0;width:100%;height:100%}[data-fs-hr=larger]{border-top-width:10px}
    -->

    <!--
        Accessible font loading. FOUT is a lesser evil than FOIT.
        (https://keithclark.co.uk/articles/loading-css-without-blocking-render/)
    -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap" rel="stylesheet" media="not all" onload="if(media!='all')media='all'">

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

    <!-- Other styles and scripts inside the IE9- cut ... -->

    <!--<![endif]-->
</head>
<body id="top">

    <!-- A few select Feather Icons (https://feathericons.com/). Edit as needed. -->
    <svg xmlns="http://www.w3.org/2000/svg" display="none">
        <style>
            i &gt; svg:only-child,
            .icon {
                fill: none;
                fill-opacity: 0;
                stroke: currentColor;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
                width: 1.25em;
                height: 1.25em;
                margin: 0;
                padding: 0;
                vertical-align: text-bottom;
            }
        </style>
        <symbol id="icon-chevron-down" viewBox="0 0 24 24" fill="none" fill-opacity="0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </symbol>
        <symbol id="icon-chevron-up" viewBox="0 0 24 24" fill="none" fill-opacity="0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </symbol>
        <symbol id="icon-chevron-left" viewBox="0 0 24 24" fill="none" fill-opacity="0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
        </symbol>
        <symbol id="icon-chevron-right" viewBox="0 0 24 24" fill="none" fill-opacity="0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </symbol>
        <symbol id="icon-cross" viewBox="0 0 24 24" fill="none" fill-opacity="0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </symbol>
        <symbol id="icon-menu" viewBox="0 0 24 24" fill="none" fill-opacity="0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </symbol>
        <symbol id="icon-search" viewBox="0 0 24 24" fill="none" fill-opacity="0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="10.5" cy="10.5" r="7.5"></circle>
            <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
        </symbol>
    </svg>

    <div data-if-css="hide">
        <fieldset role="presentation">
            <p>
                <b>Notice:</b> You are viewing an unstyled version of this page. Are you using a very old browser? If so, <a href="https://browsehappy.com/?locale=en">please consider upgrading</a>.
            </p>
        </fieldset>
    </div>

    <header>
        <nav aria-label="primary">
            ...
        </nav>
        <hr>
    </header>

    <main id="main">

        <h1>Page Title</h1>

    </main>

    <footer aria-label="Page">
        <hr>
        <p>
            <a href="#top">Top</a>
        </p>
    </footer>
</body>
</html>
```
