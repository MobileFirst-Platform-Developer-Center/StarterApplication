/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
 
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    WL.TabBar.init();
	WL.TabBar.addItem("feedsTab", displayFeedsTab, Messages.navToFeeds, {image:"images/feed.png", imageSelected:"images/feed.png"});
	WL.TabBar.addItem("aboutTab", displayAboutTab, Messages.navToAbout, {image:"images/about.png", imageSelected:"images/about.png"});
	WL.TabBar.setSelectedItem ("feedsTab");
}