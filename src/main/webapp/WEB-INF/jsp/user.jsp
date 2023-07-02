<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<t:base>
    <jsp:attribute name="myscript">

    </jsp:attribute>
    <jsp:body>
        <div class="container">
            <form:form class="form-horizontal" method="post" action="/demo/postuser">
            	
    	        <c:if test="${not empty msg}">
		    		<div>
						<strong>${msg}</strong>
		    		</div>
				</c:if>
                <c:if test="${user.id > 0}">
                    <spring:bind path="id">
                        <div class="form-group ${status.error ? 'has-error' : ''}">
                            <label class="col-sm-2 control-label">id</label>
                            <div class="col-sm-10">
                                <form:input path="id" type="text" class="form-control" readonly="true" id="id" placeholder="id" />
                                <form:errors path="id" class="control-label" />
                            </div>
                        </div>
                    </spring:bind>
                </c:if>
                <spring:bind path="firstname">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">firstname</label>
                        <div class="col-sm-10">
                            <form:input path="firstname" type="text" class="form-control" id="firstname" placeholder="firstname" />
                            <form:errors path="firstname" class="control-label" />
                        </div>
                    </div>
                </spring:bind>

                <spring:bind path="lastname">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">lastname</label>
                        <div class="col-sm-10">
                            <form:input path="lastname" type="text" class="form-control" id="lastname" placeholder="lastname" />
                            <form:errors path="lastname" class="control-label" />
                        </div>
                    </div>
                </spring:bind>

                <spring:bind path="address">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">address</label>
                        <div class="col-sm-10">
                            <form:input path="address" type="text" class="form-control" id="address" placeholder="address" />
                            <form:errors path="address" class="control-label" />
                        </div>
                    </div>
                </spring:bind>

                <spring:bind path="pays">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">pays</label>
                        <div class="col-sm-10">
                            <form:input path="pays" type="text" class="form-control" id="pays" placeholder="pays" />
                            <form:errors path="pays" class="control-label" />
                        </div>
                    </div>
                </spring:bind>

                <spring:bind path="company">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">company</label>
                        <div class="col-sm-10">
                            <form:input path="company" type="text" class="form-control" id="company" placeholder="company" />
                            <form:errors path="company" class="control-label" />
                        </div>
                    </div>
                </spring:bind>

                <spring:bind path="age">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">age</label>
                        <div class="col-sm-10">
                            <form:input path="age" type="text" class="form-control" id="age" placeholder="age" />
                            <form:errors path="age" class="control-label" />
                        </div>
                    </div>
                </spring:bind>
                
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" name="action" value="create" class="btn-lg btn-primary pull-right">Create user</button>
                    </div>
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" name="action" value="display" class="btn-lg btn-primary pull-right">Display user</button>
                    </div>
                    <c:if test="${user.id > 0}">
                        <div>
                            <button type="submit" name="action" value="update" class="btn-lg btn-primary pull-right">Update user</button>
                        </div>
                    </c:if>
                </div>
            </form:form>
            

        </div>
        
    </jsp:body>

</t:base>
 