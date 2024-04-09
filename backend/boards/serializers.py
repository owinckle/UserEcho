from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime
from .models import Post, PostComment, Label, Vote
from users.serializers import UserSerializer
from django.utils import timezone
from datetime import timedelta


class LabelSerializer(serializers.ModelSerializer):
	class Meta:
		model = Label
		fields = ("id", "name", "color")


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
	labels = LabelSerializer(read_only=True, many=True)
	creation_date = serializers.SerializerMethodField()
	votes = serializers.SerializerMethodField()
	user_vote = serializers.SerializerMethodField()

	class Meta:
		model = Post
		fields = ("id", "board", "author", "title", "content", "labels", "creation_date", "posted_since", "author", "comments", "votes", "user_vote")

	def get_posted_since(self, obj):
		return naturaltime(obj.created_at)

	def get_author(self, obj):
		serializer = UserSerializer(obj.author)
		return serializer.data
	
	def get_comments(self, obj):
		comments = PostComment.objects.filter(post=obj)
		serializer = PostCommentSerializer(comments, many=True)
		return serializer.data
	
	def get_creation_date(self, obj):
		# if obj.created_at > timezone.now() - timedelta(days=1):
		# 	return naturaltime(obj.created_at)
		natural = naturaltime(obj.created_at)
		date = obj.created_at.strftime("%d %b, %Y at %H:%M")
		return f"{date} ({natural})"

	def get_votes(self, obj):
		upvotes = Vote.objects.filter(post=obj, value=1).count()
		downvotes = Vote.objects.filter(post=obj, value=-1).count()
		return upvotes - downvotes
	
	def get_user_vote(self, obj):
		vote = Vote.objects.filter(post=obj, voter=self.context["request"].user).first()
		if vote:
			return vote.value
		return 0