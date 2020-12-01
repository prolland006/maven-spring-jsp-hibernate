Created using Spring Initializr and eclipse for Spring Boot web and Maven (Hibernate, mySql & JPA). 

Create 2 REST services: one that allows to register a user and the other one that displays the details of an registered user. You don�t need to spend too much time on this exercise � few hours, the goal is to be able to quickly check your code !

There are three frontend connected to spring server : one in Jsp, one in react.js and one in react.js with typescript and material UI

![react redux typescript](https://github.com/prolland006/maven-spring-jsp-hibernate/tree/master/pic/screen.jpg)

## User documentation
- define a user (what are the fields needed). We should have mandatory and optional fields!
- validate the input and return proper error messages/http status
- log the input and output of each call and the processing time.
- have a request parameter which is not mandatory and which provides a default value in case is not set
- have a path variable
- clear code and javadoc
- unit tests
- only adults ( age > 18 years)� and that live in France can create an account!
- you can type the data (firstname+lastname++ to find a user)

## start spring web server
mvn spring-boot:run

## Jsp frontend
http://localhost:8080/demo/user

## react.js frontend
yarn start 
http://localhost:3000

## documentation reference
http://www.lsis.org/elmouelhia/courses/java/spring/coursSpringBootFondamentaux.pdf

https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04-fr

https://www.javaguides.net/2020/07/react-js-spring-boot-rest-api-example-tutorial.html

http://pigne.org/teaching/webdev1/lecture/ReduxIntroduction

https://www.freecodecamp.org/news/how-to-use-redux-in-your-react-typescript-app/

https://medium.com/@peatiscoding/typescripts-with-redux-redux-thunk-recipe-fcce4ffca405

https://openclassrooms.com/fr/courses/5511091-organisez-votre-application-avec-la-logique-redux