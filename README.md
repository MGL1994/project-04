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

Worked the data requested from the server into a user friendly display

```javascript
<div className="tags has-addons">
  <span className="tag is-dark">Salt</span>
  <span className={'tag ' + ((this.state.recipe.salt / 1000) < 0.3 ? 'has-background-success' : (this.state.recipe.salt / 1000) < 1.5 ? 'has-background-warning' : 'has-background-danger has-text-white')}>{(this.state.recipe.salt / 1000).toFixed(2)}g | {Math.round(((this.state.recipe.salt / 1000) / 6) * 100)}%</span>
</div>
```

Reformatted the form data to be accepted by the API.

```javascript
handleSubmit(e) {
  e.preventDefault()

  const cleanedData = {
    ...this.state.formData,
    ingredients: this.state.formData.ingredients,
    equipment: [parseInt(this.state.formData.equipment)],
    portions: parseInt(this.state.formData.portions),
    method: this.state.formData.method,
    meal: parseInt(this.state.formData.meal),
    tags: [parseInt(this.state.formData.tags)],
    user: parseInt(Auth.currentUser()),
    created: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
  }

  axios.post('/api/recipes/', cleanedData, {
    headers: { Authorization: `Bearer ${Auth.getToken()}`}
  })
```

Use of external API to get nutritional information

```python
def post(self, request):
      data = request.data

      app_id = os.getenv("APPID")
      app_key = os.getenv("APPKEY")

      r = requests.post('https://api.edamam.com/api/nutrition-details',
          params={'app_id':app_id, 'app_key':app_key},
          json={'title': data['title'], 'ingr': data['ingredients']}
      )

      stats = r.json()['totalNutrients']
      nutrition = {
          'calories': round(stats['ENERC_KCAL']['quantity']),
          'fat': round(stats['FAT']['quantity']),
          'saturates': round(stats['FASAT']['quantity']),
          'carbs': round(stats['CHOCDF']['quantity']),
          'sugars': round(stats['SUGAR']['quantity']),
          'fibre': round(stats[('FIBTG')]['quantity']) if 'FITBG' in stats else 0,
          'protein': round(stats['PROCNT']['quantity']),
          'salt': round(stats['NA']['quantity'])
      }
      data = {**data, **nutrition}

      serializer = RecipeSerializer(data=data)
      if serializer.is_valid():
          serializer.save()
          recipe = serializer.instance
          serializer = PopulatedRecipeSerializer(recipe)
          return Response(serializer.data, status=201)

      return Response(serializer.errors, status=422)
```
