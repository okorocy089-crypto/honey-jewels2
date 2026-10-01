🍯 Honey Jewels - Jewelry Showcase Website
A fullstack Django website for Honey Jewels, a handcrafted jewelry business based in Enugu, Nigeria.
Tech Stack
Backend: Python / Django
Frontend: HTML5, CSS3, Vanilla JavaScript
Database: SQLite (development)
Design: Light mode with gold accents
Features
✅ Product catalog with categories
✅ Shopping cart (localStorage-based)
✅ WhatsApp checkout integration
✅ Responsive design (mobile-first)
✅ Hero image slider
✅ Admin panel for product management
✅ Light mode color scheme
✅ Circular about section image
✅ No hamburger menu (cart icon only)
Quick Start
1. Clone/Download the project
```bash
cd hj_django
```
2. Create a virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```
3. Run the setup script
```bash
python setup.py
```
This will:
Install dependencies
Run database migrations
Create a superuser account
Optionally load sample data
4. Start the development server
```bash
python manage.py runserver
```
5. Visit the site
Website: http://127.0.0.1:8000/
Admin Panel: http://127.0.0.1:8000/admin/
Manual Setup (Alternative)
If you prefer manual setup:
```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data (optional)
python seed_data.py

# Start server
python manage.py runserver
```
Project Structure
```
hj_django/
├── hj/          # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── shop/                  # Main application
│   ├── models.py          # Category, Product models
│   ├── views.py           # Home, product views
│   ├── admin.py           # Admin configuration
│   └── templatetags/      # Custom template filters
├── templates/
│   ├── base.html          # Base template
│   └── shop/
│       └── index.html     # Main page
├── static/
│   ├── css/
│   │   └── style.css      # All styles
│   ├── js/
│   │   └── main.js        # Cart, slider, interactions
│   └── images/
│       ├── logo.png       # Honey Jewels logo
│       └── favicon.png    # Site favicon
├── media/                 # User uploads (product images)
├── manage.py
├── requirements.txt
├── setup.py               # Automated setup script
└── seed_data.py           # Sample data loader
```
Admin Panel
Access the admin panel at `/admin/` to:
Add/edit/delete products
Manage categories
Upload product images
Set featured products
Customization
WhatsApp Number
Edit `hj/settings.py`:
```python
WHATSAPP_NUMBER = '2347038731910'  # Your WhatsApp number
```
Colors
Edit CSS variables in `static/css/style.css`:
```css
:root {
    --color-gold: #D4A847;
    --bg-primary: #FAF8F4;
    /* ... */
}
```
Deployment
For production deployment:
Set `DEBUG = False` in settings.py
Configure `ALLOWED_HOSTS`
Use a production database (PostgreSQL recommended)
Set up static file serving (WhiteNoise or CDN)
Use environment variables for secrets
License
© 2026 Honey Jewels. All rights reserved.
