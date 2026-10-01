from django.shortcuts import render, get_object_or_404
from django.conf import settings
from .models import Category, Product


def home(request):
    """Homepage view with all products and categories."""
    categories = Category.objects.all()
    products = Product.objects.filter(is_available=True)
    featured_products = products.filter(is_featured=True)[:6]

    # Get selected category from query params
    category_slug = request.GET.get('category')
    selected_category = None

    if category_slug:
        selected_category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=selected_category)

    context = {
        'categories': categories,
        'products': products,
        'featured_products': featured_products,
        'selected_category': selected_category,
        'whatsapp_number': settings.WHATSAPP_NUMBER,
    }
    return render(request, 'shop/index.html', context)


def product_detail(request, slug):
    """Individual product detail view."""
    product = get_object_or_404(Product, slug=slug, is_available=True)
    related_products = Product.objects.filter(
        category=product.category,
        is_available=True
    ).exclude(id=product.id)[:4]

    context = {
        'product': product,
        'related_products': related_products,
        'whatsapp_number': settings.WHATSAPP_NUMBER,
    }
    return render(request, 'shop/product_detail.html', context)
