---
title: "Generative AI slashes data entry costs by 97%"
layout: post
date: 2024-02-12
tags: gpt-4 ai genai generative-ai data-entry business cost calculator
excerpt: According to my calculations, a whopping 97.43% reduction in unit cost of data entry can be realized using Generative AI, without any custom fine-tuning or training of models (i.e. through using just prompts to guide the model’s behaviour). This is very exciting, because prompting is very cost efficient, comparable to traditional software development methods.
---

I was doing a few back-of-the-napkin calculations and found a way to express, using numbers, exactly how tremendously cost-effective generative AI can be. 

According to my calculations, a whopping **97.43% reduction in unit cost of data entry** can be realized using Generative AI, without any custom fine-tuning or training of models (i.e. through using just prompts to guide the model's behaviour). This is very exciting, because prompting is very cost efficient, comparable to traditional software development methods.

Now obviously this is only going to be true in a select number cases; AI is not yet mature enough to replace every single human job. The task that I chose was **Data Classification**, which includes things like Document Classification, Named Entity Recognition (NER), Sentiment Analysis, and Intent Recognition.

I wanted to share my calculations and make a simple calculator available to folks who are interested in playing around with the numbers.

## Scenario: Newspaper Article Reclassification

Let's use a concrete example. In this scenario, we will take on the role of the IT department in a large online newspaper. A new requirement has been prioritized for the development team which requires manual data entry.

### The new requirement: Filter by Category

The newspaper's Product and Design teams have been hard at work re-designing the newspaper's main customer-facing website, which sees many millions of visitors per month. 

Part of the redesign involves a Proof of Concept for a brand new "category" filter. 

This filter will let users rapidly navigate articles using four categories: "Art," "Business," "Culture" and "Entertainment." 

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
<div class="link float-right cursor-pointer" onClick="resetToDefaults()">Reset To Default</div>
`;

    function resetToDefaults() {
        document.getElementById("numArticles").value = 100000;
        document.getElementById("manSpeed").value = 100;
        document.getElementById("manSalary").value = 10;
        onInputChange();
    }

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

## Impact of using AI in data classificaiton.

In the default example above, we estimate a cost of **$10,000** At an hourly salary of $10/hour, and with an average speed of 100 articles classified per hour. On the other hand, classifying 100,000 newspaper articles using GPT-3.5 Turbo, considering the specified input and output token costs, would approximately cost **$257.50**. This demonstrates the cost-effectiveness of AI-based classification over traditional manual methods.

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
