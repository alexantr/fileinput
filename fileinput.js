;(function ($) {
    'use strict';

    $.fn.fileinput = function (o) {

        o = $.extend({
            title: 'Browse...',
            multipleText: '{0} files',
            showMultipleNames: false,
            buttonClass: 'btn btn-default',
            selectedClass: 'file-selected',
            clearButton: '<button type="button" class="fileinput-clear close">&times;</button>',
            complete: function () {}
        }, o || {});

        this.each(function (i, elem) {

            var $input = $(elem), options = $.extend(true, o, dataToOptions($input));

            if (typeof $input.attr('data-fileinput-disabled') !== 'undefined') {
                return;
            }

            // set title option from title attribute
            var title = options.title;
            if (!!$input.attr('title')) {
                title = $input.attr('title');
            }

            // set buttonClass option from class attribute
            var buttonClass = options.buttonClass;
            if (!!$input.attr('class')) {
                buttonClass = $input.attr('class');
            }

            $input.wrap('<span class="' + $.trim('fileinput ' + buttonClass) + '"></span>');
            $input.closest('.fileinput').prepend($('<span></span>').html(title));
            $input.closest('.fileinput').wrap($('<span class="fileinput-wrapper"></span>'));

            if (typeof options.complete === 'function') {
                options.complete.call(this);
            }

        }).promise().done(function () {

            // change
            $(document).on('change', '.fileinput input[type=file]', function () {

                var $input = $(this),
                    $wrapper = $input.closest('.fileinput-wrapper'),
                    fileName = $input.val(),
                    options = $.extend(true, o, dataToOptions($input));

                // Remove any previous file names
                $wrapper.removeClass(options.selectedClass).find('.fileinput-name').remove();
                if (!!$input.prop('files') && $input.prop('files').length > 1) {
                    if (options.showMultipleNames) {
                        var names = [];
                        for (var i = 0, numFiles = $input[0].files.length; i < numFiles; i++) {
                            names.push($input[0].files[i].name);
                        }
                        fileName = names.join(', ');
                    } else {
                        fileName = options.multipleText.replace('{0}', $input[0].files.length);
                    }
                } else {
                    fileName = fileName.substring(fileName.lastIndexOf('\\') + 1, fileName.length);
                }

                // Don't try to show the name if there is none
                if (!fileName) {
                    return;
                }

                // Print the fileName aside (right after the the button)
                $wrapper.addClass(options.selectedClass)
                    .append('<span class="fileinput-name">' + fileName + options.clearButton + '</span>');
            });

            // clear
            $(document).on('click', '.fileinput-clear', function (e) {
                e.preventDefault();

                var $wrapper = $(this).closest('.fileinput-wrapper'),
                    $input = $wrapper.find('input[type=file]'),
                    options = $.extend(true, o, dataToOptions($input));

                // clear input by cloning them
                $input.replaceWith($input.val('').clone(true));

                $wrapper.find('.fileinput-name').remove();
                $wrapper.find('input').trigger('change').trigger('input');
                $wrapper.removeClass(options.selectedClass);
            });
        });

        // Camelize data-attributes
        function dataToOptions(elem) {
            function upper(m, l) {
                return l.toUpper();
            }

            var options = {};
            var data = elem.data();
            for (var key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }
                var value = data[key];
                if (value === 'yes' || value === 'y') {
                    value = true;
                }
                else if (value === 'no' || value === 'n') {
                    value = false;
                }
                options[key.replace(/-(\w)/g, upper)] = value;
            }
            return options;
        }
    };

})(jQuery);
