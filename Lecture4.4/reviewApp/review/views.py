from django.shortcuts import render, redirect
from .forms import ReviewForm
from .models import BookReview


def review(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('review')
    else:
        form = ReviewForm()

    reviews = BookReview.objects.all()
    return render(request, 'review.html', {'form': form, 'reviews': reviews})
