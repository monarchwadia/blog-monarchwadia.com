---
layout: page
title: 🔮 Futurism
permalink: /futurism/
---

<div class="flex flex-col gap-4">
    <p class="text-3">Explore predictions, insights, and analyses of future trends and technologies.</p>
    
    <ul class="flex flex-col gap-4">
        {%- for post in site.posts -%}
        {% if post.categories contains 'futurism' %}
        <li class="flex flex-col gap-1 post-card futurism-item">
            {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
            <div class="flex flex-row space-between">
                <span class="text-3 font-display">{{ post.date | date: date_format }}</span>
            </div>
            <h3 class="header-2 futurism-title">
                <a class="font-bold text-5 text-accent-100" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
            </h3>
            <a href="{{ post.url | relative_url }}">
                <div class="text-3 base-200 py-3 px-3 flex flex-col gap-3 shadow-1" >
                    {{ post.excerpt | markdownify | strip_html  }}
                </div>
                <div class="base-300 p-2 flex justify-end shadow-2" >
                    <div class="text-2 text-accent-200 font-display" >Click to Read</div>
                </div>
            </a>
        </li>
        {% endif %}
        {%- endfor -%}
    </ul>
</div>
