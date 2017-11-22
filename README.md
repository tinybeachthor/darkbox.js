# darkbox.js

Weights just ⚖**1.88kb Gzipped**

An updated, minimal version of the [lighbox2](http://lokeshdhakar.com/projects/lightbox2/) script.

Darkbox is a minimalistic, dynamic, content-first javascript library used to overlay images on top of the current page. It's a snap to setup and works on all modern browsers.

## Usage

1. Copy files from [/dist](https://github.com/WhoMeNope/darkbox.js/tree/master/dist) to your project

2. Include darkbox in your website

```html
<link rel="stylesheet" type="text/css" href="./css/darkbox.css" />

<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script type="text/javascript" src="./js/darkbox.js"></script>
```

3. Create an image inside your positioned container with 100% width

```html
<div>
  <img id="gallery" src="./assets/image.jpg" alt="" />
</div>
```

```css
img {
  width: 100%;
  height: auto;
}
```

4. Start the gallery on image click with your custom set of images

```javascript
$(document).ready(function () {

  $('#gallery').click(function() {
    $(this).darkbox([
      "./assets/image.jpg",
      "./assets/image2.jpg",
    ]);
  });

});
```

## Options

These are the available options with their respective default values:

```javascript
options = {
  startWithCurrent:     true,   // add/move the image on which this was started to the first position in image array
  wrapAround:           false,  // after clicking next on the last picture wrap to the first

  showProgressBar:      true,   // show progressbar on the top of images
  showTitle:            false,  // show text with the current image number and the number of images

  disablePageScrolling: true,   // disable page scrolling while darkbox is opened

  endCallback:          null,   // function to be called on darkbox exit
};

$(this).darkbox(images, options);
```

## Examples 

See the [/example](https://github.com/WhoMeNope/darkbox.js/tree/master/example) folder.

## License

Darkbox is licensed under the MIT License.

##

by [WhoMeNope](https://github.com/WhoMeNope)
