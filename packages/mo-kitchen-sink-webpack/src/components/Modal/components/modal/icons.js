/* eslint-disable */
(function(window) {
    var svgSprite =
        '<svg><symbol id="icon-check-circle-fill" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m193.5 301.7l-210.6 292c-12.7 17.7-39 17.7-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"  ></path></symbol><symbol id="icon-close-circle-fill" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m165.4 618.2l-66-0.3L512 563.4l-99.3 118.4-66.1 0.3c-4.4 0-8-3.5-8-8 0-1.9 0.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1 0.3L512 464.6l99.3-118.4 66-0.3c4.4 0 8 3.5 8 8 0 1.9-0.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"  ></path></symbol></svg>';
    var script = (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();
    var shouldInjectCss = script.getAttribute('data-injectcss');
    var ready = function(fn) {
        if (document.addEventListener) {
            if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
                setTimeout(fn, 0);
            } else {
                var loadFn = function() {
                    document.removeEventListener('DOMContentLoaded', loadFn, false);
                    fn();
                };
                document.addEventListener('DOMContentLoaded', loadFn, false);
            }
        } else if (document.attachEvent) {
            IEContentLoaded(window, fn);
        }
        function IEContentLoaded(w, fn) {
            var d = w.document,
                done = false,
                init = function() {
                    if (!done) {
                        done = true;
                        fn();
                    }
                };
            var polling = function() {
                try {
                    d.documentElement.doScroll('left');
                } catch (e) {
                    setTimeout(polling, 50);
                    return;
                }
                init();
            };
            polling();
            d.onreadystatechange = function() {
                if (d.readyState == 'complete') {
                    d.onreadystatechange = null;
                    init();
                }
            };
        }
    };
    var before = function(el, target) {
        target.parentNode.insertBefore(el, target);
    };
    var prepend = function(el, target) {
        if (target.firstChild) {
            before(el, target.firstChild);
        } else {
            target.appendChild(el);
        }
    };
    function appendSvg() {
        var div, svg;
        div = document.createElement('div');
        div.innerHTML = svgSprite;
        svgSprite = null;
        svg = div.getElementsByTagName('svg')[0];
        if (svg) {
            svg.setAttribute('aria-hidden', 'true');
            svg.style.position = 'absolute';
            svg.style.width = 0;
            svg.style.height = 0;
            svg.style.overflow = 'hidden';
            prepend(svg, document.body);
        }
    }
    if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
        window.__iconfont__svg__cssinject__ = true;
        try {
            document.write(
                '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
            );
        } catch (e) {
            console && console.log(e);
        }
    }
    ready(appendSvg);
})(window);
/* eslint-enable */