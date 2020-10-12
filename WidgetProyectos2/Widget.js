/*
  Perfil:           GIS Developer
  Autor:            Ing. Heber Daniel Ramos Mendoza
  Web Site:         https://hdramosmendoza.github.io/Perfil-Profesional/
  Social Networks:  HDRamosMendoza
  University:       Universidad de Ciencias y Humanidades
                    https://www.uch.edu.pe/

  Copyright:        Ministerio de Vivienda, Construcción y Saneamiento
  Date:             18/09/2020
                    Lima - Perú
*/
define([
    'esri/layers/FeatureLayer',    
    'esri/symbols/TextSymbol',
    'esri/layers/LabelClass',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/renderers/SimpleRenderer',   
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'dojo/query',
    'esri/Color',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'jimu/BaseWidget'
],
function(
    FeatureLayer,
    TextSymbol,
    LabelClass,
    SimpleLineSymbol,
    SimpleFillSymbol,
    SimpleRenderer,
    Query,
    QueryTask,
    query,
    Color,
    declare,
    lang,
    BaseWidget
) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {

    // Custom widget code goes here

    baseClass: 'widget-proyectos2',
    // this property is set by the framework when widget is loaded.
    // name: 'WidgetProyectos2',
    // add additional properties here

    // FIELD Departamento
    departamento: {
      "OBJECTID":"objectid",
      "IDDEPARTAMENTO":"id_dpto",
      "NAME_DEPARTAMENTO":"nom_dep"
    },
    // FIELD Provincia
    provincia: {
      "OBJECTID":"objectid",
      "IDDEPARTAMENTO":"id_dpto",
      "NAME_DEPARTAMENTO":"nom_dep",
      "IDPROVINCIA":"id_prov",
      "NAME_PROVINCIA":"nom_prov",
    },
    // FIELD Distrito
    distrito: {
      "OBJECTID":"objectid",
      "IDDEPARTAMENTO":"id_dep",
      "NAME_DEPARTAMENTO":"nom_dep",
      "IDPROVINCIA":"id_prov",
      "NAME_PROVINCIA":"nom_prov",
      "IDDISTRITO":"id_dist",
      "NAME_DISTRITO":"nom_dist"
    },
    
    // ************** DEPARTAMENTO //
    // Query
    queryDepartamento: new Query(),
    // Query Task
    queryTaskDepartamento: new QueryTask (
      "https://dportalgis.vivienda.gob.pe/dfdserver/rest/services/OGEI/limites_peru/MapServer/6"
    ),
    // Feature Layer
    featureLayerDepartamento: new FeatureLayer(
      "https://dportalgis.vivienda.gob.pe/dfdserver/rest/services/OGEI/limites_peru/MapServer/6",
      {
        id:"Departamento2", outFields: ["*"],
        mode: FeatureLayer.MODE_SELECTION,
        showLabels: true
      }
    ),
    // ************** DEPARTAMENTO //

    // ************** PROVINCIA //
    // Query
    queryProvincia: new Query(),
    // Query Task
    queryTaskProvincia: new QueryTask (
      "https://dportalgis.vivienda.gob.pe/dfdserver/rest/services/OGEI/limites_peru/MapServer/8"
    ),
    // Feature Layer
    featureLayerProvincia: new FeatureLayer(
      "https://dportalgis.vivienda.gob.pe/dfdserver/rest/services/OGEI/limites_peru/MapServer/8",
      {
        id:"Provincia2", outFields: ["OBJECTID"],
        mode: FeatureLayer.MODE_SELECTION,
        showLabels: true
      }
    ),
    // ************** PROVINCIA //

    // ************** DISTRITO //
    queryDistrito: new Query(),
    // Query Task
    queryTaskDistrito: new QueryTask (
      "https://dportalgis.vivienda.gob.pe/dfdserver/rest/services/OGEI/limites_peru/MapServer/7"
    ),
    // Feature Layer
    featureLayerDistrito: new FeatureLayer(
      "https://dportalgis.vivienda.gob.pe/dfdserver/rest/services/OGEI/limites_peru/MapServer/7",
      {
        id:"Distrito2", outFields: ["OBJECTID"],
        mode: FeatureLayer.MODE_SELECTION,
        showLabels: true
      }
    ),
    // ************** DISTRITO //

    /* Configurar departamentos */
    _settingDepartamento: function() {
      this.queryDepartamento.returnGeometry = true;
      this.queryDepartamento.outFields = [
        this.departamento.OBJECTID,
        this.departamento.IDDEPARTAMENTO,
        this.departamento.NAME_DEPARTAMENTO
      ];      
      this.featureLayerDepartamento.setScaleRange(0,0);
      this.featureLayerDepartamento.setRenderer(
        this._fillLineColor("solid","solid","#D10202",1.5,[209,2,2,0])
      );
      // Se adiciona al mapa
      //this is the very least of what should be set within the JSON  
        var json = {
          "labelExpressionInfo": {"value": "{nom_dep}"}
        };
        //create instance of LabelClass (note: multiple LabelClasses can be passed in as an array)
        var labelClass = new LabelClass(json);
        this.featureLayerDepartamento.setLabelingInfo([ labelClass ]);

      lang.setObject('_wabProperties.isTemporaryLayer', true, this.featureLayerDepartamento);
      // Se adiciona al mapa
      this.map.addLayer(this.featureLayerDepartamento);
    },

    /* Configurar provincias */
    _settingProvincia: function() {
      this.queryProvincia.returnGeometry = true;
      this.queryProvincia.outFields = [
        this.provincia.OBJECTID,
        this.provincia.IDDEPARTAMENTO,
        this.provincia.NAME_DEPARTAMENTO,
        this.provincia.IDPROVINCIA,
        this.provincia.NAME_PROVINCIA,
      ];
      this.featureLayerProvincia.setScaleRange(0,0);
      this.featureLayerProvincia.setRenderer(
        this._fillLineColor("solid","solid","#FF0202",1.5,[255,2,2,0])
      );
      lang.setObject('_wabProperties.isTemporaryLayer', true, this.featureLayerProvincia);
      // Se adiciona al mapa
      this.map.addLayer(this.featureLayerProvincia);
    },

    /* Configurar provincias */
    _settingDistrito: function() {
      this.queryDistrito.returnGeometry = true;
      this.queryDistrito.outFields = [
        this.distrito.OBJECTID,
        this.distrito.IDDEPARTAMENTO,
        this.distrito.NAME_DEPARTAMENTO,
        this.distrito.IDPROVINCIA,
        this.distrito.NAME_PROVINCIA,
        this.distrito.IDDISTRITO,
        this.distrito.NAME_DISTRITO,
      ];      
      this.featureLayerDistrito.setScaleRange(0,0);
      this.featureLayerDistrito.setRenderer (
        this._fillLineColor("solid","solid","#FF7575",1.5,[255,117,117,0.1])
      );
      lang.setObject('_wabProperties.isTemporaryLayer', true, this.featureLayerDistrito);
      //Se adiciona al mapa
      this.map.addLayer(this.featureLayerDistrito);
    },

    /* Color de línea */
    _lineColor: function(color){
      if(color == null){
        return color;
      }else{
        return (color = new Color(color));
      }
    },

    /* Contornos de colores */
    _fillLineColor: function(fill1, line1, line2, line3, color) {
      return (
        new SimpleRenderer(
          new SimpleFillSymbol(
            fill1, 
            new SimpleLineSymbol(
              line1,this._lineColor(line2), line3
            ), 
            this._lineColor(color)
          )
        )
      );
    }, 

    _clearNodes: function(item) {
      for(let i = 1; i<item.length; i= i+2) {
        item[i].style["background-color"] = "#FFFFFF";
      }
    },



    _zoomDistrito: function (objectId, booleanZoom) {
      try {
        let query = new Query();
        query.objectIds = [objectId];
        // Zoom - Object GIS
        this.featureLayerDistrito.selectFeatures (
          query, FeatureLayer.SELECTION_NEW, function (features) {
            if(booleanZoom){
              this.map.setExtent (features[0].geometry.getExtent().expand(1.6));
            }
          }.bind(this)
        );
      } catch (error) {
        console.log("Error: _zoomDistrito " + error.name + " - " + error.message);
      }
    },

    _onClickDistrito: function(){
      try {
        thisValue = event.target;
        if(thisValue.attributes["data-distritoId"].value != "") {
          // Limpiar selección
          this._clearNodes(thisValue.parentNode.childNodes);
          // Pinta la selección
          thisValue.style["background-color"] = "#D6DDEB";
          this._zoomDistrito(
            thisValue.attributes["data-objectId"].value,
            this.ID_ZoomEspecifico.checked
          );
          this.itemGeometry = Window.itemFeaturesDistrito[thisValue.attributes["data-distritoPolygon"].value].geometry;
        }
      } catch (error) {
        console.log("Error: _onClickDistrito " + error.name + " - " + error.message);
      } 
    },

    // Error - Select PROVINCIA
    _errorDistrito: function(item) {
      try {
        let tagHtml = [];
        tagHtml.push( "\
          <li class=\"list-group-item\" \
            data-objectId=\"\" \
            data-provinciaId=\"\"> \
            Error al cargar \
          </li>"
        );
        this.featureLayerDistrito.clearSelection();
        this.CboDistrito.innerHTML = tagHtml.join("");
      } catch (error) {
          console.log("Error: _errorDistrito " + error.name + " - " + error.message);
      }
    },

    _callDistrito: function(item) {
      try {
        let tagHtml = [];
        if(item != null) { 
          Window.itemFeaturesDistrito = itemFeatures = item.features;
          featuresLength = itemFeatures.length;
          for(let i = 0; i < featuresLength; i++) {
            featureAttributes = item.features[i].attributes;
            tagHtml.push( "\
              <li class=\"list-group-item\" \
                data-objectId=\" " + featureAttributes[this.distrito.OBJECTID] + " \" \
                data-distritoId=\" " + featureAttributes[this.distrito.IDDISTRITO] + " \" \
                data-distritoPolygon=\"" + i + "\" >\
                " + featureAttributes[this.distrito.NAME_DISTRITO] + "\
              </li>"
            );
          }
        } else {
          tagHtml.push("\
            <li class=\"list-group-item\" >\
              <p class=\"font-italic\">Seleccione Provincia</p> \
            </li>"
          );
        }
        this.featureLayerDistrito.clearSelection();
        this.CboDistrito.innerHTML = tagHtml.join("");
      } catch (error) {
          console.log("Error: _callDistrito " + error.message);
      }
    },

    _zoomProvincia: function (objectId, booleanZoom) {
      try {
        let query = new Query();
        query.objectIds = [objectId];
        // Zoom - Object GIS
        this.featureLayerProvincia.selectFeatures (
          query, FeatureLayer.SELECTION_NEW, function (features) {
            if(booleanZoom) {
              this.map.setExtent(features[0].geometry.getExtent().expand(1.6));
            }
          }.bind(this)
        );
      } catch (error) {
        console.log("Error: _zoomProvincia " + error.name + " - " + error.message);
      }
    },

    _onClickProvincia: function(){
      try {
        thisValue = event.target;
        if(thisValue.attributes["data-provinciaId"].value != "") {
          // Limpiar selección
          this._clearNodes(thisValue.parentNode.childNodes);
          // Pinta la selección
          thisValue.style["background-color"] = "#D6DDEB";
          this._zoomProvincia(
            thisValue.attributes["data-objectId"].value,
            this.ID_ZoomEspecifico.checked
          );
          // Load - Provincia
          this.queryDistrito.where = ""
            + this.distrito.IDDEPARTAMENTO + " = '" + thisValue.attributes["data-departamentoId"].value.trim() + "' AND "
            + this.distrito.IDPROVINCIA + " = '" + thisValue.attributes["data-provinciaId"].value.trim()  + "'";

          this.queryTaskDistrito.execute(
            this.queryDistrito,
            this._callDistrito.bind(this),
            this._errorDistrito.bind(this)
          );
          
          //this.itemGeometry = Window.itemFeaturesProvincia[thisValue.attributes["data-provinciaPolygon"].value].geometry;
        }
      } catch (error) {
        console.log("Error: _onClickProvincia " + error.name + " - " + error.message);
      }
    },

    // Error - Select PROVINCIA
    _errorProvincia: function(item) {
      try {
        let tagHtml = [];
          tagHtml.push( "\
            <li class=\"list-group-item\" \
              data-objectId=\"\" \
              data-provinciaId=\"\"> \
              Error al cargar \
            </li>"
          );
        this.featureLayerProvincia.clearSelection();
        this.CboProvincia.innerHTML = tagHtml.join("");
      } catch (error) {
          console.log("Error: _errorProvincia " + error.name + " - " + error.message);
      }
    },

    // Load - Select PROVINCIAL
    _callProvincia: function(item) {
      try {
        let tagHtml = [];
        if(item != null) {
          Window.itemFeaturesProvincia = itemFeatures = item.features;
          featuresLength = itemFeatures.length;
          for(let i = 0; i < featuresLength; i++) {
            this.featureAttributes = item.features[i].attributes;
            tagHtml.push( "\
              <li class=\"list-group-item\" \
                data-objectId=\"" + this.featureAttributes[this.provincia.OBJECTID] + " \"\
                data-departamentoId=\""+ this.featureAttributes[this.provincia.IDDEPARTAMENTO] + " \" \
                data-provinciaId=\""+ this.featureAttributes[this.provincia.IDPROVINCIA] + "\" \
                data-provinciaPolygon=\"" + i + "\" >\
                "+ this.featureAttributes[this.provincia.NAME_PROVINCIA] + "\
              </li>"
            );
          }
        } else {
          tagHtml.push("\
            <li class=\"list-group-item\" >\
              <p class=\"font-italic\">Seleccione Departamento</p> \
            </li>"
          );
        }
        this._callDistrito(null);
        this.featureLayerProvincia.clearSelection();
        this.CboProvincia.innerHTML = tagHtml.join("");
      } catch (error) {
        console.log("Error: _callProvincia " + error.name + " - " + error.message);
      }
    },

    /* Realiza un acercameinto al departamento */
    _zoomDepartamento: function (objectId, booleanZoom) {
      // objectId. Es del departamento.
      // booleanZoom. Es del INPUT CHECKBOX.
      try {
        let query = new Query();
        query.objectIds = [objectId];
        // Zoom - Object GIS
        this.featureLayerDepartamento.selectFeatures (
          query, FeatureLayer.SELECTION_NEW, function (features) {
            /* Valida si el zoom se activa o no */
            if(booleanZoom) {
              this.map.setExtent(features[0].geometry.getExtent().expand(1.6));
            }
          }.bind(this)
        );
      } catch (error) {
        console.log("Error: _zoomDepartamento " + erro.name + " - " + error.message);
      }
    },

    _onClickDepartamento: function(){
      try {
        thisValue = event.target;
        // Valida que el ID no este vacío
        if(thisValue.attributes["data-departamentoId"].value != "") {
          this.queryProvincia.where = this.provincia.IDDEPARTAMENTO + " = '" + thisValue.attributes["data-departamentoId"].value.trim() +"'";
          this.queryTaskProvincia.execute(
            this.queryProvincia,
            this._callProvincia.bind(this),
            this._errorProvincia.bind(this)
          );
          // Limpiar selección
          this._clearNodes(thisValue.parentNode.childNodes);
          // Pinta la selección al DEPARTAMENTO
          thisValue.style["background-color"] = "#D6DDEB";
          // Acercamiento DEPARTAMENTO
          this._zoomDepartamento (
            thisValue.attributes["data-objectId"].value,
            this.ID_ZoomEspecifico.checked
          );          
        }
      } catch (error) {
        console.log("Error: _onClickDepartamento " + error.name + " - "+ error.message);
      }
    },

    // Error - Select DEPARTAMENTAL
    _errorDepartamento: function(item) {
      try {
        let tagHtml = [];
          tagHtml.push( "\
            <li class=\"list-group-item\" \
              data-objectId=\"\" \
              data-departamentoId=\"\"> \
              Error al cargar \
            </li>"
          );
        this.featureLayerDepartamento.clearSelection();
        this.CboDepartamento.innerHTML = tagHtml.join("");
      } catch (error) {
          console.log("Error: _callDepartamento " + error.name + " - " + error.message);
      }
    },

    _callDepartamento: function(item) {
      try {
        let tagHtml = [];
        this.featureLayerDepartamento.clearSelection();
        if(item != null) {
          Window.itemFeaturesDepartamento = this.featuresLength = item.features;
          this.featuresLength = this.featuresLength.length;
          for(let i = 0; i < this.featuresLength; i++) {
            this.featureAttributes = item.features[i].attributes;
            tagHtml.push( "\
              <li class=\"list-group-item\" \
                data-objectId=\"" + this.featureAttributes[this.departamento.OBJECTID] + " \"\
                data-departamentoId=\"" + this.featureAttributes[this.departamento.IDDEPARTAMENTO] + " \"\
                data-departamentoPolygon=\"" + i + "\" >\
                "+ this.featureAttributes[this.departamento.NAME_DEPARTAMENTO] + "\
              </li>"
            );
          }
          this.CboDepartamento.innerHTML = tagHtml.join("");
        } else {
          /* Se limpia la selección del departamento */
          this._clearNodes(this.CboDepartamento.childNodes);
        }
      } catch (error) {
          console.log("Error: _callDepartamento " + error.name + " - " + error.message);
      }
    },

    _tagHtml: function(
      paramIterador,
      paramDepartamento,
      paramIDDepartamento,
      paramProvincia,
      paramIDProvincia,
      paramDistrito,
      paramIDDistrito
    ){
      let contentDepartamento = '',
          contentProvincia = '',
          contentDistrito = '' ;
      try {

        if(paramDepartamento.trim() != '') {
            contentDepartamento = "\
            <label class=\"is-size-7\" for=\"1" + paramIterador + "\">\
                <span class=\"has-text-weight-bold\">Departamento : </span>"
                + paramDepartamento + "\
            </label>&nbsp;\
            <input type=\"checkbox\" id=\"1" + paramIterador + "\" value=\"" + paramIDDepartamento + "\" data-group=\"Departamento\" class=\"is-pulled-right checkbox-input\">&nbsp;";
        }

        if(paramProvincia.trim() != '') {
            contentProvincia = "\
            <label class=\"is-size-7\" for=\"2" + paramIterador + "\">\
                <span class=\"has-text-weight-bold\">Provincia : </span>"
                + paramProvincia + "\
            </label>&nbsp;\
            <input type=\"checkbox\" id=\"2" + paramIterador + "\" value=\"" + paramIDProvincia + "\" data-group=\"Provincia\" class=\"is-pulled-right checkbox-input\">&nbsp;";
        }

        if(paramDistrito.trim() != '') {
            contentDistrito = "\
            <label class=\"is-size-7\" for=\"3" + paramIterador + "\">\
                <span class=\"has-text-weight-bold\">Distrito : </span>"
                + paramDistrito + "\
            </label>&nbsp;\
            <input type=\"checkbox\" id=\"3" + paramIterador + "\" value=\"" + paramIDDistrito + "\" data-group=\"Distrito\" class=\"is-pulled-right checkbox-input\">&nbsp;";
        }

        return "\
            <div class=\"limite\">\
                <div class=\"field\">"
                    + contentDepartamento + "\
                </div>\
                <div class=\"field\">"
                    + contentProvincia + "\
                </div>\
                <div class=\"field\">"
                    + contentDistrito + "\
                </div>\
                <hr class=\"hr\" style=\"margin:5px 0;\">\
            </div>";

      } catch (error) {
        console.log("Error: _tagHtml " + error.name + " - " + error.message);
      }      
    },

    _coincidencia: function(paramNumber) {
      let tagHtml = [];
      try {
        if(paramNumber != null) {
            this.ID_Coincidencia.innerHTML = paramNumber + parseInt(this.ID_Coincidencia.innerText);
        } else {
          this.ID_Coincidencia.innerHTML = "0";
        }
      } catch (error) {
        console.log("Error: _tableResult " + error.name + " - " + error.message);
      }
    },

    _tableResult: function(paramNumber) {
      let tagHtml = [];
      try {
        if(paramNumber != null) {
          Window.resulta = Window.resulta + paramNumber;
          if(Window.resulta == 3) {
            tagHtml.push("\
                <div class=\"limite\">\
                    <div class=\"field has-text-centered\">\
                        No se tiene coincidencias \
                    </div>\
                </div>"
            );
            this.ID_GeneralLimite.innerHTML = tagHtml.join("");
          }
        } else {
          Window.resulta = 0;
        }
      } catch (error) {
        console.log("Error: _tableResult " + error.name + " - " + error.message);
      }
    },

    _callGeneralLimite: function(paramWhere, paramDepartamento, paramProvincia) {
      try {
        paramLIKE = paramWhere.substring(
          paramWhere.indexOf("LIKE"),
          paramWhere.length
        );      
        /* GENERAL PROVINCIA */
        this.queryProvincia.where = this.provincia.NAME_PROVINCIA + " " + paramLIKE;
        this.queryTaskProvincia.execute(
          this.queryProvincia,
          function(item) {

            /* PROVINCIA */
            let tagHtml = [];
            itemFeatures = item.features;
            featuresLength = itemFeatures.length;
            featuresLength == 0 ? this._tableResult(1):'';
            
            for(let i = 0; i < featuresLength; i++) {
              featureAttributes = item.features[i].attributes;
              /* Valida si existe ID en la colección */
              booleanItem = paramProvincia.find(
                function (element) {
                  if(element == featureAttributes[this.provincia.IDPROVINCIA]){
                    return true;
                  } 
                  return false;
                }.bind(this)
              );

              if(!booleanItem) {
                /* Suma a la coincidencia */
                this._coincidencia(1);
                tagHtml.push(
                  this._tagHtml(
                    i + "HD",
                    featureAttributes[this.provincia.NAME_DEPARTAMENTO],
                    featureAttributes[this.provincia.IDDEPARTAMENTO],
                    featureAttributes[this.provincia.NAME_PROVINCIA],
                    featureAttributes[this.provincia.IDPROVINCIA],
                    '',
                    ''
                  )
                );
              }
              /* Se adiciona los ID de departamentos */
              paramDepartamento.push(featureAttributes[this.provincia.IDDEPARTAMENTO]);
            }
            this.ID_GeneralLimite.innerHTML += tagHtml.join("");
            /* / PROVINCIA */
            
            /* DEPARTAMENTO */
            this.queryDepartamento.where = this.departamento.NAME_DEPARTAMENTO + " " + paramLIKE;
            this.queryTaskDepartamento.execute(
              this.queryDepartamento,
              function(item) {
                let tagHtml = [],
                //console.log(paramProvincia);
                itemFeatures = item.features;
                featuresLength = itemFeatures.length;
                featuresLength == 0 ? this._tableResult(1):'';
                /* Suma a la coincidencia */
                

                for(let i = 0; i < featuresLength; i++) {
                  featureAttributes = item.features[i].attributes;
                  /* Valida si existe ID en la colección */

                  booleanItem = paramDepartamento.find(
                    function (element) {
                      if(element == featureAttributes[this.departamento.IDDEPARTAMENTO]){
                        return true;
                      } 
                      return false;
                    }.bind(this)
                  );

                  if(!booleanItem) {
                    this._coincidencia(1);
                    tagHtml.push(
                      this._tagHtml(
                        i + "RM",
                        featureAttributes[this.departamento.NAME_DEPARTAMENTO],
                        featureAttributes[this.departamento.IDDEPARTAMENTO],
                        '',
                        '',
                        '',
                        ''
                      )
                    );
                  }
                }
                this.ID_GeneralLimite.innerHTML += tagHtml.join("");
              }.bind(this)
            );
            /* / DEPARTAMENTO */

          }.bind(this)
        );
        
      } catch (error) {
        console.log("Error: _callGeneralLimite " + error.name + " - " + error.message);
      }      
    },

    _callGeneralDistrito: function(item) {
      try {
        let tagHtml = [], departamento = [], provincia = [];
        /* Limpiando */
        this._coincidencia(null);

        if(item != null) {
          featuresLength = item.features.length;
          featuresLength == 0 ? this._tableResult(1):'';

          /* Suma a la coincidencia */
          this._coincidencia(featuresLength);

          for(let i = 0; i < featuresLength; i++) {
            featureAttributes = item.features[i].attributes;
            /* ARRAY Departamentos */
            departamento.push(featureAttributes[this.distrito.IDDEPARTAMENTO]);
            /* ARRAY Provincia */
            provincia.push(featureAttributes[this.distrito.IDPROVINCIA]);
            
            tagHtml.push(
              this._tagHtml(
                i,
                featureAttributes[this.distrito.NAME_DEPARTAMENTO],
                featureAttributes[this.distrito.IDDEPARTAMENTO],
                featureAttributes[this.distrito.NAME_PROVINCIA],
                featureAttributes[this.distrito.IDPROVINCIA],
                featureAttributes[this.distrito.NAME_DISTRITO],
                featureAttributes[this.distrito.IDDISTRITO]
              )
            );
          }
          this._callGeneralLimite(
            this.queryDistrito.where,
            departamento,
            provincia
          );
          
          this.ID_GeneralLimite.innerHTML += tagHtml.join("");
        } else {
          tagHtml.push("\
            <li class=\"list-group-item\" >\
              <p class=\"font-italic\">Seleccione Provincia</p> \
            </li>"
          );
          this.ID_GeneralLimite.innerHTML = tagHtml.join("");
        }        
      } catch (error) {
        console.log("Error: _callGeneralDistrito " + error.name + " - "+ error.message);
      }
    },

    // Error - Select PROVINCIA
    _errorGeneralDistrito: function(item) {
      try {
        console.log(item);
      } catch (error) {
        console.log("Error: _errorDistrito " + error.name + " - " + error.message);
      }
    },


    _onClickBuscar: function(item) {
      let tagHtml = [];
      this._tableResult(null);
      if(item != null) {
        this.ID_GeneralLimite.innerHTML = tagHtml.join("");
        this.queryDistrito.where = "" 
          + this.distrito.NAME_DISTRITO + " LIKE '%" + this.ID_LimitePolitico.value.toUpperCase().trim()  + "%'";

        this.queryTaskDistrito.execute(
          this.queryDistrito,
          this._callGeneralDistrito.bind(this),
          this._errorGeneralDistrito.bind(this)
        );
      } else {
        tagHtml.push("\
            <div class=\"limite\">\
                <div class=\"field has-text-centered\">\
                    No se tiene coincidencias \
                </div>\
            </div>"
        );
        this.ID_GeneralLimite.innerHTML = tagHtml.join("");
      }
    },

    _onClickEliminar: function() {
      try {
        /* Eliminar texto */
        this.ID_LimitePolitico.value = "";
        /* Eliminar resultado */
        this._onClickBuscar(null);
        /* Limpiando */
        this._coincidencia(null);

        /* Limpia DEPARTAMENTO */
        this._callDepartamento(null);
        /* Limpia PROVINCIA */
        this._callProvincia(null);
        /* Limpia DISTRITO */
        this._callDistrito(null);
      } catch (error) {
        console.log("Error: _onClickEliminar " + error.name + " - " + error.message);
      } 
    },

    _onClickLimpiar: function() {
      try {
        /* Limpia búsqueda general */
        this._onClickEliminar();
        /* Limpia DEPARTAMENTO */
        this._callDepartamento(null);
        /* Limpia PROVINCIA */
        this._callProvincia(null);
        /* Limpia DISTRITO */
        this._callDistrito(null);
        /* Limpia el FOCUS */

        if(event.target.id) {
          document.getElementById(event.target.id).blur();
        }
        
        /* Limpiando coincidencia */
        this._coincidencia(null);
      } catch (error) {
        console.log("Error: _onClickLimpiar " + error.name + " - " + error.message);
      } 
    },


    _onClickAnalizar: function() {
      try {
        // Limpia el FOCUS
        document.getElementById(event.target.id).blur();
      } catch (error) {
        console.log("Error: _onClickAnalizar " + error.name + " - " + error.message);
      }
    },
    
    _defaultTableGeneral: function() {
      try {
        let checkboxDepartamento = query(".widget-proyectos2 .limite-content .limite input");
        for (let i = 0; i < checkboxDepartamento.length; i++) {
          /* Default checkbox */
          checkboxDepartamento[i].checked = false;
        }
      } catch (error) {
        console.log("Error: _defaultTableGeneral " + error.name + " - " + error.message);
      }
    },

    _onClickTableGeneral: function () {
      query(".widget-proyectos2 .limite-content").on("click", function(event) {
        const booleanZoom = this.ID_ZoomGeneral.checked;
        const target = event.target;

        /* Default checkbox */
        this._defaultTableGeneral();
        /* Limpia DEPARTAMENTO */
        this._callDepartamento(null);
        /* Limpia PROVINCIA */
        this._callProvincia(null);
        /* Limpia DISTRITO */
        this._callDistrito(null);
        
        if(target.nodeName == "INPUT") {
          const group = target.dataset.group;
          if(group == "Departamento") {            
            
            /* Zoom Departamento */
            this.queryDepartamento.where = this.departamento.IDDEPARTAMENTO + " = '" + target.value + "'";
            this.queryTaskDepartamento.execute(
              this.queryDepartamento,
              function(item) {
                const featuresLength = item.features.length;
                for(let h = 0; h < featuresLength; h++) {
                  featureAttributes = item.features[h].attributes;
                  /* ZOOM Departamento */
                  this._zoomDepartamento(featureAttributes[this.departamento.OBJECTID], booleanZoom);
                }
              }.bind(this)
            );
            /* / Zoom Departamento */
          } else if(group == "Provincia") {

            /* Zoom Provincia */
            this.queryProvincia.where = this.provincia.IDPROVINCIA + " = '" + target.value + "'";
            this.queryTaskProvincia.execute(
              this.queryProvincia,
              function(item) {
                const featuresLength = item.features.length;
                for(let d = 0; d < featuresLength; d++) {
                  featureAttributes = item.features[d].attributes;
                  /* ZOOM Provincia */
                  this._zoomProvincia(featureAttributes[this.provincia.OBJECTID], booleanZoom);
                }
              }.bind(this)
            );
            /* / Zoom Provincia */

          } else if(group == "Distrito") {

            /* Zoom Distrito */
            this.queryDistrito.where = this.distrito.IDDISTRITO + " = '" + target.value + "'";
            this.queryTaskDistrito.execute(
              this.queryDistrito,
              function(item) {
                const featuresLength = item.features.length;
                for(let r = 0; r < featuresLength; r++) {
                  featureAttributes = item.features[r].attributes;
                  /* ZOOM Distrito */
                  this._zoomDistrito(featureAttributes[this.distrito.OBJECTID], booleanZoom);
                }
              }.bind(this)
            );
            /* / Zoom Distrito */

          }
          document.getElementById(target.id).checked = true;
        }
        //this.ID_ZoomEspecifico.checked
      }.bind(this));
    },

    _onLoadDepartamento: function() {
      this.queryDepartamento.where = "1=1";
      this.queryTaskDepartamento.execute(
        this.queryDepartamento,
        this._callDepartamento.bind(this),
        this._errorDepartamento.bind(this)
      );
      // Null para que no cargue
      this._callProvincia(null);
    },


    _activeTabSearch: function(positionTab) {
      let tabs2 = document.querySelectorAll('.widget-proyectos2 .tabs li');
      let tabsContent2 = document.querySelectorAll('.widget-proyectos2 .tab-content');

      let deactvateAllTabs = function () {
          tabs2.forEach(function (tab) {
            tab.classList.remove('is-active');
          });
      };

      let hideTabsContent = function () {
        tabsContent2.forEach(function (tabContent) {
            tabContent.classList.remove('is-active');
        });
      };

      let activateTabsContent = function (tab) {
        tabsContent2[getIndex(tab)].classList.add('is-active');
      };

      let getIndex = function (el) {
        return [...el.parentElement.children].indexOf(el);
      };

      tabs2.forEach(function (currentValue, index, array) {
        currentValue.addEventListener('click', function () {
            deactvateAllTabs();
            hideTabsContent();
            /* Limpia la funcionalidad */
            if(index == 0) {
              this._onClickLimpiar();
            } else {
              this._onClickEliminar();
            }            
            currentValue.classList.add('is-active');
            activateTabsContent(currentValue);
        }.bind(this));
      }.bind(this));

      tabs2[positionTab].click();
    },

    /* Cambiar el tamaño del widget */
    _getPanel: function(paramWidget, paramHeight) {  
      try {
        let panel = this.getPanel();
        let pos = panel.position;
        pos.width = paramWidget;
        pos.height = paramHeight;
        panel.setPosition(pos);
      } catch (error) {
        console.log("_getPanel: " + error.name + " - " + error.message);
      }
    },

    //methods to communication with app container:
    postCreate: function() {
      this.inherited(arguments);
      console.log('WidgetProyectos2::postCreate');
      /* Cambiar el tamaño del widget */
      this._getPanel(320, 320);
      /* Configuracion departamento */
      this._settingDepartamento();
      /* Configuracion provincia */
      this._settingProvincia();
      /* Configuracion distrito */
      this._settingDistrito();
      /* Cargar los departamentos */
      this._onLoadDepartamento();
      /* Limpiar grilla de limite general */
      this._onClickBuscar(null);
    },

    startup: function() {
      this.inherited(arguments);
      console.log('WidgetProyectos::startup');
      /* Recorre la tabla de resultado*/
      this._onClickTableGeneral();
      /* Pestaña que se activa 
        - 0. Activa la pestaña de ESPECIFICO
        - 1. Activa la pestaña de GENERAL */
      this._activeTabSearch(0);      
    },

    // onOpen: function(){
    //   console.log('WidgetProyectos2::onOpen');
    // },

    // onClose: function(){
    //   console.log('WidgetProyectos2::onClose');
    // },

    // onMinimize: function(){
    //   console.log('WidgetProyectos2::onMinimize');
    // },

    // onMaximize: function(){
    //   console.log('WidgetProyectos2::onMaximize');
    // },

    // onSignIn: function(credential){
    //   console.log('WidgetProyectos2::onSignIn', credential);
    // },

    // onSignOut: function(){
    //   console.log('WidgetProyectos2::onSignOut');
    // }

    // onPositionChange: function(){
    //   console.log('WidgetProyectos2::onPositionChange');
    // },

    // resize: function(){
    //   console.log('WidgetProyectos2::resize');
    // }

    //methods to communication between widgets:

  });

});
