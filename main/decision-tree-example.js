var DecisionTree = require('decision-tree'); //importing needed machine learning model. Based on ID3 algorithm
var fs = require('fs'); //importing module to read and write files in node.js
var Q = require('q'); //importing Q module for promises' resolution


/*Data used to train the decision tree*/
var training_data = [
  	{"color":"blue", "shape":"square", "liked":false},
  	{"color":"red", "shape":"square", "liked":false},
  	{"color":"blue", "shape":"circle", "liked":true},
  	{"color":"red", "shape":"circle", "liked":true},
  	{"color":"blue", "shape":"hexagon", "liked":false},
  	{"color":"red", "shape":"hexagon", "liked":false},
  	{"color":"yellow", "shape":"hexagon", "liked":true},
  	{"color":"yellow", "shape":"circle", "liked":true}
  ];

/*Data to be used as test subject*/
  var test_data = [
    	{"color":"blue", "shape":"hexagon", "liked":false},
    	{"color":"red", "shape":"hexagon", "liked":false},
    	{"color":"yellow", "shape":"hexagon", "liked":true},
    	{"color":"yellow", "shape":"circle", "liked":true}
    ];

/*attribute that will be classified*/
var class_name = "liked";

/*attributes that are independent and will be used to predict the classified one*/
var features = ["color", "shape"];

/*constructing a new dt using as parameters training dataset, classified attribute and independent features*/
var dt = new DecisionTree(training_data, class_name, features);

/*object to be classified, has its own features and the liked attribute will be the one predicted*/
var predicted_class = dt.predict({
  	color: "blue",
  	shape: "hexagon"
  });
console.log("Predicted Class: ", predicted_class);

/*Calculating the decision tree's accuracy*/
var accuracy = dt.evaluate(test_data);
console.log("Decision Tree's Accuracy: ", accuracy);

/*exporting the decision tree to a json object*/
var treeModel = dt.toJSON();


/*just saving the new model into a proper file*/
fs.writeFile('../jsonModels/firstExample.json', JSON.stringify( treeModel ),function(err,body){
  if(err){
      console.log("Error: ", err);
  }
  else{
    console.log("Model written !!");
  }
});
