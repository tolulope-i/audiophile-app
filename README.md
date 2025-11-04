# Audiophile E-Commerce Store

A modern, responsive e-commerce platform for premium audio equipment. Built with **Next.js App Router**, **Convex** backend, **Tailwind CSS**, and **TypeScript**.

Live Demo: [https://tolu-audiophile-app.vercel.app](https://tolu-audiophile-app.vercel.app) 

---

## Features

- **Responsive Design** – Mobile-first, fully adaptive layout
- **Cart Management** – Add, remove, update quantities
- **Checkout Flow** – Multi-step form with real-time validation
- **Order Persistence** – Orders saved to Convex backend
- **Email Confirmations** – Nodemailer sends order receipt
- **Admin-Ready Backend** – Convex schema with `orders`, `carts`, `products`
- **Image Optimization** – Next.js `<Image>` with remote pattern support
- **Fast Development** – Hot reload, Convex dev sync

---

## Tech Stack

| Layer           | Technology                                  |
|----------------|---------------------------------------------|
| Framework       | [Next.js 14+ (App Router)](https://nextjs.org) |
| Language        | TypeScript                                  |
| Styling         | Tailwind CSS                                |
| Backend         | [Convex](https://convex.dev)                |
| Database        | Convex (real-time, serverless)              |
| Email           | Nodemailer                                  |
| Deployment      | Vercel (recommended)                       |
| State (Client)  | React Context (`CartProvider`)              |

---


---

## Prerequisites

- Node.js **18+**
- npm or pnpm or yarn
- [Convex account](https://dashboard.convex.dev)
- [Vercel account](https://vercel.com) (optional but recommended)

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/tolulope-i/audiophile-app
cd audiophile-app
npm install
