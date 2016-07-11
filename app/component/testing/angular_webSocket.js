(function(){
	'use strict';
	angular.module('angular_webSocket',[]).service('$angular_webSocket',['$q',function($q){
		return {
			socket: null,
			streamingStarted: false,
			serverUrl: null,
			accessToken: null,
			stompClient: null,
			wsConnected: $q.defer(),
			scopeId: null,
			init: function (serverUrl, accessToken) {

				this.serverUrl = serverUrl;
				this.accessToken = accessToken;
			},

			setUrl: function (serverUrl) {

				this.serverUrl = serverUrl;
			},

			setAccessToken: function (accessToken) {

				this.accessToken = accessToken;
			},

			connect: function (serverUrl, accessToken) {

				var self = this;
				this.serverUrl = serverUrl;
				this.accessToken = accessToken;
				if (!this.socket) {

					var url = this.serverUrl + '/websocket/streaming?access_token=' + this.accessToken;
					this.socket = new SockJS(url);
					this.stompClient = Stomp.over(this.socket);
					this.stompClient.connect({}, function () {

						self.wsConnected.resolve('success');
					})

				}
			},

			disconnect: function () {

				if (this.socket) {

					this.stompClient.disconnect();
					this.socket = null;
					this.streamingStarted = false;
				}
			},

			startStreaming: function (scopeId) {

				this.scopeId = scopeId
				if (this.streamingStarted != true) {

					var self = this;
					this.streamingStarted = true;
					this.wsConnected.promise.then(function () {

						self.stompClient.send("/app/streaming", {}, angular.toJson({
							'eventId': scopeId,
							"type": "START"
						}));

					}, null, null);

				}
			},

			stopStreaming: function () {

				var self = this;
				if (this.streamingStarted) {

					this.wsConnected.promise.then(function () {

						self.stompClient.send("/app/streaming", {}, angular.toJson({
							'eventId': self.scopeId,
							"type": "STOP"
						}));
						self.streamingStarted = false;
					})
				}
			},

			unSubscribe: function () {


				this.stompClient.unsubscribe();

			},

			subscribe: function (cb) {

				var self = this;
				this.wsConnected.promise.then(function () {

					self.stompClient.subscribe('/user/queue/livescope', function (data) {

						cb(angular.fromJson(data.body));
					});

				}, null, null);

			}

		}
	 }])
})()