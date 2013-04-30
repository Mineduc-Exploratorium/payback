define([
	'underscore',
	'backbone',
	'jquery',
	'd3',
	'views/VistaLoading',
	'views/VistaVizPayback',
	'views/VistaPanelTipoIE',
	'views/VistaPanelSelectorAreas',
	'VistaToolTip',

	], function(_, Backbone,$, d3, VistaLoading,VistaVizPayback, VistaPanelTipoIE,VistaPanelSelectorAreas, VistaToolTip){


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

			// Carga de datos
	    	this.vistaLoading = new VistaLoading({el:this.el});
			this.vistaLoading.show();
			d3.tsv("data/empleabilidad2.txt", function(data) {
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

			// SVG - contenedor principal de elementos visuales
			this.svg = d3.select(this.el).append("svg")

			// Contenedor del panel de tipos
			var elSelectorTipoIEs = d3.select(this.el).append("div")
				.attr("id", "panelSelectorTipos")
				.style("padding-left", "200px")[0][0];


			// Vista con tooltip para mostrar ficha de establecimiento
			this.tooltip = new VistaToolTip();

			// Genera nueva vista que  despliega visualización
			this.vizView = new VistaVizPayback({
				svg: this.svg,
				data: this.data,
				tooltip : this.tooltip
			});

			// Cea un nuevo panel para seleccionar tipos de IEs ("Universidades", "Institutos Profesionales", ...)
	    	// -------------------------------------------------
			// Genera contenido del panel y escucha a evento con tipo seleccionado
			this.vistaSelectorTipoIE= new VistaPanelTipoIE({el:elSelectorTipoIEs, colorScale: this.vizView.getColorScale()});
			this.vistaSelectorTipoIE.on("seleccionTipoIE", this.vizView.seleccionTipoIE);


			// Crea un nuevo panel para seleccionar áreas
			// -----------------------------------------
			// Genera el contenido del panel y escucha a evento con area seleccionada
			this.vistaSelectorAreas = new VistaPanelSelectorAreas({el: "#panelSelectorAreas", areas: this.vizView.getAreas()})
			this.vistaSelectorAreas.on("seleccionArea", this.vizView.seleccionArea);


		}
	});
  
  return VistaPrincipal;
});

