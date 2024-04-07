from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Board, Post, Label
from spaces.models import Space
from .serializers import PostSerializer

class GetFeatureRequestsBoard(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request):
		space_slug = request.data.get("space_slug")

		space = Space.objects.get(slug=space_slug)
		board = Board.objects.get(space=space, type="feature_requests")
		posts = Post.objects.filter(board=board)
		serializer = PostSerializer(posts, many=True)
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

		print(f"Space ID: {space_id}")
		print(f"Title: {title}")
		print(f"Content: {content}")
		print(f"Labels: {labels}")
		return Response({})
