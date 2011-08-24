package iprog;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.mysql.jdbc.Driver;

/**
 * Servlet implementation class LoginServlet
 */
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
	
		String name =request.getParameter("name");
		String pwd =request.getParameter("pwd");
		PrintWriter out = response.getWriter();
		
		if (!name.equals(null)&&!pwd.equals(null)){
			Connection con = null;
			Statement stmt = null;
		
			try {
				Class.forName ("com.mysql.jdbc.Driver");
				con = DriverManager.getConnection( "jdbc:mysql://localhost/iprogusers?user=root&password=");
			
				String qry = "SELECT * FROM users WHERE username='"+name+"' AND userpass='"+pwd+"';";
				
				stmt = con.createStatement();
				ResultSet rs = stmt.executeQuery( qry );
				
				if (rs.first())
					out.println("This is "+name);
				else out.println("This is not a valid user'");
				
				stmt.close();
		
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			finally{
				try {
					stmt.close();
				} catch (SQLException e) {
					// do nothing
				}
				try {
					con.close();
				} catch (SQLException e) {
					// do nothing
				}
				
			}

		}

	}
}
