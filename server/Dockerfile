# Base Image
FROM python:3.8.12-slim

# Install netcat
RUN apt-get update && \
  apt-get -y install netcat python3-dev libpq-dev && \
  apt-get clean

# add and install requirements
COPY ./requirements.txt /app/server/requirements.txt
RUN pip install -r /app/server/requirements.txt

# add app
COPY . /app/server

# set working directory
WORKDIR /app

# run server
EXPOSE 5000
CMD python3 -m server