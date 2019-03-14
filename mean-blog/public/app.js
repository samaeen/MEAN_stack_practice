(function(){
	angular
	.module("BlogApp",[])
	.controller("BlogController",BlogController);

	function BlogController($scope,$http){
		$scope.createPost=createPost;
		$scope.deletePost=deletePost;
		$scope.editPost=editPost;
		$scope.updatePost=updatePost;

		function init(){
			getAllPost();
		}

		init();

		function editPost(postId){
			$http
				.get("/api/blogpost/"+postId)
				.success(function(post){
					$scope.post=post;
				});		
		}

		function updatePost(post){
			console.log(post);
			$http
				.put("/api/blogpost/"+post._id,post)
				.success(getAllPost);
		}

		function deletePost(postId){
			$http
				.delete("/api/blogpost/"+postId)
				.success(getAllPost);
		}

		function getAllPost(){
			$http
				.get("/api/blogpost")
				.success(function(posts){
					$scope.posts=posts;
				});
		}

		function createPost(post){
			console.log(post);
			$http
				.post("/api/blogpost",post)
				.success(getAllPost);
		}
	}
})();