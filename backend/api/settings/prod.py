from .base import *
import os

DEBUG = False
ALLOWED_HOSTS = [
	"userecho.onrender.com",
	"userecho.io"
]

CORS_ALLOW_ALL_ORIGINS = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

MIDDLEWARE.insert(2, "whitenoise.middleware.WhiteNoiseMiddleware")

STATIC_URL = "/static/"
STATICFILES_DIRS = (
	os.path.join(BASE_DIR, "static"),
)
STATIC_ROOT = os.path.join(BASE_DIR, "live-static-files", "static-root")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"