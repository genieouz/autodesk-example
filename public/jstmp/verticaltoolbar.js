///////////////////////////////////////////////////////////////////////////////

/////////////Autodesk.Research.TtIf.Extension.Toolbar//////////////////////////

///////////////////////////////////////////////////////////////////////////////

var markupGUI;
var markup;
var viewer;
var i=0;
AutodeskNamespace('Autodesk.Research.TtIf.Extension');

//import { db } from './mysql-connection.js';
//console.log(test.dtbase);

Autodesk.Research.TtIf.Extension.Toolbar = function (viewer, options) {

  Autodesk.Viewing.Extension.call(this, viewer, options);
  var _viewer = viewer;
  var _this = this;
  _this.load = function () {
    createToolbar();

    //load Markup Extension
    this.viewer.loadExtension('Autodesk.Viewing.MarkupsCore');
    this.viewer.loadExtension('Autodesk.Viewing.MarkupsGui');
    //var markupsStringData = require("test.svg");

    console.log('Autodesk.Research.TtIf.Extension.Toolbar loaded');
    return true;
  };

  _this.unload = function () {

    deleteToolbar();
    console.log('Autodesk.Research.TtIf.Extension.Toolbar unloaded');
    return true;
  };

  function createToolbar() {

    var toolbar = new Autodesk.Viewing.UI.ToolBar('toolbar-TtIf');
    var ctrlGroup = new Autodesk.Viewing.UI.ControlGroup (
      'Autodesk.Research.TtIf.Extension.Toolbar.ControlGroup'
    );

    ctrlGroup.addClass('toolbar-vertical-group');

    // Names, icons and tooltips for our toolbar buttons

    var names = ['Style', 'Text', 'Circle', 'Rectangle', 'Cloud', 'Arrow', 'Freehand', 'Polyline', 'Polycloud', 'Save', 'Exit'];

   // var icons = ['dashboard', 'fire', 'flash', 'dashboard', 'fire', 'flash', 'dashboard', 'fire', 'flash'];

    var tips = ['Style', 'Texte', 'Cercle', 'Rectangle', 'Nuage', 'Flèche', 'Dessin', 'Polyligne', 'Polynuage', 'Enregistrer', 'Quitter'];

    // Operations for when the buttons are clicked

    var clicks =
    [
      function() {
        $(document).ready(function(){
          $('#toolbar-markupTool').trigger('click');
        });
      },

      function () { 
        markup = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        if(markup != null){
          markup.enterEditMode();
          var cloud = new Autodesk.Viewing.Extensions.Markups.Core.EditModeText(markup);
          markup.changeEditMode(cloud);
        } else{ console.log ('Markup est null !!'); }
          console.log('Edit Text clicked'); 
      },

      function () { 
        markup = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        if(markup != null){
          markup.enterEditMode();
          var cloud = new Autodesk.Viewing.Extensions.Markups.Core.EditModeCircle(markup);
          markup.changeEditMode(cloud);
        } else{ console.log ('Markup est null !!'); }
        console.log('Edit Circle clicked'); 
      },

      function () { 
        markup = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        if(markup != null){
          markup.enterEditMode();
          var cloud = new Autodesk.Viewing.Extensions.Markups.Core.EditModeRectangle(markup);
          markup.changeEditMode(cloud);
        } else{ console.log ('Markup est null !!'); }
        console.log('Edit Rectangle clicked'); 
      },

      function () { 
        markup = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        if(markup != null){
          markup.enterEditMode();
          var cloud = new Autodesk.Viewing.Extensions.Markups.Core.EditModeCloud(markup);
          markup.changeEditMode(cloud);
        } else{ console.log ('Markup est null !!'); }
        console.log('Edit Cloud clicked'); 
      },

      function () { 
        markup = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        if(markup != null){
          markup.enterEditMode();
          var cloud = new Autodesk.Viewing.Extensions.Markups.Core.EditModeArrow(markup);
          markup.changeEditMode(cloud);
        } else{ console.log ('Markup est null !!'); }
        console.log('Edit Arrow clicked'); 
      },

      function () { 
        markup = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        if(markup != null){
          markup.enterEditMode();
          var cloud = new Autodesk.Viewing.Extensions.Markups.Core.EditModeFreehand(markup);
          markup.changeEditMode(cloud);
        } else{ console.log ('Markup est null !!'); }
        console.log('Edit Freehand clicked'); 
      },

      function () { 
        markup = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        if(markup != null){
          markup.enterEditMode();
          var cloud = new Autodesk.Viewing.Extensions.Markups.Core.EditModePolyline(markup);
          markup.changeEditMode(cloud);
        } else{ console.log ('Markup est null !!'); }
        console.log('Edit Polyline clicked'); 
      },

      function () { 
        markup = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        if(markup != null){
          markup.enterEditMode();
          var cloud = new Autodesk.Viewing.Extensions.Markups.Core.EditModePolycloud(markup);
          markup.changeEditMode(cloud);
        } else{ console.log ('Markup est null !!'); }
        console.log('Edit Polycloud clicked'); 
      },

      function () { 
        markup = viewer.getExtension('Autodesk.Viewing.MarkupsCore');
        if(markup != null){
          var markupsStringData = markup.generateData();
          markup.leaveEditMode(); // Very important!!
          //console.log("markups", markupsStringData);
          var saved = markup.loadMarkups(markupsStringData, "Layer_1");
          //markup.show();
          console.log("markups loaded");
        } else{ console.log ('Markup est null !!'); }
        console.log('Annotations enregistrées'); 
      },

      function () { 
        viewer.unloadExtension('Autodesk.Viewing.MarkupsCore');
        //_this.unload();
        viewer.loadExtension('Autodesk.Viewing.MarkupsCore');
        viewer.loadExtension('Autodesk.Viewing.MarkupsGui');
      }

    ]
    // Operations for when buttons are unclicked (i.e. toggled off)

    // If false, then the button won't have any 'state'

    var unclicks =

    [
      function () { console.log('Dashboard clicked'); },

      function () { console.log('Temperature clicked'); }
    ]

    // The loop to create our buttons

    var button;

    for (var i = 0; i < names.length; i++) {

      // Start by creating the button
      button = new Autodesk.Viewing.UI.Button(
        'Autodesk.Research.TtIf.Extension.Toolbar.' + names[i]
      );

      button.setIcon(names[i]); 

      // Assign an icon

     /* if (icons[i] && icons[i] !== '') {

        button.icon.classList.add('myicon');

        button.icon.classList.add('glyphicon');

        button.icon.classList.add('glyphicon-' + icons[i]);

      }*/

      // Set the tooltip

      button.setToolTip(tips[i]);

      // Only create a toggler for our button if it has an unclick operation

      if (unclicks[i]) {
        button.onClick = createToggler(button, clicks[i], unclicks[i]);
      }
      else {
        button.onClick = clicks[i];
      }

      ctrlGroup.addControl(button);
    }

    toolbar.addControl(ctrlGroup);

    var toolbarDivHtml = '<div id="divToolbar"> </div>';

    $(_viewer.container).append(toolbarDivHtml);

    // We want our toolbar to be centered vertically on the page

    toolbar.centerToolBar = function () {

      $('#divToolbar').css({

        'top': 'calc(50% + ' + toolbar.getDimensions().height / 2 + 'px)'

      });

    };

    toolbar.addEventListener(
      Autodesk.Viewing.UI.ToolBar.Event.SIZE_CHANGED,
      toolbar.centerToolBar
    );

    // Start by placing our toolbar off-screen (top: 0%)

    $('#divToolbar').css({

      'top': '0%',
      'left': '0%',
      'z-index': '100',
      'position': 'absolute'

    });

    $('#divToolbar')[0].appendChild(toolbar.container);

    // After a delay we'll center it on screen
    setTimeout(function () { toolbar.centerToolBar(); }, 100);

  }

  function deleteToolbar() {
    $('#divToolbar').remove();
  }

   function createToggler(button, click, unclick) {
    return function () {
      var state = button.getState();

      if (state === Autodesk.Viewing.UI.Button.State.INACTIVE) {
        button.setState(Autodesk.Viewing.UI.Button.State.ACTIVE);
        click();
      } else if (state === Autodesk.Viewing.UI.Button.State.ACTIVE) {
        button.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
        unclick();
      }
    };
  }

  function setVisibility(panel, flag) {
    if (panel)
      panel.setVisible(flag);
  }

  function chargerExtension(markup){

  }

  var css = [
    '.myicon {',

      'font-size: 20px;',

      'padding-top: 1px !important;',

    '}',

    '.toolbar-vertical-group > .adsk-button > .adsk-control-tooltip {',

      'left: 120%;',

      'bottom: 25%;',

    '}'

  ].join('\n');

  $('<style type="text/css">' + css + '</style>').appendTo('head');

};

