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