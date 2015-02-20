/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    
		
    }
};

var menuOpen = false;
var menuOffset = 0;
var backButtonActive = false;
var pages = [];

$(document).ready(function() {
	CreatePages();
	AddPagesToDOM();
	
	menuOffset = screen.width*0.81; 
	$('#modal_bg').hide();
	$('#menuCloseButton').hide();
	
	var sheight = screen.height - $(".header").height() - 92;
	$(".page").addClass("page-shadow");
	$('#page-content').height(sheight);
	$('#page-content').css("top",-sheight);
	$('#page-content').hide();
	$('#menuButton').click(function() {
		
		
		if (backButtonActive) {
			if (menuOpen) {
				FadeOut('#modal_bg');
				$('.settingsMenu').css("-webkit-transform", "translate3d(0,0,0)");
				menuOpen = false;
			}
			else if (pageOpen) {
				ClosePage();
			}		
		}
		else {
			FadeIn('#modal_bg',0.3);
			$('.settingsMenu').css("-webkit-transform", "translate3d("+menuOffset+"px,0,0)");
			menuOpen = true;
		}
		
		ToggleBackButton(); 
		
	});
	
	var pageWidth = screen.width-16;
	$('<style>.card-width{width:'+pageWidth+'px;}</style>').appendTo("head");
	$('.page').addClass("card-width");
});

function CreatePages(){
	pages.push(new Page(1,'Game 1', 'Short game description', '#4CAF50', 'pages/page1.html'));
	pages.push(new Page(2,'Game 2', 'Short game description', '#03A9F4', 'pages/page2.html'));
	pages.push(new Page(3,'Game 3', 'Short game description', '#FF9800', 'pages/page3.html'));
	pages.push(new Page(4,'Game 4', 'Short game description', '#9C27B0', 'pages/page4.html'));
}

function AddPagesToDOM() {
	for (i=0; i<pages.length; i++) {
		$('.main-container').append(pages[i].getHTML());
	}
}

function ToggleBackButton() {
	if (backButtonActive) {
		$('.hamburger').removeClass("arrow");
	}
	else {
		$('.hamburger').addClass("arrow");
	}
	
	backButtonActive = !backButtonActive;
}

function FadeIn(el, opacity) {
	$(el).show();
	setTimeout(function() { $(el).css("opacity",opacity); }, 20);
}

function FadeOut(el) {
	$(el).css("opacity",0);
	setTimeout(function() { $(el).hide(); }, 250);
}
