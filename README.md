Responsive Slideshow
====================

This is a responsive slideshow jQuery plugin. There are a lot of slideshow plugins out there. But I wanted somthing simple that had features like touch-support, responsive resizing, and CSS3 transitions among other things.

Features:
---------
<ul>
	<li>
		Resizes all slides when the window width is changed using jQuery <a href="http://benalman.com/code/projects/jquery-throttle-debounce/docs/files/jquery-ba-throttle-debounce-js.html" target-"_blank">debouce</a> to avoid firing too many events.
	</li>
	<li>
		Touch support on iOS and Android (though not tested on everything). Best of all, it doesn't prevent scrolling on touch devices, which is very obnoxious.
	</li>
	<li>
		Uses Modernizr to detect CSS3 support so transitions are smooth and hardware accelerated on supporting devices. Falls back to jQuery's animate otherwise.
	</li>
	<li>
		Keyboard support.
	</li>
	<li>
		Pauses on hover.
	</li>
	<li>
		Tested in IE8+ and other modern browsers. Looks like hell in IE7 and below. If you care, fork it and fix it.
	</li>
</ul>


Usage
-----
The plugin expects the following structure:

```html
	<div id="a-slideshow">
		<div class="slideshow slideshow-keys">
			<div class="inner-container" >
				<div class="slide" data-attribute-slide="0">
					Slide 1
				</div>
				<div class="slide" data-attribute-slide="1">
					Slide 2
				</div>
				<div class="slide" data-attribute-slide="2">
					Slide 3
				</div>
			</div>
		</div>
		<div>
	        <ul class="slideshow-dot-nav">
	          <li>
	        	<a href="#slideshow" data-slide-link="0" class="active" title="Slide 1">Slide 1</a>
	          </li>
	          <li>
	        	<a href="#slideshow" data-slide-link="1" title="Slide 2">Slide 2</a>
	          </li>
	          <li>
	        	<a href="#slideshow" data-slide-link="2" title="Slide 3">Slide 3</a>
	          </li>
	        </ul>
	    </div>
	</div>
```

Then, aftering requiring the scripts, initialize the plugin on your root slideshow element:

```javascript
	<script>
		$(document).ready(function(){
			$('#a-slideshow').slideshow();
		});
	</script>
```


Live Demo
---------
We extracted this from the slideshow we use on <a href="http://www.econsys.com" target="_blank">www.econsys.com</a>. As we improve it, I'll update it here. 