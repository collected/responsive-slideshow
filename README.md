Responsive Slideshow
====================

This is a responsive slideshow jQuery plugin. There are a of slideshows out there, but we wanted a lot of features like touch-support, responsive resizing, and CSS3 transitions among other things. So we wrote one.

Features:
---------
<ul>
	<li>
		Resizes itself when the window width is changed using jQuery <a href="http://benalman.com/code/projects/jquery-throttle-debounce/docs/files/jquery-ba-throttle-debounce-js.html">debouce</a> to avoid firing too many events.
	</li>
	<li>
		Uses Modernizr to detect CSS3 support so transitions are smooth and hardware accelerated on supporting devices. Falls back to jQuery's animate otherwise.
	</li>
	<li>
		Tested in IE8+ and other modern browsers.Looks like hell in IE7 and below. If you care, fork it and fix it.
	</li>
	<li>
		Touch support on iOS and Android (though not tested on everything). Doesn't prevent vertical scrolling!
	</li>
	<li>
		Keyboard support.
	</li>
	<li>
		Pauses on hover.
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
The plugin is used on <a href="http://www.econsys.com" target="_blank">econsys.com</a>