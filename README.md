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

---

## Note

Generating a logo is a complex process that can take up to 2–3 minutes, depending on the length and complexity of your prompt. This duration is typical for AI-driven image generation tasks, as the system processes your inputs to create a unique design. 

Occasionally, logo generation may fail due to limitations in the usage provided by Hugging Face, as the model is accessed via their Inference API. 

Your patience is appreciated during the logo creation process and recommend waiting for the system to complete the generation. If a failure occurs, please try again later.

---

---

## Regarding Deployment

Currently, the application is not deployed to a production environment due to the time constraints associated with generating logos. The AI-driven logo creation process can take approximately 2–3 minutes to complete. However, on Vercel's Hobby plan, serverless API routes have a maximum execution duration of 5 seconds, which can be configured up to 60 seconds. If a function exceeds this limit, it results in a 504 GATEWAY TIMEOUT error.

This limitation is the reason why the web app has not been deployed to production.

--- 

## Disclaimer


