# Logger Service with NestJS, RabbitMQ, Grafana, Loki, NGINX, and Docker

## Overview

This project demonstrates the implementation of a logger service using modern technologies such as NestJS, RabbitMQ, Grafana, Loki, NGINX, and Docker. The service aims to provide efficient logging capabilities with distributed architecture, centralized log management, and load balancing using NGINX.

## Features

*   NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
*   RabbitMQ: A message broker that enables applications to communicate and scale easily, providing robust messaging features.
*   Grafana: A leading open-source platform for monitoring and observability, allowing visualization and analysis of metrics collected from various sources.
*   Loki: A horizontally-scalable, highly-available log aggregation system inspired by Prometheus.
*   NGINX: A high-performance HTTP server and reverse proxy that also offers load balancing, caching, and TLS/SSL termination capabilities.
*   Docker: A containerization platform that enables seamless deployment and scaling of applications.

## Prerequisites

Ensure you have the following installed on your system:

*   Node.js and npm
*   Docker and Docker Compose

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd logger-service
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start Docker containers:**

    ```bash
    docker-compose up -d
    ```

5. **Access the service at [http://localhost:3000](http://localhost:3000).**


## Configuration

*   Configure RabbitMQ connection settings in `src/config/rabbitmq.config.ts`.
*   Grafana and Loki configurations can be adjusted in `docker-compose.yml` and related configuration files.
*   NGINX configuration can be modified in `nginx/nginx.conf` to define load balancing and routing rules.

## Usage

*   Producer: Send log messages to the Logger Service using HTTP protocol.
*   Consumer: Implement a RabbitMQ microservice to consume log messages from the RabbitMQ exchange configured in `src/config/rabbitmq.config.ts`.
*   Grafana can be accessed at `http://localhost:3000` to create dashboards and visualize log data stored in Loki.

## NGINX Setup

*   NGINX is configured as a reverse proxy and load balancer to distribute incoming HTTP requests among multiple instances of the Logger Service.
*   Modify the NGINX configuration (`nginx/nginx.conf`) according to your load balancing requirements and the number of Logger Service instances.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.