define(['dojo/_base/declare', 'jimu/BaseWidget'],
function(declare, BaseWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'widget-consulta-proyecto',
    // this property is set by the framework when widget is loaded.
    // name: 'Widget-ConsultaProyecto',
    // add additional properties here

    /* Cambiar el tamaño del widget */
    _getPanel: function(paramWidget, paramHeight) {  
        try {
            // paramWidget, paramHeight
            let panel = this.getPanel();
            let pos = panel.position;
            pos.width = paramWidget;
            pos.height = paramHeight;
            panel.setPosition(pos);
        } catch (error) {
            console.log(`_getPanel: ${error.name} - ${error.message}`);
        }
    },

    _onClickProyectoBuscar: function() {
        try {
            console.log("_onClickProyectoBuscar");
        } catch (error) {
            console.log(`Error: _onClickProyectoBuscar ${error.name} - ${error.message}`);
        }
    },

    _onClickProyectoLimpiar: function() {
        try {
            this.ID_ProyectoSNIP.value = "";
            this.ID_ProyectoNombre.value = "";
        } catch (error) {
            console.log(`Error: _onClickProyectoLimpiar ${error.name} - ${error.message}`);
        }
    },

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      /* Cambiar el tamaño del widget */
      this._getPanel(330, 190);
      console.log('Widget-ConsultaProyecto::postCreate');
    }

    // startup: function() {
    //   this.inherited(arguments);
    //   console.log('Widget-ConsultaProyecto::startup');
    // },

    // onOpen: function(){
    //   console.log('Widget-ConsultaProyecto::onOpen');
    // },

    // onClose: function(){
    //   console.log('Widget-ConsultaProyecto::onClose');
    // },

    // onMinimize: function(){
    //   console.log('Widget-ConsultaProyecto::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('Widget-ConsultaProyecto::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('Widget-ConsultaProyecto::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('Widget-ConsultaProyecto::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('Widget-ConsultaProyecto::onPositionChange');
    // },

    // resize: function(){
    //   console.log('Widget-ConsultaProyecto::resize');
    // }

    //methods to communication between widgets:

  });

});
