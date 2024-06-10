---
title: "Use OpenAI in your JavaScript project the easy way with Ragged"
layout: post
date: 2024-06-10
tags: javascript openai gpt-4 generative-ai typescript web-development ragged tutorial
toc: false
excerpt: Learn how to easily integrate OpenAI's API into your JavaScript projects using Ragged. This tutorial provides a step-by-step guide to set up Ragged and create a basic application, enabling seamless interaction with OpenAI's models.
---

# Use OpenAI in your JavaScript project the easy way with Ragged

## Introduction

Welcome to this simple tutorial on how to use OpenAI’s API in JavaScript. In this tutorial, we will be taking the help of Ragged, which is a library that makes working with OpenAI very easy and uncomplicated.

In this tutorial, we’ll walk you through the steps to set up Ragged and create a basic application. By the end of this article, you’ll have a solid understanding of how to interact with OpenAI’s models using JavaScript.

## What is Ragged?

Ragged is a universal LLM client for JavaScript and TypeScript. It offers an easy-to-understand API to access various language models, including those from OpenAI. With Ragged, you can seamlessly integrate LLM capabilities into your frontend as well as backend projects.

## Prerequisites

Before we begin, ensure you have the following installed on your machine:

1. Node.js is installed on your machine
2. You have an OpenAI API key

## Setting Up Ragged

First, let’s create a new JavaScript project. Open your terminal and run the following commands:

```sh
mkdir openai-ragged-tutorial
cd openai-ragged-tutorial
npm init -y
npm pkg set type="module"
```

Next, install Ragged:

```sh
npm install ragged
```

## Writing the Hello World Application

Now, let’s write our “Hello World” application using Ragged. Create a new file named `index.js` and add the following code:

```javascript
import { Chat } from "ragged/chat";

// Create a new Chat instance with the OpenAI provider
const c = Chat.with('openai', { apiKey: process.env.OPENAI_API_KEY });

// Async function to handle the chat interaction
async function main() {

  // Chat with the model
  await c.chat('What is the meaning of life?');
  console.log(c.history.at(-1)?.text); // Output: "The meaning of life is to be happy."

  await c.chat('Repeat what you just said, but in hindi.');
  console.log(c.history.at(-1)?.text); // Output: "जीवन का अर्थ खुश रहना है।"

}

// Run the main function
main();
```

In this code:

- We import the `Chat` class from Ragged.
- We create a new instance of `Chat` with the OpenAI provider.
- We define an asynchronous `main` function to handle the chat interaction.
- We chat with the OpenAI model and translate its response to Hindi.

Next, you need to run this application using your OpenAI API key as an environment variable.

```sh
OPENAI_API_KEY=your_api_key node index.js
```

Make sure you replaced `your_api_key` with the actual key from OpenAI.

You should see a response from the OpenAI model printed in your terminal.

### 401 Problems?

If you got a “non-200 response” or an indicator that the “Status was 401”, this means you may have provided the incorrect API key. Check that the `OPENAI_API_KEY` variable was set correctly and try again.

## Exploring More Features

Ragged offers more than just basic chat capabilities. You can access and manipulate the message history, use tools, and create autonomous agents. To learn more, you can read [Ragged’s documentation](https://github.com/monarchwadia/ragged).

## Conclusion

In this tutorial, we covered the basics of setting up Ragged and creating a simple “Hello World” application using OpenAI’s API. Ragged makes it easy to integrate LLM capabilities into your JavaScript projects with minimal setup and effort.

Feel free to explore the [Ragged documentation](https://github.com/monarchwadia/ragged) for more advanced features and use cases. Happy coding!
