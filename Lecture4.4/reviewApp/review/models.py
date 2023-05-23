from django.db import models


class BookReview(models.Model):
    review = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return self.review
