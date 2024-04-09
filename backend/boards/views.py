from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Board, Post, Label, PostComment, Vote
from spaces.models import Space
from .serializers import PostSerializer

class GetFeatureRequestsBoard(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		space_slug = request.data.get("space_slug")

		space = Space.objects.get(slug=space_slug)
		board = Board.objects.get(space=space, type="feature_requests")
		posts = Post.objects.filter(board=board)
		serializer = PostSerializer(posts, many=True, context={"request": request})
		return Response(serializer.data)


class CreatePost(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		space_id = request.data.get("space_id")
		board_type = request.data.get("board_type")
		title = request.data.get("title")
		content = request.data.get("content")
		label_ids = request.data.get("labels")

		space = Space.objects.get(id=space_id)
		board = Board.objects.get(space=space, type=board_type)

		labels = []
		for label_id in label_ids:
			label = Label.objects.get(id=label_id)
			labels.append(label)

		post = Post.objects.create(
			author=request.user,
			board=board,
			title=title,
			content=content
		)

		post.labels.set(labels)
		return Response({"message": "Post created successfully"})


class DeletePost(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		post_id = request.data.get("post_id")
		post = Post.objects.get(id=post_id)
		post.delete()
		return Response({"message": "Post deleted successfully"})


class CreateComment(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		post_id = request.data.get("post_id")
		content = request.data.get("content")

		post = Post.objects.get(id=post_id)
		PostComment.objects.create(
			author=request.user,
			post=post,
			content=content
		)
		return Response({"message": "Comment created successfully"})


class DeleteComment(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		comment_id = request.data.get("comment_id")
		comment = PostComment.objects.get(id=comment_id)
		comment.delete()
		return Response({"message": "Comment deleted successfully"})
	

class SetVote(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		post_id = request.data.get("post_id")
		comment_id = request.data.get("comment_id")
		value = request.data.get("value")

		if post_id:
			post = Post.objects.get(id=post_id)
			vote = Vote.objects.get_or_create(voter=request.user, post=post)[0]
			if vote.value == value:
				vote.delete()
			else:
				vote.value = value
				vote.save()
			return Response({"message": "Vote set successfully"})
		
		elif comment_id:
			comment = PostComment.objects.get(id=comment_id)
			vote = Vote.objects.get_or_create(voter=request.user, comment=comment, value=value)[0]
			if vote.value == value:
				vote.delete()
			else:
				vote.value = value
				vote.save()
			return Response({"message": "Vote set successfully"})
		else:
			return Response({"message": "Invalid request"})