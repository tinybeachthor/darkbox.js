# darkbox.js

An updated, minimal version of the [lighbox2](http://lokeshdhakar.com/projects/lightbox2/) script.

Darkbox is a minimalistic, dynamic, content-first javascript library used to overlay images on top of the current page. It's a snap to setup and works on all modern browsers.

## Usage

1. Copy files from [/dist](https://github.com/WhoMeNope/darkbox.js/tree/master/dist) to your project.

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

  $('#gallery').click(function() 
  {
    darkbox.start( 
      $('#gallery'), 
      {
        images: [
          "./assets/image.jpg",
          "./assets/image2.jpg",
        ]
      }
    );
  });

});
```

## Examples 

See the [/example](https://github.com/WhoMeNope/darkbox.js/tree/master/example) folder.

## License

Darkbox is licensed under the MIT License.

##

by [WhoMeNope](https://github.com/WhoMeNope)
