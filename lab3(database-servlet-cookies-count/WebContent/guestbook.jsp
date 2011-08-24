<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Guest Book</title>
</head>
<body>
<%@page import ="java.io.*;" %>

<!-- get "user" attribute from session variable - this is the name of the person submitting the comments -->  
Hello <%=session.getAttribute("user") %><br>
Please sign our guest book! <br><br>

<form method=post action=guestbook.jsp>
<table>
	<tr>
		<td>Email:</td>
		<td><input type=text name=email size=12 /></td>
	</tr>
	<tr>
		<td>Comment:</td>
		<td><textarea name="entry" rows="3" cols="60"></textarea></td>
	</tr>
	<tr>
		<td colspan=2><input type=submit /></td>
	</tr>
</table>
</form>
<br>
See what the others have written:<br>
<%
	
	String email = request.getParameter("email");
	String entry = request.getParameter("entry");
	String file = getServletContext().getRealPath("/guestbook.txt");
	try{
		if ((email!=null)&&(entry!= null)) {
    		FileWriter outFile = new FileWriter(file, true);
    		PrintWriter pw = new PrintWriter(outFile);
    		pw.println("Name : " +session.getAttribute("user"));
    		pw.println("Email : " +email);
    		pw.println("Wrote:");
    		pw.println(entry);
    		pw.println("");
    		pw.close();
    		outFile.close();
    	}
		
    	FileReader inFile = new FileReader(file);
    	BufferedReader br = new BufferedReader(inFile);
    	String line=null;
    	
    	//read input file line by line
    	while (( line = br.readLine()) != null)
    	    out.println(line+"<br>");
    	br.close(); 
	} catch(IOException ex){}
    	
    
%>
</body>
</html>