$(function() {
  document.getElementsByTagName('body')[0].addEventListener("DOMNodeInserted", function (ev) {
    var alreadyUpdated=false;
    var markupToolsUI = $('.lmv-markup-gui-toolbar-content');
    if(markupToolsUI.length>0 && !alreadyUpdated){
      alreadyUpdated=true;
      var markupBtns = markupToolsUI.eq(0).find('button');
      markupBtns.addClass('Markups-Buttons-UI');
      markupToolsUI.eq(0).find('select').addClass('Markups-Select-UI');
      markupToolsUI.eq(0).find('span').addClass('Markups-Span-UI');
    }

    //cacher le markupGui bouton
    $("#toolbar-markupTool").hide();

    /*$(".lmv-markup-editmode-done").replaceWith(`<button class="markupGui-exit Markups-Buttons-UI">Exit</button>`);

    $(".markupGui-exit").click(function(){
      if(markup){
        var svg = markup.generateData();
        markup.leaveEditMode();
        markup.loadMarkups(svg, "Layer");
      }
    });*/

    //$('.lmv-markup-gui-collapse-content').attr("style", "display : none");

  })
})
$(document).on('click','.lmv-markup-editmode-done',function(){
  setTimeout(function(){
    if(markup){
      var svg = markup.generateData();
      markup.leaveEditMode();
      markup.loadMarkups(svg, "Layer_"+(i++));
    }
  },1000)
})

Autodesk.Research.TtIf.Extension.Toolbar.prototype =  Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.Research.TtIf.Extension.Toolbar.prototype.constructor = Autodesk.Research.TtIf.Extension.Toolbar;

Autodesk.Viewing.theExtensionManager.registerExtension('VerticalToolbar',Autodesk.Research.TtIf.Extension.Toolbar);
