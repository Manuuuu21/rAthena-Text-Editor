const rathena_tooltip_doc = `
---------------------- Breakline ----------------------
<syntax>
*select("<option>"{,"<option>",...})
</syntax>
<description>
This function is a handy replacement for 'menu' for some specific cases where
you don't want a complex label structure - like, for example, asking simple yes-
no questions. It will return the number of menu option picked, starting with 1.
Like 'menu', it will also set the variable @menu to contain the option the user
picked.
</description>
<example_code>
prontera,150,150,4	script	MenuNPC	115,{
	mes "[Menu NPC]";
	mes "Please choose an option:";
	switch(select("Option 1:Option 2:Option 3")) {
		case 1:
			mes "You selected Option 1.";
			break;
		case 2:
			mes "You selected Option 2.";
			break;
		case 3:
			mes "You selected Option 3.";
			break;
	}
	close;
}
</example_code>
<code_explanation>
The provided script creates a simple interactive menu for players. 
The select() command is the core of this interaction; it displays a list of options separated by colons and pauses the script until the player makes a choice. 
Once an option is selected, select() returns an integer representing the position of the chosen option (starting at 1 for the first item). 
This returned value is then passed into the switch statement, which evaluates the number and executes the corresponding case block to provide specific feedback or actions for each choice.
</code_explanation>
---------------------- Breakline ----------------------








`;