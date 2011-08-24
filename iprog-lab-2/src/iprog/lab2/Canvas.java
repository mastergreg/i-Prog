package iprog.lab2;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JLabel;

/**
 * The drawing canvas. It is a mouse listener on itself. On each click event, it re-draws the circle which appears on it.
 */
public class Canvas extends JLabel implements MouseListener
{
	/** x position of the center of the circle. */
	private int	x	= -1;
	/** y position of the center of the circle. */
	private int	y	= -1;
	/** circle's radius */
	private int	r	= 50;


	/**
	 * constructor.
	 */
	public Canvas()
	{
		addMouseListener( this );
	}


	/**
	 * reset the center of the circle to the center of the widget.
	 */
	public void reset()
	{
		x = getWidth() / 2;
		y = getHeight() / 2;
	}


	@Override
	public void paint(Graphics g)
	{
		if( x < 0 ) // first time initialization of the (x,y)
			reset();

		g.setColor( Color.blue );
		g.drawOval( x - r, y - r, 2 * r, 2 * r );
	}


	@Override
	public void mouseClicked(MouseEvent e)
	{
		x = e.getX();
		y = e.getY();
		repaint();
	}


	@Override
	public void mouseEntered(MouseEvent e)
	{
		// no operation.
	}


	@Override
	public void mouseExited(MouseEvent e)
	{
		// no operation.
	}


	@Override
	public void mousePressed(MouseEvent e)
	{
		// no operation.
	}


	@Override
	public void mouseReleased(MouseEvent e)
	{
		// no operation.
	}
}