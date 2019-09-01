<%@tag description="Overall Page template" pageEncoding="UTF-8"%>
<%@attribute name="myscript" fragment="true" %>
<html>
    <head>
        <title>Spring MVC AJAX Example</title>
        <link href="resources/style.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <jsp:doBody/>
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
        <script src="/webjars/angularjs/1.4.9/angular.js"></script>
        <script src="/webjars/angularjs/1.4.9/angular-resource.js"></script>
        <script src="/webjars/angularjs/1.4.9/angular-route.js"></script>
        <jsp:invoke fragment="myscript"/>
    </body>
</html>