from rest_framework import serializers
from .models import Space
from boards.serializers import LabelSerializer
from boards.models import Label


class SpaceSerializer(serializers.ModelSerializer):
	labels = serializers.SerializerMethodField()

	class Meta:
		model = Space
		fields = ("id", "name", "slug", "labels")

	def get_labels(self, obj):
		labels = Label.objects.filter(space=obj)
		return LabelSerializer(labels, many=True).data