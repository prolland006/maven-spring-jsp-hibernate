<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<t:base>
    <jsp:attribute name="myscript">

    </jsp:attribute>
    <jsp:body>
        <div class="container">
            <form:form class="form-horizontal" method="post" action="/demo/update/${id}">
                <c:if test="${not empty msg}">
		    		<div>
						<strong>${msg}</strong>
		    		</div>
				</c:if>
                <spring:bind path="firstname">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">firstname</label>
                        <div class="col-sm-10">
                            <form:input path="firstname" type="text" class="form-control" id="firstname" placeholder="${firstname}" value="${firstname}" />
                            <form:errors path="firstname" class="control-label" />
                        </div>
                    </div>
                </spring:bind>
                <spring:bind path="lastname">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">lastname</label>
                        <div class="col-sm-10">
                            <form:input path="lastname" type="text" class="form-control" id="lastname" placeholder="${lastname}" value="${lastname}" />
                            <form:errors path="lastname" class="control-label" />
                        </div>
                    </div>
                </spring:bind>
                <spring:bind path="address">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">address</label>
                        <div class="col-sm-10">
                            <form:input path="address" type="text" class="form-control" id="address" placeholder="${address}" value="${address}" />
                            <form:errors path="address" class="control-label" />
                        </div>
                    </div>
                </spring:bind>
                <spring:bind path="pays">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">pays</label>
                        <div class="col-sm-10">
                            <form:input path="pays" type="text" class="form-control" id="pays" placeholder="${pays}" value="${pays}" />
                            <form:errors path="pays" class="control-label" />
                        </div>
                    </div>
                </spring:bind>
                <spring:bind path="company">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">company</label>
                        <div class="col-sm-10">
                            <form:input path="company" type="text" class="form-control" id="company" placeholder="${company}" value="${company}" />
                            <form:errors path="company" class="control-label" />
                        </div>
                    </div>
                </spring:bind>
                <spring:bind path="age">
                    <div class="form-group ${status.error ? 'has-error' : ''}">
                        <label class="col-sm-2 control-label">age</label>
                        <div class="col-sm-10">
                            <form:input path="age" type="text" class="form-control" id="age" placeholder="${age}" value="${age}" />
                            <form:errors path="age" class="control-label" />
                        </div>
                    </div>
                </spring:bind>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" name="action"class="btn-lg btn-primary pull-right">Update User</button>
                    </div>
                </div>
            </form:form>

        </div>
    </jsp:body>

</t:base>
 