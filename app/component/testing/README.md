Usage

require('../angular_webSocket.js')
or
<script src="../angular_webScoket.js"></script>


angular.module('..',['$angular_webSocket'])




In live mode function  ->

function _enableLiveMode(){

	//Establish a connect between the client and the streaming server
	$angular_webSocket.connect('http:54.222.169.16',localStorage._scopeAccessToken.split(' ')[1]);


	//initiate the streaming process through pass the scopeId;
	$angular_webSocket.startStreaming(scope.imageCtr.scopeId);

	//subscribe to the event which new images are send from the server.
	$angular_webSocket.subscribe(function(data){

		data.forEach(function (ele){


			//push images to a pending array
	 		scope.imageCtr.pendingImageArr.push(ele);
		})

	})

	//every fiver second check if the pending array is empty, if it isn't, unshift the first image
	//to the current image array.
	scope.imageCtr.liveModeInterval = $interval(function(){
	if(scope.imageCtr.pendingImageArr.length){

	 $timeout(function(){
	     var ob = scope.imageCtr.pendingImageArr.pop();
	     scope.imageCtr.imageArr.unshift(ob);
	 })
	 scope.$broadcast('masonry.reload');
	}

	},5000)

}



