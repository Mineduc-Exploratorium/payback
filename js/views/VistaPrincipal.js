// VisPayback
define([
	'underscore',
	'backbone',
	'jquery',
	'd3',
	'VistaLoading',
	'views/Visualizador',
	'views/VistaPanelTipoIE',
	'views/VistaPanelSelectorAreas',

	], function(_, Backbone,$, d3, VistaLoading,Visualizador, VistaPanelTipoIE,VistaPanelSelectorAreas){


	var VistaPrincipal = Backbone.View.extend(
	/** @lends VistaPrincipal.prototype */
	{

		/**
		* @class VistaPrincipal vista que despliega visualizacion de ingresos vs costos de carreras
		*
		* @augments Backbone.View
		* @constructs
		*
		* @param {object} options parametros de incializacion
		* @param {string} options.el Identificador de elemento en DOM donde se despliegau la vista
		* 
		* VistaPrincipal Inicia parametros de configuración y llamada a datos
		*/
		initialize : function() {
	    	// Auxiliar para referirse a this al interior de callback functions
	    	var self = this

	    	var datafile = "data/empleabilidad2.txt";

	    	this.visIsSVG = true // SVG or HTML - Para crear elemento contenedor de la visualización principal

			// Carga de datos
	    	this.vistaLoading = new VistaLoading({el:this.el});
			this.vistaLoading.show();
			d3.tsv(datafile, function(data) {
				self.vistaLoading.hide();

				self.data = data;
				self.render();
			});
		},

		/**
		* Despliegue inicial de elementos gráficos.
		*/
		render : function() {

			// Genera contenedores de elementos (paneles, gráfico, ...)
			// ========================================================
			
			// Contenedor del panel de áreas
			var elSelectorAreas = d3.select(this.el).append("div").attr("id", "panelSelectorAreas")[0][0];

			// Genera contenedor de la visualización principal
			// ------------------------------------------------
			// Selector (d3) al elemento del DOM que contiene la visualización principal
			var visContainer;
			if (this.visIsSVG) {
				// SVG - contenedor principal de elementos visuales es objeto SVG
				visContainer = d3.select(this.el).append("svg");
			} else {
				// HTML - contenedor principales es elemento DIV (HTML)
				visContainer = d3.select(this.el).append("div");
			}
			visContainerElement = visContainer[0][0]  // <div> o <svg>

			// Contenedor del panel de tipos
			var elSelectorTipoIEs = d3.select(this.el).append("div")
				.attr("id", "panelSelectorTipos")
				.style("padding-left", "200px")[0][0];

			// Genera nueva vista que  despliega visualización
			this.visualizador = new Visualizador({
				el: visContainerElement,
				data: this.data,
			});

			// Cea un nuevo panel para seleccionar tipos de IEs ("Universidades", "Institutos Profesionales", ...)
	    	// -------------------------------------------------
			// Genera contenido del panel y escucha a evento con tipo seleccionado
			this.vistaSelectorTipoIE= new VistaPanelTipoIE({el:elSelectorTipoIEs, colorScale: this.visualizador.getColorScale()});
			this.vistaSelectorTipoIE.on("seleccionTipoIE", this.visualizador.seleccionTipoIE);


			// Crea un nuevo panel para seleccionar áreas
			// -----------------------------------------
			// Genera el contenido del panel y escucha a evento con area seleccionada
			this.vistaSelectorAreas = new VistaPanelSelectorAreas({el: "#panelSelectorAreas", areas: this.visualizador.getAreas()})
			this.vistaSelectorAreas.on("seleccionArea", this.visualizador.seleccionArea);


		}
	});
  
  return VistaPrincipal;
});

