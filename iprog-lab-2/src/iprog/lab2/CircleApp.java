package iprog.lab2;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;


/**
 * The application class.
 */
public class CircleApp extends JFrame
{
	/** the canvas widget. */
	private final Canvas		canvas	= new Canvas();
	/** the timeout edit widget. */
	private final JTextField	timeout	= new JTextField( 5/*= number of columns.*/);


	/**
	 * constructor.
	 */
	public CircleApp()
	{
		super( "Circle application" );
		setLayout( new BorderLayout() );
		// make sure the application will shutdown when the user hits the 'close' button (X button at top-right)
		setDefaultCloseOperation( EXIT_ON_CLOSE );

		add( canvas, BorderLayout.CENTER );

		JPanel pnl = new JPanel(); // to put the label & the text-field in.
		FlowLayout fl = new FlowLayout( FlowLayout.RIGHT );
		pnl.setLayout( fl );

		pnl.add( new JLabel( "Timeout: " ) );
		pnl.add( timeout );

		add( pnl, BorderLayout.SOUTH );

		setPreferredSize( new Dimension( 640, 480 ) );
		pack();

		new CircleReset( this ).start();
	}


	/**
	 * @return the canvas
	 */
	public Canvas getCanvas()
	{
		return canvas;
	}


	/**
	 * @return the timeout
	 */
	public JTextField getTimeout()
	{
		return timeout;
	}


	/**
	 * application entry point.
	 * 
	 * @param args
	 *            the command line arguments (ignored).
	 */
	public static void main(String[] args)
	{
		new CircleApp().setVisible( true );
	}
}
