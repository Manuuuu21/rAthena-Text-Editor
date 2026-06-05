const rathena_tooltip_doc = `
1.- Basic commands.
2.- Information-retrieving commands.
3.- Checking commands.
4.- Player-related commands.
5.- Mob / NPC -related commands.
6.- Other commands.
7.- Instance commands.
8.- Quest Log commands.
9.- Battleground commands.
10.- Pet commands.
10.1.- The Pet AI commands.
11.- Homunculus commands.
12.- Mercenary commands.
13.- Party commands.
14.- Channel commands.
15.- Achievement commands.
---------------------- Breakline ----------------------
<syntax>
*mes "<string>"{,"<string>"{,...}};
</syntax>
<description>
This command will display a box on the screen for the invoking character, if no
such box is displayed already, and will print the string specified into that
box. There is normally no 'close' or 'next' button on this box, unless you
create one with 'close' or 'next', and while it's open the player can't do much
else, so it's important to create a button later. If the string is empty, it
will show up as an empty line.

<example_code>
mes "Text that will appear in the box";
</example_code>
Colors
------
Inside the string you may put color codes, which will alter the color of the
text printed after them. The color codes are all '^<R><G><B>' and contain three
hexadecimal numbers representing colors as if they were HTML colors - ^FF0000 is
bright red, ^00FF00 is bright green, ^0000FF is bright blue, ^000000 is black.
^FF00FF is a pure magenta, but it's also a color that is considered transparent
whenever the client is drawing windows on screen, so printing text in that color
will have kind of a weird effect. Once you've set a text's color to something,
you have to set it back to black unless you want all the rest of the text be in
that color:

<example_code>
mes "This is ^FF0000 red ^000000 and this is ^00FF00 green, ^000000 so.";
</example_code>
Notice that the text coloring is handled purely by the client. If you use non-
English characters, the color codes might get screwed if they stick to letters
with no intervening space. Separating them with spaces from the letters on
either side solves the problem.

Multiple Lines
--------------
To display multiple lines of message while only using a single 'mes' command,
use the script command in the following format:

<example_code>
mes "Line 1", "Line 2", "Line 3";
</example_code>
This will display 3 different lines while only consuming a single line in
the relevant script file.

Navigation
----------
For clients dated 2011-10-10aRagexe onwards, you can generate navigation links
using HTML-like labels:

<example_code>
mes "<NAVI>Display Name<INFO>mapname,x,y,0,000,flag</INFO></NAVI>";
</example_code>
The "flag" parameter can be:
0: Do not open Navigation Window (default).
1: Open Navigation Window.

The example below will make the [Tool Shop] text clickable and begin navigation
to alberta (98,154) when clicked.

mes "Have you checked out the <NAVI>[Tool Shop]<INFO>alberta,98,154,0,000,0</INFO></NAVI>?";

See also 'navigateto', which can be used for certain NPC events.

Items
-----
You can refer to items by using HTML-like links to certain items:

<example_code>
mes "<ITEMLINK>Display Name<INFO>Item ID</INFO></ITEMLINK>";
</example_code>
Where <Display Name> is the name that will be displayed for your link and
<Item ID> being the ID of the item you want to link to when clicked.

In 2015 the tag name was changed to <ITEM> resulting in the following syntax:

<example_code>
mes "<ITEM>Display Name<INFO>Item ID</INFO></ITEM>";
</example_code>
We therefore created script command "mesitemlink" that allows you to create the correct syntax
depending on your configured packet version. We recommend that you use this script command
instead of hardcoding the HTML-like tags. For more details see the documentation for "mesitemlink".

The following sample will open a preview window for Red Potion:

<example_code>
mes "Did you ever consume a <ITEMLINK>Red Potion<INFO>501</INFO></ITEMLINK>?";
// Or in 2015:
mes "Did you ever consume a <ITEM>Red Potion<INFO>501</INFO></ITEM>?";
</example_code>
NOTE: Be aware that item links are broken in some 2015 clients.

In 2023 the syntax ^i[Item ID] was introduced to display an item icon inside a NPC dialog.
We created a script command "mesitemicon" that allows you to create the correct syntax
depending on your configured packet version. We recommend that you use this script command
instead of hardcoding the other syntax. For more details see the documentation for "mesitemicon".

URLs
----
Similarly, you can create links to websites that launch in a new window:

<example_code>
mes "<URL>Display Name<INFO>http://www.example.com/</INFO></URL>";
</example_code>
Quests
------
You can link to a quest:

<example_code>
mes "<QUEST>Quest<INFO>1</INFO></QUEST>";
</example_code>
Message
-------
You can show a message from the msgstringtable:

<example_code>
mes "<MSG>1</MSG>";
</example_code>
Tips
----
You can show a tip box:

<example_code>
mes "<TIPBOX>Show Tip<INFO>1</INFO></TIPBOX>";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*next;
</syntax>
<description>
This command will display a 'next' button in the message window for the
invoking character. Clicking on it will cause the window to clear and display
a new one. Used to segment NPC-talking, next is often used in combination with
'mes' and 'close'.

If no window is currently on screen, one will be created, but once the invoking
character clicks on it, a warning is thrown on the server console and the script
will terminate.

<example_code>
mes "[Woman]";
mes "This would appear on the page";
next;
// This is needed since it is a new page and the top will now be blank
mes "[Woman]";
mes "This would appear on the 2nd page";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*clear;
</syntax>
<description>
This command will clear the dialog text and continue the script without player interaction.

<example_code>
mes "This is how the 'clear' script command works.";
sleep2 3000;
clear; // This will clear the dialog and continue to the next one.
mes "I will show you again.";
sleep2 3000;
clear;
mes "Bye!";
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*close;
</syntax>
<description>
This command will create a 'close' button in the message window for the invoking
character. If no window is currently on screen, the script execution will end. This is one
of the ways to end a speech from an NPC. Once the button is clicked, the NPC
script execution will end, and the message box will disappear.

<example_code>
mes "[Woman]";
mes "I am finished talking to you. Click the close button.";
close;
mes "This command will not run at all, since the script has ended.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*close2;
</syntax>
<description>
This command will create a 'close' button in the message window for the invoking
character. WARNING: If no window is currently on screen, the script execution will halt
indefinitely! See 'close'. There is one important difference, though - even though
the message box will have closed, the script execution will not stop, and commands after
'close2' will still run, meaning an 'end' has to be used to stop the script, unless you
make it stop in some other manner.

<example_code>
mes "[Woman]";
mes "I will warp you now.";
close2;
warp "place",50,50;
end;
</example_code>
Don't expect things to run smoothly if you don't make your scripts 'end'.
</description>
---------------------- Breakline ----------------------
<syntax>
*close3;
</syntax>
<description>
The command is similar to 'close' but the cutin (if any) is cleared after closing.
</description>
---------------------- Breakline ----------------------
<syntax>
*end;
</syntax>
<description>
This command will stop the execution for this particular script. The two
versions are perfectly equivalent. It is the normal way to end a script which
does not use 'mes'.

<example_code>
if (BaseLevel <= 10)
npctalk "Look at that you are still a n00b";
else if (BaseLevel <= 20)
npctalk "Look at that you are getting better, but still a n00b";
else if (BaseLevel <= 30)
npctalk "Look at that you are getting there, you are almost 2nd profession now right???";
else if (BaseLevel <= 40)
npctalk "Look at that you are almost 2nd profession";
end;
</example_code>
Without the use of 'end' it would travel through the labels until the end of the
script. If you were lvl 10 or less, you would see all the speech lines, the use
of 'end' stops this, and ends the script.
</description>
---------------------- Breakline ----------------------
<syntax>
*set <variable>,<expression>{,<char_id>};
*set(<variable>,<expression>{,<char id>})
</syntax>
<description>
This command will set a variable to the value that the expression results in.
Variables may either be set through this command or directly, much like any
other programming language (refer to the "Assigning variables" section).

This is the most basic script command and is used a lot whenever you try to do
anything more advanced than just printing text into a message box.

<example_code>
set .@x,100;
</example_code>
will make .@x equal 100.

<example_code>
set .@x,1+5/8+9;
</example_code>
will compute 1+5/8+9 (which is, surprisingly, 10 - remember, all numbers are
integer in this language) and make .@x equal it.
</description>
---------------------- Breakline ----------------------
<syntax>
*setd "<variable name>",<value>{,<char_id>};
*setd("<variable name>",<value>{,<char_id>})
</syntax>

<description>
This command works almost identically to set, except the variable name is provided as a string and can therefore be constructed dynamically.  
It is equivalent to calling:  
set getd("variable name"),<value>;

<char_id> only works for non-server variables (i.e., character or account variables). The player with the given character ID must be online at the time of execution.

<example_code>
setd ".@var$", "Poporing";
mes .@var$; // Displays "Poporing".
</example_code>
<example_code>
setd ".@" + .@var$ + "123$", "Poporing is cool";
mes .@Poporing123$; // Displays "Poporing is cool".
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getd "<variable name>";
*getd("<variable name>")
</syntax>

<description>
Returns a reference to a variable; the variable name can be constructed dynamically.  
Refer to setd for usage.

This can also be used to set an array dynamically:  

<example_code>
setarray getd(".array[0]"), 1, 2, 3, 4, 5;

set getd("$varRefence"), 1;
</example_code>
<example_code>
set .@i, getd("$" + "pikachu");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getvariableofnpc(<variable>,"<npc name>")
</syntax>

<description>
Returns a reference to a NPC variable (with . prefix) from the target NPC.  
This can only be used to get . variables.

Note: Even though function objects can have .variables, getvariableofnpc will not work on them.

<example_code>
// This will return the value of .var, but cannot be used since the value isn't caught
getvariableofnpc(.var,"TargetNPC");

// This will set the .v variable to the value of the TargetNPC's .var variable
set .v, getvariableofnpc(.var,"TargetNPC");

// This will set the .var variable of TargetNPC to 1
set getvariableofnpc(.var,"TargetNPC"), 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getvar <variable>,<char_id>;
</syntax>
<description>
Get variable value from the specified player. Only player/account variables
are allowed to be used (temporary character variable "@", permanent
character "", permanent local account "#", and permanent global account "##").
</description>
---------------------- Breakline ----------------------
<syntax>
*goto <label>;
</syntax>

<description>
This command will make the script jump to a label, usually used in conjunction with other commands such as "if", but often used on its own.

This command should be avoided and only used if there is no other option.

<example_code>
// ...
goto Label;

mes "This will not be seen";
end;

Label:
mes "This will be seen";
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*menu "<option_text>",<target_label>{,"<option_text>",<target_label>,...};
</syntax>
<description>
This command will create a selectable menu for the invoking character. Only one
menu can be on screen at the same time.

Depending on what the player picks from the menu, the script execution will
continue from the corresponding label. (it's string-label pairs, not label-
string)

Options can be grouped together, separated by the character ':'.

<example_code>
menu "A:B",L_Wrong,"C",L_Right;
</example_code>
It also sets a special temporary character variable @menu, which contains the
number of option the player picked. (Numbering of options starts at 1.)
This number is consistent with empty options and grouped options.

<example_code>
menu "A::B",L_Wrong,"",L_Impossible,"C",L_Right;

L_Wrong:
// If they click "A" or "B" they will end up here
// @menu == 1 if "A"
// @menu == 2 will never happen because the option is empty
// @menu == 3 if "B"
L_Impossible:
// Empty options are not displayed and therefore can't be selected
// this label will never be reached from the menu command
L_Right:
// If they click "C" they will end up here
// @menu == 5
</example_code>
If a label is '-', the script execution will continue right after the menu
command if that option is selected, this can be used to save you time, and
optimize big scripts.
<example_code>
menu "A::B:",-,"C",L_Right;
// If they click "A" or "B" they will end up here
// @menu == 1 if "A"
// @menu == 3 if "B"
L_Right:
// If they click "C" they will end up here
// @menu == 5
</example_code>
Both these examples will perform the exact same task.

If you give an empty string as a menu item, the item will not display. This
can effectively be used to script dynamic menus by using empty string for
entries that should be unavailable at that time.

You can do it by using arrays, but watch carefully - this trick isn't high
wizardry, but minor magic at least. You can't expect to easily duplicate it
until you understand how it works.

Create a temporary array of strings to contain your menu items, and populate it
with the strings that should go into the menu at this execution, making sure not
to leave any gaps. Normally, you do it with a loop and an extra counter, like
this:

<example_code>
setarray .@possiblemenuitems$[0],<list of potential menu items>;
.@j = 0; // That's the menu lines counter.

// We loop through the list of possible menu items.
// .@i is our loop counter.
for( .@i = 0; .@i < getarraysize(.@possiblemenuitems$); .@i++ )
{
// That 'condition' is whatever condition that determines whether
// a menu item number .@i actually goes into the menu or not.

if (<condition>)
{
    // We record the option into the list of options actually available.

    .@menulist$[@j] = .@possiblemenuitems$[@i];

    // We just copied the string, we do need its number for later
    // though, so we record it as well.

    .@menureference[@j] = .@i;

    // Since we've just added a menu item into the list, we increment
    // the menu lines counter.

    .@j++;
}

// We go on to the next possible menu item.
}
</example_code>
This will create you an array .@menulist$ which contains the text of all items
that should actually go into the menu based on your condition, and an array
.@menureference, which contains their numbers in the list of possible menu items.
(Remember, arrays start with 0.) There's less of them than the possible menu
items you've defined, but the menu command can handle the empty lines - only if
they are last in the list, and if it's made this way, they are. Now comes a
dirty trick:

<example_code>
// X is whatever the most menu items you expect to handle.
menu .@menulist$[0],-,.@menulist$[1],-,...,.@menulist$[<X>],-;
</example_code>
This calls up a menu of all your items. Since you didn't copy some of the
possible menu items into the list, its end is empty and so no menu items will
show up past the end. But this menu call doesn't jump anywhere, it just
continues execution right after the menu command. (And it's a good thing it
doesn't, cause you can only explicitly define labels to jump to, and how do you
know which ones to define if you don't know beforehand which options will end up
where in your menu?)
But how do you figure out which option the user picked? Enter the @menu.

@menu contains the number of option that the user selected from the list,
starting with 1 for the first option. You know now which option the user picked
and which number in your real list of possible menu items it translated to:

<example_code>
mes "You selected " + .@possiblemenuitems$[.@menureference[@menu-1]] + "!";
</example_code>
@menu is the number of option the user picked.
@menu-1 is the array index for the list of actually used menu items that we
made.
.@menureference[@menu-1] is the number of the item in the array of possible menu
items that we've saved just for this purpose.

And .@possiblemenuitems$[.@menureference[@menu-1]] is the string that we used to
display the menu line the user picked. (Yes, it's a handful, but it works.)

You can set up a bunch of 'if (.@menureference[@menu-1] == X) goto Y' statements to
route your execution based on the line selected and still generate a different
menu every time, which is handy when you want to, for example, make users select
items in any specific order before proceeding, or make a randomly shuffled menu.

Kafra code bundled with the standard distribution uses a similar array-based
menu technique for teleport lists, but it's much simpler and doesn't use @menu,
probably since that wasn't documented anywhere.

See also 'select', which is probably better in this particular case. Instead of
menu, you could use 'select' like this:

<example_code>
.@dummy = select(.@menulist$[0],.@menulist$[1],...,.@menulist$[<X>]);
</example_code>
For the purposes of the technique described above these two statements are
perfectly equivalent.
</description>
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
</description>
---------------------- Breakline ----------------------
<syntax>
*prompt("<option>"{,"<option>",...})
</syntax>
<description>
The prompt() function in rAthena scripting is a convenient way to display a menu to the player, allowing them to make a selection from a list of options. 

It functions almost identically to the select() command; when a player chooses an option, the function returns the corresponding number of that option, starting from 1 for the first item. 

Additionally, it sets the temporary character variable @menu to the same value. A key feature of prompt() is that if the player clicks the 'Cancel' button instead of selecting an option, the function will return 255, allowing you to handle cancellations gracefully in your script logic.

<example_code>
// Example usage of prompt()
.@choice = prompt("Option 1:Option 2:Option 3");
if (.@choice == 255) { 
	mes "You cancelled the selection."; 
	close;
}

mes "You selected option number: " + .@choice;
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*input(<variable>{,<min>{,<max>}})
</syntax>
<description>
This command will make an input box pop up on the client connected to the
invoking character, to allow entering of a number or a string. This has many
uses, one example would be a guessing game, also making use of the 'rand'
function:

<example_code>
mes "[Woman]";
mes "Try and guess the number I am thinking of.";
mes "The number will be between 1 and 10.";
next;
.@number = rand(1,10);
input .@guess;
if (.@guess == .@number) {
	mes "[Woman]";
	mes "Well done, that was the number I was thinking of!";
	close;
} else {
	mes "[Woman]";
	mes "Sorry, that wasn't the number I was thinking of.";
	close;
}
</example_code>
If you give the input command a string variable to put the input in, it will
allow the player to enter text. Otherwise, only numbers will be allowed.

<example_code>
mes "[Woman]";
mes "Please say HELLO";
next;
input .@var$;
if (.@var$ == "HELLO") {
	mes "[Woman]";
	mes "Well done, you typed it correctly.";
	close;
} else {
	mes "[Woman]";
	mes "Sorry, you got it wrong.";
	close;
}
</example_code>
Normally you may not input a negative number with this command.
This is done to prevent exploits in badly written scripts, which would
let people, for example, put negative amounts of Zeny into a bank script and
receive free Zeny as a result.

Since trunk r12192 the command has two optional arguments and a return value.
The default value of 'min' and 'max' can be set with 'input_min_value' and
'input_max_value' in script_athena.conf.
For numeric inputs the value is capped to the range [min,max]. Returns 1 if
the value was higher than 'max', -1 if lower than 'min' and 0 otherwise.
For string inputs it returns 1 if the string was longer than 'max', -1 is
shorter than 'min' and 0 otherwise.
</description>
---------------------- Breakline ----------------------
<syntax>
*callfunc "<function>"{,<argument>,...<argument>};
*callfunc("<function>"{,<argument>,...<argument>})
</syntax>
<description>
This command lets you call up a function NPC. A function NPC can be called from
any script on any map server. Using the 'return' command it will come back to
the place that called it.

<example_code>
prontera,50,50,6	script	Woman	115,{
	mes "[Woman]"
	mes "Let's see if you win...";
	callfunc "funcNPC";
	mes "Well done, you have won!";
	close;
}

function	script	funcNPC	{
	.@win = rand(2);
	if (.@win == 0)
	    return;
	mes "Sorry, you lost.";
	close;
}
</example_code>
You can pass arguments to your function - values telling it what exactly to do -
which will be available there with getarg() (see 'getarg')
Notice that returning is not mandatory, you can end execution right there.

If you want to return a real value from inside your function NPC, it is better
to write it in the function form, which will also work and will make the script
generally cleaner:

<example_code>
prontera,50,50,6	script	Man	115,{
	mes "[Man]"
	mes "Gimme a number!";
	next;
	input .@number;
	if (callfunc("OddFunc",.@number)) mes "It's Odd!";
	close;
}

function	script	OddFunc	{
	if (getarg(0)%2 == 0)
	    return 0;// it's even
	return 1;// it's odd
}
</example_code>
Alternately, as of rAthena revision 15979 and 15981, user-defined functions
may be called directly without the use of the 'callfunc' script command.

<example_code>
function	script	SayHello	{
	mes "Hello " + getarg(0);
	return 0;
}

prontera,50,50,6	script	Man	115,{
	mes "[Man]";
	SayHello strcharinfo(0);
	close;
}
</example_code>
Note:
!! A user-defined function must be declared /before/ a script attempts to
!! call it. That is to say, any functions should be placed above scripts or NPCs
!! (or loaded in a separate file first) before attempting to call them directly.
</description>
---------------------- Breakline ----------------------
<syntax>
*callsub <label>{,<argument>,...<argument>};
*callsub(<label>{,<argument>,...<argument>})
</syntax>
<description>
This command will go to a specified label within the current script (do NOT use
quotes around it) coming in as if it were a 'callfunc' call, and pass it
arguments given, if any, which can be recovered there with 'getarg'. When done
there, you should use the 'return' command to go back to the point from where
this label was called. This is used when there is a specific thing the script
will do over and over, this lets you use the same bit of code as many times as
you like, to save space and time, without creating extra NPC objects which are
needed with 'callfunc'. A label is not callable in this manner from another
script.

Example 1: callsub for checking (if checks pass, return to script)

<example_code>
callsub S_CheckFull, "guild_vs2",50;
switch( rand(4) ) {
	case 0: warp "guild_vs2",9,50;  end;
	case 1: warp "guild_vs2",49,90; end;
	case 2: warp "guild_vs2",90,50; end;
	case 3: warp "guild_vs2",49,9;  end;
}

S_CheckFull:
if (getmapusers(getarg(0)) >= getarg(1)) {
	mes "I'm sorry, this arena is full.  Please try again later.";
	close;
}
return;
</example_code>
Example 2: callsub used repeatedly, with different arguments

<example_code>
// notice how the Zeny check/delete is reused, instead of copy-pasting for every warp
switch(select("Abyss Lake:Amatsu Dungeon:Anthell:Ayothaya Dungeon:Beacon Island, Pharos")) {
	case 1: callsub S_DunWarp,"hu_fild05",192,207;
	case 2: callsub S_DunWarp,"ama_in02",119,181;
	case 3: callsub S_DunWarp,"moc_fild20",164,145;
	case 4: callsub S_DunWarp,"ayo_fild02",279,150;
	case 5: callsub S_DunWarp,"cmd_fild07",132,125;
	// etc
}

S_DunWarp:
	// getarg(0) = "map name"
	// getarg(1) = x
	// getarg(2) = y
	if (Zeny >= 100) {
	Zeny -= 100;
	warp getarg(0),getarg(1),getarg(2);
} else {
	mes "Dungeon warp costs 100 Zeny.";
}
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getarg(<index>{,<default_value>})
</syntax>

<description>
This function is used when you use the callsub or callfunc commands. In the call you can specify variables that will make that call different from another one. This function will return an argument the function or subroutine was called with, and is the normal way to get them.

This is another thing that can let you use the same code more than once.

Argument numbering starts with 0, i.e. the first argument you gave is number 0. If no such argument was given, a zero is returned.

getarg has an optional second argument. If the target argument exists, it is returned. Otherwise, if default_value is present it is returned instead; if not, the script terminates immediately.

You can pass multiple arguments in a function call.

<example_code>
prontera,50,50,6	script	Woman1	115,{
	mes "[Woman]";
	mes "Let's see if you win...";
	callfunc "funcNPC",2;
	mes "Well done, you have won!";
	close;
}

prontera,52,50,6	script	Woman2	115,{
	mes "[Woman]";
	mes "Let's see if you win...";
	callfunc "funcNPC",5;
	mes "Well done, you have won!";
	close;
}

function	script	funcNPC	{
	.@win = rand(getarg(0));
	if (.@win == 0) return;
	mes "Sorry, you lost.";
	close;
}
</example_code>
The Woman1 NPC object calls funcNPC with argument 2, so when rand(getarg(0)) is called it can only be 0 or 1. Woman2 gives 5 as argument 0, so rand could be 0, 1, 2, 3 or 4, making Woman2 less likely to say the player won.

<example_code>
callfunc "funcNPC",5,4,3;
// getarg(0) would be 5, getarg(1) would be 4, getarg(2) would be 3
// getarg(2,-1) would be 3 and getarg(3,-1) would be -1
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getargcount()
</syntax>

<description>
This function is used when you use the callsub or callfunc commands. In the call you can specify arguments. This function will return the number of arguments provided.

<example_code>
callfunc "funcNPC",5,4,3;

function	script	funcNPC	{
.@count = getargcount(); // .@count will be 3
// ...
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*return {<value>};
</syntax>

<description>
This command causes the script execution to leave a previously called function (with callfunc) or script (with callsub) and return to the location where the call originated from. Optionally a return value can be supplied when the call was done using the function form.

Using this command outside of functions or scripts referenced by callsub will result in an error and termination of the script.

<example_code>
callfunc "<your function>"; // when nothing is returned

set <variable>, callfunc("<your function>"); // when a value is being returned
</example_code>
or

<example_code>
prontera,152,219,4	script	Argument_NPC	707,{
    mes "Hello! I can perform calculations for you.";
    next;

    // Example 1: Adding two numbers
    mes "Let's add two numbers.";
    input .@num1;
    input .@num2;
    .@result = callfunc("CalculateSum", .@num1, .@num2);
    mes "The sum of " + .@num1 + " and " + .@num2 + " is " + .@result + ".";
    next;

    // Example 2: Multiplying two numbers with a default value for the second argument
    mes "Now, let's multiply. If you only give one number, I'll multiply it by 5.";
    input .@factor1;
    .@product = callfunc("CalculateProduct", .@factor1);
    
    mes "The product is " + .@product + ".";
    close;
}

function	script	CalculateSum    {
    .@val1 = getarg(0);
    .@val2 = getarg(1);
    return .@val1 + .@val2;
}

function	script	CalculateProduct    {
    .@val1 = getarg(0);
    .@val2 = getarg(1, 5); // Default value of 5 if second argument is not provided
    return .@val1 * .@val2;
}
</example_code>
In this script, the return command serves as the exit point for the CalculateSum and CalculateProduct functions, immediately passing the computed result back to the callfunc command that invoked them. 

By using return, the script effectively terminates the function's execution and provides the final value to the main NPC script, allowing it to be stored in variables like .@result or .@product for further use.
</description>
---------------------- Breakline ----------------------
<syntax>
*function <function name>;
*<function name>{(<argument>,...<argument>)};
*function <function name> {
  <code>
}
</syntax>
<description>
This works like callfunc, and is used for cleaner and faster scripting. The function
must be defined and used within a script, and works like a label with arguments.
Note that the name may only contain alphanumeric characters and underscore.

Usage:

1. Declare the function.
function <function name>;
2. Call the function anywhere within the script.
It can also return a value when used with parentheses.
<function name>;
3. Define the function within the script.
<function name> {<code>}

<example_code>
prontera,154,189,4  script  Item Seller 767,{
	/* Function declaration */
	function SF_Selling;

	if (Zeny > 50) {
		mes "Welcome!";
		/* Function call */
		SF_Selling;
	}
	else mes "You need 50z, sorry!";
	close;

	/* Function definition */
	function SF_Selling {
		mes "Would you like to buy a phracon for 50z?";
		next;
		if (select("Yes","No, thanks") == 1) {
		    Zeny -= Zeny;
		    getitem 1010,1;
		    mes "Thank you!";
		}
		return;
	}
}
</example_code>
Example with parameters and return value:

<example_code>
prontera,150,150,0  script  TestNPC 123,{
	/* Function declaration */
	function MyAdd;

	mes "Enter two numbers.";
	next;
	input .@a;
	input .@b;
	/* Function call */
	mes .@a + " + " + .@b + " = " + MyAdd(.@a,.@b);
	close;

	/* Function definition */
	function MyAdd {
		return getarg(0)+getarg(1);
	}
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*is_function("<function name>")
</syntax>
<description>
This command checks whether a function exists. It returns 1 if the function is found, or 0 if it isn't.

<example_code>
function    script  try {
	dothat;
}

-   script  test    -1,{
	.@try = is_function("try"); // .@try will be 1
	.@not = is_function("not"); // .@not will be 0
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*if (<condition>) <statement>;
</syntax>

<description>
This is the basic conditional statement command, and just about the only one available in this scripting language.

The condition can be any expression. All expressions resulting in a non-zero value will be considered True, including negative values. All expressions resulting in a zero are false.

If the expression results in True, the statement will be executed. If it isn't true, nothing happens and we move on to the next line of the script.

Anything that is returned by a function can be used in a condition check without bothering to store it in a specific variable.

For more information on conditional operators see the operators section.

The script engine also supports nested if statements with else.

Remember that if you plan to do several actions upon a condition, you must use curly braces { } to group them.

Also, you can have multiple conditions nested or chained.

<example_code>
if (1)  mes "This will always print.";
if (0)  mes "And this will never print.";
if (5)  mes "This will also always print.";
if (-1) mes "Funny as it is, this will also print just fine.";
</example_code>

<example_code>
if (strcharinfo(0) == "Daniel Jackson") mes "It is true, you are Daniel!";
</example_code>

<example_code>
.@answer = 1;
input .@input;
if (.@input == .@answer)
    close;
mes "Sorry, your answer is incorrect.";
close;
</example_code>

<example_code>
.@answer = 1;
input .@input;
if (.@input != .@answer)
    mes "Sorry, your answer is incorrect.";
close;
</example_code>

Notice that examples 1 and 2 have the same effect.

<example_code>
.@count++;
mes "[Forgetful Man]";
if (.@count == 1) mes "This is the first time you have talked to me.";
if (.@count == 2) mes "This is the second time you have talked to me.";
if (.@count == 3) mes "This is the third time you have talked to me.";
if (.@count == 4) {
    mes "This is the fourth time you have talked to me.";
    mes "I think I am getting amnesia, I have forgotten about you...";
    .@count = 0;
}
close;
</example_code>

<example_code>
mes "[Quest Person]";
if (countitem(512) < 1) {  // 512 is the item ID for Apple, found in db/item_db.yml
    mes "Can you please bring me an apple?";
    close;
}
mes "Oh, you brought an Apple!";
mes "I didn't want it, I just wanted to see one.";
close;
</example_code>

<example_code>
mes "[Person Checker]";
if ($@name$ == "") {  // global variable not yet set
    mes "Please tell me someones name";
    next;
    input $@name$;
    $@name2$ = strcharinfo(0);
    mes "[Person Checker]";
    mes "Thank you.";
    close;
}
if ($@name$ == strcharinfo(0)) {  // player name matches $@name$
    mes "You are the person that " + $@name2$ + " just mentioned.";
    mes "Nice to meet you!";

    // reset the global variables
    $@name$ = "";
    $@name2$ = "";

    close;
}
mes "You are not the person that " + $name2$ + " mentioned.";
close;
</example_code>

See strcharinfo for an explanation of what this function does.

<example_code>
mes "[Multiple Checks]";
if (@queststarted == 1 && countitem(512) >= 5) {
    mes "Well done, you have started the quest and brought me 5 Apples.";
    @queststarted = 0;
    delitem 512,5;
    close;
}
mes "Please bring me 5 apples.";
@queststarted = 1;
close;
</example_code>

<example_code>
if (<condition>)
    dothis;
else
    dothat;
</example_code>

<example_code>
if (<condition>) {
    dothis1;
    dothis2;
} else {
    dothat1;
    dothat2;
    dothat3;
}
</example_code>

<example_code>
if (<condition 1>)
    dothis;
else if (<condition 2>) {
    dothat;
    end;
} else
    dothis;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*jump_zero (<condition>),<label>;
</syntax>

<description>
This command works kind of like an if + goto combination in one go. (See if). If the condition is false (equal to zero), this command will immediately jump to the specified label like in goto. While if is more generally useful, for some cases this could be an optimization.

The main reason for this command is that other control statements, like switch, for or while, are disassembled into simple expressions together with this command when a script is parsed.

<example_code>
jump_zero (.@count == 5), Label;
mes "Count is not 5";
end;

Label:
mes "Count is 5";
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*switch (expression);
</syntax>

<description>
The switch statement is similar to a series of if statements on the same expression. In many occasions, you may want to compare the same variable (or expression) with many different values, and execute a different piece of code depending on which value it equals to. This is exactly what the switch statement is for.

It is important to understand how the switch statement is executed in order to avoid mistakes. The switch statement executes line by line (actually, statement by statement). In the beginning, no code is executed. Only when a case statement is found with a value that matches the value of the switch expression will the case statement(s) be executed. The parser continues to execute the statements until the end of the switch block, or the first time it sees a break statement. If you don't write a break statement at the end of a case's statement list, the parser will go on executing the statements of the following case (fall-through).

The default statement applies to the rest of possible values when no other case matches, similar to else in an if-else statement.

<example_code>
switch(select("Yes:No")) {
case 1:
    mes "You said yes!";
    break;
case 2:
    mes "Aww, why?";
    break;
}
close;
</example_code>
The example above would work like a menu and would go to the first case if the user selects Yes, otherwise would go to the second one.

<example_code>
switch(getgroupid()) {
case 1:
    mes "Wow, you're super!";
    break;
case 2:
    mes "A helping hand!";
    break;
case 3:
    mes "10001010010011";
    break;
case 4:
    mes "Yes, milord?";
    break;
default:
    mes "Hello there!";
    break;
}
</example_code>
The example above would print a message depending on the player's groupid. If there is no case declared for the corresponding groupid, the script would use the default statement.
</description>
---------------------- Breakline ----------------------
<syntax>
*while (<condition>) <statement>;
</syntax>

<description>
This is probably the simplest and most frequently used loop structure. The while statement can be interpreted as "while condition is true, perform statement". It is a pretest loop, meaning the conditional expression is tested before any of the statements in the body of the loop are performed. If the condition evaluates to false, the statement(s) in the body of the loop is/are never executed. If the condition evaluates to true, the statement(s) are executed, then control transfers back to the conditional expression, which is reevaluated and the cycle continues.

Multiple statements can be grouped with { } curly braces, just like with the if statement.

<example_code>
while (switch(select("Yes:No") == 2))
    mes "You picked no.";
close;
</example_code>

<example_code>
while (switch(select("Yes:No") == 2)) {
    mes "Why did you pick no?";
    mes "You should pick yes instead!";
}
close;
</example_code>

<example_code>
.@i = 1;
while (.@i <= 5) {
    mes "This line will print 5 times.";
    .@i += 1;
}
close;
</example_code>

<example_code>
mes "Input 0 to stop";
input .@num;
while (.@num != 0) {
    mes "You entered " + .@num;
    input .@num;
}
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*for (<variable initialization>; <condition>; <variable update>) <statement>;
</syntax>

<description>
Another pretest looping structure is the for statement. It is considered a specialized form of the while statement, and is usually associated with counter-controlled loops. Here are the steps of the for statement: the initialize statement is executed first and only once. The condition test is performed. When the condition evaluates to false, the rest of the for statement is skipped. When the condition evaluates to true, the body of the loop is executed, then the update statement is executed (this usually involves incrementing a variable). Then the condition is reevaluated and the cycle continues.

Multiple statements can be grouped with { } curly braces, just like with the if and while statements.

<example_code>
for (.@i = 1; .@i <= 5; .@i++)
    mes "This line will print 5 times.";
</example_code>
<example_code>
mes "This will print the numbers 1 - 5.";
for (.@i = 1; .@i <= 5; .@i++)
    mes "Number: " + .@i;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*do { <statement>; } while (<condition>);
</syntax>

<description>
The do...while is the only post-test loop structure available in this script language. With a post-test, the statements are executed once before the condition is tested. When the condition is true, the statement(s) are repeated. When the condition is false, control is transferred to the statement following the do...while loop expression.

<example_code>
mes "This menu will keep appearing until you pick Cancel";
do {
.@menu = select("One:Two:Three:Cancel");
} while (.@menu != 4);
</example_code>
<example_code>
mes "This will countdown from 10 to 1.";
.@i = 10;
do {
mes .@i;
.@i -= 1;
} while (.@i > 0);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*freeloop({<toggle>})
</syntax>

<description>
Toggling this to enabled (1) allows the script instance to bypass the infinite loop protection, allowing your script to loop as much as it may need. Disabling (0) will warn you if an infinite loop is detected.

The command will return the state of freeloop for the attached script, even if no argument is provided.

<example_code>
freeloop(1); // enable script to loop freely

// be careful with what you do here
for (.@i = 0; .@i < .@bigloop; .@i++) {
    dothis;
    // will sleep the script for 1ms when detect an infinity loop to
    // let rAthena do what it needs to do (socket, timer, process, etc.)
}

freeloop(0); // disable freeloop

for (.@i = 0; .@i < .@bigloop; .@i++) {
    dothis;
    // throw an infinity loop error
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setarray <array name>[<first value>],<value>{,<value>...<value>};
*setarray(<array name>[<first value>],<value>{,<value>...<value>})
</syntax>

<description>
This command will allow you to quickly fill up an array in one go. Check the Kafra scripts in the distribution to see this used a lot.

First value is the index of the first element of the array to alter.

<example_code>
setarray .@array[0], 100, 200, 300, 400, 500, 600;
</example_code>
<example_code>
setarray .@array[0], 200, 200, 200;
setarray .@array[1], 300, 150;

// will produce:
// .@array[0] = 200
// .@array[1] = 300
// .@array[2] = 150
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cleararray <array name>[<first value to alter>],<value>,<number of values to set>;
*cleararray(<array name>[<first value to alter>],<value>,<number of values to set>)
</syntax>

<description>
This command will change many array values at the same time to the same value.

<example_code>
setarray .@array[0], 100, 200, 300, 400, 500, 600;
// This will make all 6 values 0
cleararray .@array[0], 0, 6;
// This will make array element 0 change to 245
cleararray .@array[0], 245, 1;
// This will make elements 1 and 2 change to 345
cleararray .@array[1], 345, 2;
</example_code>
See setarray.
</description>
---------------------- Breakline ----------------------
<syntax>
*copyarray <destination array>[<first value>],<source array>[<first value>],<amount of data to copy>;
*copyarray(<destination array>[<first value>],<source array>[<first value>],<amount of data to copy>)
</syntax>

<description>
This command lets you quickly shuffle a lot of data between arrays, which is in some cases invaluable.

<example_code>
setarray .@array[0], 100, 200, 300, 400, 500, 600;
// So we have made .@array[]
copyarray .@array2[0], .@array[2], 2;

// Now, .@array2[0] will be equal to .@array[2] (300) and
// .@array2[1] will be equal to .@array[3] (400)

// Original array:
// .@array[0] = 100
// .@array[1] = 200
// .@array[2] = 300
// .@array[3] = 400
// .@array[4] = 500
// .@array[5] = 600

// New array:
// .@array2[0] = 300
// .@array2[1] = 400
// .@array2[2] = 0
// .@array2[3] = 0
</example_code>
Note that .@array[4] and .@array[5] won't be copied to the second array, and the remaining elements will return 0.
</description>
---------------------- Breakline ----------------------
<syntax>
*deletearray <array name>[<first value>]{,<how much to delete>};
*deletearray(<array name>[<first value>]{,<how much to delete>})
</syntax>

<description>
This command will delete a specified number of array elements totally from an array, shifting all the elements beyond this towards the beginning.

<example_code>
// This will delete array element 0, and move all the other array elements up one place
deletearray .@array[0], 1
</example_code>
<example_code>
// This would delete array elements numbered 1, 2 and 3, leave element 0 in its place,
// and move the other elements up so there are no gaps
deletearray .@array[1], 3
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*inarray <array name>,<value>;
*inarray(<array name>,<value>)
</syntax>

<description>
This command returns the index of the first matching value found in the array. It will return -1 if the value is not found.

<example_code>
setarray .@array[0], 100, 200, 300, 400, 500, 600, 100;

inarray(.@array[0], 200);
// returns 1 because 200 is at index 1 (.@array[1] == 200)

.@index = inarray(.@array[0], 600);
// .@index is now 5 because .@array[5] == 600

inarray(.@array[0], 100);
// while index 6 is also 100, the command returns the first instance it finds
// returns 0 because .@array[0] == 100

inarray(.@array[0], 800);
// returns -1 because 800 is not an element of the array .@array
</example_code>
For more details, see the sample in doc/sample/inarray.txt.
</description>
---------------------- Breakline ----------------------
<syntax>
*countinarray <array name>[{<start index>}],<array name>[{<start index>}];
*countinarray(<array name>[{<start index>}],<array name>[{<start index>}])
</syntax>

<description>
This command will check for matches between the array values and return the number of matches. While being optional, if <start index> is supplied, the search will begin from the given index value.

<example_code>
setarray .@array[0], 100, 200, 300, 400, 500, 600;

.@variable = 100;
if (countinarray(.@array[0], .@variable))
    mes "The number 100 was found in the array .@array";

countinarray(.@array[0], .@variable);
// returns 1 because the number 100 is an element of the array .@array

setarray .@array2[0], 100, 500;
countinarray(.@array[0], .@array2[0]);
// returns 2 because the numbers 100 and 500 are elements of the array .@array

setarray .@array3[0], 100, 700;
countinarray(.@array[0], .@array3[0]);
// returns 1 because the number 100 is an element of the array .@array
// but the number 700 is not an element of the array .@array

// You can also change the position of the arrays in the command
if (countinarray(.@array[0], .@array3[0]) == countinarray(.@array3[0], .@array[0]))
// This is true
</example_code>
For more details, see the sample in doc/sample/inarray.txt.
</description>
---------------------- Breakline ----------------------
<syntax>
*strcharinfo(<type>{,<char_id>})
</syntax>

<description>
This function will return either the name, party name or guild name for the invoking character. Whatever it returns is determined by type.

0 - Character's name.
1 - The name of the party they're in if any.
2 - The name of the guild they're in if any.
3 - The name of the map the character is in.

If a character is not a member of any party or guild, an empty string will be returned when requesting that information.

<example_code>
// Get the player's own character name
.@name$ = strcharinfo(0);

// Check if the player is in a guild
if (strcharinfo(2) != "")
    mes "You are in a guild called " + strcharinfo(2);
else
    mes "You are not in any guild.";

// Get another player's character name by ID
.@other_name$ = strcharinfo(0, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*convertpcinfo(<char_id>,<type>)
*convertpcinfo(<account_id>,<type>)
*convertpcinfo(<player_name>,<type>)
</syntax>

<description>
This function will return the information <type> for the specified character. Whatever it returns is determined by type.

CPC_NAME    - Character's name.
CPC_CHAR    - Character ID.
CPC_ACCOUNT - Account ID.

If a character is not found (or not online) when requesting that information, an empty string will be returned for CPC_NAME, 0 for other <type>.

<example_code>
// Get character ID from player name
.@char_id = convertpcinfo("Daniel Jackson", CPC_CHAR);

// Get account ID from character ID
.@account_id = convertpcinfo(150001, CPC_ACCOUNT);

// Get character name from account ID
.@name$ = convertpcinfo(2000000, CPC_NAME);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*strnpcinfo(<type>)
</syntax>

<description>
This function will return the various parts of the name of the calling NPC. Whatever it returns is determined by type.

0 - The NPC's display name (visible#hidden)
1 - The visible part of the NPC's display name
2 - The hidden part of the NPC's display name
3 - The NPC's unique name (::name)
4 - The name of the map the NPC is in.

<example_code>
prontera,150,150,4	script	DemoNPC#hidden_part	111,{
	mes "[Demo NPC]";
	mes "Display Name: " + strnpcinfo(0);
	mes "Visible Name: " + strnpcinfo(1);
	mes "Hidden Name: " + strnpcinfo(2);
	mes "Unique Name: " + strnpcinfo(3);
	mes "Map Name: " + strnpcinfo(4);
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getarraysize(<array name>)
</syntax>

<description>
This function returns the highest index of the array that is filled. Notice that zeros and empty strings at the end of this array are not counted towards this number.

<example_code>
setarray .@array[0], 100, 200, 300, 400, 500, 600;
set .@arraysize, getarraysize(.@array);
// .@arraysize == 6
</example_code>
<example_code>
setarray .@array[0], 100, 200, 300, 400, 500, 600, 0;
set .@arraysize, getarraysize(.@array);
// .@arraysize == 6 (the trailing zero is not counted)
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getelementofarray(<array name>,<index>)
</syntax>

<description>
This command retrieves the value of the element of given array at given index. This is equivalent to using:

<array name>[<index>]

The reason for this is that this short form is internally converted into a call to getelementofarray when the script is loaded.

This command is also useful when passing arrays to functions or accessing another NPC's arrays.

<example_code>
-	script	ArrayDemo	-1,{
	OnInit:
		setarray .@items[0], 501, 502, 503;
		debugmes "Element at index 0: " + getelementofarray(.@items, 0);
		debugmes "Element at index 1: " + getelementofarray(.@items, 1);
		debugmes "Element at index 2: " + getelementofarray(.@items, 2);
		end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*readparam(<parameter number>{,"<character name>"})
*readparam(<parameter number>{,<char_id>})
</syntax>

<description>
This function will return the specified stat of the invoking character, or, if a character name or character id is specified, of that player. The stat can either be a number or parameter name, defined in src/map/script_constants.hpp.

Some example parameters:

<example_code>
StatusPoint, BaseLevel, SkillPoint, Class, Upper, Zeny, Sex, Weight, MaxWeight,
JobLevel, BaseExp, JobExp, NextBaseExp, NextJobExp, Hp, MaxHp, Sp, MaxSp,
BaseJob, Karma, Manner, bVit, bDex, bAgi, bStr, bInt, bLuk, Ap, MaxAp
</example_code>
All of these also behave as variables, but don't expect to be able to just set them - some will not work for various internal reasons.

<example_code>
// Returns how many status points you haven't spent yet
mes "Unused status points: " + readparam(9);

// Using this particular information as a function call is not required
// Typing this will return the same result:
mes "Unused status points: " + StatusPoint;
</example_code>
<example_code>
// You can also use this command to get stat values
if (readparam(bVit) > 77)
    mes "Only people with over 77 Vit are reading this!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getcharid(<type>{,"<character name>"})
</syntax>

<description>
This function will return a unique ID number of the invoking character, or, if a character name is specified, of that player.

Type is the kind of associated ID number required:

0 - Character ID
1 - Party ID
2 - Guild ID
3 - Account ID
4 - Battle Ground ID
5 - Clan ID

For most purposes other than printing it, a number is better to have than a name (people do horrifying things to their character names).

If the character is not in a party or not in a guild, the function will return 0 if guild or party number is requested. If a name is specified and the character is not found, 0 is returned.

If getcharid(0) returns a zero, the script got called not by a character and doesn't have an attached RID. Note that this will cause the map server to print "player not attached!" error messages, so it is preferred to use playerattached to check for the character attached to the script.

<example_code>
if (getcharid(2) == 0)
    mes "Only members of a guild are allowed here!";
</example_code>
<example_code>
prontera,150,150,4	script	ID_Checker	111,{
	mes "[ID Checker]";
	mes "Character ID: " + getcharid(0);
	mes "Party ID: " + getcharid(1);
	mes "Guild ID: " + getcharid(2);
	mes "Account ID: " + getcharid(3);
	mes "Battleground ID: " + getcharid(4);
	mes "Clan ID: " + getcharid(5);
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getnpcid(<type>{,"<npc name>"})
</syntax>

<description>
Retrieves IDs of the currently invoked NPC. If a unique NPC name is given, IDs of that NPC are retrieved instead. Type specifies what ID to retrieve and can be one of the following:

0 - NPC Game ID

If an invalid type is given or the NPC does not exist, 0 is returned.

<example_code>
prontera,155,155,4	script	TargetNPC#1	111,{
	mes "[Target NPC]";
	mes "My Game ID is: " + getnpcid(0);
	close;
}

prontera,155,157,4	script	ID_Checker	111,{
	mes "[ID Checker]";
	mes "My Game ID: " + getnpcid(0);
	mes "TargetNPC ID: " + getnpcid(0, "TargetNPC#1");
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getchildid({<char_id>})
</syntax>

<description>
These functions return the character ID of the attached player's child, mother, or father, respectively. It returns 0 if no ID is found.

<example_code>
prontera,150,150,4	script	Family_Checker	111,{
	mes "[Family Checker]";
	
	// Check for Mother
	if (getmotherid()) {
		mes "Mother's ID: " + getmotherid();
	} else {
		mes "Mother: Not found.";
	}

	// Check for Father
	if (getfatherid()) {
		mes "Father's ID: " + getfatherid();
	} else {
		mes "Father: Not found.";
	}

	// Check for Child
	if (getchildid()) {
		mes "Child's ID: " + getchildid();
	} else {
		mes "Child: Not found.";
	}
	
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getmotherid({<char_id>})
</syntax>

<description>
These functions return the character ID of the attached player's child, mother, or father, respectively. It returns 0 if no ID is found.

<example_code>
prontera,150,150,4	script	Family_Checker	111,{
	mes "[Family Checker]";
	
	// Check for Mother
	if (getmotherid()) {
		mes "Mother's ID: " + getmotherid();
	} else {
		mes "Mother: Not found.";
	}

	// Check for Father
	if (getfatherid()) {
		mes "Father's ID: " + getfatherid();
	} else {
		mes "Father: Not found.";
	}

	// Check for Child
	if (getchildid()) {
		mes "Child's ID: " + getchildid();
	} else {
		mes "Child: Not found.";
	}
	
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getfatherid({<char_id>})
</syntax>

<description>
These functions return the character ID of the attached player's child, mother, or father, respectively. It returns 0 if no ID is found.

<example_code>
prontera,150,150,4	script	Family_Checker	111,{
	mes "[Family Checker]";
	
	// Check for Mother
	if (getmotherid()) {
		mes "Mother's ID: " + getmotherid();
	} else {
		mes "Mother: Not found.";
	}

	// Check for Father
	if (getfatherid()) {
		mes "Father's ID: " + getfatherid();
	} else {
		mes "Father: Not found.";
	}

	// Check for Child
	if (getchildid()) {
		mes "Child's ID: " + getchildid();
	} else {
		mes "Child: Not found.";
	}
	
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*ispartneron({<char_id>})
</syntax>

<description>
This function returns 1 if the invoking character's marriage partner is currently online and 0 if they are not or if the character has no partner.

<example_code>
if (ispartneron())
    mes "Your partner is currently online!";
else
    mes "Your partner is offline or you don't have a partner.";
</example_code>
<example_code>
// Check for another character by ID
.@is_online = ispartneron(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getpartnerid({<char_id>})
</syntax>

<description>
This function returns the character ID of the invoking character's marriage partner, if any. If the invoking character is not married, it will return 0, which is a quick way to see if they are married.

<example_code>
if (getpartnerid())
    mes "You're married already!";
</example_code>
<example_code>
if (!getpartnerid())
    mes "I'm not going to be your girlfriend!";
</example_code>
<example_code>
// Check another character's marriage status by ID
if (getpartnerid(150001))
    mes "That character is married.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getlook(<type>{,<char_id>})
</syntax>

<description>
This function will return the number for the current character look value specified by type. See setlook for valid look types.

This can be used to make a certain script behave differently for characters dressed in a particular way.

<example_code>
// Check the character's hair style
.@hair_style = getlook(LOOK_HAIR);

// Check the character's clothes color
.@cloth_color = getlook(LOOK_CLOTHES_COLOR);

// Check another character's weapon look
.@weapon = getlook(LOOK_WEAPON, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getsavepoint(<information type>{,<char_id>})
</syntax>

<description>
This function will return information about the invoking character's save point. You can use it to let a character swap between several recorded save points. Available information types are:

0 - Map name (a string)
1 - X coordinate
2 - Y coordinate

<example_code>
// Get the character's save map
.@save_map$ = getsavepoint(0);

// Get the save coordinates
.@save_x = getsavepoint(1);
.@save_y = getsavepoint(2);

mes "Your save point is at " + .@save_map$ + " (" + .@save_x + ", " + .@save_y + ")";
</example_code>
<example_code>
// Get save point info for another character by ID
.@other_map$ = getsavepoint(0, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getcharip({"<character name>"|<account id>|<char id>})
</syntax>

<description>
This function will return the IP address of the invoking character, or, if a player is specified, of that character. A blank string is returned if no player is attached.

<example_code>
// Outputs IP address of attached player
mes "Your IP: " + getcharip();
</example_code>
<example_code>
// Outputs IP address of character "Silver"
mes "Silver's IP: " + getcharip("Silver");
</example_code>
<example_code>
// Outputs IP address by account ID or character ID
mes "Account IP: " + getcharip(2000000);
mes "Character IP: " + getcharip(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*vip_status(<type>,{"<character name>"})
</syntax>

<description>
Returns various information about a player's VIP status.

Valid types:
VIP_STATUS_ACTIVE - VIP status: true if the player is a VIP or false if not
VIP_STATUS_EXPIRE - VIP expire timestamp if the player is VIP or 0 if not
VIP_STATUS_REMAINING - VIP time remaining in seconds

NOTE: This command is only available if the VIP System is enabled.

<example_code>
// Check if attached player is VIP
if (vip_status(VIP_STATUS_ACTIVE))
    mes "You are a VIP!";
else
    mes "You are not a VIP.";

// Get VIP expiration time for attached player
.@expire = vip_status(VIP_STATUS_EXPIRE);

// Get remaining VIP time for another character
.@remaining = vip_status(VIP_STATUS_REMAINING, "Silver");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*vip_time <time>,{"<character name>"};
</syntax>

<description>
Changes a player's VIP time (in minutes). A positive value will increase time, and a negative value will decrease time.

NOTE: This command is only available if the VIP System is enabled.

<example_code>
// Add 60 minutes of VIP time to attached player
vip_time 60;

// Add 1440 minutes (1 day) to character "Silver"
vip_time 1440, "Silver";

// Remove 30 minutes from attached player
vip_time -30;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*addspiritball <count>,<duration>{,<char_id>};
</syntax>

<description>
Adds spirit balls to the player for duration specified in milliseconds.

<example_code>
// Add 5 spirit balls to attached player for 30 seconds (30000 ms)
addspiritball 5, 30000;

// Add 3 spirit balls to another player for 10 seconds
addspiritball 3, 10000, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*delspiritball <count>{,<char_id>};
</syntax>

<description>
Deletes the spirit ball(s) from the player.

<example_code>
// Delete 3 spirit balls from attached player
delspiritball 3;

// Delete 5 spirit balls from another player
delspiritball 5, 150001;

// Delete all spirit balls (use a large number or check current count first)
.@current = getvariableofnpc(.@spiritball_count, "SomeNPC"); // hypothetical
delspiritball .@current;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*countspiritball {<char_id>};
</syntax>

<description>
Counts the spirit balls that the player has.

<example_code>
// Get attached player's spirit ball count
.@count = countspiritball();
mes "You have " + .@count + " spirit balls.";

// Get another player's spirit ball count
.@other_count = countspiritball(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*ignoretimeout <flag>{,<char_id>};
</syntax>

<description>
Disables or enables the SECURE_NPCTIMEOUT function on the character invoking the script, or by the given character ID/character name.

Valid flag:
0 - Enabled SECURE_NPCTIMEOUT
1 - Disable SECURE_NPCTIMEOUT

Note: SECURE_NPCTIMEOUT must be enabled for this to work.

<example_code>
// Disable NPC timeout for attached player
ignoretimeout 1;

// Re-enable NPC timeout for attached player
ignoretimeout 0;

// Disable NPC timeout for another character
ignoretimeout 1, "Silver";
ignoretimeout 1, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequipid({<equipment slot>,<char_id>})
</syntax>

<description>
This function returns the item ID of the item slot that calls the script on the invoking character or the specified equipment slot. If nothing is equipped there, it returns -1.

Valid equipment slots are:

<example_code>
EQI_COMPOUND_ON (-1)      // Item slot that calls this script (In context of item script) // exclusive to getequipid
EQI_ACC_L (0)             // Accessory 1
EQI_ACC_R (1)             // Accessory 2
EQI_SHOES (2)             // Footgear (shoes, boots)
EQI_GARMENT (3)           // Garment (mufflers, hoods, manteaux)
EQI_HEAD_LOW (4)          // Lower Headgear (beards, some masks)
EQI_HEAD_MID (5)          // Middle Headgear (masks, glasses)
EQI_HEAD_TOP (6)          // Upper Headgear
EQI_ARMOR (7)             // Armor (jackets, robes)
EQI_HAND_L (8)            // Left hand (weapons, shields)
EQI_HAND_R (9)            // Right hand (weapons)
EQI_COSTUME_HEAD_TOP (10) // Upper Costume Headgear
EQI_COSTUME_HEAD_MID (11) // Middle Costume Headgear
EQI_COSTUME_HEAD_LOW (12) // Lower Costume Headgear
EQI_COSTUME_GARMENT (13)  // Costume Garment
EQI_AMMO (14)             // Arrow/Ammunition
EQI_SHADOW_ARMOR (15)     // Shadow Armor
EQI_SHADOW_WEAPON (16)    // Shadow Weapon
EQI_SHADOW_SHIELD (17)    // Shadow Shield
EQI_SHADOW_SHOES (18)     // Shadow Shoes
EQI_SHADOW_ACC_R (19)     // Shadow Accessory 2
EQI_SHADOW_ACC_L (20)     // Shadow Accessory 1
</example_code>
Notice that a few items occupy several equipment slots, and if the character is wearing such an item, getequipid will return its ID number for either slot.

Can be used to check if you have something equipped, or if you haven't got something equipped.

<example_code>
if (getequipid(EQI_HEAD_TOP) == 2234)
    mes "What a lovely Tiara you have on";
else
    mes "Come back when you have a Tiara on";
close;
</example_code>
You can also use it to make sure people don't pass a point before removing an item totally from them.

<example_code>
// Check if wearing Legion Plate Armor (item IDs 2341 or 2342)
if (getequipid(EQI_ARMOR) == 2341 || getequipid(EQI_ARMOR) == 2342) {
    mes "You are wearing some Legion Plate Armor, please drop that in your stash before continuing";
    close;
}

// Check if Legion Plate Armor is in inventory
if (countitem(2341) > 0 || countitem(2342) > 0) {
    mes "You have some Legion Plate Armor in your inventory, please drop that in your stash before continuing";
    close;
}

mes "I will let you pass.";
close2;
warp "place", 50, 50;
end;
</example_code>
<example_code>
// Get equipment in head top slot for another character
.@item_id = getequipid(EQI_HEAD_TOP, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequipuniqueid(<equipment slot>{,<char_id>})
</syntax>

<description>
This function returns the unique ID (as a string) of the item equipped in the equipment slot specified on the invoking character. If nothing is equipped there, it returns an empty string. See getequipid for a full list of valid equipment slots.

<example_code>
// Get the unique ID of the equipped weapon
.@weapon_unique_id$ = getequipuniqueid(EQI_HAND_R);
mes "Your weapon's unique ID is: " + .@weapon_unique_id$;

// Check if something is equipped in the armor slot
if (getequipuniqueid(EQI_ARMOR) != "")
    mes "You are wearing armor with unique ID: " + getequipuniqueid(EQI_ARMOR);
else
    mes "You are not wearing any armor.";

// Get unique ID from another character's accessory
.@acc_unique_id$ = getequipuniqueid(EQI_ACC_L, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequipname(<equipment slot>{,<char_id>})
</syntax>

<description>
Returns the jname of the item equipped in the specified equipment slot on the invoking character, or an empty string if nothing is equipped in that position. Does the same thing as getitemname(getequipid()). Useful for an NPC to state what you are wearing, or maybe saving as a string variable. See getequipid for a full list of valid equipment slots.

<example_code>
if (getequipname(EQI_HEAD_TOP) != "")
    mes "So you are wearing a " + getequipname(EQI_HEAD_TOP) + " on your head";
else
    mes "You are not wearing any head gear";
</example_code>
<example_code>
// Check another character's weapon
.@weapon_name$ = getequipname(EQI_HAND_R, 150001);
if (.@weapon_name$ != "")
    mes "That character is wielding: " + .@weapon_name$;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitemname(<item id>)
*getitemname(<aegis item name>)
</syntax>

<description>
Given the database ID number of an item or its Aegis name, this function will return the text stored in the Name field in item_db_*.yml. The function returns "null" if the item doesn't exist.

<example_code>
// Get item name by ID
.@item_name$ = getitemname(512);
mes "Item ID 512 is: " + .@item_name$; // Displays "Apple"

// Get item name by Aegis name
.@item_name$ = getitemname("Apple");
mes "Apple's ID is: " + getitemid("Apple");

// Check if an item exists
if (getitemname(99999) == "null")
    mes "That item does not exist.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getbrokenid(<number>{,<char_id>})
</syntax>

<description>
This function will search the invoking character's inventory for any broken items, and will return their item ID numbers. Since the character may have several broken items, 1 given as an argument will return the first one found, 2 will return the second one, etc. Will return 0 if no such item is found.

<example_code>
// Let's see if they have anything broken
if (getbrokenid(1) == 0)
    mes "You don't have anything broken, quit bothering me.";
else
    // They do, so let's print the name of the first broken item
    mes "Oh, I see you have a broken " + getitemname(getbrokenid(1)) + " here!";
end;
</example_code>
<example_code>
// Check all broken items for another character
.@i = 1;
while (getbrokenid(.@i, 150001) != 0) {
    mes "Broken item " + .@i + ": " + getitemname(getbrokenid(.@i, 150001));
    .@i++;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequipisequiped(<equipment slot>{,<char_id>})
</syntax>

<description>
This function will return 1 if there is an equipment placed on the specified equipment slot and 0 otherwise. For a list of equipment slots see getequipid. Function originally used by the refining NPCs.

<example_code>
if (getequipisequiped(EQI_HEAD_TOP)) {
    mes "[Refiner]";
    mes "That's a fine hat you are wearing there...";
    close;
} else {
    mes "[Refiner]";
    mes "Do you want me to refine your dumb head?";
    close;
}
</example_code>
<example_code>
// Check multiple slots for another character
if (getequipisequiped(EQI_ARMOR, 150001) && getequipisequiped(EQI_SHOES, 150001))
    mes "That character is wearing armor and shoes.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequipisenableref(<equipment slot>{,<char_id>})
</syntax>

<description>
Will return 1 if the item equipped on the invoking character in the specified equipment slot is refinable, and 0 if it isn't. For a list of equipment slots see getequipid.

<example_code>
if (getequipisenableref(EQI_HEAD_TOP)) {
    mes "[Refiner]";
    mes "Ok I can refine this";
    close;
} else {
    mes "[Refiner]";
    mes "I can't refine this hat!...";
    close;
}
</example_code>
<example_code>
// Check another character's weapon for refinability
if (getequipisenableref(EQI_HAND_R, 150001))
    mes "That character's weapon can be refined.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequiprefinerycnt(<equipment slot>{,<char_id>})
</syntax>

<description>
Returns the current number of pluses for the item in the specified equipment slot. For a list of equipment slots see getequipid.

Can be used to check if you have reached a maximum refine value, default for this is +10.

<example_code>
if (getequiprefinerycnt(EQI_HEAD_TOP) < 10)
    mes "I will now upgrade your " + getequipname(EQI_HEAD_TOP);
else
    mes "Sorry, it's not possible to refine hats better than +10";
close;
</example_code>
<example_code>
// Get refine level of another character's armor
.@refine = getequiprefinerycnt(EQI_ARMOR, 150001);
mes "That character's armor is +" + .@refine;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequipweaponlv({<equipment slot>{,<char_id>}})
</syntax>

<description>
This function returns the weapon level for the weapon equipped in the specified equipment slot on the invoking character. For a list of equipment slots see getequipid.

Only EQI_HAND_L and EQI_HAND_R normally make sense, since only weapons have a weapon level.

If no item is equipped in this slot, or if it doesn't have a weapon level according to the database, 0 will be returned.

<example_code>
switch (getequipweaponlv(EQI_HAND_R)) {
	case 1: mes "You are holding a lvl 1 weapon."; break;
	case 2: mes "You are holding a lvl 2 weapon."; break;
	case 3: mes "You are holding a lvl 3 weapon."; break;
	case 4: mes "You are holding a lvl 4 weapon."; break;
	case 5: mes "You are holding a lvl 5 weapon."; break;
	case 6: mes "You are holding a lvl 6 weapon, hm, must be a custom design..."; break;
	default: mes "Seems you don't have a weapon on."; break;
}
</example_code>
<example_code>
if (getequipid(EQI_HAND_L) == 0) {
    mes "Seems you have nothing equipped here.";
    close;
}
switch (getequipweaponlv(EQI_HAND_L)) {
	case 0: mes "You are not holding a weapon, so it doesn't have a level."; break;
	case 1: mes "You are holding a lvl 1 weapon."; break;
	case 2: mes "You are holding a lvl 2 weapon."; break;
	case 3: mes "You are holding a lvl 3 weapon."; break;
	case 4: mes "You are holding a lvl 4 weapon."; break;
	case 5: mes "You are holding a lvl 5 weapon."; break;
	case 6: mes "You are holding a lvl 6 weapon, hm, must be a custom design..."; break;
}
</example_code>
<example_code>
// Get weapon level for another character's right hand
.@weapon_lv = getequipweaponlv(EQI_HAND_R, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequiparmorlv({<equipment slot>{,<char_id>}})
</syntax>

<description>
This function returns the armor level for the item equipped in the specified equipment slot on the invoking character. For a list of equipment slots see getequipid.

If no item is equipped in this slot, or if it doesn't have an armor level according to the database, 0 will be returned.

<example_code>
if (getequipid(EQI_ARMOR) == 0) {
    mes "Seems you have nothing equipped here.";
    close;
}
switch (getequiparmorlv(EQI_ARMOR)) {
	case 1: mes "You are wearing a lvl 1 armor."; break;
	case 2: mes "You are wearing a lvl 2 armor."; break;
	case 3: mes "You are wearing a lvl 3 armor, hm, must be a custom design..."; break;
}
</example_code>
<example_code>
// Get armor level for another character's equipment
.@armor_lv = getequiparmorlv(EQI_ARMOR, 150001);
.@shield_lv = getequiparmorlv(EQI_HAND_L, 150001); // shields have armor level too
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequippercentrefinery(<equipment slot>{,<enriched>,<char_id>})
</syntax>

<description>
This function calculates and returns the percent value chance to successfully refine the item found in the specified equipment slot of the invoking character by +1. There is no actual formula, the success rate for a given weapon level of a certain refine level is found in the db/(pre-)re/refine_db.yml file. For a list of equipment slots see getequipid.

If enriched parameter is set to true, chance to successfully refine the item with enriched material is returned instead.

These values can be displayed for the player to see, or used to calculate the random chance of a refine succeeding or failing and then going through with it (which is what the official NPC refinery scripts use it for).

<example_code>
// This will find a random number from 0 - 99 and if that is equal to or more
// than the value returned by this command it will go to L_Fail
if (getequippercentrefinery(EQI_HAND_L) <= rand(100)) goto L_Fail;
</example_code>
<example_code>
// Display refine chance to player
.@chance = getequippercentrefinery(EQI_HEAD_TOP);
mes "Your item has a " + .@chance + "% chance to refine successfully.";

// With enriched material
.@enriched_chance = getequippercentrefinery(EQI_ARMOR, true);
mes "With enriched material, the chance is " + .@enriched_chance + "%.";
</example_code>
<example_code>
// Check another character's refine chance
.@chance = getequippercentrefinery(EQI_HAND_R, false, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequiprefinecost(<equipment slot>,<type>,<information>{,<char id>})
</syntax>

<description>
This function returns refine cost for equipment in <equipment slot> based on passed arguments <type> and <information>.

Valid cost types are:

REFINE_COST_NORMAL     - For normal refining
REFINE_COST_HD         - For refining with HD ores
REFINE_COST_ENRICHED   - For refining with enriched ores

Valid information types are:

REFINE_ZENY_COST       - Zeny
REFINE_MATERIAL_ID     - Material Item ID

This function will return -1 on failure. The function fails if the cost type is invalid or if there is no item in the equipment slot.

<example_code>
// Get normal refine zeny cost for weapon
.@zeny_cost = getequiprefinecost(EQI_HAND_R, REFINE_COST_NORMAL, REFINE_ZENY_COST);
mes "It will cost " + .@zeny_cost + " zeny to refine your weapon.";

// Get material item ID for HD refining
.@mat_id = getequiprefinecost(EQI_ARMOR, REFINE_COST_HD, REFINE_MATERIAL_ID);
.@mat_name$ = getitemname(.@mat_id);
mes "You will need " + .@mat_name$ + " to refine with HD ores.";

// Get enriched refine cost for another character
.@enriched_cost = getequiprefinecost(EQI_HEAD_TOP, REFINE_COST_ENRICHED, REFINE_ZENY_COST, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getareadropitem("<map name>",<x1>,<y1>,<x2>,<y2>,<item>)
</syntax>

<description>
This function will count all the items with the specified ID number lying on the ground on the specified map within the x1/y1-x2/y2 square on it and return that number.

This is the only function around where a parameter may be either a string or a number! If it's a number, it means that only the items with that item ID number will be counted. If it is a string, it is assumed to mean the 'english name' field from the item database.

<example_code>
// Count all Apples (ID 512) on prontera map within coordinates (100,100) to (200,200)
.@count = getareadropitem("prontera", 100, 100, 200, 200, 512);
mes "There are " + .@count + " Apples on the ground in that area.";

// Count using item name
.@count = getareadropitem("prontera", 100, 100, 200, 200, "Apple");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequipcardcnt(<equipment slot>)
</syntax>

<description>
This function will return the number of cards that have been compounded onto a specific equipped item for the invoking character. See getequipid for a list of possible equipment slots.

<example_code>
// Check how many cards are in your weapon
.@card_count = getequipcardcnt(EQI_HAND_R);
mes "Your weapon has " + .@card_count + " card(s) compounded.";

// Check cards in armor
if (getequipcardcnt(EQI_ARMOR) > 0)
    mes "Your armor has cards in it!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getinventorylist {<char_id>};
</syntax>

<description>
This command sets a bunch of arrays with a complete list of whatever the invoking character has in their inventory, including all the data needed to recreate these items perfectly if they are destroyed. Here's what you get:

<example_code>
@inventorylist_id[]                // array of item ids.
@inventorylist_idx[]               // array of item inventory index.
@inventorylist_amount[]            // their corresponding item amounts.
@inventorylist_equip[]             // on which position the item is equipped (see EQP_* constants). It will contain 0 if the item is not equipped.
@inventorylist_refine[]            // for how much it is refined.
@inventorylist_identify[]          // whether it is identified.
@inventorylist_attribute[]         // whether it is broken.
@inventorylist_card1[]             // These four arrays contain card data for the items.
@inventorylist_card2[]             // These data slots are also used to store names inscribed on the items, so you can explicitly check if the character owns an item made by a specific craftsman.
@inventorylist_card3[]               
@inventorylist_card4[]               
@inventorylist_expire[]            // expire time (Unix time stamp). 0 means never expires.
@inventorylist_bound[]             // the bound type of the items (see BOUND_* constants)
@inventorylist_enchantgrade[]      // the enchantgrade of the items
@inventorylist_count               // the number of items in these lists.
@inventorylist_option_id1[]        // first array of random option IDs
@inventorylist_option_value1[]     // first array of random option values
@inventorylist_option_parameter1[] // first array of random option parameters
@inventorylist_option_id2[]        // second array of random option IDs
@inventorylist_option_value2[]     // second array of random option values
@inventorylist_option_parameter2[] // second array of random option parameters
@inventorylist_option_id3[]        // third array of random option IDs
@inventorylist_option_value3[]     // third array of random option values
@inventorylist_option_parameter3[] // third array of random option parameters
@inventorylist_option_id4[]        // fourth array of random option IDs
@inventorylist_option_value4[]     // fourth array of random option values
@inventorylist_option_parameter4[] // fourth array of random option parameters
@inventorylist_option_id5[]        // fifth array of random option IDs
@inventorylist_option_value5[]     // fifth array of random option values
@inventorylist_option_parameter5[] // fifth array of random option parameters
@inventorylist_tradable            // Returns if an item is tradable or not (Pass item_db.yml, bound, and rental restrictions).
@inventorylist_favorite            // Returns if an item is favorite or not
</example_code>
This could be handy to save/restore a character's inventory, since no other command returns such a complete set of data, and could also be the only way to correctly handle an NPC trader for carded and named items who could resell them - since NPC objects cannot own items, so they have to store item data in variables and recreate the items.

Notice that the variables this command generates are all temporary, attached to the character, and integer.

Be sure to use @inventorylist_count to go through these arrays, and not getarraysize, because the arrays are not automatically cleared between runs of getinventorylist.

<example_code>
// Get and display player's inventory list
getinventorylist;

mes "You have " + @inventorylist_count + " items in your inventory.";
for (.@i = 0; .@i < @inventorylist_count; .@i++) {
    mes "Item " + (.@i + 1) + ": " + getitemname(@inventorylist_id[.@i]) + " x" + @inventorylist_amount[.@i];
    if (@inventorylist_refine[.@i] > 0)
        mes "   Refine: +" + @inventorylist_refine[.@i];
}
</example_code>
<example_code>
// Get inventory list for another character
getinventorylist(150001);
.@count = @inventorylist_count;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cardscnt()
</syntax>

<description>
This function will return the number of cards inserted into the equipment from which the function is called.

This function is intended for use in item scripts.

<example_code>
// In an item script for a piece of equipment:
.@card_count = cardscnt();
if (.@card_count > 0)
    mes "This equipment has " + .@card_count + " card(s) inserted.";
else
    mes "No cards are inserted into this equipment.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getrefine()
</syntax>

<description>
This function will return the refine count of the equipment from which the function is called.

This function is intended for use in item scripts.

<example_code>
// In an item script for a piece of equipment:
.@refine = getrefine();
mes "This equipment has a refine level of +" + .@refine + ".";

// Bonus based on refine level
if (.@refine >= 7)
    bonus bAtk, 10;
if (.@refine >= 9)
    bonus bAtk, 5;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getnameditem(<item id>,"<name to inscribe>"|<char id>);
*getnameditem("<item name>","<name to inscribe>"|<char id>);
</syntax>

<description>
This function is equivalent to using getitem, however, it will not just give the character an item object, but will also inscribe it with a specified character's name. You may not inscribe items with arbitrary strings, only with names of characters that actually exist. While this isn't said anywhere specifically, apparently, named items may not have cards in them, slots or no - these data slots are taken by the character ID whose name is inscribed. Only one remains free and it's not quite clear if a card may be there.

This function will return 1 if an item was successfully created and 0 if it wasn't for whatever reason. Like getitem, this function will also accept an english name from the item database as an item name and will return 0 if no such item exists.

<example_code>
// Give a named Apple inscribed with "Daniel Jackson"
getnameditem(512, "Daniel Jackson");

// Give a named Sword inscribed with the attached player's own name
getnameditem("Sword", strcharinfo(0));

// Give a named item inscribed by character ID
getnameditem(512, 150001);

// Check if named item was successfully created
if (getnameditem(512, "Silver"))
    mes "Named item created successfully.";
else
    mes "Failed to create named item.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitemslots(<item ID>)
</syntax>

<description>
This function will look up the item with the specified ID number in the database and return the number of slots this kind of item has - 0 if they are not slotted. It will also be 0 for all non-equippable items, naturally, unless someone messed up the item database. It will return -1 if there is no such item.

<example_code>
// .@slots now has the amount of slots of the item with ID 1205 (Sword)
.@slots = getitemslots(1205);
mes "A Sword has " + .@slots + " slot(s).";

// Check item by name
.@slots = getitemslots("Apple"); // returns 0 (non-equippable)
.@slots = getitemslots("Padded Armor"); // returns 0 or 1 depending on database
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getiteminfo(<item ID>,<type>)
*getiteminfo(<item name>,<type>)
*getiteminfo(<aegis item name>,<type>)
</syntax>

<description>
This function will look up the item with the specified ID number in the database and return the info set by TYPE argument. It will return -1 if there is no such item or "" if the aegis item name is requested.

Valid types are:
<example_code>
ITEMINFO_BUY             (0)   // Buy Price
ITEMINFO_SELL            (1)   // Sell Price
ITEMINFO_TYPE            (2)   // Type
ITEMINFO_MAXCHANCE       (3)   // maxchance (max drop chance of this item, e.g. 1 = 0.01%)
                                  // if = 0, then monsters don't drop it at all (rare or a quest item)
                                  // if = 10000, then this item is sold in NPC shops only
ITEMINFO_GENDER          (4)   // Gender
ITEMINFO_LOCATIONS       (5)   // Location(s)
ITEMINFO_WEIGHT          (6)   // Weight
ITEMINFO_ATTACK          (7)   // ATK
ITEMINFO_DEFENSE         (8)   // DEF
ITEMINFO_RANGE           (9)   // Range
ITEMINFO_SLOT           (10)   // Slot
ITEMINFO_VIEW           (11)   // View
ITEMINFO_EQUIPLEVELMIN  (12)   // equipment LV
ITEMINFO_WEAPONLEVEL    (13)   // weapon LV
ITEMINFO_ALIASNAME      (14)   // AliasName
ITEMINFO_EQUIPLEVELMAX  (15)   // equipment LV Max
ITEMINFO_MAGICATTACK    (16)   // matk if RENEWAL is defined
ITEMINFO_ID             (17)   // item ID
ITEMINFO_AEGISNAME      (18)   // aegis item name
ITEMINFO_ARMORLEVEL     (19)   // armor LV
ITEMINFO_SUBTYPE        (20)   // Subtype
</example_code>
See the sample in doc/sample/getiteminfo.txt.

<example_code>
// Get item's buy price
.@buy = getiteminfo(512, ITEMINFO_BUY);
mes "An Apple costs " + .@buy + " zeny to buy from NPCs.";

// Get item's weight
.@weight = getiteminfo("Sword", ITEMINFO_WEIGHT);
mes "A Sword weighs " + .@weight + " weight units.";

// Get item's attack value
.@atk = getiteminfo(1205, ITEMINFO_ATTACK);
mes "Sword has " + .@atk + " attack.";

// Get Aegis name by item ID
.@aegis$ = getiteminfo(512, ITEMINFO_AEGISNAME);
mes "Apple's Aegis name is: " + .@aegis$;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequipcardid(<equipment slot>,<card slot>)
</syntax>

<description>
Returns value from equipped item slot in the indicated card slot (0, 1, 2, or 3).

This function returns CARD ID, CARD0_FORGE, CARD0_CREATE, or CARD0_PET (for card slot 0, if the item is produced). It's useful for when you want to check whether an item contains cards or if it's signed.

<example_code>
// Check what card is in the first card slot of your weapon
.@card_id = getequipcardid(EQI_HAND_R, 0);
if (.@card_id > 0 && .@card_id < 4000)
    mes "Your weapon has a " + getitemname(.@card_id) + " card in slot 0.";

// Check if weapon is signed (forge/crafted)
if (getequipcardid(EQI_HAND_R, 0) == CARD0_FORGE)
    mes "This weapon was forged by a blacksmith.";

// Check all card slots in armor
for (.@i = 0; .@i < 4; .@i++) {
    .@card = getequipcardid(EQI_ARMOR, .@i);
    if (.@card > 0 && .@card < 4000)
        mes "Armor card slot " + .@i + ": " + getitemname(.@card);
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mergeitem({,<char_id>});
</syntax>

<description>
Opens the merge item window to merge available items that can be merged.

<example_code>
// Simple usage - open merge window for attached player
mes "Let's check if any item can be merged.";
close2;
mergeitem;
end;
</example_code>
<example_code>
// Open merge window for another character
mergeitem(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mergeitem2({<item_id>{,<char_id>}});
*mergeitem2({"<item name>"{,<char_id>}});
</syntax>

<description>
Merges all stackable items that are separated by GUID flags (UniqueId in item_db or in item_group). If no item ID/name is given, all possible items in the player's inventory will be merged.

<example_code>
// Merge all mergeable items for attached player
mergeitem2;

// Merge only Apples (item ID 512) for attached player
mergeitem2(512);

// Merge only Apples by name
mergeitem2("Apple");

// Merge all items for another character
mergeitem2(150001);

// Merge only Apples for another character
mergeitem2(512, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequiptradability(<equipment slot>{,<char id>});
</syntax>

<description>
Returns true if the item in <equipment slot> is tradable. Returns false otherwise.

<example_code>
// Check if equipped weapon is tradable
if (getequiptradability(EQI_HAND_R))
    mes "Your weapon can be traded.";
else
    mes "Your weapon is bound and cannot be traded.";

// Check another character's armor
if (getequiptradability(EQI_ARMOR, 150001))
    mes "That character's armor is tradable.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*identifyall({<type>{,<account_id>}});
</syntax>

<description>
Returns the count of unidentified items in the player inventory.

If <type> is true, the command will identify all the unidentified items as well (default).
If <type> is false, the command only returns the count of unidentified items.

<example_code>
// Count unidentified items without identifying them
.@count = identifyall(false);
mes "You have " + .@count + " unidentified item(s).";

// Identify all items (default behavior)
.@identified = identifyall();
mes "Identified " + .@identified + " item(s).";

// Identify all items for another account
.@count = identifyall(true, 2000000);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getenchantgrade({<equipment slot>,<char_id>})
</syntax>

<description>
This function will return the enchantgrade of the equipment from which the function is called or the specified equipment slot. If nothing is equipped there, it returns -1.

Valid equipment slots are:
EQI_COMPOUND_ON      - Item slot that calls this script (In context of item script) (default)

For a list of other equipment slots see getequipid.

<example_code>
// Get enchantgrade of the item that called this script (item context)
.@grade = getenchantgrade();
mes "Enchant grade: " + .@grade;

// Get enchantgrade of equipped weapon
.@grade = getenchantgrade(EQI_HAND_R);
mes "Your weapon's enchant grade is: " + .@grade;

// Get enchantgrade of another character's armor
.@grade = getenchantgrade(EQI_ARMOR, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitempos()
</syntax>

<description>
This function will return the equip position of the equipment from which the function is called (see EQP_* constants).

This function is intended for use in item scripts.

<example_code>
// In an item script:
.@pos = getitempos();
switch (.@pos) {
    case EQP_HEAD_TOP:
        mes "This is an upper headgear.";
        break;
    case EQP_ARMOR:
        mes "This is an armor piece.";
        break;
    case EQP_HAND_R:
        mes "This is a right-hand weapon.";
        break;
    case EQP_HAND_L:
        mes "This is a left-hand weapon or shield.";
        break;
    default:
        mes "This item is equipped in position: " + .@pos;
        break;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getmapxy("<variable for map name>",<variable for x>,<variable for y>{,<type>,"<search value>"})
</syntax>

<description>
This function will locate a character object, NPC object or pet's coordinates and place their coordinates into the variables specified when calling it. It will return 0 if the search was successful, and -1 if the parameters given were not variables or the search was not successful.

Type is the type of object to search for:

<example_code>
BL_PC   // Character Character object (default)
BL_NPC  // NPC object
BL_PET  // Pet object
BL_HOM  // Homunculus object
BL_MER  // Mercenary object
BL_ELEM // Elemental object
</example_code>
The search value is optional. If it is not specified, the location of the invoking character will always be returned for types BL_PC and BL_PET, the location of the NPC running this function for type BL_NPC.

If a search value is specified, for types BL_PC and BL_NPC, the character or NPC with the specified name or GID will be located.

If type is BL_PET/BL_HOM/BL_MER/BL_ELEM, the search will locate the current object of the character whose name/GID is given in the search value, it will NOT locate the object by name.

Notice that NPC objects disabled with disablenpc will still be located.

<example_code>
prontera,164,301,3	script	Meh	730,{
    mes "My name is Meh. I'm here so that Nyah can find me.";
    close;
}

prontera,164,299,3	script	Nyah	730,{
    mes "My name is Nyah.";
    mes "I will now search for Meh all across the world!";
    if (getmapxy(.@mapname$, .@mapx, .@mapy, BL_NPC, "Meh") != 0) {
        mes "I can't seem to find Meh anywhere!";
        close;
    }
    mes "And I found him on map " + .@mapname$ + " at X:" + .@mapx + " Y:" + .@mapy + " !";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mapid2name(<map ID>)
</syntax>

<description>
Returns the map name of the given map ID. Returns an empty string if the given map ID doesn't exist.

<example_code>
// Get map name from map ID (example: prontera map ID is typically 1)
.@map_name$ = mapid2name(1);
mes "Map ID 1 is: " + .@map_name$;

// Check if a map ID exists
if (mapid2name(9999) == "")
    mes "Map ID 9999 does not exist.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getgmlevel({<char_id>})
</syntax>

<description>
This function will return the (GM) level associated with the player group to which the invoking character belongs. If this is somehow executed from a console command, 99 will be returned, and 0 will be returned if the account has no GM level.

This allows you to make NPCs only accessible for certain GM levels, or behave specially when talked to by GMs.

<example_code>
if (getgmlevel())
    mes "What is your command, your godhood?";
</example_code>
<example_code>
// Check if player has at least level 40 GM access
if (getgmlevel() >= 40)
    mes "Welcome, GM. Administrative functions are available.";

// Check another character's GM level
.@gm_lv = getgmlevel(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getgroupid({<char_id>})
</syntax>

<description>
This function will return the group id to which the invoking player belongs.

<example_code>
prontera,150,150,4	script	GroupChecker	767,{
	mes "[Group Checker]";
	mes "Checking your group ID...";
	next;

	switch(getgroupid()) {
		case 0:
			mes "You are a regular player.";
			break;
		case 99:
			mes "Welcome, Administrator!";
			break;
		default:
			mes "You belong to group ID: " + getgroupid();
			break;
	}
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*gettimetick(<tick type>)
</syntax>

<description>
This function will return a tick depending on <tick type>:

0: The server's tick, a measurement in milliseconds used by the server's timer system. This tick is an unsigned int which loops every ~50 days.

1: The time, in seconds, since the start of the current day.

2: The system time in UNIX epoch time, or the number of seconds elapsed since January 1st, 1970. Useful for reliably measuring time intervals.

<example_code>
// Get server tick (milliseconds since server start, loops every ~50 days)
.@server_tick = gettimetick(0);
mes "Server tick: " + .@server_tick;

// Get seconds since today started (midnight)
.@seconds_today = gettimetick(1);
mes "Seconds elapsed today: " + .@seconds_today;

// Get UNIX timestamp (seconds since Jan 1, 1970)
.@timestamp = gettimetick(2);
mes "Current UNIX timestamp: " + .@timestamp;

// Measure a time interval
.@start = gettimetick(2);
// ... do something ...
.@end = gettimetick(2);
.@elapsed = .@end - .@start;
mes "Operation took " + .@elapsed + " seconds.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*gettime(<type>)
</syntax>

<description>
This function will return specified information about the current system time.

<example_code>
DT_SECOND // Seconds (of the current minute)
DT_MINUTE // Minutes (of the current hour)
DT_HOUR // Hour (of the current day)
DT_DAYOFWEEK // Week day (constants for MONDAY to SUNDAY are available)
DT_DAYOFMONTH // Day of the current month
DT_MONTH // Month (constants for JANUARY to DECEMBER are available)
DT_YEAR // Year
DT_DAYOFYEAR // Day of the year
DT_YYYYMMDD // current date in the form YYYYMMDD
</example_code>
It will only return numbers. If another type is supplied, -1 will be returned.

<example_code>
if (gettime(DT_DAYOFWEEK) == SATURDAY)
    mes "It's a Saturday. I don't work on Saturdays.";
</example_code>
<example_code>
// Display current time
mes "Current time: " + gettime(DT_HOUR) + ":" + gettime(DT_MINUTE) + ":" + gettime(DT_SECOND);
mes "Today's date: " + gettime(DT_YEAR) + "/" + gettime(DT_MONTH) + "/" + gettime(DT_DAYOFMONTH);
mes "Day of year: " + gettime(DT_DAYOFYEAR);
mes "YYYYMMDD format: " + gettime(DT_YYYYMMDD);

// Seasonal check
if (gettime(DT_MONTH) == DECEMBER && gettime(DT_DAYOFMONTH) == 25)
    mes "Merry Christmas!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*gettimestr(<"time format">,<max length>{,<time_tick>})
</syntax>

<description>
This function will return a string containing time data as specified by the time format.

This uses the C function strftime, which obeys special format characters. For a full description see, for example, the description of strftime at http://www.delorie.com/gnu/docs/glibc/libc_437.html. All the format characters given there should properly work.

Max length is the maximum length of a time string to generate.

<example_code>
// Print current date and time like 'YYYY-MM/DD HH:MM:SS'
mes gettimestr("%Y-%m/%d %H:%M:%S", 21);
</example_code>
<example_code>
// Print the date and time when the player's VIP status expires
.@expire = vip_status(VIP_STATUS_EXPIRE);
if (.@expire > 0)
    mes "Your VIP expires on: " + gettimestr("%Y-%m/%d %H:%M:%S", 21, .@expire);
</example_code>
<example_code>
// Various format examples
mes "Year: " + gettimestr("%Y", 5);
mes "Month: " + gettimestr("%B", 10);
mes "Weekday: " + gettimestr("%A", 10);
mes "12-hour time: " + gettimestr("%I:%M:%S %p", 12);
mes "Date: " + gettimestr("%m/%d/%Y", 11);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getusers(<type>)
</syntax>

<description>
This function will return a number of users on a map or the whole server. What it returns is specified by Type.

Type can be one of the following values, which control what will be returned:

0 - Count of all characters on the map of the invoking character.
1 - Count of all characters in the entire server.
8 - Count of all characters on the map of the NPC the script is running in.

<example_code>
prontera,150,150,4	script	UserCounter	767,{
	mes "[User Counter]";
	mes "I can tell you how many players are online.";
	next;
	switch(select("Players on this map (NPC):Players on this map (Player):Total server players")) {
	case 1:
		mes "[User Counter]";
		mes "There are " + getusers(8) + " players on this map.";
		break;
	case 2:
		mes "[User Counter]";
		mes "There are " + getusers(0) + " players on your current map.";
		break;
	case 3:
		mes "[User Counter]";
		mes "There are " + getusers(1) + " players on the entire server.";
		break;
	}
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getmapusers("<map name>")
</syntax>

<description>
This function will return the number of users currently located on the specified map.

This is used officially in PVP scripts to check whether a room is filled to capacity.

<example_code>
prontera,150,152,4	script	MapChecker	767,{
	mes "[Map Checker]";
	mes "I can check how many players are in Prontera or help you enter the PVP room.";
	next;
	switch(select("Check Prontera count:Enter PVP Room")) {
	case 1:
		.@players = getmapusers("prontera");
		mes "[Map Checker]";
		mes "There are " + .@players + " players in Prontera.";
		break;
	case 2:
		if (getmapusers("pvp_room") >= 20) {
			mes "[Map Checker]";
			mes "The PVP room is full. Please try again later.";
		} else {
			mes "[Map Checker]";
			mes "Welcome to the PVP room!";
			close2;
			warp "pvp_room", 0, 0;
			end;
		}
		break;
	}
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getareausers("<map name>",<x1>,<y1>,<x2>,<y2>)
</syntax>

<description>
This function will return the count of connected characters which are located within the specified area - an x1/y1-x2/y2 square on the specified map.

This is useful for maps that are split into many buildings, such as all the *_in maps, due to all the shops and houses.

<example_code>
prontera,150,154,4	script	AreaChecker	767,{
	mes "[Area Checker]";
	mes "I can check how many players are in specific areas.";
	next;
	switch(select("Check Building count:Check Crowded Area")) {
	case 1:
		.@count = getareausers("prontera", 150, 100, 170, 120);
		mes "[Area Checker]";
		mes "There are " + .@count + " players in this building.";
		break;
	case 2:
		if (getareausers("payon", 200, 200, 250, 250) > 10) {
			mes "[Area Checker]";
			mes "This area is too crowded right now!";
		} else {
			mes "[Area Checker]";
			mes "The area is not crowded. Feel free to enter.";
		}
		break;
	}
	close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getunits(<type>{,<array_variable>[<first value>]})
</syntax>

<description>
The getunits command will return the number of <type> objects active on the server.

Type is the type of object to search for:

<example_code>
BL_PC   // Character objects
BL_MOB  // Monster objects
BL_PET  // Pet objects
BL_HOM  // Homunculus objects
BL_MER  // Mercenary objects
BL_NPC  // NPC objects
BL_ELEM // Elemental objects
</example_code>
If <array_variable> is provided:
- An int variable will return the list of GID.
- A string variable will return the list of names.

<example_code>
// Getting the players count and building a string array of the names
.@num = getunits(BL_PC, .@array$[0]);

mes "The number of users connected to the server is " + .@num + ".";
mes "List of players' names:";
freeloop(1);    // in case the list is too big
for (.@i = 0; .@i < getarraysize(.@array$); .@i++)
    mes (.@i + 1) + " " + .@array$[.@i];
freeloop(0);
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getmapunits(<type>,<"map name">{,<array_variable>[<first value>]})
</syntax>

<description>
The getmapunits command will return the number of <type> objects active on the specified <"map name">.

Type is the type of object to search for:

<example_code>
BL_PC   // Character objects
BL_MOB  // Monster objects
BL_PET  // Pet objects
BL_HOM  // Homunculus objects
BL_MER  // Mercenary objects
BL_NPC  // NPC objects
BL_ELEM // Elemental objects
</example_code>
If <array_variable> is provided:
- An int variable will return the list of GID.
- A string variable will return the list of names.

<example_code>
// Getting the NPC count in Prontera and building a string array of the names
.@num = getmapunits(BL_NPC, "prontera", .@array$[0]);

mes "The number of NPCs in Prontera is " + .@num + ".";
mes "List of NPC names:";
freeloop(1);    // in case the list is too big
for (.@i = 0; .@i < getarraysize(.@array$); .@i++)
    mes (.@i + 1) + " " + .@array$[.@i];
freeloop(0);
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getareaunits(<type>,<"map name">,<x1>,<y1>,<x2>,<y2>{,<array_variable>[<first value>]})
</syntax>

<description>
The getareaunits command will return the number of <type> objects actively located within the specified area where <x1>, <y1>, <x2>, <y2> form the area.

Type is the type of object to search for:

<example_code>
BL_PC   // Character objects
BL_MOB  // Monster objects
BL_PET  // Pet objects
BL_HOM  // Homunculus objects
BL_MER  // Mercenary objects
BL_NPC  // NPC objects
BL_ELEM // Elemental objects
</example_code>
If <array_variable> is provided:
- An int variable will return the list of GID.
- A string variable will return the list of names.

<example_code>
// Getting the monster count in Prontera within specific coordinates and building an int array of the GIDs
.@num = getareaunits(BL_MOB, "prontera", 154, 186, 159, 182, .@array[0]);

mes "The number of monsters in Prontera in that area is " + .@num + ".";
mes "List of monster GIDs:";
freeloop(1);    // in case the list is too big
for (.@i = 0; .@i < getarraysize(.@array); .@i++)
    mes (.@i + 1) + " " + .@array[.@i];
freeloop(0);
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getguildname(<guild id>)
</syntax>

<description>
This function returns a guild's name given an ID number. If there is no such guild, "null" will be returned.

<example_code>
mes "The guild " + getguildname(10007) + " are all nice people.";
</example_code>
<example_code>
// Get the attached player's guild name
.@guild_id = getcharid(2);
if (.@guild_id)
    mes "Your guild is: " + getguildname(.@guild_id);
else
    mes "You are not in a guild.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getguildmember <guild id>{,<type>{,<array_variable>}};
</syntax>

<description>
This command will find all members of a specified guild and returns their names (or character id or account id depending on the value of type) into an array of temporary global variables.

Upon executing this:
- $@guildmembername$[] is a global temporary string array which contains all the names of these guild members (only set when type is 0 or not specified)
- $@guildmembercid[] is a global temporary number array which contains the character id of these guild members (only set when type is 1)
- $@guildmemberaid[] is a global temporary number array which contains the account id of these guild members (only set when type is 2)
- $@guildmembercount is the number of guild members that were found.

The guild members will be found regardless of whether they are online or offline. Note that the names come in no particular order.

Be sure to use $@guildmembercount to go through this array, and not getarraysize, because it is not cleared between runs of getguildmember.

If array_variable is set, the result will be stored to that variable instead using a global variable.

For usage examples, see getpartymember.

<example_code>
// Get all member names of guild with ID 10007
getguildmember 10007;
mes "Guild has " + $@guildmembercount + " members.";
for (.@i = 0; .@i < $@guildmembercount; .@i++)
    mes "Member " + (.@i + 1) + ": " + $@guildmembername$[.@i];
</example_code>
<example_code>
// Get character IDs of guild members using type 1
getguildmember 10007, 1;
for (.@i = 0; .@i < $@guildmembercount; .@i++)
    mes "Character ID: " + $@guildmembercid[.@i];
</example_code>
<example_code>
// Store result in custom array variable
getguildmember 10007, 0, .@my_guild_members$;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getguildmaster(<guild id>)
</syntax>

<description>
This function returns the name of the master of the guild which has the specified ID number. If there is no such guild, "null" will be returned.

<example_code>
// Prints the guild master of guild 10007, whoever that might be
mes getguildmaster(10007) + " runs " + getguildname(10007);
</example_code>
<example_code>
// Checks if the character is the guild master of the specified guild
.@GID = getcharid(2);
if (.@GID == 0) {
    mes "Sorry, you are not in a guild.";
    close;
}
if (strcharinfo(0) != getguildmaster(.@GID)) {
    mes "Sorry, you don't own the guild you are in.";
    close;
}
mes "Welcome, guild master of " + getguildname(.@GID);
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getguildmasterid(<guild id>)
</syntax>

<description>
This function will return the character ID number of the guild master of the guild specified by the ID. Returns 0 if the character is not a guild master of any guild.

<example_code>
// Get guild master's character ID for guild 10007
.@master_cid = getguildmasterid(10007);
mes "Guild master's character ID: " + .@master_cid;

// Check if attached player is the guild master of their guild
.@GID = getcharid(2);
if (.@GID && getcharid(0) == getguildmasterid(.@GID))
    mes "You are the guild master!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getguildinfo(<guild ID>, <type>);
</syntax>

<description>
This function will look up and return the requested type of guild information.

Types:
<example_code>
GUILDINFO_NAME              // Guild's Name
GUILDINFO_LEVEL             // Guild's Level
GUILDINFO_AVERAGELEVEL      // Guild's Average Level
GUILDINFO_ONLINECOUNT       // Guild's Online Member Count
GUILDINFO_MEMBERCOUNT       // Guild's Current Member Count
GUILDINFO_MAXMEMBERCOUNT    // Guild's Max Member Count
GUILDINFO_EXP               // Guild's Current EXP
GUILDINFO_NEXTEXP           // Guild's Required EXP to Level
GUILDINFO_MASTERID          // Guild Master Character ID
GUILDINFO_MASTERNAME        // Guild Master Name
</example_code>
Note: Make sure to use the requestguildinfo script command to load the guild data from the char-server.

<example_code>
// Newly formed guild example
.@gid = 1234;

getguildinfo(.@gid, GUILDINFO_LEVEL); // Returns 0

requestguildinfo(.@gid);
getguildinfo(.@gid, GUILDINFO_LEVEL); // Returns current guild level
</example_code>
<example_code>
// Get various guild info for attached player's guild
.@gid = getcharid(2);
if (.@gid) {
    mes "Guild Name: " + getguildinfo(.@gid, GUILDINFO_NAME);
    mes "Guild Level: " + getguildinfo(.@gid, GUILDINFO_LEVEL);
    mes "Member Count: " + getguildinfo(.@gid, GUILDINFO_MEMBERCOUNT) + "/" + getguildinfo(.@gid, GUILDINFO_MAXMEMBERCOUNT);
    mes "Online Members: " + getguildinfo(.@gid, GUILDINFO_ONLINECOUNT);
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*is_guild_leader({<guild ID>})
</syntax>

<description>
This command will return true if the player attached to the script is the leader of his/her guild, or, if a guild ID is specified, of that guild.

<example_code>
// Check if attached player is their own guild's leader
if (is_guild_leader())
    mes "You are the leader of your guild!";
else
    mes "You are not the guild leader.";

// Check if attached player is the leader of guild 10007
if (is_guild_leader(10007))
    mes "You are the leader of guild 10007!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getcastlename("<map name>")
</syntax>

<description>
This function returns the name of the castle when given the map name for that castle. The data is read from db/castle_db.yml.

<example_code>
// Get castle name from map name
.@castle_name$ = getcastlename("prontera");
mes "The castle on this map is: " + .@castle_name$;

// Get castle name for a specific map
.@name$ = getcastlename("aldeg_cas01");
mes "Castle name: " + .@name$;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getcastledata("<map name>",<type of data>)
</syntax>

<description>
The getcastledata function returns the castle ownership information for the castle referred to by its map name. Castle information is stored in the guild_castle SQL table.

The setcastledata command will behave identically, but instead of returning values for the specified types of accessible data, it will alter them and cause them to be sent to the char-server for storage.

Changing Guild ID or Castle Defense will trigger additional actions, like recalculating guardians' HP.

Types of data correspond to guild_castle table columns:
<example_code>
CD_GUILD_ID          // Guild ID.
CD_CURRENT_ECONOMY   // Castle Economy score.
CD_CURRENT_DEFENSE   // Castle Defense score.
CD_INVESTED_ECONOMY  // Number of times the economy was invested in today.
CD_INVESTED_DEFENSE  // Number of times the defense was invested in today.
CD_NEXT_TIME         // unused
CD_PAY_TIME          // unused
CD_CREATE_TIME       // unused
CD_ENABLED_KAFRA     // Is 1 if a Kafra was hired for this castle, 0 otherwise.
CD_ENABLED_GUARDIAN0 // Is 1 if the 1st guardian is present (Soldier Guardian)
CD_ENABLED_GUARDIAN1 // Is 1 if the 2nd guardian is present (Soldier Guardian)
CD_ENABLED_GUARDIAN2 // Is 1 if the 3rd guardian is present (Soldier Guardian)
CD_ENABLED_GUARDIAN3 // Is 1 if the 4th guardian is present (Archer Guardian)
CD_ENABLED_GUARDIAN4 // Is 1 if the 5th guardian is present (Archer Guardian)
CD_ENABLED_GUARDIAN5 // Is 1 if the 6th guardian is present (Knight Guardian)
CD_ENABLED_GUARDIAN6 // Is 1 if the 7th guardian is present (Knight Guardian)
CD_ENABLED_GUARDIAN7 // Is 1 if the 8th guardian is present (Knight Guardian)
</example_code>
All types of data have their meaning determined by War of Emperium scripts, with exception of:
- CD_GUILD_ID that is always considered ID of the guild that owns the castle,
- CD_CURRENT_DEFENSE that is used in Guardians & Emperium HP calculations,
- CD_ENABLED_GUARDIANX that is always considered to hold guardian presence bits.

<example_code>
// Get guild ID that owns the castle on prontera map
.@guild_id = getcastledata("prontera", CD_GUILD_ID);
if (.@guild_id)
    mes "Castle is owned by guild: " + getguildname(.@guild_id);
else
    mes "This castle is not owned by any guild.";

// Get castle economy and defense
.@economy = getcastledata("aldeg_cas01", CD_CURRENT_ECONOMY);
.@defense = getcastledata("aldeg_cas01", CD_CURRENT_DEFENSE);
mes "Economy: " + .@economy + ", Defense: " + .@defense;

// Set castle data (enable Kafra for the castle)
setcastledata "prontera", CD_ENABLED_KAFRA, 1;

// Invest in economy
.@invested = getcastledata("prontera", CD_INVESTED_ECONOMY);
setcastledata "prontera", CD_INVESTED_ECONOMY, .@invested + 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setcastledata "<map name>",<type of data>,<value>;
</syntax>

<description>
The getcastledata function returns the castle ownership information for the castle referred to by its map name. Castle information is stored in the guild_castle SQL table.

The setcastledata command will behave identically, but instead of returning values for the specified types of accessible data, it will alter them and cause them to be sent to the char-server for storage.

Changing Guild ID or Castle Defense will trigger additional actions, like recalculating guardians' HP.

Types of data correspond to guild_castle table columns:
<example_code>
CD_GUILD_ID          // Guild ID.
CD_CURRENT_ECONOMY   // Castle Economy score.
CD_CURRENT_DEFENSE   // Castle Defense score.
CD_INVESTED_ECONOMY  // Number of times the economy was invested in today.
CD_INVESTED_DEFENSE  // Number of times the defense was invested in today.
CD_NEXT_TIME         // unused
CD_PAY_TIME          // unused
CD_CREATE_TIME       // unused
CD_ENABLED_KAFRA     // Is 1 if a Kafra was hired for this castle, 0 otherwise.
CD_ENABLED_GUARDIAN0 // Is 1 if the 1st guardian is present (Soldier Guardian)
CD_ENABLED_GUARDIAN1 // Is 1 if the 2nd guardian is present (Soldier Guardian)
CD_ENABLED_GUARDIAN2 // Is 1 if the 3rd guardian is present (Soldier Guardian)
CD_ENABLED_GUARDIAN3 // Is 1 if the 4th guardian is present (Archer Guardian)
CD_ENABLED_GUARDIAN4 // Is 1 if the 5th guardian is present (Archer Guardian)
CD_ENABLED_GUARDIAN5 // Is 1 if the 6th guardian is present (Knight Guardian)
CD_ENABLED_GUARDIAN6 // Is 1 if the 7th guardian is present (Knight Guardian)
CD_ENABLED_GUARDIAN7 // Is 1 if the 8th guardian is present (Knight Guardian)
</example_code>
All types of data have their meaning determined by War of Emperium scripts, with exception of:
- CD_GUILD_ID that is always considered ID of the guild that owns the castle,
- CD_CURRENT_DEFENSE that is used in Guardians & Emperium HP calculations,
- CD_ENABLED_GUARDIANX that is always considered to hold guardian presence bits.

<example_code>
// Get guild ID that owns the castle on prontera map
.@guild_id = getcastledata("prontera", CD_GUILD_ID);
if (.@guild_id)
    mes "Castle is owned by guild: " + getguildname(.@guild_id);
else
    mes "This castle is not owned by any guild.";

// Get castle economy and defense
.@economy = getcastledata("aldeg_cas01", CD_CURRENT_ECONOMY);
.@defense = getcastledata("aldeg_cas01", CD_CURRENT_DEFENSE);
mes "Economy: " + .@economy + ", Defense: " + .@defense;

// Set castle data (enable Kafra for the castle)
setcastledata "prontera", CD_ENABLED_KAFRA, 1;

// Invest in economy
.@invested = getcastledata("prontera", CD_INVESTED_ECONOMY);
setcastledata "prontera", CD_INVESTED_ECONOMY, .@invested + 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getgdskilllv(<guild id>,<skill id>)
*getgdskilllv(<guild id>,"<skill name>")
</syntax>

<description>
This function returns the level of the skill <skill id> of the guild <guild id>. If the guild does not have that skill, 0 is returned. If the guild does not exist, -1 is returned.

Refer to db/(pre-)re/skill_db.yml for the full list of skills. (GD_* are guild skills)

<example_code>
// Get guild ID of attached player
.@guild_id = getcharid(2);
if (.@guild_id) {
    // Check guild skill level by ID (GD_EXTENSION = guild extension skill)
    .@skill_lv = getgdskilllv(.@guild_id, 10001);
    mes "Guild Extension level: " + .@skill_lv;

    // Check by skill name
    .@skill_lv = getgdskilllv(.@guild_id, "GD_EXTENSION");
    mes "Guild Extension level (by name): " + .@skill_lv;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*requestguildinfo <guild id>{,"<event label>"};
</syntax>

<description>
This command requests the guild data from the char server and merrily continues with the execution. Whenever the guild information becomes available (which happens instantly if the guild information is already in memory, or later, if it isn't and the map server has to wait for the char server to reply) it will run the specified event as in a donpcevent call.

<example_code>
// Request guild info for guild 10007 with callback event
requestguildinfo 10007, "GuildInfoCallback::OnGuildReady";

// In the callback label:
GuildInfoCallback:
    .@guild_id = 10007;
    mes "Guild Name: " + getguildinfo(.@guild_id, GUILDINFO_NAME);
    mes "Guild Level: " + getguildinfo(.@guild_id, GUILDINFO_LEVEL);
    mes "Member Count: " + getguildinfo(.@guild_id, GUILDINFO_MEMBERCOUNT);
    end;

// Request without event (just preloads data)
requestguildinfo 10007;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getmapguildusers("<map name>",<guild id>)
</syntax>

<description>
Returns the amount of characters from the specified guild on the given map.

<example_code>
mes "You have " + getmapguildusers("prontera", getcharid(2)) + " guild members in Prontera.";
</example_code>
<example_code>
// Check how many guild members are on a PVP map
.@guild_id = getcharid(2);
.@count = getmapguildusers("pvp_room", .@guild_id);
mes "There are " + .@count + " guild members in the PVP room.";

// Check another guild's presence on a map
.@count = getmapguildusers("aldeg_cas01", 10007);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getskilllv(<skill id>)
*getskilllv("<skill name>")
</syntax>

<description>
This function returns the level of the specified skill that the invoking character has. If they don't have the skill, 0 will be returned. The full list of character skills is available in db/(pre-)re/skill_db.yml.

There are two main uses for this function: it can check whether the character has a skill or not, and it can tell you if the level is high enough.

<example_code>
if (getskilllv(152))
    mes "You have got the skill Throw Stone";
else
    mes "You don't have Throw Stone";
close;
</example_code>
<example_code>
if (getskilllv(28) >= 5)
    mes "Your heal lvl is 5 or more";
else if (getskilllv(28) == 10)
    mes "Your heal lvl has been maxed";
else
    mes "Your heal skill is below lvl 5";
close;
</example_code>
<example_code>
// Check by skill name
if (getskilllv("AL_HEAL") >= 5)
    mes "You have Heal level 5 or higher";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getskilllist({<char_id>});
</syntax>

<description>
This command sets a bunch of arrays with a complete list of skills the invoking character has. Here's what you get:

<example_code>
@skilllist_id[]   // skill ids.
@skilllist_lv[]   // skill levels.
@skilllist_flag[] // see skill for the meaning of skill flags.
@skilllist_count  // number of skills in the above arrays.
</example_code>
While getskilllv is probably more useful for most situations, this is the easiest way to store all the skills and make the character something else for a while. Advanced job for a day? This could also be useful to see how many skills a character has.

This command does not count skills which are set as flag 4 (permanent granted) (ALL_BUYING_STORE/ALL_INCCARRY).

<example_code>
// Get and display attached player's skill list
getskilllist;
mes "You have " + @skilllist_count + " skills.";
for (.@i = 0; .@i < @skilllist_count; .@i++) {
    mes "Skill " + (.@i + 1) + ": ID " + @skilllist_id[.@i] + " Level " + @skilllist_lv[.@i];
}

// Get skill list for another character
getskilllist(150001);
.@count = @skilllist_count;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getrandmobid(<type>{,<flag>{,<level>}})
</syntax>

<description>
This command returns a random monster ID from the random monster group. With <flag> you can apply certain restrictions on which monsters of the group can be returned. Returns 0 if one of the parameters is invalid or no monster could be found with the given parameters.

Valid <type> are:

<example_code>
MOBG_BRANCH_OF_DEAD_TREE
MOBG_PORING_BOX
MOBG_BLOODY_DEAD_BRANCH
MOBG_RED_POUCH_OF_SURPRISE
MOBG_CLASSCHANGE
MOBG_TAEKWON_MISSION
</example_code>
Valid <flag> are:

<example_code>
RMF_NONE            // 0x00 - Apply no flags
RMF_DB_RATE         // 0x01 - Apply the summon success chance found in the list (otherwise get any monster from the db)
RMF_CHECK_MOB_LV    // 0x02 - Apply a monster level check
RMF_MOB_NOT_BOSS    // 0x04 - Selected monster should not be a Boss type (default) (except those from MOBG_BLOODY_DEAD_BRANCH)
RMF_MOB_NOT_SPAWN   // 0x08 - Selected monster must have normal spawn
RMF_MOB_NOT_PLANT   // 0x10 - Selected monster should not be a Plant type
RMF_ALL             // 0xFF - Apply all flags
</example_code>
<example_code>
// Get a random monster from Dead Branch group with default flags
.@mob_id = getrandmobid(MOBG_BRANCH_OF_DEAD_TREE);
</example_code>
<example_code>
// Get a random monster with level check and no boss monsters
.@mob_id = getrandmobid(MOBG_BLOODY_DEAD_BRANCH, RMF_CHECK_MOB_LV | RMF_MOB_NOT_BOSS, 50);
</example_code>
<example_code>
// Summon a random monster from Poring Box
.@mob_id = getrandmobid(MOBG_PORING_BOX);
if (.@mob_id)
    monster "prontera", 0, 0, "--ja--", .@mob_id, 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getmonsterinfo(<mob ID>,<type>)
*getmonsterinfo(<mob name>,<type>)
</syntax>

<description>
This function will look up the monster with the specified <mob ID> or <mob name> in the mob database and return the info set by <type> argument. It will return -1 if there is no such monster (or the type value is invalid), or "null" if you requested the monster's name.

Valid types are:

<example_code>
MOB_NAME // monster's japanese name, if there is no such monster "null" is returned
MOB_LV // monster's level
MOB_MAXHP // monster's maximum hp
MOB_BASEEXP // monster's base experience
MOB_JOBEXP // monster's job experience
MOB_ATK1 // monster's atk
MOB_ATK2 // monster's atk2
MOB_DEF // monster's def
MOB_MDEF // monster's mdef
MOB_RES // monster's res
MOB_MRES // monster's mres
MOB_STR // monster's str
MOB_AGI // monster's agi
MOB_VIT // monster's vit
MOB_INT // monster's int
MOB_DEX // monster's dex
MOB_LUK // monster's luk
MOB_RANGE // monster's range
MOB_RANGE2 // monster's range2
MOB_RANGE3 // monster's range3
MOB_SIZE // monster's size
MOB_RACE // monster's race
MOB_ELEMENT // monster's element (doesn't return the element level, only the element ID)
MOB_MODE // monster's mode
MOB_MVPEXP // monster's mvp experience
MOB_ID // monster's ID
</example_code>
For more details, see the sample in doc/sample/getmonsterinfo.txt.

<example_code>
// Get Poring's name
.@name$ = getmonsterinfo(1002, MOB_NAME);
mes "Monster name: " + .@name$;

// Get Poring's level and HP
.@lv = getmonsterinfo(1002, MOB_LV);
.@hp = getmonsterinfo(1002, MOB_MAXHP);
mes "Poring: Level " + .@lv + ", HP " + .@hp;

// Get monster info by name
.@exp = getmonsterinfo("Poring", MOB_BASEEXP);
mes "Poring gives " + .@exp + " base EXP.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getmobdrops(<mob id>)
</syntax>

<description>
This command will find all drops of the specified mob and return the item IDs and drop percentages into arrays of temporary global variables. getmobdrops returns 1 if successful and 0 if the mob ID doesn't exist.

Upon executing this:

<example_code>
$@MobDrop_item[] // is a global temporary number array which contains the item IDs of the monster's drops.

$@MobDrop_rate[] // is a global temporary number array which contains the drop percentages of each item. (1 = .01%)

$@MobDrop_nosteal[] // is a global temporary number array which contains the StealProtected flag of each item. (default false)

$@MobDrop_randomopt[] // is a global temporary number array which contains the random option group ID of each item. (default 0)

$@MobDrop_count // is the number of item drops found.
</example_code>
Be sure to use $@MobDrop_count to go through the arrays, and not getarraysize, because the temporary global arrays are not cleared between runs of getmobdrops. If a mob with 7 item drops is looked up, the arrays would have 7 elements. But if another mob is looked up and it only has 5 item drops, the server will not clear the arrays for you, overwriting the values instead. So in addition to returning the 5 item drops, the 6th and 7th elements from the last call remain, and you will get 5+2 item drops, of which the last 2 don't belong to the new mob. $@MobDrop_count will always contain the correct number (5), unlike getarraysize() which would return 7 in this case.

<example_code>
// get a Mob ID from the user
input .@mob_id;

if (getmobdrops(.@mob_id)) {    // getmobdrops returns 1 on success
    // immediately copy global temporary variables into scope variables,
    // since we don't know when getmobdrops will get called again for
    // another mob, overwriting your global temporary variables
    .@count = $@MobDrop_count;
    copyarray .@item[0], $@MobDrop_item[0], .@count;
    copyarray .@rate[0], $@MobDrop_rate[0], .@count;

    mes getmonsterinfo(.@mob_id, MOB_NAME) + " - " + .@count + " drops found:";
    for (.@i = 0; .@i < .@count; .@i++) {
        mes .@item[.@i] + " (" + getitemname(.@item[.@i]) + ") " + .@rate[.@i]/100 + ((.@rate[.@i]%100 < 10) ? ".0" : ".") + .@rate[.@i]%100 + "%";
    }
} else {
    mes "Unknown monster ID.";
}
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*skillpointcount({<char_id>})
</syntax>

<description>
Returns the total amount of skill points a character possesses (SkillPoint + SP's used in skills). This command can be used to check the currently attached character's total amount of skill points. This means the skill points used in skills are counted, and added to SkillPoints (number of skill points not used). This command does not count skills which are set as flag 4 (permanent granted) (ALL_BUYING_STORE/ALL_INCCARRY).

<example_code>
.@skillPoints = skillpointcount();
mes "You have " + .@skillPoints + " skill points in total!";
</example_code>
<example_code>
if (skillpointcount() > 20)
    mes "Wow, you have more than 20 Skill Points in total!";
</example_code>
<example_code>
// Get skill point count for another character
.@total = skillpointcount(150001);
mes "That character has " + .@total + " total skill points.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getscrate(<effect type>,<base rate>{,<GID>})
</syntax>

<description>
This function will return the chance of a status effect affecting the invoking character, in percent, modified by their current defense against said status. The base rate is the base chance of the status effect being inflicted, in percent.

You can see the full list of available effect types you can possibly inflict in src/map/script_constants.hpp under Eff_.

<example_code>
prontera,150,150,4	script	BlindNPC	111,{
	mes "[Blind NPC]";
	mes "Let's test your luck!";
	next;

	// User's logic: 50% base chance to apply blind
	if (rand(100) > getscrate(Eff_Blind, 50)) {
		goto BlindHimNow;
	} else {
		mes "You were lucky this time!";
		close;
	}

BlindHimNow:
	mes "You have been blinded!";
	// Apply Blind status for 10 seconds (10000ms)
	sc_start SC_BLIND, 10000, 0;
	close;
}
</example_code>
<example_code>
// Calculate actual chance to poison a player with base 30% chance
.@chance = getscrate(Eff_Poison, 30);
mes "Actual poison chance: " + .@chance + "%";

// Check for another character
.@chance = getscrate(Eff_Sleep, 25, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*playerattached()
</syntax>

<description>
Returns the ID of the player currently attached to the script. It will return 0 if no one is attached, or if the attached player no longer exists on the map server. It is wise to check for the attached player in script functions that deal with timers as there's no guarantee the player will still be logged on when the timer triggers. Note that the ID of a player is actually their account ID.

<example_code>
// Check if a player is attached before proceeding
if (!playerattached()) {
    end;
}

// In a timer callback or function
.@aid = playerattached();
if (.@aid) {
    // Player is still online, attach and continue
    attachrid(.@aid);
    mes "Welcome back!";
} else {
    // Player logged out
    end;
}
</example_code>
<example_code>
prontera,150,150,4	script	RewardNPC	111,{
	mes "[Reward NPC]";
	mes "Wait 10 seconds and I will give you a gift!";
	close2;
	
	// Start a timer for 10 seconds (10000ms)
	addtimer 10000, strnpcinfo(3) + "::OnGiveReward";
	end;

OnGiveReward:
	// Check if the player is still online and attached
	.@aid = playerattached();
	if (!.@aid) {
		end;
	}

	// Re-attach the player to the script
	attachrid(.@aid);
	
	// Grant the reward
	getitem 501, 1; // Red Potion
	dispbottom "You received a Red Potion as a reward!";
	end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getattachedrid()
</syntax>

<description>
Returns RID from the running script. The script may not be attached to any RID (like a floating script or function) and will return 0.

<example_code>
// Check if script has an attached RID
if (!getattachedrid()) {
    mes "No player is attached to this script.";
    end;
}
mes "RID: " + getattachedrid();

// In a function that may be called with or without a player
.@rid = getattachedrid();
if (.@rid)
    mes "Player is attached with RID: " + .@rid;
else
    mes "No player attached (floating script).";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*isloggedin(<account id>{,<char id>})
</syntax>

<description>
This function returns 1 if the specified account is logged in and 0 if they aren't. You can also pass the char id to check for both account and char id.

<example_code>
// Check if account ID 2000000 is logged in
if (isloggedin(2000000))
    mes "That account is currently online.";
else
    mes "That account is offline.";

// Check both account and character ID
if (isloggedin(2000000, 150001))
    mes "Both account and character are online and match.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkweight(<item id>,<amount>{,<item id>,<amount>,<item id>,<amount>,...});
*checkweight("<item name>",<amount>{,"<item name>",<amount>,"<item name>",<amount>,...});
*checkweight2(<id_array>,<amount_array>);
</syntax>

<description>
These functions will compute and return 1 if the total weight of the specified number of specific items does not exceed the invoking character's carrying capacity, and 0 otherwise. It is important to see if a player can carry the items you expect to give them, failing to do that may open your script up to abuse or create some very unfair errors.

The functions, in addition to checking to see if the player is capable of holding a set amount of items, also ensure the player has room in their inventory for the item(s) they will be receiving.

The second function (checkweight2) will check an array of items and amounts, and also returns 1 on success and 0 on failure.

Like getitem, this function will also accept an english name from the database as an argument.

<example_code>
if (checkweight(512, 10)) {
    getitem 512, 10;
} else {
    mes "Sorry, you cannot hold this amount of apples!";
}
</example_code>
<example_code>
setarray .@item[0], 512, 513, 514;
setarray .@amount[0], 10, 5, 5;
if (!checkweight2(.@item, .@amount)) {
    mes "Sorry, you cannot hold this amount of fruit!";
}
</example_code>
<example_code>
// Check multiple items with checkweight
if (checkweight(512, 10, 513, 5, 514, 3)) {
    getitem 512, 10;
    getitem 513, 5;
    getitem 514, 3;
} else {
    mes "You cannot carry all these items!";
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*basicskillcheck()
</syntax>

<description>
This function will return the state of the configuration option basic_skill_check in battle_athena.conf. It returns 1 if the option is enabled and 0 if it isn't. If the basic_skill_check option is enabled, which it is by default, characters must have a certain number of basic skill levels to sit, request a trade, use emotions, etc. Making your script behave differently depending on whether the characters must actually have the skill to do all these things might in some cases be required.

<example_code>
if (basicskillcheck()) {
    if (getskilllv("NV_BASIC") >= 1)
        mes "You can perform basic actions.";
    else
        mes "You need Basic Skill level 1 to do that.";
} else {
    mes "Basic skill checking is disabled on this server.";
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkoption(<option number>{,<char_id>})
*checkoption1(<option number>{,<char_id>})
*checkoption2(<option number>{,<char_id>})
*setoption <option number>{,<flag>{,<char_id>}};
</syntax>

<description>
The checkoption series of functions check for a so-called option that is set on the invoking character. Options are used to store status conditions and a lot of other non-permanent character data of the yes-no kind. For most common cases, it is better to use checkcart, checkfalcon, checkriding and other similar functions, but there are some options which you cannot get at this way. They return 1 if the option is set and 0 if the option is not set.

Option numbers valid for the first (option) version of this command are:

0x1       - Sight in effect.
0x2       - Hide in effect.
0x4       - Cloaking in effect.
0x8       - Cart number 1 present.
0x10      - Falcon present.
0x20      - Peco Peco present.
0x40      - GM Perfect Hide in effect.
0x80      - Cart number 2 present.
0x100     - Cart number 3 present.
0x200     - Cart number 4 present.
0x400     - Cart number 5 present.
0x800     - Orc head present.
0x1000    - The character is wearing a wedding sprite.
0x2000    - Ruwach is in effect.
0x4000    - Chasewalk in effect.
0x8000    - Flying or Xmas suit.
0x10000   - Sighttrasher.
0x100000  - Warg present.
0x200000  - The character is riding a warg.

Option numbers valid for the second version (opt1) of this command are:

1 - Petrified.
2 - Frozen.
3 - Stunned.
4 - Sleeping.
6 - Petrifying (the state where you can still walk)

Option numbers valid for the third version (opt2) of this command are:

0x1  - Poisoned.
0x2  - Cursed.
0x4  - Silenced.
0x8  - Signum Crucis (plays a howl-like sound effect, but otherwise no visible effects are displayed)
0x10 - Blinded.
0x80 - Deadly poisoned.

Option numbers (except for opt1) are bit-masks - you can add them up to check for several states, but the functions will return true if at least one of them is in effect.

setoption will set options on the invoking character. There are no second and third versions of this command, so you can only change the values in the first list (cloak, cart, ruwach, etc). If flag is 1 (default when omitted), the option will be added to what the character currently has; if 0, the option is removed.

This is definitely not a complete list of available option flag numbers. Ask a core developer (or read the source: src/map/status.hpp) for the full list.

<example_code>
// Check if character has a cart
if (checkoption(0x8))
    mes "You have a cart!";
</example_code>
<example_code>
// Check if character is poisoned
if (checkoption2(0x1))
    mes "You are poisoned!";
</example_code>
<example_code>
// Check if character is frozen
if (checkoption1(2))
    mes "You are frozen!";
</example_code>
<example_code>
// Add falcon to character
setoption 0x10;
// Remove falcon from character
setoption 0x10, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkoption1(<option number>{,<char_id>})
</syntax>

<description>
The checkoption series of functions check for a so-called option that is set on the invoking character. Options are used to store status conditions and a lot of other non-permanent character data of the yes-no kind. For most common cases, it is better to use checkcart, checkfalcon, checkriding and other similar functions, but there are some options which you cannot get at this way. They return 1 if the option is set and 0 if the option is not set.

Option numbers valid for the first (option) version of this command are:

0x1       - Sight in effect.
0x2       - Hide in effect.
0x4       - Cloaking in effect.
0x8       - Cart number 1 present.
0x10      - Falcon present.
0x20      - Peco Peco present.
0x40      - GM Perfect Hide in effect.
0x80      - Cart number 2 present.
0x100     - Cart number 3 present.
0x200     - Cart number 4 present.
0x400     - Cart number 5 present.
0x800     - Orc head present.
0x1000    - The character is wearing a wedding sprite.
0x2000    - Ruwach is in effect.
0x4000    - Chasewalk in effect.
0x8000    - Flying or Xmas suit.
0x10000   - Sighttrasher.
0x100000  - Warg present.
0x200000  - The character is riding a warg.

Option numbers valid for the second version (opt1) of this command are:

1 - Petrified.
2 - Frozen.
3 - Stunned.
4 - Sleeping.
6 - Petrifying (the state where you can still walk)

Option numbers valid for the third version (opt2) of this command are:

0x1  - Poisoned.
0x2  - Cursed.
0x4  - Silenced.
0x8  - Signum Crucis (plays a howl-like sound effect, but otherwise no visible effects are displayed)
0x10 - Blinded.
0x80 - Deadly poisoned.

Option numbers (except for opt1) are bit-masks - you can add them up to check for several states, but the functions will return true if at least one of them is in effect.

setoption will set options on the invoking character. There are no second and third versions of this command, so you can only change the values in the first list (cloak, cart, ruwach, etc). If flag is 1 (default when omitted), the option will be added to what the character currently has; if 0, the option is removed.

This is definitely not a complete list of available option flag numbers. Ask a core developer (or read the source: src/map/status.hpp) for the full list.

<example_code>
// Check if character has a cart
if (checkoption(0x8))
    mes "You have a cart!";
</example_code>
<example_code>
// Check if character is poisoned
if (checkoption2(0x1))
    mes "You are poisoned!";
</example_code>
<example_code>
// Check if character is frozen
if (checkoption1(2))
    mes "You are frozen!";
</example_code>
<example_code>
// Add falcon to character
setoption 0x10;
// Remove falcon from character
setoption 0x10, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkoption2(<option number>{,<char_id>})
</syntax>

<description>
The checkoption series of functions check for a so-called option that is set on the invoking character. Options are used to store status conditions and a lot of other non-permanent character data of the yes-no kind. For most common cases, it is better to use checkcart, checkfalcon, checkriding and other similar functions, but there are some options which you cannot get at this way. They return 1 if the option is set and 0 if the option is not set.

Option numbers valid for the first (option) version of this command are:

0x1       - Sight in effect.
0x2       - Hide in effect.
0x4       - Cloaking in effect.
0x8       - Cart number 1 present.
0x10      - Falcon present.
0x20      - Peco Peco present.
0x40      - GM Perfect Hide in effect.
0x80      - Cart number 2 present.
0x100     - Cart number 3 present.
0x200     - Cart number 4 present.
0x400     - Cart number 5 present.
0x800     - Orc head present.
0x1000    - The character is wearing a wedding sprite.
0x2000    - Ruwach is in effect.
0x4000    - Chasewalk in effect.
0x8000    - Flying or Xmas suit.
0x10000   - Sighttrasher.
0x100000  - Warg present.
0x200000  - The character is riding a warg.

Option numbers valid for the second version (opt1) of this command are:

1 - Petrified.
2 - Frozen.
3 - Stunned.
4 - Sleeping.
6 - Petrifying (the state where you can still walk)

Option numbers valid for the third version (opt2) of this command are:

0x1  - Poisoned.
0x2  - Cursed.
0x4  - Silenced.
0x8  - Signum Crucis (plays a howl-like sound effect, but otherwise no visible effects are displayed)
0x10 - Blinded.
0x80 - Deadly poisoned.

Option numbers (except for opt1) are bit-masks - you can add them up to check for several states, but the functions will return true if at least one of them is in effect.

setoption will set options on the invoking character. There are no second and third versions of this command, so you can only change the values in the first list (cloak, cart, ruwach, etc). If flag is 1 (default when omitted), the option will be added to what the character currently has; if 0, the option is removed.

This is definitely not a complete list of available option flag numbers. Ask a core developer (or read the source: src/map/status.hpp) for the full list.

<example_code>
// Check if character has a cart
if (checkoption(0x8))
    mes "You have a cart!";
</example_code>
<example_code>
// Check if character is poisoned
if (checkoption2(0x1))
    mes "You are poisoned!";
</example_code>
<example_code>
// Check if character is frozen
if (checkoption1(2))
    mes "You are frozen!";
</example_code>
<example_code>
// Add falcon to character
setoption 0x10;
// Remove falcon from character
setoption 0x10, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setoption <option number>{,<flag>{,<char_id>}};
*checkoption(<option number>{,<char_id>})
*checkoption1(<option number>{,<char_id>})
*checkoption2(<option number>{,<char_id>})
</syntax>

<description>
The checkoption series of functions check for a so-called option that is set on the invoking character. Options are used to store status conditions and a lot of other non-permanent character data of the yes-no kind. For most common cases, it is better to use checkcart, checkfalcon, checkriding and other similar functions, but there are some options which you cannot get at this way. They return 1 if the option is set and 0 if the option is not set.

Option numbers valid for the first (option) version of this command are:

0x1       - Sight in effect.
0x2       - Hide in effect.
0x4       - Cloaking in effect.
0x8       - Cart number 1 present.
0x10      - Falcon present.
0x20      - Peco Peco present.
0x40      - GM Perfect Hide in effect.
0x80      - Cart number 2 present.
0x100     - Cart number 3 present.
0x200     - Cart number 4 present.
0x400     - Cart number 5 present.
0x800     - Orc head present.
0x1000    - The character is wearing a wedding sprite.
0x2000    - Ruwach is in effect.
0x4000    - Chasewalk in effect.
0x8000    - Flying or Xmas suit.
0x10000   - Sighttrasher.
0x100000  - Warg present.
0x200000  - The character is riding a warg.

Option numbers valid for the second version (opt1) of this command are:

1 - Petrified.
2 - Frozen.
3 - Stunned.
4 - Sleeping.
6 - Petrifying (the state where you can still walk)

Option numbers valid for the third version (opt2) of this command are:

0x1  - Poisoned.
0x2  - Cursed.
0x4  - Silenced.
0x8  - Signum Crucis (plays a howl-like sound effect, but otherwise no visible effects are displayed)
0x10 - Blinded.
0x80 - Deadly poisoned.

Option numbers (except for opt1) are bit-masks - you can add them up to check for several states, but the functions will return true if at least one of them is in effect.

setoption will set options on the invoking character. There are no second and third versions of this command, so you can only change the values in the first list (cloak, cart, ruwach, etc). If flag is 1 (default when omitted), the option will be added to what the character currently has; if 0, the option is removed.

This is definitely not a complete list of available option flag numbers. Ask a core developer (or read the source: src/map/status.hpp) for the full list.

<example_code>
// Check if character has a cart
if (checkoption(0x8))
    mes "You have a cart!";
</example_code>
<example_code>
// Check if character is poisoned
if (checkoption2(0x1))
    mes "You are poisoned!";
</example_code>
<example_code>
// Check if character is frozen
if (checkoption1(2))
    mes "You are frozen!";
</example_code>
<example_code>
// Add falcon to character
setoption 0x10;
// Remove falcon from character
setoption 0x10, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setcart {<type>{,<char_id>}};
*checkcart({<char_id>});
</syntax>

<description>
If <type> is 0, this command will remove the cart from the character. Otherwise, it gives the invoking character a cart. The cart given will be cart number <type> and will work regardless of whether the character is a merchant class or not.

Note: the character needs to have the skill MC_PUSHCART to gain a cart.

The accompanying function checkcart will return 1 if the invoking character has a cart (any kind of cart) and 0 if they don't.

<example_code>
if (checkcart())
    mes "But you already have a cart!";
</example_code>
<example_code>
// Give the character a cart (type 1)
setcart 1;

// Give a specific cart type (type 3)
setcart 3;

// Remove the character's cart
setcart 0;

// Check another character's cart
if (checkcart(150001))
    mes "That character has a cart.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkcart({<char_id>});
*setcart {<type>{,<char_id>}};
</syntax>

<description>
If <type> is 0, this command will remove the cart from the character. Otherwise, it gives the invoking character a cart. The cart given will be cart number <type> and will work regardless of whether the character is a merchant class or not.

Note: the character needs to have the skill MC_PUSHCART to gain a cart.

The accompanying function checkcart will return 1 if the invoking character has a cart (any kind of cart) and 0 if they don't.

<example_code>
if (checkcart())
    mes "But you already have a cart!";
</example_code>
<example_code>
// Give the character a cart (type 1)
setcart 1;

// Give a specific cart type (type 3)
setcart 3;

// Remove the character's cart
setcart 0;

// Check another character's cart
if (checkcart(150001))
    mes "That character has a cart.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setfalcon {<flag>{,<char_id>}};
*checkfalcon({<char_id>});
</syntax>

<description>
If <flag> is 0, this command will remove the falcon from the character. Otherwise, it gives the invoking character a falcon. The falcon will be there regardless of whether the character is a hunter or not. It will (probably) not have any useful effects for non-hunters though.

Note: the character needs to have the skill HT_FALCON to gain a falcon.

The accompanying function checkfalcon will return 1 if the invoking character has a falcon and 0 if they don't.

<example_code>
if (checkfalcon())
    mes "But you already have a falcon!";
</example_code>
<example_code>
// Give the character a falcon
setfalcon 1;

// Remove the character's falcon
setfalcon 0;

// Check another character's falcon
if (checkfalcon(150001))
    mes "That character has a falcon.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkfalcon({<char_id>});
*setfalcon {<flag>{,<char_id>}};
</syntax>

<description>
If <flag> is 0, this command will remove the falcon from the character. Otherwise, it gives the invoking character a falcon. The falcon will be there regardless of whether the character is a hunter or not. It will (probably) not have any useful effects for non-hunters though.

Note: the character needs to have the skill HT_FALCON to gain a falcon.

The accompanying function checkfalcon will return 1 if the invoking character has a falcon and 0 if they don't.

<example_code>
if (checkfalcon())
    mes "But you already have a falcon!";
</example_code>
<example_code>
// Give the character a falcon
setfalcon 1;

// Remove the character's falcon
setfalcon 0;

// Check another character's falcon
if (checkfalcon(150001))
    mes "That character has a falcon.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setriding {<flag>{,<char_id>}};
*checkriding({<char_id>});
</syntax>

<description>
If <flag> is 0, this command will remove the mount from the character. Otherwise, it gives the invoking character a PecoPeco (if they are a Knight series class), a GrandPeco (if they are a Crusader series class), or a Gryphon (if they are a Royal Guard). Unlike setfalcon and setcart, this will not work at all if they aren't of a class which can ride.

Note: the character needs to have the skill KN_RIDING to gain a mount.

The accompanying function checkriding will return 1 if the invoking character is riding a bird and 0 if they aren't.

<example_code>
if (checkriding())
    mes "PLEASE leave your bird outside! No riding birds on the floor here!";
</example_code>
<example_code>
// Give the character a mount (if class allows)
setriding 1;

// Remove the character's mount
setriding 0;

// Check another character's mount
if (checkriding(150001))
    mes "That character is riding a mount.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkriding({<char_id>});
*setriding {<flag>{,<char_id>}};
</syntax>

<description>
If <flag> is 0, this command will remove the mount from the character. Otherwise, it gives the invoking character a PecoPeco (if they are a Knight series class), a GrandPeco (if they are a Crusader series class), or a Gryphon (if they are a Royal Guard). Unlike setfalcon and setcart, this will not work at all if they aren't of a class which can ride.

Note: the character needs to have the skill KN_RIDING to gain a mount.

The accompanying function checkriding will return 1 if the invoking character is riding a bird and 0 if they aren't.

<example_code>
if (checkriding())
    mes "PLEASE leave your bird outside! No riding birds on the floor here!";
</example_code>
<example_code>
// Give the character a mount (if class allows)
setriding 1;

// Remove the character's mount
setriding 0;

// Check another character's mount
if (checkriding(150001))
    mes "That character is riding a mount.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setdragon {<color>{,<char_id>}};
*checkdragon({<char_id>});
</syntax>

<description>
The setdragon function toggles mounting a dragon for the invoking character. It will return 1 if successful, 0 otherwise.

The available colors are:
1 - Green Dragon (default)
2 - Brown Dragon
3 - Gray Dragon
4 - Blue Dragon
5 - Red Dragon

Note: the character must be a Rune Knight and have the skill RK_DRAGONTRAINING to gain a mount.

The accompanying function checkdragon will return 1 if the invoking character is riding a dragon and 0 if they aren't.

<example_code>
// Mount a green dragon (color 1)
setdragon;

// Mount a red dragon
setdragon 5;

// Remove the dragon mount
setdragon 0;

// Check if character is riding a dragon
if (checkdragon())
    mes "You are riding a dragon!";
else
    mes "You are not riding a dragon.";

// Check another character's dragon mount
if (checkdragon(150001))
    mes "That character is riding a dragon.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkdragon({<char_id>});
*setdragon {<color>{,<char_id>}};
</syntax>

<description>
The setdragon function toggles mounting a dragon for the invoking character. It will return 1 if successful, 0 otherwise.

The available colors are:
1 - Green Dragon (default)
2 - Brown Dragon
3 - Gray Dragon
4 - Blue Dragon
5 - Red Dragon

Note: the character must be a Rune Knight and have the skill RK_DRAGONTRAINING to gain a mount.

The accompanying function checkdragon will return 1 if the invoking character is riding a dragon and 0 if they aren't.

<example_code>
// Mount a green dragon (color 1)
setdragon;

// Mount a red dragon
setdragon 5;

// Remove the dragon mount
setdragon 0;

// Check if character is riding a dragon
if (checkdragon())
    mes "You are riding a dragon!";
else
    mes "You are not riding a dragon.";

// Check another character's dragon mount
if (checkdragon(150001))
    mes "That character is riding a dragon.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setmadogear {<flag>{,<type>{,<char_id>}}};
*checkmadogear({<char_id>});
</syntax>

<description>
If <flag> is false, this command will remove the mount from the character. Otherwise, it gives the invoking character a Mado (if they are a Mechanic and have the skill NC_MADOLICENCE).

When using client version PACKETVER_MAIN_NUM >= 20191120 or PACKETVER_RE_NUM >= 20191106, the <type> flag can be used to specify a specific madogear.

Types:
MADO_ROBOT (default)
MADO_SUIT

The accompanying function checkmadogear will return 1 if the invoking character has a Mado and 0 if they don't.

<example_code>
// Give the character a Mado (type ROBOT)
setmadogear 1;

// Give a Mado SUIT instead
setmadogear 1, MADO_SUIT;

// Remove the Mado
setmadogear 0;

// Check if character has a Mado
if (checkmadogear())
    mes "You are in a Mado!";
else
    mes "You are not in a Mado.";

// Check another character's Mado
if (checkmadogear(150001))
    mes "That character has a Mado.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkmadogear({<char_id>});
*setmadogear {<flag>{,<type>{,<char_id>}}};
</syntax>

<description>
If <flag> is false, this command will remove the mount from the character. Otherwise, it gives the invoking character a Mado (if they are a Mechanic and have the skill NC_MADOLICENCE).

When using client version PACKETVER_MAIN_NUM >= 20191120 or PACKETVER_RE_NUM >= 20191106, the <type> flag can be used to specify a specific madogear.

Types:
MADO_ROBOT (default)
MADO_SUIT

The accompanying function checkmadogear will return 1 if the invoking character has a Mado and 0 if they don't.

<example_code>
// Give the character a Mado (type ROBOT)
setmadogear 1;

// Give a Mado SUIT instead
setmadogear 1, MADO_SUIT;

// Remove the Mado
setmadogear 0;

// Check if character has a Mado
if (checkmadogear())
    mes "You are in a Mado!";
else
    mes "You are not in a Mado.";

// Check another character's Mado
if (checkmadogear(150001))
    mes "That character has a Mado.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setmounting {<char_id>};
*ismounting({<char_id>});
</syntax>

<description>
The setmounting function toggles cash mount for the invoking character. It will return 1 if successful, 0 otherwise.

Note: Character must not be mounting a non-cash mount (eg. dragon, peco, wug, etc.)

The accompanying function ismounting will return 1 if the invoking character has a cash mount and 0 if they don't.

<example_code>
// Toggle cash mount for attached player
setmounting;

// Toggle cash mount for another character
setmounting(150001);

// Check if attached player has a cash mount
if (ismounting())
    mes "You are using a cash mount!";
else
    mes "You are not using a cash mount.";

// Check another character's cash mount
if (ismounting(150001))
    mes "That character has a cash mount.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*ismounting({<char_id>});
*setmounting {<char_id>};
</syntax>

<description>
The setmounting function toggles cash mount for the invoking character. It will return 1 if successful, 0 otherwise.

Note: Character must not be mounting a non-cash mount (eg. dragon, peco, wug, etc.)

The accompanying function ismounting will return 1 if the invoking character has a cash mount and 0 if they don't.

<example_code>
// Toggle cash mount for attached player
setmounting;

// Toggle cash mount for another character
setmounting(150001);

// Check if attached player has a cash mount
if (ismounting())
    mes "You are using a cash mount!";
else
    mes "You are not using a cash mount.";

// Check another character's cash mount
if (ismounting(150001))
    mes "That character has a cash mount.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkwug({<char_id>})
</syntax>

<description>
This function will return 1 if the invoking character has a warg and 0 if they don't.

<example_code>
if (checkwug())
    mes "You have a warg!";
else
    mes "You do not have a warg.";
</example_code>
<example_code>
// Check another character's warg
if (checkwug(150001))
    mes "That character has a warg.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkvending({"<Player Name>"})
</syntax>

<description>
Checks if the player is vending or has a buying store. Additionally, it gives you information about whether the player uses autotrade or not. Name is optional, and defaults to the attached player if omitted.

The returned value is a bitmask of:
0 = doesn't have a vending or buying store (which also means he can't use autotrade)
1 = normal vending
2 = using @autotrade
4 = has a buying store

<example_code>
// This will check Aaron's state
.@state = checkvending("Aaron");
if (.@state & 1)
    mes "Aaron is currently vending!";
if (.@state & 4)
    mes "Aaron has a buying store!";
if (.@state & 2)
    mes "Aaron is autotrading!";
</example_code>
<example_code>
// Check attached player's vending state
.@state = checkvending();
if (.@state)
    mes "You are currently using a shop feature.";
else
    mes "You have no vending or buying store active.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkchatting({"<Player Name>"})
</syntax>

<description>
Checks if the player is in a chatroom. Name is optional, and defaults to the attached player if omitted. Returns 1 if they are in a chat room, 0 if they are not.

<example_code>
// This will check if the attached player is in a chat room or not
if (checkchatting())
    mes "You are currently in a chat room!";
</example_code>
<example_code>
// Check another player
if (checkchatting("Aaron"))
    mes "Aaron is in a chat room.";
else
    mes "Aaron is not in a chat room.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkidle({"<Player Name>"})
</syntax>

<description>
Returns the time, in seconds, that the specified player has been idle. Name is optional, and defaults to the attached player if omitted.

<example_code>
// Check attached player's idle time
.@idle = checkidle();
mes "You have been idle for " + .@idle + " seconds.";

// Check another player's idle time
.@idle = checkidle("Aaron");
if (.@idle > 300)
    mes "Aaron has been idle for over 5 minutes!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkidlehom({"<Player Name>"})
</syntax>

<description>
Returns the time, in seconds, that the specified player has been idle for homunculus item/exp share. Name is optional, and defaults to the attached player if omitted.

This will only work if hom_idle_no_share and idletime_hom_option are enabled (see conf/battle/homunc.conf).

<example_code>
// Check attached player's homunculus idle time
.@idle = checkidlehom();
mes "Your homunculus has been idle for " + .@idle + " seconds.";

// Check another player's homunculus idle time
.@idle = checkidlehom("Aaron");
if (.@idle > 60)
    mes "Aaron's homunculus has been idle for over a minute.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkidlemer({"<Player Name>"})
</syntax>

<description>
Returns the time, in seconds, that the specified player has been idle for mercenary item share. Name is optional, and defaults to the attached player if omitted.

This will only work if mer_idle_no_share and idletime_mer_option are enabled (see conf/battle/drops.conf).

<example_code>
// Check attached player's mercenary idle time
.@idle = checkidlemer();
mes "Your mercenary has been idle for " + .@idle + " seconds.";

// Check another player's mercenary idle time
.@idle = checkidlemer("Aaron");
if (.@idle > 120)
    mes "Aaron's mercenary has been idle for over 2 minutes.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*agitcheck()
*agitcheck2()
*agitcheck3()
</syntax>

<description>
These functions will let you check whether the server is currently in WoE:FE mode (agitcheck()), WoE:SE mode (agitcheck2()), or WoE:TE mode (agitcheck3()) and will return true if War of Emperium is on and false if it isn't.

<example_code>
if (agitcheck())
    mes "War of Emperium (FE) is currently active!";
else if (agitcheck2())
    mes "War of Emperium (SE) is currently active!";
else if (agitcheck3())
    mes "War of Emperium (TE) is currently active!";
else
    mes "No War of Emperium is active at this time.";
</example_code>
<example_code>
// Grant special access only during WoE
if (agitcheck() || agitcheck2() || agitcheck3()) {
    mes "Welcome, defender! Special WoE services available.";
} else {
    mes "Come back during War of Emperium.";
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*agitcheck2()
</syntax>

<description>
These functions will let you check whether the server is currently in WoE:FE mode (agitcheck()), WoE:SE mode (agitcheck2()), or WoE:TE mode (agitcheck3()) and will return true if War of Emperium is on and false if it isn't.

<example_code>
if (agitcheck())
    mes "War of Emperium (FE) is currently active!";
else if (agitcheck2())
    mes "War of Emperium (SE) is currently active!";
else if (agitcheck3())
    mes "War of Emperium (TE) is currently active!";
else
    mes "No War of Emperium is active at this time.";
</example_code>
<example_code>
// Grant special access only during WoE
if (agitcheck() || agitcheck2() || agitcheck3()) {
    mes "Welcome, defender! Special WoE services available.";
} else {
    mes "Come back during War of Emperium.";
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*agitcheck3()
</syntax>

<description>
These functions will let you check whether the server is currently in WoE:FE mode (agitcheck()), WoE:SE mode (agitcheck2()), or WoE:TE mode (agitcheck3()) and will return true if War of Emperium is on and false if it isn't.

<example_code>
if (agitcheck())
    mes "War of Emperium (FE) is currently active!";
else if (agitcheck2())
    mes "War of Emperium (SE) is currently active!";
else if (agitcheck3())
    mes "War of Emperium (TE) is currently active!";
else
    mes "No War of Emperium is active at this time.";
</example_code>
<example_code>
// Grant special access only during WoE
if (agitcheck() || agitcheck2() || agitcheck3()) {
    mes "Welcome, defender! Special WoE services available.";
} else {
    mes "Come back during War of Emperium.";
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*isnight()
*isday()
</syntax>

<description>
These functions will return 1 or 0 depending on whether the server is in night mode or day mode. isnight returns 1 if it's night and 0 if it isn't, isday returns 1 if it's day and 0 if it isn't. They can be used interchangeably, pick the one you like more.

<example_code>
// These two are equivalent
if (isday())
    mes "I only prowl in the night.";
if (isnight() != 1)
    mes "I only prowl in the night.";
</example_code>
<example_code>
if (isnight())
    mes "The moon is out. Beware of monsters!";
else
    mes "The sun is shining. A beautiful day!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*isday()
*isnight()
</syntax>

<description>
These functions will return 1 or 0 depending on whether the server is in night mode or day mode. isnight returns 1 if it's night and 0 if it isn't, isday returns 1 if it's day and 0 if it isn't. They can be used interchangeably, pick the one you like more.

<example_code>
// These two are equivalent
if (isday())
    mes "I only prowl in the night.";
if (isnight() != 1)
    mes "I only prowl in the night.";
</example_code>
<example_code>
if (isnight())
    mes "The moon is out. Beware of monsters!";
else
    mes "The sun is shining. A beautiful day!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkre(<type>)
</syntax>

<description>
Checks if a renewal feature is enabled or not in renewal.hpp, and returns 1 if enabled and 0 for disabled.

The renewal feature to check is determined by the number <type>:
0 - RENEWAL enabled (game renewal server mode)
1 - RENEWAL_CAST (renewal cast time)
2 - RENEWAL_DROP (renewal drop rate algorithms)
3 - RENEWAL_EXP (renewal exp rate algorithms)
4 - RENEWAL_LVDMG (renewal level modifier on damage)
5 - RENEWAL_ASPD (renewal ASPD)

<example_code>
// Check if server is in renewal mode
if (checkre(0))
    mes "This is a Renewal server.";
else
    mes "This is a Pre-Renewal server.";

// Check if renewal ASPD is enabled
if (checkre(5))
    mes "Renewal ASPD formulas are in use.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*isequipped(<id>{,<id>{,..}})
</syntax>

<description>
This function will return 1 if the invoking character has all of the item IDs given equipped (if item/card IDs are passed, then it checks if the items/cards are inserted into slots in the equipment they are currently wearing). Theoretically there is no limit to the number of items that may be tested for at the same time. If even one of the items given is not equipped, 0 will be returned.

The function was meant for item scripts to support the cards released by Gravity in February 2005, but it will work just fine in normal NPC scripts.

<example_code>
// (Poring, Santa Poring, Poporing, Marin)
if (isequipped(4001, 4005, 4033, 4196))
    mes "Wow! You're wearing a full complement of possible poring cards!";
</example_code>
<example_code>
// (Poring)
if (isequipped(4001))
    mes "A poring card is useful, don't you think?";
</example_code>
<example_code>
// Check if character has multiple specific cards equipped
if (isequipped(4001, 4023))
    mes "You have both Poring and Fabre cards equipped!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*isequippedcnt(<id>{,<id>{,..}})
</syntax>

<description>
This function is similar to isequipped, but instead of returning 1 or 0, it will return the amount of items/cards equipped that were found on the invoking character from the given list.

<example_code>
if (isequippedcnt(4001, 4005, 4033, 4196) == 4)
    mes "Finally got all 4 cards from poring monster types?";
</example_code>
<example_code>
// Count how many of the listed cards are equipped
.@count = isequippedcnt(4001, 4023, 4045, 4067);
mes "You have " + .@count + " out of 4 specified cards equipped.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkequipedcard(<item id>)
</syntax>

<description>
This function will return 1 if the item/card specified by its item ID number is inserted into any equipment they have in their inventory, currently equipped or not.

<example_code>
// Check if player has a Poring card inserted in any of their equipment
if (checkequipedcard(4001))
    mes "You have a Poring card inserted in some piece of equipment!";
else
    mes "You don't have any Poring card inserted in your gear.";
</example_code>
<example_code>
// Check multiple cards
if (checkequipedcard(4001) && checkequipedcard(4023))
    mes "You have both Poring and Fabre cards inserted somewhere.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*attachrid(<account ID>{,<force>})
*detachrid;
</syntax>

<description>
These commands allow the manipulation of the script's currently attached player. While attachrid allows attaching a different player by using their account ID for the parameter RID, detachrid makes the following commands run as if the script was never invoked by a player.

The command returns false if the player cannot be attached (if the account is offline or does not exist), and true upon success.

By default the command is executed with force, which causes it to attach the player even if they are currently attached to another script. Since this is not always the desired behavior, you can also specify false to the command and it will only return true if the player is online and was not attached to another script.

<example_code>
// Attach to another player by account ID (force mode, default)
if (attachrid(2000000)) {
    mes "You have been attached to account 2000000!";
    detachrid;
}
</example_code>
<example_code>
// Attach only if player is not attached to another script
if (attachrid(2000000, false)) {
    mes "Successfully attached to offline player.";
} else {
    mes "Player is offline or attached to another script.";
}
</example_code>
<example_code>
// Detach the current player
detachrid;
mes "No player is now attached to this script.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*detachrid;
*attachrid(<account ID>{,<force>})
</syntax>

<description>
These commands allow the manipulation of the script's currently attached player. While attachrid allows attaching a different player by using their account ID for the parameter RID, detachrid makes the following commands run as if the script was never invoked by a player.

The command returns false if the player cannot be attached (if the account is offline or does not exist), and true upon success.

By default the command is executed with force, which causes it to attach the player even if they are currently attached to another script. Since this is not always the desired behavior, you can also specify false to the command and it will only return true if the player is online and was not attached to another script.

<example_code>
// Attach to another player by account ID (force mode, default)
if (attachrid(2000000)) {
    mes "You have been attached to account 2000000!";
    detachrid;
}
</example_code>
<example_code>
// Attach only if player is not attached to another script
if (attachrid(2000000, false)) {
    mes "Successfully attached to offline player.";
} else {
    mes "Player is offline or attached to another script.";
}
</example_code>
<example_code>
// Detach the current player
detachrid;
mes "No player is now attached to this script.";
</example_code>
</description>
---------------------- Breakline ----------------------


---------------------- Breakline ----------------------








`;