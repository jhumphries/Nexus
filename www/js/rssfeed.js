
 $(document).ready(function() {
 
 //EDIT THESE LINES
 //Title of the blog
 var TITLE = "Agency News";
 //RSS url
 var RSS = "www.dhs.gov/news/rss.xml";
 //Stores entries
 var entries = [];
 var selectedEntry = "";
 
 //listen for detail links
 $(".contentLink").live("click", function() {
                        selectedEntry = $(this).data("entryid");
                        });
 
 //Listen for main page
 $("#feedPage").live("pageshow", function() {

                     //Set the title
                     $("h1", this).text(TITLE);
                     
                     $.get(RSS, {}, function(res, code) {
                           var xml = $(res);
                           var items = xml.find("item");
                           $.each(items, function(i, v) {
                                  entry = { 
                                  title:$(v).find("title").text(), 
                                  link:$(v).find("link").text(), 
                                  description:$.trim($(v).find("description").text())
                                  };
                                  entries.push(entry);
                                  });
                           
                           //now draw the list
                           var s = '';
                           $.each(entries, function(i, v) {
                                  s += '<li><a href="#contentPage" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
                                  });
                           $("#linksList").append(s);
                           $("#linksList").listview("refresh");
                           });
                     
                     });
 
 //Listen for the content page to load
 $("#contentPage").live("pageshow", function(prepage) {
                        //Set the title
                        $("h1", this).text(entries[selectedEntry].title);
                        var contentHTML = "";
                        contentHTML += entries[selectedEntry].description;
                        contentHTML += '<p/><a href="'+entries[selectedEntry].link + '">Read Entry on Site</a>';
                        $("#entryText",this).html(contentHTML);
                        });
 
 });