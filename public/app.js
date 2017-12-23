var app=angular.module('myApp', []);

app.controller('ImgCtrl', ['$scope','$http', function ($scope,$http) {

		//Method to Upload the image
		$scope.submit = function(){

			var formData= new FormData;
			
			var file= $('#file')[0].files[0]; //reading image object
			
			// validating supported format
			if(!(file.name.match(/\.(png||jpeg)$/))){
				$scope.alert="alert alert-danger";
				$scope.message= "Invalid format. only .png/.jpg./jpeg format are supported";
				console.log("Invalid file format");
			}
			else{

				formData.append('image',file);
				
				//Making POST request to upload image to database
				$http.post('http://localhost:3000/api/images',formData,{
					transformRequest: angular.identity,
					headers:{'Content-Type':undefined}
				}).then(function(response){
					$scope.item= response.data;
					$scope.alert="alert alert-success";
					$scope.message= "File Uploaded succesfully";
					
				});
			}
		};

		//Method to get list of images from database
		$scope.getImages= function(){
			$http.get('http://localhost:3000/api/images').then(function(response){
				$scope.imageList= response.data;
			});
		};

		$scope.show=true;
		$scope.closeImage= function(){
			$scope.show=false;
		};
}]);

//Custom directive for form to upload the image
app.directive('imgDirective', [function () {
	return {
		restrict: 'EA',
		templateUrl: './imageUpload.html'
	};
}]);