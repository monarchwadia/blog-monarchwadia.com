# Starting

```bash
# first install ruby
apt install 

bundle install

# install plantuml
apt install plantuml

# Local dev mode with drafts and livereload
bundle exec jekyll serve --livereload --drafts
```

# Deployment

Currently on Vercel, with autodeploy set up from Github. 

# Vercel deploy notes

i added `yum install -y xz` to the build command override. I also added `BUNDLE_FORCE_RUBY_PLATFORM: "true"` to the `.bundle/config` file to ensure the correct Ruby platform is used during the build process.

# Content Categories

## Futurism Posts

To create a futurism post with the crystal ball (🔮) emoji and special styling:

1. Create a new post in the `_posts` directory
2. Use the following front matter template:

```yaml
---
layout: futurism
title: "Your Futurism Post Title"
date: YYYY-MM-DD
categories: futurism
author: "Your Name"
excerpt: "A brief description of your futurism post."
---
```

The futurism posts:
- Will automatically display with the 🔮 emoji in the title
- Have a special styling with a purple gradient
- Are filterable on the homepage using the category buttons
- Have a dedicated page at `/futurism/`