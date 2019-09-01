<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:base>
    <jsp:attribute name="myscript">
        <script type="text/javascript">
            $(function() {
                $('.ajax-button').click(function() {
                    $.ajax({
                        url: 'ajaxquery',
                        data: ({name : 'sam'}),
                        success: function(data) {console.log(data);
                            $('#response').html(data);
                        }
                    });
                });
            });


            var myApp = angular.module('myApp',[]);

            myApp.controller("exemple1Ctrl", function($scope){
                $scope.age = 0;
                $scope.majeurOrMineurText = function(){console.log('toto');
                    return ($scope.age >= 18) ? "majeur" : "mineur";
                };
            });
        </script>
    </jsp:attribute>
    <jsp:body>
        <div>
            <p  style="text-align: center; margin: 40px 0;">
                <a class="ajax-button makble_button_large_green">Send Ajax request</a></p>
        </div>
        <div id="textbox-style">
            <div id="response" style="text-align:center">
            </div>
        </div>
        <h1>Angular.js example</h1>
        <div ng-app="myApp">
            <div ng-controller="exemple1Ctrl">
                <input ng-model="age"/>
                <span>Vous êtes <b ng-bind="majeurOrMineurText()"></b></span>
            </div>
        </div>
    </jsp:body>

</t:base>
