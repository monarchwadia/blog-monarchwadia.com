---
title: "Free GenAI in Typescript with Cohere and Ragged: How to Get Started"
layout: post
date: 2024-06-12
tags: javascript openai gpt-4 generative-ai typescript web-development ragged tutorial
toc: false
excerpt: This blog will guide you through obtaining a free trial API key from Cohere without the need for a credit card, and getting started with your first AI application using the Ragged library.
---


## Introduction

Exploring the capabilities of large language models (LLMs) has never been easier, thanks to platforms like Cohere which now offer a straightforward and cost-free entry point. If you're a developer or a tech enthusiast eager to dive into the world of AI without the hassle of payment setups, you're in the right place. This blog will guide you through obtaining a free trial API key from Cohere and getting started with your first AI application using the [Ragged](https://github.com/monarchwadia/ragged) library.

## Getting Your Cohere API Key

Cohere has made it incredibly easy for anyone to get started with their APIs by offering a free trial key with every new account—no credit card required. Here's how you can sign up:
1. Visit [Cohere's website](https://cohere.com) and navigate to the signup page.
2. Enter your email and create a password.
3. Verify your email if required.

Once you have your account, you can access the "API Keys" page where you will find your free API key. If you don't see a trial key, click the "New Trial Key" button to create one. This key allows you to immediately start experimenting with Cohere's models.

## Setting Up Your Project with Ragged

[Ragged](https://github.com/monarchwadia/ragged) is an intuitive library that facilitates communication with different AI models, including Cohere's LLMs. Here’s a step-by-step guide on setting up a simple project using Ragged:

### 1. Install Node.js and npm

Ensure you have Node.js and npm installed on your computer. If not, you can download and install them from [nodejs.org](https://nodejs.org/).

### 2. Setup Your Project

Create a new directory for your project and initialize a new npm project:

```bash
mkdir my-cohere-project
cd my-cohere-project
npm init -y
npm pkg set type="module"
```

### 3. Install Dependencies

Install the `dotenv` package for managing environment variables and `ragged` for interfacing with Cohere:

```bash
npm install dotenv ragged
```

### 4. Configure Environment

Create a `.env` file in your project directory and add your Cohire API key:

```sh
COHERE_API_KEY=your_cohere_api_key_here
```

### 5. Create Your Chat Application

Now, create a file named `app.js` and input the following code:

```javascript
import { config } from 'dotenv';
config();
import { Chat } from "ragged/chat";

const c = Chat.with('cohere', { apiKey: process.env.COHERE_API_KEY, model: 'command-light' });

async function getResponse() {
    const messages = await c.chat('What is a rickroll?');
    console.log(messages.at(-1)?.text); // Prints the response
}

getResponse().catch(e => console.error(e));
```

### 6. Running Your Application

To run your application, simply execute the following command in your terminal:

```bash
node app.js
```

This will trigger your application to ask Cohere "What is a rickroll?", and you'll receive an AI-generated definition in your console.

```
A rickroll is an Internet meme involving an unexpected appearance of the music video for the 1987 song "Never Gonna Give You Up" by English singer Rick Astley. The meme is a type of bait and switch, usually using a disguised hyperlink that leads to the music video. The trend began in 2007 and has been called "the decade's most enduring meme" by the *Los Angeles Times*.
```

## Conclusion

Congratulations! You've just set up your first AI application using Cohere's API and Ragged! This example barely scratches the surface of what's possible with these powerful tools. As you become more familiar with the capabilities of LLMs, you'll find endless ways to integrate AI into your projects. 

Happy coding!
