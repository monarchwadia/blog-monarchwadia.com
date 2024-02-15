---
title: "Generative AI Slashes Data Entry Unit Costs by Over 97%"
layout: post
date: 2024-02-12
tags: gpt-4 ai genai generative-ai data-entry business cost calculator
excerpt: Generative AI also greatly increases the efficiency, reliability, scalability, and flexibility of processes that are driven by it.
---

# Executive Summary

A tremendous **97.43% reduction in unit cost of data entry** can be realized using Generative AI, with zero additional training costs. Since any process created using Generative AI is just a piece of software, we also see great increases in other areas such as efficiency, reliability, scalability, and flexibility of change.

# Simulation & Simulated Case Study

## Goal & Methodology

The goal of this simulated case study is to clearly show the benefits of Generative AI when it comes to data entry tasks. For this task, I chose **Data Classification** as the task to be done. I also created a simple, interactive calculator where you can change the variables very easily and explore the simulation yourself.

## Scenario: Newspaper Article Reclassification

In this scenario, we will take on the role of the IT department in a large online newspaper. A new requirement has been prioritized for the development team which requires manual data entry. I will make the case for using OpenAI to rapidly complete the data entry task instead of involving manual data entry teams, which tend to be expensive and slow.

### The new requirement: Filter by Category

The newspaper's Product and Design teams have been hard at work re-designing the newspaper's main customer-facing website, which sees many millions of visitors per month. 

Part of the redesign involves a Proof of Concept for a brand new "category" filter. This filter will let users rapidly navigate articles using four categories: "Art," "Business," "Culture" and "Entertainment." 

Users can categorize both old articles from the newspaper's archives as well as new articles that were recently published.

### Analysis of the data

Looking at the database, we discover approximately 100,000 articles from the past 10 years that we will have to reclassify.

![UML diagram showing 100,000 newspaper articles being classified by a classification system into the categories "Art", "Business", "Culture" and "Entertainment".](/assets/2024-02-12-ai-cost-reduction-for-data-entry-puml.png)

<div id="calculator-root"></div>

<script>
    const calculatorDom = `
<h1>Unit Cost Savings Calculator</h1>
<p>You can use this calculator to see how much money you could save on data entry by using AI. The calculations are based on the case study below.</p>
<br/>
<table>
    <tr>
        <td>Number of Articles</td>
        <td>
            <input type="range" min="1000" max="1000000" value="100000" onInput="onInputChange()" id="numArticles">
            <span id="numArticlesValue">100000</span>
        </td>
    </tr>
    <tr>
        <td>Manual Entry Speed (articles/hour)</td>
        <td>
            <input type="range" min="50" max="200" value="100" onInput="onInputChange()" id="manSpeed">
            <span id="manSpeedValue">100</span> articles per hour
        </td>
    </tr>
    <tr>
        <td>Manual Entry Salary ($/hour)</td>
        <td>
            <input type="range" min="1" max="30" value="10" onInput="onInputChange()" id="manSalary">
            $<span id="manSalaryValue">10</span> per hour
        </td>
    </tr>
    <tr>
        <td>Manual Entry Cost:</td>
        <td><strong>$<span id="estimatedManualCost">10,000</span></strong></td>
    </tr>
    <tr>
        <td>Cost using AI:</td>
        <td><strong>$<span id="estimatedAiCost">257.50</span></strong> (Using OpenAI GPT-3.5 Turbo)</td>
    </tr>
    <tr>
        <td>Savings Percentage:</td>
        <td><strong><span id="estimatedPctSavings">--</span>%</strong></td>
    </tr>
</table>
`;


    function calculateManualCost() {
        const numArticles = parseInt(document.getElementById("numArticles").value, 10);
        const manSpeed = parseInt(document.getElementById("manSpeed").value, 10);
        const manSalary = parseInt(document.getElementById("manSalary").value, 10);
        
        const hours = numArticles / manSpeed;
        const cost = hours * manSalary;
        
        return cost;
    }

    function calculateAiCost() {
        const numArticles = parseInt(document.getElementById("numArticles").value, 10);

        const averageInputLength = 5000;
        const totalInputTokens = numArticles * averageInputLength;
        const averageInputCostPer1000Tokens = 0.0005;
        const inputCost = averageInputCostPer1000Tokens * (totalInputTokens / 1000);

        const averageOutputLength = 50;
        const averageOutputCostPer1000Tokens = 0.0015;
        const totalOutputTokens = numArticles * averageOutputLength;
        const outputCost = averageOutputCostPer1000Tokens * (totalOutputTokens / 1000);

        const totalCost = inputCost + outputCost;

        return totalCost;
    }

    function onInputChange() {
        document.getElementById("numArticlesValue").innerText = document.getElementById("numArticles").value;
        document.getElementById("manSpeedValue").innerText = document.getElementById("manSpeed").value;
        document.getElementById("manSalaryValue").innerText = document.getElementById("manSalary").value.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
        
        const manCost = calculateManualCost();
        const aiCost = calculateAiCost();
        document.getElementById("estimatedManualCost").innerText = manCost.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
        document.getElementById("estimatedAiCost").innerText = aiCost.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});

        const savingsPct = ((manCost - aiCost) / manCost) * 100;
        document.getElementById("estimatedPctSavings").innerText = savingsPct.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("calculator-root").innerHTML = calculatorDom;
        onInputChange(); // Initialize with default values
    });
