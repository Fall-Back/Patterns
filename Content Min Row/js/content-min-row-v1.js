/*!
    Fall-Back Content Min-row v1.0.1
    https://github.com/Fall-Back/Patterns/tree/master/Content%20Min%20Row
    Copyright (c) 2021, Andy Kirk
    Released under the MIT license https://git.io/vwTVl
*/

// Remove polyfill:
(function() {
  function remove() { this.parentNode && this.parentNode.removeChild(this); }
  if (!Element.prototype.remove) Element.prototype.remove = remove;
  if (Text && !Text.prototype.remove) Text.prototype.remove = remove;
})();

(function() {

    //var debug                                = true;
    var debug                                = false;
    var ident                                = 'cmr';
    var selector                             = '[data-js="' + ident + '"]';
    var js_classname_prefix                  = 'js';
    var container_js_classname_wide_suffix   = 'wide';
    var container_js_classname_narrow_suffix = 'narrow';

    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    var set_style = function(element, style) {
        Object.keys(style).forEach(function(key) {
            var val = style[key];
            if (val.indexOf(' !important' ) !== -1) {
                val = val.replace(' !important', '');
                element.style.setProperty(key, val, 'important');
            } else {
                element.style.setProperty(key, val);
            }
        });
    }

    var $cmr = {

        cmrs: null,

        root_font_size: window.getComputedStyle(document.documentElement).getPropertyValue('font-size'),

        switcher: function(cmr) {

            // Check for browser font change and reset breakpoints if it has:
            if ($cmr.root_font_size != window.getComputedStyle(document.documentElement).getPropertyValue('font-size')) {
                $cmr.set_breakpoints($cmr.cmrs);
            }

            // Note using getAttribute('data-') instead of dataset so it doesn't fail on older
            // browsers and leave behind the clone.
            // May rethink this as I don't NEED to support older browsers witht this - I just don't
            // want it broken. Maybe I should quit out of this if dataset isn't supported, but it's
            // ok for now.
            var wide = cmr.offsetWidth > cmr.getAttribute('data-js-breakpoint');
            // Need to make these classnames dynamic
            if (wide) {
                cmr.classList.add(js_classname_prefix + '-' + ident + '--' + container_js_classname_wide_suffix);
                cmr.classList.remove(js_classname_prefix + '-' + ident + '--' + container_js_classname_narrow_suffix);

                if (debug) {
                    cmr.style.outline = '3px solid red';
                }
            } else {
                cmr.classList.add(js_classname_prefix + '-' + ident + '--' + container_js_classname_narrow_suffix);
                cmr.classList.remove(js_classname_prefix + '-' + ident + '--' + container_js_classname_wide_suffix);

                if (debug) {
                    cmr.style.outline = '3px solid blue';
                }
            }
        },

        set_breakpoints: function(cmrs) {

            Array.prototype.forEach.call(cmrs, function (cmr, i) {
                set_style(cmr, {'position': 'relative'});
                var clone = cmr.cloneNode(true);
                clone.classList.add(js_classname_prefix + '-' + ident + '--' + container_js_classname_wide_suffix);

                set_style(clone, {
                    'border': '0',
                    'left': '0',
                    'top': '0',
                    'width': 'max-content',
                    'flex-wrap': 'nowrap',
                    'justify-content': 'flex-start',
                    'max-width': 'none'
                });

                cmr.parentNode.appendChild(clone);

                var children   = clone.children;
                var n_children = children.length;
                var breakpoint = 0;

                // Set widths for flexible children:
                Array.prototype.forEach.call(children, function (child, i) {
                    console.log(child);
                    if (child.getAttribute('data-min-width')) {
                        var w = parseInt(child.getAttribute('data-min-width'));
                        console.log('w', w);
                        console.log(getComputedStyle(child));

                        var pLeft  = parseInt(getComputedStyle(child).paddingLeft);
                        var pRight = parseInt(getComputedStyle(child).paddingRight);
                        console.log(w, pLeft, pRight);
                        set_style(child, {
                            'width': (w + pLeft + pRight) + 'px !important',
                            'max-width': (w + pLeft + pRight) + 'px !important',
                            'min-width': (w + pLeft + pRight) + 'px !important'
                        })
                    }
                });

                // Handle IE separately:
                if (!!window.MSInputMethodContext && !!document.documentMode) {
                    Array.prototype.forEach.call(children, function (child, i) {
                        breakpoint += Math.ceil(child.offsetWidth);
                    });
                    cmr.setAttribute('data-js-breakpoint', breakpoint);
                } else {
                    cmr.setAttribute('data-js-breakpoint', clone.offsetWidth);
                }
                clone.remove();
            });
        },

        init: function() {

            if (debug) {
                console.log('Initialising ' + ident);
            }

            var self = this;

            // Get all the CMR's:
            $cmr.cmrs = document.querySelectorAll(selector);

            $cmr.set_breakpoints($cmr.cmrs);

            var check = window.ResizeObserver;

            if (check) {
                var ro = new ResizeObserver(function (entries) {
                    Array.prototype.forEach.call(entries, function (entry, i) {
                        $cmr.switcher(entry.target);
                    });
                });

                Array.prototype.forEach.call($cmr.cmrs, function (cmr, i) {
                    ro.observe(cmr);
                    $cmr.switcher(cmr);
                });
            } else {
                if (debug) {
                    console.log('No ResizeObserver support.');
                }

                // When applied to a flex container, IE reserves space even if position:absolute,
                // so using negative margin instead.
                var style = {
                    'position': 'relative',
                    'margin-top': '-100%',
                    'display': 'block',
                    'border': '0',
                    'left': '0',
                    'top': '0',
                    'width': '100%',
                    'height': '100%',
                    'pointerEvents': 'none',
                    'z-index': '-1'
                };

                // Note visibility: hidden prevents the resize event from occurring in FF.

                Array.prototype.forEach.call($cmr.cmrs, function (cmr, i) {
                    var detector = document.createElement('iframe');
                    set_style(detector, style);
                    detector.setAttribute('aria-hidden', 'true');

                    cmr.appendChild(detector);

                    detector.contentWindow.addEventListener('resize', function() {
                        $cmr.switcher(cmr);
                    });
                    $cmr.switcher(cmr);
                });
            }
            return;
        }
    }

    window.setTimeout(function(){ready($cmr.init)}, 50);
})();
