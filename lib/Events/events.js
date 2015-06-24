/**
 * Module for working with events.
 *
 * @author Arsen Ghazaryan <arsen.ghazaryan@aofl.com>
 */
define(function () {

	/**
	 * Events class for creating events, and adding global event listeners
	 * @type {Object}
	 */
	var Events = {

		/**
		 * Create Event Object
		 * @param  {string} eventName name of the event.
		 * @param  {object} data Custom data to be passed to the event object.
		 * @return {event}	Event object.
		 */
		createEvent: function (eventName, data) {
			var event;
			if (document.createEvent) {
				event = document.createEvent("HTMLEvents");
				event.initEvent(eventName, true, true);
			} else {
				event = document.createEventObject();
				event.eventType = eventName;
			}

			event.eventName = eventName;
			event.customData = data;
			return event;
		},

		/**
		 * Namespace for functions to manipulate application wide events
		 * @type {object}
		 */
		global: {
			/**
			 * Add a global event listener (this will attach event to document.body)
			 * @param  {string}   eventName 	Name of the event.
			 * @param  {function} callback  	Callback function for the event.
			 */
			on: function (eventName, callback) {
				document.body.addEvent(eventName, callback);
			},

			/**
			 * Remove a global event listener (this will attach event to document.body)
			 * @param  {string}   eventName 	Name of the event.
			 * @param  {function} callback  	Callback function for the event.
			 */
			off: function (eventName, callback) {
				document.body.removeEvent(eventName, callback);
			},

			/**
			 * Dispatch global event
			 * @param  {event} eventObject Event object to be dispatched.
			 */
			dispatch: function (eventObject) {
				document.body.dispatchEvent(eventObject);
			}
		}
	};

	return Events;
});