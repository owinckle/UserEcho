from django.urls import path
import boards.views as views

urlpatterns = [
	path("board/feature-requests/get/", views.GetFeatureRequestsBoard.as_view()),
	path("post/create/", views.CreatePost.as_view()),
	path("post/delete/", views.DeletePost.as_view()),
	path("post/comment/create/", views.CreateComment.as_view()),
	path("post/comment/delete/", views.DeleteComment.as_view()),
	path("post-comment/vote/set/", views.SetVote.as_view())
]