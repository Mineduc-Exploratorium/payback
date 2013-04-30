define([
  'underscore',
  'backbone',
  'jquery',
  'd3',
  'bootstrap',
	], function(_, Backbone,$, d3, _bootstrap){
		
		var VistaPanelTipoIE = Backbone.View.extend(
		/** @lends VistaPanelTipoIE.prototype */
		{
			/**
			* @class VistaPanelTipoIE Panel con un elementos (checkboxes) que permiten seleccionar un conjunto de "tipos de IEs" (Ej. ["Universidades", "Institutos Profesionales"])
		 	*
			* @augments Backbone.View
			* @constructs
			*
			* @param {object} options parametros de incializacion
			* @param {string} options.el Identificador de elemento en DOM donde se despliegau la vista
			* @param {string} options.colorScale escala ordinal de d3 con categorías en domain() y colores en range()
			*/
			initialize: function() {
				this.colorScale = (this.options && this.options.colorScale) ? this.options.colorScale : d3.scale.ordinal();
				this.render();
			},


			events: {
				"change input": "seleccionTipoIE",
			},

			/**
			* Método invocado al detectar evento "change" en la selección de opciones
			* 
			* @param {object} e Evento 	
			* @fires VistaPanelTipoIE#seleccionTipoIE
			*/
			seleccionTipoIE: function(e) {
				// Obtiene arreglo con botones activos
				var selectedButtons = d3.select(this.el).selectAll("input:checked")[0];

				// Genera un arreglo con el texto de cada botón activo
				var selectedValues = _.map(selectedButtons, function(d) {
					return $(d).val();

				})

				/**
				 * Evento que indica una selección de tipos de IE.
				 *
				 * @event VistaPanelTipoIE#seleccionTipoIE
				 * @type {array}
				 * @property {array} selectedValues - Arreglo con listado de tipos seleccionados (Ej. ["Universidades", "Institutos Profesionales"])
				 */
				this.trigger("seleccionTipoIE", selectedValues);
			},

			/**
			* Despliegua elementos visuales 	
			*/
			render: function() {
				var optionsGroup = d3.select(this.el).append("form")
					.attr("class", "form-horizontal")
					.selectAll("label")
					.data(this.colorScale.domain())
					.enter()
						.append("label")
						.attr("class","checkbox inline");

				optionsGroup.append("input")
					.attr("type", "checkbox")
					.attr("checked", true)
					.attr("value", function(d) {return d})

				optionsGroup.append("span")
					.text(function(d) {return d})
					.style("background-color", this.colorScale)

				// Activa el último botón (vía JQuery)
				$(this.el).find("button").last().button('toggle');

				return this;
			}
		});
  
  return VistaPanelTipoIE;
});

