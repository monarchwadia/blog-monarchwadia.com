---
layout: page
title: "Boring Generative AI"
---

> A Generative AI cookbook that's boring, reliable, and immediately useful. 

Generative AI is most strongly associated with exciting innovations like natural-language chatbots, image generation, and speech recognition. These are very exciting innovations and, in time, will grow into very cool software. No doubt.

But most software developers haven't yet clued in on the most **immediately useful** capabilities that Generative AI has to offer. These capabilities tend to be **boring**, **incremental** and **reliable**. They plug into existing full-stack architectures in a modular and reusable way.

This series of articles intends to shine light on these boring, practical use cases of Generative AI and, in so doing, help introduce developers to the **industrial strength magic** that GenAI already offers.

# Articles

This is a list of articles I've written and planned on this topic.

<ul>
{% for post in site.posts %}
   {%if post.tags contains 'boring-ai' %}
   <li>
    <a href="{{post.url | escape}}">{{post.title | escape}}</a>
    </li>
   {% endif %}
{% endfor %}
{% for upcoming in site.data._boring_ai_upcoming_articles %}
<li>
<span class="opacity-4 cursor-not-allowed">
 {{upcoming}}
</span>
</li>
{% endfor %}
</ul>