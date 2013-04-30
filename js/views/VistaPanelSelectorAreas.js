define([
  'underscore',
  'backbone',
  'jquery',
  'd3',
	], function(_, Backbone,$, d3){

	var VistaPanelSelectorAreas = Backbone.View.extend(
	/** @lends VistaPanelSelectorAreas.prototype */
	  {
		/**
		* @class VistaPanelSelectorAreas Panel con un elemento "select" que permite escoger un área que será utilizada para modificar el despliegue del gráfico
		*
		* @augments Backbone.View
		* @constructs
		*
		* @param {object} options parametros de incializacion
		* @param {string} options.el Identificador de elemento en DOM donde se despliegau la vista
		* @param {string} options.areas Arreglo con el listado de áreas a seleccionar (Ej. ["Salud", "Educación", ...])
		*/
		initialize: function() {
			this.areas = this.options && this.options.areas ? this.options.areas : [];
			this.render()
		},

		events: {
			"change select#id_inputArea" : "seleccionArea"
		},
		

		/**
		* Método invocado al detectar evento "change" en el select con opciones de área
		* 
		* @param {object} e Evento 	
		* @fires VistaPanelSelectorAreas#seleccionArea
		*/
		seleccionArea : function(e) {
			area = $(e.target).val();

			/**
			 * Evento que indica una selección de área.
			 *
			 * @event VistaPanelSelectorAreas#seleccionArea
			 * @type {string}
			 * @property {string} area - Area seleccionada (Ej. "Salud")
			 */
			this.trigger("seleccionArea", area)
		},

		/**
		* Despliegua elementos visuales 	
		*/
		render: function() {
			// Genera menu con opciones de Area del Conocimiento (Educación, Ciencias Sociales, ...)
			var selectorArea = d3.select(this.el)
				.append("form")
					.attr("class", "form-inline")
				.append("div")
					.attr("class", "control-group")

			selectorArea.append("label")
				.attr("class", "control-label")
				.attr("for", "id_inputArea")
				.style("margin-right", "10px")
				.text("Area:   ");

			selectorArea.append("select")
				.attr("id", "id_inputArea")
				.selectAll("option")
				.data(this.areas)
				.enter()
					.append("option")
					.attr("value", function(d) {return d})
					.text(function(d) {return  d})
		}
	});
  
  return VistaPanelSelectorAreas;
});

