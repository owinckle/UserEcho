from django.urls import path
import boards.views as views

urlpatterns = [
	path("board/feature-requests/get/", views.GetFeatureRequestsBoard.as_view()),
	path("post/create/", views.CreatePost.as_view()),
]