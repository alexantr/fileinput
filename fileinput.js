;(function ($) {
    'use strict';

    $.fn.fileinput = function (o) {

        o = $.extend({
            title: 'Browse...',
            multipleText: '{0} files',
            buttonClass: 'btn btn-default',
            selectedClass: 'file-selected',
            clearButton: '<button type="button" class="fileinput-clear close">&times;</button>',
            complete: function () {}
        }, o || {});

        this.each(function (i, elem) {

            var $input = $(elem);

            if (typeof $input.attr('data-fileinput-disabled') !== 'undefined') {
                return;
            }

            // set title
            var title = o.title;
            if (!!$input.attr('data-title')) {
                title = $input.attr('data-title');
            } else if (!!$input.attr('title')) {
                title = $input.attr('title');
            }

            // set buttonClass
            var buttonClass = o.buttonClass;
            if (!!$input.attr('data-button-class')) {
                buttonClass = $input.attr('data-button-class');
            } else if (!!$input.attr('class')) {
                buttonClass = $input.attr('class');
            }

            $input.wrap('<span class="' + $.trim('fileinput ' + buttonClass) + '"></span>');
            $input.closest('.fileinput').prepend($('<span></span>').html(title));
            $input.closest('.fileinput').wrap($('<span class="fileinput-wrapper"></span>'));

            if (typeof o.complete === 'function') {
                o.complete.call(this);
            }

        }).promise().done(function () {

            var $body = $('body');

            // change
            $body.on('change', '.fileinput input[type=file]', function () {

                var $input = $(this),
                    $wrapper = $input.closest('.fileinput-wrapper'),
                    fileName = $input.val(),
                    multipleText = o.multipleText,
                    selectedClass = o.selectedClass;

                // set multipleText
                if (!!$input.attr('data-multiple-text')) {
                    multipleText = $input.attr('data-multiple-text');
                }

                // set selectedClass
                if (!!$input.attr('data-selected-class')) {
                    selectedClass = $input.attr('data-selected-class');
                }

                // Remove any previous file names
                $wrapper.removeClass(selectedClass).find('.fileinput-name').remove();
                if (!!$input.prop('files') && $input.prop('files').length > 1) {
                    fileName = multipleText.replace('{0}', $input[0].files.length);
                } else {
                    fileName = fileName.substring(fileName.lastIndexOf('\\') + 1, fileName.length);
                }

                // Don't try to show the name if there is none
                if (!fileName) {
                    return;
                }

                // Print the fileName aside (right after the the button)
                $wrapper.addClass(selectedClass)
                    .append('<span class="fileinput-name">' + fileName + o.clearButton + '</span>');
            });

            // clear
            $body.on('click', '.fileinput-clear', function (e) {
                e.preventDefault();
                var $wrapper = $(this).closest('.fileinput-wrapper'),
                    $input = $wrapper.find('input[type=file]'),
                    selectedClass = o.selectedClass;

                // set selectedClass
                if (!!$input.attr('data-selected-class')) {
                    selectedClass = $input.attr('data-selected-class');
                }

                // clear input by cloning them
                $input.replaceWith($input.val('').clone(true));

                $wrapper.find('.fileinput-name').remove();
                $wrapper.find('input').trigger('change');
                $wrapper.removeClass(selectedClass);
            });

        });
    };

})(jQuery);
