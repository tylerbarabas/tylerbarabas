/**
 * @author Arsen Ghazaryan <arsen.ghazaryan@aofl.com>
 *
 * Module for making Ajax calls
 */
define(function () {
	/**
	 * Ajax class
	 * @static
	 * @type {object}
	 */
	var ajax = {

		/**
		 * Generic methos to make HTTP request
		 * @private
		 * @param  {string}   type     Request type (currently supported: GET or POST)
		 * @param  {string}   url      Url for the request.
		 * @param  {object}   params   JSON object for request arguments (optional).
		 * @param  {function} callback Callback function to be called after request is done.
		 */
		_request: function (type, url, params, callback) {
			params = params || '';
			if (typeof params == 'object') {
				var params_arr = [];
				for (var key in params) {
					params_arr.push(key + '=' + params[key]);
				}
			}
			params = params_arr.join('&');
			var xmlhttp = new XMLHttpRequest();
//			xmlhttp.withCredentials = true;
			// Callback function when XMLHttpRequest is ready
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState === 4) {
					if (xmlhttp.status === 200) {
						var contType = xmlhttp.getResponseHeader("Content-Type") || '';
						var data = xmlhttp.responseText;
					}
					if (typeof callback == 'function' || typeof window[callback] == 'function') {
						callback.call(this, data, xmlhttp.status);
					}
				}
			};
			xmlhttp.open(type, url, true);
			if (type == 'POST') {
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send(params);
			} else
				xmlhttp.send();
		},
		/**
		 * Make a GET HTTP request
		 * @param  {string}   url      	URL for request
		 * @param  {function} callback 	Callback function
		 */
		get: function (url, callback) {
			return this._request('GET', url, {}, callback);
		},

		/**
		 * Make a POST HTTP request
		 * @param  {string}   url      	URL for request
		 * @param  {object}   params   	JSON object for reequest arguments
		 * @param  {function} callback 	Callback function
		 */
		post: function (url, params, callback) {
			return this._request('POST', url, params, callback);
		}
	}
	return ajax;
})