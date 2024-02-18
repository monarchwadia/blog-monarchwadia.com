---

title:  Generative AI function calling opens the door to true interoperability with traditional software
layout: post
date:   2023-09-24 19:43:42 2023 -0400
tags: openai gpt genai
excerpt: GenAI often requires interoperability with traditional software. In this article, we will explore how function calling enables GenAI to interoperate with traditional software, and provide a step-by-step example to illustrate the concept.
---

# Introduction

Previously, I wrote an article on how AI can reduce the cost of data entry through content classification. One of the key challenges in that article was the need for interoperability between AI and traditional software. 

Let's say we wanted to classify newspaper articles into categories such as sports, politics, and entertainment. We could use a traditional software system to collect and store the articles, and then use GenAI to classify them.

# Using simple prompts to classify articles

Using API calls to OpenAI, we could classify the articles using simple prompts such as "classify this article as sports" or "classify this article as politics".

For example, we could use the following Python code to classify an article as sports:

```python
from openai import OpenAI

# Enter your own API key here.
OPENAI_API_KEY='sk-_______________________';
client = OpenAI(api_key=OPENAI_API_KEY)

# This is the system prompt. This instructs the model what to do.
system_prompt = """
Classify the following article into one of the following categories.

* sports
* politics
* entertainment

An article can have multiple classifications. However, classifications cannot repeat. If the article has no classifications, then this array should be empty.

output in JSON format of strings[]
"""

# This article could be retrieved from a database
article = """
# New government initiative by government is promising for economic growth and innovation.

The government announced a new tech initiative today aiming to boost the national economy and foster innovation. The initiative, called "Tech for All," will provide funding and resources to tech startups and entrepreneurs across the country. The government hopes that this initiative will help create new jobs and stimulate economic growth in the tech sector.

etc...
"""

response = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": article},
  ]
)

# The response will be in JSON format, but embedded inside a markdown fence block.
# It is VERY DIFFICULT to coax the OpenAI API to return the response in a different format.
# Here's what the typical response looks like:
#
# ```json
# ["politics"]
# ```
print(response.choices[0].message.content)
```

With this code, the response would be something like the following.

```markdown
This article is classified as politics.
```

Unfortunately, this is not a useful response, as the output is in plain text. Plain text is not a format that is easily interoperable with traditional software systems. It needs flaky parsing and is not easily machine-readable.

# The solution: function calling

Function calling gives us two advantages:

1. It allows us to collect the output in JSON, which is a machine-readable format. In essence, it lets us create an interface, and tries to make the AI system work like a traditional software system.
2. It allows us to provide additional information about the article, such as the title, author, and publication date. This information could include data types such as `string`, `integer`, `float`, `date`, etc. This informs the AI system about the data types it should expect and how to handle them.

# Example in Code

Here is an example of how we could use function calling to classify an article as sports:

```python
from openai import OpenAI
import json

# Enter your own API key here.
OPENAI_API_KEY='sk-_______________________';
client = OpenAI(api_key=OPENAI_API_KEY)

# This is the system prompt. This instructs the model what to do.
system_prompt = """
Classify the following article into one of the following categories.

* sports
* politics
* entertainment

An article can have multiple classifications. However, classifications cannot repeat. If the article has no classifications, then this array should be empty.

output in JSON format of strings[]
"""

# This article could be retrieved from a database
article = """
# New government initiative by government is promising for economic growth and innovation.

The government announced a new tech initiative today aiming to boost the national economy and foster innovation. The initiative, called "Tech for All," will provide funding and resources to tech startups and entrepreneurs across the country. The government hopes that this initiative will help create new jobs and stimulate economic growth in the tech sector.

etc...
"""

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": article},
    ],

    # This is the function call. It tells the model to call the function `setClassification`. It's not really very complicated, although it might look like that at first. It's just a JSON object that describes the interface of the function.
    tools=[
        {
            "type": "function",
            "function": {
                "name": "setClassification",
                "description": "This function takes an array of strings. It sets the classification of the article. An article can have multiple classifications.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "classifications": {
                            "type": "array",
                            "description": "The classifications of the article. An article can have multiple classifications. However, classifications cannot repeat. If the article has no classifications, then this array should be empty.",
                            "items": {
                                "type": "string",
                                "enum": [
                                    "sports",
                                    "politics",
                                    "entertainment"
                                ]
                            }
                        }
                    },
                    "required": [
                        "classifications"
                    ]
                }
            }
        }
    ]
)

# The response will be in JSON format.
# Here's what the typical response looks like:
# ['politics']
response_string = response.choices[0].message.tool_calls[0].function.arguments
response_json = json.loads(response_string)
print(response_json['classifications'])
```


