# Library Management System
**Full Stack Web Application: Angular & Spring Boot**  
**Course Code:** UECS3563 Industry Professional Domain Skill Development

---

## 📌 Project Overview
This repository contains a full-stack Single Page Application (SPA) designed to catalog, search, filter, and track book loans and inventory statuses.

> **Academic Note / FYP Clarification:**  
> This prototype is developed as an independent system and does not share the scope or business logic of the Final Year Project (FYP). It is built to validate core full-stack competencies including decoupled component architecture, reactive state management, asynchronous data streams, RESTful API design, and ORM database persistence.

---

## 🏗️ System Architecture & Component Hierarchy

### Frontend Architecture (Angular 22)
* **Root Component:** `AppComponent` (Global application shell and navigation bar)
* **Smart Container Component:** `BookListComponent` (Orchestrates HTTP calls, category filters, and state)
* **Dumb / Presentational Child:** `BookCardComponent` (Receives `@Input() book`, emits `@Output()` actions)
* **Leaf Grandchild:** `BookStatusBadgeComponent` (Renders dynamic styles based on book availability)
* **Routed Form Component:** `BookFormComponent` (Model-driven Reactive Form with multi-field validation)

### Backend Architecture (Spring Boot 3)
* **Controller Layer:** `BookController` (RESTful endpoints, path/query params, validation interception)
* **Data Access Layer:** `BookRepository` (Spring Data JPA, derived queries, JPQL search, and native queries)
* **Domain Model:** `Book` entity mapped via Hibernate ORM with Jakarta Bean Validation constraints
* **Exception Interceptor:** `GlobalExceptionHandler` with `@RestControllerAdvice` returning structured JSON error payloads

---

## 🚀 Getting Started & Local Setup

### Prerequisites
* **Java Development Kit (JDK):** Version 17 or 21
* **Node.js & npm:** Node v20+ / npm v10+

---

### 1. Backend Setup (Spring Boot)
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend