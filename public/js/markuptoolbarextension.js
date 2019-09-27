// *******************************************
// Markup Toolbar Extension
// *******************************************
function ModelSummaryExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    this.panel = null; // create the panel variable
}

ModelSummaryExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
ModelSummaryExtension.prototype.constructor = ModelSummaryExtension;

ModelSummaryExtension.prototype.load = function () {
    if (this.viewer.toolbar) {
        // Toolbar is already available, create the UI
        this.createUI();
    } else {
        // Toolbar hasn't been created yet, wait until we get notification of its creation
        this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
        this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }
    return true;
};

ModelSummaryExtension.prototype.onToolbarCreated = function () {
    this.viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
};

ModelSummaryExtension.prototype.createUI = function () {
    var _this = this;

    // prepare to execute the button action
    var modelSummaryToolbarButton = new Autodesk.Viewing.UI.Button('runModelSummaryCode');
    modelSummaryToolbarButton.onClick = function (e) {

    _this.viewer.loadExtension('VerticalToolbar');
        
    };

    // modelSummaryToolbarButton CSS class should be defined on your .css file
    // you may include icons, below is a sample class:
    modelSummaryToolbarButton.addClass('modelSummaryToolbarButton');
    modelSummaryToolbarButton.setToolTip('Annoter');

    // SubToolbar
    this.subToolbar = (this.viewer.toolbar.getControl("MyAppToolbar") ?
        this.viewer.toolbar.getControl("MyAppToolbar") :
        new Autodesk.Viewing.UI.ControlGroup('MyAppToolbar'));
    this.subToolbar.addControl(modelSummaryToolbarButton);

    this.viewer.toolbar.addControl(this.subToolbar);
};

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

ModelSummaryExtension.prototype.unload = function () {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
};

ModelSummaryExtension.prototype.getAllLeafComponents = function (callback) {
    var cbCount = 0; // count pending callbacks
    var components = []; // store the results
    var tree; // the instance tree

    function getLeafComponentsRec(parent) {
        cbCount++;
        if (tree.getChildCount(parent) != 0) {
            tree.enumNodeChildren(parent, function (children) {
                getLeafComponentsRec(children);
            }, false);
        } else {
            components.push(parent);
        }
        if (--cbCount == 0) callback(components);
    }
    this.viewer.getObjectTree(function (objectTree) {
        tree = objectTree;
        var allLeafComponents = getLeafComponentsRec(tree.getRootId());
    });
};

// *******************************************
// Model Summary Panel
// *******************************************
function ModelSummaryPanel(viewer, container, id, title, options) {
    this.viewer = viewer;
    Autodesk.Viewing.UI.PropertyPanel.call(this, container, id, title, options);
}
ModelSummaryPanel.prototype = Object.create(Autodesk.Viewing.UI.PropertyPanel.prototype);
ModelSummaryPanel.prototype.constructor = ModelSummaryPanel;

Autodesk.Viewing.theExtensionManager.registerExtension('MarkupToolbarExtension', ModelSummaryExtension);