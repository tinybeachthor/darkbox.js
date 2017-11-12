'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals (root is window)
		window.darkbox = factory(window.jQuery);
	}
})(undefined, function ($) {

	//////////////////////////////////
	//DARKBOX BUILDER OBJECT

	function DarkboxBuilder() {
		this.init();
	}

	DarkboxBuilder.prototype.init = function () {
		var _this = this;

		$(document).ready(function () {
			_this.build();
		});
	};
	DarkboxBuilder.prototype.build = function () {
		//add elements to DOM
		var elems = '<div id="darkboxOverlay">\n\t\t</div>\n\t\t\n\t\t<div id="darkbox">\n\t\t</div>\n\t\t<div id="darkbox-left">\n\t\t\t<img src="./assets/darkbox/left.svg" alt=""/>\n\t\t</div>\n\t\t<div id="darkbox-right">\n\t\t\t<img src="./assets/darkbox/right.svg" alt=""/>\n\t\t</div>\n\t\t<div id="darkbox-cancel">\n\t\t\t<img src="./assets/darkbox/close.svg" alt=""/>\n\t\t</div>\n\t\t<div id="darkbox-title">\n\t\t\t<h1 id="darkboxTitleText"></h1>\n\t\t</div>';

		$(elems).appendTo($('body'));
	};

	DarkboxBuilder.prototype.start = function ($elem, options) {
		return new Darkbox($elem, options);
	};

	//////////////////////////////////
	//DARKBOX INSTANCE OBJECT

	function Darkbox($elem, options) {
		//set options
		this.options = $.extend({}, this.constructor.defaults);
		this.setOptions(options);

		// Cache jQuery objects
		this.$overlay = $('#darkboxOverlay');
		this.$darkbox = $('#darkbox');

		this.$darkboxLeft = $('#darkbox-left');
		this.$darkboxRight = $('#darkbox-right');
		this.$darkboxCancel = $('#darkbox-cancel');
		this.$darkboxTitle = $('#darkbox-title');

		this.$darkboxTitleText = $('#darkboxTitleText');

		this.$clonnedNode = null;

		//resolve images, add current to first if needed
		if (this.options.startWithCurrent) {
			var current = $elem.attr('src');

			if (!Array.isArray(this.options.images)) {
				this.options.images = [];
			}
			if (this.options.images.length == 0 || current !== this.options.images[0]) {
				this.options.images.unshift(current);
			}
		}

		this.currentImageIndex = 0;

		//start on element
		if (this.options.images.length > 0) this.start($elem);
	}

	Darkbox.defaults = {
		images: [],

		disablePageScrolling: true,
		startWithCurrent: true,
		wrapAround: false,

		endCallback: null
	};

	Darkbox.prototype.setOptions = function (options) {
		$.extend(this.options, options);
	};

	Darkbox.prototype.start = function ($link) {
		var _this2 = this;

		// Disable scrolling of the page while open
		if (this.options.disablePageScrolling) {
			$('body').addClass('db-disable-scrolling');
		}

		//clear darkbox
		this.$darkbox.empty();

		//clone element to darkbox and set the same position as the original
		var node = $link.clone(false);

		$(node).attr('src', this.options.images[0]);

		$(node).css('position', 'absolute');

		$(node).css('width', $link.width() + 'px');
		$(node).css('height', $link.height() + 'px');

		var offset = $link.parent().offset();
		$(node).css('left', offset.left + 'px');
		$(node).css('top', offset.top + 'px');

		$(node).appendTo(this.$darkbox);
		this.$clonnedNode = node;

		//show darkbox
		this.$darkbox.show();
		this.$overlay.addClass('show');
		this.$overlay.addClass('fill');

		this.$darkboxLeft.show();
		this.$darkboxRight.show();
		this.$darkboxCancel.show();
		this.$darkboxTitle.show();

		$(this.$darkboxTitleText).text('Image ' + (this.currentImageIndex + 1) + ' of ' + this.options.images.length);

		setTimeout(function () {
			_this2.$darkboxLeft.addClass('show');
			_this2.$darkboxRight.addClass('show');
			_this2.$darkboxCancel.addClass('show');
			_this2.$darkboxTitle.addClass('show');
		}, 400);

		//transition to center position
		$(this.$clonnedNode).addClass('straight');
		$(this.$clonnedNode).animate({
			left: ($(window).width() - $link.width()) / 2,
			top: ($(window).height() - $link.height()) / 2
		}, 400, "swing", function () {
			$(_this2.$clonnedNode).addClass('scale');

			//display animation finished

			//enable keyboard hook
			_this2.enableKeyboardNav();

			//enable nav events
			$(_this2.$darkboxLeft).on('click', function () {
				_this2.previousImage();
			});
			$(_this2.$darkboxRight).on('click', function () {
				_this2.nextImage();
			});

			$(_this2.$darkboxCancel).on('click', function () {
				_this2.end();
			});
		});
	};

	Darkbox.prototype.previousImage = function () {
		if (this.currentImageIndex !== 0) {
			this.changeImage(this.currentImageIndex - 1);
		} else if (this.options.wrapAround && this.options.images.length > 1) {
			this.changeImage(this.options.images.length - 1);
		}
	};
	Darkbox.prototype.nextImage = function () {
		if (this.currentImageIndex !== this.options.images.length - 1) {
			this.changeImage(this.currentImageIndex + 1);
		} else if (this.options.wrapAround && this.options.images.length > 1) {
			this.changeImage(0);
		}
	};
	Darkbox.prototype.changeImage = function (index) {
		this.currentImageIndex = index;

		$(this.$darkboxTitleText).text('Image ' + (index + 1) + ' of ' + this.options.images.length);

		$(this.$clonnedNode).attr('src', this.options.images[index]);
	};

	Darkbox.prototype.enableKeyboardNav = function () {
		$(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
	};
	Darkbox.prototype.disableKeyboardNav = function () {
		$(document).off('.keyboard');
	};
	Darkbox.prototype.keyboardAction = function (event) {
		var KEYCODE_ESC = 27;
		var KEYCODE_LEFTARROW = 37;
		var KEYCODE_RIGHTARROW = 39;

		var keycode = event.keyCode;
		var key = String.fromCharCode(keycode).toLowerCase();
		if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
			this.end();
		} else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
			this.previousImage();
		} else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
			this.nextImage();
		}
	};

	Darkbox.prototype.end = function () {
		var _this3 = this;

		//disable keyboard hook
		this.disableKeyboardNav();

		//disable nav events
		$(this.$darkboxLeft).off('click');
		$(this.$darkboxRight).off('click');
		$(this.$darkboxCancel).off('click');

		//hide darkbox
		this.$darkboxLeft.removeClass('show');
		this.$darkboxRight.removeClass('show');
		this.$darkboxCancel.removeClass('show');
		this.$darkboxTitle.removeClass('show');

		$(this.$clonnedNode).animate({
			opacity: 0.0
		}, 300, "swing", function () {
			_this3.$darkbox.hide();

			_this3.$darkboxLeft.hide();
			_this3.$darkboxRight.hide();

			_this3.$darkboxCancel.hide();

			_this3.$darkboxTitle.hide();
		});

		this.$overlay.removeClass('fill');
		setTimeout(function () {
			_this3.$overlay.removeClass('show');

			//hide animation finished

			$('body').removeClass('db-disable-scrolling');
		}, 600);

		//trigger endCallback
		var endCallback = this.options.endCallback;
		if (endCallback && endCallback != null && typeof endCallback === 'function') {
			setTimeout(function () {
				_this3.options.endCallback();
			}, 200);
		}
	};

	return new DarkboxBuilder();
});