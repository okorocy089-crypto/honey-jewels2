from django import template

register = template.Library()


@register.filter
def multiply(value, arg):
    """Multiply the value by the argument."""
    try:
        return float(value) * float(arg)
    except (ValueError, TypeError):
        return 0


@register.filter
def format_price(value):
    """Format price with Naira symbol and thousand separators."""
    try:
        return f"₦{float(value):,.0f}"
    except (ValueError, TypeError):
        return value
