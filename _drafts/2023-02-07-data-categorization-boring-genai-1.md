---
title: "Data Categorization (Boring GenAI #1)"
layout: post
tags: boring-ai gpt-4 ai genai generative-ai
---


# Intent

One of the most common ways to organize data is to tag each individual record with a set of categories that it falls into. For example, consider the following screen.

{% plantuml %}
@startsalt
{
  
  {
    [Tags]
        Sports (32)     
        Culture (14)    
        Philosophy (9)  
  } |
  {
    [Articles]
     "The Zen in Martial Arts" (Categories: Sports Philosophy)                         
     "Digital Art Renaissance" (Categories: Culture)                                   
     "The Philosophical Underpinnings of Yoga" (Categories: Philosophy, Culture)       
     "The Evolution of Language in Modern Culture" (Categories: Culture, Philosophy)   
     "From Chess to eSports" (Categories: Sports, Culture)                             
  }
}
@endsalt

{% endplantuml %}

There are multiple categories, and posts can belong to many such categories, making it a true many-to-many relationship. This can be represented in a many-to-many table.

{% plantuml %}

@startuml

entity "Post" as Post {
  +id: int
  title: varchar
  content: text
}

entity "Category" as Category {
  +id: int
  name: varchar
}

entity "PostCategories" as PostCategories {
  +postId: int
  +categoryId: int
}

Post ||--|{ PostCategories
Category ||--|{ PostCategories
@enduml

{% endplantuml %}



So you often see web applications whose data is organized into a persistence layer for the core data (Truth Layer), a set of tags that categorize that data (Tag Layer), and a layer that contains the business logic to query, manipulate, and display that data to users (Web Layer).

{% plantuml %}

@startuml

package WebLayer as t1 {
    rectangle React
    rectangle NodeJS
    rectangle Redis

    React<->NodeJS
    NodeJS<->Redis
}
package TagLayer as t2 {
    rectangle Sports
    rectangle Culture
    rectangle Philosophy
    rectangle News
}
package TruthLayer as t3 {
    rectangle "News Article #ABC-1234"
    rectangle "Sports Blog #XYZ-3456"
}

t2 <-> t3
NodeJS <---> t2
NodeJS <---> t3


{% endplantuml %}

**Data categorization** is a process that generates metadata on top of already-existing objects while leaving those objects unchanged. 

# Problem

Imagine that you're building a Todo application. You've already built the first version of your app. The majority of your data lives in the "Todos" table. The app is bug-free, and you're very happy with your work.

After a while, the application becomes very popular. There are many free users now, and your product is regularly praised as being one of the best free Todo apps out there. This is great news!

Unfortunately, despite this fact, users seem hesitant to pay for your product, which lacks many features that established Todo apps already have. There seems to be little reason for users to pay for your product. 

To get around this issue, you realize you need a unique offering that no other Todo app offers to its users. You've heard about Generative AI quite a bit, and start looking into it to find out how it could be used to give your app that "killer feature" it needs to stand out from the crowd and convince users to pay for the premium version.


# Solution

You realize that **OpenAI's GPT-3.5** offers a cost-effective method for performing **zero-shot classification**. Using GPT-3.5,  it is possible to prompt the AI to classify Todo tasks using an array of tags.



{% plantuml %}
@startuml
!define Task rectangle
!define Category rectangle
!define TransparentCategory rectangle

rectangle "Todos" {
    top to bottom direction

    Task "Finalize presentation for tomorrow's meeting" as task1
    Task "Write a blog post about recent tech trends" as task2
    Task "Organize the monthly team building event" as task3
    Task "Review and update personal investment plan" as task4

    task1 -[hidden]down->task2
    task2 -[hidden]down->task3
    task3 -[hidden]down->task4
}

{% endplantuml %}


These objects can either structured data such as JSON blobs and database records, as well as unstructured data like blog articles and user-generated text.

##

Simply put, c

{% plantuml %}
@startuml

top to bottom direction

!define Task rectangle
!define Category rectangle
!define TransparentCategory rectangle

rectangle "Todos" {
    left to right direction

    Task "Finalize presentation for tomorrow's meeting" as task1
    Task "Write a blog post about recent tech trends" as task2
    Task "Organize the monthly team building event" as task3
    Task "Review and update personal investment plan" as task4
}

rectangle Classification {
    rectangle "Classification: Urgency" {
        Category "Immediate Action" as cat1 #coral
        Category "This Week" as cat2 #powderblue
        Category "Long Term" as cat3 #beige
    }

    rectangle "Classification: Emotional Impact" {
        Category "High Satisfaction" as cat4  #lightgreen
        Category "Stressful" as cat5 #lightpink
    }
}

' to Urgency
task1 ----> cat1
task2 ----> cat2
task3 ----> cat2
task4 ----> cat3

' to Emotional Impact
task1 -[#green]---> cat5
task2 -[#green]---> cat4
task3 -[#green]---> cat4
task4 -[#green]---> cat4

@enduml


{% endplantuml %}