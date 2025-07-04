Events Management App (React + Flask)

This is a small learning project demonstrating a simple full-stack setup using React and Flask.

 Project Structure

 Frontend (React)

Located in the frontend/ folder

Structured with modular folders:

pages/ – for top-level views like ViewSpeakers, EventRegistration

components/ – for reusable UI like SpeakerForm

hooks/ – for logic (e.g., form handling)

Uses Axios to communicate with the backend (look services/)

Talks to Flask via API_URL 

🔧 Backend (Flask)

Located in the backend/ folder

Organized using Blueprints

Contains:

routes.py – defines API endpoints

models/ – SQLAlchemy models

uploads/ – image uploads

utils/ – helper functions

🔗 Communication

Frontend calls backend REST APIs using Axios

Flask serves data and image files

File uploads saved to backend/uploads

🚧 Status

In development, focused on learning

Basic CRUD for speakers and registrations

Update implemented, delete pending

No authentication or advanced features yet

Note: Run each server separately. Frontend runs on localhost:3000, backend on localhost:5000.