# backgrounds

To add your own background you have to create an entry in *BackgroundsList.js*, with the parameters:
  - **name**: the name you have given your background. It needs to be unique
  - **func**: the function that renders the background. Note that it needs to be inserted in the div with id `backgroundContainer`. See *SimpleText.js* as an example
  - **image**: the image you want to be rendered on the card for your background
  - **parameters**: the parameters that the function expects to recieve, with the default values