</script>

---

# Cost Calculation for Manual Classification - Method #1

We estimated a cost of **$10,000** At an hourly salary of $10/hour, and with an average speed of 100 articles classified per hour.

## Detailed Breakdown

To estimate the cost of manually classifying 100,000 newspaper articles, we consider the hourly wage and the average processing speed.

| Parameter              | Value             |
|------------------------|-------------------|
| **Total Articles**     | 100,000           |
| **Average Speed**      | 100 articles/hour |
| **Hourly Salary**      | $10               |
|     **Hours of Effort Needed:**                    |    **1,000 hours** (100,000 articles / 100 articles per hour)               |
| **Total Cost:** | **$10,000** (1,000 hours * $10/hour) |

---

# Cost Calculation for GPT-3.5-Based Classification - Method #2

We estimated a cost of **$257.50** for classifying 100,000 newspaper articles using GPT-3.5 Turbo, taking into account both the input and output processing costs associated with using the API.

## Detailed Breakdown

To calculate the cost of using GPT-3.5 Turbo for classifying 100,000 newspaper articles, we consider both the input and output processing costs.

| Parameter                         | Value                                                  |
|-----------------------------------|--------------------------------------------------------|
| **Total Articles**                | 100,000                                                |
| **Average Article Length**        | 5000 tokens (about 3500 words)                         |
| **Average Classification Length** | 50 tokens                                              |
| **Input Cost (per 1,000 tokens)** | $0.0005                                                |
| **Output Cost (per 1,000 tokens)**| $0.0015                                                |
| **Total Input Tokens**            | **500,000,000 tokens** (100,000 articles * 5000 tokens/article)  |
| **Total Output Tokens**           | **5,000,000 tokens** (100,000 classifications * 50 tokens/classification) |
| **Input Cost**                    | **$250** ((500,000,000 tokens / 1,000) * $0.0005)            |
| **Output Cost**                   | **$7.5** ((5,000,000 tokens / 1,000) * $0.0015)             |
| **Total Cost:**                   | **$257.5** (Input Cost + Output Cost)                   |

Classifying 100,000 newspaper articles using GPT-3.5 Turbo, considering the specified input and output token costs, would approximately cost **$257.50**. This demonstrates the cost-effectiveness of AI-based classification over traditional manual methods.


---

## Impact of using AI in data classificaiton.

AI adoption in data classification brings immediate cost and time benefits while promoting a strategic, analytical approach to large dataset utilization.

### Cost Efficiency
AI classification dramatically reduces costs **from $10,000 to just $257.50** (a reduction of **97.43%**), enabling significant savings and operational scaling without major budget increases.

### Scalability
AI provides scalable solutions, easily handling large datasets without the cost and time escalation seen with manual labor, essential for modern data growth.

### Accuracy and Consistency
AI delivers consistent classification once trained, ensuring dataset uniformity. However, it requires monitoring to avoid biases.

### Time Savings
AI processes 100,000 articles almost instantly, offering massive time savings over manual methods that need 1,000 hours, speeding up decision-making.

### Enhanced Analysis Opportunities
Savings from AI allow for investment in deeper data analysis, yielding richer insights and more strategic outcomes.

### Workforce Shift
Transitioning to AI classification changes workforce demands, reducing manual processing roles in favor of AI oversight, training, and maintenance.