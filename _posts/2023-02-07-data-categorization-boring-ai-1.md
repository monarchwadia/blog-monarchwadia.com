---
title: "GPT-3.5 can result in 97.43% reduction in data entry costs."
layout: post
tags: gpt-4 ai genai generative-ai data-entry business cost calculator
---

# Executive Summary

A **97.43% reduction in labour costs** can be realized using `OpenAI GPT-3.5 Turbo`. In the example below, we show the potential to **reduce costs from $10,000 to $257.50**.

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
        <td><strong>$<span id="estimatedAiCost">257.50</span></strong></td>
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


# Conceptual Case Study

There is a set of 100,000 newspaper articles from the past 10 years. Your department been tasked with classifying them as either Art, Business, Culture, or Entertainment.

## Diagram

{% plantuml %}

database "100,000 Newspaper Articles" as DB #9ff

rectangle "Classification System" as CS #ccc

package Categories {
    rectangle Art as A #f99
    rectangle Business as B  #9f9
    rectangle Culture as C #99f 
    rectangle Entertainment as E #f9f

    A -[hidden]r- B
    B -[hidden]d- C
    C -[hidden]r- E
}

DB -down-> CS
CS -down-> A
CS -down-> B
CS -down-> C
CS -down-> E


{% endplantuml %}

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
