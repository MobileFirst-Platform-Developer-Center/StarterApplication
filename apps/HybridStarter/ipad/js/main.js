/*
 *
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

 */

// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // iPad Environment initialization
    $('#aboutButton').bind('click', displayAboutTab);
    $('#backButton').bind('click', displayFeedsTab);
    $('#mainNav').hide();
 // Listen to Window Resize
    $(window).resize(function () {
    	setListHeight();
    });
}



//***************************************************************
//displayItemsList
//***************************************************************
function displayItemsList(items) {		
	var ul = $('#feed'), i, item, listItem, text;
	
	var getCurrentItem = function (item, listItem) {
		return function() {			
			displayFeed(item);
			$('#feed li.selected').removeClass('selected'); // deselect all selected list items
			listItem.addClass('selected'); // mark the selected item
		};
	};
	// Remove previous items
	ul.empty();
	
	for (i = 0; i < items.length; i += 1) {		
		item = items[i];
		// Create new <li> element
		listItem = $('<li/>');
		listItem.addClass('feedItem');
		text = $('<a/>', {'url' : item.link, 'class' : 'feedItemTitle'}).text(item.title);
		listItem.append(text);		
		listItem.append('<div class=\"itemDate\">'+ item.pubDate.substring(0,22) +'</div>');
		listItem.click(getCurrentItem(item, listItem));
		// Append the li element to the ul element
		ul.append(listItem);		
	}
	
	displayFirstFeed(items[0]);
	setListHeight();
}


//***************************************************************
//displayFeed (Article: feedItemContent)
//***************************************************************
function displayFeed(feed) {
	var str = "";
	str += "<h2>"+ feed.title +"</h2>";
	str += "<div class=\"itemDate\">"+ feed.pubDate.substring(0,22) +"</div>";
	str += "<p>"+ feed.description + "</p>";
	str += "<p><a class=\"feedLink\" onclick=\"window.open('" + feed.link + "','_blank');\" >Read full article &gt;</a></p>";

	$('#feedItemContent').empty();
	$('#feedItemContent').html(str);
	
	$('#aboutDiv').hide(); // hide the about tab
	$('#feedItemContent').show(); // display the feed tab
	$('#backButton').hide();
	$('#aboutButton').show();

}

//***************************************************************
//displayFirstFeed
//***************************************************************
function displayFirstFeed(firstItem) {
	var str = "";
	str += "<h2>"+ firstItem.title +"</h2>";
	str += "<div class=\"itemDate\">"+ firstItem.pubDate.substring(0,22) +"</div>";
	str += "<p>"+ firstItem.description + "</p>";
	str += "<p><a onclick=\"window.open('" + firstItem.link + "','_blank');\" >Read full article &gt;</a></p>";
	
	$('#feedItemContent').html(str);
    $('li.feedItem').first().addClass('selected'); // mark the first selected item
}


//***************************************************************
//displayFeedsTab
//***************************************************************
function displayFeedsTab(){
	$('#aboutDiv').hide(); // hide the about tab
	$('#feedItemContent').show(); // hide the feed tab
	$('#feed').show(); // display the feeds list
	$('#refreshButton').show();
	$('#backButton').hide();
	$('#aboutButton').show();
}

//***************************************************************
//displayAboutTab
//***************************************************************
function displayAboutTab(){
	$(document).scrollTop(0);
	$('#feed').hide(); // hide the feeds list
	$('#feedItemContent').hide(); // hide the feed tab
	$('#aboutDiv').show(); // display the about tab
	$('#refreshButton').hide();
	$('#backButton').show();
	$('#aboutButton').hide();
}

//***************************************************************
//setListHeight
//***************************************************************
function setListHeight(){
	var deviceHeight = $(window).height() - 60;// Header height
	$('#feed').css('height', deviceHeight);
	$('#feedItemContent').css('height', deviceHeight-40);
}



