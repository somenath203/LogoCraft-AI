# LogoCraft AI

## Introduction

LogoCraft AI is a web application that enables users to create personalized logos for their websites, apps, or businesses with the help of AI. The app provides a step-by-step process where users can specify details like the title, description, color palette, and design type for their logos. Based on these inputs, the Google Gemini API generates logo ideas, and users can select their preferred design. Once finalized, the app generates a high-quality logo using advanced AI models. Users can download their logos and manage them through a user-friendly dashboard.

Each user starts with 10 credits, and every logo generation consumes 5 credits. Additional credits can be purchased if needed.

---

## Features of the Application

- **User Authentication**: Secure account creation and login using Clerk.
- **Step-by-Step Logo Creation**:
  - Enter logo title and description.
  - Choose a color palette.
  - Select a design type.
  - Generate logo ideas with Google Gemini API.
  - Review details and generate the final logo.
- **Logo Management**: Download logos and view them on the dashboard.
- **Credits System**: Each user gets 10 free credits upon account creation. Logo generation costs 5 credits per logo, and additional credits can be purchased.
- **Payment Integration**: Users can buy 20 credits for Rs. 300 through Cashfree payments.

---

## Technologies Used

- **Clerk**: For user authentication and account management.
- **Next.js**: A modern framework for building the web application.
- **TailwindCSS**: For responsive and efficient styling.
- **Shadcn UI**: For beautiful and reusable UI components.
- **Google Gemini API**: To generate creative logo ideas based on user inputs.
- **Flux-Midjourney-Mix2-LoRA Model**: An open-source AI model from Hugging Face for generating logos.
- **Cashfree Payments**: To handle credit purchases securely.
