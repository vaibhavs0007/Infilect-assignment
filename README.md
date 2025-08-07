# Infilect DevOps Assignment

## 📊 Monitoring Dashboard Overview

A lightweight monitoring system built with:

* **Frontend**: React
* **Backend**: Node.js + Express
* **CI/CD**: GitHub Actions
* **Containerization**: Docker
* **Orchestration**: K3s (Kubernetes)
* **Hosting**: AWS EC2

---

## 📐 System Architecture Diagram

> * Developer commits code to GitHub
> * GitHub Actions builds Docker images
> * Pushes images to DockerHub (`vaibhavcr77`)
> * Applies K8s manifests to K3s cluster (running in EC2)
> * K3s exposes FE (NodePort: 30300) & BE (NodePort: 30500)

---

## 🧰 Tech Stack & Reasoning

| Layer         | Technology            | Reason                                                           |
| ------------- | --------------------- | ---------------------------------------------------------------- |
| Frontend      | React                 | Lightweight, component-based UI for live metrics visualization   |
| Backend       | Node.js + Express     | Simple REST API to serve `/metrics` JSON                         |
| CI/CD         | GitHub Actions        | Automates build, test, deploy on code push                       |
| Containers    | Docker                | Environment consistency across dev, CI, and prod                 |
| Orchestration | K3s (lightweight K8s) | Ideal for EC2 micro/small instance, simpler than full Kubernetes |
| Hosting       | AWS EC2               | Provides full control of infrastructure                          |

---

## 🚀 Local Deployment Guide

### 🧱 Prerequisites

* Docker installed
* Docker Compose installed

### ⚙️ Steps

```bash
git clone https://github.com/vaibhavs0007/Infilect-assignment.git
cd Infilect-assignment

# Set environment variables
cp .env.example .env

# Start services
docker-compose up --build

# Access services
Frontend: http://localhost:3000
Backend: http://localhost:30500/metrics
```

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

Pipeline is triggered on:

* `push` to `main`
* `pull_request` to `main`

### Key Stages:

1. Checkout code
2. Install FE & BE dependencies
3. Lint & test both apps
4. Build Docker images and push to DockerHub (`vaibhavcr77`)
5. Deploy to K3s using base64 encoded kubeconfig from GitHub Secrets

> Ensure you store the following in GitHub Secrets:
>
> * `DOCKER_HUB_USERNAME`
> * `DOCKER_HUB_PASSWORD`
> * `KUBECONFIG_FILE` (base64 encoded kubeconfig)

---

## 🌐 Accessing the Services

| Service  | URL                                                                        |
| -------- | -------------------------------------------------------------------------- |
| Frontend | [http://13.201.249.246:30300](http://13.201.249.246:30300)                 |
| Backend  | [http://13.201.249.246:30500/metrics](http://13.201.249.246:30500/metrics) |

### 🔁 Live Metric Sample (JSON):

```json
{
  "cpu_usage": "77.41",
  "memory_usage": "55.29",
  "latency_ms": "57.54",
  "request_counter": 3841
}
```

---

## 📂 Repository Contents

```
├── backend/               # Node.js backend API
├── frontend/              # React frontend dashboard
├── docker-compose.yml     # Local multi-service setup
├── manifests/             # Kubernetes YAML files
├── .github/workflows/     # GitHub Actions CI/CD workflow
├── Dockerfile (FE & BE)   # Located in respective folders
