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
    var app = {
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
        'findeNextInputTabIndexFrom': function(input) {
            var index = $(input).attr('next-tabindex');

            if (typeof index !== 'undefined') {
                return $('#tabindex').find("input[tabindex='" + index + "']");
            }
            index = $(input).attr('tabindex');
            return this.findNextInputTabIndex(index);
        },
        'findNextInputTabIndex': function(currentIndexNum) {
            if (typeof currentIndexNum === 'undefined') {
                return;
            }
            var nextNum = parseInt(currentIndexNum) + 1;
            var nextInput = $('#tabindex').find("input[tabindex='" + nextNum + "']");
            if (this.isFocusable(nextInput)) {
                return nextInput;
            } else {
                return this.findNextInputTabIndex(nextNum);
            }
        }
    };

    $(function() {
        $('#next-input input').keydown(function(e) {
            console.log(e.keyCode);
            var elements = this;
            var c = e.which ? e.which : e.keyCode;
            if (c == 13) {
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
                var nextInput = app.findeNextInputTabIndexFrom(elements);
                if (typeof nextInput === 'undefined') {
                    return;
                }
                nextInput.focus();
                e.preventDefault();;
            };
        });
    });
    window.app = app;
})(jQuery, window);
