---
title: "GPT-3.5 can result in 97.43% reduction in data entry costs."
layout: post
tags: boring-ai gpt-4 ai genai generative-ai
---

# Executive Summary

A **97.43% reduction in labour costs** can be realized using `GPT-3.5`. In the example below, we show the potential to **reduce costs from $10,000 to $257.50**.

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
