function Page(id, title, desc, color, filename) {
	this.id = id;
	this.title = title;
	this.desc = desc;
	//this.file = file;
	this.color = color;
	this.filename = filename;
	
	this.getHTML = function() {
		var html = '<div id="'+this.id+'" class="page-container">';
		html += '<div class="page" onclick="OpenPage(this,\''+ this.color +'\',\''+ this.filename +'\' );">';
		html += '<div class="page-header" style="background-color:'+this.color+'">';
		html += '<h1>'+this.title+'</h1>';
		html += '<h2>'+this.desc+'</h2>';
		html += '</div>';
		html += '<div class="page-header-controls">';
		html += '<div class="flat-button"><p>Highscore: 0</p></div>';
		html += '</div></div></div>';
		
		return html;
	}
	
}

var pageOpen = false;
var openPage = null;
var scrollPos = 0;

function OpenPage(el, spinColor, filename) {
	
	if (!pageOpen) {
		$('#temp').remove();
		$('<style id="temp">.spinner:not(:required):before { border-top-color: '+spinColor+';</style>').appendTo('head');

		openPage = el;

		pageOpen = true;
		var offsetTop = $(el).offset().top;
		offsetTop = offsetTop - $(".header").outerHeight();
		
		var sheight = screen.height;
		
		//$(el).addClass("raise-element");

		scrollPos = $('body').scrollTop();
		
		$(el).addClass("page-open"); 

		$(el).transition({y:-offsetTop+scrollPos, width: screen.width, x: -8},353, 'ease');
		$(el).children('.page-header-controls').transition({opacity:0},353);
		setTimeout(function() {
			$('#page-content').show();
			$(el).removeClass("page-shadow");
			$('#page-content').transition({y : sheight},400, 'ease-out');
			
			setTimeout(function() {
				$('.main-container').addClass("no-scroll");
				$(el).css("margin-top", -scrollPos);
				LoadPage(filename);
			},400);
			
		},353);
		
		ToggleBackButton();
		
		/*setTimeout(function() {
			$(el).children('.page-content').fadeIn();
		},1200);*/
		
	}	
}
 
 function LoadPage(filename) {
	$('#page-content').load(filename);
 }
 
function ClosePage() {
	if (pageOpen) {
		
		var el = openPage;
		pageOpen = false;
		
		$('.main-container').removeClass("no-scroll");
		$(el).css("margin-top", 0);
		$('body').scrollTop(scrollPos);
		
		$('#page-content').transition({y : 0},400, 'ease-out');
		
		setTimeout(function() {
			$('#page-content').hide();
			
			$(el).addClass("page-shadow");
			$(el).transition({y:0, width: screen.width-18, x: 0},353, 'ease');
			
		},400);
		
		setTimeout(function() {
			$(el).removeClass("page-open");
			$('.main-container').removeClass("no-scroll");
			$(el).children('.page-header-controls').transition({opacity:1},353);
		},753);
	}	
}