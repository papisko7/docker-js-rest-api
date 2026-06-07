# 📚 Library API - Node.js & MongoDB Containerization (Academic Project)

This project implements the full containerization of a web application (REST API) built with **Node.js (Express)** and integrated with a **MongoDB** database. The main objective of the project was to deploy and compare two containerization architectures using **Docker** and **Docker Compose**.

## 🚀 Application Features
* **REST API:** Full CRUD operations implementation for the `books` resource.
* **UI (Frontend):** A simple user interface rendered using the **EJS** template engine, allowing library management directly from the browser.
* **Swagger Documentation:** Automatically generated and interactive documentation of all API endpoints, accessible via Swagger UI.

---

## 🏗️ Containerization Architecture (Two Variants)

Two approaches to environment architecture have been implemented in this project:

### Variant 1: Monolith (Everything in a single container)
The Node.js application and the MongoDB database run inside a single, shared container. This solution is based on an official MongoDB image, inside of which the Node.js environment is installed manually during the image build process. The processes are coordinated using a custom startup script.

### Variant 2: Separation of Services (Docker Compose) - *Recommended*
An approach fully aligned with microservices best practices. The database and the application run in completely isolated containers, connected by a dedicated internal `bridge` network. Data persistence for the database is ensured using Docker volumes (*named volumes*).

---

## 🛠️ System Requirements
* Installed [Docker Desktop](https://www.docker.com/products/docker-desktop/) environment (with WSL 2 support enabled on Windows).

---

## ⚙️ Setup and Launch Instructions

Before launching, make sure that any local MongoDB instance running on your operating system is stopped to avoid port conflicts.

### Launching Variant 2 (Docker Compose - Recommended)

1. Navigate to the project's root directory in your terminal.
2. Build and start the containers in the background using a single command:
   ```bash
   docker compose up --build -d