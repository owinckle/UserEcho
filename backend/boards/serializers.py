from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime
from .models import Post, PostComment
from users.serializers import UserSerializer
from users.models import Profile


class PostCommentSerializer(serializers.ModelSerializer):
	posted_since = serializers.SerializerMethodField()
	author = serializers.SerializerMethodField()

	class Meta:
		model = PostComment
		fields = ("id", "author", "content", "posted_since")

	def get_posted_since(self, obj):
		return naturaltime(obj.created_at)

	def get_author(self, obj):
		serializer = UserSerializer(obj.author)
		return serializer.data


class PostSerializer(serializers.ModelSerializer):
	posted_since = serializers.SerializerMethodField()
	author = serializers.SerializerMethodField()
	comments = serializers.SerializerMethodField()

	class Meta:
		model = Post
		fields = ("id", "board", "author", "title", "content", "labels", "posted_since", "author", "comments")

	def get_posted_since(self, obj):
		return naturaltime(obj.created_at)

	def get_author(self, obj):
		serializer = UserSerializer(obj.author)
		return serializer.data
	
	def get_comments(self, obj):
		comments = PostComment.objects.filter(post=obj)
		serializer = PostCommentSerializer(comments, many=True)
		return serializer.data