Tiny FallBAck Styles (TFS)
==========================

Ok, so there are situtations where your stylesheets won't load:

Failed CSS
----------

1. If the connection/request fails they won't arrive
2. If the browser is being 'cut' by a {Mustard Cut](https://github.com/Fall-Back/CSS-Mustard-Cut)
3. If you've implemented some sort of 'Lite' version of you app to let users choose not to load them

No CSS
------

5. If someone is using a text-only browser
6. If someone has disabled stylesheets

Now these last two I don't have data on - I don't know if people still use text-only browsers; and I don't know if anyone browsers the web with styles deliberatly disabled (expect perhaps Web Developers (myself included) with [a point to prove](https://css-tricks.com/that-time-i-tried-browsing-the-web-without-css/).
I'm not even sure it's possible to disable CSS in any mobile browser?
Number 3 is something I'm seriously considereding and I need to do more research on.

Right, so if the stylesheets haven't loaded you're normally left with a fairly ugly column of raw HTML - even with the cleanest, most well-organised markup. User Agent Stylesheets provide some critical styles like margins, font sizes and weights and display properties, [for example](http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css).

I've thought quite a lot about this, and I'd love to be able to leverage this stylesheet more in creating a more useable FallBack experience. By using deprecated attributes and inappropriate tags we can create something that works a little better, BUT, that's against the spec.

I'll come back to that later.

The TFS is designed to be as small as possible and live in the `<head>` of a page. So yes, it gets downloaded with each request, but it's Tiny, and it's water tight against Failed CSS situations.
Currently it's this:

```
    <style>
        /* Tiny Fall-Back Styles (https://github.com/Fall-Back/Patterns/edit/master/Page/README.md) */
        body{font-family:sans-serif;line-height:1.2;padding:1em;margin:0 auto;max-width:50em;}
        img{max-width:100%;-ms-interpolation-mode:bicubic;}
        [hidden]{display:none;}
        main{display:block;}
        hr{border-top:1px solid;border-bottom:0 none;height:0px;}
        fieldset{border:1px solid;}
        pre{overflow-x:scroll;overflow-y:auto;}
        button,input,select,textarea{vertical-align:middle;}

        /* For YouTube via http://embedresponsively.com. May or may not be needed. */
        .embed-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;} .embed-container iframe, .embed-container object, .embed-container embed{position:absolute;top 0;left:0;width:100%;height:100%;}
    </style>
```

The objective here is to make things cleaner, more legible and more responsive.

* `body` - here we set a sans-serif font, bump the line height, give it some space and a max-w9dth to prevent super-long lines of text on wider screens.
* `img` - prevent images form breaking out of the viewport, plus a really onld IE thing to stop them looking terrible.
* `[hidden]` - older browsers don't supoort this, with this they do.
* `main` - for older, non-supporting browsers where it would default to `inline`. I should probably add the other newer elements, but so far I havn't needed to.
* `hr` - I use these a lot because they make good visual separators in Failed/No CSS scenarios, so make them look tidier.
* `fieldset` - tidy the border for these.
* `pre` - make these behave better by default.
* `button,input ... ` make these sit more nicely alongside each other.

The YouTube embed thing is for common respsonsive video scenarios. I'm not sure I use it much myself so I may ditch this.

This TFS makes things look much better in Failed CSS scenarios. As discussed we can't do much about No CSS scenarios - or can we?

User Agent 'Tricks'
------------------

Using `<fieldset>` around things can go a long way to help break up content, especially on a long page. we can add `role="presentation"` to avoid any accessibility (a11y) issues (thogh I've never encounteded any without it.
