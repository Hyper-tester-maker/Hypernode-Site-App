FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy agent script
COPY agent.py .

# Make script executable
RUN chmod +x agent.py

# Environment variables
ENV HN_ENDPOINT=""
ENV HN_NODE_TOKEN=""

# Run agent
CMD python3 agent.py --endpoint ${HN_ENDPOINT} --token ${HN_NODE_TOKEN}
