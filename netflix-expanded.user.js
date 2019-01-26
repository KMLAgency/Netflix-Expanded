// ==UserScript==
// @name          Netflix Expanded
// @version       1.0
// @description   More visible content, Remove the billboard promotions and Disable Mouseover Trailers Auto-Preview, Add a "Go Top" Button, Centered player controls, Better Subtitles, Stretch video by default (remove black side) and add a button to control it!!
// @license       MIT
// @author        Loky (StellarisStudio)
// @icon          https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/05100836-b28d-4395-a29d-2f17b751c23f/dcc89w8-27bd9fa2-7ebd-4699-8b7f-383286d6e41d.png
// @namespace     https://github.com/StellarisStudio
// @supportURL    https://github.com/StellarisStudio/Tampermonkey-Scripts
// @homepageURL   https://github.com/StellarisStudio/Tampermonkey-Scripts
// @include       https://www.netflix.com/*
// @run-at        document-start
// @grant         GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

        // CSS
    var css = ( `
        .rowContainer .rowContent .slider .row-with-x-columns .slider-item { width:13%!important; }
        .title-artwork, .video-artwork { background-repeat:no-repeat; background-position:50% 50%; -moz-background-size:100% 100%; background-size:100% 100%; width:100%; padding:28.125% 0; border-radius:5px!important; }
        .lolomoRow.lolomoRow_title_card { margin:1vw 0!important; }
        .lolomo.is-fullbleed { margin-left:-3vw; }
        .slider .handle.handlePrev { left:3vw; }
        .indicator-icon, .slider-hover-trigger-layer:hover .slider .handle.active:hover .indicator-icon { color:#e50914; }
        .episodeWrapper .loadingTitle, .episodeWrapper .row-with-x-columns .slider-item, .placeholderEpisodes .loadingTitle,
         .placeholderEpisodes .row-with-x-columns .slider-item, .simsWrapper .loadingTitle, .simsWrapper .row-with-x-columns .slider-item,
         .trailerWrapper .loadingTitle, .trailerWrapper .row-with-x-columns .slider-item { width:17%!important; }
        .sliderItemHidden { display:block!important; }
        .boxart-container { border-radius:5px; }

        .billboard-row { display:none!important; }
        .pinning-header { height:70px; margin-bottom:40px!important; }
        .mainView .slider-item div.bob-card div.bob-video-merch-player-wrapper { display:none!important; }

        .imdb4nf-prefix, .imdb4nf-rating { color:#e8b708; }
        .imdb4nf-votes { font-size:10px; }

        video { object-fit:fill; }
        .player-timedtext-text-container { bottom:11%; margin:auto; width:65%; }
        .player-timedtext-text-container span { font-family:Arial,Helvetica,sans-serif,sans!important; font-size:1.03em; font-weight:bold; color:#fff; opacity:.7!important; letter-spacing:1px; -webkit-text-stroke:1px black; text-shadow:2.5px 2.5px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; }

        .PlayerControlsNeo__gradient-bottom { background-image:none; }
        .PlayerControlsNeo__bottom-controls {background-color:rgba(0,0,0,0.3); width:70%; bottom:-1em; margin:0 auto; border-radius:10px; }
        .time-remaining__time { color:#e50914; font-weight:bold; }
        .PlayerControlsNeo__button-control-row { width:85%; margin:auto; }
        .PlayerControlsNeo__bottom-controls .nfp-button-control { width:1em; }
        .button-nfplayerBackTen { margin-left:1em; }
        .svg-icon.svg-icon-nfplayerBackTen, .svg-icon.svg-icon-nfplayerFastForward { width:.9em!important; }
        .svg-icon.svg-icon-nfplayerReportAProblem { width:.7em!important; opacity:.5; }
        .button-nfplayerNextEpisode, .button-nfplayerEpisodes, .button-nfplayerSubtitles, .button-nfplayerFullscreen { margin:0 .5em; }
        .svg-icon-volumeMuted { fill:#e50914!important; stroke:#e50914!important; }
        .PlayerControls--control-element.video-title h4{ display:block!important; }
        .PlayerControls--control-element.video-title span{ color:#e50914; opacity:.7; }

        .newButton { width:5em; height:4.5em; background:none; box-sizing:border-box; border:3px solid transparent; padding:0; margin:-13px 0 0 10px; }
        .strechIco { width:100%; }

        #scrollTop { display:none; position:fixed; right:2em; bottom:2em; padding:5px; color:#e5e5e5; background-color:#e50914; opacity:.5; border:1px solid #e50914; border-radius:8px; z-index:9999; }
        #scrollTop:hover { color:#e50914; background-color:transparent; opacity:1; border:1px solid #e50914; }
        #scrollTop:focus { outline:none; }
        .arrow-up { width:0; height:0; border-left:10px solid transparent; border-right:10px solid transparent; border-bottom:10px solid white; border-radius:4px; }
        #scrollTop:hover .arrow-up { border-bottom:10px solid #e50914; }

        body::-webkit-scrollbar { width:.5em; }
        body::-webkit-scrollbar-track { -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3); }
        body::-webkit-scrollbar-thumb { background-color:#e50914; outline:1px solid slategrey; }
    ` );

    /* Inject the CSS */
    //if (typeof GM_addStyle != "undefined") { GM_addStyle(css);
    //} else if (typeof PRO_addStyle != "undefined") { PRO_addStyle(css);
    //} else if (typeof addStyle != "undefined") { addStyle(css);
    //} else {
       var sheet = document.createElement("style");
       sheet.type = "text/css";
       sheet.appendChild(document.createTextNode(css));
       var heads = document.getElementsByTagName("head");
         if (heads.length > 0) { heads[0].appendChild(sheet);
         } else { document.documentElement.appendChild(sheet); } // no head yet, stick it whereever
    //}

    /* Disable Mouseover Trailers Auto-Preview */
    var config = { disableJawBoneBigPreview: false };
    var observer = new MutationObserver(function(mutations) {
        for (var mutation of mutations) {
            for (var node of mutation.addedNodes) {
                if (node.nodeType === 1 && node.tagName === 'VIDEO') {
                    if (config.disableJawBoneBigPreview || !node.matches('.jawBoneContainer video')) {
                        node.muted = "true";
                        node.remove();
                    }
                } else if (node.className == 'bob-video-merch-player-wrapper') {
                    node.remove();
                }
            }
        }
    });
    window.setTimeout(function() {
      observer.observe(document.querySelector('#appMountPoint'), { childList: true, subtree: true });
  }, 500);

    function goTop() { scroll(0, 0); } // create the Go Top function!
    /* create The Go Top Button */
    var backTop = document.createElement('button');
    backTop.setAttribute('id', 'scrollTop');
    backTop.href = "javascript:void(0);";
    backTop.addEventListener("click", goTop, false);
    var innerTop = document.createElement('div');
    innerTop.setAttribute('class', 'arrow-up');
    backTop.appendChild(innerTop);
    var body = document.getElementsByTagName("body");
      if (body.length > 0) { body[0].appendChild(backTop);
      } else { document.documentElement.appendChild(backTop); } // no head yet, stick it whereever

    /* Show the Go Top Button on Scroll */
    window.onscroll = function(ev) {
        var scrollToTop = document.getElementById('scrollTop');
          if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
              scrollToTop.style.display = 'block';
          } else{ scrollToTop.style.display = 'none'; }
    }

    /* create a Button on the Player Control to expand or not the video */
    window.setTimeout(function() {
      var strechIco = new Image();
      strechIco.src = 'https://www.freeiconspng.com/uploads/white-full-screen-icon-5.png';
      strechIco.setAttribute('class', 'strechIco');
      var FlixPlayer = document.getElementsByClassName('PlayerControlsNeo__button-control-row');
      var newButton = document.createElement('button');
      newButton.setAttribute('class', 'newButton');
      newButton.appendChild(strechIco);
      FlixPlayer[0].appendChild(newButton);
      var FlixVideo = document.querySelector('video');
        newButton.addEventListener('click', function (event) { // function to toggle the video size
           if (FlixVideo.style.objectFit == "contain") { FlixVideo.style.objectFit = "fill";
           } else { FlixVideo.style.objectFit = "contain"; }
        });
    }, 10000);
})();
