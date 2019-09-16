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

#### Planning

I began planning for this project by setting out my goals in relation to the brief and brainstorming a few concepts, noting the features and basic logic required for each idea. From these initial concepts I chose CookBook as it was the most interesting and fit the project criteria well.

I then set about laying out my plan for the week of the project, using a Trello board and the MoSCoW Method to ensure I could deliver an MVP by the deadline before enhancing the features of the app.

Once I had a plan in place, I drew up some wireframes so that I could keep my vision in mind as a guide during the build and design process.

#### Build

My first task was to build the back end of my app as per the model wireframes I drew up. Getting these right from the start was crucial and would save me valuable time later in the project. I used 1 main and 4 secondary models for this project, all of which were connected to the main through the use of ForeignKey or ManyToManyField relationships.

Perhaps the most challenging aspect of the back end build was the integration of Edamam, a third party nutritional API, which I used to receive ingredients from an user uploaded recipe and auto-populate the nutritional fields in the model with accurate data.

Use of external API to get nutritional information:

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

Once I was satisfied the back end was robust, I began on the front end to deliver the data I had in a user friendly format. My main focus was to create a recipe index, a recipe detail and a recipe upload page. After completing these components I added a further landing page, edit page and integrated a comments component into the recipe detail page.

I especially enjoyed the challenge of reformatting the form data on the upload page to be accepted by my back end. This involved a good deal of console logging, calling upon some JavaScript I learned earlier in the course.

Reformatted the form data to be accepted by the API:

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

#### Design

For the design I researched and took inspiration from a few sources already online, combining different elements I found attractive to create something visually appealing. Using the CSS framework Bulma for the purposes of time efficiency I began moulding the display.

The index page takes inspiration from Instagram, displaying the latest uploaded recipe first, showing a food image only in a square format. The landing page takes inspiration from Huddle, allowing the user to get a preview of what they could do with the app once registered. My favourite part though is the recipe show page, particularly the self colour assigning nutritional tags which complete the clean but vibrant design.

Worked the data requested from the server into a user friendly display

```javascript
<div className="tags has-addons">
  <span className="tag is-dark">Salt</span>
  <span className={'tag ' + ((this.state.recipe.salt / 1000) < 0.3 ? 'has-background-success' : (this.state.recipe.salt / 1000) < 1.5 ? 'has-background-warning' : 'has-background-danger has-text-white')}>{(this.state.recipe.salt / 1000).toFixed(2)}g | {Math.round(((this.state.recipe.salt / 1000) / 6) * 100)}%</span>
</div>
```

#### Result

Overall I am very satisfied with the product I created. Not only do I think it is useful and fun in itself, but it really captures my progression during my time at GA. Importantly the code is robust as I took time to refactor as I went along, and the front end is user friendly whilst also looking great.

### Reflection

#### Wins

* Integrating a third-party API, allowing the recipes to have maximum information with minimal user input.
* Building the back end using Python and Django, a language and framework I had only been introduced to a week prior but meant I was learning as I built.
* Using Bulma to create styling quickly, but shaping it to fit my concept and look unique.

#### Challenges

* Handling comments using Python/Django instead of Node.js/Express as I had previously was a challenge as this was quite a different process.
* Time. I had not worked on a solo project since the first one at GA. Progress was slower than I anticipated at times and reaffirmed my thinking that teamwork is a key aspect of software engineering.

#### Future Features

I would like to build upon the app to take it to the next level by implementing the following:

* A favourite function where users can save their favourite recipes.
* A user profile page where favourited recipes can be viewed.
* A shopping widget, allowing users to generate an online shopping list based on the ingredients in the recipe.
