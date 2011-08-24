package iprog.lab2;

/**
 * the circle reset timer.
 */
public class CircleReset extends Thread
{
	/** default timeout to use. */
	private static final long	DefaultTimeout	= 4000;
	/** the circle app that contains the canvas & timeout text-field. */
	private final CircleApp		app;


	/**
	 * constructor.
	 * 
	 * @param app
	 *            the circle app that contains the canvas & timeout text-field.
	 */
	public CircleReset(CircleApp app)
	{
		this.app = app;
		// make sure that if this is the only thread remaining in the Java Virtual Machine, the application will automatically
		// shutdown.
		setDaemon( true );
	}


	@Override
	public void run()
	{
		while( true )
		{
			// read the timeout:
			long delay = 0;
			try
			{
				delay = Long.parseLong( app.getTimeout().getText() );
			}
			catch( NumberFormatException x )
			{
				delay = DefaultTimeout;
				app.getTimeout().setText( "" + delay );
			}

			// delay that many milliseconds:
			try
			{
				sleep( delay );
			}
			catch( InterruptedException e )
			{
				// somebody is trying to stop the thread!
				System.out.println( "Reset thread stops!" );
				return;
			}

			// do the trick:
			app.getCanvas().reset();
			app.getCanvas().repaint();
		}
	}
}
