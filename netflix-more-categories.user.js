// ==UserScript==
// @name          Netflix More Categories
// @version       1.2
// @description   Add a new menu entry with a lot of categories!
// @license       MIT
// @author        Loky (StellarisStudio)
// @icon          https://ya-webdesign.com/images/netflix-png-icon-5.png
// @namespace     https://github.com/StellarisStudio
// @supportURL    https://github.com/StellarisStudio/Tampermonkey-Scripts
// @homepageURL   https://github.com/StellarisStudio/Tampermonkey-Scripts
// @match         https://www.netflix.com/*
// @grant         GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // CSS
    GM_addStyle ( `
        .newNav a:hover, .newReleases, .catsLinkcolor:hover { color:#e50914!important; }
        .newNav { display:flex!important; }
        .newNav a { margin-right:1.4em; }
        .newNavCats:hover:before, #newCatsContainer a{ color:#e5e5e5; }
        .newNavCats:before { content: "+"; margin-right:3px; color:#e50914; }
        .newReleases:hover { color:#e5e5e5!important; }
        #newWrapper { position:fixed; top:0; width:100%; height:100%; display:flex; display:-webkit-flex; -webkit-justify-content:center; justify-content:center; z-index:9999; }
        #newCatsContainer { top:4.3em; width:50vw; min-height:23vw; max-height:auto; background-color:rgba(20,20,20,.95); margin:auto; padding:20px; box-sizing:border-box; border:1px solid rgb(229,9,20,.5); border-radius:8px; -webkit-transform: translateZ(0); }
        .ulSpCats { text-align:center; margin-bottom:-10px; }
        .ulSubCats { border-bottom:1px solid rgb(229,9,20,.5); text-align:center; }
        .liSubCats { display:inline-block; list-style-type:none; padding:2px 10px; font-size:1.2em; }
        .closeCats { float:right; padding:2px 5px; display:block; font-size:1em; font-weight:bold; text-transform:uppercase; }
        .madeStellaris { position:absolute; right:1em; bottom:.8em; padding:2px 5px; color:#e50914!important; font-size:.8em; opacity:.4; }
        .madeStellaris:hover { color:#e5cece!important; }
        .moreCats { margin-left:10px; font-size:.75em; }
        .subDiv { padding:5px 0; }
        .titleCats { margin:0 0 3px 0; padding:0 2em; font-size:1.2em; color:#e50914; }
        .liCats { display:inline-block; list-style-type:none; padding:3px 10px; font-size:1em; }
    ` );

    window.setTimeout(function() {
        var menuItemsTV = [
            {id: 10673, name: "Action & Adventure"},
            {id: 89814, name: "Award-winning TV Shows"},
            {id: 1189278, name: "Binge-worthy European TV Shows"},
            {id: 52117, name: "British TV Shows"},
            {id: 46553, name: "Classic TV Shows"},
            {id: 10375, name: "Comedies"},
            {id: 26146, name: "Crime TV Shows"},
            {id: 10105, name: "Docuseries"},
            {id: 11714, name: "Dramas"},
            {id: 89663, name: "European TV Shows"},
            {id: 72436, name: "Food & Travel"},
            {id: 3890, name: "Food & Wine"},
            {id: 3293, name: "Home Improvement"},
            {id: 83059, name: "Horror"},
            {id: 67879, name: "Korean TV Shows"},
            {id: 65263, name: "LGBTQ TV Shows"},
            {id: 4814, name: "Miniseries"},
            {id: 25804, name: "Military TV Shows"},
            {id: 4366, name: "Mysteries"},
            {id: 9833, name: "RealityTV"},
            {id: 52780, name: "Science & Nature"},
            {id: 1372, name: "Sci-Fi & Fantasy"},
            {id: 60951, name: "Teen TV Shows"}
        ];
        var menuItemsAA = [
            {id: 1365, name: "Action & Adventure"},
            {id: 43040, name: "Action Comedies"},
            {id: 43048, name: "Action Thrillers"},
            {id: 7442, name: "Adventures"},
            {id: 77232, name: "Asian Action Movies"},
            {id: 46576, name: "Classic Action & Adventure"},
            {id: 48744, name: "Classic War Movies"},
            {id: 47465, name: "Classic Westerns"},
            {id: 10118, name: "Comic Book & Superhero"},
            {id: 52858, name: "Epics"},
            {id: 11804, name: "Independent Action & Adventure"},
            {id: 8985, name: "Martial Arts Movies"},
            {id: 2125, name: "Military Action & Adventure"}
        ];
        var menuItemsSF = [
            {id: 1492, name: "Sci-Fi & Fantasy"},
            {id: 1568, name: "Action Sci-Fi & Fantasy"},
            {id: 3327, name: "Alien Sci-Fi"},
            {id: 3592, name: "Dark Sci-Fi & Fantasy"},
            {id: 9744, name: "Fantasy Movies"},
            {id: 6926, name: "Sci-Fi Adventure"},
            {id: 3916, name: "Sci-Fi Dramas"},
            {id: 1694, name: "Sci-Fi Horror Movies"},
            {id: 11014, name: "Sci-Fi Thrillers"}
        ];
        var menuItemsTH = [
            {id: 8933, name: "Thrillers"},
            {id: 46588, name: "Classic Thrillers"},
            {id: 10499, name: "Crime Thrillers"},
            {id: 31851, name: "Gangster Movies"},
            {id: 4251, name: "Independent Mysteries"},
            {id: 3269, name: "Independent Thrillers"},
            {id: 9994, name: "Mysteries"},
            {id: 10504, name: "Political Thrillers"},
            {id: 5505, name: "Psychological Thrillers"},
            {id: 972, name: "Steamy Thrillers"},
            {id: 11140, name: "Supernatural Thrillers"}
        ];
        var menuItemsHO = [
            {id: 8711, name: "Horror Movies"},
            {id: 8195, name: "B-Horror Movies"},
            {id: 6895, name: "Creature Features"},
            {id: 45028, name: "Deep Sea Horror Movies"},
            {id: 947, name: "Monster Movies"},
            {id: 6998, name: "Satanic Stories"},
            {id: 8646, name: "Slasher & Serial Killer"},
            {id: 42023, name: "Supernatural"},
            {id: 75804, name: "Vampires"},
            {id: 75930, name: "Werewolfs"},
            {id: 75405, name: "Zombies"}
        ];
        var menuItemsCO = [
            {id: 1252, name: "Campy Movies"},
            {id: 6548, name: "Comedies"},
            {id: 1223, name: "Comedies based on Books"},
            {id: 31694, name: "Classical Comedies"},
            {id: 869, name: "Dark Comedies"},
            {id: 89585, name: "Horror Comedy"},
            {id: 4195, name: "Independent comedies"},
            {id: 7120, name: "LGBTQ Comedies"},
            {id: 26, name: "Mockumentaries"},
            {id: 2700, name: "Political Comedies"},
            {id: 5475, name: "Romantic Comedies"},
            {id: 4922, name: "Satires"},
            {id: 10256, name: "Slapstick Comedies"},
            {id: 5286, name: "Sports Comedies"},
            {id: 11559, name: "Stand-up Comedy"},
            {id: 3519, name: "Teen Comedies"}
        ];
        var menuItemsDR = [
            {id: 5763, name: "Dramas"},
            {id: 3179, name: "Biographical Dramas"},
            {id: 29809, name: "Classic Dramas"},
            {id: 6889, name: "Crime Dramas"},
            {id: 4961, name: "Dramas based on Books"},
            {id: 3653, name: "Dramas based on real life"},
            {id: 384, name: "Independent Dramas"},
            {id: 500, name: "LGBTQ Dramas"},
            {id: 11, name: "Military Dramas"},
            {id: 12123, name: "Period Pieces"},
            {id: 6616, name: "Political Dramas"},
            {id: 1255, name: "Romantic Dramas"},
            {id: 5012, name: "Showbiz Dramas"},
            {id: 3947, name: "Social Issue Dramas"},
            {id: 7243, name: "Sports Dramas"}
        ];
        var menuItemsRO = [
            {id: 8883, name: "Romantic Movies"},
            {id: 31273, name: "Classic Romantic Movies"},
            {id: 5977, name: "LGBTQ Movies"},
            {id: 36103, name: "Quirky Romance"},
            {id: 502675, name: "Romantic Favorites"},
            {id: 9916, name: "Romantic Independent Movies"},
            {id: 3329, name: "Romantic LGBTQ Movies"}
        ];
        var menuItemsAN = [
            {id: 11881, name: "Adult Animation"},
            {id: 4698, name: "Animation"},
            {id: 7424, name: "Anime"},
            {id: 6721, name: "Anime Series"},
            {id: 3063, name: "Anime Features"},
            {id: 2653, name: "Action"},
            {id: 9302, name: "Comedy"},
            {id: 452, name: "Drama"},
            {id: 11146, name: "Fantasy"},
            {id: 10695, name: "Horror"},
            {id: 2729, name: "Sci-Fi"}
        ];
        var menuItemsKI = [
            {id: 27346, name: "Kids TV"},
            {id: 52843, name: "Kids Music"},
            {id: 5507, name: "Animal Tales"},
            {id: 783, name: "Children & Family Movies"},
            {id: 67673, name: "Disney"},
            {id: 10659, name: "Education"},
            {id: 51056, name: "Family Features"},
            {id: 67673, name: "Disney"},
            {id: 10056, name: "Movies based on Children's Books"},
            {id: 6796, name: "Movies (0 to 2 years)"},
            {id: 6218, name: "Movies (2 to 4 years)"},
            {id: 5455, name: "Movies (5 to 7 years)"},
            {id: 561, name: "Movies (8 to 10 years)"},
            {id: 6962, name: "Movies (11 to 12 years)"}
        ];
        var menuItemsWO = [
            {id: 3761, name: "African"},
            {id: 5230, name: "Australian"},
            {id: 262, name: "Belgian"},
            {id: 10757, name: "British"},
            {id: 3960, name: "Chinese"},
            {id: 10606, name: "Dutch"},
            {id: 5254, name: "Eastern European"},
            {id: 58807, name: "French"},
            {id: 58886, name: "German"},
            {id: 10463, name: "Indian"},
            {id: 58750, name: "Irish"},
            {id: 8221, name: "Italian"},
            {id: 10398, name: "Japanese"},
            {id: 5685, name: "Korean"},
            {id: 1613, name: "Latin American"},
            {id: 5875, name: "Middle Eastern"},
            {id: 63782, name: "New Zealand"},
            {id: 9292, name: "Scandinavian"},
            {id: 9196, name: "Southeast Asian"},
            {id: 58741, name: "Spanish"}
        ];
        var menuItemsDO = [
            {id: 6839, name: "Documentaries"},
            {id: 10105, name: "Docuseries"},
            {id: 3652, name: "Biographical"},
            {id: 9875, name: "Crimes"},
            {id: 72436, name: "Food & Travel"},
            {id: 3890, name: "Food & Wine"},
            {id: 5349, name: "Historical"},
            {id: 3293, name: "Home Improvement"},
            {id: 4720, name: "LGBTQ"},
            {id: 6695, name: "Martial Arts, Boxing & Wrestling"},
            {id: 4006, name: "Military"},
            {id: 90361, name: "Music & Concert"},
            {id: 7018, name: "Political"},
            {id: 4649, name: "Rockumentaries"},
            {id: 2595, name: "Science & Nature Docs"},
            {id: 52780, name: "Science & Nature TV"},
            {id: 3675, name: "Social & Cultural"},
            {id: 2760, name: "Spiritual"},
            {id: 180, name: "Sports"},
            {id: 1159, name: "Travel & Adventure"}
        ];
        var menuItemsMU = [
            {id: 1701, name: "Music"},
            {id: 32392, name: "Classic Musicals"},
            {id: 1105, name: "Country & Western/Folk"},
            {id: 59433, name: "Disney Musicals"},
            {id: 10271, name: "Jazz & Easy Listening"},
            {id: 10741, name: "Latin Music"},
            {id: 13335, name: "Musicals"},
            {id: 2145, name: "Pop"},
            {id: 3278, name: "Rock & Pop Concerts"},
            {id: 4649, name: "Rockumentaries"},
            {id: 13573, name: "Showbiz Musicals"},
            {id: 9472, name: "Urban & Dance Concerts"},
            {id: 2856, name: "World Music Concerts"}
        ];
        var menuItemsSP = [
            {id: 9327, name: "Sports & Fitness"},
            {id: 12339, name: "Baseball"},
            {id: 12762, name: "Basketball"},
            {id: 12443, name: "Boxing"},
            {id: 12803, name: "Football"},
            {id: 12549, name: "Soccer"}
        ];
        var menuItemsDI = [
            {id: 7077, name: "Independent Movies"},
            {id: 29764, name: "Art House Movies"},
            {id: 31574, name: "Classic Movies"},
            {id: 11079, name: "Experimental Movies"},
            {id: 52804, name: "Faith & Spiritual Movies"}
        ];

        /* create additional menu item into netflix default menu */
        var FlixMenu = document.getElementsByClassName('tabbed-primary-navigation');
        var newNav = document.createElement('li'); //the new menu item
        newNav.setAttribute('class', 'newNav');
        newNav.classList.add('navigation-tab');//to get netflix default style
           var newNavRat = document.createElement('a'); //the link within menuitem
           newNavRat.classList.add('showFullGenreList');
           newNavRat.setAttribute('href', '/MoviesYouveSeen');
           newNav.appendChild(newNavRat);
           newNavRat.appendChild(document.createTextNode("My Ratings"));
           var newNavAct = document.createElement('a'); //the link within menuitem
           newNavAct.classList.add('showFullGenreList');
           newNavAct.setAttribute('href', '/viewingactivity');
           newNav.appendChild(newNavAct);
           newNavAct.appendChild(document.createTextNode("My Activity"));
           var newNavCats = document.createElement('a'); //the link within menuitem
           newNavCats.classList.add('showFullGenreList');
           newNavCats.classList.add('newNavCats');
           newNavCats.setAttribute('href', 'javascript:document.getElementById("newWrapper").setAttribute("style", "display:flex;");');
           newNav.appendChild(newNavCats);
           newNavCats.appendChild(document.createTextNode("Categories"));
        FlixMenu[0].appendChild(newNav);

        /* create full genre list as hide/show container */
        var newWrapperDiv = document.createElement('div');
        newWrapperDiv.setAttribute('id', 'newWrapper');
        newWrapperDiv.setAttribute('style', 'display: none;');
        document.body.appendChild(newWrapperDiv);
        var newCatsContainerDiv = document.createElement('div');
        newCatsContainerDiv.setAttribute('id', 'newCatsContainer');
        newWrapperDiv.appendChild(newCatsContainerDiv);
           var closeCatsMenu = document.createElement('a');
           closeCatsMenu.setAttribute('href', 'javascript:document.getElementById("newWrapper").setAttribute("style", "display:none;");');
           closeCatsMenu.setAttribute('class', 'catsLinkcolor closeCats');
           closeCatsMenu.appendChild(document.createTextNode('x'));
           newCatsContainerDiv.appendChild(closeCatsMenu);
           var madeStellaris = document.createElement('a');
           madeStellaris.setAttribute('href', 'https://github.com/StellarisStudio/');
           madeStellaris.setAttribute('target', '_blank')
           madeStellaris.setAttribute('class', 'madeStellaris');
           madeStellaris.appendChild(document.createTextNode('Made by Stellaris Studio!'));
           newCatsContainerDiv.appendChild(madeStellaris);

        /* create Sub Menu special list */
        var subSpecialCats = document.createElement('ul');
        subSpecialCats.setAttribute('class', 'ulSpCats');
        newCatsContainerDiv.appendChild(subSpecialCats);
        var li = document.createElement('li'); // Genre New Releases !
            li.setAttribute('class', 'liSubCats');
            subSpecialCats.appendChild(li);
            var aNR = document.createElement('a');
            aNR.setAttribute('class', 'newReleases');
            aNR.setAttribute('href', '/browse/new-release');
            li.appendChild(aNR);
            aNR.appendChild(document.createTextNode('New Releases'));
        var li = document.createElement('li'); // Genre Netflix Originals !
            li.setAttribute('class', 'liSubCats');
            subSpecialCats.appendChild(li);
            var aNO = document.createElement('a');
            aNO.setAttribute('class', 'newReleases');
            aNO.setAttribute('href', '/browse/genre/839338');
            li.appendChild(aNO);
            aNO.appendChild(document.createTextNode('Netflix Originals'));

         /* create Sub Menu genre list */
        var subMenuCats = document.createElement('ul');
        subMenuCats.setAttribute('class', 'ulSubCats');
        newCatsContainerDiv.appendChild(subMenuCats);
        var li = document.createElement('li'); // Genre TV Shows !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aTV = document.createElement('a');
            aTV.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aTV);
            aTV.appendChild(document.createTextNode('TV Shows'));
            aTV.addEventListener('click', function (event) {
              if (subTVdiv.style.display == "none") { subTVdiv.style.display = "block";subAAdiv.style.display = "none";subSFdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subCOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subWOdiv.style.display = "none";subDOdiv.style.display = "none";subMUdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subTVdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Action & Adventure !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aAA = document.createElement('a');
            aAA.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aAA);
            aAA.appendChild(document.createTextNode('Action & Adventure'));
            aAA.addEventListener('click', function (event) {
              if (subAAdiv.style.display == "none") { subAAdiv.style.display = "block";subTVdiv.style.display = "none";subSFdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subCOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subWOdiv.style.display = "none";subDOdiv.style.display = "none";subMUdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subAAdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Sci-Fi & Fantasy !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aSF = document.createElement('a');
            aSF.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aSF);
            aSF.appendChild(document.createTextNode('Sci-Fi & Fantasy'));
            aSF.addEventListener('click', function (event) {
              if (subSFdiv.style.display == "none") { subSFdiv.style.display = "block";subTVdiv.style.display = "none";subAAdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subCOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subWOdiv.style.display = "none";subDOdiv.style.display = "none";subMUdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subSFdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Thrillers & Horror !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aTH = document.createElement('a');
            aTH.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aTH);
            aTH.appendChild(document.createTextNode('Thrillers & Horror'));
            aTH.addEventListener('click', function (event) {
              if (subTHdiv.style.display == "none") { subTHdiv.style.display = "block";subHOdiv.style.display = "block";subTVdiv.style.display = "none";subAAdiv.style.display = "none";subSFdiv.style.display = "none";subCOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subWOdiv.style.display = "none";subDOdiv.style.display = "none";subMUdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subTHdiv.style.display = "none"; subHOdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Comedies !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aCO = document.createElement('a');
            aCO.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aCO);
            aCO.appendChild(document.createTextNode('Comedies'));
            aCO.addEventListener('click', function (event) {
              if (subCOdiv.style.display == "none") {subCOdiv.style.display = "block";subTVdiv.style.display = "none";subAAdiv.style.display = "none";subSFdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subWOdiv.style.display = "none";subDOdiv.style.display = "none";subMUdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subCOdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Dramas !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aDR = document.createElement('a');
            aDR.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aDR);
            aDR.appendChild(document.createTextNode('Dramas & Romantics'));
            aDR.addEventListener('click', function (event) {
              if (subDRdiv.style.display == "none") { subDRdiv.style.display = "block";subROdiv.style.display = "block";subTVdiv.style.display = "none";subAAdiv.style.display = "none";subSFdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subCOdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subWOdiv.style.display = "none";subDOdiv.style.display = "none";subMUdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subDRdiv.style.display = "none"; subROdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Animes, Kids & Family !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aAN = document.createElement('a');
            aAN.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aAN);
            aAN.appendChild(document.createTextNode('Animes, Kids & Family'));
            aAN.addEventListener('click', function (event) {
              if (subANdiv.style.display == "none") { subANdiv.style.display = "block";subKIdiv.style.display = "block";subTVdiv.style.display = "none";subAAdiv.style.display = "none";subSFdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subCOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subWOdiv.style.display = "none";subDOdiv.style.display = "none";subMUdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subANdiv.style.display = "none"; subKIdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Worldwide !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aWO = document.createElement('a');
            aWO.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aWO);
            aWO.appendChild(document.createTextNode('Worldwide'));
            aWO.addEventListener('click', function (event) {
              if (subWOdiv.style.display == "none") { subWOdiv.style.display = "block";subTVdiv.style.display = "none";subAAdiv.style.display = "none";subSFdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subCOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subDOdiv.style.display = "none";subMUdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subANdiv.style.display = "none"; subWOdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Documentaries !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aDO = document.createElement('a');
            aDO.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aDO);
            aDO.appendChild(document.createTextNode('Documentaries'));
            aDO.addEventListener('click', function (event) {
              if (subDOdiv.style.display == "none") { subDOdiv.style.display = "block";subTVdiv.style.display = "none";subAAdiv.style.display = "none";subSFdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subCOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subWOdiv.style.display = "none";subMUdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subDOdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Music !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aMU = document.createElement('a');
            aMU.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aMU);
            aMU.appendChild(document.createTextNode('Music'));
            aMU.addEventListener('click', function (event) {
              if (subMUdiv.style.display == "none") { subMUdiv.style.display = "block";subTVdiv.style.display = "none";subAAdiv.style.display = "none";subSFdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subCOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subWOdiv.style.display = "none";subDOdiv.style.display = "none";subSPdiv.style.display = "none";subDIdiv.style.display = "none";
              } else { subMUdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Genre Sports & Divers !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var aSP = document.createElement('a');
            aSP.setAttribute('class', 'catsLinkcolor');
            li.appendChild(aSP);
            aSP.appendChild(document.createTextNode('Sports & Divers'));
            aSP.addEventListener('click', function (event) {
              if (subSPdiv.style.display == "none") { subSPdiv.style.display = "block";subDIdiv.style.display = "block";subTVdiv.style.display = "none";subAAdiv.style.display = "none";subSFdiv.style.display = "none";subTHdiv.style.display = "none";subHOdiv.style.display = "none";subCOdiv.style.display = "none";subDRdiv.style.display = "none";subROdiv.style.display = "none";subANdiv.style.display = "none";subKIdiv.style.display = "none";subWOdiv.style.display = "none";subDOdiv.style.display = "none";subMUdiv.style.display = "none";
              } else { subSPdiv.style.display = "none"; subDIdiv.style.display = "none"; }
            });
        var li = document.createElement('li'); // Even More Categories !
            li.setAttribute('class', 'liSubCats');
            subMenuCats.appendChild(li);
            var evenMoreCats = document.createElement('a');
            evenMoreCats.setAttribute('href', 'http://ogres-crypt.com/public/NetFlix-Streaming-Genres2.html');
            evenMoreCats.setAttribute('target', '_blank')
            evenMoreCats.setAttribute('class', 'catsLinkcolor moreCats');
            evenMoreCats.appendChild(document.createTextNode('Even More Categories...'));
            li.appendChild(evenMoreCats);

        /* generate menu TV Shows */
        var subTVdiv = document.createElement('div');
        subTVdiv.setAttribute('class', 'subDiv');
        subTVdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subTVdiv);
        var subTV = document.createElement('ul');
        var titleTV = document.createElement('h4');
        titleTV.setAttribute('class', 'titleCats');
        subTV.appendChild(titleTV);
        titleTV.appendChild(document.createTextNode("TV Shows"));
        subTVdiv.appendChild(subTV);
        for(var i = 0; i < menuItemsTV.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subTV.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsTV[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsTV[i].name));
        }
        /* generate menu Action & Adventure */
        var subAAdiv = document.createElement('div');
        subAAdiv.setAttribute('class', 'subDiv');
        subAAdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subAAdiv);
        var subAA = document.createElement('ul');
        var titleAA = document.createElement('h4');
        titleAA.setAttribute('class', 'titleCats');
        subAA.appendChild(titleAA);
        titleAA.appendChild(document.createTextNode("Action & Adventure"));
        subAAdiv.appendChild(subAA);
        for(var i = 0; i < menuItemsAA.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subAA.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsAA[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsAA[i].name));
        }
        /* generate menu Sci-Fi & Fantasy */
        var subSFdiv = document.createElement('div');
        subSFdiv.setAttribute('class', 'subDiv');
        subSFdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subSFdiv);
        var subSF = document.createElement('ul');
        var titleSF = document.createElement('h4');
        titleSF.setAttribute('class', 'titleCats');
        subSF.appendChild(titleSF);
        titleSF.appendChild(document.createTextNode("Sci-Fi & Fantasy"));
        subSFdiv.appendChild(subSF);
        for(var i = 0; i < menuItemsSF.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subSF.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsSF[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsSF[i].name));
        }
        /* generate menu Thrillers */
        var subTHdiv = document.createElement('div');
        subTHdiv.setAttribute('class', 'subDiv');
        subTHdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subTHdiv);
        var subTH = document.createElement('ul');
        var titleTH = document.createElement('h4');
        titleTH.setAttribute('class', 'titleCats');
        subTH.appendChild(titleTH);
        titleTH.appendChild(document.createTextNode("Thrillers"));
        subTHdiv.appendChild(subTH);
        for(var i = 0; i < menuItemsTH.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subTH.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsTH[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsTH[i].name));
        }
        /* generate menu Horror */
        var subHOdiv = document.createElement('div');
        subHOdiv.setAttribute('class', 'subDiv');
        subHOdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subHOdiv);
        var subHO = document.createElement('ul');
        var titleHO = document.createElement('h4');
        titleHO.setAttribute('class', 'titleCats');
        subHO.appendChild(titleHO);
        titleHO.appendChild(document.createTextNode("Horror"));
        subHOdiv.appendChild(subHO);
        for(var i = 0; i < menuItemsHO.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subHO.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsHO[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsHO[i].name));
        }
        /* generate menu Comedies */
        var subCOdiv = document.createElement('div');
        subCOdiv.setAttribute('class', 'subDiv');
        subCOdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subCOdiv);
        var subCO = document.createElement('ul');
        var titleCO = document.createElement('h4');
        titleCO.setAttribute('class', 'titleCats');
        subCO.appendChild(titleCO);
        titleCO.appendChild(document.createTextNode("Comedies"));
        subCOdiv.appendChild(subCO);
        for(var i = 0; i < menuItemsCO.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subCO.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsCO[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsCO[i].name));
        }
        /* generate menu Dramas */
        var subDRdiv = document.createElement('div');
        subDRdiv.setAttribute('class', 'subDiv');
        subDRdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subDRdiv);
        var subDR = document.createElement('ul');
        var titleDR = document.createElement('h4');
        titleDR.setAttribute('class', 'titleCats');
        subDR.appendChild(titleDR);
        titleDR.appendChild(document.createTextNode("Dramas"));
        subDRdiv.appendChild(subDR);
        for(var i = 0; i < menuItemsDR.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subDR.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsDR[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsDR[i].name));
        }
        /* generate menu Romantics */
        var subROdiv = document.createElement('div');
        subROdiv.setAttribute('class', 'subDiv');
        subROdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subROdiv);
        var subRO = document.createElement('ul');
        var titleRO = document.createElement('h4');
        titleRO.setAttribute('class', 'titleCats');
        subRO.appendChild(titleRO);
        titleRO.appendChild(document.createTextNode("Romantics"));
        subROdiv.appendChild(subRO);
        for(var i = 0; i < menuItemsRO.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subRO.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsRO[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsRO[i].name));
        }
        /* generate menu Animes */
        var subANdiv = document.createElement('div');
        subANdiv.setAttribute('class', 'subDiv');
        subANdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subANdiv);
        var subAN = document.createElement('ul');
        var titleAN = document.createElement('h4');
        titleAN.setAttribute('class', 'titleCats');
        subAN.appendChild(titleAN);
        titleAN.appendChild(document.createTextNode("Animes"));
        subANdiv.appendChild(subAN);
        for(var i = 0; i < menuItemsAN.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subAN.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsAN[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsAN[i].name));
        }
        /* generate menu Kids */
        var subKIdiv = document.createElement('div');
        subKIdiv.setAttribute('class', 'subDiv');
        subKIdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subKIdiv);
        var subKI = document.createElement('ul');
        var titleKI = document.createElement('h4');
        titleKI.setAttribute('class', 'titleCats');
        subKI.appendChild(titleKI);
        titleKI.appendChild(document.createTextNode("Kids & Family"));
        subKIdiv.appendChild(subKI);
        for(var i = 0; i < menuItemsKI.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subKI.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsKI[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsKI[i].name));
        }
        /* generate menu Worldwide */
        var subWOdiv = document.createElement('div');
        subWOdiv.setAttribute('class', 'subDiv');
        subWOdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subWOdiv);
        var subWO = document.createElement('ul');
        var titleWO = document.createElement('h4');
        titleWO.setAttribute('class', 'titleCats');
        subWO.appendChild(titleWO);
        titleWO.appendChild(document.createTextNode("Worldwide"));
        subWOdiv.appendChild(subWO);
        for(var i = 0; i < menuItemsWO.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subWO.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsWO[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsWO[i].name));
        }
        /* generate menu Documentaries */
        var subDOdiv = document.createElement('div');
        subDOdiv.setAttribute('class', 'subDiv');
        subDOdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subDOdiv);
        var subDO = document.createElement('ul');
        var titleDO = document.createElement('h4');
        titleDO.setAttribute('class', 'titleCats');
        subDO.appendChild(titleDO);
        titleDO.appendChild(document.createTextNode("Documentaries"));
        subDOdiv.appendChild(subDO);
        for(var i = 0; i < menuItemsDO.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subDO.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsDO[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsDO[i].name));
        }
        /* generate menu Music */
        var subMUdiv = document.createElement('div');
        subMUdiv.setAttribute('class', 'subDiv');
        subMUdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subMUdiv);
        var subMU = document.createElement('ul');
        var titleMU = document.createElement('h4');
        titleMU.setAttribute('class', 'titleCats');
        subMU.appendChild(titleMU);
        titleMU.appendChild(document.createTextNode("Music"));
        subMUdiv.appendChild(subMU);
        for(var i = 0; i < menuItemsMU.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subMU.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsMU[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsMU[i].name));
        }
        /* generate menu Sports */
        var subSPdiv = document.createElement('div');
        subSPdiv.setAttribute('class', 'subDiv');
        subSPdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subSPdiv);
        var subSP = document.createElement('ul');
        var titleSP = document.createElement('h4');
        titleSP.setAttribute('class', 'titleCats');
        subSP.appendChild(titleSP);
        titleSP.appendChild(document.createTextNode("Sports"));
        subSPdiv.appendChild(subSP);
        for(var i = 0; i < menuItemsSP.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subSP.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsSP[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsSP[i].name));
        }
        /* generate menu Divers */
        var subDIdiv= document.createElement('div');
        subDIdiv.setAttribute('class', 'subDiv');
        subDIdiv.setAttribute('style', 'display: none;');
        newCatsContainerDiv.appendChild(subDIdiv);
        var subDI = document.createElement('ul');
        var titleDI = document.createElement('h4');
        titleDI.setAttribute('class', 'titleCats');
        subDI.appendChild(titleDI);
        titleDI.appendChild(document.createTextNode("Divers"));
        subDIdiv.appendChild(subDI);
        for(var i = 0; i < menuItemsDI.length;i++) {
            var li = document.createElement('li');
            li.setAttribute('class', 'liCats');
            subDI.appendChild(li);
            var a = document.createElement('a');
            a.setAttribute('href', '/browse/genre/' + menuItemsDI[i].id);
            a.setAttribute('class', 'catsLinkcolor');
            li.appendChild(a);
            a.appendChild(document.createTextNode(menuItemsDI[i].name));
        }
    }, 60);
})();
