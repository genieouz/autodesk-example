var viewerApp;
var lmvDoc;
var viewables;
var indexGeom;

function launchViewer(urn) {
  if (viewerApp != null) {
    var thisviewer = viewerApp.getCurrentViewer();
    if (thisviewer) {
      thisviewer.tearDown()
      thisviewer.finish()
      thisviewer = null
      $("#forgeViewer").empty();
    }
  }

  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };
  var documentId = 'urn:' + urn;
  Autodesk.Viewing.Initializer(options, function onInitialized() {
    viewerApp = new Autodesk.Viewing.ViewingApplication('forgeViewer');
    viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D, { extensions: ['VerticalToolbar'] });
    viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });
}

function onDocumentLoadSuccess(doc) {
  // We could still make use of Document.getSubItemsWithProperties()
  // However, when using a ViewingApplication, we have access to the **bubble** attribute,
  // which references the root node of a graph that wraps each object from the Manifest JSON.
  viewables = viewerApp.bubble.search({ 'type': 'geometry' });
  if (viewables.length === 0) {
    console.error('Document contains no viewables.');
    return;
  }

  // Choose any of the available viewables
  viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
  indexGeom = 0;
  lmvDoc = doc;
  modeleThumbnails(); 
}

/******************************Load all models******************************/
var models=[],imodel=0;
function modeleThumbnails(){

  console.log(viewables.length);

  viewables.forEach(model => {
    models.push(model);
    $('#pagesPreview').append(`<div index-model="${imodel}" class="thumbnail"></div>`);
    imodel++;
  });
}
$(document).on('click','.thumbnail', function(e) {  
  // alert(element);
   var indexm=$(this).attr('index-model')

   loadSelectedModel(models[indexm]);
 });
function loadSelectedModel(model){
  viewerApp.selectItem(model.data, onItemLoadSuccess, onItemLoadFail);
}

function loadNextModel() {
  // Next geometry index. Loop back to 0 when overflown.
  indexGeom = (indexGeom + 1) % viewables.length;
  var nextGeom = viewables[indexGeom];
  viewerApp.selectItem(nextGeom.data, onItemLoadSuccess, onItemLoadFail);
  //alert('TODO: Load Next Model');
}

function loadPrevModel() {
  // Next geometry index. Loop back to 0 when overflown.
  indexGeom = (indexGeom - 1) % viewables.length;
  var nextGeom = viewables[indexGeom];
  viewerApp.selectItem(nextGeom.data, onItemLoadSuccess, onItemLoadFail);
  //alert('TODO: Load Previous Model');
}

/***************************Load all models end*****************************/

function onViewerToolbarCreated () {
    oViewer.removeEventListener (Autodesk.Viewing.TOOLBAR_CREATED_EVENT, onViewerToolbarCreated) ;
    createButton (
        'extractIO.DangerZone', 'extractIO.Delete',
        'url(/images/delete.24x24.png)', 'DANGER ZONE - Delete this project',
        function (evt) {
            evt.stopPropagation () ;
            if ( confirm ('Are you sure you want to delete that project?') ) {
                $.ajax ({
                    url: '/api/results/<%= root %>',
                    type: 'delete',
                    complete: null
                }).done (function (results) {
                    window.close () ;
                  console.log (results) ;
                }).fail (function (error) {
      console.error (error) ;
    }) ;
            }
}
    ) ;
    createButton (
        'extractIO.ExtractZone', 'extractIO.Extract',
        'url(/images/bubbles.png)', 'Extract this project',
        function (evt) {
            evt.stopPropagation () ;
            oExtractPanel.toggleVisibility () ;
        }
    ) ;
    oViewsCtrl =createComboButton (
        'extractIO.ExtractZone', 'extractIO.Views',
        'url(/images/views.png)', 'Select a 2D/3D view to load in the viewer'
    ) ;
  fillViewsList () ;
}
function onViewerGeometryLoaded () {
    oViewer.removeEventListener (Autodesk.Viewing.GEOMETRY_LOADED_EVENT, onViewerGeometryLoaded) ;
    oViewer.fitToView (true) ;
    setTimeout (function () { oViewer.autocam.setHomeViewFrom (oViewer.navigation.getCamera ()) ; }, 1000) ;
}

function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onItemLoadSuccess(viewer, item) {
  // item loaded, any custom action?
}

function onItemLoadFail(errorCode) {
  console.error('onItemLoadFail() - errorCode:' + errorCode);
}

function getForgeToken(callback) {
  jQuery.ajax({
    url: '/api/forge/oauth/token',
    success: function (res) {
      callback(res.access_token, res.expires_in)
    }
  });
}