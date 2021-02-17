  var $ = jQuery;
const base_url = $('.script-urls').attr('home');
const ADMINURL = base_url+'/wp-admin/admin-ajax.php';
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
   
   
   if( $('.single-sections').length > 0 ){
         $(function(){

    // LOADMORE SONGS ARCHIVE SONGSTabs

    var loadsonglast = false;

    var offset = $('.single-sections').attr('perpage');

    var ajaxPostloaded = $('.MasterLoadMore');

    var bottomlastsong = $('.FooterLoadedOne');

    $(window).scroll(function() {

      if( $('.MasterArchiveSection > *').hasClass('MasterLoadMore') ) {

        if($(this).scrollTop() > bottomlastsong.offset().top - 1000  ){

          if( loadsonglast == false ) {

            if( $('.MasterLoadMore').attr('data-loading') == 'false' ) {

              ajaxPostloaded.append('<div class="overlay-loader"> <div class="loader"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div> </div>');

              loadsonglast = true;

              $.ajax({
                url:ADMINURL,
                type: 'POST',
                data: {
                action:'get_single_block',
                  postid:$('.single-sections').attr('data-id'), 

                  offset:offset,

                },

                success: function(msg){

                  $('.MasterLoadMore .overlay-loader').remove();

                  ajaxPostloaded.append(msg);

                  loadsonglast = false;

                  offset = offset + $('.single-sections').attr('perpage');

                }

              });

            }

          }

        }

      }

    });

  });
   }
   
    if( $('.single-match').length > 0 ){
	    $('ul.servers li ').click(function(){
	        $(this).addClass('active').siblings().removeClass('active');
	        var num =$(this).data('num');
	        $('.embedSevers').html($(this).find('noscript').html());
	         
	    });

		$("button.TextCopy").click(function(){
		    $(".iframeCode textarea").select();
		    document.execCommand('copy');
		});
    }
    if($('.single-data').length > 0) {
      
	var counter;

	function IframeLoaded() {

		$('body').attr('enable-iframe', 'yes');

	}

	$(document).ready(function(){

		var offset = 2;

		$(window).scroll(function() {

			if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {

				$.ajax({

                    url: base_url+'/wp-admin/admin-ajax.php',
                    type: 'POST',
                    data:{
                    action:'get_section',
                    offset:offset
                    },

					success: function(msg) {

						$('.Sections').append(msg);

						setTimeout(function(){

							 if(isMobile) {  

								$(".SliderBlocksSection  ul").owlCarousel({

							    items: 1,

									stopOnHover: true,

									autoPlay: 10000,

									addClassActive: true,

									margin:10,

									navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],

									loop:true,

									nav: true,

								    responsive:{

								        0:{

								            items:1,

								            nav:true

								        },

								        480:{

								            items:2,

								            nav:false

								        },

								        970:{

								            items:3,

								            nav:true,

								        },

								        1000:{

								            items:4,

								            nav:true,

								        }

								    },

						    });
							} else { 

								$(".SliderBlocksSection[data-items='5'] > ul").owlCarousel({

			    				items: 1,

									stopOnHover: true,

									autoPlay: false,

									addClassActive: true,

									navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],

									loop:true,

									nav: true,

									margin:10,

						    });

							$(".SliderBlocksSection[data-items='3'] > ul").owlCarousel({

		            			items: 1,

								responsive: false,

								stopOnHover: true,

								autoPlay: 10000,

								addClassActive: true,

								navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],

								loop:true,

								nav: true,



						    });

					     } 

						},300);

					}

				});

				offset++;

			}

		});



    //ajax Hover Categoryes

    $(".downloadBottun").on('click',function(){

		var videoLoaded = $('.DownloadSection');

		$('html, body').animate({scrollTop: $('.DownloadSection').offset().top - 100 },500);

		 var id = $('.single-data').data('id');

		 $('.DownloadSection').toggleClass('active');

		$('.serverswww').show();

       //$('#goToservers').submit();



    });

    //ajax Hover Categoryes

    $(".MasterToggleItem > li").on('click',function(){

  	var songsLoaded = $('.MasterToggleOpen');

    var slug = $(this).data('slug');

    var herf = $(this).data('herf');

    var title = $(this).data('title');

    $(this).toggleClass('active').siblings().removeClass('active');

    songsLoaded.html('<div class="loaderLoaded"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>');

    $.ajax({

        type:'POST',

        url: base_url+'/wp-admin/admin-ajax.php',
        data:{
        action:'get_season',
          "title":title,

          "herf":herf,

          "slug":slug,

        },

        success:function(data){

          $('.MasterToggleOpen .loaderLoaded').remove();

          if(data == '' ){

            songsLoaded.html('<h2 class="noMorePosts">Ø¹ÙÙˆØ§ Ù„Ù… ÙŠØªÙ… Ø§Ø¶Ø§ÙØ© Ø­Ù„Ù‚Ø§Øª Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ³Ù… </h2>'); 

          }else {

            songsLoaded.html(data);

         	}

        }

      });

    });

    $('.MasterTriller iframe').click(function(e){

      e.stopPropagation();

    });

   	var trailerBox = $('.MasterTriller');

    $('.TrillerOpen').click(function(){

    	$('.TrilerOverlay').addClass('active');

    	setTimeout(function(){ 

    		$('.MasterTriller').html(trailerBox.find('noscript').html());

  		}, 2000);

    });

		$('.TrilerOverlay > .overlayClosse , .TrilerOverlay > span.closseTriller').click(function(){

			var ifr = $('.MasterTriller').find('iframe').attr('src');

    	$('.TrilerOverlay').removeClass('active');

    	$('.MasterTriller').html('<noscript><iframe width="560" height="315" src="'+ifr+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></noscript>');

    });

    $('.OpenTeamWork').click(function(){

    	$('.NormalTeamWork').toggleClass('active');

    });

    $('.openContent').click(function(){

    	$('.OpenContentFilm').toggleClass('active');

    });

		$('.SidebarSlider > ul > li').click(function(){

			$('.SidebarSlider > ul > li').removeClass('active');

			$(this).addClass('active');

			$('.SlidesInner').html('<div class="fancy-spinner"> <div class="ring"></div> <div class="ring"></div> <div class="dot"></div> </div>');

			$.ajax({
                
                url:ADMINURL,
				type: 'POST',
                data:{ filter: $(this).data('filter'), action:'get_home'},

				success: function(msg) {

					$('.SlidesInner').html(msg);

					$(".SlidesInner > ul").owlCarousel({

						items: 4,

						rtl: true,

						responsive: false,

						stopOnHover: true,

						autoPlay: 10000,

						addClassActive: true,

						navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],

						loop:true,

				    });

				}

			});

		});

		$(".SlidesInner > ul").owlCarousel({

			items: 4,

			rtl: true,

			responsive: false,

			stopOnHover: true,

			autoPlay: 10000,

			addClassActive: true,

			navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],

			loop:true,

    });

		$(".SliderBlocksSection[data-items='5'] > ul").owlCarousel({

			items: 5,

			responsive: false,

			stopOnHover: true,

			autoPlay: 10000,

			addClassActive: true,

			navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],

			loop:false,

			nav: true,

			slideBy: 5,

    });

		$(".SliderBlocksSection[data-items='3'] > ul").owlCarousel({

			items: 3,

			responsive: false,

			stopOnHover: true,

			autoPlay: 10000,

			addClassActive: true,

			navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],

			loop:false,

			nav: true,

			slideBy: 3,

    });

    $('ul.SeasonsList > li a').click(function(){

    	$('ul.SeasonsList > li a').parent().removeClass('active');

    	$(this).parent().addClass('active');

    	$('.EpisodesList').html('<div class="showbox"> <div class="loader"> <svg class="circular" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/> </svg> </div> </div>');

    	$.ajax({

            url:ADMINURL,
            data:{
                action:'get_epsiode_list',
                serie:$(this).data('season')
            },

			type:'POST',

			success: function(msg) {

				$('.EpisodesList').html(msg);

			}

    	});

    	return false;

    });

	});
	
    }
