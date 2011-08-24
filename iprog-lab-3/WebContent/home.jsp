<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<div class=innerBox>
	Site's Home-page.<br/><br/>

	<% if( session.getAttribute("username") == null || "".equals(session.getAttribute("username")) ) { %>	
		<a href="index.jsp?login=1">Login</a>
	<% } else { %>
		Welcome <b><i><%= session.getAttribute("username") %></i></b><br/>
		<a href="logout.jsp">Logout</a>
	<% } %>
</div>

</body>
</html>
