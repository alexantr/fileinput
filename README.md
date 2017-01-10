# fileinput
Simple jQuery plugin for styling HTML file inputs.

## Usage

Example with all options:

```js
jQuery(function ($) {
    $('input[type="file"]').fileinput({
        title: 'Browse...',
        buttonClass: 'btn btn-default',
        multipleText: '{0} files' // for multiple selection. {0} will be replaced with number of seleted files
    });
});
```

Button title can be set from `title` attribute: `<input type="file" title="...">`.

Additional classes will be added from `class` attribute: `<input type="file" class="...">`.

If you want to disable styling some inputs you can add attribute `data-fileinput-disabled` to them.

## Styling

Included CSS-styles work great with Bootstrap 3.

Generated HTML-code:

```html
<span class="fileinput-wrapper">
    <span class="fileinput btn btn-default">
        <span>Browse...</span>
        <input type="file">
    </span>
</span>
```

When file selected:

```html
<span class="fileinput-wrapper">
    <span class="fileinput btn btn-default">
        <span>Browse...</span>
        <input type="file">
    </span>
    <span class="fileinput-name">
        file.zip
        <button type="button" class="fileinput-clear close">&times;</button>
    </span>
</span>
```
