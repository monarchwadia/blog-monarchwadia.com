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