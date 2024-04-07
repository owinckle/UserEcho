from django.contrib import admin
from .models import Board, Label, Post, PostComment


admin.site.register(Board)
admin.site.register(Label)
admin.site.register(Post)
admin.site.register(PostComment)