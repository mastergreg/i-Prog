<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="javax.servlet.http.*"%>
<%
	if (session.getAttribute("username") == null) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) //
			for (int i = 0; i < cookies.length; ++i)
				if (cookies[i].getName().equals("user")) {
					session.setAttribute("username", cookies[i]
							.getValue());
					break;
				}
	}
%>
<html>
<head>
<title>my.com :: welcome</title>
<link rel=StyleSheet href="site.css" type="text/css" />
<script src="code.js" type="text/javascript"></script>
</head>
<body>

<div id=header class=box>my.com hi-tech solutions</div>

<div id=menu class=box>
<ul>
	<li onclick="asyncLoadContent('home.jsp')">Home</li>
	<li onclick="asyncLoadContent('products.html')">Products</li>
	<li onclick="asyncLoadContent('contact.html')">Contact</li>
	<li onclick=asyncLoadContent('about.html');
>About</li>
</ul>
</div>

<div id=content class=box>
<%
	if( request.getParameter("search") != null ) {
		%><jsp:include page="search.jsp"></jsp:include><%
	} else if ("1".equals(request.getParameter("login"))) {
%>
<form method=get action=LoginService>
<table>
	<tr>
		<td>Name:</td>
		<td><input type=text name=name size=12 /></td>
	</tr>
	<tr>
		<td colspan=2><input type=submit /></td>
	</tr>
</table>
</form>
<%
	} else {
%> Use the menu :) <%
	}
%>
</div>

</body>
</html>
