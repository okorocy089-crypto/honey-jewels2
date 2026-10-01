#!/usr/bin/env python
"""
Honey Jewels - Sample Data Seeder
Populates the database with sample categories and products.
Run: python seed_data.py
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hj.settings')
django.setup()

from shop.models import Category, Product


def seed_data():
    """Create sample categories and products."""

    # Create Categories
    categories_data = [
        {"name": "Necklaces", "description": "Handcrafted necklaces in gold-filled and vermeil"},
        {"name": "Earrings", "description": "Studs, drops, and sculptural earrings"},
        {"name": "Bracelets", "description": "Cuffs, beads, and bangles"},
    ]

    categories = {}
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            name=cat_data["name"],
            defaults={"description": cat_data["description"]}
        )
        categories[cat_data["name"]] = category
        status = "✅ Created" if created else "⏭️  Exists"
        print(f"{status}: Category '{category.name}'")

    # Create Products
    products_data = [
        {
            "name": "Solar Arc Pendant",
            "category": "Necklaces",
            "description": "A bold arc pendant in 18k gold-filled brass, handcrafted to catch the light at every angle.",
            "material": "18k Gold-filled Brass",
            "price": 22000,
            "image_url": "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=600&h=700&fit=crop&auto=format",
        },
        {
            "name": "Cascade Drop Earrings",
            "category": "Earrings",
            "description": "Layered gold drops that move with you. Sterling silver posts with gold vermeil finish.",
            "material": "Gold Vermeil Sterling Silver",
            "price": 14000,
            "image_url": "https://images.unsplash.com/photo-1722410180651-efd51636f260?w=600&h=700&fit=crop&auto=format",
        },
        {
            "name": "Coil Cuff Bracelet",
            "category": "Bracelets",
            "description": "An architectural open cuff that stacks beautifully or stands alone.",
            "material": "18k Gold-filled Brass",
            "price": 17000,
            "image_url": "https://images.unsplash.com/photo-1723361656145-b481be3f9e05?w=600&h=700&fit=crop&auto=format",
        },
        {
            "name": "Lattice Collar",
            "category": "Necklaces",
            "description": "A statement piece: woven gold wire forms a delicate geometric collar.",
            "material": "Gold Vermeil Sterling Silver",
            "price": 25000,
            "image_url": "https://images.unsplash.com/photo-1722410180644-5955f83ec8b1?w=600&h=700&fit=crop&auto=format",
        },
        {
            "name": "Lunar Stud Set",
            "category": "Earrings",
            "description": "Set of three crescent and circle studs. Perfect for curated ear stacks.",
            "material": "14k Gold-filled",
            "price": 9500,
            "image_url": "https://images.unsplash.com/photo-1723726871280-ab921c7e60c0?w=600&h=700&fit=crop&auto=format",
        },
        {
            "name": "Gathered Bead Bracelet",
            "category": "Bracelets",
            "description": "Hand-strung gold and pyrite beads on durable silk thread with a gold clasp.",
            "material": "Pyrite & Gold-filled Beads",
            "price": 10500,
            "image_url": "https://images.unsplash.com/photo-1626784215013-13322cb0e471?w=600&h=700&fit=crop&auto=format",
        },
    ]

    print("\n" + "="*50)
    print("Creating Products...")
    print("="*50)

    for prod_data in products_data:
        category = categories[prod_data["category"]]

        # Check if product exists
        existing = Product.objects.filter(name=prod_data["name"]).first()
        if existing:
            print(f"⏭️  Exists: {prod_data['name']}")
            continue

        # Create product (without actual image file for now)
        product = Product(
            name=prod_data["name"],
            category=category,
            description=prod_data["description"],
            material=prod_data["material"],
            price=prod_data["price"],
            is_available=True,
        )

        # We'll skip the image for seed data since it requires downloading
        # The admin can add images manually
        product.save()
        print(f"✅ Created: {product.name} - ₦{product.price:,.0f}")

    print("\n" + "="*50)
    print("🎉 Sample data loaded successfully!")
    print("="*50)
    print(f"   Categories: {Category.objects.count()}")
    print(f"   Products: {Product.objects.count()}")
    print("\n📝 Note: Product images need to be added via the admin panel.")
    print("   Visit http://127.0.0.1:8000/admin/ after starting the server.")


if __name__ == '__main__':
    seed_data()
