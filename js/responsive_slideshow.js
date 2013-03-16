(function( $ ){

    var methods = {
        init: function(options) {
          this.data('speed',4000);

          this.data('current_slide',0);
          this.data('slideshow',this.find('.slideshow'));
          this.data('inner_container',this.find('.inner-container'));
          this.data('slides',this.find('.slide'));
          this.data('dot-nav',this.find('.slideshow-dot-nav'));
          this.data('dots',this.find('.slideshow-dot-nav li a'));

          this.slideshow('detectFeatures');
          if(this.data('csstransforms3d') && this.data('csstransitions')){
            this.data('inner_container').css(this.data('transformPrefix'),'translate3d(0px,0px,0px)');
            this.data('goToSlide','goToSlide3d');
          }
          else if(this.data('csstransformsd') && this.data('csstransitions')){
            this.data('inner_container').css(this.data('transformPrefix'),'translate(0px,0px)');
            this.data('goToSlide','goToSlide2d');
          }
          else{
            this.data('goToSlide','goToSlideJs');
          }

          this.slideshow('setWidths');
          this.slideshow('bindWidthChangeOnWindowResize');
          this.slideshow('bindDotNav');

          this.slideshow('bindHoverPause');
          this.slideshow('startInterval');

          this.slideshow('bindFocus');
          this.slideshow('bindKeys');

          var self = this;
          if(this.data('touch')){
            this.data('inner_container').on('touchstart touchmove touchend', function(e) {
              self.slideshow('handleTouches',{e:e});
            });
          }


          this.data('slides').show();
          this.data('dot-nav').show();
         
        },


        setWidths:  function(){
          var width =  this.data('slideshow').width();
          this.data('inner_container').width(width * this.data('slides').length);
          this.data('slides').width(width);
        },

        bindWidthChangeOnWindowResize: function(){
          var self = this;
          $(window).resize(
              $.debounce(50, function(){
                self.slideshow('setWidths');
                self.slideshow('goToSlide',{slide:0});
              })
          );
        },

        bindHoverPause: function(){
          var self = this;
          this.data('hover_enabled',true);
          this.data('inner_container').on('mouseenter',function(){
            self.slideshow('clearInterval');
          });
          this.data('inner_container').on('mouseleave',function(){
            self.slideshow('startInterval');
          });
        },

        startInterval: function(){
          var self = this;
          if(this.data('interval_id')){
             self.slideshow('clearInterval');
          }
          this.data('interval_id',
            setInterval(function(){self.slideshow('play');},self.data('speed'))
          );
        },

        clearInterval: function(){
          if(this.data('interval_id') !== false){
            clearInterval(this.data('interval_id'));
          }
          this.data('interval_id',false);
        },

        bindFocus: function(){
          var self = this;
          this.on('focus','.slide',function(e){
            self.slideshow('clearInterval');
            self.slideshow('goToSlide',{slide: $(this).data('slide-number')});
          });
        },

        bindKeys: function(){
          var self = this;
          this.on('keyup','.slideshow-keys',function(e){
            if(e.keyCode == 37){
              self.slideshow('clearInterval');
              self.slideshow('previous');
            }else if(e.keyCode == 39){
              self.slideshow('clearInterval');
              self.slideshow('next');
            }

          });
        },



        goToSlide: function(args){
          return this.slideshow(this.data('goToSlide'),args);
        },

        goToSlide3d: function(args){
          var page_offset = -1 * (args.slide * this.data('slideshow').width());
          this.data('inner_container').css(this.data('transitionPrefix'),'all 400ms cubic-bezier(0.175, 0.885, 0.320, 1)');
          this.data('inner_container').css(this.data('transformPrefix'),'translate3d(' + page_offset + 'px,0,0)');
          this.data('current_slide',args.slide)
          this.slideshow('updateDotNav');
        },

        goToSlide2d: function(args){
          var page_offset = -1 * (args.slide * this.data('slideshow').width());
          this.data('inner_container').css(this.data('transitionPrefix'),'all 400ms cubic-bezier(0.175, 0.885, 0.320, 1)');
          this.data('inner_container').css(this.data('transformPrefix'),'translate(' + page_offset + 'px,0)');
          this.data('current_slide',args.slide)
          this.slideshow('updateDotNav');
        },

        goToSlideJs: function(args){
          var page_offset = -1 * (args.slide * this.data('slideshow').width());
          this.data('inner_container').animate({left: page_offset},500);
          this.data('current_slide',args.slide)
          this.slideshow('updateDotNav');
        },



        next: function(){
          var s = (this.data('current_slide') + 1)%this.data('slides').length;
          this.slideshow('goToSlide',{slide:s});
        },

        previous: function(){
          var s = (this.data('current_slide') - 1);
          if(s < 0){
            this.slideshow('goToSlide',{slide: (this.data('slides').length - 1)});
          }
          else{
            this.slideshow('goToSlide',{slide:s});
          }
        },



        play: function(){
          var s = this.data('current_slide') + 1;
          s = (this.data('slides').length == s)? 0 : s;
          this.slideshow('goToSlide',{slide:s});
        },



        bindControls: function(){
          var self = this;
          this.on('click','.slideshow-control',function(e){
            self.slideshow($(e.target).data('slide-number'));
          });
        },

        bindDotNav: function(){
          var self = this;
          this.on('click','.slideshow-dot-nav li',function(e){
            e.preventDefault();
            if(self.data('interval_id')){
              self.slideshow('clearInterval');
            }
            if(self.data('hover_enabled')){
              self.data('inner_container').unbind('hover');
              self.data('hover_enabled',false);
            }
            var s = $(e.target).children('a').data('slide-link') || $(e.target).data('slide-link');
            self.slideshow('goToSlide',{slide: s});
          });
        },

        updateDotNav: function(){
          this.data('dots').removeClass('active');
          this.data('dot-nav').find('li:nth-child(' + (this.data('current_slide') + 1) + ') a').addClass('active');
        },



        detectFeatures: function(){
          var features = ['touch','csstransitions','csstransforms3d','csstransforms'],
              self = this;;
          $.each(features,function(i,f){
            self.data(f,$('html').hasClass(f));
          });
          if(Modernizr.prefixed('transform')) {
            this.data('transformPrefix', Modernizr.prefixed('transform').replace(/([A-Z])/g, function(str,m1) { return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-'));
          }
          if(Modernizr.prefixed('transition')) {
            this.data('transitionPrefix',Modernizr.prefixed('transition').replace(/([A-Z])/g, function(str,m1) { return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-'));
          }
        },


        handleTouches: function(args) {
          var e = args.e;

          if(e.originalEvent.touches.length > 1 || e.scale && e.scale !==1) return;

          if(e.type == 'touchstart') {
            var delayOpen = function() {
              $(e.target).trigger();
            };
            this.data('openTimeout',setTimeout(delayOpen, 250));    
            this.slideshow('mouseStart',{e: e, x: e.originalEvent.targetTouches[0].pageX, y: e.originalEvent.targetTouches[0].pageY});
          }
          else if(e.type == 'touchmove') {
            clearTimeout(this.data('openTimeout'));
             this.slideshow('mouseDrag',{e: e, x: e.originalEvent.changedTouches[0].pageX, y: e.originalEvent.changedTouches[0].pageY});
          }
          else if(e.type == 'touchend') {
             this.slideshow('mouseStop');
          }
        },
        
        mouseStart: function(args){
          this.data('startX', args.x);
          this.data('startY', args.y);
          this.data('startTime',Number(new Date()));

          if(this.data('csstransitions')) {
            var matrixToArray = function(matrix) {
              return matrix.substr(7, matrix.length - 8).split(', ');
            }
            //Set the transition to nothing so animations are smooth
            this.data('inner_container').css(this.data('transitionPrefix'),'');

            //Grab and set the offset of the list when touching began
            var startXOffset = parseInt(matrixToArray(this.data('inner_container').css(this.data('transformPrefix')))[4]);
                startYOffset = parseInt(matrixToArray(this.data('inner_container').css(this.data('transformPrefix')))[5]);
          }
          else{
            //Grab and set the offset of the list when touching began
            var startXOffset = parseInt(this.data('inner_container').css('left'));
                startYOffset = parseInt(0);
          }
            
          this.data('startXOffset',startXOffset);
          this.data('startYOffset',startYOffset);
        },
        
        mouseDrag: function(args) {
          var deltaX =  (args.x - this.data('startX')) ,
              deltaY =  (args.y - this.data('startY')) ;
          this.data('deltaX',deltaX);
          this.data('deltaY',deltaY);

          var direction = (Math.abs(deltaX) > Math.abs(deltaY)) ? 'horizontal': 'vertical';
          this.data('direction',direction);

          if(direction == 'horizontal'){
              args.e.preventDefault();
              var change = deltaX  + this.data('startXOffset');

              this.slideshow('clearInterval');
              
              if(this.data('csstransitions')) {
                if(this.data('csstransforms3d')) {
                  this.data('inner_container').css(this.data('transformPrefix'),'translate3d(' + change + 'px,0,0)');
                }
                else if(Cl.get('csstransforms')) {
                  this.data('inner_container').css(this.data('transformPrefix'),'translate(' + change + 'px,0)');
                }
              }
              else{
                this.data('inner_container').css('left', change + 'px');
              }
           }       
        },
        
        mouseStop: function(){
          var hthres = parseInt(this.width()/4),
              speed = Number(new Date) - this.data('startTime'),
              first = this.data('current_slide') == 0,
              last = this.data('current_slide') == (this.data('slides').length - 1);

          if(this.data('direction') == 'horizontal') {

            if(Math.abs(this.data('deltaX')) > hthres || speed < 250) {
              
              if(this.data('deltaX') > 0 && !first) {
                this.slideshow('previous',{speed: speed});
              }
              else if(this.data('deltaX') < 0 && !last) {
                this.slideshow('next',{speed: speed});
              }
              else{
                this.slideshow('goToSlide',{slide:this.data('current_slide')});
              }

            }
            else{
              this.slideshow('goToSlide',{slide:this.data('current_slide')});
            }

          }
          this.data('deltaX',0);
          this.data('deltaY',0);         
        }


    };



    $.fn.slideshow = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }    
    };


})( jQuery );