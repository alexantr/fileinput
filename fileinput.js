(function ($) {
    $.fn.fileinput = function (o) {

        o = $.extend({
            title: 'Browse...',
            buttonClass: 'btn btn-default',
            multipleText: '{0} files'
        }, o || {});

        this.each(function (i, elem) {

            var $elem = $(elem);

            if (typeof $elem.attr('data-fileinput-disabled') != 'undefined') {
                return;
            }

            var buttonWord = o.title;

            if (typeof $elem.attr('title') != 'undefined') {
                buttonWord = $elem.attr('title');
            }

            var className = o.buttonClass;
            if (!!$elem.attr('class')) {
                className = $elem.attr('class');
            }

            $elem.wrap('<span class="fileinput ' + className + '"></span>');
            $elem.closest('.fileinput').prepend($('<span></span>').html(buttonWord));
            $elem.closest('.fileinput').wrap($('<span class="fileinput-wrapper"></span>'));

        }).promise().done(function () {

            var $body = $('body');

            // change
            $body.on('change', '.fileinput input[type=file]', function () {

                var fileName = $(this).val();

                // Remove any previous file names
                $(this).closest('.fileinput-wrapper').find('.fileinput-name').remove();
                if (!!$(this).prop('files') && $(this).prop('files').length > 1) {
                    fileName = o.multipleText.replace('{0}', $(this)[0].files.length);
                } else {
                    fileName = fileName.substring(fileName.lastIndexOf('\\') + 1, fileName.length);
                }

                // Don't try to show the name if there is none
                if (!fileName) {
                    return;
                }

                // Print the fileName aside (right after the the button)
                $(this).closest('.fileinput-wrapper').append('<span class="fileinput-name">' + fileName + '<button type="button" class="fileinput-clear close">&times;</button></span>');
            });

            // clear
            $body.on('click', '.fileinput-clear', function (e) {
                e.preventDefault();
                var wrapper = $(this).closest('.fileinput-wrapper').find('.fileinput');
                var input = wrapper.find('input');
                input.replaceWith(input.val('').clone(true));
                $(this).closest('.fileinput-name').remove();
            });

        });
    };
})(jQuery);
