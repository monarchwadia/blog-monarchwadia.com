---
title: "Data Categorization (Boring GenAI #1)"
layout: post
tags: boring-ai gpt-4 ai genai generative-ai
---

# Description

Given some data, label each item as belonging to one or more categories.

# Example

You have 100,000 newspaper articles from the past 10 years. You've been tasked with classifying them as either Art, Business, Culture, or Entertainment.

{% plantuml %}

database "100,000 Newspaper Articles" as DB #9ff

rectangle "Classification System" as CS #ccc

package Categories {
    rectangle Art as A #f99
    rectangle Business as B  #9f9
    rectangle Culture as C #99f 
    rectangle Entertainment as E #f9f

    A -[hidden]r-- B
    B -[hidden]r-- C
    C -[hidden]r-- E
}

DB -down-> CS
CS -down-> A
CS -down-> B
CS -down-> C
CS -down-> E


{% endplantuml %}