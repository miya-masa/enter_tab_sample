/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function($, window) {
    'use strict';
    var App = function($, rootElement) {
        this.$ = $;
        this.targetInputs = $(rootElement).find('input[tabindex]');
        var maxTabIndex = 0;
        this.targetInputs.each(function() {
            var index = parseInt($(this).attr('tabindex'));
            if (maxTabIndex < index) {
                maxTabIndex = index;
            }
        });
        this.maxTabIndex = maxTabIndex;
    };
    App.prototype = {
        'isFocusable': function($input) {
            return $input.is(":visible") &&
                $input.is(":enabled") &&
                $input.css("visibility") !== "hidden" &&
                $input.attr("type") != "hidden" && // for IE bug ?
                $input.attr("tabindex") !== "-1" &&
                !$input.prop("readonly");
        },
        'findNextInput': function(current) {
            if (typeof current === 'undefined') {
                return;
            }
            var nextInputName = $(current).attr('next-input-name');
            var nextInput = $('#next-input').find("input[name='" + nextInputName + "']");
            if (typeof nextInput === 'undefined' || nextInput.length == 0) {
                return;
            } else if (this.isFocusable(nextInput)) {
                return nextInput;
            } else {
                return this.findNextInput(nextInput);
            }
        },
        'findeNextInputTabIndexFrom': function(input, shift) {
            var index = $(input).attr('next-tabindex');

            if (typeof index !== 'undefined' && !shift) {
                return $('#tabindex').find("input[tabindex='" + index + "']");
            }
            index = $(input).attr('tabindex');
            return this.findNextInputTabIndex(index, shift);
        },
        'findNextInputTabIndex': function(currentIndexNum, shift) {
            if (typeof currentIndexNum === 'undefined') {
                return;
            }
            var nextNum = shift ? parseInt(currentIndexNum) - 1 : parseInt(currentIndexNum) + 1;
            if (nextNum < 1) {
                nextNum = this.maxTabIndex;
            }
            var nextInput = $('#tabindex').find("input[tabindex='" + nextNum + "']");
            if (this.isFocusable(nextInput)) {
                return nextInput;
            } else {
                return this.findNextInputTabIndex(nextNum, shift);
            }
        }
    }

    $(function() {
        $('#next-input input').keydown(function(e) {
            console.log(e.keyCode);
            var elements = this;
            var c = e.which ? e.which : e.keyCode;
            if (c == 13) {
                var app = new App($, $('#tabindex'));
                var nextInput = app.findNextInput(elements);
                if (typeof nextInput === 'undefined') {
                    return;
                }
                nextInput.focus();
                e.preventDefault();;
            };
        });
        $('#tabindex input').keydown(function(e) {
            console.log(e.keyCode);
            var elements = this;
            var c = e.which ? e.which : e.keyCode;
            if (c == 13 || c == 9) {
                var app = new App($, $('#tabindex'));
                var nextInput = app.findeNextInputTabIndexFrom(elements, e.shiftKey);
                if (typeof nextInput === 'undefined') {
                    return;
                }
                nextInput.focus();
                e.preventDefault();;
            };
        });
    });
    window.App = App;
})(jQuery, window);
