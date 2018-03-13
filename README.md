# jQuery File Input

Simple jQuery plugin for styling HTML file inputs.

## Installation

Install with [npm](https://www.npmjs.com/):

```
npm i --save jquery-fileinput
```

Install with [bower](https://bower.io/):

```
bower install fileinput
```

## Usage

HTML:

```html
<script src="path/to/jquery/jquery.min.js"></script>
<script src="path/to/fileinput/fileinput.min.js"></script>
```

```html
<input type="file" name="file">
```

JavaScript:

```js
$('input[type="file"]').fileinput();
```

Including all options:

```js
$('input[type="file"]').fileinput({
    title: 'Browse...',
    multipleText: '{0} files', // for multiple selection. {0} will be replaced with number of seleted files
    showMultipleNames: false, // if true, show filenames comma separated instead text from multipleText
    buttonClass: 'btn btn-default',
    selectedClass: 'file-selected',
    clearButton: '<button type="button" class="fileinput-clear close">&times;</button>',
    complete: function() {
        // $(this) is input[type="file"]
    }
});
```

Almost all options can be redefined by data-attributes:

- `data-title`
- `data-multiple-text`
- `data-show-multiple-names`
- `data-button-class`
- `data-selected-class`

Also button title and class can be set from `title` and `class` attributes:

```html
<input type="file" title="Обзор..." class="btn btn-danger">
```

If you want to disable styling some inputs you can add attribute `data-fileinput-disabled` to them.

## Styling

Included CSS-styles work great with Bootstrap 3.

Just append `fileinput.css`:

```html
<link rel="stylesheet" href="path/to/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="path/to/fileinput/fileinput.css">
```

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
<span class="fileinput-wrapper file-selected">
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
