![Project Logo](https://i.imgur.com/iTvqiHV.png)
<hr />

## General Assembly: Project 4

### Overview

CookBook is a full-stack app built using Django and React.

Take a closer look [here](https://cookbook-2019.herokuapp.com/#/).

![App Homepage](https://i.imgur.com/HGm4cbG.png)

### Brief

* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** meaning multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes**
* **Have a visually impressive design**
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end.

### Goal

As my this was my last project at General Assembly, I was determined to create something that encompassed my learning to this point.

With that in mind, my goal was to focus on building a quality app by:

* Using **best practices**.
* Focussing on writing **stable code** and refactoring, before adding more functionality.
* Styling as I went along, using a **simple but effective design**.

### Technologies Used

* HTML5
* CSS3 & SASS4
* JavaScript (ES6)
* Git
* GitHub
* Python
* Django
* React

### Process

### Code Snippets

```javascript
<div className="tags has-addons">
  <span className="tag is-dark">Salt</span>
  <span className={'tag ' + ((this.state.recipe.salt / 1000) < 0.3 ? 'has-background-success' : (this.state.recipe.salt / 1000) < 1.5 ? 'has-background-warning' : 'has-background-danger has-text-white')}>{(this.state.recipe.salt / 1000).toFixed(2)}g | {Math.round(((this.state.recipe.salt / 1000) / 6) * 100)}%</span>
</div>
```
