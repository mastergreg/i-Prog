<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="java.sql.*"%>

<%
	Connection con = null;

	try
	{
		con = DriverManager.getConnection( "jdbc:mysql://localhost:3306/productsdb", "root", "1qaz2wsx" );
	
	
		String name = request.getParameter("name");
		String price = request.getParameter("price");
	
		String qry = "SELECT * FROM products";
		
		if( name.length() != 0 ) // it cannot be null, since it's a form parameter.
		{
			qry += " WHERE name='"+name+"'"; // note the heading space character!
		}
		if( price.length() != 0 ) // it cannot be null, since it's a form parameter.
		{
			String prefix = name.length() != 0 ? " AND " : " WHERE ";
			
			qry += prefix + " price <= " + price;
		}
		
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery( qry );
%>
<div class=innerBox>

	<table>
		<tr>
			<td>Name</td>
			<td>Description</td>
			<td>Price</td>
		</tr>
<%
		while( rs.next() )
		{
			%><tr><td><%= rs.getString( "name" ) %></td><%
			%><td><%= rs.getString( "descr" ) %></td><%
			%><td><%= rs.getInt( "price" ) %></td></tr><%
		}
%>
	</table>

</div>

<%
	}
	finally
	{
		if( con != null ) con.close();
	}
%>
