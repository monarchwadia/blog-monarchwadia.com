---

title:  Optimizing GPT-4 API Calls for Cost and Scalability Through Function Calling.
layout: post
date:   2023-09-24 19:43:42 2023 -0400
tags: openai gpt genai
excerpt: In this article, we will explore a key feature of OpenAI's GPT-4 called function calling. We'll examine how this feature enables us to optimize API calls for cost-efficiency and scalability, and provide a step-by-step example to illustrate the concept.
---

## Introduction

In this article, we will explore a key feature of OpenAI's GPT-4 called function calling. We'll examine how this feature enables us to optimize API calls for cost-efficiency and scalability, and provide a step-by-step example to illustrate the concept.

## The Challenge: Cost and Scalability

GPT-4, being a state-of-the-art language model, comes with a cost—both financial and computational. Each token processed by the API contributes to the bill, and API latency can increase as you scale up your usage. For instance, let's assume you're charged $0.03 per 1000 tokens; processing a 5000-token text four times would cost you $0.60.

GPT-4 queries can get quite expensive. Running several of them in parallel can also pose performance challenges when trying to scale up a system.

## How function calling helps

[Function calling](https://platform.openai.com/docs/guides/gpt/function-calling) calling allows you to batch multiple prompts into a single API call, effectively reducing the overhead. However, it's essential to note that function calling is most effective for tasks on the same source text and may not suit all use cases.

**Benefits:**
* Greatly Reduce your OpenAI API costs.
* Reduce the need to hold parallelized API calls open.

**Limitations:**

* Not ideal for unrelated tasks
* May introduce delay as the text generates in serial.

## Example

Let's dive into a practical example to understand this feature better.

Let's say you have 4 different prompts:

1. "Summarize the following text."
2. "Provide hashtags for the following text."
3. "Analyze the following text."
4. "Translate the following text into French."

And let's say you had the following text:

```python
text_to_analyze = """
  Mary had a little lamb,
    Its fleece was white as snow.
  And everywhere that Mary went,
    The lamb was sure to go.
  He followed her to school one day,
    That was against the rule.
  It made the children laugh and play
    To see a lamb at school.

  And so the teacher turned him out,
    But still he lingered near,
  And waited patiently about
    Till Mary did appear.
  And then he ran to her, and laid
    His head upon her arm,
  As if he said ‘I’m not afraid,
    You’ll keep me from all harm.’

  ‘What makes the lamb love Mary so?’
    The eager children cry.
  ‘Oh, Mary loves the lamb, you know,’
    The teacher did reply.
  ‘And you each gentle animal
    In confidence may bind,
  And make them follow at your call,
    If you are always kind.’ 
"""
```

## BEFORE: Without function calling

Without function calling, you will have 4 different prompts, one for each prompt. Each prompt will repeat the entire text.

Here is what it might look like (parallelization is also possible, although not shown here):

```python
import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

text_to_analyze = "Mary had a little lamb, Its fleece was white as snow..."

# Provide summary
# Output: The text talks about Mary who owned a small lamb with a fleece as white as...
summary_response = openai.ChatCompletion.create(
    model="gpt-4",
    messages = [
        {"role": "system", "content": "You will provide a summary of the text that the user provides."},
        {"role": "user", "content": text_to_analyze},
    ]
)
print(summary_response)


# Provide hashtags
# Output: #NurseryRhymes #MaryHadALittleLamb #ChildhoodMemories #SongLyrics
hashtag_response = openai.ChatCompletion.create(
    model="gpt-4",
    messages = [
        {"role": "system", "content": "You will provide a hashtags for the text that the user provides."},
        {"role": "user", "content": text_to_analyze},
    ]
)
print(hashtag_response)

# Provide analysis
# Output: The provided text is a famous English nursery rhyme called 'Mary Had a...
analysis_response = openai.ChatCompletion.create(
    model="gpt-4",
    messages = [
        {"role": "system", "content": "You will analyze the text that the user provides."},
        {"role": "user", "content": text_to_analyze},
    ]
)
print(analysis_response)

# Translate to French
# Output: Marie avait un petit agneau, Sa toison était blanche comme la neige...
translation_response = openai.ChatCompletion.create(
    model="gpt-4",
    messages = [
        {"role": "system", "content": "You will translate the text that the user provides into French."},
        {"role": "user", "content": text_to_analyze},
    ]
)
print(translation_response)
```

## AFTER: With function calling

With function calling, you will have a single prompt which provides the results of the output.

```python
import openai
import json
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

messages = [
    {"role": "system", "content": "You will provide an analysis of the text that the user provides."},
    {"role": "user", "content": text_to_analyze},
]

functions = [
    {
        "name": "save_analysis",
        "description": "Save analysis data",
        "parameters": {
            "type": "object",
            "properties": {
                "analysis": {
                    "type": "string",
                    "description": "The in-depth analysis of the text that the user provided, covering nuances and hidden meanings."
                },
                "summary": {
                    "type": "string",
                    "description": "A succinct summary of the text that encapsulates its primary themes."
                },
                "hashtags": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "A list of social media hashtags that encapsulate the core ideas of the text."
                },
                "translation": {
                    "type": "string",
                    "description": "The French translation of the text, preserving its original nuance and meaning."
                }
            },
            "required": ["analysis", "summary", "hashtags", "translation"]
        }
    }
]

response = openai.ChatCompletion.create(
    model="gpt-4", # Also works with gpt-3.5-turbo for even more cost savings
    messages=messages,
    functions=functions,
    function_call={"name": "save_analysis"}
)

result = json.loads(
    response["choices"][0]["message"]["function_call"]["arguments"])

print(result)
# Output: {
#   'analysis': "This text is a famous nursery rhyme called 'Mary Had a Little Lamb'..."
#   'summary': 'This nursery rhyme tells the story of Mary and her little lamb....',
#   'hashtags': ['MaryHadALittleLamb', 'nurseryrhyme', 'kindness'],
#   'translation': "Marie avait un petit agneau, dont la laine était blanche comme..."
# }
```

## Analysis of Before and After

To better appreciate the benefits of using function calling, let's do a side-by-side analysis of the code blocks for "Without Function Calling" and "With Function Calling."

### API Calls

- **Without Function Calling**: Four separate API calls are made, each for summarizing, hashtagging, analyzing, and translating the text.
- **With Function Calling**: A single API call batches all these tasks together, reducing API overhead.

### Cost Efficiency

- **Without Function Calling**: You're charged for each of the four API calls separately, adding up the token count for each. The bulk of the token count comes from the source poem.
- **With Function Calling**: The token count is condensed into a single API call, which can lead to cost savings. In this case, the poem is only included once instead of 4 times, greatly reducing the token count.

### Code Complexity

- **Without Function Calling**: Code structure is straightforward but repetitive, requiring a new API request for each task.
- **With Function Calling**: A more complex code structure involving JSON schemas and function signatures, but it's more modular and easier to extend.

### Scalability

- **Without Function Calling**: Less scalable, as you'll hit the API rate limit faster with increasing tasks.
- **With Function Calling**: More scalable, as fewer API calls are made, thereby reducing the likelihood of hitting rate limits.

### Latency

- **Without Function Calling**: Lower latency for individual tasks, but cumulative latency can add up.
- **With Function Calling**: Slightly higher latency for the single API call, but it's generally faster for batch processing multiple tasks.

## Conclusion

Leveraging GPT-4's function calling feature can be a game-changer for optimizing cost and scalability in NLP applications. As we've dissected in the preceding sections, this approach not only condenses multiple tasks into a single API call but also offers a modular and scalable code architecture. While it may introduce a slight latency for batch processing, the overall gains in cost-efficiency and computational resource management make it a highly advantageous strategy. As we continue to push the boundaries of what's possible with language models, function calling stands as an indispensable tool for smart, efficient, and effective API utilization.