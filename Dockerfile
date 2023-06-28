# Base image for Python Flask
FROM python:3.10.6

WORKDIR /app

# Copy the Flask app source code
COPY app /app


# Install Python dependencies
RUN pip install --upgrade pip
# For some reason if not copied then run cannot find 
# requirements.txt
COPY requirements.txt /tmp/
RUN pip install --requirement /tmp/requirements.txt

# Copy all folders to containter root
COPY . .
# Expose port 5000 for the Flask app
EXPOSE 5000

# Set environment variable for Flask
ENV FLASK_APP=app/app.py
ENV FLASK_ENV=development

# Set up Flask development server command
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
