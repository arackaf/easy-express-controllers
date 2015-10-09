'use strict';

describe('express controllers works in a browser', function () {
        this.timeout(50000);

        it('should have loaded jQuery', function () {

                var container = document.createElement("div");
                container.innerHTML = 'HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD ' + typeof $ + ' ' + typeof expect;

                document.body.appendChild(container);

                assert.equal(typeof $, 'function');

                //if (typeof jQuery !== 'function') throw 'Not function - ' + (typeof jQuery);
        });
});