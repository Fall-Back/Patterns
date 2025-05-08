Tiny FallBack Styles (TFS)
==========================

Ok, so there are situations where your stylesheets won't load:

Failed CSS
----------

1. If the connection/request fails they won't arrive
2. If the browser is being 'cut' by a {Mustard Cut](https://github.com/Fall-Back/CSS-Mustard-Cut)
3. If you've implemented some sort of 'Lite' version of your site/app to let users choose not to load them

No CSS
------

5. If someone is using a text-only browser
6. If someone has disabled stylesheets

Now these last two I don't have data on - I don't know if people still use text-only browsers; and I don't know if anyone browses the web with styles deliberately disabled (expect perhaps Web Developers (myself included) with [a point to prove](https://css-tricks.com/that-time-i-tried-browsing-the-web-without-css/)).
I'm not even sure it's possible to disable CSS in any mobile browser?
Number 3 is something I'm seriously considering and I need to do more research on.

Right, so if the stylesheets haven't loaded you're normally left with a fairly ugly column of raw-rendered HTML - even with the cleanest, most well-organised markup. User Agent Stylesheets provide some critical styles like margins, font sizes and weights and display properties, [for example](http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css).

I've thought quite a lot about this, and I'd love to be able to leverage this stylesheet more in creating a more useable FallBack experience. By using deprecated attributes and inappropriate tags we can create something that works a little better, BUT, that's against the spec.

I'll come back to that later.

The TFS is designed to be as small as possible and live in the `<head>` of a page. So yes, it gets downloaded with each request, but it's Tiny, and it's water tight against Failed CSS situations.
Currently it's this:

```
    <!-- Ultra-light fallback styles for ancient browsers: -->
    <meta id="css_has_loaded">
    <style>
        /*
            The following styles provide a better visual experience in cases where linked
            stylesheets aren't loaded for any reason. It's recommended that any styles that won't
            be used by the elements on the page be removed to make this as lean as possible.
            Previously I recommended running this CSS through a minifier
            (e.g. https://cssminifier.com) to compress it as much a possible, since this is sent on
            each request and not cached. However the savings are very small and there's a chance a
            minifier may break some CSS that's been crafted specially with hacks or moderng syntax
            that's unsupported by the minfier.

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

        /* EXTRA: */

        a[href] img:hover,a[href] svg:hover{outline: 2px solid;}

        /* For YouTube via http://embedresponsively.com. May or may not be needed. */
        .embed-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;} .embed-container iframe, .embed-container object, .embed-container embed{position:absolute;top:0;left:0;width:100%;height:100%;}

        /* IE needs SVG icons to NOT be auto height: */
        svg[height="1.25em"] {height: 1.25em;}

        .js-map .c-map {
            height: 200px;
        }

        [data-fs-block=hidden]{display:none !important}

        /* IE 9, 10 shows svg fallback images as broken images: */
        _::selection, svg image { display:none\0; }

        /*
            IE 10's JS can break when tryignto load YouTube player, which in turn breaks the
            `details` polyfill, making `details` content invisible, so fix that:
        */
        _:-ms-lang(x), .selector { details:not([open])>:not(summary){display:block\9 !important}; }
    </style>

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

        [data-fs-block~="fill-width"] {
            width: 100%;
        }

        [data-fs-block~="inline"] {
            display: inline-block;
        }

        [data-fs-block~="background"] {
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
            max-width: -webkit-calc(100% - 1em);
            max-width: -moz-calc(100% - 1em);
            max-width: calc(100% - 1em);
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

        [data-fs-block~="margin"] {
            margin: 1em;
        }


        [data-fs-block~="flush"]{
            margin-left: -2em;
            margin-right: -2em;
        }

        [data-fs-block~="flush"]:last-child{
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
        @supports (flex-wrap: wrap) {
            [data-fs-block~="flex"] {
                display: flex;
            }

            [data-fs-block~="flex-row"] {
                flex-wrap: wrap;
            }

            [data-fs-block~="flex-spaced"] {
                justify-content: space-around;
            }

            [data-fs-block~="flex-column"] {
                flex-direction: column;
            }

            [data-fs-block~="flex"] > * {
                flex: 1 1 auto;
                margin: 1em;

                display: flex;
            }

            [data-fs-block~="inline"] {
                align-self: center;
            }


            [data-fs-block~="flex-spaced"] > * {
                flex-grow: 0;
            }


            [data-fs-block~="flex"] * {
                max-width: 100%;
            }

            [data-fs-block~="flex"] > * > [data-fs-block] {
                margin: 0;
            }

            [data-fs-block~="flex-first"] {
                order: -1;
            }

            [data-fs-block~="gutter"] {
                padding: 0.5em;
            }

            [data-fs-block~="gutter"] > * {
                padding: 0.5em;
            }

            [data-fs-block~="flush-gutter"] {
                margin: -1em;
            }


            [data-fs-block~="flex-30"] > * {
                flex-basis: calc(30% - 6em);
            }

            [data-fs-block~="flex-50"] > * {
                flex-basis: calc(50% - 4em);
            }

            [data-fs-block~="min-15"] > * {
                min-width: 15em;
            }
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

    ...

    <!--<![endif]-->
```

The objective here is to make things cleaner, more legible and more responsive.

* `body` - here we set a sans-serif font, bump the line height, give it some space and a max-w9dth to prevent super-long lines of text on wider screens.
* `img` - prevent images form breaking out of the viewport, plus a really old IE thing to stop them looking terrible.
* `[hidden]` - older browsers don't support this, with this they do.
* `main` - for older, non-supporting browsers where it would default to `inline`. I should probably add the other newer elements, but so far I haven't needed to.
* `hr` - I use these a lot because they make good visual separators in Failed/No CSS scenarios, so make them look tidier.
* `fieldset` - tidy the border for these.
* `pre` - make these behave better by default.
* `button,input ... ` make these sit more nicely alongside each other.

The YouTube embed thing is for common responsive video scenarios. I'm not sure I use it much myself so I may ditch this.

This TFS makes things look much better in Failed CSS scenarios. As discussed we can't do much about No CSS scenarios - or can we?

User Agent 'Tricks'
------------------

[Examples](https://fall-back.github.io/test/tfs-not-allowed.html)

Using `<fieldset>` around things can go a long way to help break up content, especially on a long page. We can add `role="presentation"` to avoid any accessibility (a11y) issues (though I've never encountered any issues if it's absent).
This gives us:

1.
```
<fieldset role="presentation">...</fieldset>`
```
---


Sometimes you want some things to appear side-by-side. You can only do this if you use a table, and they don't snap into a single column. But, if you know you're only displaying a small amount of text, it does work. Here I've added more attributes to tidy it all up:

```
<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
    <tbody>
        <tr valign="top">
            <td>
                Left content
            </td>
            <td align="right">
                Right content
            </td>
        </tr>
    </tbody>
</table>
```

This actually works fine, even on very small screens and has support back to the dark ages.
**But I'm not supposed to use it**.
Seems a shame doesn't it?

There are more examples to add here, but the point is I'm wrestling with ignoring the Spec, the deprecations, the 'MUST NOT's - I'm using these things wisely and sparingly and making sure the semantics are conveyed properly using aria so I'm not sure what the harm is. It's SO very tempting.

But
---

If I'm not allowed to use these, what's the alternative? Well, I've already established No CSS scenarios as being very unlikely, so that leaves the Failed CSS scenarios and the TFS. If I choose to expand this a little (boo - I wanted them to be as small as possible), I can add some attributes and such to do similar things. I'm thinking of using `tfs-*` attributes (I know - already invalid but loads of things use custom attributes like this, and it save's on bytes).

So I might have:

```
[tfs-text~="left"] {text-align: left;} /* Maybe not because it's the default? */
[tfs-text~="right"] {text-align: right;}
[tfs-text~="center"] {text-align: center;}
[tfs-text~="larger"] {font-size: larger;}

[tfs-block~="border"] {border: 1px solid;}
[tfs-block~="padding"] {padding: 1em;}
[tfs-block~="table"] {display: table; width: 100%; border-collapse: collapse; table-layout: fixed;}
[tfs-block~="cell"] {display: table-cell;}

```

And so on. I need to try this out, but you can already see the TFS has grown a bit, and the HTML won't be much leaner in most cases. Also even though the `table` display has old support, it's not as old as using an actual table. Also, the main (only?) argument against things like `align="right"` is that they're "presentational only" attributes etc. Whilst I get this (I really do - I'm an advocate of semantic HTML and accessibility), is having `tfs-text="right"` (or `data-tfs-text="right"` to be valid) really any different?

So arguably this approach costs more for less support?

Honestly, I'm torn.
