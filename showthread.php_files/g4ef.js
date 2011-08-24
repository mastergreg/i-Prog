/*======================================================================*\
|| #################################################################### ||
|| # Go4Expert.com                                                    # ||
|| # ---------------------------------------------------------------- # ||
|| # Copyright ©2000–2004 Go4Expert.com. All Rights Reserved.           ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| # http://www.go4expert.com                                         # ||
|| #################################################################### ||
\*======================================================================*/

function addToFavorites()
{
	if (window.external)
	{
		window.external.AddFavorite(location.href,document.title)
	}
	else
	{
		alert("Sorry! Your browser doesn't support this function. Use the mneu option or short cut of your browser. Many browsers have Ctrl + D as the shortcut for favorites");
	}
}

function copyToClipboard(strText)
{
	if( window.clipboardData && clipboardData.setData )
	{
		clipboardData.setData("Text", strText);
	}
	else
	{
		prompt('Copy the following for referencing this page from another web page.',strText);
	}
}

