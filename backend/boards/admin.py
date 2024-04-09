from django.contrib import admin
from .models import Board, Label, Post, PostComment, Vote


admin.site.register(Board)
admin.site.register(Label)
admin.site.register(Post)
admin.site.register(PostComment)
admin.site.register(Vote)