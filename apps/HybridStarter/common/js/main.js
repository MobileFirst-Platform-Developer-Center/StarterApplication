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
 
var busy;

function wlCommonInit() {
	busy = new WL.BusyIndicator();
	$('#navToFeeds').bind('click', displayFeedsTab);
	$('#navToAbout').bind('click', displayAboutTab);
	$('#backButton').bind('click', displayFeedsTab);
	$('#refreshButton').bind('click', loadFeeds);
	
	loadFeeds();
	displayFeedsTab();
}

//***************************************************************
// loadFeeds
//***************************************************************
function loadFeeds() {
	busy.show();
	
	/*
     * The REST API works with all adapters and external resources, and is supported on the following hybrid environments: 
     * iOS, Android, Windows Phone 8, Windows 8. 
     * For BlackBerry 6/7/10, Mobile Web and Desktop Browser, see their respective environment-folder\js\main.js.
     */ 
	var resourceRequest = new WLResourceRequest("/adapters/StarterApplicationAdapter/getEngadgetFeeds", WLResourceRequest.GET, 30000);
	resourceRequest.send().then(
			onGetFeedsSuccess,
			onGetFeedsFail
	);
}

function onGetFeedsSuccess(response) {
	WL.Logger.debug("Adapter procedure invocation suceeded");
	displayItemsList(response.responseJSON.items);
	busy.hide();
}

function onGetFeedsFail(response) {	
	WL.Logger.debug("Failed adapter procedure invocation");
	displayFeedsTab();
	busy.hide();
	WL.SimpleDialog.show("Starter Application", "Service not available. Try again later.", 
		[{
			text : 'Reload',
			handler : WL.Client.reloadApp
		},
		{
			text: 'Close',
			handler : function() {}
		}]
	);
}

//***************************************************************
// displayItemsList
//***************************************************************
function displayItemsList(items) {		
	var ul = $('#feed'), i, item, listItem, text;
	
	var getCurrentItem = function (item, listItem) {
		return function() {			
			displayFeed(item);
		};
	};
	// Remove previous items
	ul.empty();
	
	for (i = 0; i < items.length; i += 1) {		
		item = items[i];
		// Create new <li> element and add content
		listItem = $('<li/>');
		listItem.addClass('feedItem');
		text = $('<a/>', {'url' : item.link, 'class' : 'feedItemTitle'}).text(item.title);
		listItem.append(text);		
		listItem.append('<div class=\"itemDate\">'+ item.pubDate.substring(0,22) +'</div>');
		listItem.click(getCurrentItem(item, listItem));
		// Append the li element to the ul element
		ul.append(listItem);		
	}
}

//***************************************************************
// displayFeed
//***************************************************************
function displayFeed(feed) {
	var str = "";
	str += "<h2>"+ feed.title +"</h2>";
	str += "<div class=\"itemDate\">"+ feed.pubDate.substring(0,22) +"</div>";
	str += "<p>"+ feed.description + "</p>";
	str += "<p><a onclick=\"window.open('" + feed.link + "','_blank');\" >Read full article &gt;</a></p>";
	
	$('#feedItemContent').empty();
	$('#feedItemContent').html(str);

	// add target='_blank' attribute to all the links
    $('#feedItemContent a').attr('target','_blank');
	
	$('#feed').hide(); // hide the feeds list
	$('#aboutDiv').hide(); // hide the about tab
	$('#feedItemContent').show(); // display the feed tab
	$('#refreshButton').hide();
	$('#backButton').show();
	WL.App.overrideBackButton (displayFeedsTab);
}

//***************************************************************
// displayFeedsTab
//***************************************************************
function displayFeedsTab(){
	$('#aboutDiv').hide(); // hide the about tab
	$('#feedItemContent').hide(); // hide the feed tab
	$('#feed').show(); // display the feeds list
	$('#refreshButton').show();
	$('#backButton').hide();
	$('#navToAbout').removeClass('selected'); // deselect the about nav
	$('#navToFeeds').addClass('selected'); // select the feed nav
	WL.App.resetBackButton();
}

//***************************************************************
// displayAboutTab
//***************************************************************
function displayAboutTab(){
	$(document).scrollTop(0);
	$('#feed').hide(); // hide the feeds list
	$('#feedItemContent').hide(); // hide the feed tab
	$('#aboutDiv').show(); // display the about tab
	$('#refreshButton').hide();
	$('#backButton').hide();
	$('#navToFeeds').removeClass('selected'); // deselect the feed nav
	$('#navToAbout').addClass('selected'); // select the about nav
}