jQuery(document).ready(function($){

	var ImagesChanging = function(){
		setTimeout(function(){
			$('[data-img]').each(function(index){
				if( ($(window).scrollTop() + $(window).height()) > $(this).offset().top + 100 ) {
					$(this).attr('src', $(this).data('img')).on('load', function(){
						if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
				            $(this).remove();
			        	} else {
							$(this).addClass('loaded');
				        }
					});
				}
				

			});
		},300);
	};

	$(window).on('scroll', ImagesChanging);
	$(window).on('resize', ImagesChanging);
	// Load Events
	$(window).on('load', ImagesChanging);

	// Ajax Handlers Events
	$(window).ajaxSuccess(ImagesChanging);

	setTimeout(function(){ $('.slider').show(); },1000);

	function triggerSlider(elem,items=1,rtl=true,margin=0,loop=false,smartSpeed=500,autoPlay=false){
	   $(elem).owlCarousel({
	   	items:items,
	   	rtl:rtl,
	   	margin:margin,
	   	loop:loop,
	   	smartSpeed:smartSpeed,
	   	autoPlay:autoPlay
	   })
	}

	triggerSlider('.sliderContainer',1,true,15,true,800);

	$('.slider .left').click(function(){ $('.sliderContainer .owl-prev').click();});
	$('.slider .right').click(function(){ $('.sliderContainer .owl-next').click();  });


	$('.pagination li').each(function(){
	    if ($(this).find('a').length > 0) {
	    var link = $(this).find('a').attr('href');

	    link = link.replace('/ar','');
	    $(this).find('a').attr('href',link);
	    }
	})
    var loaded = false;
    $(window).on('scroll',function(){
    
        if($(this).scrollTop() > 10){
    		$('[data-src]').each(function(){
    			$(this).attr('src',$(this).data('src'));
    			$(this).removeAttr('data-src');
    		})
    		$('[data-style]').each(function(){
    			$(this).attr('style',$(this).data('style'));
    			$(this).removeAttr('data-style');
    		})
        }
    })

    //OpenComments
    $(".MoreBTNMatch").click(function(){
      if($(".MasterTabMatches").hasClass("show")) {
        $(".MoreBTNMatch").html('Ø§Ù„Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„Ù…Ø¨Ø§Ø±ÙŠØ§Øª ');
        $(".MasterTabMatches").toggleClass("show");
      }else {
        $(".MoreBTNMatch").html('Ø§Ø®ÙØ§Ø¡ Ø§Ù„Ù…Ø¨Ø§Ø±ÙŠØ§Øª ');
        $(".MasterTabMatches").toggleClass("show");
      }
    });
	/* Table Aajx Tab */
    var matchTable = $('.MasterTabMatches');
    $('ul.NavBarMatches > li').on('click',function(){
	      var href = $(this).data('href');
	      var title = $(this).data('title');
	      var filter = $(this).data('filter');
	      var found = $(this).data('found');
	      $('.MasterTabMatches').removeClass('show');
	      $(this).addClass('active').siblings().removeClass('active');
	      matchTable.html('<div class="BallLoader"><span>âš½ï¸</span><div class="shadow"></div></div>');
	      $.ajax({
	        type:'POST',
	        url:ADMINURL,
	        data:{
	            action:'get_match',
	          "href":href ,
	          "title":title ,
	          "filter":filter ,
	          "found":found,
	        },
	        success:function(data){
	          $('.MasterTabMatches .BallLoader').remove();
	          if(data == '' ){
	            matchTable.html('<h2 class="noMorePosts">Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù†ØªØ§Ø¦Ø¬ Ø§Ø®Ø±ÙŠ</h2>'); 
	          }else {
	            matchTable.html(data);
	          }
	        }
	      });
    });

   $('div.bars').click(function(){
        $('.mobileMenu').addClass('active');
    });
	 $('div.close').click(function(){
	    $('.mobileMenu').removeClass('active');
	});

 	$('.mobileMenu ul.sub-menu').parent().append('<i class="fa fa-chevron-down subMenu"></i>');
 	$('i.subMenu').click(function(){
        $(this).parent().find('ul').slideToggle(250);
 	});
	$('body').addClass('loaded');
	$('.fixed-header ul li ul.sub-menu').parent().append('<i class="fas fa-chevron-down showSub"></i>');
    $(".MobileSearchFilterOpen").click(function(){
      if($(".fixedSearch").hasClass("show")) {
        $(this).html('<i class="fa fa-search"></i>');
        $(".fixedSearch").toggleClass("show");
      }else {
        $(this).html('<i class="fa fa-times"></i>');
        $(".fixedSearch").toggleClass("show");
      }
  	}); 

	$('.TermsList > span').click(function(){
		$('.TermsList > div').toggleClass('active');
	});

	$('.MenuToggle,.overlay_Menu').click(function(){
		$('.top-header,.overlay_Menu,.hamburger--slider,body').toggleClass('is-active');
	});

    $('.MenuIsMain ul > li ul.sub-menu').parent().append('<i class="fa fa-chevron-left showSub"></i>');
    $('.MenuIsMain ul > li ul.sub-menu').parent().click(function(){
    	$(this).find('ul').slideToggle(300);
    	if( $(this).find('i').hasClass('fa-chevron-left') ){
    		$(this).find('i').attr('class','fa fa-chevron-down showSub');
    	}else {
    		$(this).find('i').attr('class','fa fa-chevron-left showSub');
    	}
    });

  	$(window).on('load',function () {
	    setTimeout(function(){
	      $('.post-ratings').addClass('loaded');
	      $('.word').addClass('active');
	    },2000);
  	});
	$('.MenuList > div > ul > li.menu-item-has-children > a').append('<i class="fa fa-angle-down"></i>');
	$('.MenuList > div > ul > li > ul > li > a').prepend('<i class="fa fa fa-angle-left"></i>');
    $('.showCustomSearch').click(function(){
    	$('div.custom_search').toggleClass('active');
    });
	$('.SidebarSlider > ul > li').click(function(){
		$('.SidebarSlider > ul > li').removeClass('active');
		$(this).addClass('active');
		$('.SlidesInner').html('<div class="fancy-spinner"> <div class="ring"></div> <div class="ring"></div> <div class="dot"></div> </div>');
		$.ajax({
			url: ADMINURL,
			type: 'POST',
			data:{
			    action:'get_home',
			    filter:$(this).data('filter')
			},
			success: function(msg) {
				$('.SlidesInner').html(msg);
			    triggerSlider('.SlidesInner > ul',4,true,0,true,500,1000);
			}
		});
	});
    triggerSlider('.SlidesInner > ul',4,true,0,true,500,1000);
     if ($('.TermsList').length > 0) { 
    	triggerSlider('.TermsList > div',7,true,0,true);
     } 
  	if( isMobile ) {

		$(".SliderBlocksSection  ul").owlCarousel({
	    	items: 1,
			stopOnHover: true,
			autoPlay: 10000,
			addClassActive: true,
			margin:10,
			navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
			loop:true,
			nav: true,
			margin:10,
		    responsive:{
		        0:{
		            items:1,
		            nav:true
		        },
		        480:{
		            items:2,
		            nav:false
		        },
		        970:{
		            items:4,
		            nav:true,
		        },
		        1000:{
		            items:5,
		            nav:true,
		        }
		    },
	    });
		$(".genreSlider  ul").owlCarousel({
		    items: 1,
			stopOnHover: true,
			autoPlay: 10000,
			addClassActive: true,
			margin:10,
			navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
			loop:true,
			nav: true,
			margin:10,
		    responsive:{
		        0:{
		            items:1,
		            nav:true
		        },
		        480:{
		            items:2,
		            nav:false
		        },
		        970:{
		            items:4,
		            nav:true,
		        },
		        1000:{
		            items:5,
		            nav:true,
		        }
		    },
	    });
   	}else{ 
		triggerSlider(".SliderBlocksSection[data-items='5'] > ul",1,true,10,true);
		triggerSlider(".SliderBlocksSection[data-items='3'] > ul",1,true,10,true);
	} 
	triggerSlider(".cast",8,true,0,true);

    $('.leftI').click(function(){
    	$('.Teamwork .owl-prev').click();
    });
    $('.rightI').click(function(){
    	$('.Teamwork .owl-next').click();
    });
	triggerSlider(".SlidesList",1,true,0,true);

    $('.HomeSlider span.next').click(function(){
		$('.SlidesList .owl-next').click();
	});
	$('.HomeSlider span.prev').click(function(){
		$('.SlidesList .owl-prev').click();
	});

	var offset = 2;
	$(window).scroll(function() {
	    if( $(this).scrollTop() > 200 ){
	        $('.fixed-header').addClass('active');
	    }
	    if( $(this).scrollTop() < 200 ){
	        $('.fixed-header').removeClass('active');
	    }
	    if( $(this).scrollTop() > 700 ){
	        $('.CuStomSearching').addClass('active');
	    }
	    if( $(this).scrollTop() < 700 ){
	        $('.CuStomSearching').removeClass('active');
	    }
	    
	 if( $('.home-sections').length > 0 ){ 

		
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			$.ajax({
				url: base_url+'/wp-admin/admin-ajax.php',
				type: 'POST',
				data:{
				    action:'get_section',
				    offset:offset
				},
				success: function(msg) {
					$('.Sections').append(msg);
					setTimeout(function(){
				    if( isMobile ) { 
							$(".SliderBlocksSection  ul").owlCarousel({
						    items: 1,
								stopOnHover: true,
								autoPlay: 10000,
								addClassActive: true,
								margin:10,
								navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
								loop:true,
								nav: true,
							    responsive:{
							        0:{
							            items:1,
							            nav:true
							        },
							        480:{
							            items:2,
							            nav:false
							        },
							        970:{
							            items:3,
							            nav:true,
							        },
							        1000:{
							            items:4,
							            nav:true,
							        }
							    },
					    });
						} else { 
							$(".SliderBlocksSection[data-items='5'] > ul").owlCarousel({
		    				items: 1,
								stopOnHover: true,
								autoPlay: false,
								addClassActive: true,
								navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
								loop:true,
								nav: true,
								margin:10,
					    });
						$(".SliderBlocksSection[data-items='3'] > ul").owlCarousel({
	            			items: 1,
							responsive: false,
							stopOnHover: true,
							autoPlay: 10000,
							addClassActive: true,
							navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
							loop:true,
							nav: true,

					    });
				    } 
					},300);
				}
			});
			offset++;
		}
		
	 } 
	});
			
	$('.TermsList >div li').click(function(){
	    $('.TermsList > div').removeClass('active');
		var slug = $(this).data('slug');
		$('.genreSlider *').remove();
		$('.genreSlider').append('<div class="overlay-loader"><div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
		
		$.ajax({
			type:'POST',
			url:ADMINURL,
			data:{slug:slug,action:'get_home'},
			success:function(data){
			    $('.genreSlider .overlay-loader').remove();
				$('.genreSlider').append(data);
			}
		});
	});
	$('header .MenuBar').click(function(){
		$('.searchform').toggleClass('active');
	});

	// Category Script Options
	$('.SlidersAjax').owlCarousel({
	  margin:15,
	  loop:true,
	  autoWidth:true,
	  items:10,
	  navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
	  dots:false,
	  rtl:true,
	  autoplay:false,
	  autoplayHoverPause:false,
	})
	$('.loadedAjax > .carousel-next').click(function(e) {
	e.preventDefault();
	  $('.SlidersAjax  .owl-next').click();
	});
	$('.loadedAjax > .carousel-prev').click(function(e) {
	e.preventDefault();
	  $('.SlidersAjax  .owl-prev').click();
	});
  	$(".OpenGenere:not(.noGenre)").click(function(e){
	    e.preventDefault();
	    if($(".TermsList > div").hasClass("show")) {
	        $(this).html('');
	      $(".TermsList > div").toggleClass("show");
	    }else {
	        $(this).html('');
	      $(".TermsList > div").toggleClass("show");
	    }
	}); 

    $('div.bars').click(function(){
    	$('aside,.bodyContainer').toggleClass('active');
    	if($(this).find('i').hasClass('fa-bars')){
    		$(this).find('i').attr('class','fa fa-times');
    	}else {
    		$(this).find('i').attr('class','fa fa-bars');
    	}
    });

    $('aside ul li ul.sub-menu').parent().append('<i class="fa fa-chevron-left showSub"></i>');
    $('aside ul li ul.sub-menu').parent().click(function(){
    	$(this).find('ul').slideToggle(300);
    	if( $(this).find('i').hasClass('fa-chevron-left') ){
    		$(this).find('i').attr('class','fa fa-chevron-down showSub');
    	}else {
    		$(this).find('i').attr('class','fa fa-chevron-left showSub');
    	}
    });

  	/*---------------------------------------------------------*/
  	var allSections = $('.loadFilter');
  	$('.custom_search section > div.filter form').submit(function(e){
	      var allData = {};
	      $('.releas-year ul li').each(function(){
	        if($(this).hasClass('active')){
	          allData['release-year'] = $(this).data('value');
	        }
	      });
	      $('.genre ul li').each(function(){
	        if($(this).hasClass('active')){
	          allData['genre'] = $(this).data('value');
	        }
	      });

	      $('.quality ul li').each(function(){
	        if($(this).hasClass('active')){
	          allData['quality'] = $(this).data('value');
	        }
	      });

	      $('.category ul li').each(function(){
	        if($(this).hasClass('active')){
	          allData['category'] = $(this).data('value');
	        }
	      });

	      $('.language ul li').each(function(){
	        if($(this).hasClass('active')){
	          allData['language'] = $(this).data('value');
	        }
	      });
	        
	      $('.nation ul li').each(function(){
	        if($(this).hasClass('active')){
	          allData['nation '] = $(this).data('value');
	        }
	      });

    });

   $('.custom_search section > div span').click(function(){
      $(this).parent().find('ul').slideToggle(300);
      $(this).parent().siblings().find('ul').slideUp(300);
    });
    $('.custom_search section > div ul li').click(function(){
      $(this).parent().slideUp(300);
       if( $(this).is(':first-child') ){
          $(this).siblings().removeClass('active');
        }else{
          $(this).addClass('active').siblings().removeClass('active');
        }
      $(this).parent().prev().html('<i class="fa fa-chevron-down"></i>'+$(this).text());
      $('#'+$(this).data('input')).val($(this).data('value'));
    });
    /* scroll top */
    $('.scrollToTop').click(function(){
    	$('body,html').animate({
    		scrollTop:0
    	},1000);
    });

    $(window).on('scroll',function(){
    	if( $(this).scrollTop() > 100 ) {
    		$('.scrollToTop').show();
    	}else {
    		$('.scrollToTop').hide();
    	}
    });

	 /* SINGLE PAGE CODE */
 
	$('.SidebarSlider > ul > li').click(function(){
		$('.SidebarSlider > ul > li').removeClass('active');
		$(this).addClass('active');
		$('.SlidesInner').html('<div class="fancy-spinner"> <div class="ring"></div> <div class="ring"></div> <div class="dot"></div> </div>');
		$.ajax({
			url:ADMINURL,
			type: 'POST',
			data:{
			    action:'filter_home',
			    filter:$(this).data('filter')
			},
			success: function(msg) {
				$('.SlidesInner').html(msg);
				$(".SlidesInner > ul").owlCarousel({
					items: 4,
					rtl: true,
					responsive: false,
					stopOnHover: true,
					autoPlay: 10000,
					addClassActive: true,
					navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
					loop:true,
			    });
			}
		});
	});
	if ($('.SlidesInner > ul').length > 0) {
		$(".SlidesInner > ul").owlCarousel({
			items: 4,
			rtl: true,
			responsive: false,
			stopOnHover: true,
			autoPlay: 10000,
			addClassActive: true,
			navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
			loop:true,
	    });
	}
	if ($('.SlidesInner > ul').length > 0) {
		$(".SliderBlocksSection[data-items='5'] > ul").owlCarousel({
			items: 1,
			responsive: false,
			stopOnHover: true,
			autoPlay: 10000,
			addClassActive: true,
			navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
			loop:false,
			nav: true,
	    });
	}
	if ($(".SliderBlocksSection[data-items='3'] > ul").length > 0) {
		$(".SliderBlocksSection[data-items='3'] > ul").owlCarousel({
			items: 1,
			responsive: false,
			stopOnHover: true,
			autoPlay: 10000,
			addClassActive: true,
			navText : ['<i class="fa fa-angle-right"></i>','<i class="fa fa-angle-left"></i>'],
			loop:false,
			nav: true,
	    });
	}
    
    $('.WatchServers > li').click(function(){
    	$('.WatchServers > li').removeClass('active');
    	$(this).addClass('active');
    	var server = $(this).data('server');
    	var postid =$(this).data('post');
    	$.ajax({
			url: base_url+'/wp-admin/admin-ajax.php',
			type: 'POST',
			data:{
			    action :'GetServer',
			    post:postid,
			    id:server
			},
			success: function(msg) {
				$('#EmbedCode').html(msg);
			}
		});
    });
	    
    $('ul.SeasonsList > li a').click(function(){
    	$('ul.SeasonsList > li a').parent().removeClass('active');
    	$(this).parent().addClass('active');
    	$('.EpisodesList').html('<div class="showbox"> <div class="loader"> <svg class="circular" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/> </svg> </div> </div>');
    	$.ajax({
    		url:ADMINURL,
    		data:{
    		    serie:$(this).data('season'),
    		    action:'get_epsiode_list'
    		},
			type:'POST',
			success: function(msg) {
				$('.EpisodesList').html(msg);
			}
    	});
    	return false;
    });
	  
	 if( $('.search').length > 0 ){
	     var home = $('.search').data('home');
	     var search = $('.search').data('search');
	   $('.pagination li').each(function(){
	         if( $(this).find('a').length > 0 ){
	             var page = $(this).find('a').attr('href')
                   page = page.split('/page/')[1]
                    page = parseInt(page)
                    var newhref = home+'?s='+search+'&page='+page;
                 $(this).find('a').attr('href',newhref)
	         }
	     })
	 }
});

