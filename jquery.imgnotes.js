/**
 * imgnotes jQuery plugin
 * version 1.0
 *
 * Copyright (c) 2008 - Dr. Tarique Sani <tarique@sanisoft.com>
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * @URL      http://www.sanisoft.com/blog/2008/05/26/img-notes-jquery-plugin/
 * @Example  example.html
 *
 **/

//Wrap in a closure
(function($) {

	$.fn.imgNotes = function(n) {

        if(undefined == notes) {
            var notes;
        }

		if(undefined != n.notes){
			notes = n.notes;
		}

        if(n.url) {
            $.ajaxSetup({async: false});
            $.getJSON(n.url, function(data){
                    notes = data;
                }
            );
        }

		image = this;

		imgOffset = $(image).offset();

        imgHieght = $(image).height();
        imgWidth  = $(image).width();

		$(notes).each(function(){
			appendnote(this);
		});

		$(image).hover(
			function(){
				$('.note').show();
			},
			function(){
				$('.note').hide();
                $('.notep').hide();
			}
		);

		addnoteevents();
        appendnotesicon(n.isMobile);

		$(window).resize(function () {
			$('.note').remove();
            $('.notep').remove();
            $('.notesicon').remove();

			imgOffset = $(image).offset();

            imgHieght = $(image).height();
            imgWidth  = $(image).width();

			$(notes).each(function(){
				appendnote(this);
			});
			addnoteevents();
            appendnotesicon(n.isMobile);

		});
	}

    $.fn.imgNotes.showAll = function() {
        $('.note').show();
        $('.notep').show();
    };

    $.fn.imgNotes.hideAll = function() {
        $('.note').hide();
        $('.notep').hide();
    };

	function addnoteevents() {
		$('.note').hover(
			function(){
				$('.note').show();
				$(this).next('.notep').show();
				$(this).next('.notep').css("z-index", 10000);
			},
			function(){
				$('.note').show();
				$(this).next('.notep').hide();
				$(this).next('.notep').css("z-index", 0);
			}
		);
	}


	function appendnote(note_data){

		note_left  = parseInt(imgOffset.left) + parseInt(note_data.x1);
		note_top   = parseInt(imgOffset.top) + parseInt(note_data.y1);
		note_p_top = note_top + parseInt(note_data.height)+5;

		note_area_div = $("<div class='note'></div>")
                            .css({ left:   note_left + 'px',
                                   top:    note_top + 'px',
                                   width:  note_data.width + 'px',
                                   height: note_data.height + 'px' });

		note_text_div = $('<div class="notep" >'+note_data.note+'</div>')
                            .css({ left: note_left + 'px',
                                   top:  note_p_top + 'px'});

		$('body').append(note_area_div);
		$('body').append(note_text_div);
	}

    function appendnotesicon(isMobile) {
        if(true !== isMobile) {
            return
        }

        notes_icon_left  = parseInt(imgOffset.left) + parseInt(imgWidth) - 36;
        notes_icon_top   = parseInt(imgOffset.top) + parseInt(imgHieght) - 40;

        notes_icon_div = note_area_div = $("<div class='notesicon'></div>")
                                            .css({ left:   notes_icon_left + 'px',
                                                   top:    notes_icon_top + 'px'
                                                 });
        $('body').append(notes_icon_div);
                $('.notesicon').toggle(
            function(){
                $.fn.imgNotes.showAll();
            },
            function() {
                $.fn.imgNotes.hideAll();
            }
        );
    }

// End the closure
})(jQuery);
