# Inventory Management System (Express.js Lab)

A professional Inventory Management Dashboard built with **Node.js**, **Express**, and **Pug** template engine. This project implements a full REST API with Server-Side Rendering (SSR).

## Features
- **Full CRUD Operations**: Create, Read, Update, and Delete inventory items.
- **SSR with Pug**: Dynamic HTML pages with styled components.
- **Validation Middleware**: Ensures data integrity (positive numbers, required fields).
- **Auto-increment IDs**: Automatically calculates the next ID based on the existing database.
- **Stock Management**: Special routes for `restock` and `destock` actions.
- **Query Filtering**: Filter products by `category` or `status=low`.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-link>
   cd <folder-name>