#!/usr/bin/env python
"""
Honey Jewels - Quick Setup Script
Run this after creating a virtual environment to set up the project.
"""
import os
import sys
import subprocess


def run_command(cmd, description):
    """Run a shell command and print status."""
    print(f"\n{'='*50}")
    print(f"⏳ {description}...")
    print(f"{'='*50}")
    result = subprocess.run(cmd, shell=True, capture_output=False)
    if result.returncode != 0:
        print(f"❌ Error: {description} failed")
        sys.exit(1)
    print(f"✅ {description} complete!\n")


def main():
    print("""
    ╔══════════════════════════════════════════╗
    ║                                          ║
    ║   🍯 HONEY JEWELS - SETUP WIZARD 🍯      ║
    ║                                          ║
    ╚══════════════════════════════════════════╝
    """)

    # Check if virtual environment is active
    if not hasattr(sys, 'real_prefix') and not (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("⚠️  Warning: Virtual environment not detected.")
        print("   It's recommended to use a virtual environment.")
        response = input("   Continue anyway? (y/n): ")
        if response.lower() != 'y':
            print("Setup cancelled.")
            sys.exit(0)

    # Install dependencies
    run_command("pip install -r requirements.txt", "Installing dependencies")

    # Run migrations
    run_command("python manage.py makemigrations", "Creating database migrations")
    run_command("python manage.py migrate", "Applying database migrations")

    # Create superuser
    print("\n" + "="*50)
    print("👤 Create admin superuser")
    print("="*50)
    run_command("python manage.py createsuperuser", "Creating superuser")

    # Collect static files
    run_command("python manage.py collectstatic --noinput", "Collecting static files")

    # Seed sample data
    response = input("\n🌱 Load sample products? (y/n): ")
    if response.lower() == 'y':
        run_command("python seed_data.py", "Loading sample data")

    print("\n" + "="*50)
    print("🎉 SETUP COMPLETE!")
    print("="*50)
    print("\nTo start the development server:")
    print("   python manage.py runserver")
    print("\nThen visit:")
    print("   🌐 Website: http://127.0.0.1:8000/")
    print("   🔐 Admin:   http://127.0.0.1:8000/admin/")
    print("\nHappy coding! 🚀")


if __name__ == '__main__':
    main()
