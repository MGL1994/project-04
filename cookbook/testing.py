import requests

r = requests.post('https://api.edamam.com/api/nutrition-details?app_id=75f7f50f&app_key=a4689eb2027aa0dcae1b9fd4a0d07a95', json={
  "title": "Omlette",
  "prep": "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
  "yield": "About 15 servings",
  "ingr": [
    "3 eggs",
    "7 slices of bread"
  ]
})

def test():
    json_object = r.json()
    test_data = json_object['totalNutrients']
    print(test_data)

test()

# {
# "title":"test",
# "image":"test.jpg",
# "ingredients":["eggs"],
# "equipment":[1],
# "prep_time":"00:05:00",
# "cook_time":"00:05:00",
# "portions":1,
# "method":["whisk"],
# "meal":1,
# "tags":[1],
# "comments":[],
# "created":"2019-09-05T10:19:25Z"
# }
