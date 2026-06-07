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
<syntax>
*addrid(<type>{,<flag>{,<parameters>}});
</syntax>

<description>
This command will attach other RIDs to the current script without detaching the invoking RID. It returns 1 if successful and 0 upon failure.

<type> determines what RIDs are attached:
0: All players in the server.
1: All players in the map of the invoking player, or the invoking NPC if no player is attached.
2: Party members of a specified party ID. [Parameters: <party id>]
3: Guild members of a specified guild ID. [Parameters: <guild id>]
4: All players in a specified area of the map of the invoking player (or NPC). [Parameters: <x0>,<y0>,<x1>,<y1>]
5: All players in the map. [Parameters: "<map name>"]
6: Battleground members of a specified battleground ID. [Parameters: <battleground id>]
7: Clan members of a specified clan ID. [Parameters: <clan id>]
Account ID: If type is an account ID, attach the specified account ID.

<flag> can prevent certain players from being attached:
0: Players are always attached. (default)
1: Players currently running another script will not be attached.

<example_code>
// Attach all players on the server
addrid(0);
mes "Message to all players online!";
</example_code>
<example_code>
// Attach all party members of the attached player's party
.@party_id = getcharid(1);
addrid(2, 0, .@party_id);
mes "Hello, party members!";
</example_code>
<example_code>
// Attach all guild members
.@guild_id = getcharid(2);
addrid(3, 0, .@guild_id);
mes "Greetings, guild mates!";
</example_code>
<example_code>
// Attach all players in a specific area
addrid(4, 0, 150, 100, 170, 120);
mes "Welcome to this building!";
</example_code>
<example_code>
// Attach all players on a specific map
addrid(5, 0, "prontera");
mes "Hello, Prontera residents!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*rid2name(<rid>)
</syntax>

<description>
Converts RID to name. Note: The player/monster/NPC must be online/enabled. Useful for PCKillEvent where you can convert killedrid to the name of the player.

Note: rid2name may not produce correct character names since RID = account ID. It will return the current online character of the account only.

<example_code>
// In a PCKillEvent label:
OnPCKillEvent:
    .@killer_name$ = rid2name(killerrid);
    .@victim_name$ = rid2name(killedrid);
    announce .@killer_name$ + " has defeated " + .@victim_name$ + "!", 0;
    end;
</example_code>
<example_code>
// Convert an account ID to the current character name
.@name$ = rid2name(2000000);
if (.@name$ != "")
    mes "Account 2000000 is currently playing as: " + .@name$;
else
    mes "That account is offline.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*message "<character name>","<message>";
</syntax>

<description>
This command will send a message to the chat window of the character specified by name. The text will also appear above the head of that character. It will not be seen by anyone else.

<example_code>
message "Daniel Jackson", "Hello there!";
</example_code>
<example_code>
// Send a private message to the attached player
.@name$ = strcharinfo(0);
message .@name$, "This is a private message just for you.";
</example_code>
<example_code>
// Send a message to another character by name
message "Aaron", "Please come to the town hall.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*dispbottom "<message>"{,<color>{,<char_id>}};
</syntax>

<description>
This command will send the given message with color into the invoking character's chat window. The color format is in RGB (0xRRGGBB). The color is green by default.

<example_code>
// Send a normal message (green)
dispbottom "Your quest has been updated!";
</example_code>
<example_code>
// Send a red message
dispbottom "Warning: You are in a dangerous area!", 0xFF0000;
</example_code>
<example_code>
// Send a blue message to another character
dispbottom "You have received a gift!", 0x0000FF, 150001;
</example_code>
<example_code>
// Send a yellow message
dispbottom "Quest completed!", 0xFFFF00;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*showscript "<message>"{,<GID>, <flag>};
</syntax>

<description>
Makes the attached player or GID say a message like shouting a skill name. The message will be seen by everyone around but not in the chat window.

flag: Specify target
AREA - Message is sent to players in the vicinity of the source (default).
SELF - Message is sent only to the attached player.

<example_code>
// Make attached player shout a message in area
showscript "Prepare for battle!";
</example_code>
<example_code>
// Make attached player shout a message only to themselves
showscript "You feel a strange power!", SELF;
</example_code>
<example_code>
// Make a specific NPC (by GID) shout a messages
showscript "I am the guardian of this place!", 100001, AREA;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*warp "<map name>",<x>,<y>{,<char id>};

<from mapname>,<fromX>,<fromY>,<facing>%TAB%warp%TAB%<warp name>%TAB%<spanx>,<spany>,<to mapname>,<toX>,<toY>
</syntax>

<description>
This command will take the invoking character or <char id>, if specified, to the specified map, and if wanted, specified coordinates too, but these can be random.

If your X and Y coordinates land on an unwalkable map square, it will send the warped character to a random place. Same will happen if they are both zero.

There are also three special map names you can use:

- "Random" will warp the player randomly on the current map.
- "Save" and "SavePoint" will warp the player back to their save point.

<example_code>
warp "place", 50, 55;
// Takes them to X 50 Y 55 on the map called "place"
</example_code>
<example_code>
warp "place", 0, 0;
// Warps to a random spot on "place" (since 0,0 is unwalkable)
</example_code>
<example_code>
warp "Random", 0, 0;
// Warps the player randomly on the current map
</example_code>
<example_code>
warp "SavePoint", 0, 0;
// Warps the player back to their save point
</example_code>
<example_code>
// Warp another character by ID
warp "prontera", 150, 180, 150001;
</example_code>
Or a warp portal

<example_code>
// A warp portal from Prontera to Payon.
// Players entering the 3x3 area at prontera (150, 150) will be warped to payon (100, 100).
prontera,150,150,0  warp    WarpToPayon 1,1,payon,100,100

// Another warp portal from Payon back to Prontera.
payon,103,103,0 warp    WarpToProntera  1,1,prontera,153,153
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*areawarp "<from map name>",<x1>,<y1>,<x2>,<y2>,"<to map name>",<x3>,<y3>{,<x4>,<y4>};
</syntax>

<description>
This command is similar to warp, however, it will not refer to the invoking character, but instead, all characters within a specified area, defined by the x1/y1-x2/y2 square, will be warped. Nobody outside the area will be affected, including the activating character, if they are outside the area.

Using 0,0 as the destination coordinates will take all characters in the affected area to a random set of coordinates on the destination map.

Using the optional x4 and y4 parameters, the destination coordinates will be a random place within the defined x3/y3-x4/y4 square.

Like warp, areawarp will also explicitly warp characters randomly into the current map if you give the to map name as "Random".

<example_code>
areawarp "place", 10, 10, 120, 120, "place2", 150, 150;
// Everyone in the area between X10 Y10 and X120 Y120 on "place" will be warped to "place2" at X150 Y150
</example_code>
<example_code>
areawarp "place", 10, 10, 120, 120, "place2", 0, 0;
// Same area, but warped to random coordinates on "place2"
</example_code>
<example_code>
areawarp "place", 10, 10, 120, 120, "place2", 150, 150, 200, 200;
// Same area, warped to random coordinates within X150-Y150 to X200-Y200 on "place2"
</example_code>
<example_code>
areawarp "place", 10, 10, 120, 120, "Random", 0, 0;
// Warps all players in the area to random spots on the same map
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*warpparty "<to_mapname>",<x>,<y>,<party_id>,{"<from_mapname>",<range x>,<range y>};
</syntax>

<description>
Warps a party to the specified map and coordinate given the party ID, which you can get with getcharid(1). You can also request another party ID given a member's name with getcharid(1,<player_name>).

You can use the following map names for special warping behavior:

- Random: All party members are randomly warped in their current map (as if they all used a fly wing)
- SavePointAll: All party members are warped to their respective save point.
- SavePoint: All party members are warped to the save point of the currently attached player (will fail if there's no player attached).
- Leader: All party members are warped to the leader's position. The leader must be online and in the current map-server for this to work.
- RandomAll: All party members are warped to the same random position in their current map

If you specify a from_mapname, warpparty will only affect those on that map.

The <range x> and <range y> optional values allow for a randomization of the player's warp point. The values will randomly add or subtract from the given <x> and <y> coordinates.

<example_code>
mes "[Party Warper]";
mes "Here you go!";
close2;
.@party_id = getcharid(1);
warpparty "prontera", 150, 100, .@party_id;
close;
</example_code>
<example_code>
// Warp party to random spots on current map
warpparty "Random", 0, 0, .@party_id;
</example_code>
<example_code>
// Warp party to leader's position
warpparty "Leader", 0, 0, .@party_id;
</example_code>
<example_code>
// Warp only party members on "prontera" to "payon" with range randomization
warpparty "payon", 100, 100, .@party_id, "prontera", 5, 5;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*warpguild "<map name>",<x>,<y>,<guild_id>;
</syntax>

<description>
Warps a guild to the specified map and coordinate given the guild ID, which you can get with getcharid(2). You can also request another guild ID given a member's name with getcharid(2,<player_name>).

You can use the following map names for special warping behavior:

- Random: All guild members are randomly warped in their current map (as if they all used a fly wing)
- SavePointAll: All guild members are warped to their respective save point.
- SavePoint: All guild members are warped to the save point of the currently attached player (will fail if there's no player attached).

<example_code>
warpguild "prontera", 150, 100, .@guild_id;
</example_code>
<example_code>
// Warp guild members to random spots on their current map
warpguild "Random", 0, 0, .@guild_id;
</example_code>
<example_code>
// Warp guild members to their individual save points
warpguild "SavePointAll", 0, 0, .@guild_id;
</example_code>
<example_code>
// Warp guild members to attached player's save point
warpguild "SavePoint", 0, 0, .@guild_id;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*warppartner("<map name>",<x>,<y>);
</syntax>

<description>
This function will find the invoking character's marriage partner, if any, and warp them to the map and coordinates given. It will return 1 upon success and 0 if the partner is not online, the character is not married, or if there's no invoking character (no RID). 0,0 will, as usual, normally translate to random coordinates.

<example_code>
// Warp partner to attached player's location
if (warppartner(strcharinfo(3), 0, 0))
    mes "Your partner has been summoned to your location!";
else
    mes "Your partner is offline or you are not married.";
</example_code>
<example_code>
// Warp partner to a specific location
if (warppartner("prontera", 150, 100))
    mes "Your partner has been warped to Prontera!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*savepoint "<map name>",<x>,<y>{,{<range x>,<range y>,}<char_id>};

*save "<map name>",<x>,<y>{,{<range x>,<range y>,}<char_id>};
</syntax>

<description>
These commands save where the invoking character will return to upon clicking "Return to Save Point", after death and in some other cases. The two versions are equivalent. They ignore any and all mapflags, and can make a character respawn where no teleportation is otherwise possible.

The <range x> and <range y> optional values allow for a randomization with the player's save point. The values will randomly add or subtract from the given <x> and <y> coordinates.

<example_code>
savepoint "place", 350, 75;
</example_code>
<example_code>
savepoint "place", 350, 75, 2, 2;
// Randomly saves the character between 348,73 and 352,77
</example_code>
<example_code>
// Save another character's save point
savepoint "prontera", 150, 100, 150001;
</example_code>
<example_code>
save "prontera", 155, 180;
// Equivalent to savepoint command
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*save "<map name>",<x>,<y>{,{<range x>,<range y>,}<char_id>};

*savepoint "<map name>",<x>,<y>{,{<range x>,<range y>,}<char_id>};
</syntax>

<description>
These commands save where the invoking character will return to upon clicking "Return to Save Point", after death and in some other cases. The two versions are equivalent. They ignore any and all mapflags, and can make a character respawn where no teleportation is otherwise possible.

The <range x> and <range y> optional values allow for a randomization with the player's save point. The values will randomly add or subtract from the given <x> and <y> coordinates.

<example_code>
savepoint "place", 350, 75;
</example_code>
<example_code>
savepoint "place", 350, 75, 2, 2;
// Randomly saves the character between 348,73 and 352,77
</example_code>
<example_code>
// Save another character's save point
savepoint "prontera", 150, 100, 150001;
</example_code>
<example_code>
save "prontera", 155, 180;
// Equivalent to savepoint command
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*heal <hp>,<sp>{,<char_id>};
</syntax>

<description>
This command will heal a set amount of HP and/or SP on the invoking character.

This command just alters the hit points and spell points of the invoking character and produces no other output whatsoever.

<example_code>
heal 30000, 0; // This will heal 30,000 HP
</example_code>
<example_code>
heal 0, 30000; // This will heal 30,000 SP
</example_code>
<example_code>
heal 300, 300; // This will heal 300 HP and 300 SP
</example_code>
<example_code>
// Heal another character
heal 1000, 500, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*healap <ap>{,<char_id>};
</syntax>

<description>
This command will heal a set amount of AP (Activity Points) on the invoking character.

This command just alters the activity points of the invoking character and produces no other output whatsoever.

<example_code>
healap 10;  // This will give 10 AP
</example_code>
<example_code>
healap -10; // This will remove 10 AP
</example_code>
<example_code>
// Heal AP for another character
healap 5, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*itemheal <hp>,<sp>{,<char_id>};
</syntax>

<description>
This command heals relative amounts of HP and/or SP on the invoking character. Unlike heal, this command is intended for use in item scripts. It applies potion-related bonuses, such as alchemist ranking, cards, and status changes. When used inside an NPC script, certain bonuses are omitted.

The command also applies a SP/VIT-related bonus:
heal = heal * [(100 + STATUS*2) / 100]

<example_code>
// If the player has 50 vit and no bonuses, this will heal
// anything from 200 to 300 HP and 5 SP
itemheal rand(100, 150), 5;
</example_code>
<example_code>
// Heal another character
itemheal 50, 10, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*percentheal <hp>,<sp>{,<char_id>};
</syntax>

<description>
This command will heal the invoking character. It heals the character, but not by a set value - it adds a percentage of their maximum HP/SP.

So the amount that this will heal will depend on the total amount of HP or SP you have maximum. Like heal, this will not call up any animations or effects.

<example_code>
percentheal 100, 0; // This will heal 100% HP
</example_code>
<example_code>
percentheal 0, 100; // This will heal 100% SP
</example_code>
<example_code>
percentheal 50, 50; // This will heal 50% HP and 50% SP
</example_code>
<example_code>
// Heal another character by 25% HP and 25% SP
percentheal 25, 25, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*recovery <type>{,<option>,<revive_flag>{,<map name>}};
</syntax>

<description>
This command will revive and fully restore the HP/SP of the selected characters. It returns 1 upon successful use.

<type> is the target, and determines the <option> parameter:
0: Player  -> Character ID number
1: Party   -> Party ID number
2: Guild   -> Guild ID number
3: Map     -> Map name (a string)
4: All     -> None (takes <revive_flag> as option)

If no option is specified, the invoking player's character ID, party ID, guild ID, or map will be used.

<revive_flag> determines the action:
1: Revive and heal all players (default)
2: Heal living players only
4: Revive dead players only

<map name> can optionally be used to define a single map to execute the command on for types 1 (party) and 2 (guild).

<example_code>
// Only revive characters in invoking party on map "morocc"
recovery 1, getcharid(1), 4, "morocc";
</example_code>
<example_code>
// Fully heal (don't revive) all members of invoking character's guild
recovery 2, getcharid(2), 2;
</example_code>
<example_code>
// Revive and fully heal everyone in map "prontera"
recovery 3, "prontera";
</example_code>
<example_code>
// Only revive all dead characters on server
recovery 4, 4;
</example_code>
<example_code>
// Revive and heal a specific player by character ID
recovery 0, 150001, 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*jobchange <job number>{,<upper flag>,<char_id>};
</syntax>

<description>
This command will change the job class of the invoking character.

This command works with numbers, but you can also use job names. The full list of job names and the numbers they correspond to can be found in src/map/script_constants.hpp.

<upper flag> can alternatively be used to specify the type of job one changes to:
-1 (or when omitted): preserves the current job type.
0: Normal/standard classes
1: High/Advanced classes
2: Baby classes

This command will also set a permanent character-based variable jobchange_level which will contain the job level at the time right before changing jobs, which can be checked for later in scripts.

<example_code>
jobchange 1; // This would change your player into a Swordman
</example_code>
<example_code>
jobchange 4002; // This would change your player into a Swordman High
</example_code>
<example_code>
jobchange Job_Swordman; // This would change your player into a Swordman
</example_code>
<example_code>
jobchange Job_Swordman_High; // This would change your player into a Swordman High
</example_code>
<example_code>
jobchange Job_Swordman, 1; // Changes to high swordsman
</example_code>
<example_code>
jobchange Job_Swordman, 2; // Changes to baby swordsman
</example_code>
<example_code>
// Change another character's job
jobchange Job_Knight, 0, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*jobname(<job number>)
</syntax>

<description>
This command retrieves the name of the given job using the map_msg entries 550->655.

<example_code>
mes "[Kid]";
mes "I never thought I'd meet a " + jobname(Class) + " here of all places.";
close;
</example_code>
<example_code>
// Display the name of job ID 1 (Swordman)
mes "Job ID 1 is: " + jobname(1);
</example_code>
<example_code>
// Get the name of another character's job
.@job_name$ = jobname(Class, 150001);
</example_code>
<example_code>
.@job_name$ = jobname(Class);

if (.@job_name$ == "Swordman") {
    mes "You are a brave Swordman!";
} else {
    mes "You are a " + .@job_name$ + ".";
}
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*eaclass({<job number>,<char_id>})
</syntax>

<description>
This command returns the "eA job-number" corresponding to the given class, and uses the invoking player's class if none is given. The eA job-number is also a class number system, but it's one that comes with constants which make it easy to convert among classes. The command will return -1 if you pass it a job number which doesn't have an eA job-number equivalent.

For more information on the eA Job System, see the docs/ea_job_system.txt file.

<example_code>
.@eac = eaclass();
if ((.@eac & EAJ_BASEMASK) == EAJ_SWORDMAN)
    mes "Your base job is Swordman.";
if (.@eac & EAJL_UPPER)
    mes "You are a rebirth job.";
if ((.@eac & EAJ_UPPERMASK) == EAJ_SWORDMAN)
    mes "You must be a Swordman, Baby Swordman or High Swordman.";
</example_code>
<example_code>
// Get eA job-number for a specific job
.@eac = eaclass(Job_Knight);

// Check if the job is a Knight class
if ((.@eac & EAJ_BASEMASK) == EAJ_KNIGHT) {
    mes "You are a Knight class.";
}

// Check if it is a rebirth job
if (.@eac & EAJL_UPPER) {
    mes "You are a rebirth job.";
}

close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*roclass(<job number>{,<gender>})
</syntax>

<description>
Does the opposite of eaclass. That is, given an eA job-number, it returns the corresponding RO class number. A gender is required because both Bard and Dancer share the same eA job-number (EAJ_BARDDANCER), and uses the invoking player's gender if none is given (if no player is attached, male will be used by default). The command will return -1 if there is no valid class to represent the specified job (for example, if you try to get the baby version of a Taekwon class).

<example_code>
.@eac = eaclass();
// Check if class is already rebirth
if (.@eac & EAJL_UPPER) {
    mes "You look strong.";
    close;
}
.@eac = roclass(.@eac | EAJL_UPPER);
// Check if class has a rebirth version
if (.@eac != -1) {
    mes "Bet you can't wait to become a " + jobname(.@eac) + "!";
    close;
}
</example_code>
<example_code>
// Get RO class number for Bard (male) or Dancer (female)
.@bard_class = roclass(EAJ_BARDDANCER, SEX_MALE);
.@dancer_class = roclass(EAJ_BARDDANCER, SEX_FEMALE);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*changebase <job ID number>{,<account ID>};
</syntax>

<description>
This command will change a character's appearance to that of the specified job class. Nothing but appearance will change.

The command will run for the invoking character unless an account ID is given.

<example_code>
changebase Job_Novice; // Changes player to Novice sprite.
</example_code>
<example_code>
changebase Class; // Changes player back to default sprite.
</example_code>
<example_code>
// Change another character's appearance to Swordman
changebase Job_Swordman, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*classchange(<view id>{,"<NPC name>","<flag>"});
</syntax>

<description>
This command is very ancient, its origins are clouded in mystery. It will send a display id change packet to everyone in the immediate area of the NPC object, which will supposedly make the NPC look like a different sprite, an NPC sprite ID, or a monster ID. This effect is not stored anywhere and will not persist (which is odd, because it would be relatively easy to make it do so) and most importantly, will not work at all since this command was broken with the introduction of advanced classes. The code is written with the assumption that the lowest sprite IDs are the job sprites and anything beyond them are monster and NPC sprites, but since the advanced classes rolled in, they got ID numbers on the other end of the number pool where monster sprites float.

As a result, it is currently impossible to call this command with a valid view ID. It will do nothing whatsoever if the view ID is below 4047. Getting it to run will actually just crash the client.

It could be a real gem if it can be gotten to actually do what it's supposed to do, but this will only happen in a later SVN revision.

Empty <NPC name> means attached NPC.

Target for <flag>:
- bc_area : Sprite is sent to players in the vicinity of the source (default value).
- bc_self : Sprite is sent only to the attached player.

<example_code>
// Change attached NPC's appearance (currently likely broken)
classchange(1001); // Attempts to change to Poring sprite
</example_code>
<example_code>
// Change a specific NPC's appearance (currently likely broken)
classchange(1001, "MyNPC", bc_area);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*changesex({<char_id>});
</syntax>

<description>
This command will change the gender for the attached character's account. If it was male, it will become female; if it was female, it will become male. The change will be written to the character server, the player will receive the message: "Need disconnection to perform change-sex request..." and the player will be immediately kicked to the login screen. When they log back in, they will be the opposite sex.

If there are any Dancer/Gypsy or Bard/Clown characters on the account, they will also have their skills reset upon changesex.

<example_code>
// Change attached player's gender
changesex;
</example_code>
<example_code>
// Change another character's gender
changesex(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*changecharsex({<char_id>});
</syntax>

<description>
This command will change the gender of the attached character. If it was male, it will become female; if it was female, it will become male. The change will be written to the character server, the player will receive the message: "Need disconnection to perform change-sex request..." and the player will be immediately kicked to the login screen. When they log back in, they will be the opposite sex.

If the character being changed is a Dancer/Gypsy or Bard/Clown class type, the character will also have their skills reset upon changecharsex.

<example_code>
// Change attached player's gender
changecharsex;
</example_code>
<example_code>
// changecharsex via charID of invoking player of this NPC
.@char_id = getcharid(0);

// OR

// changecharsex via charID to targetname
.@char_id = getcharid(0, .@char_name$);

changecharsex(.@char_id);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getexp <base_exp>,<job_exp>{,<char_id>};
</syntax>

<description>
This command will give the invoking character a specified number of base and job experience points. Used for a quest reward. Negative values won't work.

The EXP values are adjusted by the quest_exp_rate config value, VIP bonus, Guild Tax, and EXP boost items such as Battle Manual, Bubble Gum, or items that have SC_EXPBOOST or SC_ITEMBOOST.

<example_code>
getexp 10000, 5000;
</example_code>
<example_code>
// Give 50,000 base EXP and 25,000 job EXP
getexp 50000, 25000;
</example_code>
<example_code>
// Give EXP to another character
getexp 100000, 50000, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getexp2 <base_exp>,<job_exp>{,<char_id>};
</syntax>

<description>
This command is a safe version of set for BaseExp and JobExp. If using set while the BaseExp or JobExp value is more than 2,147,483,647 (INT_MAX), it will cause an overflow error.

Unlike getexp, this command ignores all adjustment factors (quest_exp_rate, VIP bonus, Guild Tax, EXP boost items, etc.)!

<example_code>
// Give exactly 1,000,000 base EXP and 500,000 job EXP (no adjustments)
getexp2 1000000, 500000;
</example_code>
<example_code>
// Give EXP to another character without any rate modifications
getexp2 500000, 250000, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getbaseexp_ratio(<percent>{,<base_level>{,<char_id>}});
</syntax>

<description>
Returns the amount of base experience representing the given <percent> of the required base experience at <base_level>. If no base level is specified, the base level of the attached character will be used.

<example_code>
// Get 10% of the EXP needed for attached player's next base level
.@exp = getbaseexp_ratio(10);
mes "10% of your next level's EXP is: " + .@exp;

// Get 50% of the EXP needed for base level 99
.@exp = getbaseexp_ratio(50, 99);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getjobexp_ratio(<percent>{,<job_level>{,<char_id>}});
</syntax>

<description>
Returns the amount of job experience representing the given <percent> of the required job experience at <job_level>. If no job level is specified, the job level of the attached character will be used.

<example_code>
// Get 10% of the EXP needed for attached player's next job level
.@exp = getjobexp_ratio(10);
mes "10% of your next job level's EXP is: " + .@exp;

// Get 50% of the EXP needed for job level 50
.@exp = getjobexp_ratio(50, 50);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setlook <look type>,<look value>{,<char_id>};

*changelook <look type>,<look value>{,<char_id>};
</syntax>

<description>
setlook will alter the look data for the invoking character. It is used mainly for changing the palette used on hair and clothes: you specify which look type you want to change, then the palette you want to use. Make sure you specify a palette number that exists/is usable by the client you use.

changelook works the same, but is only client side (it doesn't save the look value).

Here are the possible look types:

<example_code>
LOOK_BASE // Base sprite
LOOK_HAIR // Hairstyle
LOOK_WEAPON // Weapon
LOOK_HEAD_BOTTOM // Head bottom
LOOK_HEAD_TOP // Head top
LOOK_HEAD_MID // Head mid
LOOK_HAIR_COLOR // Hair color
LOOK_CLOTHES_COLOR // Clothes color
LOOK_SHIELD // Shield
LOOK_SHOES // Shoes
LOOK_BODY2 // Body style
</example_code>
Whatever shoes means is anyone's guess, ask Gravity - the client does nothing with this value. It still wants it from the server though, so it is kept, but normally doesn't do a thing.

Only the look data for hairstyle, hair color and clothes color are saved to the char server's database and will persist. Body style will also persist if save_body_style configuration is enabled in conf/battle/client.conf. The rest freely change as the character puts on and removes equipment, changes maps, logs in and out and otherwise you should not expect to set them. In fact, messing with them is generally hazardous, do it at your own risk - it won't cause database corruption and probably won't cause a server crash, but it's easy to crash the client with just about anything unusual.

However, it might be an easy way to quickly check for empty view IDs for sprites, which is essential for making custom headgear.

Since a lot of people have different palettes for hair and clothes, it's impossible to tell you what all the color numbers are. If you want a serious example, there is a Stylist script inside the default rAthena installation that you can look at: npc/custom/stylist.txt

<example_code>
// This will change your hair color to palette 8
setlook LOOK_HAIR_COLOR, 8;
</example_code>
<example_code>
// This will change your clothes color to palette 1
setlook LOOK_CLOTHES_COLOR, 1;
</example_code>
<example_code>
// Change hairstyle
setlook LOOK_HAIR, 10;
</example_code>
<example_code>
// Change another character's hair color (client-side only with changelook)
changelook LOOK_HAIR_COLOR, 5, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*changelook <look type>,<look value>{,<char_id>};

*setlook <look type>,<look value>{,<char_id>};
</syntax>

<description>
setlook will alter the look data for the invoking character. It is used mainly for changing the palette used on hair and clothes: you specify which look type you want to change, then the palette you want to use. Make sure you specify a palette number that exists/is usable by the client you use.

changelook works the same, but is only client side (it doesn't save the look value).

Here are the possible look types:

<example_code>
LOOK_BASE // Base sprite
LOOK_HAIR // Hairstyle
LOOK_WEAPON // Weapon
LOOK_HEAD_BOTTOM // Head bottom
LOOK_HEAD_TOP // Head top
LOOK_HEAD_MID // Head mid
LOOK_HAIR_COLOR // Hair color
LOOK_CLOTHES_COLOR // Clothes color
LOOK_SHIELD // Shield
LOOK_SHOES // Shoes
LOOK_BODY2 // Body style
</example_code>
Whatever shoes means is anyone's guess, ask Gravity - the client does nothing with this value. It still wants it from the server though, so it is kept, but normally doesn't do a thing.

Only the look data for hairstyle, hair color and clothes color are saved to the char server's database and will persist. Body style will also persist if save_body_style configuration is enabled in conf/battle/client.conf. The rest freely change as the character puts on and removes equipment, changes maps, logs in and out and otherwise you should not expect to set them. In fact, messing with them is generally hazardous, do it at your own risk - it won't cause database corruption and probably won't cause a server crash, but it's easy to crash the client with just about anything unusual.

However, it might be an easy way to quickly check for empty view IDs for sprites, which is essential for making custom headgear.

Since a lot of people have different palettes for hair and clothes, it's impossible to tell you what all the color numbers are. If you want a serious example, there is a Stylist script inside the default rAthena installation that you can look at: npc/custom/stylist.txt

<example_code>
// This will change your hair color to palette 8
setlook LOOK_HAIR_COLOR, 8;
</example_code>
<example_code>
// This will change your clothes color to palette 1
setlook LOOK_CLOTHES_COLOR, 1;
</example_code>
<example_code>
// Change hairstyle
setlook LOOK_HAIR, 10;
</example_code>
<example_code>
// Change another character's hair color (client-side only with changelook)
changelook LOOK_HAIR_COLOR, 5, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*pushpc <direction>,<cells>;
</syntax>

<description>
This command will push the currently attached player in the given direction by the given amount of square cells. Direction is the same as used when declaring NPCs, and can be specified by using one of the DIR_* constants (src/map/script_constants.hpp).

The knock-back is not restricted by items or map flags, only obstacles are taken into account. If there is not enough space to perform the push (e.g. due to a wall), the character is pushed only up to the obstacle.

<example_code>
// Pushes the character 5 cells in 3 o'clock direction from its current position
pushpc DIR_EAST, 5;
</example_code>
<example_code>
// Push north 3 cells
pushpc DIR_NORTH, 3;
</example_code>
<example_code>
// Push south-west 2 cells
pushpc DIR_SOUTHWEST, 2;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*kick({<char_id>});
</syntax>

<description>
This command kicks the attached character (or character provided by <char_id>) from the map server, just like @kick.

<example_code>
// Kick the attached player
kick;
</example_code>
<example_code>
// Kick another character by ID
kick(150001);
</example_code>
<example_code>
// Kick a player by name (get char_id first)
.@char_id = getcharid(0, "OffendingPlayer");
if (.@char_id)
    kick(.@char_id);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*recalculatestat;
</syntax>

<description>
This command will force a stat recalculation for the attached player.

<example_code>
// Force stat recalculation after changing equipment or bonuses
recalculatestat;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*needed_status_point(<type>,<val>{,<char id>});
</syntax>

<description>
Returns the number of stat points needed to change the specified stat <type> by <val>. If <val> is negative, returns the number of stat points that would be needed to raise the specified stat from (current value - <val>) to the current value.

<example_code>
// How many stat points to increase STR by 5
.@points = needed_status_point(bStr, 5);
mes "Increasing STR by 5 will cost " + .@points + " status points.";

// How many stat points were needed to get current VIT from (current - 3) to current
.@points = needed_status_point(bVit, -3);
mes "Your last 3 points of VIT cost " + .@points + " status points.";

// Check for another character
.@points = needed_status_point(bAgi, 10, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*jobcanentermap("<mapname>"{,<JobID>});
</syntax>

<description>
Returns true if the player (determined by job) can enter the map, false otherwise.

For optional JobID, see constants of Job_*, or use player's Class, BaseJob, and BaseClass. If no player is attached, this parameter must have a value.

See also db/[pre-]re/job_noenter_map.txt.

<example_code>
// Check if attached player can enter prontera
if (jobcanentermap("prontera"))
    mes "You are allowed to enter this map.";
else
    mes "Your job cannot enter this map.";
</example_code>
<example_code>
// Check if a specific job can enter a map
if (jobcanentermap("pvp_room", Job_Swordman))
    mes "Swordmen can enter the PVP room.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*get_revision()
</syntax>

<description>
This command will return the SVN/Git revision number that the server is currently running on.

<example_code>
if (get_revision() >= 15000)
    mes "Welcome to rAthena!";
</example_code>
<example_code>
mes "Server revision: " + get_revision();
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*get_githash()
</syntax>

<description>
This command will return the Git hash that the server is currently running on.

<example_code>
mes "Welcome to rAthena! Git Hash: " + get_githash();
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitem <item id>,<amount>{,<account ID>};

*getitem "<item name>",<amount>{,<account ID>};
</syntax>

<description>
This command will give an amount of specified items to the invoking character. If an optional account ID is specified, and the target character is currently online, items will be created in their inventory instead. If they are not online, nothing will happen.

In the first and most commonly used version of this command, items are referred to by their database ID number found inside db/item_db.yml.

This transaction is logged if the log script generated transactions option is enabled.

You may also create an item by its name in the english name field in the item database.

This is used in pretty much all NPC scripts that have to do with items and quite a few item scripts. For more examples check just about any official script.

<example_code>
getitem 502, 10; // The person will receive 10 apples
</example_code>
<example_code>
getitem 617, 1; // The person will receive 1 Old Violet Box
</example_code>
<example_code>
getitem "Red_Potion", 10; // Creates 10 Red Potions
</example_code>
<example_code>
// Give items to another character by account ID
getitem 512, 5, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitem2 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};

*getitem2 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};
</syntax>

<description>
This command is functionally identical to getitem, but you can specify more details about the item such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it.

Parameters:
- item id / item name: The item to create
- amount: Number of items to create
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20, usually +0 to +10 or higher)
- attribute: 0 = normal item, 1 = broken item (also known as damaged/overheated)
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

These card slots can also store special values:
- For item forging: CARD0_FORGE, CARD0_CREATE
- For pet eggs: CARD0_PET
- For named items: Character ID of the crafter

If an optional account ID is specified, and the target character is currently online, items will be created in their inventory instead. If they are not online, nothing will happen.

<example_code>
// Give a +7 Two-Handed Sword (ID 2104) identified, not broken, with no cards
getitem2 2104, 1, 1, 7, 0, 0, 0, 0, 0;
</example_code>
<example_code>
// Give an unidentified, +5, broken Padded Armor
getitem2 "PADDED_ARMOR", 1, 0, 5, 1, 0, 0, 0, 0;
</example_code>
<example_code>
// Give a weapon with a Poring Card (4001) inserted
getitem2 1201, 1, 1, 0, 0, 4001, 0, 0, 0;
</example_code>
<example_code>
// Give a named item (inscribed with character ID 150001)
getitem2 512, 1, 1, 0, 0, 150001, 0, 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitem3 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};

*getitem3 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};
</syntax>

<description>
This command is an extended version of getitem2 that also supports random options. In addition to all the features of getitem2, you can specify up to 5 random option groups to be attached to the item.

'getitem3' is advance version of 'getitem2' that also use Item Random Option as additional values.
<RandomIDArray>    : Array variable of ID for item random option, see db/[pre-]re/item_randomopt_db.yml
<RandomValueArray> : Array variable of item random option's value.
<RandomParamArray> : Array variable of item random option's param.

Each random option group corresponds to an entry in the option_info.yml database. The arrays should be declared with at least 5 elements, where the first element (index 0) corresponds to the first random option, index 1 to the second, etc. Unused slots should be set to 0.

If an optional account ID is specified, and the target character is currently online, items will be created in their inventory instead. If they are not online, nothing will happen.

<example_code>
// Set up random options
setarray .@option_group[0], 1, 2, 3, 0, 0;
setarray .@option_value[0], 10, 5, 3, 0, 0;
setarray .@option_param[0], 0, 0, 0, 0, 0;

// Give a weapon with random options
getitem3 1201, 1, 1, 0, 0, 0, 0, 0, 0, .@option_group, .@option_value, .@option_param;
</example_code>
<example_code>
// Give a named item with random options to another character
setarray .@opt_group[0], 4, 0, 0, 0, 0;
setarray .@opt_val[0], 15, 0, 0, 0, 0;
setarray .@opt_param[0], 0, 0, 0, 0, 0;
getitem3 "Sword", 1, 1, 5, 0, 150001, 0, 0, 0, .@opt_group, .@opt_val, .@opt_param, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitem4 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};

*getitem4 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};
</syntax>

<description>
This command is an extended version of getitem3 that also supports an enchant grade. In addition to all the features of getitem3, you can specify a grade value for the item.

'getitem4' is advance version of 'getitem3' that also use the grade as additional values.
Valid grades are:
ENCHANTGRADE_NONE       - No grade
ENCHANTGRADE_D          - Grade D
ENCHANTGRADE_C          - Grade C
ENCHANTGRADE_B          - Grade B
ENCHANTGRADE_A          - Grade A

If an optional account ID is specified, and the target character is currently online, items will be created in their inventory instead. If they are not online, nothing will happen.

<example_code>
// +9 Crimson Dagger with Ghost property
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;
getitem4 28705, 1, 1, 9, 0, 0, 0, 0, 0, ENCHANTGRADE_NONE, .@OptID, .@OptVal, .@OptParam;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitembound <item id>,<amount>,<bound type>{,<account ID>};

*getitembound "<item name>",<amount>,<bound type>{,<account ID>};
</syntax>

<description>
This command behaves identically to getitem, but the items created will be bound to the target character as specified by the bound type. All items created in this manner cannot be dropped, sold, vended, auctioned, or mailed, and in some cases cannot be traded or stored.

Valid bound types are:
Bound_Account : Account Bound item
Bound_Guild   : Guild Bound item
Bound_Party   : Party Bound item
Bound_Char    : Character Bound item

<example_code>
// Give a character-bound Apple (cannot trade or drop)
getitembound 512, 10, Bound_Char;

// Give an account-bound Red Potion (bound to account, tradable between characters on same account)
getitembound "Red_Potion", 5, Bound_Account;

// Give a guild-bound item to another character
getitembound 617, 1, Bound_Guild, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitembound2 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<bound type>{,<account ID>};

*getitembound2 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<bound type>{,<account ID>};
</syntax>

<description>
This command behaves identically to getitem2, but the items created will be bound to the target character as specified by the bound type. All items created in this manner cannot be dropped, sold, vended, auctioned, or mailed, and in some cases cannot be traded or stored.

For a list of bound types see getitembound.

<example_code>
// Create a +7 character-bound Sword with no cards
getitembound2 1201, 1, 1, 7, 0, 0, 0, 0, 0, Bound_Char;
</example_code>
<example_code>
// Create a named item with account-bound
getitembound2 512, 1, 1, 0, 0, 254, 0, 12345, 67890, Bound_Account;
</example_code>
<example_code>
// Create an identified, +5, broken character-bound Padded Armor with a Poring card
getitembound2 "PADDED_ARMOR", 1, 1, 5, 1, 4001, 0, 0, 0, Bound_Char;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitembound3 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<bound type>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};

*getitembound3 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<bound type>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};
</syntax>

<description>
This command behaves identically to getitem3, but the items created will be bound to the target character as specified by the bound type. All items created in this manner cannot be dropped, sold, vended, auctioned, or mailed, and in some cases cannot be traded or stored.

For a list of bound types see getitembound.

getitembound3 is an advanced version of getitembound2 that also uses Item Random Option as additional values.
- RandomIDArray: Array variable of ID for item random option, see db/[pre-]re/item_randomopt_db.yml
- RandomValueArray: Array variable of item random option's value
- RandomParamArray: Array variable of item random option's param

<example_code>
// Set up random options
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Create a character-bound +9 Crimson Dagger with Ghost property
getitembound3 28705, 1, 1, 9, 0, 0, 0, 0, 0, Bound_Char, .@OptID, .@OptVal, .@OptParam;
</example_code>
<example_code>
// Create a named account-bound item with random options
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;
getitembound3 1201, 1, 1, 7, 0, 254, 0, 12345, 67890, Bound_Account, .@OptID, .@OptVal, .@OptParam;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getitembound4 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<bound type>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};

*getitembound4 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<bound type>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};
</syntax>

<description>
This command behaves identically to getitem4, but the items created will be bound to the target character as specified by the bound type. All items created in this manner cannot be dropped, sold, vended, auctioned, or mailed, and in some cases cannot be traded or stored.

For a list of bound types see getitembound.

getitembound4 is an advanced version of getitembound3 that also uses grade as an additional value.

Valid grades are:
ENCHANTGRADE_NONE - No grade
ENCHANTGRADE_D    - Grade D
ENCHANTGRADE_C    - Grade C
ENCHANTGRADE_B    - Grade B
ENCHANTGRADE_A    - Grade A

<example_code>
// Set up random options
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Create a grade 3 character-bound +9 Crimson Dagger with Ghost property
getitembound4 28705, 1, 1, 9, 0, 0, 0, 0, 0, Bound_Char, 3, .@OptID, .@OptVal, .@OptParam;
</example_code>
<example_code>
// Create a grade 2 account-bound named item with random options
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;
getitembound4 1201, 1, 1, 7, 0, 254, 0, 12345, 67890, Bound_Account, 2, .@OptID, .@OptVal, .@OptParam;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getnameditem <item id>,<character name|character ID>;

*getnameditem "<item name>",<character name|character ID>;
</syntax>

<description>
Creates an item signed with the given character's name.

The command returns 1 when the item is created successfully, or 0 if it fails. Failure occurs when:
- There is no player attached.
- Item name or ID is not valid.
- The given character ID/name is offline.

<example_code>
// This will give the currently attached player an Aaron's Apple (if Aaron is online)
getnameditem "Apple", "Aaron";
</example_code>
<example_code>
// Self-explanatory
if (getnameditem("Apple", "Aaron")) {
    mes "You now have an Aaron's Apple!";
}
</example_code>
<example_code>
// Using character ID
getnameditem 512, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*rentitem <item id>,<time>{,<account_id>};

*rentitem "<item name>",<time>{,<account_id>};
</syntax>

<description>
Creates a rental item in the attached character's inventory. The item will expire in <time> seconds and be automatically deleted. When receiving a rental item, the character will receive a message in their chat window. The character will also receive warning messages in their chat window before the item disappears.

When rentals expire, it will call the UnEquipScript of the item. This can be used for special cases such as removing a status change or resetting a variable or state of the player.

This command cannot be used to rent stackable items. Rental items cannot be dropped, traded, or placed in guild storage (i.e. trade mask 67).

Note: delitem in an NPC script can still remove rental items.

Note: countitem will not count any item with a rental timer. Use rentalcountitem instead.

<example_code>
// Rent a Sword to the attached player for 3600 seconds (1 hour)
rentitem 1201, 3600;
</example_code>
<example_code>
// Rent a Poring Hat for 86400 seconds (24 hours)
rentitem "PORING_HAT", 86400;
</example_code>
<example_code>
// Rent an item to another character for 300 seconds (5 minutes)
rentitem 512, 300, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*rentitem2 <item id>,<time>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account_id>};

*rentitem2 "<item name>",<time>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account_id>};
</syntax>

<description>
This command behaves identically to rentitem, but allows you to specify additional details about the item such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it.

Parameters:
- time: Duration in seconds until the item expires
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20, usually +0 to +10 or higher)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

Rental items cannot be dropped, traded, or placed in guild storage.

Note: delitem in an NPC script can still remove rental items.

Note: countitem will not count any item with a rental timer. Use rentalcountitem instead.

<example_code>
// Rent a +7 Sword for 3600 seconds (1 hour)
rentitem2 1201, 3600, 1, 7, 0, 0, 0, 0, 0;
</example_code>
<example_code>
// Rent a +5 identified Padded Armor with a Poring card for 86400 seconds (24 hours)
rentitem2 "PADDED_ARMOR", 86400, 1, 5, 0, 4001, 0, 0, 0;
</example_code>
<example_code>
// Rent an item with cards to another character
rentitem2 2104, 7200, 1, 10, 0, 4001, 4023, 0, 0, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*rentitem3 <item id>,<time>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account_id>};

*rentitem3 "<item name>",<time>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account_id>};
</syntax>

<description>
This command behaves identically to rentitem2, but also supports random options. Rental items expire after <time> seconds and are automatically deleted.

Parameters (same as rentitem2 plus):
- RandomIDArray: Array variable of ID for item random option, see db/[pre-]re/item_randomopt_db.yml
- RandomValueArray: Array variable of item random option's value
- RandomParamArray: Array variable of item random option's param

Rental items cannot be dropped, traded, or placed in guild storage.

Note: delitem in an NPC script can still remove rental items.

Note: countitem will not count any item with a rental timer. Use rentalcountitem instead.

<example_code>
// Set up random options
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Rent a +9 Crimson Dagger with Ghost property for 1 hour
rentitem3 28705, 3600, 1, 9, 0, 0, 0, 0, 0, .@OptID, .@OptVal, .@OptParam;
</example_code>
<example_code>
// Rent a named item with random options for 24 hours
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;
rentitem3 1201, 86400, 1, 7, 0, 254, 0, 12345, 67890, .@OptID, .@OptVal, .@OptParam;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*rentitem4 <item id>,<time>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account_id>};

*rentitem4 "<item name>",<time>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account_id>};
</syntax>

<description>
This command behaves identically to rentitem3, but also supports an enchant grade. Rental items expire after <time> seconds and are automatically deleted.

Parameters (same as rentitem3 plus):
- grade: Enchant grade value

Valid grades are:
ENCHANTGRADE_NONE - No grade
ENCHANTGRADE_D    - Grade D
ENCHANTGRADE_C    - Grade C
ENCHANTGRADE_B    - Grade B
ENCHANTGRADE_A    - Grade A

Rental items cannot be dropped, traded, or placed in guild storage.

Note: delitem in an NPC script can still remove rental items.

Note: countitem will not count any item with a rental timer. Use rentalcountitem instead.

<example_code>
// Set up random options
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Rent a grade 3 +9 Crimson Dagger with Ghost property for 1 hour
rentitem4 28705, 3600, 1, 9, 0, 0, 0, 0, 0, 3, .@OptID, .@OptVal, .@OptParam;
</example_code>
<example_code>
// Rent a grade 2 named item with random options for 24 hours
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;
rentitem4 1201, 86400, 1, 7, 0, 254, 0, 12345, 67890, 2, .@OptID, .@OptVal, .@OptParam;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*makeitem <item id>,<amount>,"<map name>",<X>,<Y>{,<canShowEffect>};

*makeitem "<item name>",<amount>,"<map name>",<X>,<Y>{,<canShowEffect>};
</syntax>

<description>
This command will create an item on the specified cell of a map.

As with any dropped items, the items created with this command will disappear after a period of time. Using an amount greater than 1 will create a single stack of the given amount, not multiple stacks of 1.

Like getitem, it also accepts an english name field from the database and creates Apples if the name isn't found.

If the map name is given as "this", the map the invoking character is on will be used.

If <canShowEffect> flag is set to true, it will show a pillar effect on the ground when dropped, depending on the item database's DropEffect flag.

<example_code>
// Drop 1 Apple at coordinates (150, 100) on prontera
makeitem 512, 1, "prontera", 150, 100;
</example_code>
<example_code>
// Drop 10 Red Potions on the current character's map
makeitem "RED_POTION", 10, "this", 0, 0;
</example_code>
<example_code>
// Drop with pillar effect
makeitem 617, 1, "prontera", 150, 100, true;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*makeitem2 <item id>,<amount>,"<map name>",<X>,<Y>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<canShowEffect>};

*makeitem2 "<item name>",<amount>,"<map name>",<X>,<Y>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<canShowEffect>};
</syntax>

<description>
This command behaves identically to makeitem, but allows you to specify additional details about the item such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it.

Parameters:
- amount: Number of items to create (creates a single stack)
- map name: Map where the item will be dropped
- X, Y: Coordinates on the map (use 0,0 for random within the map)
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

If the map name is given as "this", the map the invoking character is on will be used.

If <canShowEffect> flag is set to true, it will show a pillar effect on the ground when dropped, depending on the item database's DropEffect flag.

<example_code>
// Drop a +7 Sword at coordinates (150, 100) on prontera
makeitem2 1201, 1, "prontera", 150, 100, 1, 7, 0, 0, 0, 0, 0;
</example_code>
<example_code>
// Drop a named item with a card on the current character's map
makeitem2 "SWORD", 1, "this", 0, 0, 1, 5, 0, 254, 0, 12345, 67890;
</example_code>
<example_code>
// Drop with pillar effect
makeitem2 2104, 1, "prontera", 150, 100, 1, 10, 0, 4001, 4023, 0, 0, true;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*makeitem3 <item id>,<amount>,"<map name>",<X>,<Y>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<canShowEffect>};

*makeitem3 "<item name>",<amount>,"<map name>",<X>,<Y>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<canShowEffect>};
</syntax>

<description>
This command behaves identically to makeitem2, but also supports random options. Items are dropped on the specified map cell.

Parameters (same as makeitem2 plus):
- RandomIDArray: Array variable of ID for item random option, see db/[pre-]re/item_randomopt_db.yml
- RandomValueArray: Array variable of item random option's value
- RandomParamArray: Array variable of item random option's param

If the map name is given as "this", the map the invoking character is on will be used.

If <canShowEffect> flag is set to true, it will show a pillar effect on the ground when dropped, depending on the item database's DropEffect flag.

<example_code>
// Set up random options
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Drop a +9 Crimson Dagger with Ghost property on prontera
makeitem3 28705, 1, "prontera", 150, 100, 1, 9, 0, 0, 0, 0, 0, .@OptID, .@OptVal, .@OptParam;
</example_code>
<example_code>
// Drop a named item with random options on current map with effect
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;
makeitem3 1201, 1, "this", 0, 0, 1, 7, 0, 254, 0, 12345, 67890, .@OptID, .@OptVal, .@OptParam, true;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*makeitem4 <item id>,<amount>,"<map name>",<X>,<Y>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<canShowEffect>};

*makeitem4 "<item name>",<amount>,"<map name>",<X>,<Y>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<canShowEffect>};
</syntax>

<description>
This command behaves identically to makeitem3, but also supports an enchant grade. Items are dropped on the specified map cell.

Parameters (same as makeitem3 plus):
- grade: Enchant grade value

Valid grades are:
ENCHANTGRADE_NONE - No grade
ENCHANTGRADE_D    - Grade D
ENCHANTGRADE_C    - Grade C
ENCHANTGRADE_B    - Grade B
ENCHANTGRADE_A    - Grade A

If the map name is given as "this", the map the invoking character is on will be used.

If <canShowEffect> flag is set to true, it will show a pillar effect on the ground when dropped, depending on the item database's DropEffect flag.

<example_code>
// Set up random options
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Drop a grade 3 +9 Crimson Dagger with Ghost property on prontera
makeitem4 28705, 1, "prontera", 150, 100, 1, 9, 0, 0, 0, 0, 0, 3, .@OptID, .@OptVal, .@OptParam;
</example_code>
<example_code>
// Drop a grade 2 named item with random options on current map with effect
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;
makeitem4 1201, 1, "this", 0, 0, 1, 7, 0, 254, 0, 12345, 67890, 2, .@OptID, .@OptVal, .@OptParam, true;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cleanarea "<map name>",<x1>,<y1>,<x2>,<y2>;

*cleanmap "<map name>";
</syntax>

<description>
These commands will clear all items lying on the ground on the specified map, either within the x1/y1-x2/y2 rectangle (cleanarea) or across the entire map (cleanmap).

<example_code>
// Clear all items on the entire prontera map
cleanmap "prontera";
</example_code>
<example_code>
// Clear items only within the specified area
cleanarea "prontera", 100, 100, 200, 200;
</example_code>
<example_code>
// Clear items on the current character's map
cleanmap strcharinfo(3);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*searchitem <array name>,"<item name>";
</syntax>

<description>
This command will fill the given array with the IDs of items whose name matches the given one. It returns the number of items found. For performance reasons, the results array is limited to 10 items.

<example_code>
mes "[Item Searcher]";
mes "What item are you looking for?";
next;
input .@name$;
.@qty = searchitem(.@matches[0], .@name$);
mes "I found " + .@qty + " items:";
for (.@i = 0; .@i < .@qty; .@i++) {
    mes getitemname(.@matches[.@i]) + "[" + getitemslots(.@matches[.@i]) + "]";
}
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*delitem <item id>,<amount>{,<account ID>};

*delitem "<item name>",<amount>{,<account ID>};
</syntax>

<description>
This command will remove a specified amount of items from the invoking/target character. Like all the item commands, it uses the item ID found inside db/item_db.yml.

It is always a good idea to check if the player actually has the items before you delete them. If you try to delete more items than the player has, the player will lose the ones they have and the script will terminate with an error.

Like getitem, this command will also accept an english name field from the database. If the name is not found, nothing will be deleted.

<example_code>
delitem 502, 10; // The person will lose 10 apples
</example_code>
<example_code>
delitem 617, 1;  // The person will lose 1 Old Violet Box
</example_code>
<example_code>
// Safe deletion with checking
if (countitem(512) >= 5) {
    delitem 512, 5;
    mes "5 apples removed.";
} else {
    mes "You don't have enough apples.";
}
</example_code>
<example_code>
// Delete items from another character
delitem "Red_Potion", 10, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cartdelitem <item id>,<amount>{,<account ID>};

*cartdelitem "<item name>",<amount>{,<account ID>};
</syntax>

<description>
This command will remove a specified amount of items from the invoking/target character's cart. Like all the item commands, it uses the item ID found inside db/item_db.yml.

It is always a good idea to check if the player actually has the items in their cart before you delete them. If you try to delete more items than the player has in their cart, the player will lose the ones they have and the script will terminate with an error.

Like getitem, this command will also accept an english name field from the database. If the name is not found, nothing will be deleted.

<example_code>
// Remove 10 apples from the character's cart
cartdelitem 502, 10;
</example_code>
<example_code>
// Remove 1 Old Violet Box from the character's cart
cartdelitem 617, 1;
</example_code>
<example_code>
// Safe deletion with checking
if (cartcountitem(512) >= 5) {
    cartdelitem 512, 5;
    mes "5 apples removed from your cart.";
} else {
    mes "You don't have enough apples in your cart.";
}
</example_code>
<example_code>
// Remove items from another character's cart
cartdelitem "RED_POTION", 10, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*storagedelitem <item id>,<amount>{,<account ID>};

*storagedelitem "<item name>",<amount>{,<account ID>};
</syntax>

<description>
This command will remove a specified amount of items from the invoking/target character's storage. Like all the item commands, it uses the item ID found inside db/item_db.yml.

It is always a good idea to check if the player actually has the items in their storage before you delete them. If you try to delete more items than the player has in their storage, the player will lose the ones they have and the script will terminate with an error.

Like getitem, this command will also accept an english name field from the database. If the name is not found, nothing will be deleted.

<example_code>
// Remove 10 apples from the character's storage
storagedelitem 502, 10;
</example_code>
<example_code>
// Remove 1 Old Violet Box from the character's storage
storagedelitem 617, 1;
</example_code>
<example_code>
// Safe deletion with checking
if (storagecountitem(512) >= 5) {
    storagedelitem 512, 5;
    mes "5 apples removed from your storage.";
} else {
    mes "You don't have enough apples in your storage.";
}
</example_code>
<example_code>
// Remove items from another character's storage
storagedelitem "RED_POTION", 10, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guildstoragedelitem <item id>,<amount>{,<account ID>};

*guildstoragedelitem "<item name>",<amount>{,<account ID>};
</syntax>

<description>
This command will remove a specified amount of items from the invoking/target character's guild storage. Like all the item commands, it uses the item ID found inside db/item_db.yml.

It is always a good idea to check if the player actually has the items in the guild storage before you delete them. If you try to delete more items than are available in the guild storage, the command will remove the available items and the script may terminate with an error.

Like getitem, this command will also accept an english name field from the database. If the name is not found, nothing will be deleted.

<example_code>
// Remove 10 apples from the guild storage
guildstoragedelitem 502, 10;
</example_code>
<example_code>
// Remove 1 Old Violet Box from the guild storage
guildstoragedelitem 617, 1;
</example_code>
<example_code>
// Safe deletion with checking
if (guildstoragecountitem(512) >= 5) {
    guildstoragedelitem 512, 5;
    mes "5 apples removed from guild storage.";
} else {
    mes "There aren't enough apples in guild storage.";
}
</example_code>
<example_code>
// Remove items from guild storage for another character
guildstoragedelitem "Red_Potion", 10, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*delitem2 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};

*delitem2 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};
</syntax>

<description>
This command works similarly to delitem, but allows you to specify additional details about the item to delete, such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it. This is useful for deleting specific crafted or modified items rather than any instance of the item ID.

Parameters:
- amount: Number of items to delete
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

If an optional account ID is specified, the items will be deleted from that character's inventory instead.

Like delitem, it is always a good idea to check if the player actually has the specific items before you delete them.

<example_code>
// Delete a specific +7 Sword with no cards
delitem2 1201, 1, 1, 7, 0, 0, 0, 0, 0;
</example_code>
<example_code>
// Delete a named item (with character ID in card slots)
delitem2 512, 1, 1, 0, 0, 254, 0, 12345, 67890;
</example_code>
<example_code>
// Delete a specific item from another character
delitem2 "SWORD", 1, 1, 5, 0, 4001, 0, 0, 0, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*delitem3 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};

*delitem3 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};
</syntax>

<description>
This command works similarly to delitem2, but also supports deleting items with specific random options. This allows you to delete exact item instances that have specific random option configurations.

Parameters (same as delitem2 plus):
- RandomIDArray: Array variable containing the random option IDs of the item to delete
- RandomValueArray: Array variable containing the random option values
- RandomParamArray: Array variable containing the random option parameters

If an optional account ID is specified, the items will be deleted from that character's inventory instead.

It is always a good idea to check if the player actually has the specific items before you delete them.

<example_code>
// Set up random options to match the item being deleted
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Delete a +9 Crimson Dagger with Ghost property
delitem3 28705, 1, 1, 9, 0, 0, 0, 0, 0, .@OptID, .@OptVal, .@OptParam;
</example_code>
<example_code>
// Delete a named item with specific random options
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;
delitem3 1201, 1, 1, 7, 0, 254, 0, 12345, 67890, .@OptID, .@OptVal, .@OptParam;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*delitem4 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};

*delitem4 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<account ID>};
</syntax>

<description>
This command works similarly to delitem3, but also supports deleting items with a specific enchant grade.

Parameters (same as delitem3 plus):
- grade: Enchant grade value

Valid grades are:
ENCHANTGRADE_NONE - No grade
ENCHANTGRADE_D    - Grade D
ENCHANTGRADE_C    - Grade C
ENCHANTGRADE_B    - Grade B
ENCHANTGRADE_A    - Grade A

If an optional account ID is specified, the items will be deleted from that character's inventory instead.

It is always a good idea to check if the player actually has the specific items before you delete them.

<example_code>
// Set up random options
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Delete a grade 3 +9 Crimson Dagger with Ghost property
delitem4 28705, 1, 1, 9, 0, 0, 0, 0, 0, 3, .@OptID, .@OptVal, .@OptParam;
</example_code>
<example_code>
// Delete a grade 2 named item with specific random options
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;
delitem4 1201, 1, 1, 7, 0, 254, 0, 12345, 67890, 2, .@OptID, .@OptVal, .@OptParam;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*delitemidx <index>{,<amount>{,<char id>}}
</syntax>

<description>
This command will remove an item at the given inventory index.

If <amount> is not specified, this will remove all of the items at the specified index.

The only way to get the inventory index is by using getinventorylist(). After deleting an item at the given index, that index can remain empty until the player relogs, requiring getinventorylist() to be called again. If an item is deleted with an invalid index, the script will terminate with an error.

This command returns true on success and false if the item at the given index could not be deleted or if not enough items were available at the given index.

<example_code>
// This will remove all Red Potions from player's inventory
getinventorylist();
for (.@i = 0; .@i < @inventorylist_count; ++.@i)
    if (@inventorylist_id[.@i] == 501)
        delitemidx @inventorylist_idx[.@i];
</example_code>
<example_code>
// Remove only 5 items at the specified index
getinventorylist();
if (@inventorylist_id[0] == 512)
    delitemidx @inventorylist_idx[0], 5;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cartdelitem2 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};

*cartdelitem2 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};
</syntax>

<description>
This command works similarly to cartdelitem, but allows you to specify additional details about the item to delete from the character's cart, such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it. This is useful for deleting specific crafted or modified items from a cart rather than any instance of the item ID.

Parameters:
- amount: Number of items to delete
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

If an optional account ID is specified, the items will be deleted from that character's cart instead.

It is always a good idea to check if the player actually has the specific items in their cart before you delete them.

<example_code>
// Delete a specific +7 Sword with no cards from the cart
cartdelitem2 1201, 1, 1, 7, 0, 0, 0, 0, 0;
</example_code>
<example_code>
// Delete a named item from the cart
cartdelitem2 512, 1, 1, 0, 0, 254, 0, 12345, 67890;
</example_code>
<example_code>
// Delete a specific item from another character's cart
cartdelitem2 "SWORD", 1, 1, 5, 0, 4001, 0, 0, 0, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*storagedelitem2 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};

*storagedelitem2 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};
</syntax>

<description>
This command works similarly to storagedelitem, but allows you to specify additional details about the item to delete from the character's storage, such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it. This is useful for deleting specific crafted or modified items from storage rather than any instance of the item ID.

Parameters:
- amount: Number of items to delete
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

If an optional account ID is specified, the items will be deleted from that character's storage instead.

It is always a good idea to check if the player actually has the specific items in their storage before you delete them.

<example_code>
// Delete a specific +7 Sword with no cards from storage
storagedelitem2 1201, 1, 1, 7, 0, 0, 0, 0, 0;
</example_code>
<example_code>
// Delete a named item from storage
storagedelitem2 512, 1, 1, 0, 0, 254, 0, 12345, 67890;
</example_code>
<example_code>
// Delete a specific item from another character's storage
storagedelitem2 "SWORD", 1, 1, 5, 0, 4001, 0, 0, 0, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guildstoragedelitem2 <item id>,<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};

*guildstoragedelitem2 "<item name>",<amount>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<account ID>};
</syntax>

<description>
This command works similarly to guildstoragedelitem, but allows you to specify additional details about the item to delete from the guild storage, such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it. This is useful for deleting specific crafted or modified items from guild storage rather than any instance of the item ID.

Parameters:
- amount: Number of items to delete
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

If an optional account ID is specified, the items will be deleted from that character's guild storage instead.

It is always a good idea to check if the player actually has the specific items in guild storage before you delete them.

<example_code>
// Delete a specific +7 Sword with no cards from guild storage
guildstoragedelitem2 1201, 1, 1, 7, 0, 0, 0, 0, 0;
</example_code>
<example_code>
// Delete a named item from guild storage
guildstoragedelitem2 512, 1, 1, 0, 0, 254, 0, 12345, 67890;
</example_code>
<example_code>
// Delete a specific item from another character's guild storage
guildstoragedelitem2 "SWORD", 1, 1, 5, 0, 4001, 0, 0, 0, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*countitem(<item id>{,<accountID>})

*countitem("<item name>"{,<accountID>})
</syntax>

<description>
This function will return the number of items for the specified item ID that the invoking character has in the inventory.

Like getitem, this function will also accept an english name from the database as an argument.

<example_code>
mes "[Item Checker]";
mes "Hmmm, it seems you have " + countitem(502) + " apples";
close;
</example_code>
<example_code>
mes "[Item Checker]";
mes "Hmmm, the total number of apples you are holding is " + countitem("APPLE");
close;
</example_code>
<example_code>
// Count items for another character
.@count = countitem(512, 2000000);
</example_code>
<example_code>
mes "Checking your inventory for Red Potions...";
next;

// Check if the player has at least one Red Potion (ID 501)
if (countitem(501) > 0) {
    mes "You have at least one Red Potion!";
} else {
    mes "You do not have any Red Potions.";
}
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cartcountitem(<item id>{,<accountID>})

*cartcountitem("<item name>"{,<accountID>})
</syntax>

<description>
This function will return the number of items for the specified item ID that the invoking character has in their cart.

Like getitem, this function will also accept an english name from the database as an argument.

<example_code>
mes "[Cart Checker]";
mes "It seems you have " + cartcountitem(502) + " apples in your cart";
close;
</example_code>
<example_code>
// Check for another character
.@count = cartcountitem("RED_POTION", 2000000);
mes "That character has " + .@count + " Red Potions in their cart.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*storagecountitem(<item id>{,<accountID>})

*storagecountitem("<item name>"{,<accountID>})
</syntax>

<description>
This function will return the number of items for the specified item ID that the invoking character has in their storage.

Like getitem, this function will also accept an english name from the database as an argument.

<example_code>
mes "[Storage Checker]";
mes "It seems you have " + storagecountitem(502) + " apples in your storage";
close;
</example_code>
<example_code>
// Check for another character
.@count = storagecountitem("RED_POTION", 2000000);
mes "That character has " + .@count + " Red Potions in their storage.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guildstoragecountitem(<item id>{,<accountID>})

*guildstoragecountitem("<item name>"{,<accountID>})
</syntax>

<description>
This function will return the number of items for the specified item ID that the invoking character's guild has in its guild storage. The character must be a member of a guild to use this.

Like getitem, this function will also accept an english name from the database as an argument.

<example_code>
mes "[Guild Storage Checker]";
mes "Our guild storage has " + guildstoragecountitem(502) + " apples";
close;
</example_code>
<example_code>
// Check for another character's guild
.@count = guildstoragecountitem("RED_POTION", 2000000);
mes "That character's guild has " + .@count + " Red Potions in storage.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*countitem2(<item id>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})

*countitem2("<item name>",<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})
</syntax>

<description>
This function works similarly to countitem, but allows you to specify additional details about the item to count, such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it. This is useful for counting specific crafted or modified items rather than any instance of the item ID.

Parameters:
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

<example_code>
// Count how many +7 Swords with no cards the player has
.@count = countitem2(1201, 1, 7, 0, 0, 0, 0, 0);
mes "You have " + .@count + " +7 Sword(s).";
</example_code>
<example_code>
// Count a named item (with character ID in card slots)
.@count = countitem2(512, 1, 0, 0, 254, 0, 12345, 67890);
mes "You have " + .@count + " named apples.";
</example_code>
<example_code>
// Count for another character
.@count = countitem2("SWORD", 1, 5, 0, 4001, 0, 0, 0, 2000000);
if (.@count > 0)
    mes "That character has " + .@count + " +5 Sword(s) with a Poring card.";
else
    mes "That character does not have that specific sword.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*countitem3(<item id>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<accountID>})

*countitem3("<item name>",<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<accountID>})
</syntax>

<description>
This function works similarly to countitem2, but also supports counting items with specific random options. This allows you to count exact item instances that have specific random option configurations.

Parameters (same as countitem2 plus):
- RandomIDArray: Array variable containing the random option IDs to match
- RandomValueArray: Array variable containing the random option values to match
- RandomParamArray: Array variable containing the random option parameters to match

<example_code>
// Set up random options to match
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Count how many +9 Crimson Daggers with Ghost property the player has
.@count = countitem3(28705, 1, 9, 0, 0, 0, 0, 0, .@OptID, .@OptVal, .@OptParam);
mes "You have " + .@count + " +9 Crimson Dagger(s) with Ghost property.";
</example_code>
<example_code>
// Count a named item with specific random options for another character
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;

.@count = countitem3(1201, 1, 7, 0, 254, 0, 12345, 67890, .@OptID, .@OptVal, .@OptParam, 2000000);
if (.@count > 0)
    mes "That character has " + .@count + " named +7 Sword(s) with specific random options.";
else
    mes "That character does not have that specific item.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*countitem4(<item id>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<accountID>})

*countitem4("<item name>",<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<accountID>})
</syntax>

<description>
This function works similarly to countitem3, but also supports counting items with a specific enchant grade.

Parameters (same as countitem3 plus):
- grade: Enchant grade value

Valid grades are:
ENCHANTGRADE_NONE - No grade
ENCHANTGRADE_D    - Grade D
ENCHANTGRADE_C    - Grade C
ENCHANTGRADE_B    - Grade B
ENCHANTGRADE_A    - Grade A

<example_code>
// Set up random options to match
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Count how many grade 3 +9 Crimson Daggers with Ghost property the player has
.@count = countitem4(28705, 1, 9, 0, 0, 0, 0, 0, 3, .@OptID, .@OptVal, .@OptParam);
mes "You have " + .@count + " grade 3 +9 Crimson Dagger(s) with Ghost property.";
</example_code>
<example_code>
// Count a grade 2 named item with specific random options for another character
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;

.@count = countitem4(1201, 1, 7, 0, 254, 0, 12345, 67890, 2, .@OptID, .@OptVal, .@OptParam, 2000000);
if (.@count > 0)
    mes "That character has " + .@count + " grade 2 named +7 Sword(s) with specific random options.";
else
    mes "That character does not have that specific item.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cartcountitem2(<item id>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})

*cartcountitem2("<item name>",<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})
</syntax>

<description>
This function works similarly to cartcountitem, but allows you to specify additional details about the item to count in the character's cart, such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it. This is useful for counting specific crafted or modified items in a cart rather than any instance of the item ID.

Parameters:
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

<example_code>
// Count how many +7 Swords with no cards are in the cart
.@count = cartcountitem2(1201, 1, 7, 0, 0, 0, 0, 0);
mes "Your cart has " + .@count + " +7 Sword(s).";
</example_code>
<example_code>
// Count a named item in the cart
.@count = cartcountitem2(512, 1, 0, 0, 254, 0, 12345, 67890);
mes "Your cart has " + .@count + " named apples.";
</example_code>
<example_code>
// Count for another character's cart
.@count = cartcountitem2("SWORD", 1, 5, 0, 4001, 0, 0, 0, 2000000);
if (.@count > 0)
    mes "That character's cart has " + .@count + " +5 Sword(s) with a Poring card.";
else
    mes "That character's cart does not have that specific sword.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*storagecountitem2(<item id>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})

*storagecountitem2("<item name>",<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})
</syntax>

<description>
This function works similarly to storagecountitem, but allows you to specify additional details about the item to count in the character's storage, such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it. This is useful for counting specific crafted or modified items in storage rather than any instance of the item ID.

Parameters:
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

<example_code>
// Count how many +7 Swords with no cards are in storage
.@count = storagecountitem2(1201, 1, 7, 0, 0, 0, 0, 0);
mes "Your storage has " + .@count + " +7 Sword(s).";
</example_code>
<example_code>
// Count a named item in storage
.@count = storagecountitem2(512, 1, 0, 0, 254, 0, 12345, 67890);
mes "Your storage has " + .@count + " named apples.";
</example_code>
<example_code>
// Count for another character's storage
.@count = storagecountitem2("SWORD", 1, 5, 0, 4001, 0, 0, 0, 2000000);
if (.@count > 0)
    mes "That character's storage has " + .@count + " +5 Sword(s) with a Poring card.";
else
    mes "That character's storage does not have that specific sword.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guildstoragecountitem2(<item id>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})

*guildstoragecountitem2("<item name>",<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})
</syntax>

<description>
This function works similarly to guildstoragecountitem, but allows you to specify additional details about the item to count in the guild storage, such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it. This is useful for counting specific crafted or modified items in guild storage rather than any instance of the item ID.

Parameters:
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

<example_code>
// Count how many +7 Swords with no cards are in guild storage
.@count = guildstoragecountitem2(1201, 1, 7, 0, 0, 0, 0, 0);
mes "Guild storage has " + .@count + " +7 Sword(s).";
</example_code>
<example_code>
// Count a named item in guild storage
.@count = guildstoragecountitem2(512, 1, 0, 0, 254, 0, 12345, 67890);
mes "Guild storage has " + .@count + " named apples.";
</example_code>
<example_code>
// Count for another character's guild storage
.@count = guildstoragecountitem2("SWORD", 1, 5, 0, 4001, 0, 0, 0, 2000000);
if (.@count > 0)
    mes "That character's guild storage has " + .@count + " +5 Sword(s) with a Poring card.";
else
    mes "That character's guild storage does not have that specific sword.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*rentalcountitem2(<item id>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})

*rentalcountitem2("<item name>",<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>{,<accountID>})
</syntax>

<description>
This function works similarly to rentalcountitem, but allows you to specify additional details about the rental item to count, such as whether it's identified, its refine level, whether it's broken, and what cards are inserted into it. This is useful for counting specific crafted or modified rental items rather than any instance of the item ID.

Note: countitem will not count any item with a rental timer. Use rentalcountitem instead for rental items.

Parameters:
- identify: 0 = unidentified, 1 = identified
- refine: Refine level (0 to 20)
- attribute: 0 = normal item, 1 = broken item
- card1 to card4: Card IDs inserted into the item (use 0 for no card)

<example_code>
// Count how many +7 rental Swords with no cards the player has
.@count = rentalcountitem2(1201, 1, 7, 0, 0, 0, 0, 0);
mes "You have " + .@count + " +7 rental Sword(s).";
</example_code>
<example_code>
// Count a named rental item
.@count = rentalcountitem2(512, 1, 0, 0, 254, 0, 12345, 67890);
mes "You have " + .@count + " named rental apples.";
</example_code>
<example_code>
// Count for another character's rental items
.@count = rentalcountitem2("SWORD", 1, 5, 0, 4001, 0, 0, 0, 2000000);
if (.@count > 0)
    mes "That character has " + .@count + " +5 rental Sword(s) with a Poring card.";
else
    mes "That character does not have that specific rental sword.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*rentalcountitem3(<item id>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<accountID>})

*rentalcountitem3("<item name>",<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<accountID>})
</syntax>

<description>
This function works similarly to rentalcountitem2, but also supports counting rental items with specific random options. This allows you to count exact rental item instances that have specific random option configurations.

Parameters (same as rentalcountitem2 plus):
- RandomIDArray: Array variable containing the random option IDs to match
- RandomValueArray: Array variable containing the random option values to match
- RandomParamArray: Array variable containing the random option parameters to match

Note: countitem will not count any item with a rental timer. Use rentalcountitem instead for rental items.

<example_code>
// Set up random options to match
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Count how many +9 rental Crimson Daggers with Ghost property the player has
.@count = rentalcountitem3(28705, 1, 9, 0, 0, 0, 0, 0, .@OptID, .@OptVal, .@OptParam);
mes "You have " + .@count + " +9 rental Crimson Dagger(s) with Ghost property.";
</example_code>
<example_code>
// Count a named rental item with specific random options for another character
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;

.@count = rentalcountitem3(1201, 1, 7, 0, 254, 0, 12345, 67890, .@OptID, .@OptVal, .@OptParam, 2000000);
if (.@count > 0)
    mes "That character has " + .@count + " named +7 rental Sword(s) with specific random options.";
else
    mes "That character does not have that specific rental item.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*rentalcountitem4(<item id>,<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<accountID>})

*rentalcountitem4("<item name>",<identify>,<refine>,<attribute>,<card1>,<card2>,<card3>,<card4>,<grade>,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>{,<accountID>})
</syntax>

<description>
This function works similarly to rentalcountitem3, but also supports counting rental items with a specific enchant grade.

Parameters (same as rentalcountitem3 plus):
- grade: Enchant grade value

Valid grades are:
ENCHANTGRADE_NONE - No grade
ENCHANTGRADE_D    - Grade D
ENCHANTGRADE_C    - Grade C
ENCHANTGRADE_B    - Grade B
ENCHANTGRADE_A    - Grade A

Note: countitem will not count any item with a rental timer. Use rentalcountitem instead for rental items.

<example_code>
// Set up random options to match
setarray .@OptID[0], RDMOPT_WEAPON_ATTR_TELEKINESIS;
setarray .@OptVal[0], 0;
setarray .@OptParam[0], 0;

// Count how many grade 3 +9 rental Crimson Daggers with Ghost property the player has
.@count = rentalcountitem4(28705, 1, 9, 0, 0, 0, 0, 0, 3, .@OptID, .@OptVal, .@OptParam);
mes "You have " + .@count + " grade 3 +9 rental Crimson Dagger(s) with Ghost property.";
</example_code>
<example_code>
// Count a grade 2 named rental item with specific random options for another character
setarray .@OptID[0], 1, 2, 0, 0, 0;
setarray .@OptVal[0], 5, 3, 0, 0, 0;
setarray .@OptParam[0], 0, 0, 0, 0, 0;

.@count = rentalcountitem4(1201, 1, 7, 0, 254, 0, 12345, 67890, 2, .@OptID, .@OptVal, .@OptParam, 2000000);
if (.@count > 0)
    mes "That character has " + .@count + " grade 2 named +7 rental Sword(s) with specific random options.";
else
    mes "That character does not have that specific rental item.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*countbound({<bound type>{,<char_id>}})
</syntax>

<description>
This function will return the number of different bounded items in the character's inventory, and sets the arrays @bound_items[] and @bound_amount[] containing all item IDs of the counted items and their respective amount. If a bound type is specified, only those items will be counted.

For a list of bound types see getitembound.

<example_code>
.@total_type = countbound();
mes "You currently have " + .@total_type + " different types of bounded items.";
next;
mes "The list of bounded items includes:";
for (.@i = 0; .@i < .@total_type; .@i++)
    mes "x" + @bound_amount[.@i] + " " + getitemname(@bound_items[.@i]);
close;
</example_code>
<example_code>
// Count only character-bound items
.@count = countbound(Bound_Char);
mes "You have " + .@count + " different types of character-bound items.";
</example_code>
<example_code>
// Count bounded items for another character
.@count = countbound(Bound_Account, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*groupranditem <group id>{,<sub_group>};
</syntax>

<description>
Returns the item_id of a random item picked from the group specified. The different groups and their group numbers are specified in db/(pre-)re/item_group_db.yml.

When used in conjunction with other functions, you can get a random item.

sub_group is used to get the available random items of an item group from a specified random group. If sub_group is not defined, the value will be 1. Make sure the group has a defined sub group with the given value.

The algorithm specified in the sub group determines how the item is picked. If the sub group algorithm is "All", then a random item in the group will be returned with each item having the same chance of being picked.

More info, see doc/item_group.txt.

<example_code>
// Get a random item from item group BASIC_SIEGE_SUPPLY_BOX
getitem groupranditem(BASIC_SIEGE_SUPPLY_BOX), 1;
</example_code>
<example_code>
// Get a random item from sub group 2 of group BASIC_SIEGE_SUPPLY_BOX
.@item_id = groupranditem(BASIC_SIEGE_SUPPLY_BOX, 2);
getitem .@item_id, 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getrandgroupitem <group_id>{,<quantity>{,<sub_group>{,<identify>{,<char_id>}}}};
</syntax>

<description>
Similar to groupranditem, this command allows players to obtain the specified quantity of a random item from the group <group id>. The different groups and their group numbers are specified in db/(pre-)re/item_group_db.yml.

If quantity is not defined or 0, it will use the defined amount from the Item Group list.

Sub groups and their algorithm work the same way as explained for groupranditem.

For items with type IT_WEAPON, IT_ARMOR, IT_PETARMOR, and IT_SHADOWGEAR, they will be given as unidentified items (as defined by itemdb_isidentified in src/map/itemdb.cpp) except if identify is defined with value 1.

More info, see doc/item_group.txt.

<example_code>
// Get a random item from group BASIC_SIEGE_SUPPLY_BOX with default quantity
getrandgroupitem BASIC_SIEGE_SUPPLY_BOX;
</example_code>
<example_code>
// Get 5 random items from group BASIC_SIEGE_SUPPLY_BOX, sub group 2, identified
getrandgroupitem BASIC_SIEGE_SUPPLY_BOX, 5, 2, 1;
</example_code>
<example_code>
// Get a random item from group BASIC_SIEGE_SUPPLY_BOX for another character
getrandgroupitem BASIC_SIEGE_SUPPLY_BOX, 1, 1, 0, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getgroupitem <group_id>{,<identify>{,<char_id>}};
</syntax>

<description>
Gives item(s) to the attached player based on item group contents. This is not like getrandgroupitem which only gives 1 item for a specified item group and sub_group.

For items with type IT_WEAPON, IT_ARMOR, IT_PETARMOR, and IT_SHADOWGEAR, they will be given as unidentified items (as defined by itemdb_isidentified in src/map/itemdb.cpp) except if identify is defined with value 1.

For each sub group defined for the item group, items will be given out according to their corresponding algorithm.

More info, see doc/item_group.txt.

<example_code>
// Give items from group BASIC_SIEGE_SUPPLY_BOX according to its sub group algorithms
getgroupitem BASIC_SIEGE_SUPPLY_BOX;
</example_code>
<example_code>
// Give items from group BASIC_SIEGE_SUPPLY_BOX, fully identified
getgroupitem BASIC_SIEGE_SUPPLY_BOX, 1;
</example_code>
<example_code>
// Give items from group BASIC_SIEGE_SUPPLY_BOX to another character
getgroupitem BASIC_SIEGE_SUPPLY_BOX, 0, 2000000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*enable_items;

*disable_items;
</syntax>

<description>
These commands toggle the ability to change equipment while interacting with an NPC. To avoid possible exploits, the commands affect the particular script instance only. Note that if a different script also calls enable_items, it will override the last call (so you may want to call this command at the start of your script without assuming it is still in effect).

The default setting, item_enabled_npc, is defined in conf/battle/items.conf.

<example_code>
// Disallow equipment changes during this NPC interaction
disable_items;

mes "[Armor Merchant]";
mes "Do not change your equipment while we talk!";
close;
</example_code>
<example_code>
// Allow equipment changes
enable_items;
mes "[Friendly Merchant]";
mes "Feel free to adjust your gear while we chat.";
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*disable_items;

*enable_items;
</syntax>

<description>
These commands toggle the ability to change equipment while interacting with an NPC. To avoid possible exploits, the commands affect the particular script instance only. Note that if a different script also calls enable_items, it will override the last call (so you may want to call this command at the start of your script without assuming it is still in effect).

The default setting, item_enabled_npc, is defined in conf/battle/items.conf.

<example_code>
// Disallow equipment changes during this NPC interaction
disable_items;

mes "[Armor Merchant]";
mes "Do not change your equipment while we talk!";
close;
</example_code>
<example_code>
// Allow equipment changes
enable_items;
mes "[Friendly Merchant]";
mes "Feel free to adjust your gear while we chat.";
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*itemskill <skill id>,<skill level>{,<keep requirement>};

*itemskill "<skill name>",<skill level>{,<keep requirement>};
</syntax>

<description>
This command is meant for item scripts to replicate single-use skills in usable items. It will not work properly if there is a visible dialog window or menu or if the item is not type Delayconsume. If the skill is self or auto-targeting, it will be used immediately; otherwise a target cursor is shown.

If <keep requirement> parameter is set to true, the skill's requirements will be checked. By default, the requirements for item skills are not checked, and therefore the default value is false.

<example_code>
// When Anodyne is used, it will cast Endure (8), Level 1, as if the actual skill has been used from skill tree.
- Id: 605
AegisName: Anodyne
Name: Anodyne
Type: Delayconsume
Buy: 2000
Weight: 100
Flags:
  BuyingStore: true
Script: |
  itemskill "SM_ENDURE", 1;
</example_code>
<example_code>
// When Sienna_Execrate_Scroll_1_5 is used, it will cast Sienna Execrate Level 5 and consume 2 Red_Gemstones.
- Id: 23194
AegisName: Sienna_Execrate_Scroll_1_5
Name: Level 5 Sienna Execrate
Type: Delayconsume
Buy: 10
Weight: 10
Script: |
  itemskill "WL_SIENNAEXECRATE", 5, true;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*consumeitem <item id>{,<char_id>};

*consumeitem "<item name>"{,<char_id>};
</syntax>

<description>
This command will run the item script of the specified item on the invoking character. The character does not need to possess the item, and the item will not be deleted. While this command is intended for usable items, it will run for any item type.

This command does not currently work with the itemskill script command.

<example_code>
// Run the script of Apple (item ID 512) on the attached player
consumeitem 512;
</example_code>
<example_code>
// Run the script of Red Potion on another character
consumeitem "Red_Potion", 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*produce <item level>;
</syntax>

<description>
This command will open a crafting window on the client connected to the invoking character. The item level is a number which determines what kind of crafting window will pop-up.

You can see the full list of such item levels in db/produce_db.txt which determines what can actually be produced. The window will not be empty only if the invoking character can actually produce the items of that type and has the appropriate raw materials in their inventory.

The success rate to produce the item is the same as the success rate of the skill associated with the item level. If there is no skill ID, the success rate will be 50%.

Valid item levels are:

1   - Level 1 Weapons
2   - Level 2 Weapons
3   - Level 3 Weapons
21  - Blacksmith's Stones and Metals
22  - Alchemist's Potions, Holy Water, Assassin Cross's Deadly Poison
23  - Elemental Converters

<example_code>
// Open Level 1 Weapon crafting window
produce 1;
</example_code>
<example_code>
// Open Alchemist's Potion crafting window
produce 22;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cooking <dish level>;
</syntax>

<description>
This command will open a produce window on the client connected to the invoking character. The dish level is the number which determines what kind of dish level you can produce. You can see the full list of dishes that can be produced in db/produce_db.txt.

The window will be shown empty if the invoking character does not have enough of the required ingredients to cook a dish.

Valid dish levels are:

11 - Level 1 Dish
12 - Level 2 Dish
13 - Level 3 Dish
14 - Level 4 Dish
15 - Level 5 Dish
16 - Level 6 Dish
17 - Level 7 Dish
18 - Level 8 Dish
19 - Level 9 Dish
20 - Level 10 Dish

Although it's required to set a dish level, it doesn't matter if you set it to 1 and you want to cook a level 10 dish, as long as you have the required ingredients to cook the dish, the command works.

<example_code>
// Open Level 1 Dish crafting window
cooking 11;
</example_code>
<example_code>
// Open Level 10 Dish crafting window
cooking 20;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*makerune <% success bonus>{,<char_id>};
</syntax>

<description>
This command will open a rune crafting window on the client connected to the invoking character. Since this command is officially used in rune ores, a bonus success rate must be specified (which adds to the base formula).

You can see the full list of runes that can be produced in db/produce_db.txt. The window will not be empty only if the invoking character can actually produce a rune and has the appropriate raw materials in their inventory.

<example_code>
// Open rune crafting window with 0% bonus success rate
makerune 0;
</example_code>
<example_code>
// Open rune crafting window with 10% bonus success rate
makerune 10;
</example_code>
<example_code>
// Open rune crafting window for another character with 5% bonus
makerune 5, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*successremovecards <equipment slot>;
</syntax>

<description>
This command will remove all cards from the item found in the specified equipment slot of the invoking character, as defined in db/item_db.yml, create new card items, and give them to the character. If any cards were removed in this manner, it will also show a success effect.

For a list of equipment slots see getequipid.

<example_code>
// Remove all cards from the equipped weapon
successremovecards EQI_HAND_R;
</example_code>
<example_code>
// Remove all cards from the equipped armor
successremovecards EQI_ARMOR;
</example_code>
<example_code>
// Remove all cards from another character's headgear
successremovecards EQI_HEAD_TOP, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*failedremovecards <equipment slot>,<type>;
</syntax>

<description>
This command will remove all cards from the item found in the specified equipment slot of the invoking character. Type determines what happens to the item and the cards:

0 - will destroy both the item and the cards.
1 - will keep the item, but destroy the cards.
2 - will keep the cards, but destroy the item.

Whatever the type is, it will also show a failure effect on screen.

For a list of equipment slots see getequipid.

<example_code>
// Destroy both item and cards from the equipped weapon
failedremovecards EQI_HAND_R, 0;
</example_code>
<example_code>
// Keep the item but destroy the cards from the equipped armor
failedremovecards EQI_ARMOR, 1;
</example_code>
<example_code>
// Keep the cards but destroy the item from another character's headgear
failedremovecards EQI_HEAD_TOP, 2, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*repair <broken item number>{,<char_id>};
</syntax>

<description>
This command repairs a broken piece of equipment, using the same list of broken items as available through getbrokenid.

<example_code>
// Repair the first broken item in the player's inventory
repair 1;
</example_code>
<example_code>
// Repair the second broken item
repair 2;
</example_code>
<example_code>
// Repair the first broken item for another character
repair 1, 150001;
</example_code>
<example_code>
// Check if there are broken items and repair them all
.@count = 1;
while (getbrokenid(.@count)) {
    repair .@count;
    .@count++;
}
mes "All broken items have been repaired.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*repairall {<char_id>};
</syntax>

<description>
This command repairs all broken equipment in the attached player's inventory. A repair effect will be shown if any items are repaired, else the command will end silently.

<example_code>
// Repair all broken items for attached player
repairall;
</example_code>
<example_code>
// Repair all broken items for another character
repairall 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*successrefitem <equipment slot>{,<count>{,<char_id>}};
</syntax>

<description>
This command will refine an item in the specified equipment slot of the invoking character by +1, or by the count if given. For a list of equipment slots see getequipid. This command will also display a refine success effect on the character and put appropriate messages into their chat window. It will also give the character fame points if a weapon reached +10 this way, even though these will only take effect for blacksmiths who will later forge a weapon.

<example_code>
// Refine the equipped weapon by +1
successrefitem EQI_HAND_R;
</example_code>
<example_code>
// Refine the equipped armor by +3
successrefitem EQI_ARMOR, 3;
</example_code>
<example_code>
// Refine another character's headgear by +2
successrefitem EQI_HEAD_TOP, 2, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*failedrefitem <equipment slot>{,<char_id>};
</syntax>

<description>
This command will fail to refine an item in the specified equipment slot of the invoking character. The item will be destroyed. This will also display a refine failure effect on the character and put appropriate messages into their chat window.

For a list of equipment slots see getequipid.

<example_code>
// Fail to refine the equipped weapon (destroys it)
failedrefitem EQI_HAND_R;
</example_code>
<example_code>
// Fail to refine another character's armor
failedrefitem EQI_ARMOR, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*downrefitem <equipment slot>{,<count>{,<char_id>}};
</syntax>

<description>
This command will downgrade an item in the specified equipment slot of the invoking character by -1, or by the count if given. For a list of equipment slots see getequipid. This command will also display a refine failure effect on the character and put appropriate messages into their chat window.

<example_code>
// Downgrade the equipped weapon by -1
downrefitem EQI_HAND_R;
</example_code>
<example_code>
// Downgrade the equipped armor by -3
downrefitem EQI_ARMOR, 3;
</example_code>
<example_code>
// Downgrade another character's headgear by -2
downrefitem EQI_HEAD_TOP, 2, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unequip <equipment slot>{,<char_id>};
</syntax>

<description>
This command will unequip whatever is currently equipped in the invoking character's specified equipment slot. For a full list of possible equipment slots see getequipid.

If an item occupies several equipment slots, it will get unequipped from all of them.

<example_code>
// Unequip the character's weapon
unequip EQI_HAND_R;
</example_code>
<example_code>
// Unequip the character's armor
unequip EQI_ARMOR;
</example_code>
<example_code>
// Unequip another character's headgear
unequip EQI_HEAD_TOP, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*delequip <equipment slot>{,<char_id>};
</syntax>

<description>
This command will destroy whatever is currently equipped in the invoking character's specified equipment slot. For a full list of possible equipment slots see getequipid.

This command will return 1 if an item was deleted and 0 otherwise.

<example_code>
// Destroy the character's weapon
delequip EQI_HAND_R;
</example_code>
<example_code>
// Destroy the character's armor and check result
if (delequip(EQI_ARMOR))
    mes "Your armor has been destroyed.";
else
    mes "Nothing was equipped there.";
</example_code>
<example_code>
// Destroy another character's headgear
delequip EQI_HEAD_TOP, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*breakequip <equipment slot>{,<char_id>};
</syntax>

<description>
This command will break and unequip whatever is currently equipped in the invoking character's specified equipment slot. For a full list of possible equipment slots see getequipid.

This command will return 1 if an item was broken and 0 otherwise.

<example_code>
// Break the character's weapon
breakequip EQI_HAND_R;
</example_code>
<example_code>
// Break the character's armor and check result
if (breakequip(EQI_ARMOR))
    mes "Your armor has been broken.";
else
    mes "Nothing was equipped there.";
</example_code>
<example_code>
// Break another character's headgear
breakequip EQI_HEAD_TOP, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*clearitem {<char_id>};
</syntax>

<description>
This command will destroy all items the invoking character has in their inventory (including equipped items). It will not affect anything else, like storage or cart.

<example_code>
// Destroy all items in attached player's inventory
clearitem;
</example_code>
<example_code>
// Destroy all items in another character's inventory
clearitem 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*equip <item id>{,<char_id>};

*autoequip <item id>,<option>;
</syntax>

<description>
These commands are used to equip equipment on the attached character.

The equip function will equip the given item ID when the player has this item in their inventory.

The autoequip function will equip the given item ID when it is looted. The option parameter is 1 or 0: 1 to turn it on, and 0 to turn it off.

<example_code>
// This will equip a falchion (1104) on the character if it is in the inventory
equip 1104;
</example_code>
<example_code>
// The invoked character will now automatically equip a falchion when it's looted
autoequip 1104, 1;
</example_code>
<example_code>
// The invoked character will no longer automatically equip a falchion
autoequip 1104, 0;
</example_code>
<example_code>
// Equip an item on another character
equip 1201, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*autoequip <item id>,<option>;

*equip <item id>{,<char_id>};
</syntax>

<description>
These commands are used to equip equipment on the attached character.

The equip function will equip the given item ID when the player has this item in their inventory.

The autoequip function will equip the given item ID when it is looted. The option parameter is 1 or 0: 1 to turn it on, and 0 to turn it off.

<example_code>
// This will equip a falchion (1104) on the character if it is in the inventory
equip 1104;
</example_code>
<example_code>
// The invoked character will now automatically equip a falchion when it's looted
autoequip 1104, 1;
</example_code>
<example_code>
// The invoked character will no longer automatically equip a falchion
autoequip 1104, 0;
</example_code>
<example_code>
// Equip an item on another character
equip 1201, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*buyingstore <slots>;
</syntax>

<description>
Invokes the buying store preparation window like the skill Open Buying Store, without the item requirement. The number of slots is limited by the server to a maximum of 5 slots by default.

<example_code>
// Gives the player the opportunity to buy 4 different kinds of items
buyingstore 4;
</example_code>
<example_code>
// Opens a buying store with 3 slots
buyingstore 3;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*searchstores <uses>,<effect>{,"<map name>"};
</syntax>

<description>
Invokes the store search window, which allows searching for both vending and buying stores.

Parameter <uses> indicates how many searches can be started before the window has to be reopened.

Parameter <effect> affects what happens when a result item is double-clicked and can be one of the following:

SEARCHSTORE_EFFECT_NORMAL : Shows the store's position on the mini-map and highlights the shop sign with yellow color, when the store is on the same map as the invoking player.
SEARCHSTORE_EFFECT_REMOTE : Directly opens the shop, regardless of distance.

Optional parameter <map name> indicates the name of the map where the stores will be searched. If not set, the search will be on the map the invoking character is currently on. Special values for <map name> are:

"this" : Will search for stores on the map where the invoking character is currently on (default)
"all"  : Will search for stores on all maps

<example_code>
// Item Vending_Search_Scroll (10 uses, effect: show mark on minimap, current map)
searchstores 10, SEARCHSTORE_EFFECT_NORMAL;
</example_code>
<example_code>
// Search stores (1 use, effect: open shop, all maps on the server)
searchstores 1, SEARCHSTORE_EFFECT_REMOTE, "all";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*enable_command;

*disable_command;
</syntax>

<description>
These commands toggle the ability to use atcommands while interacting with an NPC.

The default setting, atcommand_disable_npc, is defined in conf/battle/gm.conf.

<example_code>
// Allow atcommands during this NPC interaction
enable_command;

mes "[GM Helper]";
mes "You may use commands while talking to me.";
close;
</example_code>
<example_code>
// Disallow atcommands during this NPC interaction
disable_command;

mes "[Security NPC]";
mes "Commands are disabled while we talk.";
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*disable_command;

*enable_command;
</syntax>

<description>
These commands toggle the ability to use atcommands while interacting with an NPC.

The default setting, atcommand_disable_npc, is defined in conf/battle/gm.conf.

<example_code>
// Allow atcommands during this NPC interaction
enable_command;

mes "[GM Helper]";
mes "You may use commands while talking to me.";
close;
</example_code>
<example_code>
// Disallow atcommands during this NPC interaction
disable_command;

mes "[Security NPC]";
mes "Commands are disabled while we talk.";
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*openstorage;
</syntax>

<description>
This will open the character's Kafra storage window on the client connected to the invoking character. It can be used from any kind of NPC or item script, not just limited to Kafra Staff.

The storage window opens regardless of whether there are open NPC dialogs or not, but it is preferred to close the dialog before displaying the storage window, to avoid any disruption when both windows overlap.

<example_code>
mes "Close this window to open your storage.";
close2;
openstorage;
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*openstorage2 <storage_id>{,<mode>{,<account_id>}};
</syntax>

<description>
Just like the openstorage command, except this command can open additional storages by the specified <storage_id>. For <storage_id>, please read the conf/inter_server.yml for storage groups.

Values for <mode> are:
STOR_MODE_NONE : Player can only read the storage entries.
STOR_MODE_GET  : Player can get items from the storage.
STOR_MODE_PUT  : Player can put items in the storage.
STOR_MODE_ALL  : Player can get and put items in the storage. (default)

<example_code>
if (vip_status(VIP_STATUS_ACTIVE)) {
    mes "I will open your Premium storage.";
    mes "Thank you for using our service.";
    close2;
    openstorage2 1;
} else {
    mes "Sorry, your Premium status is expired.";
    mes "Storage will be opened but you can't put any item into it.";
    close2;
    openstorage2 1, STOR_MODE_GET;
}
end;
</example_code>
<example_code>
// Open storage with ID 2 in read-only mode
openstorage2 2, STOR_MODE_NONE;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*openmail({<char_id>});
</syntax>

<description>
This will open a character's Mail window on the client connected to the invoking character.

This command is not supported for PACKETVER 20150513 or newer.

<example_code>
mes "Close this window to open your mail inbox.";
close2;
openmail;
end;
</example_code>
<example_code>
// Open mail for another character
openmail 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mail <destination id>,"<sender name>","<title>","<body>"{,<zeny>{,<item id array>,<item amount array>{,refine{,bound{,<item card0 array>{,<item card1 array>{,<item card2 array>{,<item card3 array>
{,<random option id0 array>, <random option value0 array>, <random option paramter0 array>{,<random option id1 array>, <random option value1 array>, <random option paramter1 array>
{,<random option id2 array>, <random option value2 array>, <random option paramter2 array>{,<random option id3 array>, <random option value3 array>, <random option paramter3 array>
{,<random option id4 array>, <random option value4 array>, <random option paramter4 array>}}}}}}}}}};
</syntax>

<description>
This command will send mail to the <destination id> which is a character ID. A <sender name> can be specified but does not have to be from the direct creator of the mail and is limited to NAME_LENGTH (24) characters. Mail <title> is limited to MAIL_TITLE_LENGTH (40) characters. Mail <body> is limited to MAIL_BODY_LENGTH (200) characters for PACKETVER < 20150513 or 500 characters for later clients.

Optional <zeny> and item data can be added to the mail as well. PACKETVER < 20150513 is limited to 1 item while later clients are limited to MAIL_MAX_ITEM (5).

The <item id array>, <item amount array>, <item card0 array>, <item card1 array>, <item card2 array>, and <item card3 array> should all be integer arrays.

For random options there can be 5 arrays in pairs of 3 (ids, values, parameters) right after the cards. All of these arrays shall be integer arrays as well.

<example_code>
// Example of sending mail with zeny
.@charid = getcharid(0);
.@sender$ = "Poring";
.@title$ = "Welcome";
.@body$ = "Hi! I'm a simple Poring from the Prontera fields! Welcome to Ragnarok!";
.@zeny = 5000;
mail .@charid, .@sender$, .@title$, .@body$, .@zeny;
</example_code>
<example_code>
// Example of sending mail with items
.@charid = getcharid(0);
.@sender$ = "Angeling";
.@title$ = "Welcome";
.@body$ = "Hi! I'm a simple Angeling from the Prontera fields! Welcome to Ragnarok!";
.@zeny = 0;
setarray .@mailitem[0], 504, 505, 2220, 1214; // White Potion, Blue Potion, Hat, Dagger
setarray .@mailamount[0], 10, 5, 1, 1; // 10 White Potions, 5 Blue Potions, 1 Hat, 1 Dagger
setarray .@mailrefine[0], 0, 0, 3, 10; // +3 Hat, +10 Dagger
setarray .@mailbound[0], 0, 0, Bound_Account, Bound_Char; // Account bounded Hat, Char bounded Dagger
setarray .@mailcard0[0], 0, 0, 4198, 4092; // Attach Maya Purple Card to the Hat, Attach Skeleton Worker Card to Dagger
setarray .@mailcard1[0], 0, 0, 0, 4092; // Attach Skeleton Worker Card to Dagger
setarray .@mailcard2[0], 0, 0, 0, 4092; // Attach Skeleton Worker Card to Dagger
mail .@charid, .@sender$, .@title$, .@body$, .@zeny, .@mailitem, .@mailamount, .@mailrefine, .@mailbound, .@mailcard0, .@mailcard1, .@mailcard2;
</example_code>
<example_code>
// Example of sending mail with items and random options
.@charid = getcharid(0);
.@sender$ = "Angeling";
.@title$ = "Welcome";
.@body$ = "Hi! I'm a simple Angeling from the Prontera fields! Welcome to Ragnarok!";
.@zeny = 0;
setarray .@mailitem[0], 504, 505, 2220, 1214; // White Potion, Blue Potion, Hat, Dagger
setarray .@mailamount[0], 10, 5, 1, 1; // 10 White Potions, 5 Blue Potions, 1 Hat, 1 Dagger
setarray .@mailrefine[0], 0, 0, 3, 10; // +3 Hat, +10 Dagger
setarray .@mailbound[0], 0, 0, Bound_Account, Bound_Char; // Account bounded Hat, Char bounded Dagger
setarray .@mailcard0[0], 0, 0, 4198, 4092; // Attach Maya Purple Card to the Hat, Attach Skeleton Worker Card to Dagger
setarray .@mailcard1[0], 0, 0, 0, 4092; // Attach Skeleton Worker Card to Dagger
setarray .@mailcard2[0], 0, 0, 0, 4092; // Attach Skeleton Worker Card to Dagger
setarray .@mailcard3[0], 0, 0, 0, 0; // Empty last slot
setarray .@mailrndopt_id0[0], 0, 0, 0, RDMOPT_VAR_MAXHPAMOUNT; // Enchant the Dagger with increased HP option
setarray .@mailrndopt_val0[0], 0, 0, 0, 1000; // Enchant the Dagger with increased HP option by 1000 points
setarray .@mailrndopt_prm0[0], 0, 0, 0, 0; // Enchant the Dagger with increased HP option - does not need any parameter
mail .@charid, .@sender$, .@title$, .@body$, .@zeny, .@mailitem, .@mailamount, .@mailrefine, .@mailbound, .@mailcard0, .@mailcard1, .@mailcard2, .@mailcard3, .@mailrndopt_id0, .@mailrndopt_val0, .@mailrndopt_prm0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*openauction({<char_id>});
</syntax>

<description>
This will open the Auction window on the client connected to the invoking character.

<example_code>
mes "Close this window to open the Auction window.";
close2;
openauction;
end;
</example_code>
<example_code>
// Open auction window for another character
openauction 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guildopenstorage()
</syntax>

<description>
This function works the same as openstorage but will open a guild storage window instead for the guild storage of the guild the invoking character belongs to.

Return values:
GSTORAGE_OPEN - Successfully opened.
GSTORAGE_STORAGE_ALREADY_OPEN - Player storage is already open.
GSTORAGE_ALREADY_OPEN - Guild storage is already open.
GSTORAGE_NO_GUILD - Player is not in a guild.
GSTORAGE_NO_STORAGE - Guild hasn't invested in the Guild Storage Expansion skill (only if OFFICIAL_GUILD_STORAGE is enabled).
GSTORAGE_NO_PERMISSION - Player doesn't have permission to use the guild storage.

<example_code>
.@result = guildopenstorage();
switch (.@result) {
    case GSTORAGE_OPEN:
        mes "Guild storage opened successfully.";
        break;
    case GSTORAGE_NO_GUILD:
        mes "You are not in a guild.";
        break;
    case GSTORAGE_NO_PERMISSION:
        mes "You don't have permission to use the guild storage.";
        break;
    default:
        mes "Could not open guild storage.";
}
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guildopenstorage_log({<char id>})
</syntax>

<description>
Opens the guild storage log window for the attached character or the given character ID.

Possible return values:
GUILDSTORAGE_LOG_FINAL_SUCCESS - Window was opened successfully.
GUILDSTORAGE_LOG_EMPTY - Window was not opened, because no entries exist.
GUILDSTORAGE_LOG_FAILED - Some database error occurred.

<example_code>
.@result = guildopenstorage_log();
switch (.@result) {
    case GUILDSTORAGE_LOG_FINAL_SUCCESS:
        mes "Guild storage log opened.";
        break;
    case GUILDSTORAGE_LOG_EMPTY:
        mes "No log entries found.";
        break;
    case GUILDSTORAGE_LOG_FAILED:
        mes "Failed to open guild storage log.";
        break;
}
close;
</example_code>
<example_code>
// Open guild storage log for another character
guildopenstorage_log(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guild_has_permission(<permission>{,<char id>})
</syntax>

<description>
Checks if the attached player or the player with the given character ID has the given permission(s). Permission can be a bitmask and allows the use of multiple values at the same time. Returns true if the player has all of the given permissions or false if the player misses at least one of the given permissions or is not in a guild at all.

Available permissions are:
GUILD_PERM_INVITE   - If a player is allowed to invite other players.
GUILD_PERM_EXPEL    - If a player is allowed to expel other guild members.
GUILD_PERM_STORAGE  - If a player is allowed to access the guild storage.
GUILD_PERM_ALL      - A combination of all permissions above.

<example_code>
// Check if player can access guild storage
if (guild_has_permission(GUILD_PERM_STORAGE))
    mes "You can access the guild storage.";
else
    mes "You do not have permission to access the guild storage.";
</example_code>
<example_code>
// Check multiple permissions
if (guild_has_permission(GUILD_PERM_INVITE | GUILD_PERM_EXPEL))
    mes "You can invite and expel guild members.";
</example_code>
<example_code>
// Check another character's permissions
if (guild_has_permission(GUILD_PERM_ALL, 150001))
    mes "That player has all guild permissions.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guildchangegm(<guild id>,<new master's name>)
</syntax>

<description>
This function will change the Guild Master of a guild. The ID is the guild's ID, and the new guild master's name must be passed.

Returns 1 on success, 0 otherwise.

<example_code>
// Change guild master of guild 10007 to "Aaron"
if (guildchangegm(10007, "Aaron"))
    mes "Guild master changed successfully!";
else
    mes "Failed to change guild master.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guildgetexp <amount>;
</syntax>

<description>
This will give the specified amount of guild experience points to the guild the invoking character belongs to. It will silently fail if they do not belong to any guild.

<example_code>
// Give 1000 guild EXP to the player's guild
guildgetexp 1000;
</example_code>
<example_code>
// Give 5000 guild EXP as a quest reward
guildgetexp 5000;
mes "Your guild has received 5000 EXP!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guildskill <skill id>,<level>

*guildskill "<skill name>",<level>
</syntax>

<description>
This command will bump up the specified guild skill by the specified number of levels. This refers to the invoking character and will only work if the invoking character is a member of a guild AND its guild master, otherwise no failure message will be given and no error will occur, but nothing will happen - same about the guild skill trying to exceed the possible maximum. The full list of guild skills is available in db/(pre-)re/skill_db.yml; these are all the GD_ skills at the end.

<example_code>
// This would give your character's guild one level of Approval (GD_APPROVAL ID 10000)
// Notice that if you try to add two levels of Approval, or add Approval when the
// guild already has it, it will only have one level of Approval afterwards.
guildskill 10000, 1;
</example_code>
<example_code>
// Using skill name
guildskill "GD_APPROVAL", 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*resetlvl <action type>{,<char_id>};
</syntax>

<description>
This is a character reset command, meant mostly for rebirth script supporting Advanced jobs, which will reset the invoking character's stats and level depending on the action type given. Valid action types are:

1 - Base level 1, Job level 1, 0 skill points, 0 base exp, 0 job exp, wipes the status effects (only the ones settable by setoption), sets all stats to 1. If the new job is Novice High, give 100 status points, give First Aid and Play Dead skills.
2 - Base level 1, Job level 1, 0 skill points, 0 base exp, 0 job exp. Skills and attribute values are not altered.
3 - Base level 1, base exp 0. Nothing else is changed.
4 - Job level 1, job exp 0. Nothing else is changed.

In all cases, everything the character has on will be unequipped.

Even though it doesn't return a value, it is used as a function in the official rebirth scripts.

<example_code>
// Full reset (action type 1) for attached player
resetlvl 1;
</example_code>
<example_code>
// Reset only base level (action type 3)
resetlvl 3;
</example_code>
<example_code>
// Reset job level for another character
resetlvl 4, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*resetstatus({<char_id>});
</syntax>

<description>
This is a character reset command, which will reset the stats on the invoking character and give back all the stat points used to raise them previously. Nothing will happen to any other numbers about the character.

Used in reset NPCs (duh!).

<example_code>
// Reset stats for attached player
resetstatus;
mes "Your stats have been reset.";
</example_code>
<example_code>
// Reset stats for another character
resetstatus 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*resetfeel({<char_id>});
</syntax>

<description>
This command will reset the Star Gladiator's designated maps on the invoking character. Only works on Star Gladiator and Star Emperor classes.

<example_code>
// Reset designated maps for attached player
resetfeel;
mes "Your designated maps have been reset.";
</example_code>
<example_code>
// Reset designated maps for another character
resetfeel 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*resethate({<char_id>});
</syntax>

<description>
This command will reset the Star Gladiator's designated monsters on the invoking character. Only works on Star Gladiator and Star Emperor classes.

<example_code>
// Reset designated monsters for attached player
resethate;
mes "Your designated monsters have been reset.";
</example_code>
<example_code>
// Reset designated monsters for another character
resethate 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sc_start <effect type>,<ticks>,<value 1>{,<rate>,<flag>{,<GID>}};

*sc_start2 <effect type>,<ticks>,<value 1>,<value 2>{,<rate>,<flag>{,<GID>}};

*sc_start4 <effect type>,<ticks>,<value 1>,<value 2>,<value 3>,<value 4>{,<rate>,<flag>{,<GID>}};

*sc_end <effect type>{,<GID>};

*sc_end_class {<char_id>{,<job_id>}};
</syntax>

<description>
These commands will bestow a status effect on a character.

The <effect type> determines which status is invoked. This can be either a number or constant, with the common statuses (mostly negative) found in src/map/script_constants.hpp with the SC_ prefix. A full list is located in src/map/status.hpp, though they are not currently documented.

The duration of the status is given in <ticks>, or milliseconds. Use INFINITE_TICK for infinite duration.

Certain status changes take an additional parameter <value 1>, which typically modifies player stats by the given number or percentage. This differs for each status, and is sometimes zero.

Optional value <rate> is the chance that the status will be invoked (100 = 1%). This is used primarily in item scripts. When used in an NPC script, a flag MUST be defined for the rate to work.

Optional value <flag> is how the status change start will be handled (a bitmask):
SCSTART_NOAVOID   : Status change cannot be avoided.
SCSTART_NOTICKDEF : Tick cannot be reduced by stats (default).
SCSTART_LOADED    : sc_data loaded, so no value will be altered.
SCSTART_NORATEDEF : Rate cannot be reduced.
SCSTART_NOICON    : Status icon won't be sent to client

If a <GID> is given, the status change will be invoked on the specified character instead of the one attached to the script. This can only be defined after setting a rate and flag.

sc_start2 and sc_start4 allow extra parameters to be passed, and are used only for effects that require them. The meaning of the extra values vary depending on the effect type. For more info, read status_change.txt containing a list of all Status Changes and their val1, val2, val3, and val4 usage in source.

sc_end will remove a specified status effect. If SC_ALL (-1) is given, it will perform a complete removal of all statuses (although permanent ones will re-apply).

sc_end_class works like sc_end but will remove all status effects from any learned skill on the invoking character. If <job_id> is provided it will end the effect for that job.

Note: to use SC_NOCHAT you should alter Manner:
set Manner, -5; // Will mute a user for 5 minutes
set Manner, 0;  // Will unmute a user
set Manner, 5;  // Will unmute a user and prevent the next use of 'Manner'

<example_code>
// This will poison the invoking character for 10 minutes at 50% chance
sc_start SC_POISON, 600000, 0, 5000;
</example_code>
<example_code>
// This will bestow the effect of Level 10 Blessing
sc_start SC_BLESSING, 240000, 10;
</example_code>
<example_code>
// Adjust element resistance by percentage. Sample with Resist_Fire item script:
// val1: Water resistance
// val2: Earth resistance
// val3: Fire resistance
// val4: Wind resistance
sc_start4 SC_ARMOR_ELEMENT, 1200000, -15, 0, 20, 0;
</example_code>
<example_code>
// This will end the Freezing status for the invoking character
sc_end SC_FREEZE;
</example_code>
<example_code>
// This will end the effect of any learned skill for the invoking character
sc_end_class;
</example_code>
<example_code>
// This will end the effect of any learned skill for the character with char_id 150000
sc_end_class(150000);
</example_code>
<example_code>
// This will end the effect of any Arch Bishop skill for the invoking character
sc_end_class(getcharid(0), Job_Arch_Bishop);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sc_start2 <effect type>,<ticks>,<value 1>,<value 2>{,<rate>,<flag>{,<GID>}};

*sc_end <effect type>{,<GID>};
    
*sc_end_class {<char_id>{,<job_id>}};
</syntax>

<description>
These commands will bestow a status effect on a character.

The <effect type> determines which status is invoked. This can be either a number or constant, with the common statuses (mostly negative) found in src/map/script_constants.hpp with the SC_ prefix. A full list is located in src/map/status.hpp, though they are not currently documented.

The duration of the status is given in <ticks>, or milliseconds. Use INFINITE_TICK for infinite duration.

Certain status changes take an additional parameter <value 1>, which typically modifies player stats by the given number or percentage. This differs for each status, and is sometimes zero.

Optional value <rate> is the chance that the status will be invoked (100 = 1%). This is used primarily in item scripts. When used in an NPC script, a flag MUST be defined for the rate to work.

Optional value <flag> is how the status change start will be handled (a bitmask):
SCSTART_NOAVOID   : Status change cannot be avoided.
SCSTART_NOTICKDEF : Tick cannot be reduced by stats (default).
SCSTART_LOADED    : sc_data loaded, so no value will be altered.
SCSTART_NORATEDEF : Rate cannot be reduced.
SCSTART_NOICON    : Status icon won't be sent to client

If a <GID> is given, the status change will be invoked on the specified character instead of the one attached to the script. This can only be defined after setting a rate and flag.

sc_start2 and sc_start4 allow extra parameters to be passed, and are used only for effects that require them. The meaning of the extra values vary depending on the effect type. For more info, read status_change.txt containing a list of all Status Changes and their val1, val2, val3, and val4 usage in source.

sc_end will remove a specified status effect. If SC_ALL (-1) is given, it will perform a complete removal of all statuses (although permanent ones will re-apply).

sc_end_class works like sc_end but will remove all status effects from any learned skill on the invoking character. If <job_id> is provided it will end the effect for that job.

Note: to use SC_NOCHAT you should alter Manner:
set Manner, -5; // Will mute a user for 5 minutes
set Manner, 0;  // Will unmute a user
set Manner, 5;  // Will unmute a user and prevent the next use of 'Manner'

<example_code>
// This will poison the invoking character for 10 minutes at 50% chance
sc_start SC_POISON, 600000, 0, 5000;
</example_code>
<example_code>
// This will bestow the effect of Level 10 Blessing
sc_start SC_BLESSING, 240000, 10;
</example_code>
<example_code>
// Adjust element resistance by percentage. Sample with Resist_Fire item script:
// val1: Water resistance
// val2: Earth resistance
// val3: Fire resistance
// val4: Wind resistance
sc_start4 SC_ARMOR_ELEMENT, 1200000, -15, 0, 20, 0;
</example_code>
<example_code>
// This will end the Freezing status for the invoking character
sc_end SC_FREEZE;
</example_code>
<example_code>
// This will end the effect of any learned skill for the invoking character
sc_end_class;
</example_code>
<example_code>
// This will end the effect of any learned skill for the character with char_id 150000
sc_end_class(150000);
</example_code>
<example_code>
// This will end the effect of any Arch Bishop skill for the invoking character
sc_end_class(getcharid(0), Job_Arch_Bishop);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sc_start4 <effect type>,<ticks>,<value 1>,<value 2>,<value 3>,<value 4>{,<rate>,<flag>{,<GID>}};

*sc_end <effect type>{,<GID>};
    
*sc_end_class {<char_id>{,<job_id>}};
</syntax>

<description>
These commands will bestow a status effect on a character.

The <effect type> determines which status is invoked. This can be either a number or constant, with the common statuses (mostly negative) found in src/map/script_constants.hpp with the SC_ prefix. A full list is located in src/map/status.hpp, though they are not currently documented.

The duration of the status is given in <ticks>, or milliseconds. Use INFINITE_TICK for infinite duration.

Certain status changes take an additional parameter <value 1>, which typically modifies player stats by the given number or percentage. This differs for each status, and is sometimes zero.

Optional value <rate> is the chance that the status will be invoked (100 = 1%). This is used primarily in item scripts. When used in an NPC script, a flag MUST be defined for the rate to work.

Optional value <flag> is how the status change start will be handled (a bitmask):
SCSTART_NOAVOID   : Status change cannot be avoided.
SCSTART_NOTICKDEF : Tick cannot be reduced by stats (default).
SCSTART_LOADED    : sc_data loaded, so no value will be altered.
SCSTART_NORATEDEF : Rate cannot be reduced.
SCSTART_NOICON    : Status icon won't be sent to client

If a <GID> is given, the status change will be invoked on the specified character instead of the one attached to the script. This can only be defined after setting a rate and flag.

sc_start2 and sc_start4 allow extra parameters to be passed, and are used only for effects that require them. The meaning of the extra values vary depending on the effect type. For more info, read status_change.txt containing a list of all Status Changes and their val1, val2, val3, and val4 usage in source.

sc_end will remove a specified status effect. If SC_ALL (-1) is given, it will perform a complete removal of all statuses (although permanent ones will re-apply).

sc_end_class works like sc_end but will remove all status effects from any learned skill on the invoking character. If <job_id> is provided it will end the effect for that job.

Note: to use SC_NOCHAT you should alter Manner:
set Manner, -5; // Will mute a user for 5 minutes
set Manner, 0;  // Will unmute a user
set Manner, 5;  // Will unmute a user and prevent the next use of 'Manner'

<example_code>
// This will poison the invoking character for 10 minutes at 50% chance
sc_start SC_POISON, 600000, 0, 5000;
</example_code>
<example_code>
// This will bestow the effect of Level 10 Blessing
sc_start SC_BLESSING, 240000, 10;
</example_code>
<example_code>
// Adjust element resistance by percentage. Sample with Resist_Fire item script:
// val1: Water resistance
// val2: Earth resistance
// val3: Fire resistance
// val4: Wind resistance
sc_start4 SC_ARMOR_ELEMENT, 1200000, -15, 0, 20, 0;
</example_code>
<example_code>
// This will end the Freezing status for the invoking character
sc_end SC_FREEZE;
</example_code>
<example_code>
// This will end the effect of any learned skill for the invoking character
sc_end_class;
</example_code>
<example_code>
// This will end the effect of any learned skill for the character with char_id 150000
sc_end_class(150000);
</example_code>
<example_code>
// This will end the effect of any Arch Bishop skill for the invoking character
sc_end_class(getcharid(0), Job_Arch_Bishop);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sc_end <effect type>{,<GID>};
</syntax>

<description>
This command will remove a specified status effect from a character. If SC_ALL (-1) is given, it will perform a complete removal of all statuses (although permanent ones will re-apply).

<example_code>
// This will end the Freezing status for the invoking character
sc_end SC_FREEZE;
</example_code>
<example_code>
// This will end the Poison status for another character
sc_end SC_POISON, 150001;
</example_code>
<example_code>
// This will remove all status effects from the invoking character
sc_end SC_ALL;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sc_end_class {<char_id>{,<job_id>}};
</syntax>

<description>
This command works like sc_end but will remove all status effects from any learned skill on the invoking character. If <job_id> is provided, it will end the effect for that job.

<example_code>
// This will end the effect of any learned skill for the invoking character
sc_end_class;
</example_code>
<example_code>
// This will end the effect of any learned skill for the character with char_id 150000
sc_end_class(150000);
</example_code>
<example_code>
// This will end the effect of any Arch Bishop skill for the invoking character
sc_end_class(getcharid(0), Job_Arch_Bishop);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getstatus(<effect type>{,<type>{,<char_id>}})
</syntax>

<description>
Retrieves information about a specific status effect when called. Depending on <type> specified, the function will return different information.

Possible <type> values:
- 0 or undefined: whether the status is active
- 1: the val1 of the status
- 2: the val2 of the status
- 3: the val3 of the status
- 4: the val4 of the status
- 5: the amount of time in milliseconds that the status has remaining

If <type> is not defined or is set to 0, then the script function will return 1 if the status is active, or 0 if the status is not active. If the status is not active when any of the <type> fields are provided, this script function will always return 0.

<example_code>
// Check if the player has Blessing active
if (!getstatus(SC_BLESSING)) {
    mes "[Blessing Check]";
    mes "You are not currently blessed.";
} else {
    mes "[Blessing Check]";
    mes "You are blessed!";
}
close;
</example_code>
<example_code>
// Get remaining time of Blessing in seconds
.@time = getstatus(SC_BLESSING, 5) / 1000;
mes "Blessing will expire in " + .@time + " seconds.";

// Get val1 of Blessing (skill level)
.@level = getstatus(SC_BLESSING, 1);
mes "Blessing level: " + .@level;

// Check another character's status
if (getstatus(SC_POISON, 0, 150001))
    mes "That character is poisoned!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*skilleffect <skill id>,<number>{,<game ID>};

*skilleffect "<skill name>",<number>{,<game ID>};
</syntax>

<description>
This command displays visual and aural effects of a given skill on the currently attached character or, when defined, on any unit with the given ID. The number parameter is for skills whose visual effect involves displaying a number (healing or damaging). Note that this command will not actually use the skill; it is intended for scripts which simulate skill usage by the NPC, such as buffs, by setting appropriate status and displaying the skill's effect.

<example_code>
mes "Be blessed!";
// Heal of 2000 HP
heal 2000, 0;
skilleffect 28, 2000;
// Blessing Level 10
sc_start SC_BLESSING, 240000, 10;
skilleffect 34, 0;
// Increase AGI Level 5
sc_start SC_INCREASEAGI, 140000, 5;
skilleffect 29, 0;
</example_code>
<example_code>
// Using skill name
skilleffect "AL_HEAL", 1500;
</example_code>
<example_code>
// Display effect on a specific unit
skilleffect 34, 0, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npcskilleffect <skill id>,<number>,<x>,<y>;

*npcskilleffect "<skill name>",<number>,<x>,<y>;
</syntax>

<description>
This command behaves identically to skilleffect, however, ground type skill effects will be centered at the map coordinates given on the same map as the attached character, and all other skill types will be centered on the attached character.

<example_code>
// Display a ground skill effect at coordinates (150, 100) on the current map
npcskilleffect 81, 0, 150, 100;  // 81 = Safety Wall
</example_code>
<example_code>
// Using skill name
npcskilleffect "MG_FIREBALL", 0, 100, 200;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*specialeffect <effect number>{,<send_target>{,"<NPC Name>"}};
</syntax>

<description>
This command will display a special effect with the given number, centered on the specified NPC's coordinates, if any. For a full list of special effect numbers known, see doc/effect_list.txt. Some effect numbers are known not to work in some client releases (notably, rain is absent from any client executables released after April 2005).

<NPC name> parameter will display <effect number> on another NPC. If the NPC specified does not exist, the command will do nothing. When specifying an NPC, <send_target> must be specified; specifying AREA will retain the default behavior of the command.

<example_code>
// This will make the NPC "John Doe#1"
// show the effect EF_HIT1 specified by
// Jane Doe. I wonder what John did...
mes "[Jane Doe]";
mes "Well, I never!";
specialeffect EF_HIT1, AREA, "John Doe#1";
close;
</example_code>
<example_code>
// Display effect on attached player
specialeffect EF_HEAL2;
</example_code>
<example_code>
// Display effect to self only
specialeffect EF_POTION2, SELF;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*specialeffect2 <effect number>{,<send_target>{,"<Player Name>"}};
</syntax>

<description>
This command behaves identically to specialeffect, but the effect will be centered on the invoking character's sprite.

<Player name> parameter will display <effect number> on another player than the one currently attached to the script. Like with specialeffect, when specifying a player, <send_target> must be supplied; specifying AREA will retain the default behavior of the command.

<example_code>
// Display effect on the attached player
specialeffect2 EF_HEAL;
</example_code>
<example_code>
// Display effect on another player
specialeffect2 EF_POTION, AREA, "Aaron";
</example_code>
<example_code>
// Display effect to self only on the attached player
specialeffect2 EF_REPAIRWEAPON, SELF;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*removespecialeffect <effect number>{,<send_target>{,"<NPC Name>"}};
</syntax>

<description>
Works for 2018-10-02+ clients. This command behaves with the same parameters as specialeffect, but is used to remove an effect with <effect number> from the invoking NPC.

<example_code>
// Remove effect from the attached NPC
removespecialeffect EF_HIT1, AREA, "John Doe#1";
</example_code>
<example_code>
// Remove effect from attached player (using specialeffect2 equivalent behavior)
removespecialeffect EF_HEAL, SELF;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*removespecialeffect2 <effect number>{,<send_target>{,"<Player Name>"}};
</syntax>

<description>
Works for 2018-10-02+ clients. This command behaves with the same parameters as specialeffect2, but is used to remove an effect with <effect number> from the invoking character.

<example_code>
// Remove effect from the attached player
removespecialeffect2 EF_HEAL;
</example_code>
<example_code>
// Remove effect from another player
removespecialeffect2 EF_POTION, AREA, "Aaron";
</example_code>
<example_code>
// Remove effect to self only
removespecialeffect2 EF_REPAIRWEAPON, SELF;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*statusup <stat>{,<char_id>};
</syntax>

<description>
This command will change a specified stat of the invoking character up by one permanently. Stats are to be given as a number, but you can use these constants to replace them:

<example_code>
bStr // Strength
bVit // Vitality
bInt // Intelligence
bAgi // Agility
bDex // Dexterity
bLuk // Luck
</example_code>
<example_code>
// Increase Strength by 1
statusup bStr;
</example_code>
<example_code>
// Increase Agility by 1 for another character
statusup bAgi, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*statusup2 <stat>,<amount>{,<char_id>};
</syntax>

<description>
This command will change a specified stat of the invoking character by the specified amount permanently. The amount can be negative. See statusup for the list of stat constants.

<example_code>
// This will decrease a character's Vit permanently
statusup2 bVit, -1;
</example_code>
<example_code>
// Increase Strength by 5
statusup2 bStr, 5;
</example_code>
<example_code>
// Increase Agility by 10 for another character
statusup2 bAgi, 10, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*traitstatusup <stat>{,<char_id>};
</syntax>

<description>
This command will change a specified trait stat of the invoking character up by one permanently. Trait stats are to be given as a number, but you can use these constants to replace them:

<example_code>
bPow // Power
bSta // Stamina
bWis // Wisdom
bSpl // Spell
bCon // Concentration
bCrt // Creative
</example_code>
<example_code>
// Increase Power by 1
traitstatusup bPow;
</example_code>
<example_code>
// Increase Stamina by 1 for another character
traitstatusup bSta, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*traitstatusup2 <stat>,<amount>{,<char_id>};
</syntax>

<description>
This command will change a specified trait stat of the invoking character by the specified amount permanently. The amount can be negative. See traitstatusup for the list of trait stat constants.

<example_code>
// This will decrease a character's Stamina permanently
traitstatusup2 bSta, -1;
</example_code>
<example_code>
// Increase Power by 5
traitstatusup2 bPow, 5;
</example_code>
<example_code>
// Increase Wisdom by 10 for another character
traitstatusup2 bWis, 10, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bonus <bonus type>,<val1>;

*bonus2 <bonus type>,<val1>,<val2>;

*bonus3 <bonus type>,<val1>,<val2>,<val3>;

*bonus4 <bonus type>,<val1>,<val2>,<val3>,<val4>;

*bonus5 <bonus type>,<val1>,<val2>,<val3>,<val4>,<val5>;
</syntax>

<description>
These commands are meant to be used in item scripts. They will probably work outside item scripts, but the bonus will not persist for long. They, as expected, refer only to an invoking character.

You can find the full list of possible bonuses and which command to use for each kind in doc/item_bonus.txt.

<example_code>
// bonus with 1 parameter: Increase ATK by 10
bonus bAtk, 10;
</example_code>
<example_code>
// bonus2 with 2 parameters: Increase resistance to Water element by 20%
bonus2 bSubEle, Ele_Water, 20;
</example_code>
<example_code>
// bonus3 with 3 parameters: Add a chance to cast Heal on the enemy when attacking
bonus3 bAutoSpell, "AL_HEAL", 5, 100;
</example_code>
<example_code>
// bonus4 with 4 parameters: Increase damage against Demihuman race by 10% with additional effect
bonus4 bAddRace, RC_DemiHuman, 10, 0, 0;
</example_code>
<example_code>
// bonus5 with 5 parameters: Add a chance to cast a skill with specific flags
bonus5 bAutoSpell, "MG_FIREBOLT", 5, 100, 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bonus2 <bonus type>,<val1>,<val2>;
</syntax>

<description>
These commands are meant to be used in item scripts. They will probably work outside item scripts, but the bonus will not persist for long. They, as expected, refer only to an invoking character.

You can find the full list of possible bonuses and which command to use for each kind in doc/item_bonus.txt.

<example_code>
// bonus with 1 parameter: Increase ATK by 10
bonus bAtk, 10;
</example_code>
<example_code>
// bonus2 with 2 parameters: Increase resistance to Water element by 20%
bonus2 bSubEle, Ele_Water, 20;
</example_code>
<example_code>
// bonus3 with 3 parameters: Add a chance to cast Heal on the enemy when attacking
bonus3 bAutoSpell, "AL_HEAL", 5, 100;
</example_code>
<example_code>
// bonus4 with 4 parameters: Increase damage against Demihuman race by 10% with additional effect
bonus4 bAddRace, RC_DemiHuman, 10, 0, 0;
</example_code>
<example_code>
// bonus5 with 5 parameters: Add a chance to cast a skill with specific flags
bonus5 bAutoSpell, "MG_FIREBOLT", 5, 100, 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bonus3 <bonus type>,<val1>,<val2>,<val3>;
</syntax>

<description>
These commands are meant to be used in item scripts. They will probably work outside item scripts, but the bonus will not persist for long. They, as expected, refer only to an invoking character.

You can find the full list of possible bonuses and which command to use for each kind in doc/item_bonus.txt.

<example_code>
// bonus with 1 parameter: Increase ATK by 10
bonus bAtk, 10;
</example_code>
<example_code>
// bonus2 with 2 parameters: Increase resistance to Water element by 20%
bonus2 bSubEle, Ele_Water, 20;
</example_code>
<example_code>
// bonus3 with 3 parameters: Add a chance to cast Heal on the enemy when attacking
bonus3 bAutoSpell, "AL_HEAL", 5, 100;
</example_code>
<example_code>
// bonus4 with 4 parameters: Increase damage against Demihuman race by 10% with additional effect
bonus4 bAddRace, RC_DemiHuman, 10, 0, 0;
</example_code>
<example_code>
// bonus5 with 5 parameters: Add a chance to cast a skill with specific flags
bonus5 bAutoSpell, "MG_FIREBOLT", 5, 100, 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bonus4 <bonus type>,<val1>,<val2>,<val3>,<val4>;
</syntax>

<description>
These commands are meant to be used in item scripts. They will probably work outside item scripts, but the bonus will not persist for long. They, as expected, refer only to an invoking character.

You can find the full list of possible bonuses and which command to use for each kind in doc/item_bonus.txt.

<example_code>
// bonus with 1 parameter: Increase ATK by 10
bonus bAtk, 10;
</example_code>
<example_code>
// bonus2 with 2 parameters: Increase resistance to Water element by 20%
bonus2 bSubEle, Ele_Water, 20;
</example_code>
<example_code>
// bonus3 with 3 parameters: Add a chance to cast Heal on the enemy when attacking
bonus3 bAutoSpell, "AL_HEAL", 5, 100;
</example_code>
<example_code>
// bonus4 with 4 parameters: Increase damage against Demihuman race by 10% with additional effect
bonus4 bAddRace, RC_DemiHuman, 10, 0, 0;
</example_code>
<example_code>
// bonus5 with 5 parameters: Add a chance to cast a skill with specific flags
bonus5 bAutoSpell, "MG_FIREBOLT", 5, 100, 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bonus5 <bonus type>,<val1>,<val2>,<val3>,<val4>,<val5>;
</syntax>

<description>
These commands are meant to be used in item scripts. They will probably work outside item scripts, but the bonus will not persist for long. They, as expected, refer only to an invoking character.

You can find the full list of possible bonuses and which command to use for each kind in doc/item_bonus.txt.

<example_code>
// bonus with 1 parameter: Increase ATK by 10
bonus bAtk, 10;
</example_code>
<example_code>
// bonus2 with 2 parameters: Increase resistance to Water element by 20%
bonus2 bSubEle, Ele_Water, 20;
</example_code>
<example_code>
// bonus3 with 3 parameters: Add a chance to cast Heal on the enemy when attacking
bonus3 bAutoSpell, "AL_HEAL", 5, 100;
</example_code>
<example_code>
// bonus4 with 4 parameters: Increase damage against Demihuman race by 10% with additional effect
bonus4 bAddRace, RC_DemiHuman, 10, 0, 0;
</example_code>
<example_code>
// bonus5 with 5 parameters: Add a chance to cast a skill with specific flags
bonus5 bAutoSpell, "MG_FIREBOLT", 5, 100, 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*autobonus <bonus script>,<rate>,<duration>{,<flag>,{<other script>}};

*autobonus2 <bonus script>,<rate>,<duration>{,<flag>,{<other script>}};

*autobonus3 <bonus script>,<rate>,<duration>,<skill id>,{<other script>};

*autobonus3 <bonus script>,<rate>,<duration>,"<skill name>",{<other script>};
</syntax>

<description>
These commands are meant to be used in item scripts only! See petautobonus for pet usage.

What these commands do is attach a script to the player which will get executed on attack (autobonus and autobonus3) or when attacked (autobonus2).

Rate is the trigger rate of the script (1000 = 100%).

Duration is the time in milliseconds that the bonus will last for since the script has triggered.

Skill ID/skill name is the skill which will be used as trigger to start the bonus (autobonus3).

The optional argument flag is used to classify the type of attack where the script can trigger (it shares the same flags as the bAutoSpell bonus script):

Range criteria:
BF_SHORT:  Trigger on melee attack
BF_LONG:   Trigger on ranged attack
Default:   BF_SHORT + BF_LONG

Attack type criteria:
BF_WEAPON: Trigger on weapon skills
BF_MAGIC:  Trigger on magic skills
BF_MISC:   Trigger on misc skills
Default:   BF_WEAPON

Skill criteria:
BF_NORMAL: Trigger on normal attacks
BF_SKILL:  Trigger on skills
Default:   If the attack type is BF_WEAPON (only) BF_NORMAL is used,
           otherwise BF_SKILL + BF_NORMAL is used.

The difference between the optional argument other script and the bonus script is that the former triggers only when attacking (or attacked) and the latter runs on status calculation as well, which makes sure, within the duration, the bonus that gets lost on status calculation is restored. So, bonus script is technically supposed to accept bonus commands only. And we usually use other script to show visual effects.

In all cases, when the script triggers, the attached player will be the one who holds the bonus. There is currently no way of knowing within this script who was the other character (the attacker in autobonus2, or the target in autobonus and autobonus3).

<example_code>
// Grants a 1% chance of starting the state "all stats +10" for 10 seconds when
// using weapon or misc attacks (both melee and ranged skills) and shows a special
// effect when the bonus is active.
autobonus "{ bonus bAllStats, 10; }", 10, 10000, BF_WEAPON|BF_MISC, "{ specialeffect2 EF_FIRESPLASHHIT; }";
</example_code>
<example_code>
// Grants a 5% chance to increase ATK by 25 for 7 seconds when attacked
autobonus2 "{ bonus bAtk, 25; }", 50, 7000;
</example_code>
<example_code>
// Grants a 3% chance to cast Improve Concentration when using a specific skill
autobonus3 "{ bonus bDex, 10; }", 30, 60000, "HT_POWER";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*autobonus2 <bonus script>,<rate>,<duration>{,<flag>,{<other script>}};
</syntax>

<description>
These commands are meant to be used in item scripts only! See petautobonus for pet usage.

What these commands do is attach a script to the player which will get executed on attack (autobonus and autobonus3) or when attacked (autobonus2).

Rate is the trigger rate of the script (1000 = 100%).

Duration is the time in milliseconds that the bonus will last for since the script has triggered.

Skill ID/skill name is the skill which will be used as trigger to start the bonus (autobonus3).

The optional argument flag is used to classify the type of attack where the script can trigger (it shares the same flags as the bAutoSpell bonus script):

Range criteria:
BF_SHORT:  Trigger on melee attack
BF_LONG:   Trigger on ranged attack
Default:   BF_SHORT + BF_LONG

Attack type criteria:
BF_WEAPON: Trigger on weapon skills
BF_MAGIC:  Trigger on magic skills
BF_MISC:   Trigger on misc skills
Default:   BF_WEAPON

Skill criteria:
BF_NORMAL: Trigger on normal attacks
BF_SKILL:  Trigger on skills
Default:   If the attack type is BF_WEAPON (only) BF_NORMAL is used,
           otherwise BF_SKILL + BF_NORMAL is used.

The difference between the optional argument other script and the bonus script is that the former triggers only when attacking (or attacked) and the latter runs on status calculation as well, which makes sure, within the duration, the bonus that gets lost on status calculation is restored. So, bonus script is technically supposed to accept bonus commands only. And we usually use other script to show visual effects.

In all cases, when the script triggers, the attached player will be the one who holds the bonus. There is currently no way of knowing within this script who was the other character (the attacker in autobonus2, or the target in autobonus and autobonus3).

<example_code>
// Grants a 1% chance of starting the state "all stats +10" for 10 seconds when
// using weapon or misc attacks (both melee and ranged skills) and shows a special
// effect when the bonus is active.
autobonus "{ bonus bAllStats, 10; }", 10, 10000, BF_WEAPON|BF_MISC, "{ specialeffect2 EF_FIRESPLASHHIT; }";
</example_code>
<example_code>
// Grants a 5% chance to increase ATK by 25 for 7 seconds when attacked
autobonus2 "{ bonus bAtk, 25; }", 50, 7000;
</example_code>
<example_code>
// Grants a 3% chance to cast Improve Concentration when using a specific skill
autobonus3 "{ bonus bDex, 10; }", 30, 60000, "HT_POWER";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*autobonus3 <bonus script>,<rate>,<duration>,<skill id>,{<other script>};
    
*autobonus3 <bonus script>,<rate>,<duration>,"<skill name>",{<other script>};
</syntax>

<description>
These commands are meant to be used in item scripts only! See petautobonus for pet usage.

What these commands do is attach a script to the player which will get executed on attack (autobonus and autobonus3) or when attacked (autobonus2).

Rate is the trigger rate of the script (1000 = 100%).

Duration is the time in milliseconds that the bonus will last for since the script has triggered.

Skill ID/skill name is the skill which will be used as trigger to start the bonus (autobonus3).

The optional argument flag is used to classify the type of attack where the script can trigger (it shares the same flags as the bAutoSpell bonus script):

Range criteria:
BF_SHORT:  Trigger on melee attack
BF_LONG:   Trigger on ranged attack
Default:   BF_SHORT + BF_LONG

Attack type criteria:
BF_WEAPON: Trigger on weapon skills
BF_MAGIC:  Trigger on magic skills
BF_MISC:   Trigger on misc skills
Default:   BF_WEAPON

Skill criteria:
BF_NORMAL: Trigger on normal attacks
BF_SKILL:  Trigger on skills
Default:   If the attack type is BF_WEAPON (only) BF_NORMAL is used,
           otherwise BF_SKILL + BF_NORMAL is used.

The difference between the optional argument other script and the bonus script is that the former triggers only when attacking (or attacked) and the latter runs on status calculation as well, which makes sure, within the duration, the bonus that gets lost on status calculation is restored. So, bonus script is technically supposed to accept bonus commands only. And we usually use other script to show visual effects.

In all cases, when the script triggers, the attached player will be the one who holds the bonus. There is currently no way of knowing within this script who was the other character (the attacker in autobonus2, or the target in autobonus and autobonus3).

<example_code>
// Grants a 1% chance of starting the state "all stats +10" for 10 seconds when
// using weapon or misc attacks (both melee and ranged skills) and shows a special
// effect when the bonus is active.
autobonus "{ bonus bAllStats, 10; }", 10, 10000, BF_WEAPON|BF_MISC, "{ specialeffect2 EF_FIRESPLASHHIT; }";
</example_code>
<example_code>
// Grants a 5% chance to increase ATK by 25 for 7 seconds when attacked
autobonus2 "{ bonus bAtk, 25; }", 50, 7000;
</example_code>
<example_code>
// Grants a 3% chance to cast Improve Concentration when using a specific skill
autobonus3 "{ bonus bDex, 10; }", 30, 60000, "HT_POWER";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bonus_script "<script code>",<duration>{,<flag>{,<type>{,<status_icon>{,<char_id>}}}};
</syntax>

<description>
This command will attach a script to a player for a given duration, in seconds. After that time, the script will automatically expire. The same bonus cannot be stacked. By default, this bonus will be stored on the bonus_script table when the player logs out.

Flags (bitmask):
1   : Remove when dead.
2   : Removable by Dispell.
4   : Removable by Clearance.
8   : Remove when player logs out.
16  : Removable by Banishing Buster.
32  : Removable by Refresh.
64  : Removable by Lux Anima.
128 : Remove when Madogear is activated or deactivated.
256 : Remove when receive damage.
512 : Script is permanent, cannot be cleared by bonus_script_clear.
1024: Force to replace duplicated script by expanding the duration.
2048: Force to add duplicated script. This flag cannot be stacked with 1024; if both are defined, 1024 will be checked first and ignore this flag.

Types:
This will be used to decide negative or positive buff for debuff_on_logout.
0: Ignore the buff type and won't be removed if the flag is not &8 (Default)
1: Buff
2: Debuff

Status_icon: See Status Icon section in src/map/script_constants.hpp. Default is SI_BLANK (-1).

<example_code>
- Id: 512
AegisName: Apple
Name: Apple
Type: Healing
Buy: 15
Weight: 20
Flags:
  BuyingStore: true
Script: |
  bonus_script "{ bonus bStr, 5; }", 60;
</example_code>
<example_code>
// Attach a +10 ATK bonus for 30 seconds, removable by Dispell
bonus_script "{ bonus bAtk, 10; }", 30, 2;
</example_code>
<example_code>
// Attach a buff with status icon for 120 seconds
bonus_script "{ bonus bAgi,5; }", 120, 0, 1, SC_INCREASEAGI;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bonus_script_clear {<flag>,{<char_id>}};
</syntax>

<description>
Removes attached bonus_script from the player. If no char_id is given, it will remove from the invoker.

If flag is 1, it will clear all scripts even if they have a permanent effect. By default, it just removes non-permanent scripts.

<example_code>
// Remove non-permanent bonus scripts from attached player
bonus_script_clear;
</example_code>
<example_code>
// Remove all bonus scripts (including permanent) from attached player
bonus_script_clear 1;
</example_code>
<example_code>
// Remove non-permanent bonus scripts from another character
bonus_script_clear 0, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*plagiarizeskill <skill_id>,<level>;
</syntax>

<description>
Enables the player to plagiarize specific skills that are copyable. Returns 1 on success, 0 otherwise.

Note:
- Plagiarism can only copy a skill while SC_PRESERVE is not active and the skill is copyable by Plagiarism.
- Reproduce can copy a skill if SC__REPRODUCE is active and the skill is copyable by Reproduce.

<example_code>
// Plagiarize level 5 Fire Bolt
plagiarizeskill 19, 5;
</example_code>
<example_code>
// Plagiarize level 3 Heal
if (plagiarizeskill 28, 3)
    mes "You have successfully plagiarized Heal level 3!";
else
    mes "Failed to plagiarize that skill.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*plagiarizeskillreset <flag>;
</syntax>

<description>
Removes a plagiarized skill from the player. Returns 1 on success, 0 otherwise.

Flag constants:
1 - Use for Plagiarism Skill
2 - Use for Reproduce Skill

<example_code>
// Remove plagiarized skill
plagiarizeskillreset 1;
</example_code>
<example_code>
// Remove reproduce skill
plagiarizeskillreset 2;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*skill <skill id>,<level>{,<flag>};

*skill "<skill name>",<level>{,<flag>};

*addtoskill <skill id>,<level>{,<flag>};

*addtoskill "<skill name>",<level>{,<flag>};
</syntax>

<description>
These commands will give the invoking character a specified skill. This is also used for item scripts.

Level is obvious. Skill id is the ID number of the skill in question as per db/(pre-)re/skill_db.yml. It is not known for certain whether this can be used to give a character a monster's skill, but you're welcome to try with the numbers given in db/(pre-)re/mob_skill_db.txt.

Flag is 0 if the skill is given permanently (will get written with the character data) or 1 if it is temporary (will be lost eventually, this is meant for card item scripts usage). The flag parameter is optional, and defaults to 1 in skill and to 2 in addtoskill.

Flag 2 means that the level parameter is to be interpreted as a stackable additional bonus to the skill level. If the character did not have that skill previously, they will now have 0 + the level given.

Flag 3 is the same as flag 1 in that it saves to the database. However, these skills are ignored when any action is taken that adjusts the skill tree (reset/job change).

Flag constants:
0 - SKILL_PERM
1 - SKILL_TEMP
2 - SKILL_TEMPLEVEL
3 - SKILL_PERM_GRANT

<example_code>
// This will permanently give the character Stone Throw (TF_THROWSTONE, 152) at level 1
skill 152, 1, 0;
</example_code>
<example_code>
// This will temporarily give the character Heal at level 5
skill "AL_HEAL", 5, 1;
</example_code>
<example_code>
// This will add a stackable bonus to the skill level
addtoskill 28, 3, 2; // Adds 3 levels to Heal
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*addtoskill <skill id>,<level>{,<flag>};
    
*addtoskill "<skill name>",<level>{,<flag>};

*skill <skill id>,<level>{,<flag>};

*skill "<skill name>",<level>{,<flag>};
</syntax>

<description>
These commands will give the invoking character a specified skill. This is also used for item scripts.

Level is obvious. Skill id is the ID number of the skill in question as per db/(pre-)re/skill_db.yml. It is not known for certain whether this can be used to give a character a monster's skill, but you're welcome to try with the numbers given in db/(pre-)re/mob_skill_db.txt.

Flag is 0 if the skill is given permanently (will get written with the character data) or 1 if it is temporary (will be lost eventually, this is meant for card item scripts usage). The flag parameter is optional, and defaults to 1 in skill and to 2 in addtoskill.

Flag 2 means that the level parameter is to be interpreted as a stackable additional bonus to the skill level. If the character did not have that skill previously, they will now have 0 + the level given.

Flag 3 is the same as flag 1 in that it saves to the database. However, these skills are ignored when any action is taken that adjusts the skill tree (reset/job change).

Flag constants:
0 - SKILL_PERM
1 - SKILL_TEMP
2 - SKILL_TEMPLEVEL
3 - SKILL_PERM_GRANT

<example_code>
// This will permanently give the character Stone Throw (TF_THROWSTONE, 152) at level 1
skill 152, 1, 0;
</example_code>
<example_code>
// This will temporarily give the character Heal at level 5
skill "AL_HEAL", 5, 1;
</example_code>
<example_code>
// This will add a stackable bonus to the skill level
addtoskill 28, 3, 2; // Adds 3 levels to Heal
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*nude {<char_id>};
</syntax>

<description>
This command will unequip anything equipped on the invoking character.

It is not required to do this when changing jobs since jobchange will unequip everything not equippable by the new job class anyway.

<example_code>
// Unequip everything from the attached player
nude;
</example_code>
<example_code>
// Unequip everything from another character
nude 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sit {"<character name>"};

*stand {"<character name>"};
</syntax>

<description>
These commands will make a character sit or stand. If no character is specified, the command will run for the invoking character.

Additionally, the constant Sitting is true when the character is sitting, false otherwise.

<example_code>
// Make attached player sit
sit;
</example_code>
<example_code>
// Make attached player stand
stand;
</example_code>
<example_code>
// Make another character sit
sit "Aaron";
</example_code>
<example_code>
// Check if attached player is sitting
if (Sitting)
    mes "You are sitting.";
else
    mes "You are standing.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*stand {"<character name>"};

*sit {"<character name>"};
</syntax>

<description>
These commands will make a character sit or stand. If no character is specified, the command will run for the invoking character.

Additionally, the constant Sitting is true when the character is sitting, false otherwise.

<example_code>
// Make attached player sit
sit;
</example_code>
<example_code>
// Make attached player stand
stand;
</example_code>
<example_code>
// Make another character sit
sit "Aaron";
</example_code>
<example_code>
// Check if attached player is sitting
if (Sitting)
    mes "You are sitting.";
else
    mes "You are standing.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*disguise <Monster ID>{,<char_id>};

*undisguise {<char_id>};
</syntax>

<description>
This command disguises the current player with a monster sprite. The disguise lasts until undisguise is issued or the player logs out.

<example_code>
disguise 1002; // Disguise character as a Poring.
next;
undisguise; // Return to normal character sprite.
</example_code>
<example_code>
// Disguise another character as a Baphomet
disguise 1039, 150001;
</example_code>
<example_code>
// Undisguise another character
undisguise 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*undisguise {<char_id>};

*disguise <Monster ID>{,<char_id>};
</syntax>

<description>
This command disguises the current player with a monster sprite. The disguise lasts until undisguise is issued or the player logs out.

<example_code>
disguise 1002; // Disguise character as a Poring.
next;
undisguise; // Return to normal character sprite.
</example_code>
<example_code>
// Disguise another character as a Baphomet
disguise 1039, 150001;
</example_code>
<example_code>
// Undisguise another character
undisguise 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*transform <monster ID>,<duration>{,<sc type>,<val1>,<val2>,<val3>,<val4>};

*transform "<monster name>",<duration>{,<sc type>,<val1>,<val2>,<val3>,<val4>};
</syntax>

<description>
This command transforms the invoking character into the specified monster for the given duration (in milliseconds). The transformation can optionally apply a status change effect with additional parameters sc type, val1, val2, val3, and val4.

<example_code>
// Transform into a Poring for 10 seconds
transform 1002, 10000;
</example_code>
<example_code>
// Transform into a Baphomet for 30 seconds by name
transform "Baphomet", 30000;
</example_code>
<example_code>
// Transform with additional status effect
transform 1002, 20000, SC_BLESSING, 10, 0, 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*active_transform <monster ID>,<duration>{,<sc type>,<val1>,<val2>,<val3>,<val4>};

*active_transform "<monster name>",<duration>{,<sc type>,<val1>,<val2>,<val3>,<val4>};
</syntax>

<description>
This command actively transforms the invoking character into the specified monster for the given duration (in milliseconds). Unlike transform, this command creates a temporary monster object that can perform actions. The transformation can optionally apply a status change effect with additional parameters sc type, val1, val2, val3, and val4.

<example_code>
// Actively transform into a Poring for 10 seconds
active_transform 1002, 10000;
</example_code>
<example_code>
// Actively transform into a Baphomet for 30 seconds by name
active_transform "Baphomet", 30000;
</example_code>
<example_code>
// Actively transform with additional status effect
active_transform 1002, 20000, SC_BLESSING, 10, 0, 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*marriage("<spouse name>");
</syntax>

<description>
This function will marry two characters, the invoking character and the one referred to by the given name, setting them up as each other's marriage partner. No second function call has to be issued (in current SVN at least) to make sure the marriage works both ways. The function returns 1 upon success, or 0 if the marriage could not be completed, either because the other character wasn't found or because one of the two characters is already married.

This will do nothing else for the marriage except setting up the spouse ID for both of these characters. No rings will be given and no effects will be shown.

<example_code>
// Marry the attached player to "Alice"
if (marriage("Alice"))
    mes "You are now married to Alice!";
else
    mes "Failed to marry. Either Alice is not found or one of you is already married.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*wedding;
</syntax>

<description>
This command will call up wedding effects - the music and confetti - centered on the invoking character. Example can be found in the wedding script.

<example_code>
// Display wedding effects on the attached player
wedding;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*divorce({<char_id>})
</syntax>

<description>
This function will un-marry the invoking character from whoever they were married to. Both will no longer be each other's marriage partner (at least in current SVN, which prevents cases of multi-spouse problems). It will return 1 upon success or 0 if the character was not married at all.

This function will also destroy both wedding rings and send a message to both players, telling them they are now divorced.

<example_code>
// Divorce the attached player
if (divorce())
    mes "You are now divorced.";
else
    mes "You were not married.";
</example_code>
<example_code>
// Divorce another character
divorce(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*adopt("<parent_name>","<baby_name>");

*adopt(<parent_id>,<baby_id>);
</syntax>

<description>
This function will send the client adoption request to the specified baby character. The parent value can be either parent. Both parents and the baby need to be online in order for adoption to work.

Return values:

<example_code>
ADOPT_ALLOWED // Sent message to Baby to accept or deny.
ADOPT_ALREADY_ADOPTED // Character is already adopted.
ADOPT_MARRIED_AND_PARTY // Parents need to be married and in a party with the baby.
ADOPT_EQUIP_RINGS // Parents need wedding rings equipped.
ADOPT_NOT_NOVICE // Baby is not a Novice.
ADOPT_CHARACTER_NOT_FOUND // A parent or Baby was not found.
ADOPT_MORE_CHILDREN // You cannot adopt more than 1 child. (client message)
ADOPT_LEVEL_70 // Parents need to be at least level 70 in order to adopt someone. (client message)
ADOPT_MARRIED // You cannot adopt a married person. (client message)
</example_code>
<example_code>
// Send adoption request from parents to baby "BabyName"
.@result = adopt("ParentName", "BabyName");
if (.@result == ADOPT_ALLOWED)
    mes "Adoption request sent!";
else
    mes "Adoption failed. Error code: " + .@result;
</example_code>
<example_code>
// Adopt using character IDs
.@result = adopt(150001, 150002);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*pcfollow <id>,<target id>;

*pcstopfollow <id>;
</syntax>

<description>
Makes a character follow or stop following someone. This command does the same as the @follow command. The main difference is that @follow can use character names, and this command needs the account ID for the target.

<example_code>
// This will make Aaron follow Bullah, when both of these characters are online
pcfollow getCharID(3, "Aaron"), getCharID(3, "Bullah");
</example_code>
<example_code>
// Makes Aaron stop following whoever he is following
pcstopfollow getCharID(3, "Aaron");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*pcstopfollow <id>;

*pcfollow <id>,<target id>;
</syntax>

<description>
Makes a character follow or stop following someone. This command does the same as the @follow command. The main difference is that @follow can use character names, and this command needs the account ID for the target.

<example_code>
// This will make Aaron follow Bullah, when both of these characters are online
pcfollow getCharID(3, "Aaron"), getCharID(3, "Bullah");
</example_code>
<example_code>
// Makes Aaron stop following whoever he is following
pcstopfollow getCharID(3, "Aaron");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*pcblockmove <id>,<option>;

*unitblockmove <id>,<option>;
</syntax>

<description>
Prevents the given GID from moving when the option is 1, and enables the ID to move again when the option is 0. This command will run for the attached unit if the given GID is zero.

<example_code>
// Prevents the current char from moving away
pcblockmove getcharid(3), 1;
</example_code>
<example_code>
// Enables the current char to move again
pcblockmove getcharid(3), 0;
</example_code>
<example_code>
// Block movement for another character by GID
pcblockmove 150001, 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitblockmove <id>,<option>;

*pcblockmove <id>,<option>;
</syntax>

<description>
Prevents the given GID from moving when the option is 1, and enables the ID to move again when the option is 0. This command will run for the attached unit if the given GID is zero.

<example_code>
// Prevents the current char from moving away
pcblockmove getcharid(3), 1;
</example_code>
<example_code>
// Enables the current char to move again
pcblockmove getcharid(3), 0;
</example_code>
<example_code>
// Block movement for another character by GID
pcblockmove 150001, 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*pcblockskill <id>,<option>;

*unitblockskill <id>,<option>;
</syntax>

<description>
Prevents the given GID from casting skills when the option is 1, and enables the ID to cast skills again when the option is 0. This command will run for the attached unit if the given GID is zero.

<example_code>
// Prevents the current char from casting skills
pcblockskill getcharid(3), 1;
</example_code>
<example_code>
// Enables the current char to cast skills again
pcblockskill getcharid(3), 0;
</example_code>
<example_code>
// Block skills for another character by GID
pcblockskill 150001, 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitblockskill <id>,<option>;

*pcblockskill <id>,<option>;
</syntax>

<description>
Prevents the given GID from casting skills when the option is 1, and enables the ID to cast skills again when the option is 0. This command will run for the attached unit if the given GID is zero.

<example_code>
// Prevents the current char from casting skills
pcblockskill getcharid(3), 1;
</example_code>
<example_code>
// Enables the current char to cast skills again
pcblockskill getcharid(3), 0;
</example_code>
<example_code>
// Block skills for another character by GID
pcblockskill 150001, 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setpcblock <type>,<state>{,<account ID>};

*getpcblock {<account ID>};
</syntax>

<description>
setpcblock prevents/allows the player from doing the given <type> of action according to <state> during the player session (note: @reloadscript removes all <type> except PCBLOCK_IMMUNE). The <type> values are bit-masks; multiples of <type> can be added to change the player action.

The action is blocked when <state> is true, while false allows the action again.

getpcblock returns the bit-mask value of the currently enabled block flags.

Available <type>:

<example_code>
PCBLOCK_MOVE                // Prevent the player from moving.
PCBLOCK_ATTACK              // Prevent the player from attacking.
PCBLOCK_SKILL               // Prevent the player from using skills/itemskills.
PCBLOCK_USEITEM             // Prevent the player from using usable items.
PCBLOCK_CHAT                // Prevent the player from sending global/guild/party/whisper messages.
PCBLOCK_IMMUNE              // Prevent the player from being hit by monsters.
PCBLOCK_SITSTAND            // Prevent the player from sitting/standing.
PCBLOCK_COMMANDS            // Prevent the player from using atcommands/charcommands.
PCBLOCK_NPCCLICK            // Prevent the player from clicking/touching any NPC/shop/warp.
PCBLOCK_EMOTION             // Prevent the player from using emotions.
PCBLOCK_EQUIP               // Prevent the player from replacing equipment.
PCBLOCK_NPC                 // Simulate NPC interaction. Useful for NPC with no mes window. Sum of PCBLOCK_MOVE|PCBLOCK_SKILL|PCBLOCK_USEITEM|PCBLOCK_COMMANDS|PCBLOCK_NPCCLICK|PCBLOCK_EQUIP.
PCBLOCK_ALL                 // Sum of all the flags.
</example_code>
<example_code>
// Make the attached player invulnerable to monsters (same as @monsterignore)
setpcblock PCBLOCK_IMMUNE, true;
</example_code>
<example_code>
// Prevents the attached player from attacking and using skills
setpcblock PCBLOCK_ATTACK | PCBLOCK_SKILL, true;
</example_code>
<example_code>
// Re-enables attack, skills and item use
setpcblock PCBLOCK_ATTACK | PCBLOCK_SKILL | PCBLOCK_USEITEM, false;
</example_code>
<example_code>
// getpcblock related checks
if (getpcblock() & PCBLOCK_IMMUNE)
    mes "You are invulnerable!";

if (getpcblock() & (PCBLOCK_MOVE | PCBLOCK_SITSTAND))
    mes "You can't walk or sit.";

if ((getpcblock() & (PCBLOCK_ATTACK | PCBLOCK_SKILL)) == 0)
    mes "You can attack and use skills.";

if (getpcblock() & PCBLOCK_CHAT)
    mes "You can't chat.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getpcblock {<account ID>};

*setpcblock <type>,<state>{,<account ID>};
</syntax>

<description>
setpcblock prevents/allows the player from doing the given <type> of action according to <state> during the player session (note: @reloadscript removes all <type> except PCBLOCK_IMMUNE). The <type> values are bit-masks; multiples of <type> can be added to change the player action.

The action is blocked when <state> is true, while false allows the action again.

getpcblock returns the bit-mask value of the currently enabled block flags.

Available <type>:

<example_code>
PCBLOCK_MOVE                // Prevent the player from moving.
PCBLOCK_ATTACK              // Prevent the player from attacking.
PCBLOCK_SKILL               // Prevent the player from using skills/itemskills.
PCBLOCK_USEITEM             // Prevent the player from using usable items.
PCBLOCK_CHAT                // Prevent the player from sending global/guild/party/whisper messages.
PCBLOCK_IMMUNE              // Prevent the player from being hit by monsters.
PCBLOCK_SITSTAND            // Prevent the player from sitting/standing.
PCBLOCK_COMMANDS            // Prevent the player from using atcommands/charcommands.
PCBLOCK_NPCCLICK            // Prevent the player from clicking/touching any NPC/shop/warp.
PCBLOCK_EMOTION             // Prevent the player from using emotions.
PCBLOCK_EQUIP               // Prevent the player from replacing equipment.
PCBLOCK_NPC                 // Simulate NPC interaction. Useful for NPC with no mes window. Sum of PCBLOCK_MOVE|PCBLOCK_SKILL|PCBLOCK_USEITEM|PCBLOCK_COMMANDS|PCBLOCK_NPCCLICK|PCBLOCK_EQUIP.
PCBLOCK_ALL                 // Sum of all the flags.
</example_code>
<example_code>
// Make the attached player invulnerable to monsters (same as @monsterignore)
setpcblock PCBLOCK_IMMUNE, true;
</example_code>
<example_code>
// Prevents the attached player from attacking and using skills
setpcblock PCBLOCK_ATTACK | PCBLOCK_SKILL, true;
</example_code>
<example_code>
// Re-enables attack, skills and item use
setpcblock PCBLOCK_ATTACK | PCBLOCK_SKILL | PCBLOCK_USEITEM, false;
</example_code>
<example_code>
// getpcblock related checks
if (getpcblock() & PCBLOCK_IMMUNE)
    mes "You are invulnerable!";

if (getpcblock() & (PCBLOCK_MOVE | PCBLOCK_SITSTAND))
    mes "You can't walk or sit.";

if ((getpcblock() & (PCBLOCK_ATTACK | PCBLOCK_SKILL)) == 0)
    mes "You can attack and use skills.";

if (getpcblock() & PCBLOCK_CHAT)
    mes "You can't chat.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*macro_detector({<account ID>});

*macro_detector({"<character name>"});
</syntax>

<description>
This command will display the captcha UI challenge onto the invoking character or the given <account ID>/<character name>.

<example_code>
// Use getareaunits to gather an area of players to test
// Build an int array of the account IDs
.@num = getareaunits(BL_PC, "prontera", 150, 150, 160, 160, .@array[0]);

mes "The number of Players in Prontera between 150x150 and 160x160 is " + .@num + ".";
mes "Players to challenge:";
freeloop(1); // If the list is too big
for (.@i = 0; .@i < getarraysize(.@array); .@i++) {
    mes (.@i + 1) + " " + convertpcinfo(.@array[.@i], CPC_NAME);
    macro_detector .@array[.@i];
}
freeloop(0);
end;
</example_code>
<example_code>
// Display captcha to attached player
macro_detector;
</example_code>
<example_code>
// Display captcha to a player by name
macro_detector "Aaron";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*permission_check(<permission>{,<char_id>});
</syntax>

<description>
This command will return true if the attached character has the specified permission, false otherwise. If <char_id> is given, it will check the permission for that character instead.

A full list of the player permission constants (with the PC_PERM prefix) along with the full permissions documentation can be found in doc/permissions.txt.

<example_code>
if (permission_check(PC_PERM_TRADE)) {
    mes "You have permission to trade!";
} else {
    mes "You do not have permission to trade!";
}
end;
</example_code>
<example_code>
// Check another character's permission
if (permission_check(PC_PERM_USE_GSTORAGE, 150001))
    mes "That character can use guild storage.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*permission_add(<permission>{,<char_id>});

*permission_remove(<permission>{,<char_id>});
</syntax>

<description>
These commands will temporarily add or remove the specified permission to the attached character, or the given <char_id>, until the player logs out.

A full list of the player permission constants (with the PC_PERM prefix) along with the full permissions documentation can be found in doc/permissions.txt.

<example_code>
// Adds the can_trade permission to the attached character,
// allowing them to trade, drop, sell, store and mail items
permission_add(PC_PERM_TRADE);
</example_code>
<example_code>
// Removes the can_party permission from the attached character,
// preventing them from joining or creating parties
permission_remove(PC_PERM_PARTY);
</example_code>
<example_code>
// Add permission to another character
permission_add(PC_PERM_PARTY, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*permission_remove(<permission>{,<char_id>});

*permission_add(<permission>{,<char_id>});
</syntax>

<description>
These commands will temporarily add or remove the specified permission to the attached character, or the given <char_id>, until the player logs out.

A full list of the player permission constants (with the PC_PERM prefix) along with the full permissions documentation can be found in doc/permissions.txt.

<example_code>
// Adds the can_trade permission to the attached character,
// allowing them to trade, drop, sell, store and mail items
permission_add(PC_PERM_TRADE);
</example_code>
<example_code>
// Removes the can_party permission from the attached character,
// preventing them from joining or creating parties
permission_remove(PC_PERM_PARTY);
</example_code>
<example_code>
// Add permission to another character
permission_add(PC_PERM_PARTY, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*monster "<map name>",<x>,<y>,"<name to show>",<mob id>,<amount>{,"<event label>",<size>,<ai>};

*monster "<map name>",<x>,<y>,"<name to show>","<mob name>",<amount>{,"<event label>",<size>,<ai>};
</syntax>

<description>
This command will spawn <amount> monsters with <mob id> or <mob name> on the specified coordinates on the specified map. If the script is invoked by a character, a special <map name>, "this", will be recognized to mean the name of the map the invoking character is located at. This command works fine in item scripts.

The same command arguments mean the same things as described above in the beginning of this document when talking about permanent monster spawns. Monsters spawned in this manner will not respawn upon being killed.

Unlike the permanent monster spawns, if the mob id is -1, a random monster will be picked from the entire database according to the rules configured in the server for dead branches. This will work for all other kinds of non-permanent monster spawns.

The only very special thing about this command is an event label, which is an optional parameter. This label is written like '<NPC object name>::<label name>' and upon the monster being killed, it will execute the script inside of the specified NPC object starting from the label given. The RID of the player attached at this execution will be the RID of the killing character. The variable killedrid is set to the Class (mob ID) of the monster killed. The variable killedgid is set to the ID (unique mob game ID) of the monster killed.

<size> can be:

<example_code>
Size_Small      // (0)     (default)
Size_Medium     // (1)
Size_Large      // (2)
</example_code>
<ai> can be:

<example_code>
AI_NONE     // (0)     (default)
AI_ATTACK   // (1)     (attack/friendly)
AI_SPHERE   // (2)     (Alchemist skill)
AI_FLORA    // (3)     (Alchemist skill)
AI_ZANZOU   // (4)     (Kagerou/Oboro skill)
AI_LEGION   // (5)     (Sera skill)
AI_FAW      // (6)     (Mechanic skill)
AI_WAVEMODE // (7)     (Normal monsters will ignore attack from AI_WAVEMODE monsters)
</example_code>
The coordinates of 0,0 will spawn the monster on a random place on the map.

The areamonster command works much like the monster command and is not significantly different, but spawns the monsters within a square defined by x1/y1-x2/y2.

Returned value is an array with the game ID of the spawned monster(s) depending on the amount spawned. Array is stored in $@mobid[].

<example_code>
// Normal NPC object definition. Let's assume you called him NPCNAME.
mes "[Summon Man]";
mes "Want to start the Poring hunt?";
next;
if (select("Yes.:No.") == 2) {
    mes "[Summon Man]";
    mes "Come back later.";
    close;
}

// Summon 10 Porings.
// Using coordinates 0,0 will spawn them in a random location.
monster "prontera", 0, 0, "Quest Poring", 1002, 10, "NPCNAME::OnPoringKilled";

mes "[Summon Man]";
mes "Now go and kill all the Porings I summoned.";
close;

OnPoringKilled:
$PoringKilled++;
if ($PoringKilled >= 10) {
    announce "Summon Man: Well done. All the Porings are dead!", 3;
    $PoringKilled = 0;
}
end;
</example_code>
<example_code>
// Spawn using monster name instead of ID
monster "prontera", 0, 0, "Poring", "Poring", 5;
</example_code>
<example_code>
// Spawn with custom size and AI
monster "prontera", 150, 100, "Guardian", 1002, 1, "", Size_Large, AI_ATTACK;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*areamonster "<map name>",<x1>,<y1>,<x2>,<y2>,"<name to show>",<mob id>,<amount>{,"<event label>",<size>,<ai>};

*areamonster "<map name>",<x1>,<y1>,<x2>,<y2>,"<name to show>","<mob name>",<amount>{,"<event label>",<size>,<ai>};
</syntax>

<description>
This command will spawn <amount> monsters with <mob id> or <mob name> within the specified area defined by x1/y1-x2/y2 square on the specified map. If the script is invoked by a character, a special <map name>, "this", will be recognized to mean the name of the map the invoking character is located at. This command works fine in item scripts.

The same command arguments mean the same things as described above in the beginning of this document when talking about permanent monster spawns. Monsters spawned in this manner will not respawn upon being killed.

Unlike the permanent monster spawns, if the mob id is -1, a random monster will be picked from the entire database according to the rules configured in the server for dead branches. This will work for all other kinds of non-permanent monster spawns.

The only very special thing about this command is an event label, which is an optional parameter. This label is written like '<NPC object name>::<label name>' and upon the monster being killed, it will execute the script inside of the specified NPC object starting from the label given. The RID of the player attached at this execution will be the RID of the killing character. The variable killedrid is set to the Class (mob ID) of the monster killed. The variable killedgid is set to the ID (unique mob game ID) of the monster killed.

<size> can be:

<example_code>
Size_Small      // (0)     (default)
Size_Medium     // (1)
Size_Large      // (2)
</example_code>
<ai> can be:

<example_code>
AI_NONE     // (0)     (default)
AI_ATTACK   // (1)     (attack/friendly)
AI_SPHERE   // (2)     (Alchemist skill)
AI_FLORA    // (3)     (Alchemist skill)
AI_ZANZOU   // (4)     (Kagerou/Oboro skill)
AI_LEGION   // (5)     (Sera skill)
AI_FAW      // (6)     (Mechanic skill)
AI_WAVEMODE // (7)     (Normal monsters will ignore attack from AI_WAVEMODE monsters)
</example_code>
The areamonster command works much like the monster command and is not significantly different, but spawns the monsters within a square defined by x1/y1-x2/y2.

Returned value is an array with the game ID of the spawned monster(s) depending on the amount spawned. Array is stored in $@mobid[].

<example_code>
// Normal NPC object definition. Let's assume you called him NPCNAME.
mes "[Summon Man]";
mes "Want to start the Poring hunt?";
next;
if (select("Yes.:No.") == 2) {
    mes "[Summon Man]";
    mes "Come back later.";
    close;
}

// Summon 10 Porings within the area x1=100,y1=100 to x2=200,y2=200
areamonster "prontera", 100, 100, 200, 200, "Quest Poring", 1002, 10, "NPCNAME::OnPoringKilled";

mes "[Summon Man]";
mes "Now go and kill all the Porings I summoned.";
close;

OnPoringKilled:
$PoringKilled++;
if ($PoringKilled >= 10) {
    announce "Summon Man: Well done. All the Porings are dead!", 3;
    $PoringKilled = 0;
}
end;
</example_code>
<example_code>
// Spawn using monster name instead of ID within an area
areamonster "prontera", 50, 50, 100, 100, "Poring", "Poring", 5;
</example_code>
<example_code>
// Spawn with custom size and AI within an area
areamonster "prontera", 150, 100, 200, 150, "Guardian", 1002, 1, "", Size_Large, AI_ATTACK;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*areamobuseskill "<map name>",<x>,<y>,<range>,<mob id>,<skill id>,<skill level>,<cast time>,<cancelable>,<emotion>,<target type>;

*areamobuseskill "<map name>",<x>,<y>,<range>,<mob id>,"<skill name>",<skill level>,<cast time>,<cancelable>,<emotion>,<target type>;

*areamobuseskill "<map name>",<x>,<y>,<range>,"<mob name>",<skill id>,<skill level>,<cast time>,<cancelable>,<emotion>,<target type>;

*areamobuseskill "<map name>",<x>,<y>,<range>,"<mob name>","<skill name>",<skill level>,<cast time>,<cancelable>,<emotion>,<target type>;
</syntax>

<description>
This command will make all monsters of the specified <mob id> or <mob name> in the specified area use the specified skill. <map name>, <x>, and <y> define the center of the area, which extends <range> cells in each direction (ex: a range of 3 would create a 7x7 square). The skill can be specified by <skill id> or <skill name>. <cast time> is in milliseconds (1000 = 1 second), and the rest should be self-explanatory.

<target type> can be:
0 = self
1 = the mob's current target
2 = the mob's master
3 = random target

<example_code>
// spawn 1 Shining Plant in the 5x5 area centered on (155,188)
areamonster "prontera", 153, 186, 157, 190, "Shining Plant", 1083, 1;
// make the plant cast level 10 Cold Bolt on a random target
areamobuseskill "prontera", 155, 188, 2, 1083, "MG_COLDBOLT", 10, 3000, 1, ET_KEK, 3;
</example_code>
<example_code>
// Make all Porings in area cast Level 1 Heal on themselves
areamobuseskill "prontera", 150, 100, 5, 1002, "AL_HEAL", 1, 1000, 1, ET_SMILE, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*killmonster "<map name>","<event label>"{,<type>};
</syntax>

<description>
This command will kill all monsters that were spawned with monster or addmonster and have a specified event label attached to them. Commonly used to get rid of remaining quest monsters once the quest is complete.

If the label is given as "All", all monsters which have their respawn times set to -1 (like all the monsters summoned with monster or areamonster script command, and all monsters summoned with GM commands, but no other ones - that is, all non-permanent monsters) on the specified map will be killed regardless of the event label value.

As of r12876, killmonster now supports an optional argument type. Using 1 for type will make the command fire "OnMyMobDead" events from any monsters that do die as a result of this command.

<example_code>
// Kill all monsters spawned with event label "NPCNAME::OnPoringKilled" on prontera
killmonster "prontera", "NPCNAME::OnPoringKilled";
</example_code>
<example_code>
// Kill all non-permanent monsters on prontera
killmonster "prontera", "All";
</example_code>
<example_code>
// Kill all monsters and trigger their death events
killmonster "prontera", "All", 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*killmonsterall "<map name>"{,<type>};
</syntax>

<description>
This command will kill all monsters on a specified map name, regardless of how they were spawned or what they are. As of r12873, the behavior has changed slightly. In light of a label behavior fix for mob spawning commands that will now allow the label to trigger when there is no player, killmonsterall has also been modified to support this.

Using this the normal/old way means labels don't trigger when a player didn't attack/kill a monster. This is because it breaks compatibility with older scripts if forced to use the new method. However, if you wish to use the new label type with this command, simply use 1 for type. Any other number won't be recognized.

<example_code>
// Kill all monsters on prontera (labels will not trigger)
killmonsterall "prontera";
</example_code>
<example_code>
// Kill all monsters on prontera and trigger their death events
killmonsterall "prontera", 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*strmobinfo(<type>,<monster id>);
</syntax>

<description>
This function will return information about a monster record in the database, as per db/(pre-)re/mob_db.yml. Type is the kind of information returned. Valid types are:

1 - english name field in the database, a string.
2 - japanese name field in the database, a string.

All other returned values are numbers:
3 - Level.
4 - Maximum HP.
5 - Maximum SP.
6 - Experience reward.
7 - Job experience reward.

It will return 0 if there is no such monster (or the type value is invalid), or an empty string if you requested the monster's name.

<example_code>
// Get Poring's English name
.@name$ = strmobinfo(1, 1002);
mes "English name: " + .@name$;

// Get Poring's level
.@level = strmobinfo(3, 1002);
mes "Level: " + .@level;

// Get Poring's HP and EXP
.@hp = strmobinfo(4, 1002);
.@exp = strmobinfo(6, 1002);
mes "HP: " + .@hp + ", Base EXP: " + .@exp;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mobcount("<map name>","<event label>")
</syntax>

<description>
This function will count all the monsters on the specified map that have a given event label and return the number, or 0 if it can't find any. Naturally, only monsters spawned with monster and areamonster script commands can have a non-empty event label.

If you pass this function an empty string for the event label, it will return the total count of monsters without an event label, including permanently spawning monsters.

With the dynamic mobs system enabled, where mobs are not kept in memory for maps with no actual people playing on them, this will return 0 for any such map.

If the event label is given as "all", all monsters will be counted, regardless of having any event label attached.

If the map name is given as "this", the map the invoking character is on will be used. If the map is not found, or the invoker is not a character while the map is "this", it will return -1.

<example_code>
-   script  MobCounter  -1,{
    mes "[Mob Counter]";
    mes "Checking for monsters with event 'OnMyMobDeath' on prontera...";
    
    .@count = mobcount("prontera", "MobCounter::OnMyMobDeath");
    
    if (.@count == -1) {
        mes "Error: Map not found.";
    } else {
        mes "There are currently " + .@count + " monsters remaining.";
    }
    close;

OnMyMobDeath:
    // This label is triggered when the mob dies if defined in the monster command
    end;
}
</example_code>
<example_code>
// Count all monsters on prontera
.@total = mobcount("prontera", "all");
mes "Total monsters on prontera: " + .@total;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*clone "<map name>",<x>,<y>,"<event>",<char id>{,<master_id>{,<mode>{,<flag>,<duration>}}}
</syntax>

<description>
This command creates a monster which is a copy of another player. The first four arguments serve the same purpose as in the monster script command. The <char id> is the character ID of the player to clone (player must be online). If <master id> is given, the clone will be a slave/minion of it. Master_id must be a character ID of another online player.

The mode can be specified to determine the behavior of the clone. Its values are the same as the ones used for the mode field in the mob_db. The default mode is aggressive, assists, can move, can attack.

Flag can be either zero or one currently. If zero, the clone is a normal monster that will target players; if one, it is considered a summoned monster, and as such, it will target other monsters. Defaults to zero.

The duration specifies how long the clone will live before it is auto-removed. Specified in seconds, defaults to no limit (zero).

Returned value is the monster ID of the spawned clone. If command fails, returned value is zero.

<example_code>
// Clone the attached player as a monster on prontera
.@mob_id = clone("prontera", 150, 100, "", getcharid(0));
</example_code>
<example_code>
// Clone a player with a master, aggressive mode, for 60 seconds
.@mob_id = clone("prontera", 150, 100, "OnCloneDead", 150001, getcharid(0), MD_AGGRESSIVE, 1, 60);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*summon "monster name",<monster id>{,<Time Out>{,"event label"}};
</syntax>

<description>
This command will summon a monster (see also monster). Unlike monsters spawned with other commands, this one will set up the monster to fight to protect the invoking character. Monster name and mob ID obey the same rules as the one given at the beginning of this document for permanent monster spawns with the exceptions mentioned when describing the monster command.

The effect for the skill Call Homunculus will be displayed centered on the invoking character.

Timeout is the time in milliseconds the summon lives, and is set default to 60000 (1 minute). Note that the value 0 will also set the timer to default, and it is not possible to create a spawn that lasts forever.

If an event label is given, upon the monster being killed, the event label will run as if by donpcevent.

Returned value is the game ID of the spawned monster.

<example_code>
// Will summon a dead branch-style monster to fight for the character
summon "--ja--", -1;
</example_code>
<example_code>
// Summon a Poring that lasts for 30 seconds
.@mob_id = summon "Poring", 1002, 30000;
</example_code>
<example_code>
// Summon a monster with an event label on death
summon "Guardian", 1002, 60000, "NPCNAME::OnSummonDead";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*addmonsterdrop <monster id>,<item id>,<rate>,{<steal protected>,{<random option group id>}};

*addmonsterdrop "<monster name>",<item id>,<rate>,{<steal protected>,{<random option group id>}};

*delmonsterdrop <monster id>,<item id>;

*delmonsterdrop "<monster name>",<item id>;
</syntax>

<description>
These commands will temporarily add or delete a monster drop, which will be reset when the mob database reloads or the server shuts down. They return true upon success, false otherwise.

If the monster already drops the specified item, its drop rate will be updated with the given rate (100 = 1%).

If <steal protected> is true, the item will be protected from TF_STEAL (default false).

<random option group id> binds the item with the given random option group ID (default 0). The ID must be valid, as defined in db/[pre-]re/item_randomopt_group.yml.

<example_code>
// Makes Owl Baron drop Honey at an 80% rate
addmonsterdrop 1295, 518, 8000;
</example_code>
<example_code>
// Makes Owl Baron drop Knife at an 80% rate, protected from TF_STEAL and with random option group ID 5
addmonsterdrop 1295, 1202, 8000, true, 5;
</example_code>
<example_code>
// Deletes Executioner's Mitten from Rybio
delmonsterdrop 1201, 7017;
</example_code>
<example_code>
// Add drop using monster name
addmonsterdrop "Poring", 512, 5000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*delmonsterdrop <monster id>,<item id>;

*delmonsterdrop "<monster name>",<item id>;

*addmonsterdrop <monster id>,<item id>,<rate>,{<steal protected>,{<random option group id>}};

*addmonsterdrop "<monster name>",<item id>,<rate>,{<steal protected>,{<random option group id>}};
</syntax>

<description>
These commands will temporarily add or delete a monster drop, which will be reset when the mob database reloads or the server shuts down. They return true upon success, false otherwise.

If the monster already drops the specified item, its drop rate will be updated with the given rate (100 = 1%).

If <steal protected> is true, the item will be protected from TF_STEAL (default false).

<random option group id> binds the item with the given random option group ID (default 0). The ID must be valid, as defined in db/[pre-]re/item_randomopt_group.yml.

<example_code>
// Makes Owl Baron drop Honey at an 80% rate
addmonsterdrop 1295, 518, 8000;
</example_code>
<example_code>
// Makes Owl Baron drop Knife at an 80% rate, protected from TF_STEAL and with random option group ID 5
addmonsterdrop 1295, 1202, 8000, true, 5;
</example_code>
<example_code>
// Deletes Executioner's Mitten from Rybio
delmonsterdrop 1201, 7017;
</example_code>
<example_code>
// Add drop using monster name
addmonsterdrop "Poring", 512, 5000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mob_setidleevent <GID>,<event>;
</syntax>

<description>
This command will attach an event label to the monster with the given <GID> which will execute when the <GID> is idle.

<example_code>
monster "prontera", 0, 0, "Quest Poring", 1002, 1;
mob_setidleevent $@mobid[0], "NPC NAME::OnIdle";
end;

OnIdle:
mobchat getattachedrid(), 0, 0x00FF00, "I'm IDLE!";
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*disablenpc {"<NPC object name>"};

*enablenpc {"<NPC object name>"};
</syntax>

<description>
These two commands will disable and enable, respectively, an NPC object specified by name. The disabled NPC will disappear from sight and will no longer be triggerable in the normal way. It is not clear whether it will still be accessible through donpcevent and other triggering commands, but it probably will be. You can disable even warp NPCs if you know their object names, which is an easy way to make a map only accessible through walking half the time. Then you enablenpc them back.

You can also use these commands to create the illusion of an NPC switching between several locations, which is often better than actually moving the NPC - create one NPC object with a visible and a hidden part to their name, make a few copies, and then disable all except one.

<example_code>
// Disable an NPC by name
disablenpc "WarpNPC";
</example_code>
<example_code>
// Enable an NPC by name
enablenpc "WarpNPC";
</example_code>
<example_code>
// Toggle an NPC (disable if enabled, enable if disabled)
if (getvariableofnpc(.enabled, "MyNPC"))
    disablenpc "MyNPC";
else
    enablenpc "MyNPC";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*enablenpc {"<NPC object name>"};

*disablenpc {"<NPC object name>"};
</syntax>

<description>
These two commands will disable and enable, respectively, an NPC object specified by name. The disabled NPC will disappear from sight and will no longer be triggerable in the normal way. It is not clear whether it will still be accessible through donpcevent and other triggering commands, but it probably will be. You can disable even warp NPCs if you know their object names, which is an easy way to make a map only accessible through walking half the time. Then you enablenpc them back.

You can also use these commands to create the illusion of an NPC switching between several locations, which is often better than actually moving the NPC - create one NPC object with a visible and a hidden part to their name, make a few copies, and then disable all except one.

<example_code>
// Disable an NPC by name
disablenpc "WarpNPC";
</example_code>
<example_code>
// Enable an NPC by name
enablenpc "WarpNPC";
</example_code>
<example_code>
// Toggle an NPC (disable if enabled, enable if disabled)
if (getvariableofnpc(.enabled, "MyNPC"))
    disablenpc "MyNPC";
else
    enablenpc "MyNPC";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*hideonnpc {"<NPC object name>"};

*hideoffnpc {"<NPC object name>"};
</syntax>

<description>
These commands will make the specified NPC object display as hidden or visible, even though not actually disabled per se. Hidden as in thief Hide skill, but unfortunately, not detectable by Ruwach or Sight.

As they are now, these commands are pointless; it is suggested to use disablenpc/enablenpc, because these two commands actually unload the NPC sprite location and other accompanying data from memory when it is not used. However, you can use these for some quest ideas (such as cloaking NPCs talking while hidden then revealing... you can wonder around =P).

<example_code>
// Hide an NPC
hideonnpc "QuestNPC";
</example_code>
<example_code>
// Unhide an NPC
hideoffnpc "QuestNPC";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*hideoffnpc {"<NPC object name>"};

*hideonnpc {"<NPC object name>"};
</syntax>

<description>
These commands will make the specified NPC object display as hidden or visible, even though not actually disabled per se. Hidden as in thief Hide skill, but unfortunately, not detectable by Ruwach or Sight.

As they are now, these commands are pointless; it is suggested to use disablenpc/enablenpc, because these two commands actually unload the NPC sprite location and other accompanying data from memory when it is not used. However, you can use these for some quest ideas (such as cloaking NPCs talking while hidden then revealing... you can wonder around =P).

<example_code>
// Hide an NPC
hideonnpc "QuestNPC";
</example_code>
<example_code>
// Unhide an NPC
hideoffnpc "QuestNPC";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unloadnpc "<NPC object name>";
</syntax>

<description>
This command will fully unload an NPC object and all of its duplicates.

<example_code>
// Unload an NPC by object name
unloadnpc "QuestNPC";
</example_code>
<example_code>
// Unload a duplicate NPC
unloadnpc "DuplicateName#1";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*duplicate "<NPC name>","<map>",<x>,<y>{,"<Duplicate NPC name>"{,<sprite>{,<dir>{,<xs>{,<xy>}}}}};
</syntax>

<description>
This command will duplicate the NPC with the given <NPC name> on <map> at <x>/<y>. If <Duplicate NPC name>, <sprite>, <dir>, <xs> or <ys> is not provided, the value of the original NPC will be used. The unique name of the new duplicated NPC is returned on success. An empty string is returned on failure.

NOTE: Duplicates will always have the same NPC variables as the original NPC. Editing an NPC variable in a duplicate or the original NPC will change it for the others.

<example_code>
// Duplicate a shop NPC to a new location
.@dup_name$ = duplicate "Trader", "prontera", 150, 100, "Trader#Copy";
</example_code>
<example_code>
// Duplicate with custom sprite and direction
.@dup_name$ = duplicate "QuestNPC", "prontera", 200, 150, "QuestNPC#Duplicate", 100, 2;
</example_code>
Or

<example_code>
// Original NPC
prontera,150,150,4  script  OriginalNPC 115,{
    mes "[Original NPC]";
    mes "I am the original NPC.";
    close;
}

// Original Shop
-   shop    OriginalShop    115,501:100,502:200

// Duplicate NPC
prontera,155,150,4  duplicate(OriginalNPC)  DuplicateNPC    115

// Duplicate Shop
prontera,155,155,4  duplicate(OriginalShop) DuplicateShop   115
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*duplicate_dynamic("<NPC name>"{,<character ID>});
</syntax>

<description>
This command will duplicate the NPC with the given <NPC name> near the attached player or the player with the given <character ID>. The unique name of the new duplicated NPC is returned on success. An empty string is returned on failure.

NOTE: Duplicates will always have the same NPC variables as the original NPC. Editing an NPC variable in a duplicate or the original NPC will change it for the others.

<example_code>
// Duplicate an NPC near the attached player
.@dup_name$ = duplicate_dynamic("Trader");
</example_code>
<example_code>
// Duplicate an NPC near another character
.@dup_name$ = duplicate_dynamic("QuestNPC", 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cloakonnpc {"<NPC object name>"{,<character ID>}};

*cloakoffnpc {"<NPC object name>"{,<character ID>}};
</syntax>

<description>
These commands will make the specified NPC object display as cloaked or uncloaked, even though not actually disabled. The player can interact with a cloaked NPC (via NPC click, monster event, etc.) but the NPC trigger area is disabled.

If <character ID> is given, then the NPC will only display to the specified player until they leave the map, log out, or the NPC option is changed. If no <character ID> is specified, it will display to the area.

<example_code>
// Cloak an NPC from all players
cloakonnpc "QuestNPC";
</example_code>
<example_code>
// Cloak an NPC from a specific player
cloakonnpc "QuestNPC", 150001;
</example_code>
<example_code>
// Uncloak an NPC
cloakoffnpc "QuestNPC";
</example_code>
<example_code>
// Uncloak an NPC for a specific player
cloakoffnpc "QuestNPC", 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cloakoffnpc {"<NPC object name>"{,<character ID>}};

*cloakonnpc {"<NPC object name>"{,<character ID>}};
</syntax>

<description>
These commands will make the specified NPC object display as cloaked or uncloaked, even though not actually disabled. The player can interact with a cloaked NPC (via NPC click, monster event, etc.) but the NPC trigger area is disabled.

If <character ID> is given, then the NPC will only display to the specified player until they leave the map, log out, or the NPC option is changed. If no <character ID> is specified, it will display to the area.

<example_code>
// Cloak an NPC from all players
cloakonnpc "QuestNPC";
</example_code>
<example_code>
// Cloak an NPC from a specific player
cloakonnpc "QuestNPC", 150001;
</example_code>
<example_code>
// Uncloak an NPC
cloakoffnpc "QuestNPC";
</example_code>
<example_code>
// Uncloak an NPC for a specific player
cloakoffnpc "QuestNPC", 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cloakonnpcself {"<NPC object name>"};

*cloakoffnpcself {"<NPC object name>"};
</syntax>

<description>
Same command as cloakonnpc and cloakoffnpc, but an attached player is required. The NPC will only display to the attached player.

<example_code>
// Cloak an NPC so only the attached player can see it
cloakonnpcself "QuestNPC";
</example_code>
<example_code>
// Uncloak the NPC for the attached player
cloakoffnpcself "QuestNPC";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cloakoffnpcself {"<NPC object name>"};

*cloakonnpcself {"<NPC object name>"};
</syntax>

<description>
Same command as cloakonnpc and cloakoffnpc, but an attached player is required. The NPC will only display to the attached player.

<example_code>
// Cloak an NPC so only the attached player can see it
cloakonnpcself "QuestNPC";
</example_code>
<example_code>
// Uncloak the NPC for the attached player
cloakoffnpcself "QuestNPC";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*isnpccloaked {"<NPC object name>"{,<character ID>}};
</syntax>

<description>
Returns true if the NPC has been cloaked to the attached player or given <character ID>, false otherwise. This works in association with cloakonnpc when it is targeting a specific character.

<example_code>
// Check if the NPC is cloaked for the attached player
if (isnpccloaked("QuestNPC"))
    mes "The NPC is cloaked for you.";
else
    mes "The NPC is visible to you.";
</example_code>
<example_code>
// Check if the NPC is cloaked for another character
if (isnpccloaked("QuestNPC", 150001))
    mes "The NPC is cloaked for that character.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*doevent "<NPC object name>::<event label>";
</syntax>

<description>
This command will start a new execution thread in a specified NPC object at the specified label. The execution of the script running this command will not stop, and the event called by the doevent command will not run until the invoking script has terminated. No parameters may be passed with a doevent call.

The script of the NPC object invoked in this manner will run as if it's been invoked by the RID that was active in the script that issued a doevent. As such, the command will not work if an RID is not attached.

<example_code>
// NPC that triggers the event
prontera,150,150,4  script  TriggerNPC  115,{
    mes "[TriggerNPC]";
    mes "I will now trigger an event in ReceiverNPC.";
    close2;
    doevent "ReceiverNPC::OnTriggeredEvent";
    end;
}

// NPC that receives the event
prontera,155,150,4  script  ReceiverNPC 115,{
    mes "[ReceiverNPC]";
    mes "I am waiting for an event.";
    close;

OnTriggeredEvent:
    mes "[ReceiverNPC]";
    mes "I have been triggered by TriggerNPC!";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*donpcevent "<NPC object name>::<event label>";
</syntax>

<description>
This command invokes the event label code within another NPC or NPCs. It starts a separate instance of execution, and the invoking NPC will resume execution immediately.

If the supplied event label has the form "NpcName::OnLabel", then only the given NPC's event label will be invoked (much like goto into another NPC). If the form is "::OnLabel" (NPC name omitted), the event code of all NPCs with the given label will be invoked, one after another. In both cases, the invoked script will run without an attached RID, whether or not the invoking script was attached to a player. The event label name is required to start with "On".

This command can be used to make other NPCs act, as if they were responding to the invoking NPC's actions, such as using an emotion or talking.

<example_code>
// NPC that triggers the event
prontera,150,150,4  script  TriggerNPC  115,{
    mes "[TriggerNPC]";
    mes "I am triggering ReceiverNPC now.";
    close2;
    donpcevent "ReceiverNPC::OnTriggeredEvent";
    mes "[TriggerNPC]";
    mes "I am still running while ReceiverNPC handles the event.";
    close;
}

// NPC that receives the event
prontera,155,150,4  script  ReceiverNPC 115,{
    mes "[ReceiverNPC]";
    mes "I am waiting for an event.";
    close;

OnTriggeredEvent:
    npctalk "I have been triggered by donpcevent!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cmdothernpc "<npc name>","<command>";
</syntax>

<description>
This is simply donpcevent "<npc name>::OnCommand<command>". It is an approximation of the official server script language's cmdothernpc.

Returns true if the command was executed on the other NPC successfully, false if not.

<example_code>
// Execute command "Reset" on NPC "QuestNPC"
if (cmdothernpc("QuestNPC", "Reset"))
    mes "Command executed successfully.";
else
    mes "Failed to execute command.";
</example_code>
<example_code>
// Equivalent using donpcevent
donpcevent "QuestNPC::OnCommandReset";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npctalk "<message>"{,"<NPC name>",<flag>{,<color>}};
</syntax>

<description>
This command will display a message as if the NPC object running it was a player talking - that is, above their head and in the chat window. The display name of the NPC won't get appended in front of the message.

If the <NPC name> option is given and not empty, then that NPC will display the message; otherwise, the attached NPC will display the message. The color format is in RGB (0xRRGGBB). The color is white by default.

Target for <flag>:

<example_code>
bc_all  // Broadcast message is sent server-wide (only in the chat window).
bc_map  // Message is sent to everyone in the same map as the source of the NPC.
bc_area // Message is sent to players in the vicinity of the source (default value).
bc_self // Message is sent only to the attached player.
</example_code>
<example_code>
prontera,150,150,4  script  TalkativeNPC    115,{
    mes "[TalkativeNPC]";
    mes "Choose how I should talk!";
    switch(select("Talk to Area:Talk to Self")) {
    case 1:
        npctalk "Hello everyone in the area!", "TalkativeNPC", bc_area;
        break;
    case 2:
        npctalk "Hello just to you!", "TalkativeNPC", bc_self;
        break;
    }
    close;
}
</example_code>
<example_code>
// Display a red message from a different NPC to the whole map
npctalk "Warning: The event has started!", "EventNPC", bc_map, 0xFF0000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*chatmes "<message>"{,"<NPC name>"};
</syntax>

<description>
This command will display a message in the waiting room (chat) of the NPC. If the <NPC name> option is given, then that NPC will display the message; otherwise, the attached NPC will display the message. If the NPC is not in a waiting room, nothing happens.

<example_code>
// Everyone in the waiting room will see this message
chatmes "Waiting 5 minutes until the next match will start";
</example_code>
<example_code>
// Display message from a specific NPC
chatmes "The game is about to begin!", "GameMasterNPC";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setnpcdisplay("<npc name>", "<display name>", <class id>, <size>)

*setnpcdisplay("<npc name>", "<display name>", <class id>)

*setnpcdisplay("<npc name>", "<display name>")

*setnpcdisplay("<npc name>", <class id>)
</syntax>

<description>
Changes the display name and/or display class of the target NPC. Returns 0 if successful, 1 if the NPC does not exist. Size is 0 = normal, 1 = small, 2 = big.

<example_code>
// Change only the display name
setnpcdisplay("QuestNPC", "New Name");
</example_code>
<example_code>
// Change only the class ID (sprite)
setnpcdisplay("QuestNPC", 1002); // Change to Poring sprite
</example_code>
<example_code>
// Change both display name and class ID
setnpcdisplay("QuestNPC", "Poring NPC", 1002);
</example_code>
<example_code>
// Change all: display name, class ID, and size (big)
setnpcdisplay("QuestNPC", "Big Poring", 1002, 2);
</example_code>
<example_code>
prontera,150,150,4  script  DisplayNPC  115,{
    mes "[DisplayNPC]";
    mes "I can change my appearance!";
    switch(select("Become Poring:Become Thief Bug:Reset Appearance")) {
    case 1:
        setnpcdisplay "DisplayNPC", "Poring NPC", 1002, 0;
        break;
    case 2:
        setnpcdisplay "DisplayNPC", "Thief Bug NPC", 1003, 0;
        break;
    case 3:
        setnpcdisplay "DisplayNPC", "DisplayNPC", 115, 0;
        break;
    }
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*addtimer <ticks>,"NPC::OnLabel";

*deltimer "NPC::OnLabel";

*addtimercount <ticks>,"NPC::OnLabel";
</syntax>

<description>
These commands will create, destroy, and delay a countdown timer - addtimer to create, deltimer to destroy, and addtimercount to delay it by the specified number of ticks. For all three cases, the event label given is the identifier of that timer. The timer runs on the character object that is attached to the script, and can have multiple instances. When the label is run, it is run as if the player that the timer runs on has clicked the NPC.

When this timer runs out, a new execution thread will start in the specified NPC object at the specified label.

The ticks are given in 1/1000ths of a second.

One more thing. These timers are stored as part of player data. If the player logs out, all of these get immediately deleted, without executing the script. If this behavior is undesirable, use some other timer mechanism (like sleep).

<example_code>
<NPC Header> {
    dispbottom "Starting a 5 second timer...";
    addtimer 5000, strnpcinfo(3) + "::On5secs";
    end;
On5secs:
    dispbottom "5 seconds have passed!";
    end;
}
</example_code>
<example_code>
// Complete working example
prontera,150,150,4  script  DisplayNPC  115,{
    mes "[Timer NPC]";
    mes "Select an option:";
    next;
    switch(select("Start 10s Timer:Stop Timer:Add 5s to Timer")) {
    case 1:
        dispbottom "Starting a 10 second timer...";
        addtimer 10000, strnpcinfo(3) + "::OnTimerExpired";
        break;
    case 2:
        dispbottom "Stopping the timer.";
        deltimer strnpcinfo(3) + "::OnTimerExpired";
        break;
    case 3:
        dispbottom "Adding 5 seconds to the timer.";
        addtimercount 5000, strnpcinfo(3) + "::OnTimerExpired";
        break;
    }
    close;

OnTimerExpired:
    dispbottom "Timer has expired!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*deltimer "NPC::OnLabel";

*addtimer <ticks>,"NPC::OnLabel";

*addtimercount <ticks>,"NPC::OnLabel";
</syntax>

<description>
These commands will create, destroy, and delay a countdown timer - addtimer to create, deltimer to destroy, and addtimercount to delay it by the specified number of ticks. For all three cases, the event label given is the identifier of that timer. The timer runs on the character object that is attached to the script, and can have multiple instances. When the label is run, it is run as if the player that the timer runs on has clicked the NPC.

When this timer runs out, a new execution thread will start in the specified NPC object at the specified label.

The ticks are given in 1/1000ths of a second.

One more thing. These timers are stored as part of player data. If the player logs out, all of these get immediately deleted, without executing the script. If this behavior is undesirable, use some other timer mechanism (like sleep).

<example_code>
<NPC Header> {
    dispbottom "Starting a 5 second timer...";
    addtimer 5000, strnpcinfo(3) + "::On5secs";
    end;
On5secs:
    dispbottom "5 seconds have passed!";
    end;
}
</example_code>
<example_code>
// Complete working example
prontera,150,150,4  script  DisplayNPC  115,{
    mes "[Timer NPC]";
    mes "Select an option:";
    next;
    switch(select("Start 10s Timer:Stop Timer:Add 5s to Timer")) {
    case 1:
        dispbottom "Starting a 10 second timer...";
        addtimer 10000, strnpcinfo(3) + "::OnTimerExpired";
        break;
    case 2:
        dispbottom "Stopping the timer.";
        deltimer strnpcinfo(3) + "::OnTimerExpired";
        break;
    case 3:
        dispbottom "Adding 5 seconds to the timer.";
        addtimercount 5000, strnpcinfo(3) + "::OnTimerExpired";
        break;
    }
    close;

OnTimerExpired:
    dispbottom "Timer has expired!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*addtimercount <ticks>,"NPC::OnLabel";

*deltimer "NPC::OnLabel";

*addtimer <ticks>,"NPC::OnLabel";
</syntax>

<description>
These commands will create, destroy, and delay a countdown timer - addtimer to create, deltimer to destroy, and addtimercount to delay it by the specified number of ticks. For all three cases, the event label given is the identifier of that timer. The timer runs on the character object that is attached to the script, and can have multiple instances. When the label is run, it is run as if the player that the timer runs on has clicked the NPC.

When this timer runs out, a new execution thread will start in the specified NPC object at the specified label.

The ticks are given in 1/1000ths of a second.

One more thing. These timers are stored as part of player data. If the player logs out, all of these get immediately deleted, without executing the script. If this behavior is undesirable, use some other timer mechanism (like sleep).

<example_code>
<NPC Header> {
    dispbottom "Starting a 5 second timer...";
    addtimer 5000, strnpcinfo(3) + "::On5secs";
    end;
On5secs:
    dispbottom "5 seconds have passed!";
    end;
}
</example_code>
<example_code>
// Complete working example
prontera,150,150,4  script  DisplayNPC  115,{
    mes "[Timer NPC]";
    mes "Select an option:";
    next;
    switch(select("Start 10s Timer:Stop Timer:Add 5s to Timer")) {
    case 1:
        dispbottom "Starting a 10 second timer...";
        addtimer 10000, strnpcinfo(3) + "::OnTimerExpired";
        break;
    case 2:
        dispbottom "Stopping the timer.";
        deltimer strnpcinfo(3) + "::OnTimerExpired";
        break;
    case 3:
        dispbottom "Adding 5 seconds to the timer.";
        addtimercount 5000, strnpcinfo(3) + "::OnTimerExpired";
        break;
    }
    close;

OnTimerExpired:
    dispbottom "Timer has expired!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*initnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*stopnpctimer{ "<NPC name>" {, <Detach Flag>} } | { "<NPC name>" | <Detach Flag> };

*startnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*setnpctimer <tick>{,"<NPC name>"};

*getnpctimer(<type of information>{,"<NPC name>"})

*attachnpctimer {"<character name>"};

*detachnpctimer {"<NPC name>"};
</syntax>

<description>
This set of commands and functions will create and manage an NPC-based timer. The NPC name may be omitted, in which case the calling NPC is used as target.

Contrary to addtimer/deltimer commands which let you have many different timers referencing different labels in the same NPC, each with their own countdown, initnpctimer can only have one per NPC object. But it can trigger many labels and let you know how many were triggered already and how many still remain.

This timer is counting up from 0 in ticks of 1/1000ths of a second each. Upon creating this timer, the execution will not stop, but will happily continue onward. The timer will then invoke new execution threads at labels "OnTimer<time>:" in the NPC object it is attached to.

To create the timer, use initnpctimer, which will start it running. stopnpctimer will pause the timer, without clearing the current tick, while startnpctimer will let the paused timer continue.

By default timers do not have a RID attached, which lets them continue even if the player that started them logs off. To attach a RID to a timer, you can either use the optional attach flag when using initnpctimer/startnpctimer, or do it manually by using attachnpctimer. Likewise, the optional flag of stopnpctimer lets you detach any RID after stopping the timer, and by using detachnpctimer you can detach a RID at any time.

Normally there is only a single timer per NPC, but as an exception, as long as you attach a player to the timer, you can have multiple timers running at once, because these will get stored on the players instead of the NPC. NOTE: You need to attach the RID before the timer before you start it to get a player-attached timer. Otherwise it'll stay a NPC timer (no effect).

If the player that is attached to the npctimer logs out, the "OnTimerQuit:" event label of that NPC will be triggered, so you can do the appropriate cleanup (the player is still attached when this event is triggered).

The setnpctimer command will explicitly set the timer to a given tick. getnpctimer provides timer information. Its parameter defines what type:

0 - Will return the current tick count of the timer.
1 - Will return 1 if there are remaining "OnTimer<ticks>:" labels in the specified NPC waiting for execution.
2 - Will return the number of times the timer has triggered and will trigger an "OnTimer<tick>:" label in the specified NPC.

<example_code>
<NPC Header> {
    // We need to use attachnpctimer because the mes command below needs RID attach
    attachnpctimer;
    initnpctimer;
    npctalk "I cant talk right now, give me 10 seconds";
    end;
OnTimer5000:
    npctalk "Ok 5 seconds more";
    end;
OnTimer6000:
    npctalk "4";
    end;
OnTimer7000:
    npctalk "3";
    end;
OnTimer8000:
    npctalk "2";
    end;
OnTimer9000:
    npctalk "1";
    end;
OnTimer10000:
    stopnpctimer;
    mes "[Man]";
    mes "Ok we can talk now";
    detachnpctimer;
    // and remember attachnpctimer and detachnpctimer can only be used while the NPC timer is not running
}
</example_code>
<example_code>
OnTimer15000:
    npctalk "Another 15 seconds have passed.";
    // You have to use initnpctimer instead of setnpctimer 0.
    // This is equal to setnpctimer 0 + startnpctimer.
    // Alternatively, you can also insert another OnTimer15001 label so that the timer won't stop.
    initnpctimer;
    end;

// This OnInit label will run when the script is loaded, so that the timer
// is initialized immediately as the server starts. It is dropped back to 0
// every time the NPC says something, so it will cycle continuously.
OnInit:
    initnpctimer;
    end;
</example_code>
<example_code>
mes "[Man]";
mes "I have been waiting " + (getnpctimer(0) / 1000) + " seconds for you.";
// We divide the timer returned by 1000 to convert milliseconds to seconds
close;
</example_code>
<example_code>
mes "[Man]";
mes "Ok, I will let you have 30 more seconds...";
close2;
setnpctimer (getnpctimer(0) - 30000);
// Notice the close2. If there were a next there, the timer would be
// changed only after the player pressed the next button
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*stopnpctimer{ "<NPC name>" {, <Detach Flag>} } | { "<NPC name>" | <Detach Flag> };

*initnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*startnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*setnpctimer <tick>{,"<NPC name>"};

*getnpctimer(<type of information>{,"<NPC name>"})

*attachnpctimer {"<character name>"};

*detachnpctimer {"<NPC name>"};
</syntax>

<description>
This set of commands and functions will create and manage an NPC-based timer. The NPC name may be omitted, in which case the calling NPC is used as target.

Contrary to addtimer/deltimer commands which let you have many different timers referencing different labels in the same NPC, each with their own countdown, initnpctimer can only have one per NPC object. But it can trigger many labels and let you know how many were triggered already and how many still remain.

This timer is counting up from 0 in ticks of 1/1000ths of a second each. Upon creating this timer, the execution will not stop, but will happily continue onward. The timer will then invoke new execution threads at labels "OnTimer<time>:" in the NPC object it is attached to.

To create the timer, use initnpctimer, which will start it running. stopnpctimer will pause the timer, without clearing the current tick, while startnpctimer will let the paused timer continue.

By default timers do not have a RID attached, which lets them continue even if the player that started them logs off. To attach a RID to a timer, you can either use the optional attach flag when using initnpctimer/startnpctimer, or do it manually by using attachnpctimer. Likewise, the optional flag of stopnpctimer lets you detach any RID after stopping the timer, and by using detachnpctimer you can detach a RID at any time.

Normally there is only a single timer per NPC, but as an exception, as long as you attach a player to the timer, you can have multiple timers running at once, because these will get stored on the players instead of the NPC. NOTE: You need to attach the RID before the timer before you start it to get a player-attached timer. Otherwise it'll stay a NPC timer (no effect).

If the player that is attached to the npctimer logs out, the "OnTimerQuit:" event label of that NPC will be triggered, so you can do the appropriate cleanup (the player is still attached when this event is triggered).

The setnpctimer command will explicitly set the timer to a given tick. getnpctimer provides timer information. Its parameter defines what type:

0 - Will return the current tick count of the timer.
1 - Will return 1 if there are remaining "OnTimer<ticks>:" labels in the specified NPC waiting for execution.
2 - Will return the number of times the timer has triggered and will trigger an "OnTimer<tick>:" label in the specified NPC.

<example_code>
<NPC Header> {
    // We need to use attachnpctimer because the mes command below needs RID attach
    attachnpctimer;
    initnpctimer;
    npctalk "I cant talk right now, give me 10 seconds";
    end;
OnTimer5000:
    npctalk "Ok 5 seconds more";
    end;
OnTimer6000:
    npctalk "4";
    end;
OnTimer7000:
    npctalk "3";
    end;
OnTimer8000:
    npctalk "2";
    end;
OnTimer9000:
    npctalk "1";
    end;
OnTimer10000:
    stopnpctimer;
    mes "[Man]";
    mes "Ok we can talk now";
    detachnpctimer;
    // and remember attachnpctimer and detachnpctimer can only be used while the NPC timer is not running
}
</example_code>
<example_code>
OnTimer15000:
    npctalk "Another 15 seconds have passed.";
    // You have to use initnpctimer instead of setnpctimer 0.
    // This is equal to setnpctimer 0 + startnpctimer.
    // Alternatively, you can also insert another OnTimer15001 label so that the timer won't stop.
    initnpctimer;
    end;

// This OnInit label will run when the script is loaded, so that the timer
// is initialized immediately as the server starts. It is dropped back to 0
// every time the NPC says something, so it will cycle continuously.
OnInit:
    initnpctimer;
    end;
</example_code>
<example_code>
mes "[Man]";
mes "I have been waiting " + (getnpctimer(0) / 1000) + " seconds for you.";
// We divide the timer returned by 1000 to convert milliseconds to seconds
close;
</example_code>
<example_code>
mes "[Man]";
mes "Ok, I will let you have 30 more seconds...";
close2;
setnpctimer (getnpctimer(0) - 30000);
// Notice the close2. If there were a next there, the timer would be
// changed only after the player pressed the next button
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*startnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*initnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*stopnpctimer{ "<NPC name>" {, <Detach Flag>} } | { "<NPC name>" | <Detach Flag> };

*setnpctimer <tick>{,"<NPC name>"};

*getnpctimer(<type of information>{,"<NPC name>"})

*attachnpctimer {"<character name>"};

*detachnpctimer {"<NPC name>"};
</syntax>

<description>
This set of commands and functions will create and manage an NPC-based timer. The NPC name may be omitted, in which case the calling NPC is used as target.

Contrary to addtimer/deltimer commands which let you have many different timers referencing different labels in the same NPC, each with their own countdown, initnpctimer can only have one per NPC object. But it can trigger many labels and let you know how many were triggered already and how many still remain.

This timer is counting up from 0 in ticks of 1/1000ths of a second each. Upon creating this timer, the execution will not stop, but will happily continue onward. The timer will then invoke new execution threads at labels "OnTimer<time>:" in the NPC object it is attached to.

To create the timer, use initnpctimer, which will start it running. stopnpctimer will pause the timer, without clearing the current tick, while startnpctimer will let the paused timer continue.

By default timers do not have a RID attached, which lets them continue even if the player that started them logs off. To attach a RID to a timer, you can either use the optional attach flag when using initnpctimer/startnpctimer, or do it manually by using attachnpctimer. Likewise, the optional flag of stopnpctimer lets you detach any RID after stopping the timer, and by using detachnpctimer you can detach a RID at any time.

Normally there is only a single timer per NPC, but as an exception, as long as you attach a player to the timer, you can have multiple timers running at once, because these will get stored on the players instead of the NPC. NOTE: You need to attach the RID before the timer before you start it to get a player-attached timer. Otherwise it'll stay a NPC timer (no effect).

If the player that is attached to the npctimer logs out, the "OnTimerQuit:" event label of that NPC will be triggered, so you can do the appropriate cleanup (the player is still attached when this event is triggered).

The setnpctimer command will explicitly set the timer to a given tick. getnpctimer provides timer information. Its parameter defines what type:

0 - Will return the current tick count of the timer.
1 - Will return 1 if there are remaining "OnTimer<ticks>:" labels in the specified NPC waiting for execution.
2 - Will return the number of times the timer has triggered and will trigger an "OnTimer<tick>:" label in the specified NPC.

<example_code>
<NPC Header> {
    // We need to use attachnpctimer because the mes command below needs RID attach
    attachnpctimer;
    initnpctimer;
    npctalk "I cant talk right now, give me 10 seconds";
    end;
OnTimer5000:
    npctalk "Ok 5 seconds more";
    end;
OnTimer6000:
    npctalk "4";
    end;
OnTimer7000:
    npctalk "3";
    end;
OnTimer8000:
    npctalk "2";
    end;
OnTimer9000:
    npctalk "1";
    end;
OnTimer10000:
    stopnpctimer;
    mes "[Man]";
    mes "Ok we can talk now";
    detachnpctimer;
    // and remember attachnpctimer and detachnpctimer can only be used while the NPC timer is not running
}
</example_code>
<example_code>
OnTimer15000:
    npctalk "Another 15 seconds have passed.";
    // You have to use initnpctimer instead of setnpctimer 0.
    // This is equal to setnpctimer 0 + startnpctimer.
    // Alternatively, you can also insert another OnTimer15001 label so that the timer won't stop.
    initnpctimer;
    end;

// This OnInit label will run when the script is loaded, so that the timer
// is initialized immediately as the server starts. It is dropped back to 0
// every time the NPC says something, so it will cycle continuously.
OnInit:
    initnpctimer;
    end;
</example_code>
<example_code>
mes "[Man]";
mes "I have been waiting " + (getnpctimer(0) / 1000) + " seconds for you.";
// We divide the timer returned by 1000 to convert milliseconds to seconds
close;
</example_code>
<example_code>
mes "[Man]";
mes "Ok, I will let you have 30 more seconds...";
close2;
setnpctimer (getnpctimer(0) - 30000);
// Notice the close2. If there were a next there, the timer would be
// changed only after the player pressed the next button
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>    
*setnpctimer <tick>{,"<NPC name>"};

*getnpctimer(<type of information>{,"<NPC name>"})

*attachnpctimer {"<character name>"};

*detachnpctimer {"<NPC name>"};

*startnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*initnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*stopnpctimer{ "<NPC name>" {, <Detach Flag>} } | { "<NPC name>" | <Detach Flag> };
</syntax>

<description>
This set of commands and functions will create and manage an NPC-based timer. The NPC name may be omitted, in which case the calling NPC is used as target.

Contrary to addtimer/deltimer commands which let you have many different timers referencing different labels in the same NPC, each with their own countdown, initnpctimer can only have one per NPC object. But it can trigger many labels and let you know how many were triggered already and how many still remain.

This timer is counting up from 0 in ticks of 1/1000ths of a second each. Upon creating this timer, the execution will not stop, but will happily continue onward. The timer will then invoke new execution threads at labels "OnTimer<time>:" in the NPC object it is attached to.

To create the timer, use initnpctimer, which will start it running. stopnpctimer will pause the timer, without clearing the current tick, while startnpctimer will let the paused timer continue.

By default timers do not have a RID attached, which lets them continue even if the player that started them logs off. To attach a RID to a timer, you can either use the optional attach flag when using initnpctimer/startnpctimer, or do it manually by using attachnpctimer. Likewise, the optional flag of stopnpctimer lets you detach any RID after stopping the timer, and by using detachnpctimer you can detach a RID at any time.

Normally there is only a single timer per NPC, but as an exception, as long as you attach a player to the timer, you can have multiple timers running at once, because these will get stored on the players instead of the NPC. NOTE: You need to attach the RID before the timer before you start it to get a player-attached timer. Otherwise it'll stay a NPC timer (no effect).

If the player that is attached to the npctimer logs out, the "OnTimerQuit:" event label of that NPC will be triggered, so you can do the appropriate cleanup (the player is still attached when this event is triggered).

The setnpctimer command will explicitly set the timer to a given tick. getnpctimer provides timer information. Its parameter defines what type:

0 - Will return the current tick count of the timer.
1 - Will return 1 if there are remaining "OnTimer<ticks>:" labels in the specified NPC waiting for execution.
2 - Will return the number of times the timer has triggered and will trigger an "OnTimer<tick>:" label in the specified NPC.

<example_code>
<NPC Header> {
    // We need to use attachnpctimer because the mes command below needs RID attach
    attachnpctimer;
    initnpctimer;
    npctalk "I cant talk right now, give me 10 seconds";
    end;
OnTimer5000:
    npctalk "Ok 5 seconds more";
    end;
OnTimer6000:
    npctalk "4";
    end;
OnTimer7000:
    npctalk "3";
    end;
OnTimer8000:
    npctalk "2";
    end;
OnTimer9000:
    npctalk "1";
    end;
OnTimer10000:
    stopnpctimer;
    mes "[Man]";
    mes "Ok we can talk now";
    detachnpctimer;
    // and remember attachnpctimer and detachnpctimer can only be used while the NPC timer is not running
}
</example_code>
<example_code>
OnTimer15000:
    npctalk "Another 15 seconds have passed.";
    // You have to use initnpctimer instead of setnpctimer 0.
    // This is equal to setnpctimer 0 + startnpctimer.
    // Alternatively, you can also insert another OnTimer15001 label so that the timer won't stop.
    initnpctimer;
    end;

// This OnInit label will run when the script is loaded, so that the timer
// is initialized immediately as the server starts. It is dropped back to 0
// every time the NPC says something, so it will cycle continuously.
OnInit:
    initnpctimer;
    end;
</example_code>
<example_code>
mes "[Man]";
mes "I have been waiting " + (getnpctimer(0) / 1000) + " seconds for you.";
// We divide the timer returned by 1000 to convert milliseconds to seconds
close;
</example_code>
<example_code>
mes "[Man]";
mes "Ok, I will let you have 30 more seconds...";
close2;
setnpctimer (getnpctimer(0) - 30000);
// Notice the close2. If there were a next there, the timer would be
// changed only after the player pressed the next button
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>    
*getnpctimer(<type of information>{,"<NPC name>"})

*attachnpctimer {"<character name>"};

*detachnpctimer {"<NPC name>"};

*startnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*initnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*stopnpctimer{ "<NPC name>" {, <Detach Flag>} } | { "<NPC name>" | <Detach Flag> };

*setnpctimer <tick>{,"<NPC name>"};
</syntax>

<description>
This set of commands and functions will create and manage an NPC-based timer. The NPC name may be omitted, in which case the calling NPC is used as target.

Contrary to addtimer/deltimer commands which let you have many different timers referencing different labels in the same NPC, each with their own countdown, initnpctimer can only have one per NPC object. But it can trigger many labels and let you know how many were triggered already and how many still remain.

This timer is counting up from 0 in ticks of 1/1000ths of a second each. Upon creating this timer, the execution will not stop, but will happily continue onward. The timer will then invoke new execution threads at labels "OnTimer<time>:" in the NPC object it is attached to.

To create the timer, use initnpctimer, which will start it running. stopnpctimer will pause the timer, without clearing the current tick, while startnpctimer will let the paused timer continue.

By default timers do not have a RID attached, which lets them continue even if the player that started them logs off. To attach a RID to a timer, you can either use the optional attach flag when using initnpctimer/startnpctimer, or do it manually by using attachnpctimer. Likewise, the optional flag of stopnpctimer lets you detach any RID after stopping the timer, and by using detachnpctimer you can detach a RID at any time.

Normally there is only a single timer per NPC, but as an exception, as long as you attach a player to the timer, you can have multiple timers running at once, because these will get stored on the players instead of the NPC. NOTE: You need to attach the RID before the timer before you start it to get a player-attached timer. Otherwise it'll stay a NPC timer (no effect).

If the player that is attached to the npctimer logs out, the "OnTimerQuit:" event label of that NPC will be triggered, so you can do the appropriate cleanup (the player is still attached when this event is triggered).

The setnpctimer command will explicitly set the timer to a given tick. getnpctimer provides timer information. Its parameter defines what type:

0 - Will return the current tick count of the timer.
1 - Will return 1 if there are remaining "OnTimer<ticks>:" labels in the specified NPC waiting for execution.
2 - Will return the number of times the timer has triggered and will trigger an "OnTimer<tick>:" label in the specified NPC.

<example_code>
<NPC Header> {
    // We need to use attachnpctimer because the mes command below needs RID attach
    attachnpctimer;
    initnpctimer;
    npctalk "I cant talk right now, give me 10 seconds";
    end;
OnTimer5000:
    npctalk "Ok 5 seconds more";
    end;
OnTimer6000:
    npctalk "4";
    end;
OnTimer7000:
    npctalk "3";
    end;
OnTimer8000:
    npctalk "2";
    end;
OnTimer9000:
    npctalk "1";
    end;
OnTimer10000:
    stopnpctimer;
    mes "[Man]";
    mes "Ok we can talk now";
    detachnpctimer;
    // and remember attachnpctimer and detachnpctimer can only be used while the NPC timer is not running
}
</example_code>
<example_code>
OnTimer15000:
    npctalk "Another 15 seconds have passed.";
    // You have to use initnpctimer instead of setnpctimer 0.
    // This is equal to setnpctimer 0 + startnpctimer.
    // Alternatively, you can also insert another OnTimer15001 label so that the timer won't stop.
    initnpctimer;
    end;

// This OnInit label will run when the script is loaded, so that the timer
// is initialized immediately as the server starts. It is dropped back to 0
// every time the NPC says something, so it will cycle continuously.
OnInit:
    initnpctimer;
    end;
</example_code>
<example_code>
mes "[Man]";
mes "I have been waiting " + (getnpctimer(0) / 1000) + " seconds for you.";
// We divide the timer returned by 1000 to convert milliseconds to seconds
close;
</example_code>
<example_code>
mes "[Man]";
mes "Ok, I will let you have 30 more seconds...";
close2;
setnpctimer (getnpctimer(0) - 30000);
// Notice the close2. If there were a next there, the timer would be
// changed only after the player pressed the next button
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>   
*attachnpctimer {"<character name>"};

*detachnpctimer {"<NPC name>"};

*startnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*initnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*stopnpctimer{ "<NPC name>" {, <Detach Flag>} } | { "<NPC name>" | <Detach Flag> };

*setnpctimer <tick>{,"<NPC name>"};

*getnpctimer(<type of information>{,"<NPC name>"})
</syntax>

<description>
This set of commands and functions will create and manage an NPC-based timer. The NPC name may be omitted, in which case the calling NPC is used as target.

Contrary to addtimer/deltimer commands which let you have many different timers referencing different labels in the same NPC, each with their own countdown, initnpctimer can only have one per NPC object. But it can trigger many labels and let you know how many were triggered already and how many still remain.

This timer is counting up from 0 in ticks of 1/1000ths of a second each. Upon creating this timer, the execution will not stop, but will happily continue onward. The timer will then invoke new execution threads at labels "OnTimer<time>:" in the NPC object it is attached to.

To create the timer, use initnpctimer, which will start it running. stopnpctimer will pause the timer, without clearing the current tick, while startnpctimer will let the paused timer continue.

By default timers do not have a RID attached, which lets them continue even if the player that started them logs off. To attach a RID to a timer, you can either use the optional attach flag when using initnpctimer/startnpctimer, or do it manually by using attachnpctimer. Likewise, the optional flag of stopnpctimer lets you detach any RID after stopping the timer, and by using detachnpctimer you can detach a RID at any time.

Normally there is only a single timer per NPC, but as an exception, as long as you attach a player to the timer, you can have multiple timers running at once, because these will get stored on the players instead of the NPC. NOTE: You need to attach the RID before the timer before you start it to get a player-attached timer. Otherwise it'll stay a NPC timer (no effect).

If the player that is attached to the npctimer logs out, the "OnTimerQuit:" event label of that NPC will be triggered, so you can do the appropriate cleanup (the player is still attached when this event is triggered).

The setnpctimer command will explicitly set the timer to a given tick. getnpctimer provides timer information. Its parameter defines what type:

0 - Will return the current tick count of the timer.
1 - Will return 1 if there are remaining "OnTimer<ticks>:" labels in the specified NPC waiting for execution.
2 - Will return the number of times the timer has triggered and will trigger an "OnTimer<tick>:" label in the specified NPC.

<example_code>
<NPC Header> {
    // We need to use attachnpctimer because the mes command below needs RID attach
    attachnpctimer;
    initnpctimer;
    npctalk "I cant talk right now, give me 10 seconds";
    end;
OnTimer5000:
    npctalk "Ok 5 seconds more";
    end;
OnTimer6000:
    npctalk "4";
    end;
OnTimer7000:
    npctalk "3";
    end;
OnTimer8000:
    npctalk "2";
    end;
OnTimer9000:
    npctalk "1";
    end;
OnTimer10000:
    stopnpctimer;
    mes "[Man]";
    mes "Ok we can talk now";
    detachnpctimer;
    // and remember attachnpctimer and detachnpctimer can only be used while the NPC timer is not running
}
</example_code>
<example_code>
OnTimer15000:
    npctalk "Another 15 seconds have passed.";
    // You have to use initnpctimer instead of setnpctimer 0.
    // This is equal to setnpctimer 0 + startnpctimer.
    // Alternatively, you can also insert another OnTimer15001 label so that the timer won't stop.
    initnpctimer;
    end;

// This OnInit label will run when the script is loaded, so that the timer
// is initialized immediately as the server starts. It is dropped back to 0
// every time the NPC says something, so it will cycle continuously.
OnInit:
    initnpctimer;
    end;
</example_code>
<example_code>
mes "[Man]";
mes "I have been waiting " + (getnpctimer(0) / 1000) + " seconds for you.";
// We divide the timer returned by 1000 to convert milliseconds to seconds
close;
</example_code>
<example_code>
mes "[Man]";
mes "Ok, I will let you have 30 more seconds...";
close2;
setnpctimer (getnpctimer(0) - 30000);
// Notice the close2. If there were a next there, the timer would be
// changed only after the player pressed the next button
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*detachnpctimer {"<NPC name>"};

*attachnpctimer {"<character name>"};

*startnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*initnpctimer{ "<NPC name>" {, <Attach Flag>} } | { "<NPC name>" | <Attach Flag> };

*stopnpctimer{ "<NPC name>" {, <Detach Flag>} } | { "<NPC name>" | <Detach Flag> };

*setnpctimer <tick>{,"<NPC name>"};
    
*getnpctimer(<type of information>{,"<NPC name>"})
</syntax>

<description>
This set of commands and functions will create and manage an NPC-based timer. The NPC name may be omitted, in which case the calling NPC is used as target.

Contrary to addtimer/deltimer commands which let you have many different timers referencing different labels in the same NPC, each with their own countdown, initnpctimer can only have one per NPC object. But it can trigger many labels and let you know how many were triggered already and how many still remain.

This timer is counting up from 0 in ticks of 1/1000ths of a second each. Upon creating this timer, the execution will not stop, but will happily continue onward. The timer will then invoke new execution threads at labels "OnTimer<time>:" in the NPC object it is attached to.

To create the timer, use initnpctimer, which will start it running. stopnpctimer will pause the timer, without clearing the current tick, while startnpctimer will let the paused timer continue.

By default timers do not have a RID attached, which lets them continue even if the player that started them logs off. To attach a RID to a timer, you can either use the optional attach flag when using initnpctimer/startnpctimer, or do it manually by using attachnpctimer. Likewise, the optional flag of stopnpctimer lets you detach any RID after stopping the timer, and by using detachnpctimer you can detach a RID at any time.

Normally there is only a single timer per NPC, but as an exception, as long as you attach a player to the timer, you can have multiple timers running at once, because these will get stored on the players instead of the NPC. NOTE: You need to attach the RID before the timer before you start it to get a player-attached timer. Otherwise it'll stay a NPC timer (no effect).

If the player that is attached to the npctimer logs out, the "OnTimerQuit:" event label of that NPC will be triggered, so you can do the appropriate cleanup (the player is still attached when this event is triggered).

The setnpctimer command will explicitly set the timer to a given tick. getnpctimer provides timer information. Its parameter defines what type:

0 - Will return the current tick count of the timer.
1 - Will return 1 if there are remaining "OnTimer<ticks>:" labels in the specified NPC waiting for execution.
2 - Will return the number of times the timer has triggered and will trigger an "OnTimer<tick>:" label in the specified NPC.

<example_code>
<NPC Header> {
    // We need to use attachnpctimer because the mes command below needs RID attach
    attachnpctimer;
    initnpctimer;
    npctalk "I cant talk right now, give me 10 seconds";
    end;
OnTimer5000:
    npctalk "Ok 5 seconds more";
    end;
OnTimer6000:
    npctalk "4";
    end;
OnTimer7000:
    npctalk "3";
    end;
OnTimer8000:
    npctalk "2";
    end;
OnTimer9000:
    npctalk "1";
    end;
OnTimer10000:
    stopnpctimer;
    mes "[Man]";
    mes "Ok we can talk now";
    detachnpctimer;
    // and remember attachnpctimer and detachnpctimer can only be used while the NPC timer is not running
}
</example_code>
<example_code>
OnTimer15000:
    npctalk "Another 15 seconds have passed.";
    // You have to use initnpctimer instead of setnpctimer 0.
    // This is equal to setnpctimer 0 + startnpctimer.
    // Alternatively, you can also insert another OnTimer15001 label so that the timer won't stop.
    initnpctimer;
    end;

// This OnInit label will run when the script is loaded, so that the timer
// is initialized immediately as the server starts. It is dropped back to 0
// every time the NPC says something, so it will cycle continuously.
OnInit:
    initnpctimer;
    end;
</example_code>
<example_code>
mes "[Man]";
mes "I have been waiting " + (getnpctimer(0) / 1000) + " seconds for you.";
// We divide the timer returned by 1000 to convert milliseconds to seconds
close;
</example_code>
<example_code>
mes "[Man]";
mes "Ok, I will let you have 30 more seconds...";
close2;
setnpctimer (getnpctimer(0) - 30000);
// Notice the close2. If there were a next there, the timer would be
// changed only after the player pressed the next button
end;
</example_code>
---------------------- Breakline ----------------------
<syntax>
*sleep {<milliseconds>};

*sleep2 {<milliseconds>};

*awake "<NPC name>";
</syntax>

<description>
These commands are used to control the pause of an NPC. sleep and sleep2 will pause the script for the given amount of milliseconds. Awake is used to cancel a sleep. When awake is called on an NPC, it will run as if the sleep timer ran out, thus making the script continue. Sleep and sleep2 basically do the same, but the main difference is that sleep will not keep the RID, while sleep2 does. Also sleep2 will stop the script if there is no unit attached.

<example_code>
sleep 10000; // pause the script for 10 seconds and ditch the RID (so no player is attached anymore)
</example_code>
<example_code>
sleep2 5000; // pause the script for 5 seconds, and continue with the RID attached
</example_code>
<example_code>
awake "NPC"; // Cancels any running sleep timers on the NPC 'NPC'
</example_code>
<example_code>
// Complete working example
prontera,150,150,4  script  SleepNPC  115,{
    mes "[Sleep NPC]";
    mes "I will sleep for 5 seconds...";
    close2;
    sleep 5000;
    npctalk "I'm awake!";
    end;
}

prontera,150,150,4  script  AwakeNPC  115,{
    mes "[Wake NPC]";
    mes "Click here to wake up the Sleep NPC.";
    next;
    awake "SleepNPC";
    mes "Done!";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sleep2 {<milliseconds>};

*awake "<NPC name>";

*sleep {<milliseconds>};
</syntax>

<description>
These commands are used to control the pause of an NPC. sleep and sleep2 will pause the script for the given amount of milliseconds. Awake is used to cancel a sleep. When awake is called on an NPC, it will run as if the sleep timer ran out, thus making the script continue. Sleep and sleep2 basically do the same, but the main difference is that sleep will not keep the RID, while sleep2 does. Also sleep2 will stop the script if there is no unit attached.

<example_code>
sleep 10000; // pause the script for 10 seconds and ditch the RID (so no player is attached anymore)
</example_code>
<example_code>
sleep2 5000; // pause the script for 5 seconds, and continue with the RID attached
</example_code>
<example_code>
awake "NPC"; // Cancels any running sleep timers on the NPC 'NPC'
</example_code>
<example_code>
// Complete working example
prontera,150,150,4  script  SleepNPC  115,{
    mes "[Sleep NPC]";
    mes "I will sleep for 5 seconds...";
    close2;
    sleep 5000;
    npctalk "I'm awake!";
    end;
}

prontera,150,150,4  script  AwakeNPC  115,{
    mes "[Wake NPC]";
    mes "Click here to wake up the Sleep NPC.";
    next;
    awake "SleepNPC";
    mes "Done!";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*awake "<NPC name>";
    
*sleep {<milliseconds>};

*sleep2 {<milliseconds>};
</syntax>

<description>
These commands are used to control the pause of an NPC. sleep and sleep2 will pause the script for the given amount of milliseconds. Awake is used to cancel a sleep. When awake is called on an NPC, it will run as if the sleep timer ran out, thus making the script continue. Sleep and sleep2 basically do the same, but the main difference is that sleep will not keep the RID, while sleep2 does. Also sleep2 will stop the script if there is no unit attached.

<example_code>
sleep 10000; // pause the script for 10 seconds and ditch the RID (so no player is attached anymore)
</example_code>
<example_code>
sleep2 5000; // pause the script for 5 seconds, and continue with the RID attached
</example_code>
<example_code>
awake "NPC"; // Cancels any running sleep timers on the NPC 'NPC'
</example_code>
<example_code>
// Complete working example
prontera,150,150,4  script  SleepNPC  115,{
    mes "[Sleep NPC]";
    mes "I will sleep for 5 seconds...";
    close2;
    sleep 5000;
    npctalk "I'm awake!";
    end;
}

prontera,150,150,4  script  AwakeNPC  115,{
    mes "[Wake NPC]";
    mes "Click here to wake up the Sleep NPC.";
    next;
    awake "SleepNPC";
    mes "Done!";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*progressbar "<color>",<seconds>;
</syntax>

<description>
This command works almost like sleep2, but displays a progress bar above the head of the currently attached character (like a cast bar). Once the given amount of seconds passes, the script resumes. If the character moves while the progress bar progresses, it is aborted and the script ends. The color format is in RGB (RRGGBB). The color is currently ignored by the client and appears always green.

NOTE: Ragexe clients are known to randomly crash if a message window is still open. If possible, make sure to close all message windows before triggering the progressbar command.

<example_code>
// Display a 3-second progress bar
mes "[Healer]";
mes "I will heal you in 3 seconds. Don't move!";
close2;
progressbar "00FF00", 3;
percentheal 100, 100;
mes "You have been fully healed!";
close;
</example_code>
<example_code>
// Custom color (though currently ignored by client)
progressbar "FF0000", 5; // 5 second red progress bar
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*progressbar_npc "<color>",<seconds>{,<"NPC Name">};
</syntax>

<description>
This command works like progressbar, but displays a progress bar above the head of the currently attached (or given) NPC. Once the given amount of seconds passes, the script resumes. The color format is in RGB (RRGGBB). The color is currently ignored by the client and appears always green.

<example_code>
// Display a 3-second progress bar above the attached NPC
progressbar_npc "00FF00", 3;
npctalk "The process is complete!";
</example_code>
<example_code>
// Display a 5-second progress bar above a specific NPC
progressbar_npc "FF0000", 5, "MyNPC";
npctalk "Done!", "MyNPC";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*announce "<text>",<flag>{,<fontColor>{,<fontType>{,<fontSize>{,<fontAlign>{,<fontY>{,<char_id>}}}}}};
</syntax>

<description>
This command will broadcast a message to all or most players, similar to @kami/@kamib GM commands.

The region the broadcast is heard in (target), source of the broadcast, and the color the message will come up as is determined by the flags.

The flag values are coded as constants in src/map/script_constants.hpp to make them easier to use.

Target flags:
- bc_all: Broadcast message is sent server-wide (default).
- bc_map: Message is sent to everyone in the same map as the source of the broadcast (see below).
- bc_area: Message is sent to players in the vicinity of the source.
- bc_self: Message is sent only to the current player; if the source flag is bc_pc, it can also be used to send the message to the character ID if provided.
You cannot use more than one target flag.

Source flags:
- bc_pc: Broadcast source is the attached player or the character ID if provided (default).
- bc_npc: Broadcast source is the NPC, not the player attached to the script (useful when a player is not attached or the message should be sent to those nearby the NPC).
You cannot use more than one source flag.

Special flags:
- bc_yellow: Broadcast will be displayed in yellow color (default).
- bc_blue: Broadcast will be displayed in blue color.
- bc_woe: Indicates that this broadcast is WoE Information that can be disabled client-side.
Due to the way the client handles broadcasts, it is impossible to set both bc_blue and bc_woe.

The optional parameters allow usage of broadcasts in custom colors, font-weights, sizes, etc. If any of the optional parameters is used, the special flag is ignored. Optional parameters may not work well (or at all) depending on the game client used.

The color parameter is a single number which can be in hexadecimal notation. The color format is in RGB (0xRRGGBB).

In official scripts, only two font-weights (types) are used:
- normal (FW_NORMAL = 400, default)
- bold (FW_BOLD = 700)

Default font size is 12.

Using this for private messages to players is probably not a good idea, but it can be used in NPCs to "preview" an announce.

<example_code>
// This will be a private message to the player using the NPC that made the announcement
announce "This is my message just for you", bc_blue | bc_self;
</example_code>
<example_code>
// This will be shown on everyone's screen that is in sight of the NPC
announce "This is my message just for you people here", bc_npc | bc_area;
</example_code>
<example_code>
// This will be a private message to the player with character ID 150000
announce "This is my message just for char id 150000", bc_self, 0xFFF618, FW_NORMAL, 12, 0, 0, 150000;
</example_code>
<example_code>
// Global announce in green
announce "This will be shown to everyone at all in green.", bc_all, 0x00FF00;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mapannounce "<map name>","<text>",<flag>{,<fontColor>{,<fontType>{,<fontSize>{,<fontAlign>{,<fontY>}}}}};
</syntax>

<description>
This command will work like announce but will only broadcast to characters currently residing on the specified map. The flag and optional parameters are the same as in announce, but target and source flags are ignored.

<example_code>
// Announce to everyone on prontera map
mapannounce "prontera", "Welcome to Prontera!", bc_all;
</example_code>
<example_code>
// Announce in green to everyone on payon map
mapannounce "payon", "The event has started!", bc_all, 0x00FF00;
</example_code>
<example_code>
// Announce in bold to a specific map
mapannounce "morocc", "The battle begins in 5 minutes!", bc_all, 0xFFFF00, FW_BOLD, 14;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*areaannounce "<map name>",<x1>,<y1>,<x2>,<y2>,"<text>",<flag>{,<fontColor>{,<fontType>{,<fontSize>{,<fontAlign>{,<fontY>}}}}};
</syntax>

<description>
This command works like announce but will only broadcast to characters residing in the specified x1/y1-x2/y2 rectangle on the map given. The flags and optional parameters are the same as in announce, but target and source flags are ignored.

<example_code>
areaannounce "prt_church", 0, 0, 350, 350, "God's in his heaven, all right with the world", 0;
</example_code>
<example_code>
// Announce to players within a specific area
areaannounce "prontera", 150, 100, 200, 150, "Welcome to the event area!", bc_all, 0x00FF00;
</example_code>
<example_code>
// Announce in bold to a specific area
areaannounce "payon", 100, 100, 120, 120, "You are in the restricted zone!", bc_all, 0xFF0000, FW_BOLD;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*callshop "<name>"{,<option>};
</syntax>

<description>
These are a series of commands used to create dynamic shops. The callshop function calls an invisible shop (view -1) as if the player clicked on it.

The options are:
0 = The normal window (buy, sell and cancel) (default)
1 = The buy window
2 = The sell window

Note: The <option> parameter only works on the 'shop' type NPC.

A shop called with this command will trigger the labels "OnBuyItem" and "OnSellItem" (as long as an npcshop* command is executed from that NPC, see note below). These labels, if used, will replace how the shop handles the buying and selling of items, allowing for the creation of dynamic shops.

The label "OnBuyItem" sets the following arrays:

<example_code>
@bought_nameid   // item ID bought
@bought_quantity // amount bought
</example_code>
The label "OnSellItem" sets the following arrays:

<example_code>
@sold_nameid        // item ID sold
@sold_quantity      // amount sold
@sold_refine        // refine count
@sold_attribute     // if the item is broken (1) or not (0)
@sold_identify      // if the item is identified (1) or not (0)
@sold_enchantgrade  // enchantgrade
@sold_card1         // card slot 1
@sold_card2         // card slot 2
@sold_card3         // card slot 3
@sold_card4         // card slot 4
@sold_option_id1    // random option ID 1
@sold_option_val1   // random option value 1
@sold_option_param1 // random option param 1
@sold_option_id2    // random option ID 2
@sold_option_val2   // random option value 2
@sold_option_param2 // random option param 2
@sold_option_id3    // random option ID 3
@sold_option_val3   // random option value 3
@sold_option_param3 // random option param 3
@sold_option_id4    // random option ID 4
@sold_option_val4   // random option value 4
@sold_option_param4 // random option param 4
@sold_option_id5    // random option ID 5
@sold_option_val5   // random option value 5
@sold_option_param5 // random option param 5
</example_code>
Note: These labels will only be triggered if an npcshop* command is executed because these commands set a special data on the shop NPC, named master_nd in the source. The above labels are triggered in the NPC whose master_nd is given in the shop.

A full example of a dynamic shop can be found in doc/sample/npc_dynamic_shop.txt.

<example_code>
// Example shop definition
-   shop    MyDynamicShop   100,501:100,502:200

prontera,150,150,4  script  DynamicShop 100,{
    mes "[Dynamic Shop]";
    mes "Welcome to my shop!";
    next;
    callshop "MyDynamicShop", 0;
    end;

OnBuyItem:
    mes "[Dynamic Shop]";
    mes "You bought " + @bought_quantity + "x " + getitemname(@bought_nameid) + ".";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npcshopitem "<name>",<item id>,<price>{,<item id>,<price>{,<item id>,<price>{,...}}};

*npcshopitem "<name>",<item id>,<price>,<stock>{,<item id>,<price>,<stock>{,<item id>,<price>,<stock>{,...}}};
</syntax>

<description>
This command lets you override the contents of an existing NPC shop or cashshop. The current sell list will be wiped, and only the items specified with the price specified will be for sale.

The function returns 1 if the shop was updated successfully, or 0 on failure.

NOTES:
- You cannot use -1 to specify default selling price for cashshops, pointshops, or itemshops.
- If the attached shop type is a market shop, notice that there is an extra parameter after price, <stock>. Make sure to not add duplicate items! For unlimited stock, use -1.

<example_code>
// Update a shop with items and prices
npcshopitem "MyShop", 512, 100, 513, 200, 514, 300;
</example_code>
<example_code>
// Update a market shop with stock
npcshopitem "MarketShop", 512, 100, 10, 513, 200, -1, 514, 300, 5;
</example_code>
<example_code>
// Update a cashshop
npcshopitem "CashShop", 512, 50, 513, 100;
</example_code>
<example_code>
-   shop    MyDynamicShop   100,501:100

prontera,150,150,4  script  ShopManager 100,{
    mes "[Shop Manager]";
    mes "I can update the shop inventory for you.";
    next;
    if (select("Update Shop:Cancel") == 1) {
        // Overwrites the shop with new items: 502 (Orange Potion) at 50z and 503 (Yellow Potion) at 150z
        npcshopitem "MyDynamicShop", 502, 50, 503, 150;
        mes "[Shop Manager]";
        mes "The shop inventory has been updated!";
    }
    close;
}
</example_code> 
</description>
---------------------- Breakline ----------------------
<syntax>
*npcshopadditem "<name>",<item id>,<price>{,<item id>,<price>{,<item id>,<price>{,...}}};

*npcshopadditem "<name>",<item id>,<price>,<stock>{,<item id>,<price>,<stock>{,<item id>,<price>,<stock>{,...}}};
</syntax>

<description>
This command will add more items at the end of the selling list for the specified NPC shop or cashshop. If you specify an item already for sale, that item will appear twice on the sell list.

The function returns 1 if the shop was updated successfully, or 0 on failure.

NOTES:
- You cannot use -1 to specify default selling price for cashshops, pointshops, or itemshops.
- If the attached shop type is a market shop, you need an extra parameter after price, which is <stock>, and make sure not to add duplicate items! For unlimited stock, use -1.

<example_code>
// Add items to a shop
npcshopadditem "MyShop", 512, 100, 513, 200;
</example_code>
<example_code>
// Add items to a market shop with stock
npcshopadditem "MarketShop", 512, 100, 10, 513, 200, -1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npcshopdelitem "<name>",<item id>{,<item id>{,<item id>{,...}}};
</syntax>

<description>
This command will remove items from the specified NPC shop or cashshop. If the item to remove exists more than once in the shop, all instances will be removed.

Note that the function returns 1 even if no items were removed. The return value is only to confirm that the shop was indeed found.

<example_code>
// Remove a single item from a shop
npcshopdelitem "MyShop", 512;
</example_code>
<example_code>
// Remove multiple items from a shop
npcshopdelitem "MyShop", 512, 513, 514;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npcshopattach "<name>"{,<flag>};
</syntax>

<description>
This command will attach the current script to the given NPC shop. When a script is attached to a shop, the events "OnBuyItem" and "OnSellItem" of your script will be executed whenever a player buys/sells from the shop. Additionally, the arrays @bought_nameid[], @bought_quantity[] or @sold_nameid[] and @sold_quantity[] will be filled with the items and quantities bought/sold.

The optional parameter specifies whether to attach (1) or detach (0) from the shop (the default is to attach). Note that detaching will detach any NPC attached to the shop, even if it's from another script, while attaching will override any other script that may be already attached.

The function returns 0 if the shop was not found, 1 otherwise.

NOTES:
- If the attached shop type is a market shop, it will default to calling the buy window.

<example_code>
// Attach the current script to a shop
npcshopattach "MyShop";

// Detach from the shop
npcshopattach "MyShop", 0;
</example_code>
<example_code>
-   shop    MyShop   100,501:100

// Complete example
prontera,150,150,4  script  ShopManager 100,{
    npcshopattach "MyShop";
    callshop "MyShop", 1;
    end;

OnBuyItem:
    mes "[Shop Manager]";
    mes "You bought:";
    for (.@i = 0; .@i < getarraysize(@bought_nameid); .@i++)
        mes .@i + ": " + @bought_quantity[.@i] + "x " + getitemname(@bought_nameid[.@i]);
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npcshopupdate "<name>",<item_id>,<price>{,<stock>}
</syntax>

<description>
Updates an entry from a shop. If the price is 0, it won't be changed. May also be used for marketshops to update the stock quantity. For unlimited stock, use -1. For other shop types, the stock value has no effect.

If the price is -1, it sets it to the default buy price.

The function returns 1 if the shop was updated successfully, or 0 on failure.

NOTES:
- You cannot use -1 to specify default selling price for cashshops, pointshops, or itemshops.

<example_code>
// Update price of item 512 to 150 in shop "MyShop"
npcshopupdate "MyShop", 512, 150;
</example_code>
<example_code>
// Update market shop stock
npcshopupdate "MarketShop", 512, 0, 50; // Change stock to 50
</example_code>
<example_code>
// Reset to default price
npcshopupdate "MyShop", 512, -1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*waitingroom "<chatroom name>",<limit>{,"<event label>"{,<trigger>{,<required zeny>{,<min lvl>{,<max lvl>}}}}};
</syntax>

<description>
This command will create a chat room, owned by the NPC object running this script and displayed above the NPC sprite. The maximum length of a chat room name is 60 letters.

The limit is the maximum number of people allowed to enter the chat room. The attached NPC is included in this count. If the optional event and trigger parameters are given, the event label ("<NPC object name>::<label name>") will be invoked as if with a doevent upon the number of people in the chat room reaching the given triggering amount.

<example_code>
// The NPC will just show a box above its head that says "Hello World", clicking
// it will do nothing, since the limit is zero.
waitingroom "Hello World", 0;
</example_code>
<example_code>
prontera,150,150,4  script  DiscoManager    100,{
    mes "[Disco Manager]";
    mes "Welcome! Please join the waiting room.";
    close2;
    // Waiting room with 8 slots, triggers Bouncer::OnStart when 7 people join
    waitingroom "Disco - Waiting Room", 8, "Bouncer::OnStart", 7;
    end;
}

-   script  Bouncer -1,{
OnStart:
    announce "The Disco is starting!", bc_all;
    // Logic to warp players or start the event goes here
    end;
}
</example_code>
<example_code>
prontera,150,150,4  script  DiscoManager    100,{
    mes "[Disco Manager]";
    mes "Welcome! To join the party, you need 5000 Zeny and be between level 50 and 99.";
    close2;
    // Waiting room with 8 slots, triggers Bouncer::OnStart when 7 people join
    // Requirements: 5000 Zeny, Min Level 50, Max Level 99
    waitingroom "Party - Waiting Room", 8, "Bouncer::OnStart", 7, 5000, 50, 99;
    end;
}

-   script  Bouncer -1,{
OnStart:
    announce "The Party is starting!", bc_all;
    // Logic to warp players or start the event goes here
    end;
}
</example_code>
Creating a waiting room does not stop the execution of the script and it will continue to the next line.

For more examples, see the 2-1 and 2-2 job quest scripts which make extensive use of waiting rooms.
</description>
---------------------- Breakline ----------------------
<syntax>
*delwaitingroom {"<NPC object name>"};
</syntax>

<description>
This command will delete a waiting room. If no parameter is given, it will delete a waiting room attached to the NPC object running this command. If a parameter is given, it will delete a waiting room owned by another NPC object. This is the only way to get rid of a waiting room; nothing else will cause it to disappear.

It's not clear what happens to a waiting room if the NPC is disabled with disablenpc, by the way.

<example_code>
// Delete the waiting room attached to the current NPC
delwaitingroom;
</example_code>
<example_code>
// Delete the waiting room attached to another NPC
delwaitingroom "Bouncer";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*enablewaitingroomevent {"<NPC object name>"};

*disablewaitingroomevent {"<NPC object name>"};
</syntax>

<description>
These commands will enable or disable the waiting room event for the specified NPC object. When the waiting room event is enabled, the NPC will trigger its event label when the waiting room reaches the specified trigger amount. When disabled, the event will not trigger.

If no NPC object name is given, the command will apply to the NPC object running the script.

<example_code>
// Enable waiting room event for the current NPC
enablewaitingroomevent;
</example_code>
<example_code>
// Disable waiting room event for another NPC
disablewaitingroomevent "Bouncer";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*disablewaitingroomevent {"<NPC object name>"};

*enablewaitingroomevent {"<NPC object name>"};
</syntax>

<description>
These commands will enable or disable the waiting room event for the specified NPC object. When the waiting room event is enabled, the NPC will trigger its event label when the waiting room reaches the specified trigger amount. When disabled, the event will not trigger.

If no NPC object name is given, the command will apply to the NPC object running the script.

<example_code>
// Enable waiting room event for the current NPC
enablewaitingroomevent;
</example_code>
<example_code>
// Disable waiting room event for another NPC
disablewaitingroomevent "Bouncer";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*enablearena;

*disablearena;
</syntax>

<description>
These commands will enable or disable the arena mode for the map where the invoking NPC is located. When arena mode is enabled, players cannot use skills that would normally allow them to escape or bypass arena restrictions (such as Teleport, Fly Wing, etc.). When disabled, normal map behavior resumes.

<example_code>
// Enable arena mode on the current map
enablearena;
</example_code>
<example_code>
// Disable arena mode on the current map
disablearena;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*disablearena;

*enablearena;
</syntax>

<description>
These commands will enable or disable the arena mode for the map where the invoking NPC is located. When arena mode is enabled, players cannot use skills that would normally allow them to escape or bypass arena restrictions (such as Teleport, Fly Wing, etc.). When disabled, normal map behavior resumes.

<example_code>
// Enable arena mode on the current map
enablearena;
</example_code>
<example_code>
// Disable arena mode on the current map
disablearena;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getwaitingroomstate(<information type>{,"<NPC object name>"})
</syntax>

<description>
This function will return information about the waiting room state for the attached waiting room or for a waiting room attached to the specified NPC if any.

The valid information types are:

0  - Number of users currently chatting.
1  - Maximum number of users allowed.
2  - Will return 1 if the waiting room has a trigger set. 0 otherwise.
3  - Will return 1 if the waiting room is currently disabled. 0 otherwise.
4  - The Title of the waiting room (string)
5  - Password of the waiting room, if any. Pointless, since there is no way to set a password on a waiting room right now.
16 - Event name of the waiting room (string)
32 - Whether or not the waiting room is full.
33 - Whether the amount of users in the waiting room is higher than the trigger number.

<example_code>
// Get current player count in the waiting room
.@count = getwaitingroomstate(0);
mes "There are " + .@count + " people in the waiting room.";

// Check if waiting room is full
if (getwaitingroomstate(32))
    mes "The waiting room is full!";

// Get waiting room title
.@title$ = getwaitingroomstate(4);
mes "Waiting room title: " + .@title$;

// Check another NPC's waiting room state
if (getwaitingroomstate(32, "Bouncer"))
    mes "Bouncer's waiting room is full.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*warpwaitingpc "<map name>",<x>,<y>{,<number of people>};
</syntax>

<description>
This command will warp the amount of characters equal to the trigger number of the waiting room chat attached to the NPC object running this command to the specified map and coordinates, kicking them out of the chat. Those waiting the longest will be warped first. It can also do a random warp on the same map ("Random" instead of map name) and warp to the save point ("SavePoint").

The list of characters to warp is taken from the list of the chat room members. Those not in the chat room will not be considered even if they are talking to the NPC in question. If the number of people is given, exactly this many people will be warped.

This command can also keep track of who just got warped. It does this by setting special variables:

$@warpwaitingpc[] is an array containing the account_id numbers of the characters who were just warped.
$@warpwaitingpcnum contains the number of characters just warped.

See also getpartymember for advice on what to do with those variables.

The obvious way of using this effectively would be to set up a waiting room for two characters to be warped onto a random PVP map for a one-on-one duel, for example.

<example_code>
// Warp all waiting players (based on trigger count) to a PVP map
warpwaitingpc "pvp_room", 0, 0;

// Warp exactly 2 players to a specific location
warpwaitingpc "prontera", 150, 100, 2;

// Warp to save point
warpwaitingpc "SavePoint", 0, 0;

// Display who got warped
warpwaitingpc "pvp_arena", 50, 50;
for (.@i = 0; .@i < $@warpwaitingpcnum; .@i++)
    announce "Player " + rid2name($@warpwaitingpc[.@i]) + " has been warped to the arena!", bc_all;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*waitingroomkick "<NPC object name>", "<character name>";
</syntax>

<description>
This command kicks the given character from the waiting room attached to the given NPC.

<example_code>
// Kick a player named "BadPlayer" from the waiting room attached to NPC "Bouncer"
waitingroomkick "Bouncer", "BadPlayer";
</example_code>
<example_code>
// Kick the attached player from the current NPC's waiting room
waitingroomkick strnpcinfo(0), strcharinfo(0);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getwaitingroomusers "<NPC object name>";
</syntax>

<description>
This command gets all the characters in the waiting room of the given NPC and stores their GIDs in the array .@waitingroom_users[]. Also stores the number of characters in the variable .@waitingroom_usercount.

<example_code>
// Get all users from the waiting room of NPC "Bouncer"
getwaitingroomusers "Bouncer";

mes "There are " + .@waitingroom_usercount + " users in the waiting room.";
for (.@i = 0; .@i < .@waitingroom_usercount; .@i++)
    mes "User " + (.@i + 1) + ": " + rid2name(.@waitingroom_users[.@i]);
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*kickwaitingroomall {"<NPC object name>"};
</syntax>

<description>
This command kicks everybody out of a specified waiting room chat. If no NPC object name is given, it will apply to the waiting room attached to the NPC object running the script.

<example_code>
// Kick everyone from the current NPC's waiting room
kickwaitingroomall;
</example_code>
<example_code>
// Kick everyone from another NPC's waiting room
kickwaitingroomall "Bouncer";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setmapflagnosave "<map name>","<alternate map name>",<x>,<y>;
</syntax>

<description>
This command sets the 'nosave' flag for the specified map and also gives an alternate respawn-upon-relogin point.

It does not make a map impossible to make a save point on as you would normally think; savepoint will still work. It will, however, make the specified map kick reconnecting players off to the alternate map at the coordinates specified.

<example_code>
// Players relogging on prontera will be sent to morocc at 150,100
setmapflagnosave "prontera", "morocc", 150, 100;
</example_code>
<example_code>
// Remove the nosave flag (set alternate to "",0,0)
setmapflagnosave "prontera", "", 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setmapflag "<map name>",<flag>{,<zone>{,<type>}};
</syntax>

<description>
This command marks a specified map with the given map flag, which will alter the behavior of the map. A full list of mapflags is located in src/map/script_constants.hpp with the mf_ prefix, and documentation can be found in doc/mapflags.txt.

The map flags alter the behavior of the map regarding teleporting (mf_nomemo, mf_noteleport, mf_nowarp, mf_nogo), storing location when disconnected (mf_nosave), dead branch usage (mf_nobranch), penalties upon death (mf_nopenalty, mf_nozenypenalty), PVP behavior (mf_pvp, mf_pvp_noparty, mf_pvp_noguild), WoE behavior (mf_gvg, mf_gvg_noparty), ability to use skills or open up trade deals (mf_notrade, mf_novending, mf_noskill, mf_noicewall), current weather effects (mf_snow, mf_fog, mf_sakura, mf_leaves, mf_rain, mf_clouds, mf_fireworks), and whether night will be in effect on this map (mf_nightenabled).

The optional parameter <zone> is used to set the zone for restricted mapflags, GM level bypass for nocommand, base/job experience for bexp/jexp, and flag for battleground.

For skill_damage mapflag:
- Setting the flag here will adjust the global (all skills) damage on the map.
- <zone> is the -100 to 100000 damage adjustment value of the skills.
- See getmapflag for the different <type> values.

For skill_duration mapflag:
- <zone> is the skill ID to adjust.
- <type> is the percentage of adjustment from 0 to 100000.

<example_code>
// Enable PVP on prontera
setmapflag "prontera", mf_pvp;
</example_code>
<example_code>
// Enable night time on payon
setmapflag "payon", mf_nightenabled;
</example_code>
<example_code>
// Disable teleport on morocc
setmapflag "morocc", mf_noteleport;
</example_code>
<example_code>
// Add snow weather effect to prontera
setmapflag "prontera", mf_snow;
</example_code>
<example_code>
// Set skill damage adjustment (200% damage)
setmapflag "prontera", mf_skill_damage, 100;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*removemapflag "<map name>",<flag>{,<zone>};
</syntax>

<description>
This command removes a mapflag from a specified map. See setmapflag for a list of mapflags.

The optional parameter zone is used to remove the zone from restricted mapflags.

<example_code>
// Remove PVP flag from prontera
removemapflag "prontera", mf_pvp;
</example_code>
<example_code>
// Remove night time from payon
removemapflag "payon", mf_nightenabled;
</example_code>
<example_code>
// Remove snow weather effect from prontera
removemapflag "prontera", mf_snow;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getmapflag("<map name>",<flag>{,<type>})
</syntax>

<description>
This command checks the status of a given mapflag and returns the mapflag's state. 0 means OFF, and 1 means ON. See setmapflag for a list of mapflags.

For MF_RESTRICTED, the zone value of the map is returned.

The optional parameter type is used in the skill_damage mapflag:

<example_code>
SKILLDMG_MAX  //  if mapflag is set (default)
SKILLDMG_PC  //  damage against players
SKILLDMG_MOB  //  damage against mobs
SKILLDMG_BOSS  //  damage against bosses
SKILLDMG_OTHER  //  damage against other
SKILLDMG_CASTER  //  caster type
</example_code>
<example_code>
// Check if prontera has PVP enabled
if (getmapflag("prontera", mf_pvp))
    mes "Prontera is a PVP map!";
else
    mes "Prontera is not a PVP map.";
</example_code>
<example_code>
// Check if night is enabled on payon
if (getmapflag("payon", mf_nightenabled))
    mes "Night is enabled on Payon.";
</example_code>
<example_code>
// Get restricted zone value
.@zone = getmapflag("prontera", mf_restricted);
mes "Restricted zone: " + .@zone;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setbattleflag "<battle flag>",<value>{,<reload>};

*getbattleflag("<battle flag>")
</syntax>

<description>
Sets or gets the value of the given battle flag. Battle flags are the flags found in the battle/*.conf files and are also used in Lupus' variable rates script.

If the reload value is given, then the server will attempt to reload monster data to properly apply the new rates. This applies to EXP/Drop type configs. The server will only attempt to reload specific configs.

<example_code>
// Will set the base experience rate to 20x (2000%) - Monster data will continue to use previous rates at server start
setbattleflag "base_exp_rate", 2000;
</example_code>
<example_code>
// Will set the base experience rate to 20x (2000%) - Monster data will be reloaded to new value
setbattleflag "base_exp_rate", 2000, true;
</example_code>
<example_code>
// Will return the value of the base experience rate (when used after the above example, it would print 2000)
mes getbattleflag("base_exp_rate");
</example_code>
<example_code>
// Other battle flag examples
setbattleflag "item_rate_common", 5000; // 50% drop rate for common items
setbattleflag "skill_amotion_lv_penalty", 1; // Enable skill animation level penalty
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getbattleflag("<battle flag>")

*setbattleflag "<battle flag>",<value>{,<reload>};
</syntax>

<description>
Sets or gets the value of the given battle flag. Battle flags are the flags found in the battle/*.conf files and are also used in Lupus' variable rates script.

If the reload value is given, then the server will attempt to reload monster data to properly apply the new rates. This applies to EXP/Drop type configs. The server will only attempt to reload specific configs.

<example_code>
// Will set the base experience rate to 20x (2000%) - Monster data will continue to use previous rates at server start
setbattleflag "base_exp_rate", 2000;
</example_code>
<example_code>
// Will set the base experience rate to 20x (2000%) - Monster data will be reloaded to new value
setbattleflag "base_exp_rate", 2000, true;
</example_code>
<example_code>
// Will return the value of the base experience rate (when used after the above example, it would print 2000)
mes getbattleflag("base_exp_rate");
</example_code>
<example_code>
// Other battle flag examples
setbattleflag "item_rate_common", 5000; // 50% drop rate for common items
setbattleflag "skill_amotion_lv_penalty", 1; // Enable skill animation level penalty
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*warpportal <source x>,<source y>,"<map name>",<target x>,<target y>;
</syntax>

<description>
Creates a warp portal identical to the Acolyte Warp Portal skill. The source coordinates specify the portal's location on the map of the invoking NPC. The target map and coordinates determine the destination of the portal.

<example_code>
// Will create a warp portal on the NPC's map at 150,150 leading to prontera, coords 150,180
warpportal 150, 150, "prontera", 150, 180;
</example_code>
<example_code>
// Create a warp portal on the current NPC map at 100,100 leading to payon
warpportal 100, 100, "payon", 0, 0; // 0,0 = random coordinates
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mapwarp "<from map>","<to map>",<x>,<y>{,<type>,<ID>};
</syntax>

<description>
This command will collect all characters located on the from map and warp them wholesale to the same point on the to map, or randomly distribute them there if the coordinates are zero. "Random" is understood as a special to map name and will mean randomly shuffling everyone on the same map.

Optionally, a type and ID can be specified. Available types are:

0 - Everyone
1 - Guild
2 - Party

<example_code>
// Will warp all members of guild with ID 63 on map prontera to map alberta
mapwarp "prontera", "alberta", 150, 150, 1, 63;
</example_code>
<example_code>
// Warp everyone on prontera to payon randomly
mapwarp "prontera", "payon", 0, 0;
</example_code>
<example_code>
// Warp all party members with party ID 5 on morocc to prontera
mapwarp "morocc", "prontera", 150, 100, 2, 5;
</example_code>
<example_code>
// Randomly shuffle all players on the current map
mapwarp strcharinfo(3), "Random", 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*maprespawnguildid "<map name>",<guild id>,<flag>;
</syntax>

<description>
This command goes through the specified map and for each player and monster found there does stuff.

Flag is a bit-mask (add up numbers to get effects you want):
1 - warp all guild members to their save points.
2 - warp all non-guild members (including guildless players) to their save points.
4 - remove all monsters which are not guardian or Emperium.

Flag 7 will, therefore, mean wipe all mobs but guardians and the Emperium and kick all characters out, which is what the official scripts do upon castle surrender. Upon start of WoE, the scripts do 2 (warp all intruders out).

For examples, check the WoE scripts in the distribution.

<example_code>
// Warp all intruders (non-guild members) out during WoE start
maprespawnguildid "aldeg_cas01", 0, 2;
</example_code>
<example_code>
// On castle surrender: warp everyone out and wipe non-guardian monsters
maprespawnguildid "prontera", 63, 7;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*agitstart;

*agitend;

*agitstart2;

*agitend2;

*agitstart3;

*agitend3;
</syntax>

<description>
These commands will start and end War of Emperium FE, War of Emperium SE, or War of Emperium TE.

This is a bit more complex than it sounds, since the commands themselves won't actually do anything interesting, except causing all OnAgitStart: and OnAgitEnd:, OnAgitStart2: and OnAgitEnd2:, or OnAgitStart3: and OnAgitEnd3: events to run everywhere, respectively. They are used as simple triggers to run a lot of complex scripts all across the server, and they, in turn, are triggered by clock with an OnClock<time>: time-triggering label.

<example_code>
// Start WoE FE
agitstart;

// End WoE FE
agitend;
</example_code>
<example_code>
// Start WoE SE
agitstart2;

// End WoE SE
agitend2;
</example_code>
<example_code>
// Start WoE TE
agitstart3;

// End WoE TE
agitend3;
</example_code>
<example_code>
// In a clock-triggered NPC:
OnClock2000: // 8:00 PM
    agitstart;
    end;
OnClock2200: // 10:00 PM
    agitend;
    end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*agitend;

*agitstart2;

*agitend2;

*agitstart3;
    
*agitend3;

*agitstart;
</syntax>

<description>
These commands will start and end War of Emperium FE, War of Emperium SE, or War of Emperium TE.

This is a bit more complex than it sounds, since the commands themselves won't actually do anything interesting, except causing all OnAgitStart: and OnAgitEnd:, OnAgitStart2: and OnAgitEnd2:, or OnAgitStart3: and OnAgitEnd3: events to run everywhere, respectively. They are used as simple triggers to run a lot of complex scripts all across the server, and they, in turn, are triggered by clock with an OnClock<time>: time-triggering label.

<example_code>
// Start WoE FE
agitstart;

// End WoE FE
agitend;
</example_code>
<example_code>
// Start WoE SE
agitstart2;

// End WoE SE
agitend2;
</example_code>
<example_code>
// Start WoE TE
agitstart3;

// End WoE TE
agitend3;
</example_code>
<example_code>
// In a clock-triggered NPC:
OnClock2000: // 8:00 PM
    agitstart;
    end;
OnClock2200: // 10:00 PM
    agitend;
    end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*agitstart2;

*agitend2;

*agitstart3;
    
*agitend3;

*agitstart;

*agitend;
</syntax>

<description>
These commands will start and end War of Emperium FE, War of Emperium SE, or War of Emperium TE.

This is a bit more complex than it sounds, since the commands themselves won't actually do anything interesting, except causing all OnAgitStart: and OnAgitEnd:, OnAgitStart2: and OnAgitEnd2:, or OnAgitStart3: and OnAgitEnd3: events to run everywhere, respectively. They are used as simple triggers to run a lot of complex scripts all across the server, and they, in turn, are triggered by clock with an OnClock<time>: time-triggering label.

<example_code>
// Start WoE FE
agitstart;

// End WoE FE
agitend;
</example_code>
<example_code>
// Start WoE SE
agitstart2;

// End WoE SE
agitend2;
</example_code>
<example_code>
// Start WoE TE
agitstart3;

// End WoE TE
agitend3;
</example_code>
<example_code>
// In a clock-triggered NPC:
OnClock2000: // 8:00 PM
    agitstart;
    end;
OnClock2200: // 10:00 PM
    agitend;
    end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*agitend2;

*agitstart3;
    
*agitend3;

*agitstart;

*agitend;

*agitstart2;
</syntax>

<description>
These commands will start and end War of Emperium FE, War of Emperium SE, or War of Emperium TE.

This is a bit more complex than it sounds, since the commands themselves won't actually do anything interesting, except causing all OnAgitStart: and OnAgitEnd:, OnAgitStart2: and OnAgitEnd2:, or OnAgitStart3: and OnAgitEnd3: events to run everywhere, respectively. They are used as simple triggers to run a lot of complex scripts all across the server, and they, in turn, are triggered by clock with an OnClock<time>: time-triggering label.

<example_code>
// Start WoE FE
agitstart;

// End WoE FE
agitend;
</example_code>
<example_code>
// Start WoE SE
agitstart2;

// End WoE SE
agitend2;
</example_code>
<example_code>
// Start WoE TE
agitstart3;

// End WoE TE
agitend3;
</example_code>
<example_code>
// In a clock-triggered NPC:
OnClock2000: // 8:00 PM
    agitstart;
    end;
OnClock2200: // 10:00 PM
    agitend;
    end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*agitstart3;
    
*agitend3;

*agitstart;

*agitend;

*agitstart2;

*agitend2;
</syntax>

<description>
These commands will start and end War of Emperium FE, War of Emperium SE, or War of Emperium TE.

This is a bit more complex than it sounds, since the commands themselves won't actually do anything interesting, except causing all OnAgitStart: and OnAgitEnd:, OnAgitStart2: and OnAgitEnd2:, or OnAgitStart3: and OnAgitEnd3: events to run everywhere, respectively. They are used as simple triggers to run a lot of complex scripts all across the server, and they, in turn, are triggered by clock with an OnClock<time>: time-triggering label.

<example_code>
// Start WoE FE
agitstart;

// End WoE FE
agitend;
</example_code>
<example_code>
// Start WoE SE
agitstart2;

// End WoE SE
agitend2;
</example_code>
<example_code>
// Start WoE TE
agitstart3;

// End WoE TE
agitend3;
</example_code>
<example_code>
// In a clock-triggered NPC:
OnClock2000: // 8:00 PM
    agitstart;
    end;
OnClock2200: // 10:00 PM
    agitend;
    end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*agitend3;

*agitstart;

*agitend;

*agitstart2;

*agitend2;

*agitstart3;
</syntax>

<description>
These commands will start and end War of Emperium FE, War of Emperium SE, or War of Emperium TE.

This is a bit more complex than it sounds, since the commands themselves won't actually do anything interesting, except causing all OnAgitStart: and OnAgitEnd:, OnAgitStart2: and OnAgitEnd2:, or OnAgitStart3: and OnAgitEnd3: events to run everywhere, respectively. They are used as simple triggers to run a lot of complex scripts all across the server, and they, in turn, are triggered by clock with an OnClock<time>: time-triggering label.

<example_code>
// Start WoE FE
agitstart;

// End WoE FE
agitend;
</example_code>
<example_code>
// Start WoE SE
agitstart2;

// End WoE SE
agitend2;
</example_code>
<example_code>
// Start WoE TE
agitstart3;

// End WoE TE
agitend3;
</example_code>
<example_code>
// In a clock-triggered NPC:
OnClock2000: // 8:00 PM
    agitstart;
    end;
OnClock2200: // 10:00 PM
    agitend;
    end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*gvgon "<map name>";

*gvgoff "<map name>";
</syntax>

<description>
These commands will turn GVG mode for the specified maps on and off, setting up appropriate map flags. In GVG mode, maps behave as if during the time of WoE, even though WoE itself may or may not actually be in effect.

<example_code>
// Enable GVG mode on prontera
gvgon "prontera";
</example_code>
<example_code>
// Disable GVG mode on prontera
gvgoff "prontera";
</example_code>
<example_code>
// Enable GVG mode on multiple maps
gvgon "aldeg_cas01";
gvgon "aldeg_cas02";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*gvgoff "<map name>";

*gvgon "<map name>";
</syntax>

<description>
These commands will turn GVG mode for the specified maps on and off, setting up appropriate map flags. In GVG mode, maps behave as if during the time of WoE, even though WoE itself may or may not actually be in effect.

<example_code>
// Enable GVG mode on prontera
gvgon "prontera";
</example_code>
<example_code>
// Disable GVG mode on prontera
gvgoff "prontera";
</example_code>
<example_code>
// Enable GVG mode on multiple maps
gvgon "aldeg_cas01";
gvgon "aldeg_cas02";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*gvgon3 "<map name>";

*gvgoff3 "<map name>";
</syntax>

<description>
These commands behave identically to gvgon/gvgoff, but apply the GVG_TE mapflag.

<example_code>
// Enable GVG TE mode on prontera
gvgon3 "prontera";
</example_code>
<example_code>
// Disable GVG TE mode on prontera
gvgoff3 "prontera";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*gvgoff3 "<map name>";

*gvgon3 "<map name>";
</syntax>

<description>
These commands behave identically to gvgon/gvgoff, but apply the GVG_TE mapflag.

<example_code>
// Enable GVG TE mode on prontera
gvgon3 "prontera";
</example_code>
<example_code>
// Disable GVG TE mode on prontera
gvgoff3 "prontera";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*flagemblem <guild id>;
</syntax>

<description>
This command only works when run by NPC objects which have sprite ID 722, which is a 3D guild flag sprite. If it isn't, the data will change, but nothing will be seen by anyone. If it is invoked in that manner, the emblem of the specified guild will appear on the flag, though if any players are watching it at this moment, they will not see the emblem change until they move out of sight of the flag and return.

This is commonly used in official guildwar scripts with a function call which returns a guild ID.

<example_code>
// This will change the emblem on the flag to that of the guild that owns "guildcastle"
flagemblem GetCastleData("guildcastle", 1);
</example_code>
<example_code>
// Set flag emblem to guild ID 10007
flagemblem 10007;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guardian "<map name>",<x>,<y>,"<name to show>",<mob id>{,"<event label>"{,<guardian index>}};
</syntax>

<description>
This command is roughly equivalent to monster, but is meant to be used with castle guardian monsters and will only work with them. It will set the guardian characteristics up according to the castle's investment values and otherwise set up the things that only castle guardians need.

Since trunk r12524:
- Returns the ID of the mob or 0 if an error occurred.
- When guardian index is not supplied, it produces a temporary guardian.
- Temporary guardians are not saved with the castle and cannot be accessed by guardianinfo.

<example_code>
// Spawn a guardian at coordinates 150,100 on prontera castle map
.@mob_id = guardian "prontera", 150, 100, "Castle Guardian", 1002;
</example_code>
<example_code>
// Spawn a guardian with event label and specific index
.@mob_id = guardian "aldeg_cas01", 100, 150, "Aldebaran Guardian", 1002, "Guardian::OnKilled", 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*guardianinfo("<map name>", <guardian number>, <type>);
</syntax>

<description>
This function will return various info about the specified guardian, or -1 if it fails for some reason. It is primarily used in the castle manager NPC.

Map name and guardian number (value between 0 and 7) define the target.

Type indicates what information to return:
0 - visibility (whether the guardian is installed or not)
1 - max. hp
2 - current hp

<example_code>
// Check if guardian 0 is installed on prontera castle
.@visible = guardianinfo("prontera", 0, 0);
if (.@visible)
    mes "Guardian 0 is installed.";
else
    mes "Guardian 0 is not installed.";

// Get max HP of guardian 1
.@max_hp = guardianinfo("aldeg_cas01", 1, 1);
mes "Guardian 1 max HP: " + .@max_hp;

// Get current HP of guardian 2
.@current_hp = guardianinfo("aldeg_cas01", 2, 2);
mes "Guardian 2 current HP: " + .@current_hp;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getguildalliance(<guild id1>, <guild id2>);
</syntax>

<description>
This command will return the relation between two guilds.

NOTE: This should be used in collaboration with requestguildinfo as the map-server needs to request information from the char-server.

Return values:
-2 - Guild ID1 does not exist
-1 - Guild ID2 does not exist
0 - Both guilds have no relation OR guild IDs aren't given
1 - Both guilds are allies
2 - Both guilds are antagonists

<example_code>
// Request guild info first
requestguildinfo .@guild_id1;
requestguildinfo .@guild_id2;

// Check relation between two guilds
.@relation = getguildalliance(.@guild_id1, .@guild_id2);

switch (.@relation) {
    case 1:
        mes "These guilds are allies!";
        break;
    case 2:
        mes "These guilds are antagonists!";
        break;
    default:
        mes "These guilds have no relation.";
        break;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npcspeed(<speed value>{,"<npc name>"});

*npcwalkto(<x>,<y>{,"<npc name>"});

*npcstop({"<npc name>", {"<flag>"}});
</syntax>

<description>
These commands will make the NPC object in question move around the map.

npcspeed will permanently set the NPC's walking speed to a specified value. As in the @speed GM command, MAX_WALK_SPEED (1000) is the slowest possible speed while MIN_WALK_SPEED (20) is the fastest possible (instant motion). DEFAULT_NPC_WALK_SPEED (200) is the default NPC walking speed.

npcwalkto will start the NPC sprite moving towards the specified coordinates on the same map it is currently on. The script proceeds immediately after the NPC begins moving.

npcstop will stop the motion.

The <flag> value in npcstop affects how the unit is stopped. The following flags are bitwise values (can be combined using the pipe operator):

<example_code>
USW_NONE // Unit will keep walking to their original destination.
USW_FIXPOS // Issue a fixpos packet afterwards.
USW_MOVE_ONCE // Force the unit to move one cell if it hasn't yet.
USW_MOVE_FULL_CELL // Enable moving to the next cell when the unit was already half-way there (may cause on-touch/place side-effects, such as a scripted map change).
USW_FORCE_STOP // Force stop moving.
USW_FIXPOS | USW_MOVE_FULL_CELL | USW_FORCE_STOP // Default
</example_code>
While in transit, the NPC will be clickable, but invoking it will cause it to stop moving, which will make its coordinates different from what the client computed based on the speed and motion coordinates.

Only a few NPC sprites have walking animations, and those that do do not get the animation invoked when moving the NPC due to a problem in the NPC walking code, which looks a bit silly. You might have better success by defining a job-sprite based sprite ID in db/mob_avail.yml with this.

<example_code>
// Set NPC speed to fast
npcspeed(50, "WalkingNPC");

// Make the NPC walk to coordinates 150,100
npcwalkto(150, 100, "WalkingNPC");

// Stop the NPC's movement
npcstop("WalkingNPC", USW_FORCE_STOP);
</example_code>
<example_code>
// Complete moving NPC example
prontera,150,150,4  script  WalkingNPC  100,{
    mes "[Moving NPC]";
    mes "I will now walk around.";
    close2;
    npcspeed(100);
    npcwalkto(200, 150);
    end;

OnTouch:
    mes "[Moving NPC]";
    mes "You touched me while I was walking!";
    npcstop;
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npcwalkto(<x>,<y>{,"<npc name>"});

*npcstop({"<npc name>", {"<flag>"}});

*npcspeed(<speed value>{,"<npc name>"});
</syntax>

<description>
These commands will make the NPC object in question move around the map.

npcspeed will permanently set the NPC's walking speed to a specified value. As in the @speed GM command, MAX_WALK_SPEED (1000) is the slowest possible speed while MIN_WALK_SPEED (20) is the fastest possible (instant motion). DEFAULT_NPC_WALK_SPEED (200) is the default NPC walking speed.

npcwalkto will start the NPC sprite moving towards the specified coordinates on the same map it is currently on. The script proceeds immediately after the NPC begins moving.

npcstop will stop the motion.

The <flag> value in npcstop affects how the unit is stopped. The following flags are bitwise values (can be combined using the pipe operator):

<example_code>
USW_NONE // Unit will keep walking to their original destination.
USW_FIXPOS // Issue a fixpos packet afterwards.
USW_MOVE_ONCE // Force the unit to move one cell if it hasn't yet.
USW_MOVE_FULL_CELL // Enable moving to the next cell when the unit was already half-way there (may cause on-touch/place side-effects, such as a scripted map change).
USW_FORCE_STOP // Force stop moving.
USW_FIXPOS | USW_MOVE_FULL_CELL | USW_FORCE_STOP // Default
</example_code>
While in transit, the NPC will be clickable, but invoking it will cause it to stop moving, which will make its coordinates different from what the client computed based on the speed and motion coordinates.

Only a few NPC sprites have walking animations, and those that do do not get the animation invoked when moving the NPC due to a problem in the NPC walking code, which looks a bit silly. You might have better success by defining a job-sprite based sprite ID in db/mob_avail.yml with this.

<example_code>
// Set NPC speed to fast
npcspeed(50, "WalkingNPC");

// Make the NPC walk to coordinates 150,100
npcwalkto(150, 100, "WalkingNPC");

// Stop the NPC's movement
npcstop("WalkingNPC", USW_FORCE_STOP);
</example_code>
<example_code>
// Complete moving NPC example
prontera,150,150,4  script  WalkingNPC  100,{
    mes "[Moving NPC]";
    mes "I will now walk around.";
    close2;
    npcspeed(100);
    npcwalkto(200, 150);
    end;

OnTouch:
    mes "[Moving NPC]";
    mes "You touched me while I was walking!";
    npcstop;
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npcstop({"<npc name>", {"<flag>"}});

*npcspeed(<speed value>{,"<npc name>"});

*npcwalkto(<x>,<y>{,"<npc name>"});
</syntax>

<description>
These commands will make the NPC object in question move around the map.

npcspeed will permanently set the NPC's walking speed to a specified value. As in the @speed GM command, MAX_WALK_SPEED (1000) is the slowest possible speed while MIN_WALK_SPEED (20) is the fastest possible (instant motion). DEFAULT_NPC_WALK_SPEED (200) is the default NPC walking speed.

npcwalkto will start the NPC sprite moving towards the specified coordinates on the same map it is currently on. The script proceeds immediately after the NPC begins moving.

npcstop will stop the motion.

The <flag> value in npcstop affects how the unit is stopped. The following flags are bitwise values (can be combined using the pipe operator):

<example_code>
USW_NONE // Unit will keep walking to their original destination.
USW_FIXPOS // Issue a fixpos packet afterwards.
USW_MOVE_ONCE // Force the unit to move one cell if it hasn't yet.
USW_MOVE_FULL_CELL // Enable moving to the next cell when the unit was already half-way there (may cause on-touch/place side-effects, such as a scripted map change).
USW_FORCE_STOP // Force stop moving.
USW_FIXPOS | USW_MOVE_FULL_CELL | USW_FORCE_STOP // Default
</example_code>
While in transit, the NPC will be clickable, but invoking it will cause it to stop moving, which will make its coordinates different from what the client computed based on the speed and motion coordinates.

Only a few NPC sprites have walking animations, and those that do do not get the animation invoked when moving the NPC due to a problem in the NPC walking code, which looks a bit silly. You might have better success by defining a job-sprite based sprite ID in db/mob_avail.yml with this.

<example_code>
// Set NPC speed to fast
npcspeed(50, "WalkingNPC");

// Make the NPC walk to coordinates 150,100
npcwalkto(150, 100, "WalkingNPC");

// Stop the NPC's movement
npcstop("WalkingNPC", USW_FORCE_STOP);
</example_code>
<example_code>
// Complete moving NPC example
prontera,150,150,4  script  WalkingNPC  100,{
    mes "[Moving NPC]";
    mes "I will now walk around.";
    close2;
    npcspeed(100);
    npcwalkto(200, 150);
    end;

OnTouch:
    mes "[Moving NPC]";
    mes "You touched me while I was walking!";
    npcstop;
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*movenpc "<NPC name>",<x>,<y>{,<dir>};
</syntax>

<description>
This command looks like the npcwalkto function, but is a little different.

While npcwalkto just makes the NPC walk to the given coordinates (which sometimes gives problems if the path isn't a straight line without objects), this command instantly moves the NPC. It basically warps the NPC to the specified spot. Direction can be used to change the NPC's facing direction.

<example_code>
// This will move Bugga from its old coordinates to the new coordinates at 100,20 (if those coordinates are legit)
movenpc "Bugga", 100, 20;
</example_code>
<example_code>
// Move NPC and change facing direction to north
movenpc "Bugga", 100, 20, DIR_NORTH;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*debugmes "<message>";
</syntax>

<description>
This command will send a debug message to the server console (map-server window). It will not be displayed anywhere else.

<example_code>
// Displays "NAME has clicked me!" in the map-server window
debugmes strcharinfo(0) + " has clicked me!";
</example_code>
<example_code>
// Debug a script condition
if (.@value > 1000)
    debugmes "Warning: .@value exceeded limit: " + .@value;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*errormes "<message>";
</syntax>

<description>
This command will send an error message to the server console (map-server window). It will not be displayed anywhere else.

<example_code>
// Displays "NAME has clicked me!" as an error in the map-server window
errormes strcharinfo(0) + " has clicked me!";
</example_code>
<example_code>
// Report a critical condition
if (.@result < 0)
    errormes "Critical error in script: Invalid result " + .@result;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*logmes "<message>";
</syntax>

<description>
This command will write the message given to the map server NPC log file, as specified in conf/log_athena.conf. In the TXT version of the server, the log file is log/npclog.log by default. In the SQL version, if SQL logging is enabled, the message will go to the npclog table; otherwise, it will go to the same log file.

If logs are not enabled, nothing will happen.

<example_code>
// Log a player's action
logmes strcharinfo(0) + " received a reward from this NPC.";
</example_code>
<example_code>
// Log a quest completion
logmes "Quest completed: " + .@quest_name$ + " by " + strcharinfo(0);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*globalmes "<message>"{,"<NPC name>"};
</syntax>

<description>
This command will send a message to the chat window of all currently connected characters.

If NPC name is specified, the message will be sent as if the sender were the NPC with the said name. The display name of the NPC will not be appended in front of the message.

<example_code>
// Send a global message from the current NPC
globalmes "The event has started!";

// Send a global message from a specific NPC
globalmes "The WoE will begin in 5 minutes.", "WoEMaster";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*rand(<number>{,<number>});
</syntax>

<description>
This function returns a number:
- If you specify one number, it returns a number randomly between 0 and that number minus 1.
- If you specify two numbers, it returns a number randomly between the two numbers inclusive.

<example_code>
rand(10);  // Would result in 0, 1, 2, 3, 4, 5, 6, 7, 8, or 9
rand(0, 9); // Would result in 0, 1, 2, 3, 4, 5, 6, 7, 8, or 9
rand(2, 5); // Would result in 2, 3, 4, or 5
</example_code>
<example_code>
// Random item drop example
.@roll = rand(100);
if (.@roll < 50)
    getitem 512, 1; // 50% chance for Apple
else if (.@roll < 75)
    getitem 513, 1; // 25% chance for Banana
else
    getitem 514, 1; // 25% chance for Grape
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*viewpoint <action>,<x>,<y>,<point number>,<color>{,<Char ID>};
</syntax>

<description>
This command will mark places on the mini map in the client connected to the invoking character. It uses the normal X and Y coordinates from the main map. The colors of the marks are defined using a hexadecimal number, same as the ones used to color text in mes output, but are written as hexadecimal numbers in C (0x<six numbers>).

Action is what you want to do with a point:
- 1 will set it
- 2 will clear it
- 0 will also set it, but automatically removes the point after 15 seconds

Point number is the number of the point - you can have several. If more than one point is drawn at the same coordinates, they will cycle, which can be used to create flashing marks.

The client determines what it does with the points entirely; the server keeps no memory of where the points are set whatsoever.

<example_code>
// This command will show a mark at coordinates X 30 Y 40, is mark number 1, and will be red
viewpoint 1, 30, 40, 1, 0xFF0000;
</example_code>
<example_code>
// Create three points
viewpoint 1, 30, 40, 1, 0xFF0000;
viewpoint 1, 35, 45, 2, 0xFF0000;
viewpoint 1, 40, 50, 3, 0xFF0000;
</example_code>
<example_code>
// Remove the three points
viewpoint 2, 30, 40, 1, 0xFF0000;
viewpoint 2, 35, 45, 2, 0xFF0000;
viewpoint 2, 40, 50, 3, 0xFF0000;
</example_code>
<example_code>
// Create a temporary point that auto-removes after 15 seconds
viewpoint 0, 100, 150, 1, 0x00FF00;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*viewpointmap "<map name>",<action>,<x>,<y>,<point number>,<color>;
</syntax>

<description>
This command will mark places on the mini map in the client for all players currently on the defined map. It uses the normal X and Y coordinates from the main map. The colors of the marks are defined using a hexadecimal number, same as the ones used to color text in mes output, but are written as hexadecimal numbers in C (0x<six numbers>).

Action is what you want to do with a point:
- 1 will set it
- 2 will clear it
- 0 will also set it, but automatically removes the point after 15 seconds

Point number is the number of the point - you can have several. If more than one point is drawn at the same coordinates, they will cycle, which can be used to create flashing marks.

The client determines what it does with the points entirely; the server keeps no memory of where the points are set whatsoever.

<example_code>
// This command will show a mark at coordinates X 30 Y 40, is mark number 1,
// and will be red for all players currently on the map Prontera
viewpointmap "prontera", 1, 30, 40, 1, 0xFF0000;
</example_code>
<example_code>
// Create three points
.@map$ = "prontera";
viewpointmap .@map$, 1, 30, 40, 1, 0xFF0000;
viewpointmap .@map$, 1, 35, 45, 2, 0xFF0000;
viewpointmap .@map$, 1, 40, 50, 3, 0xFF0000;
</example_code>
<example_code>
// Remove the three points
.@map$ = "prontera";
viewpointmap .@map$, 2, 30, 40, 1, 0xFF0000;
viewpointmap .@map$, 2, 35, 45, 2, 0xFF0000;
viewpointmap .@map$, 2, 40, 50, 3, 0xFF0000;
</example_code>
<example_code>
// Create a temporary point that auto-removes after 15 seconds for all players on the map
viewpointmap "payon", 0, 100, 150, 1, 0x00FF00;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cutin "<filename>",<position>;
</syntax>

<description>
This command will display a picture, usually an NPC illustration, also called a cutin, for the currently attached client. The position parameter determines the placement of the illustration and takes the following values:

0 - bottom left corner
1 - bottom middle
2 - bottom right corner
3 - middle of screen in a movable window with an empty title bar
4 - middle of screen without the window header, but still movable
255 - clear all displayed cutins

The picture is read from data\texture\유저인터페이스\illust, from both the GRF archive and data folder, and is required to be a bitmap. The file extension .bmp can be omitted. Magenta color (#ff00ff) is considered transparent. There is no limit placed on the size of the illustrations by the client, although loading of large pictures (about 700x700 and larger) causes the client to freeze shortly (lag). Typically the size is about 320x480. New illustrations can be added by just putting the new file into the location above.

The client is able to display only one cutin at a time, and each new one will cause the old one to disappear. To delete the currently displayed illustration without displaying a new one, an empty file name and position 255 must be used.

<example_code>
// Displays the Comodo Kafra illustration in lower right corner
cutin "kafra_07", 2;
</example_code>
<example_code>
// Typical way to end a script that displayed an illustration during dialog with a player
mes "See you.";
close2;
cutin "", 255;
end;
</example_code>
<example_code>
// Display cutin in the center with movable window
cutin "npc_illustration", 3;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*emotion <emotion number>{,<target>};
</syntax>

<description>
This command makes an object display an emotion sprite above their own as if they were doing that emotion. For a full list of emotion numbers, see src/map/script_constants.hpp under ET_. The not so obvious ones are ET_QUESTION (a question mark) and ET_SURPRISE (the exclamation mark).

The optional target parameter specifies who will get the emotion on top of their head. Use the target Game ID (GID).

<example_code>
// Display a question mark above the attached player
emotion ET_QUESTION;
</example_code>
<example_code>
// Display an exclamation mark above a specific target
emotion ET_SURPRISE, 150001;
</example_code>
<example_code>
// Display a thanks emotion above the NPC
emotion ET_THANKS;
</example_code>
<example_code>
// Display a surprise emotion above the attached player
emotion ET_SURPRISE;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*misceffect <effect number>;
</syntax>

<description>
This command, if run from an NPC object that has a sprite, will call up a specified effect number, centered on the NPC sprite. If the running code does not have an object ID (a floating NPC) or is not running from an NPC object at all (an item script), the effect will be centered on the character whose RID got attached to the script, if any. For usable item scripts, this command will create an effect centered on the player using the item.

A full list of known effects is found in doc/effect_list.txt. The list of those that actually work may differ greatly between client versions.

<example_code>
// Display a healing effect on the NPC or player
misceffect EF_HEAL;
</example_code>
<example_code>
// Display a potion effect
misceffect EF_POTION;
</example_code>
<example_code>
// Display a fire splash effect
misceffect EF_FIRESPLASHHIT;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*soundeffect "<effect filename>",<type>;

*soundeffectall "<effect filename>",<type>{,"<map name>"}{,<x0>,<y0>,<x1>,<y1>};
</syntax>

<description>
These two commands will play a sound effect to either the invoking character only (soundeffect) or multiple characters (soundeffectall). If the running code does not have an object ID (a floating NPC) or is not running from an NPC object at all (an item script), the sound will be centered on the character whose RID got attached to the script, if any. If it does, it will be centered on that object (an NPC sprite).

Effect filename is the filename in a GRF. It must have the .wav extension.

It's not quite certain what the type actually does; it is sent to the client directly. It probably determines which directory to play the effect from. It's certain that giving 0 for the number will play sound files from \data\wav, but where the other numbers will read from is unclear.

The sound files themselves must be in PCM format, and file names should also have a maximum length of 23 characters including the .wav extension.

You can add your own effects this way, naturally.

<example_code>
soundeffect "1234567890123456789.wav", 0; // this will play the soundeffect
soundeffect "12345678901234567890.wav", 0; // throw gravity error
</example_code>
<example_code>
// Play sound only to the attached player
soundeffect "heal.wav", 0;
</example_code>
<example_code>
// Play sound to all players on the current map
soundeffectall "potion.wav", 0, "prontera";
</example_code>
<example_code>
// Play sound to all players within a specific area
soundeffectall "attack.wav", 0, "prontera", 100, 100, 200, 200;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*soundeffectall "<effect filename>",<type>{,"<map name>"}{,<x0>,<y0>,<x1>,<y1>};

*soundeffect "<effect filename>",<type>;
</syntax>

<description>
These two commands will play a sound effect to either the invoking character only (soundeffect) or multiple characters (soundeffectall). If the running code does not have an object ID (a floating NPC) or is not running from an NPC object at all (an item script), the sound will be centered on the character whose RID got attached to the script, if any. If it does, it will be centered on that object (an NPC sprite).

Effect filename is the filename in a GRF. It must have the .wav extension.

It's not quite certain what the type actually does; it is sent to the client directly. It probably determines which directory to play the effect from. It's certain that giving 0 for the number will play sound files from \data\wav, but where the other numbers will read from is unclear.

The sound files themselves must be in PCM format, and file names should also have a maximum length of 23 characters including the .wav extension.

You can add your own effects this way, naturally.

<example_code>
soundeffect "1234567890123456789.wav", 0; // this will play the soundeffect
soundeffect "12345678901234567890.wav", 0; // throw gravity error
</example_code>
<example_code>
// Play sound only to the attached player
soundeffect "heal.wav", 0;
</example_code>
<example_code>
// Play sound to all players on the current map
soundeffectall "potion.wav", 0, "prontera";
</example_code>
<example_code>
// Play sound to all players within a specific area
soundeffectall "attack.wav", 0, "prontera", 100, 100, 200, 200;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*playBGM "<BGM filename>";

*playBGMall "<BGM filename>"{,"<map name>"{,<x0>,<y0>,<x1>,<y1>}};
</syntax>

<description>
These two commands will play Background Music to either the invoking character only (playBGM) or multiple characters (playBGMall).

BGM filename is the filename in the /BGM/ folder. It has to have a .mp3 extension. It is not required to specify the extension inside the script.

If coordinates are omitted, BGM will be broadcasted on the entire map. If the map name is omitted as well, the BGM will be played for the entire server.

You can add your own BGMs this way, naturally.

<example_code>
// Play BGM only to the attached player
playBGM "01";
</example_code>
<example_code>
// Play BGM to all players on the prontera map
playBGMall "02", "prontera";
</example_code>
<example_code>
// Play BGM to all players within a specific area
playBGMall "03", "prontera", 100, 100, 200, 200;
</example_code>
<example_code>
// Play BGM to the entire server
playBGMall "boss_01";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*playBGMall "<BGM filename>"{,"<map name>"{,<x0>,<y0>,<x1>,<y1>}};

*playBGM "<BGM filename>";
</syntax>

<description>
These two commands will play Background Music to either the invoking character only (playBGM) or multiple characters (playBGMall).

BGM filename is the filename in the /BGM/ folder. It has to have a .mp3 extension. It is not required to specify the extension inside the script.

If coordinates are omitted, BGM will be broadcasted on the entire map. If the map name is omitted as well, the BGM will be played for the entire server.

You can add your own BGMs this way, naturally.

<example_code>
// Play BGM only to the attached player
playBGM "01";
</example_code>
<example_code>
// Play BGM to all players on the prontera map
playBGMall "02", "prontera";
</example_code>
<example_code>
// Play BGM to all players within a specific area
playBGMall "03", "prontera", 100, 100, 200, 200;
</example_code>
<example_code>
// Play BGM to the entire server
playBGMall "boss_01";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*pvpon "<map name>";

*pvpoff "<map name>";
</syntax>

<description>
These commands will turn PVP mode for the specified maps on and off. Besides setting the flags referred to in setmapflag, pvpon will also create a PVP timer and ranking as the @pvpon GM command does.

<example_code>
// Enable PVP mode on prontera
pvpon "prontera";
</example_code>
<example_code>
// Disable PVP mode on prontera
pvpoff "prontera";
</example_code>
<example_code>
// Enable PVP mode on multiple maps
pvpon "pvp_room";
pvpon "pvp_arena";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*pvpoff "<map name>";

*pvpon "<map name>";
</syntax>

<description>
These commands will turn PVP mode for the specified maps on and off. Besides setting the flags referred to in setmapflag, pvpon will also create a PVP timer and ranking as the @pvpon GM command does.

<example_code>
// Enable PVP mode on prontera
pvpon "prontera";
</example_code>
<example_code>
// Disable PVP mode on prontera
pvpoff "prontera";
</example_code>
<example_code>
// Enable PVP mode on multiple maps
pvpon "pvp_room";
pvpon "pvp_arena";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*atcommand "<command>";
</syntax>

<description>
This command will run the given command line exactly as if it was typed in from the keyboard by the player connected to the invoking character, and that character belonged to an account which had GM level 99.

Note that for atcommands bound using bindatcmd, this command will execute the original atcommand, not the script-bound atcommand.

<example_code>
// This will ask the invoker for a character name and then use the @nuke
// GM command on them, killing them mercilessly
input .@player$;
atcommand "@nuke " + .@player$;
</example_code>
<example_code>
// Heal the attached player
atcommand "@heal";
</example_code>
<example_code>
// Warp the attached player to another location
atcommand "@warp prontera 150 100";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*charcommand "<command>";
</syntax>

<description>
This command will run the given command line exactly as if it was typed in from the keyboard from a character that belonged to an account which had GM level 99. The commands can also run without an attached RID.

<example_code>
// This would do the same as above, but now it doesn't need a player attached by default
charcommand "#option 0 0 0 Roy";
</example_code>
<example_code>
// Execute a char command
charcommand "#heal 150001";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bindatcmd "<command>","<NPC object name>::<event label>"{,<atcommand level>,<charcommand level>};
</syntax>

<description>
This command will bind an NPC event label to an atcommand. Upon execution of the atcommand, the user will invoke the NPC event label. Each atcommand is only allowed one binding. If you rebind, it will override the original binding.

Note: The default level for atcommand is 0 while the default level for charcommand is 100.

The following variables are set upon execution:
.@atcmd_command$       = The name of the @command used.
.@atcmd_parameters$[]  = Array containing the given parameters, starting from an index of 0.
.@atcmd_numparameters  = The number of parameters defined.

<example_code>
// When a user types the command "@test", an angel effect will be shown
-   script  atcmd_example   -1,{
OnInit:
    bindatcmd "test", strnpcinfo(3) + "::OnAtcommand";
    end;
OnAtcommand:
    specialeffect2 EF_ANGEL2;
    end;
}
</example_code>
<example_code>
// Custom command with parameters
-   script  greet_cmd   -1,{
OnInit:
    bindatcmd "greet", strnpcinfo(3) + "::OnGreet";
    end;
OnGreet:
    if (.@atcmd_numparameters > 0)
        mes "Hello, " + .@atcmd_parameters$[0] + "!";
    else
        mes "Hello, world!";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unbindatcmd "<command>";
</syntax>

<description>
This command will unbind an NPC event label from an atcommand.

<example_code>
// Unbind the command "@test"
unbindatcmd "test";
</example_code>
<example_code>
// In an NPC script
-   script  atcmd_remover   -1,{
    mes "Do you want to remove the @greet command?";
    next;
    if (select("Yes:No") == 1) {
        unbindatcmd "greet";
        mes "Command @greet has been unbound.";
    } else {
        mes "Command remains bound.";
    }
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*useatcmd "<command>";
</syntax>

<description>
This command will execute a script-bound atcommand for the attached RID. If the supplied command is not bound to any script, this command will act like atcommand and attempt to execute a source-defined command.

The three .@atcmd_***** variables will NOT be set when invoking script-bound atcommands in this way.

<example_code>
// Execute a script-bound command
useatcmd "@heal";

// Execute a script-bound command with parameters
useatcmd "@warp prontera 150 100";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*camerainfo <range>,<rotation>,<latitude>{,<char id>};
</syntax>

<description>
This command will update the client's camera information with the given values where the client can be the attached character or the player given by the char ID parameter. Note: This requires 2016-05-25aRagexeRE or newer.

The values given will be divided by 100 and transmitted as floating-point numbers.

range       The zoom factor of the camera.
            Default: 230000 (230.0) when fully zoomed in
            Maximum: 400000 (400.0) when fully zoomed out

rotation    The rotation of the camera.
            Default: 0 (0.0) when no rotation is applied
            Maximum: 360000 (360.0°) when fully rotated

latitude    The angle of the camera.
            Default: -50000 (-50.0)
            Maximum: -75000 (-75.0)

<example_code>
// Zoom out and rotate the camera for the attached player
camerainfo 350000, 90000, -60000;

// Reset camera to default
camerainfo 230000, 0, -50000;

// Change camera for another player
camerainfo 400000, 180000, -75000, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*refineui({<char id>})
</syntax>

<description>
Opens the refine UI for the attached player or the given character ID.

This feature requires 2016-10-12aRagexeRE or newer.

<example_code>
// Open refine UI for attached player
refineui;
</example_code>
<example_code>
// Open refine UI for another character
refineui(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*openstylist({<char id>})
</syntax>

<description>
Opens the stylist UI for the attached player or the given character ID.

This feature requires packet version 2015-11-04 or newer.

<example_code>
// Open stylist UI for attached player
openstylist;
</example_code>
<example_code>
// Open stylist UI for another character
openstylist(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*laphine_synthesis({<item id>})

*laphine_synthesis({<"item name">})
</syntax>

<description>
Opens the laphine synthesis UI for <item ID> or <item name> for the attached player. If run from within an item script, <item ID> or <item name> is optional.

This feature requires packet version 2016-06-01 or newer.

<example_code>
// Open laphine synthesis UI for Apple (ID 512)
laphine_synthesis(512);
</example_code>
<example_code>
// Open laphine synthesis UI for Apple by name
laphine_synthesis("Apple");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*laphine_upgrade()
</syntax>

<description>
Opens the laphine upgrade UI for the attached player.

This feature requires packet version 2017-07-26 or newer.

This function is intended for use in item scripts.

<example_code>
// Open laphine upgrade UI from an item script
laphine_upgrade;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*openbank({<char id>})
</syntax>

<description>
Opens the Bank UI for the attached player or the given character ID.

This command requires packet version 2015-12-02 or newer.

<example_code>
// Open bank UI for attached player
openbank;
</example_code>
<example_code>
// Open bank UI for another character
openbank(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*enchantgradeui {<char id>};
</syntax>

<description>
Opens the enchantgrade UI for the attached character or the player given by the char ID parameter.

This command requires packet version 2020-07-24 or newer.

<example_code>
// Open enchantgrade UI for attached player
enchantgradeui;
</example_code>
<example_code>
// Open enchantgrade UI for another character
enchantgradeui(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*set_reputation_points(<type>,<points>{,<char id>})
</syntax>

<description>
Sets the reputation points via <points> for reputation group <type> for the attached player or the given character ID.

<type> is the client side index as stored in the Id field of the reputation.yml database files.

<example_code>
// Set reputation points for type 1 to 100 for attached player
set_reputation_points(1, 100);
</example_code>
<example_code>
// Add 50 reputation points to type 2
.@current = get_reputation_points(2);
set_reputation_points(2, .@current + 50);
</example_code>
<example_code>
// Set reputation points for another character
set_reputation_points(3, 200, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*get_reputation_points(<type>{,<char id>})
</syntax>

<description>
Gets the reputation points for reputation group <type> for the attached player or the given character ID.

<type> is the client side index as stored in the Id field of the reputation.yml database files.

<example_code>
// Get reputation points for type 1
.@points = get_reputation_points(1);
mes "You have " + .@points + " reputation points for this group.";
</example_code>
<example_code>
// Get reputation points for another character
.@points = get_reputation_points(2, 150001);
mes "That character has " + .@points + " reputation points.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*add_reputation_points(<type>,<points>{,<char id>})
</syntax>

<description>
Adds the reputation points via <points> for reputation group <type> for the attached player or the given character ID.

<type> is the client side index as stored in the Id field of the reputation.yml database files.

<example_code>
// Add 50 reputation points to type 1 for attached player
add_reputation_points(1, 50);
</example_code>
<example_code>
// Add 100 reputation points to type 2 for another character
add_reputation_points(2, 100, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*item_reform({<item id>{,<char id>}})

*item_reform({<"item name">{,<char id>}})
</syntax>

<description>
Opens the item reform UI for <item ID> or <item name> for the attached player or the given character ID. If run from within an item script, <item ID> or <item name> is optional.

This feature requires packet version 2021-11-03 or newer.

<example_code>
// Open item reform UI for Apple (ID 512) for attached player
item_reform(512);
</example_code>
<example_code>
// Open item reform UI for Apple by name
item_reform("Apple");
</example_code>
<example_code>
// Open item reform UI for another character
item_reform(512, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*item_enchant(<client side LUA index>{,<char ID>});
</syntax>

<description>
Opens the enchant UI for the attached character or the player given by the <char ID> parameter. If the player exceeds 70% weight, the client will not open the enchant UI and will trigger an error message instead.

This command requires packet version 2021-11-03 or newer.

<example_code>
// Open enchant UI with LUA index 1 for attached player
item_enchant(1);
</example_code>
<example_code>
// Open enchant UI for another character
item_enchant(2, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*opentips({<Tip ID>,{<char ID>}});
</syntax>

<description>
Opens the tip box UI for the attached player or the given character ID.

This command requires packet version 2017-11-22 or newer.

<example_code>
// Open tip box UI for attached player with default tip
opentips;
</example_code>
<example_code>
// Open tip box UI with specific tip ID
opentips(5);
</example_code>
<example_code>
// Open tip box UI for another character
opentips(5, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitwalk <GID>,<x>,<y>{,"<event label>"};

*unitwalkto <GID>,<Target GID>{,"<event label>"};
</syntax>

<description>
This command will tell a <GID> to walk to a position, defined either as a set of coordinates or another object. The command returns 1 for success and 0 upon failure.

If coordinates are passed, the <GID> will walk to the given x,y coordinates on the unit's current map. While there is no way to move across an entire map with one command, this could be used in a loop to move long distances.

If an object ID is passed, the initial <GID> will walk to the <Target GID> (similar to walking to attack). This is based on the distance from <GID> to <Target ID>. This command uses a hard walk check, so it will calculate a walk path with obstacles. Sending a bad target ID will result in an error.

An optional Event Label can be passed as well which will execute when the <GID> has reached the given coordinates or <Target GID>.

<example_code>
// Makes player walk to the coordinates (150,150)
unitwalk getcharid(3), 150, 150;
</example_code>
<example_code>
// Performs a conditional check with the command and reports success or failure to the player
if (unitwalk(getcharid(3), 150, 150))
    dispbottom "Walking you there...";
else
    dispbottom "That's too far away, man.";
</example_code>
<example_code>
// Makes player walk to another character named "WalkToMe"
unitwalkto getcharid(3), getcharid(3, "WalkToMe");
</example_code>
<example_code>
// Unitwalk with event label
unitwalk getcharid(3), 200, 150, "NPC::OnArrived";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitwalkto <GID>,<Target GID>{,"<event label>"};

*unitwalk <GID>,<x>,<y>{,"<event label>"};
</syntax>

<description>
This command will tell a <GID> to walk to a position, defined either as a set of coordinates or another object. The command returns 1 for success and 0 upon failure.

If coordinates are passed, the <GID> will walk to the given x,y coordinates on the unit's current map. While there is no way to move across an entire map with one command, this could be used in a loop to move long distances.

If an object ID is passed, the initial <GID> will walk to the <Target GID> (similar to walking to attack). This is based on the distance from <GID> to <Target ID>. This command uses a hard walk check, so it will calculate a walk path with obstacles. Sending a bad target ID will result in an error.

An optional Event Label can be passed as well which will execute when the <GID> has reached the given coordinates or <Target GID>.

<example_code>
// Makes player walk to the coordinates (150,150)
unitwalk getcharid(3), 150, 150;
</example_code>
<example_code>
// Performs a conditional check with the command and reports success or failure to the player
if (unitwalk(getcharid(3), 150, 150))
    dispbottom "Walking you there...";
else
    dispbottom "That's too far away, man.";
</example_code>
<example_code>
// Makes player walk to another character named "WalkToMe"
unitwalkto getcharid(3), getcharid(3, "WalkToMe");
</example_code>
<example_code>
// Unitwalk with event label
unitwalk getcharid(3), 200, 150, "NPC::OnArrived";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitattack <GID>,<Target ID>{,<action type>};

*unitattack <GID>,"<Target Name>"{,<action type>};
</syntax>

<description>
This command will make a <GID> attack the specified target. It returns true upon success and false for all failures.

If <GID> is a player and a non-zero <action type> is given, the unit will perform a continuous attack instead of a single attack.

Note: Using unitattack with <GID> 0 means that it will use the currently attached unit. For players, any attack requests will fail because talking to an NPC prevents attacking a monster. Therefore you need to detach the player from the NPC before using this command.

<example_code>
// Make the attached player attack a monster by target ID
unitattack getcharid(3), 150001, 1;
</example_code>
<example_code>
// Make a player attack a monster by name
unitattack getcharid(3), "Poring", 1;
</example_code>
<example_code>
// Detach and attack
detachrid;
unitattack getcharid(3), 150001, 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitkill <GID>;
</syntax>

<description>
This command will kill a <GID>.

<example_code>
// Kill the attached player
unitkill getcharid(3);
</example_code>
<example_code>
// Kill a specific monster by GID
unitkill 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitwarp <GID>,"<map name>",<x>,<y>;
</syntax>

<description>
This command will warp a <GID> to the specified map and coordinates.

If <GID> is zero, the command runs for the unit that invoked the script. This can be used with OnTouch to warp monsters.

<example_code>
OnTouch:
    unitwarp 0, "this", -1, -1;
</example_code>
<example_code>
// Warp a specific monster to another map
unitwarp 150001, "prontera", 150, 100;
</example_code>
<example_code>
// Complete working example: Monster that warps players on touch
prontera,150,150,4  script   WarpMonster   100,{
    // Spawn a monster
    monster "prontera", 150, 150, "Warp Guard", 1002, 1, strnpcinfo(0) + "::OnWarpTouch";
    end;

OnWarpTouch:
    // When the monster is touched, warp the player who touched it
    unitwarp getcharid(3), "payon", 100, 100;
    npctalk "You have been warped to Payon!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitstopattack <GID>;
</syntax>

<description>
This command will make a <GID> stop attacking.

<example_code>
// Make the attached player stop attacking
unitstopattack getcharid(3);
</example_code>
<example_code>
// Make a specific monster stop attacking
unitstopattack 150001;
</example_code>
<example_code>
// Complete working example: NPC that summons a monster and stops its attack
prontera,150,150,4  script  AttackStopper   100,{
    mes "[Summoner]";
    mes "I will summon a monster that will attack you, then stop it!";
    next;
    monster "prontera", 155, 150, "Attack Dog", 1002, 1, strnpcinfo(0) + "::OnStopAttack";
    close;

OnStopAttack:
    // Stop the monster from attacking after 3 seconds
    sleep2 3000;
    unitstopattack $@mobid[0];
    npctalk "The monster has stopped attacking!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitstopwalk <GID>{,<flag>};
</syntax>

<description>
This command will make a <GID> stop moving.

Note: If this is called from OnTouch, then the walktimer attached to the unit is removed from OnTouch, which causes this command to not stop the unit from walking. It is suggested to use unitblockmove to forcefully stop the unit with OnTouch.

The <flag> value affects how the unit is stopped. The following flags are bitwise values (can be combined using the pipe operator):
<example_code>
USW_NONE // Unit will keep walking to their original destination.
USW_FIXPOS // Issue a fixpos packet afterwards.
USW_MOVE_ONCE // Force the unit to move one cell if it hasn't yet.
USW_MOVE_FULL_CELL // Enable moving to the next cell when the unit was already half-way there (may cause on-touch/place side-effects, such as a scripted map change).
USW_FORCE_STOP // Force stop moving.
</example_code>

This command will also remove the state tracking used for unitwalk and unitwalkto.

<example_code>
// Make the attached player stop moving
unitstopwalk getcharid(3);
</example_code>
<example_code>
// Make a monster stop moving with force stop
unitstopwalk 150001, USW_FORCE_STOP;
</example_code>
<example_code>
// Complete working example: NPC that stops a moving player
prontera,150,150,4  script  StopperNPC  100,{
    mes "[Stopper]";
    mes "I will make you walk to the fountain, then stop you!";
    next;
    close2;
    unitwalk getcharid(3), 200, 150, strnpcinfo(0) + "::OnStop";
    end;

OnStop:
    unitstopwalk getcharid(3), USW_FORCE_STOP;
    dispbottom "You have been stopped!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unittalk <GID>,"<text>"{,<flag>};
</syntax>

<description>
This command will make a <GID> say a message. The display name of the <GID> will not be appended in front of the message.

flag: Specify target
bc_area - Message is sent to players in the vicinity of the source (default).
bc_self - Message is sent only to the attached player.

<example_code>
// Make a monster say a message
unittalk 150001, "I will defeat you!";
</example_code>
<example_code>
// Make the attached player say a message only to themselves
unittalk getcharid(3), "This is a private thought.", bc_self;
</example_code>
<example_code>
// Complete working example: Monster that talks when touched
prontera,150,150,4  script  TalkingMonster  100,{
    monster "prontera", 150, 150, "Guardian", 1002, 1, strnpcinfo(0) + "::OnTouch";
    end;

OnTouch:
    unittalk $@mobid[0], "Do not come any closer!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitskilluseid <GID>,<skill id>,<skill lvl>{,<target id>,<casttime>,<cancel>,<Line_ID>,<ignore_range>};

*unitskilluseid <GID>,"<skill name>",<skill lvl>{,<target id>,<casttime>,<cancel>,<Line_ID>,<ignore_range>};
</syntax>

<description>
This command will make a <GID> use a specified skill. The command returns true upon success and false for all failures.

Parameters:
- target id: The GID of the target (optional)
- casttime: Cast time in milliseconds (optional)
- cancel: 0 = non-cancelable, 1 = cancelable (optional)
- Line_ID: Used for multi-target skills (optional)
- ignore_range: 0 = check range, 1 = ignore range check (optional)

<example_code>
// Make a monster use Fire Bolt level 5 on a target
unitskilluseid 150001, 19, 5, getcharid(3);
</example_code>
<example_code>
// Using skill name
unitskilluseid $@mobid[0], "MG_FIREBOLT", 5, getcharid(3);
</example_code>
<example_code>
// Complete working example: NPC that summons a monster that casts heal
prontera,150,150,4  script  HealerMonster   100,{
    monster "prontera", 150, 150, "Healer", 1002, 1, strnpcinfo(0) + "::OnSummon";
    mes "[Summoner]";
    mes "I summoned a monster that will heal you!";
    close;

OnSummon:
    sleep2 1000;
    unitskilluseid $@mobid[0], "AL_HEAL", 5, getcharid(3);
    unittalk $@mobid[0], "You are healed!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitskillusepos <GID>,<skill id>,<skill lvl>,<x>,<y>{,<casttime>,<cancel>,<Line_ID>,<ignore_range>};

*unitskillusepos <GID>,"<skill name>",<skill lvl>,<x>,<y>{,<casttime>,<cancel>,<Line_ID>,<ignore_range>};
</syntax>

<description>
This command will make a <GID> use a specified skill at a target position. The command returns true upon success and false for all failures.

Parameters:
- x, y: Coordinates where the skill will be cast
- casttime: Cast time in milliseconds (optional)
- cancel: 0 = non-cancelable, 1 = cancelable (optional)
- Line_ID: Used for multi-target skills (optional)
- ignore_range: 0 = check range, 1 = ignore range check (optional)

<example_code>
// Make a monster cast Fire Ball at coordinates (150, 150)
unitskillusepos 150001, 21, 5, 150, 150;
</example_code>
<example_code>
// Using skill name with cast time
unitskillusepos $@mobid[0], "MG_FIREBALL", 5, 155, 155, 2000;
</example_code>
<example_code>
// Complete working example: NPC that summons a monster to cast ground skill
prontera,150,150,4  script  GroundCaster    100,{
    monster "prontera", 150, 150, "Caster", 1002, 1, strnpcinfo(0) + "::OnSummon";
    mes "[Summoner]";
    mes "Watch as my monster casts a spell on the ground!";
    close;

OnSummon:
    sleep2 1000;
    unitskillusepos $@mobid[0], "MG_FIREWALL", 1, 155, 150, 1500;
    unittalk $@mobid[0], "Fire Wall deployed!";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*unitexists <GID>;
</syntax>

<description>
Checks if the given Game ID exists. Returns false if the object doesn't exist, or true if it does.

<example_code>
// Check if a monster still exists before attacking
if (unitexists(150001))
    unitskilluseid getcharid(3), 19, 5, 150001;
else
    dispbottom "Target no longer exists!";
</example_code>
<example_code>
// Complete working example: Safe monster interaction
prontera,150,150,4  script  MonsterChecker  100,{
    mes "[Guard]";
    mes "I will summon a monster and check if it exists.";
    next;
    monster "prontera", 155, 150, "Test Monster", 1002, 1;
    .@mob_id = $@mobid[0];
    mes "Monster summoned with GID: " + .@mob_id;
    next;
    if (unitexists(.@mob_id))
        mes "The monster is still alive!";
    else
        mes "The monster has been defeated.";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getunittype <GID>;
</syntax>

<description>
Returns the type of object from the given Game ID. Returns -1 if the given GID does not exist.

Return values:

<example_code>
BL_PC   // Character object
BL_MOB  // Monster object
BL_PET  // Pet object
BL_HOM  // Homunculus object
BL_MER  // Mercenary object
BL_NPC  // NPC object
BL_ELEM // Elemental object
</example_code>
<example_code>
// Check what type of object a GID belongs to
.@type = getunittype(150001);
switch (.@type) {
    case BL_PC:
        mes "It's a player character.";
        break;
    case BL_MOB:
        mes "It's a monster.";
        break;
    case BL_NPC:
        mes "It's an NPC.";
        break;
    default:
        mes "Unknown object type.";
        break;
}
</example_code>
<example_code>
// Complete working example: Object type detector
prontera,150,150,4  script  TypeDetector    100,{
    mes "[Detector]";
    mes "Enter a Game ID:";
    input .@gid;
    .@type = getunittype(.@gid);
    if (.@type == -1) {
        mes "No object exists with that GID.";
    } else {
        mes "Object type: " + .@type;
        if (.@type == BL_PC) mes "This is a player!";
        else if (.@type == BL_MOB) mes "This is a monster!";
        else if (.@type == BL_NPC) mes "This is an NPC!";
    }
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getunitname <GID>;
</syntax>

<description>
Gets the name of the given unit. Supported types are monster, homunculus, pet, and NPC. Mercenary and Elemental do not support custom names.

Returns "Unknown" if the unit is not found.

<example_code>
// Get the name of a monster by its GID
.@name$ = getunitname(150001);
mes "Monster name: " + .@name$;
</example_code>
<example_code>
// Complete working example: Unit name displayer
prontera,150,150,4  script  NameChecker 100,{
    mes "[Name Checker]";
    mes "Summon a Poring and I will tell you its name.";
    next;
    monster "prontera", 155, 150, "Test Poring", 1002, 1;
    .@mob_id = $@mobid[0];
    mes "Monster summoned with GID: " + .@mob_id;
    .@name$ = getunitname(.@mob_id);
    mes "The monster's name is: " + .@name$;
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setunitname <GID>,"<new name>";
</syntax>

<description>
Changes the name of the given unit to the new name given. Supported types are monster, homunculus, and pet. To change an NPC's name, see setnpcdisplay. Mercenary and Elemental do not support custom names.

Changing a homunculus or pet name will be permanent.

Returns "Unknown" if the unit is not found.

<example_code>
// Rename a summoned monster
monster "prontera", 155, 150, "Poring", 1002, 1;
setunitname $@mobid[0], "My Special Poring";
</example_code>
<example_code>
// Complete working example: Monster rename NPC
prontera,150,150,4  script  MonsterRenamer  100,{
    mes "[Renamer]";
    mes "I will summon a monster and rename it for you.";
    next;
    monster "prontera", 155, 150, "Poring", 1002, 1;
    .@mob_id = $@mobid[0];
    mes "Monster summoned with GID: " + .@mob_id;
    mes "Current name: " + getunitname(.@mob_id);
    next;
    setunitname .@mob_id, "Renamed Poring";
    mes "New name: " + getunitname(.@mob_id);
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setunittitle <GID>,<title>;
</syntax>

<description>
Apply a <title> to the given <GID>.

Note: This only works on non-player types. It also will only work on mobs if battle_config.show_mob_info is not enabled.

<example_code>
// Apply a title to a summoned monster
monster "prontera", 155, 150, "Poring", 1002, 1;
setunittitle $@mobid[0], "Boss Monster";
</example_code>
<example_code>
// Complete working example: Monster title NPC
prontera,150,150,4  script  TitleGiver  100,{
    mes "[Title Giver]";
    mes "I will summon a monster and give it a title.";
    next;
    monster "prontera", 155, 150, "Guardian", 1002, 1;
    .@mob_id = $@mobid[0];
    mes "Monster summoned. Giving title 'Elite Guardian'...";
    setunittitle .@mob_id, "Elite Guardian";
    mes "Title applied!";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getunittitle <GID>;
</syntax>

<description>
Returns the title of the given <GID>.

<example_code>
// Get the title of a monster
.@title$ = getunittitle(150001);
mes "Monster title: " + .@title$;
</example_code>
<example_code>
// Complete working example: Title checker
prontera,150,150,4  script  TitleChecker    100,{
    mes "[Title Checker]";
    mes "I will summon a monster with a title, then display it.";
    next;
    monster "prontera", 155, 150, "Guardian", 1002, 1;
    .@mob_id = $@mobid[0];
    setunittitle .@mob_id, "Ancient Guardian";
    mes "Title set. Now reading it back...";
    .@title$ = getunittitle(.@mob_id);
    mes "The monster's title is: " + .@title$;
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getunitdata <GID>,<arrayname>;

*setunitdata <GID>,<parameter>,<new value>;
</syntax>

<description>
This is used to get and set special data related to the unit. With getunitdata, the array given will be filled with the current data. In setunitdata, the indexes in the array would be used to set that data on the unit.

Both getunitdata and setunitdata will return -1 if the given GID does not exist.

Note: When adjusting a unit's stat (STR, AGI, etc.), the unit's respective statuses are recalculated (HIT, FLEE, etc.) automatically. Keep in mind that some stats don't affect a unit's status and will have to be directly modified.

Parameters (indexes) for monsters are:
<example_code>
UMOB_SIZE, UMOB_LEVEL, UMOB_HP, UMOB_MAXHP, UMOB_MASTERAID, UMOB_MAPID, UMOB_X, UMOB_Y, 
UMOB_SPEED, UMOB_MODE, UMOB_AI, UMOB_SCOPTION, UMOB_SEX, UMOB_CLASS, UMOB_HAIRSTYLE, 
UMOB_HAIRCOLOR, UMOB_HEADBOTTOM, UMOB_HEADMIDDLE, UMOB_HEADTOP, UMOB_CLOTHCOLOR, 
UMOB_SHIELD, UMOB_WEAPON, UMOB_LOOKDIR, UMOB_CANMOVETICK, UMOB_STR, UMOB_AGI, UMOB_VIT, 
UMOB_INT, UMOB_DEX, UMOB_LUK, UMOB_SLAVECPYMSTRMD, UMOB_DMGIMMUNE, UMOB_ATKRANGE, UMOB_ATKMIN, 
UMOB_ATKMAX, UMOB_MATKMIN, UMOB_MATKMAX, UMOB_DEF, UMOB_MDEF, UMOB_HIT, UMOB_FLEE, UMOB_PDODGE, 
UMOB_CRIT, UMOB_RACE, UMOB_ELETYPE, UMOB_ELELEVEL, UMOB_AMOTION, UMOB_ADELAY, UMOB_DMOTION, 
UMOB_TARGETID, UMOB_ROBE, UMOB_BODY2, UMOB_GROUP_ID, UMOB_IGNORE_CELL_STACK_LIMIT, 
UMOB_RES, UMOB_MRES, UMOB_DAMAGETAKEN
</example_code>
Parameters (indexes) for homunculi are:
<example_code>
UHOM_SIZE, UHOM_LEVEL, UHOM_HP, UHOM_MAXHP, UHOM_SP, UHOM_MAXSP, UHOM_MASTERCID, 
UHOM_MAPID, UHOM_X, UHOM_Y, UHOM_HUNGER, UHOM_INTIMACY, UHOM_SPEED, UHOM_LOOKDIR, 
UHOM_CANMOVETICK, UHOM_STR, UHOM_AGI, UHOM_VIT, UHOM_INT, UHOM_DEX, UHOM_LUK, 
UHOM_DMGIMMUNE, UHOM_ATKRANGE, UHOM_ATKMIN, UHOM_ATKMAX, UHOM_MATKMIN, UHOM_MATKMAX, 
UHOM_DEF, UHOM_MDEF, UHOM_HIT, UHOM_FLEE, UHOM_PDODGE, UHOM_CRIT, UHOM_RACE, 
UHOM_ELETYPE, UHOM_ELELEVEL, UHOM_AMOTION, UHOM_ADELAY, UHOM_DMOTION, 
UHOM_TARGETID, UHOM_GROUP_ID
</example_code>
Parameters (indexes) for pets are:
<example_code>
UPET_SIZE, UPET_LEVEL, UPET_HP, UPET_MAXHP, UPET_MASTERAID, UPET_MAPID, UPET_X, 
UPET_Y, UPET_HUNGER, UPET_INTIMACY, UPET_SPEED, UPET_LOOKDIR, UPET_CANMOVETICK, 
UPET_STR, UPET_AGI, UPET_VIT, UPET_INT, UPET_DEX, UPET_LUK, UPET_DMGIMMUNE, 
UPET_ATKRANGE, UPET_ATKMIN, UPET_ATKMAX, UPET_MATKMIN, UPET_MATKMAX, UPET_DEF, 
UPET_MDEF, UPET_HIT, UPET_FLEE, UPET_PDODGE, UPET_CRIT, UPET_RACE, UPET_ELETYPE, 
UPET_ELELEVEL, UPET_AMOTION, UPET_ADELAY, UPET_DMOTION, UPET_GROUP_ID
</example_code>
Parameters (indexes) for mercenaries are:
<example_code>
UMER_SIZE, UMER_HP, UMER_MAXHP, UMER_MASTERCID, UMER_MAPID, UMER_X, UMER_Y, 
UMER_KILLCOUNT, UMER_LIFETIME, UMER_SPEED, UMER_LOOKDIR, UMER_CANMOVETICK, 
UMER_STR, UMER_AGI, UMER_VIT, UMER_INT, UMER_DEX, UMER_LUK, UMER_DMGIMMUNE, 
UMER_ATKRANGE, UMER_ATKMIN, UMER_ATKMAX, UMER_MATKMIN, UMER_MATKMAX, UMER_DEF, 
UMER_MDEF, UMER_HIT, UMER_FLEE, UMER_PDODGE, UMER_CRIT, UMER_RACE, UMER_ELETYPE, 
UMER_ELELEVEL, UMER_AMOTION, UMER_ADELAY, UMER_DMOTION, UMER_TARGETID, UMER_GROUP_ID
</example_code>
Parameters (indexes) for elementals are:
<example_code>
UELE_SIZE, UELE_HP, UELE_MAXHP, UELE_SP, UELE_MAXSP, UELE_MASTERCID, UELE_MAPID, 
UELE_X, UELE_Y, UELE_LIFETIME, UELE_MODE, UELE_SPEED, UELE_LOOKDIR, UELE_CANMOVETICK, 
UELE_STR, UELE_AGI, UELE_VIT, UELE_INT, UELE_DEX, UELE_LUK, UELE_DMGIMMUNE, 
UELE_ATKRANGE, UELE_ATKMIN, UELE_ATKMAX, UELE_MATKMIN, UELE_MATKMAX, UELE_DEF, 
UELE_MDEF, UELE_HIT, UELE_FLEE, UELE_PDODGE, UELE_CRIT, UELE_RACE, UELE_ELETYPE, 
UELE_ELELEVEL, UELE_AMOTION, UELE_ADELAY, UELE_DMOTION, UELE_TARGETID, UELE_GROUP_ID
</example_code>
Parameters (indexes) for NPCs are:
<example_code>
UNPC_LEVEL, UNPC_HP, UNPC_MAXHP, UNPC_MAPID, UNPC_X, UNPC_Y, UNPC_LOOKDIR, UNPC_STR, 
UNPC_AGI, UNPC_VIT, UNPC_INT, UNPC_DEX, UNPC_LUK, UNPC_PLUSALLSTAT, UNPC_DMGIMMUNE, 
UNPC_ATKRANGE, UNPC_ATKMIN, UNPC_ATKMAX, UNPC_MATKMIN, UNPC_MATKMAX, UNPC_DEF, 
UNPC_MDEF, UNPC_HIT, UNPC_FLEE, UNPC_PDODGE, UNPC_CRIT, UNPC_RACE, UNPC_ELETYPE, 
UNPC_ELELEVEL, UNPC_AMOTION, UNPC_ADELAY, UNPC_DMOTION, UNPC_SEX, UNPC_CLASS, 
UNPC_HAIRSTYLE, UNPC_HAIRCOLOR, UNPC_HEADBOTTOM, UNPC_HEADMIDDLE, UNPC_HEADTOP, 
UNPC_CLOTHCOLOR, UNPC_SHIELD, UNPC_WEAPON, UNPC_ROBE, UNPC_BODY2, UNPC_DEADSIT, 
UNPC_GROUP_ID
</example_code>
Notes:
- *_SIZE: small (0); medium (1); large (2)
- *_MAPID: this refers to the map_data index (from src/map/map.cpp), not the mapindex_db index (from src/common/mapindex.cpp). For setunitdata, map name can also be passed in as a valid value instead of map ID.
- *_SPEED: 20 - 1000
- *_MODE: see doc/mob_db_mode_list.txt
- *_LOOKDIR: north (0), northwest (1), west (2), etc.
- *_CANMOVETICK: seconds * 1000 the unit will be unable to move
- *_DMGIMMUNE: unit will be immune to damage (1), or will receive damage (0)
- *_HUNGER: 0 - 100
- *_INTIMACY: 0 - 1000
- *_LIFETIME: seconds * 1000 the unit will be alive for
- *_AMOTION: see doc/mob_db.txt
- *_ADELAY: see doc/mob_db.txt
- *_DMOTION: see doc/mob_db.txt
- *_BODY2: enable (1) the alternate display, or disable (0)
- *_TARGETID: when set to 0, the unit will release the target and stop attacking
- UMOB_AI: none (0); attack (1); marine sphere (2); flora (3); zanzou (4); legion (5); faw (6)
- UMOB_SCOPTION: see the Variables section at the top of this document
- UMOB_SLAVECPYMSTRMD: make the slave copy the master's mode (1), or not (0)
- UNPC_PLUSALLSTAT: same as bAllStats; increases/decreases all stats by given amount
- UNPC_DEADSIT: stand (0), dead (1), sit (2)

<example_code>
// Spawn some Porings and save the Game ID.
// Keep in mind, when the monster script command is used,
// all the spawned monster GIDs are stored in an array called $@mobid[].
monster "prontera", 149, 190, "Poring", 1002, 10;
.GID = $@mobid[9]; // Store and modify the 10th Poring spawned to make him stronger!

// Save the strong Poring's mob data in the .@por_arr variable. (.@por_arr[1] being level, .@por_arr[13] being class, etc.)
// With this data we can have the NPC display or manipulate it how we want. This does not have to be ran before setunitdata.
getunitdata .GID, .@por_arr;

// Set the max HP of the Poring to 1000 (current HP will also get updated to 1000)
setunitdata .GID, UMOB_MAXHP, 1000;
</example_code>
<example_code>
// Complete working example: Unit data modifier
prontera,150,150,4  script  UnitDataModifier    100,{
    mes "[Modifier]";
    mes "I will summon a Poring and make it stronger!";
    next;
    monster "prontera", 155, 150, "Weak Poring", 1002, 1;
    .@mob_id = $@mobid[0];
    mes "Poring summoned! GID: " + .@mob_id;
    getunitdata .@mob_id, .@data;
    mes "Original HP: " + .@data[UMOB_HP];
    mes "Original ATK: " + .@data[UMOB_ATKMIN] + "-" + .@data[UMOB_ATKMAX];
    next;
    setunitdata .@mob_id, UMOB_MAXHP, 5000;
    setunitdata .@mob_id, UMOB_HP, 5000;
    setunitdata .@mob_id, UMOB_ATKMIN, 100;
    setunitdata .@mob_id, UMOB_ATKMAX, 200;
    setunitdata .@mob_id, UMOB_LEVEL, 50;
    mes "Poring upgraded!";
    mes "New HP: 5000";
    mes "New ATK: 100-200";
    mes "New Level: 50";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setunitdata <GID>,<parameter>,<new value>;

*getunitdata <GID>,<arrayname>;
</syntax>

<description>
This is used to get and set special data related to the unit. With getunitdata, the array given will be filled with the current data. In setunitdata, the indexes in the array would be used to set that data on the unit.

Both getunitdata and setunitdata will return -1 if the given GID does not exist.

Note: When adjusting a unit's stat (STR, AGI, etc.), the unit's respective statuses are recalculated (HIT, FLEE, etc.) automatically. Keep in mind that some stats don't affect a unit's status and will have to be directly modified.

Parameters (indexes) for monsters are:
<example_code>
UMOB_SIZE, UMOB_LEVEL, UMOB_HP, UMOB_MAXHP, UMOB_MASTERAID, UMOB_MAPID, UMOB_X, UMOB_Y, 
UMOB_SPEED, UMOB_MODE, UMOB_AI, UMOB_SCOPTION, UMOB_SEX, UMOB_CLASS, UMOB_HAIRSTYLE, 
UMOB_HAIRCOLOR, UMOB_HEADBOTTOM, UMOB_HEADMIDDLE, UMOB_HEADTOP, UMOB_CLOTHCOLOR, 
UMOB_SHIELD, UMOB_WEAPON, UMOB_LOOKDIR, UMOB_CANMOVETICK, UMOB_STR, UMOB_AGI, UMOB_VIT, 
UMOB_INT, UMOB_DEX, UMOB_LUK, UMOB_SLAVECPYMSTRMD, UMOB_DMGIMMUNE, UMOB_ATKRANGE, UMOB_ATKMIN, 
UMOB_ATKMAX, UMOB_MATKMIN, UMOB_MATKMAX, UMOB_DEF, UMOB_MDEF, UMOB_HIT, UMOB_FLEE, UMOB_PDODGE, 
UMOB_CRIT, UMOB_RACE, UMOB_ELETYPE, UMOB_ELELEVEL, UMOB_AMOTION, UMOB_ADELAY, UMOB_DMOTION, 
UMOB_TARGETID, UMOB_ROBE, UMOB_BODY2, UMOB_GROUP_ID, UMOB_IGNORE_CELL_STACK_LIMIT, 
UMOB_RES, UMOB_MRES, UMOB_DAMAGETAKEN
</example_code>
Parameters (indexes) for homunculi are:
<example_code>
UHOM_SIZE, UHOM_LEVEL, UHOM_HP, UHOM_MAXHP, UHOM_SP, UHOM_MAXSP, UHOM_MASTERCID, 
UHOM_MAPID, UHOM_X, UHOM_Y, UHOM_HUNGER, UHOM_INTIMACY, UHOM_SPEED, UHOM_LOOKDIR, 
UHOM_CANMOVETICK, UHOM_STR, UHOM_AGI, UHOM_VIT, UHOM_INT, UHOM_DEX, UHOM_LUK, 
UHOM_DMGIMMUNE, UHOM_ATKRANGE, UHOM_ATKMIN, UHOM_ATKMAX, UHOM_MATKMIN, UHOM_MATKMAX, 
UHOM_DEF, UHOM_MDEF, UHOM_HIT, UHOM_FLEE, UHOM_PDODGE, UHOM_CRIT, UHOM_RACE, 
UHOM_ELETYPE, UHOM_ELELEVEL, UHOM_AMOTION, UHOM_ADELAY, UHOM_DMOTION, 
UHOM_TARGETID, UHOM_GROUP_ID
</example_code>
Parameters (indexes) for pets are:
<example_code>
UPET_SIZE, UPET_LEVEL, UPET_HP, UPET_MAXHP, UPET_MASTERAID, UPET_MAPID, UPET_X, 
UPET_Y, UPET_HUNGER, UPET_INTIMACY, UPET_SPEED, UPET_LOOKDIR, UPET_CANMOVETICK, 
UPET_STR, UPET_AGI, UPET_VIT, UPET_INT, UPET_DEX, UPET_LUK, UPET_DMGIMMUNE, 
UPET_ATKRANGE, UPET_ATKMIN, UPET_ATKMAX, UPET_MATKMIN, UPET_MATKMAX, UPET_DEF, 
UPET_MDEF, UPET_HIT, UPET_FLEE, UPET_PDODGE, UPET_CRIT, UPET_RACE, UPET_ELETYPE, 
UPET_ELELEVEL, UPET_AMOTION, UPET_ADELAY, UPET_DMOTION, UPET_GROUP_ID
</example_code>
Parameters (indexes) for mercenaries are:
<example_code>
UMER_SIZE, UMER_HP, UMER_MAXHP, UMER_MASTERCID, UMER_MAPID, UMER_X, UMER_Y, 
UMER_KILLCOUNT, UMER_LIFETIME, UMER_SPEED, UMER_LOOKDIR, UMER_CANMOVETICK, 
UMER_STR, UMER_AGI, UMER_VIT, UMER_INT, UMER_DEX, UMER_LUK, UMER_DMGIMMUNE, 
UMER_ATKRANGE, UMER_ATKMIN, UMER_ATKMAX, UMER_MATKMIN, UMER_MATKMAX, UMER_DEF, 
UMER_MDEF, UMER_HIT, UMER_FLEE, UMER_PDODGE, UMER_CRIT, UMER_RACE, UMER_ELETYPE, 
UMER_ELELEVEL, UMER_AMOTION, UMER_ADELAY, UMER_DMOTION, UMER_TARGETID, UMER_GROUP_ID
</example_code>
Parameters (indexes) for elementals are:
<example_code>
UELE_SIZE, UELE_HP, UELE_MAXHP, UELE_SP, UELE_MAXSP, UELE_MASTERCID, UELE_MAPID, 
UELE_X, UELE_Y, UELE_LIFETIME, UELE_MODE, UELE_SPEED, UELE_LOOKDIR, UELE_CANMOVETICK, 
UELE_STR, UELE_AGI, UELE_VIT, UELE_INT, UELE_DEX, UELE_LUK, UELE_DMGIMMUNE, 
UELE_ATKRANGE, UELE_ATKMIN, UELE_ATKMAX, UELE_MATKMIN, UELE_MATKMAX, UELE_DEF, 
UELE_MDEF, UELE_HIT, UELE_FLEE, UELE_PDODGE, UELE_CRIT, UELE_RACE, UELE_ELETYPE, 
UELE_ELELEVEL, UELE_AMOTION, UELE_ADELAY, UELE_DMOTION, UELE_TARGETID, UELE_GROUP_ID
</example_code>
Parameters (indexes) for NPCs are:
<example_code>
UNPC_LEVEL, UNPC_HP, UNPC_MAXHP, UNPC_MAPID, UNPC_X, UNPC_Y, UNPC_LOOKDIR, UNPC_STR, 
UNPC_AGI, UNPC_VIT, UNPC_INT, UNPC_DEX, UNPC_LUK, UNPC_PLUSALLSTAT, UNPC_DMGIMMUNE, 
UNPC_ATKRANGE, UNPC_ATKMIN, UNPC_ATKMAX, UNPC_MATKMIN, UNPC_MATKMAX, UNPC_DEF, 
UNPC_MDEF, UNPC_HIT, UNPC_FLEE, UNPC_PDODGE, UNPC_CRIT, UNPC_RACE, UNPC_ELETYPE, 
UNPC_ELELEVEL, UNPC_AMOTION, UNPC_ADELAY, UNPC_DMOTION, UNPC_SEX, UNPC_CLASS, 
UNPC_HAIRSTYLE, UNPC_HAIRCOLOR, UNPC_HEADBOTTOM, UNPC_HEADMIDDLE, UNPC_HEADTOP, 
UNPC_CLOTHCOLOR, UNPC_SHIELD, UNPC_WEAPON, UNPC_ROBE, UNPC_BODY2, UNPC_DEADSIT, 
UNPC_GROUP_ID
</example_code>
Notes:
- *_SIZE: small (0); medium (1); large (2)
- *_MAPID: this refers to the map_data index (from src/map/map.cpp), not the mapindex_db index (from src/common/mapindex.cpp). For setunitdata, map name can also be passed in as a valid value instead of map ID.
- *_SPEED: 20 - 1000
- *_MODE: see doc/mob_db_mode_list.txt
- *_LOOKDIR: north (0), northwest (1), west (2), etc.
- *_CANMOVETICK: seconds * 1000 the unit will be unable to move
- *_DMGIMMUNE: unit will be immune to damage (1), or will receive damage (0)
- *_HUNGER: 0 - 100
- *_INTIMACY: 0 - 1000
- *_LIFETIME: seconds * 1000 the unit will be alive for
- *_AMOTION: see doc/mob_db.txt
- *_ADELAY: see doc/mob_db.txt
- *_DMOTION: see doc/mob_db.txt
- *_BODY2: enable (1) the alternate display, or disable (0)
- *_TARGETID: when set to 0, the unit will release the target and stop attacking
- UMOB_AI: none (0); attack (1); marine sphere (2); flora (3); zanzou (4); legion (5); faw (6)
- UMOB_SCOPTION: see the Variables section at the top of this document
- UMOB_SLAVECPYMSTRMD: make the slave copy the master's mode (1), or not (0)
- UNPC_PLUSALLSTAT: same as bAllStats; increases/decreases all stats by given amount
- UNPC_DEADSIT: stand (0), dead (1), sit (2)

<example_code>
// Spawn some Porings and save the Game ID.
// Keep in mind, when the monster script command is used,
// all the spawned monster GIDs are stored in an array called $@mobid[].
monster "prontera", 149, 190, "Poring", 1002, 10;
.GID = $@mobid[9]; // Store and modify the 10th Poring spawned to make him stronger!

// Save the strong Poring's mob data in the .@por_arr variable. (.@por_arr[1] being level, .@por_arr[13] being class, etc.)
// With this data we can have the NPC display or manipulate it how we want. This does not have to be ran before setunitdata.
getunitdata .GID, .@por_arr;

// Set the max HP of the Poring to 1000 (current HP will also get updated to 1000)
setunitdata .GID, UMOB_MAXHP, 1000;
</example_code>
<example_code>
// Complete working example: Unit data modifier
prontera,150,150,4  script  UnitDataModifier    100,{
    mes "[Modifier]";
    mes "I will summon a Poring and make it stronger!";
    next;
    monster "prontera", 155, 150, "Weak Poring", 1002, 1;
    .@mob_id = $@mobid[0];
    mes "Poring summoned! GID: " + .@mob_id;
    getunitdata .@mob_id, .@data;
    mes "Original HP: " + .@data[UMOB_HP];
    mes "Original ATK: " + .@data[UMOB_ATKMIN] + "-" + .@data[UMOB_ATKMAX];
    next;
    setunitdata .@mob_id, UMOB_MAXHP, 5000;
    setunitdata .@mob_id, UMOB_HP, 5000;
    setunitdata .@mob_id, UMOB_ATKMIN, 100;
    setunitdata .@mob_id, UMOB_ATKMAX, 200;
    setunitdata .@mob_id, UMOB_LEVEL, 50;
    mes "Poring upgraded!";
    mes "New HP: 5000";
    mes "New ATK: 100-200";
    mes "New Level: 50";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*geteleminfo <type>{,<char_id>};
</syntax>

<description>
Gets info of the elemental of the attached player or the player by char_id. Other info can be obtained by the getunitdata command.

Valid types are:
<example_code>
ELEMINFO_ID        // Elemental ID (ID unique to elemental unit type)
ELEMINFO_GAMEID    // Elemental Game ID
ELEMINFO_CLASS     // Elemental Class (ID defined in elemental_db.yml)
</example_code>
<example_code>
// Get the attached player's elemental ID
.@elem_id = geteleminfo(ELEMINFO_ID);
if (.@elem_id)
    mes "Your elemental ID is: " + .@elem_id;
else
    mes "You don't have an elemental summoned.";
</example_code>
<example_code>
// Get another player's elemental class
.@elem_class = geteleminfo(ELEMINFO_CLASS, 150001);
.@elem_gameid = geteleminfo(ELEMINFO_GAMEID, 150001);
mes "That player's elemental class: " + .@elem_class;
mes "Game ID: " + .@elem_gameid;
</example_code>
<example_code>
// Complete working example: Elemental info displayer
prontera,150,150,4  script  ElementalChecker    100,{
    mes "[Elemental Checker]";
    .@gameid = geteleminfo(ELEMINFO_GAMEID);
    if (.@gameid) {
        .@class = geteleminfo(ELEMINFO_CLASS);
        mes "You have an elemental summoned!";
        mes "Elemental Class: " + .@class;
        mes "Elemental Game ID: " + .@gameid;
    } else {
        mes "You do not have an elemental summoned.";
    }
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*npcskill <skill id>,<skill lvl>,<stat point>,<NPC level>;

*npcskill "<skill name>",<skill lvl>,<stat point>,<NPC level>;
</syntax>

<description>
This command causes the attached NPC object to cast a skill on the attached player. The skill will have no cast time or cooldown. The player must be within the default skill range or the command will fail silently.

The stat point parameter temporarily sets all NPC stats to the given value, and NPC level is the temporary level of the NPC (used in some skills). Neither value can be greater than the max level defined in config, and the command will not work properly if the NPC has a mob sprite.

Before using skills, NPCs must have basic stats applied to them depending on the skill being used: UNPC_ATKMIN, UNPC_ATKMAX, UNPC_MATKMIN, UNPC_MATKMAX, UNPC_STR, UNPC_AGI, UNPC_VIT, UNPC_INT, UNPC_DEX, UNPC_LUK. See setunitdata for more information on usage.

<example_code>
// Casts Level 10 Heal on the attached player, calculated with all stats 99 and base level 60
npcskill "AL_HEAL", 10, 99, 60;
</example_code>
<example_code>
// Casts Level 5 Blessing with all stats 80 and base level 50
npcskill 34, 5, 80, 50;
</example_code>
<example_code>
// Complete working example: Healing NPC
prontera,150,150,4  script  HealingNPC  100,{
    mes "[Healer]";
    mes "I will heal you using NPC skill!";
    next;
    // Set NPC stats first
    setunitdata getnpcid(0), UNPC_INT, 99;
    setunitdata getnpcid(0), UNPC_LEVEL, 60;
    npcskill "AL_HEAL", 10, 99, 60;
    mes "You have been healed!";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*day;

*night;
</syntax>

<description>
These two commands will switch the entire server between day and night mode respectively. If your server is set to cycle between day and night by configuration, it will eventually return to that cycle.

<example_code>
// Example day/night cycle script
-   script  DayNight    -1,{
OnClock0600:
    day;
    end;
OnInit:
    // setting correct mode upon server start-up
    if (gettime(DT_HOUR) >= 6 && gettime(DT_HOUR) < 18) end;
OnClock1800:
    night;
    end;
}
</example_code>
<example_code>
// Day/night cycle with announcements
-   script  DayNightAnnounce    -1,{
OnClock0600:
    day;
    announce "Good morning! The sun rises over the land!", bc_all, 0xFFFF00;
    end;
OnClock1800:
    night;
    announce "Night falls. Be cautious of monsters!", bc_all, 0x0000FF;
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*night;

*day;
</syntax>

<description>
These two commands will switch the entire server between day and night mode respectively. If your server is set to cycle between day and night by configuration, it will eventually return to that cycle.

<example_code>
// Example day/night cycle script
-   script  DayNight    -1,{
OnClock0600:
    day;
    end;
OnInit:
    // setting correct mode upon server start-up
    if (gettime(DT_HOUR) >= 6 && gettime(DT_HOUR) < 18) end;
OnClock1800:
    night;
    end;
}
</example_code>
<example_code>
// Day/night cycle with announcements
-   script  DayNightAnnounce    -1,{
OnClock0600:
    day;
    announce "Good morning! The sun rises over the land!", bc_all, 0xFFFF00;
    end;
OnClock1800:
    night;
    announce "Night falls. Be cautious of monsters!", bc_all, 0x0000FF;
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*defpattern <set number>,"<regular expression pattern>","<event label>";

*activatepset <set number>;

*deactivatepset <set number>;

*deletepset <set number>;
</syntax>

<description>
This set of commands is only available if the server is compiled with a regular expressions library enabled. Default compilation and most binary distributions are not, which is probably bad, since these, while complex to use, are quite fascinating.

They will make the NPC object listen for text spoken publicly by players and match it against regular expression patterns, then trigger labels associated with these regular expression patterns.

Patterns are organized into sets, which are referred to by a set number. You can have multiple sets of patterns, and multiple patterns may be active at once. Numbers for pattern sets start at 1.

defpattern will associate a given regular expression pattern with an event label. This event will be triggered whenever something a player says is matched by this regular expression pattern, if the pattern is currently active.

activatepset will make the specified pattern set active. An active pattern will enable triggering labels defined with defpattern, which will not happen by default.

deactivatepset will deactivate a specified pattern set. Giving -1 as a pattern set number in this case will deactivate all pattern sets defined.

deletepset will delete a pattern set from memory, so you can create a new pattern set in its place.

Using regular expressions is high wizardry. But with this high wizardry comes unparalleled power of text manipulation. For an explanation of what a regular expression pattern is, see:
http://www.regular-expressions.info/
http://www.weitz.de/regex-coach/

For an example of this in use, see doc/sample/npc_test_pcre.txt

With this you could, for example, automatically punish players for asking for Zeny in public places, or alternatively, automatically give them Zeny instead if they want it so much.

<example_code>
// Simple pattern matching example
prontera,150,150,4  script  ChatListener    100,{
    OnInit:
        defpattern 1, "([Hh]elp)", "::OnHelp";
        defpattern 1, "([Hh]i|[Hh]ello)", "::OnGreet";
        activatepset 1;
        end;

OnHelp:
    npctalk "I heard you need help! How can I assist you?";
    end;

OnGreet:
    npctalk "Hello there, " + strcharinfo(0) + "! Welcome!";
    end;
}
</example_code>
<example_code>
// Punishment for asking zeny
prontera,150,150,4  script  AntiBegger  100,{
    OnInit:
        defpattern 1, "(.*)(zeny|money|gold)(.*)", "::OnBeg";
        activatepset 1;
        end;

OnBeg:
    npctalk "Begging is not allowed here, " + strcharinfo(0) + "!";
    atcommand "@nuke " + strcharinfo(0);
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*activatepset <set number>;

*deactivatepset <set number>;
    
*deletepset <set number>;

*defpattern <set number>,"<regular expression pattern>","<event label>";
</syntax>

<description>
This set of commands is only available if the server is compiled with a regular expressions library enabled. Default compilation and most binary distributions are not, which is probably bad, since these, while complex to use, are quite fascinating.

They will make the NPC object listen for text spoken publicly by players and match it against regular expression patterns, then trigger labels associated with these regular expression patterns.

Patterns are organized into sets, which are referred to by a set number. You can have multiple sets of patterns, and multiple patterns may be active at once. Numbers for pattern sets start at 1.

defpattern will associate a given regular expression pattern with an event label. This event will be triggered whenever something a player says is matched by this regular expression pattern, if the pattern is currently active.

activatepset will make the specified pattern set active. An active pattern will enable triggering labels defined with defpattern, which will not happen by default.

deactivatepset will deactivate a specified pattern set. Giving -1 as a pattern set number in this case will deactivate all pattern sets defined.

deletepset will delete a pattern set from memory, so you can create a new pattern set in its place.

Using regular expressions is high wizardry. But with this high wizardry comes unparalleled power of text manipulation. For an explanation of what a regular expression pattern is, see:
http://www.regular-expressions.info/
http://www.weitz.de/regex-coach/

For an example of this in use, see doc/sample/npc_test_pcre.txt

With this you could, for example, automatically punish players for asking for Zeny in public places, or alternatively, automatically give them Zeny instead if they want it so much.

<example_code>
// Simple pattern matching example
prontera,150,150,4  script  ChatListener    100,{
    OnInit:
        defpattern 1, "([Hh]elp)", "::OnHelp";
        defpattern 1, "([Hh]i|[Hh]ello)", "::OnGreet";
        activatepset 1;
        end;

OnHelp:
    npctalk "I heard you need help! How can I assist you?";
    end;

OnGreet:
    npctalk "Hello there, " + strcharinfo(0) + "! Welcome!";
    end;
}
</example_code>
<example_code>
// Punishment for asking zeny
prontera,150,150,4  script  AntiBegger  100,{
    OnInit:
        defpattern 1, "(.*)(zeny|money|gold)(.*)", "::OnBeg";
        activatepset 1;
        end;

OnBeg:
    npctalk "Begging is not allowed here, " + strcharinfo(0) + "!";
    atcommand "@nuke " + strcharinfo(0);
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*deactivatepset <set number>;
    
*deletepset <set number>;

*defpattern <set number>,"<regular expression pattern>","<event label>";

*activatepset <set number>;
</syntax>

<description>
This set of commands is only available if the server is compiled with a regular expressions library enabled. Default compilation and most binary distributions are not, which is probably bad, since these, while complex to use, are quite fascinating.

They will make the NPC object listen for text spoken publicly by players and match it against regular expression patterns, then trigger labels associated with these regular expression patterns.

Patterns are organized into sets, which are referred to by a set number. You can have multiple sets of patterns, and multiple patterns may be active at once. Numbers for pattern sets start at 1.

defpattern will associate a given regular expression pattern with an event label. This event will be triggered whenever something a player says is matched by this regular expression pattern, if the pattern is currently active.

activatepset will make the specified pattern set active. An active pattern will enable triggering labels defined with defpattern, which will not happen by default.

deactivatepset will deactivate a specified pattern set. Giving -1 as a pattern set number in this case will deactivate all pattern sets defined.

deletepset will delete a pattern set from memory, so you can create a new pattern set in its place.

Using regular expressions is high wizardry. But with this high wizardry comes unparalleled power of text manipulation. For an explanation of what a regular expression pattern is, see:
http://www.regular-expressions.info/
http://www.weitz.de/regex-coach/

For an example of this in use, see doc/sample/npc_test_pcre.txt

With this you could, for example, automatically punish players for asking for Zeny in public places, or alternatively, automatically give them Zeny instead if they want it so much.

<example_code>
// Simple pattern matching example
prontera,150,150,4  script  ChatListener    100,{
    OnInit:
        defpattern 1, "([Hh]elp)", "::OnHelp";
        defpattern 1, "([Hh]i|[Hh]ello)", "::OnGreet";
        activatepset 1;
        end;

OnHelp:
    npctalk "I heard you need help! How can I assist you?";
    end;

OnGreet:
    npctalk "Hello there, " + strcharinfo(0) + "! Welcome!";
    end;
}
</example_code>
<example_code>
// Punishment for asking zeny
prontera,150,150,4  script  AntiBegger  100,{
    OnInit:
        defpattern 1, "(.*)(zeny|money|gold)(.*)", "::OnBeg";
        activatepset 1;
        end;

OnBeg:
    npctalk "Begging is not allowed here, " + strcharinfo(0) + "!";
    atcommand "@nuke " + strcharinfo(0);
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*deletepset <set number>;

*defpattern <set number>,"<regular expression pattern>","<event label>";

*activatepset <set number>;

*deactivatepset <set number>;
</syntax>

<description>
This set of commands is only available if the server is compiled with a regular expressions library enabled. Default compilation and most binary distributions are not, which is probably bad, since these, while complex to use, are quite fascinating.

They will make the NPC object listen for text spoken publicly by players and match it against regular expression patterns, then trigger labels associated with these regular expression patterns.

Patterns are organized into sets, which are referred to by a set number. You can have multiple sets of patterns, and multiple patterns may be active at once. Numbers for pattern sets start at 1.

defpattern will associate a given regular expression pattern with an event label. This event will be triggered whenever something a player says is matched by this regular expression pattern, if the pattern is currently active.

activatepset will make the specified pattern set active. An active pattern will enable triggering labels defined with defpattern, which will not happen by default.

deactivatepset will deactivate a specified pattern set. Giving -1 as a pattern set number in this case will deactivate all pattern sets defined.

deletepset will delete a pattern set from memory, so you can create a new pattern set in its place.

Using regular expressions is high wizardry. But with this high wizardry comes unparalleled power of text manipulation. For an explanation of what a regular expression pattern is, see:
http://www.regular-expressions.info/
http://www.weitz.de/regex-coach/

For an example of this in use, see doc/sample/npc_test_pcre.txt

With this you could, for example, automatically punish players for asking for Zeny in public places, or alternatively, automatically give them Zeny instead if they want it so much.

<example_code>
// Simple pattern matching example
prontera,150,150,4  script  ChatListener    100,{
    OnInit:
        defpattern 1, "([Hh]elp)", "::OnHelp";
        defpattern 1, "([Hh]i|[Hh]ello)", "::OnGreet";
        activatepset 1;
        end;

OnHelp:
    npctalk "I heard you need help! How can I assist you?";
    end;

OnGreet:
    npctalk "Hello there, " + strcharinfo(0) + "! Welcome!";
    end;
}
</example_code>
<example_code>
// Punishment for asking zeny
prontera,150,150,4  script  AntiBegger  100,{
    OnInit:
        defpattern 1, "(.*)(zeny|money|gold)(.*)", "::OnBeg";
        activatepset 1;
        end;

OnBeg:
    npctalk "Begging is not allowed here, " + strcharinfo(0) + "!";
    atcommand "@nuke " + strcharinfo(0);
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*pow(<number>,<power>)
</syntax>

<description>
Returns the result of the calculation, raising <number> to the power of <power>.

<example_code>
.@i = pow(2, 3); // .@i will be 8
</example_code>
<example_code>
// Calculate 5^4 = 625
.@result = pow(5, 4);
mes "5 to the power of 4 is: " + .@result;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sqrt(<number>)
</syntax>

<description>
Returns the square root of a number.

<example_code>
.@i = sqrt(25); // .@i will be 5
</example_code>
<example_code>
// Calculate hypotenuse of a right triangle
.@a = 3;
.@b = 4;
.@c = sqrt(pow(.@a, 2) + pow(.@b, 2));
mes "Hypotenuse: " + .@c; // Result: 5
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*distance(<x0>,<y0>,<x1>,<y1>)
</syntax>

<description>
Returns the distance between two points (x0, y0) and (x1, y1).

<example_code>
.@i = distance(100, 200, 101, 202);
</example_code>
<example_code>
// Calculates distance between player and NPC
-   script  DistanceChecker -1,{

    mes "[Distance Checker]";

    // Retrieve player coordinates
    getmapxy(.@map$, .@x, .@y, BL_PC);

    // Calculate distance to NPC (assuming NPC is at 150, 100)
    .@dist = distance(.@x, .@y, 150, 100);

    mes "You are " + .@dist + " cells away from the NPC.";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*min(<number or array>{,<number or array>,...})

*minimum(<number or array>{,<number or array>,...})

*max(<number or array>{,<number or array>,...})

*maximum(<number or array>{,<number or array>,...})
</syntax>

<description>
Returns the smallest (min/minimum) or largest (max/maximum) from the set of given parameters. These parameters have to be either numbers or number arrays.

<example_code>
.@minimum = min(1, -6, -2, 8, 2); // .@minimum will be equal to -6
.@maximum = max(0, 5, 10, 4); // .@maximum will be equal to 10
.@level = min(BaseLevel, 70); // .@level will be the character's base level, capped to 70
</example_code>
<example_code>
setarray .@testarray, 4, 5, 12, 6, 7, 3, 8, 9, 10;

.@minimum = min(.@testarray); // .@minimum will be equal to 3
.@maximum = max(.@testarray); // .@maximum will be equal to 12

.@minimum = min(-6, 1, 2, 3, .@testarray); // .@minimum will be equal to -6
.@maximum = max(-6, 1, 2, 3, .@testarray); // .@maximum will be equal to 12
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*minimum(<number or array>{,<number or array>,...})

*max(<number or array>{,<number or array>,...})
    
*maximum(<number or array>{,<number or array>,...})

*min(<number or array>{,<number or array>,...})
</syntax>

<description>
Returns the smallest (min/minimum) or largest (max/maximum) from the set of given parameters. These parameters have to be either numbers or number arrays.

<example_code>
.@minimum = min(1, -6, -2, 8, 2); // .@minimum will be equal to -6
.@maximum = max(0, 5, 10, 4); // .@maximum will be equal to 10
.@level = min(BaseLevel, 70); // .@level will be the character's base level, capped to 70
</example_code>
<example_code>
setarray .@testarray, 4, 5, 12, 6, 7, 3, 8, 9, 10;

.@minimum = min(.@testarray); // .@minimum will be equal to 3
.@maximum = max(.@testarray); // .@maximum will be equal to 12

.@minimum = min(-6, 1, 2, 3, .@testarray); // .@minimum will be equal to -6
.@maximum = max(-6, 1, 2, 3, .@testarray); // .@maximum will be equal to 12
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*max(<number or array>{,<number or array>,...})
    
*maximum(<number or array>{,<number or array>,...})

*min(<number or array>{,<number or array>,...})

*minimum(<number or array>{,<number or array>,...})
</syntax>

<description>
Returns the smallest (min/minimum) or largest (max/maximum) from the set of given parameters. These parameters have to be either numbers or number arrays.

<example_code>
.@minimum = min(1, -6, -2, 8, 2); // .@minimum will be equal to -6
.@maximum = max(0, 5, 10, 4); // .@maximum will be equal to 10
.@level = min(BaseLevel, 70); // .@level will be the character's base level, capped to 70
</example_code>
<example_code>
setarray .@testarray, 4, 5, 12, 6, 7, 3, 8, 9, 10;

.@minimum = min(.@testarray); // .@minimum will be equal to 3
.@maximum = max(.@testarray); // .@maximum will be equal to 12

.@minimum = min(-6, 1, 2, 3, .@testarray); // .@minimum will be equal to -6
.@maximum = max(-6, 1, 2, 3, .@testarray); // .@maximum will be equal to 12
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*maximum(<number or array>{,<number or array>,...})

*min(<number or array>{,<number or array>,...})

*minimum(<number or array>{,<number or array>,...})

*max(<number or array>{,<number or array>,...})
</syntax>

<description>
Returns the smallest (min/minimum) or largest (max/maximum) from the set of given parameters. These parameters have to be either numbers or number arrays.

<example_code>
.@minimum = min(1, -6, -2, 8, 2); // .@minimum will be equal to -6
.@maximum = max(0, 5, 10, 4); // .@maximum will be equal to 10
.@level = min(BaseLevel, 70); // .@level will be the character's base level, capped to 70
</example_code>
<example_code>
setarray .@testarray, 4, 5, 12, 6, 7, 3, 8, 9, 10;

.@minimum = min(.@testarray); // .@minimum will be equal to 3
.@maximum = max(.@testarray); // .@maximum will be equal to 12

.@minimum = min(-6, 1, 2, 3, .@testarray); // .@minimum will be equal to -6
.@maximum = max(-6, 1, 2, 3, .@testarray); // .@maximum will be equal to 12
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*cap_value(<number>, <min>, <max>)
</syntax>

<description>
Returns the number but capped between <min> and <max>.

<example_code>
// capped between 0 ~ 100
.@value = cap_value(10, 0, 100);   // .@value will be equal to 10
.@value = cap_value(1000, 0, 100); // .@value will be equal to 100
.@value = cap_value(-10, 3, 100);  // .@value will be equal to 3
</example_code>
<example_code>
// Limit player's level to 99
.@level = cap_value(BaseLevel, 1, 99);
mes "Your level (capped to 99) is: " + .@level;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*round(<number>,<precision>);
</syntax>

<description>
Rounds a number to the specified precision. The precision determines how many decimal places to round to. Positive precision rounds to decimal places, negative precision rounds to powers of ten.

<example_code>
// Round to 2 decimal places
.@value = round(3.14159, 2); // .@value will be 3.14

// Round to nearest integer (precision 0)
.@value = round(3.6, 0); // .@value will be 4

// Round to nearest ten (precision -1)
.@value = round(123, -1); // .@value will be 120

// Round to nearest hundred (precision -2)
.@value = round(678, -2); // .@value will be 700
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*ceil(<number>,<precision>);
</syntax>

<description>
Rounds a number up to the specified precision (ceiling rounding). The precision determines how many decimal places to round to. Positive precision rounds to decimal places, negative precision rounds to powers of ten.

<example_code>
// Round up to 2 decimal places
.@value = ceil(3.14159, 2); // .@value will be 3.15

// Round up to nearest integer (precision 0)
.@value = ceil(3.1, 0); // .@value will be 4

// Round up to nearest ten (precision -1)
.@value = ceil(123, -1); // .@value will be 130

// Round up to nearest hundred (precision -2)
.@value = ceil(678, -2); // .@value will be 700
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*floor(<number>,<precision>);
</syntax>

<description>
Rounds a number down to the specified precision (floor rounding). The precision determines how many decimal places to round to. Positive precision rounds to decimal places, negative precision rounds to powers of ten.

<example_code>
// Round down to 2 decimal places
.@value = floor(3.14159, 2); // .@value will be 3.14

// Round down to nearest integer (precision 0)
.@value = floor(3.9, 0); // .@value will be 3

// Round down to nearest ten (precision -1)
.@value = floor(123, -1); // .@value will be 120

// Round down to nearest hundred (precision -2)
.@value = floor(678, -2); // .@value will be 600
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*md5("<string>")
</syntax>

<description>
Returns the MD5 checksum of a number or string.

<example_code>
mes md5(12345);
mes md5("12345");   // Will both display 827ccb0eea8a706c4c34a16891f84e7b
mes md5("qwerty");  // Will display d8578edf8458ce06fbc5bb76a58c5ca4
</example_code>
<example_code>
// Using MD5 for password hashing
.@password$ = "mypassword";
.@hash$ = md5(.@password$);
mes "Password hash: " + .@hash$;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*query_sql("your MySQL query"{, <array variable>{, <array variable>{, ...}}});
</syntax>

<description>
This command executes an SQL query on the main MySQL database server. It returns the number of rows affected/returned.

If used with array variables, the rows will be stored in those arrays. The arrays are filled with the selected columns sequentially. For example, if you select three columns, the first array will contain the first column of each row, the second array will contain the second column of each row, and so on.

The command also supports parameters. The following data types are supported:
- Integer
- Float
- String (will be escaped automatically)

Binary data is not supported.

Note: This command is only available in SQL server type. It will fail in TXT server type. For security reasons, never use variables that come from the user directly in a query without using parameters! Always use parameters when constructing SQL queries with user input. Also note that this will bypass the SQL connection that the server uses, not necessarily the main server, but this one will only work when sql_connection is in the module.

See also: escape_sql.

<example_code>
.@nb = query_sql("SELECT name, party_name FROM \`char\` WHERE \`char_id\` = 150000", .@name$, .@party$);
if (.@nb)
    mes "Char name: " + .@name$ + " - Party name: " + .@party$;
</example_code>
<example_code>
// Example with parameters
query_sql("SELECT name, party_name FROM \`char\` WHERE \`char_id\` = ? AND sex = ?", .@char_id, .@sex$);
</example_code>
<example_code>
// Complete working example: Fetch player's zeny from SQL
prontera,150,150,4  script  SQLChecker  100,{
    mes "[SQL Checker]";
    .@char_id = getcharid(0);
    .@nb = query_sql("SELECT zeny FROM \`char\` WHERE \`char_id\` = ?", .@zeny);
    if (.@nb)
        mes "Your zeny from SQL: " + .@zeny;
    else
        mes "Failed to fetch data.";
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*query_logsql("your MySQL query"{, <array variable>{, <array variable>{, ...}}});
</syntax>

<description>
This command executes an SQL query on the log MySQL database server. It returns the number of rows affected/returned. This command is identical in function to query_sql, but operates on the logs database connection instead of the main database.

If used with array variables, the rows will be stored in those arrays. The arrays are filled with the selected columns sequentially.

The command also supports parameters. The following data types are supported:
- Integer
- Float
- String (will be escaped automatically)

Binary data is not supported.

Note: This command is only available in SQL server type. It will fail in TXT server type. For security reasons, never use variables that come from the user directly in a query without using parameters! Always use parameters when constructing SQL queries with user input.

<example_code>
// Insert a log entry
query_logsql("INSERT INTO \`npclog\` (\`time\`, \`account_id\`, \`char_id\`, \`log\`) VALUES (NOW(), ?, ?, ?)", getcharid(3), getcharid(0), "Player interacted with quest NPC");
</example_code>
<example_code>
// Select from log database
.@nb = query_logsql("SELECT \`log\` FROM \`npclog\` WHERE \`char_id\` = ? ORDER BY \`time\` DESC LIMIT 10", .@logs$);
for (.@i = 0; .@i < .@nb; .@i++)
    mes "Log " + (.@i + 1) + ": " + .@logs$[.@i];
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*escape_sql(<value>)
</syntax>

<description>
Converts the value to a string and escapes special characters so that it is safe to use in query_sql(). Returns the escaped form of the given value.

<example_code>
.@name$ = "John's Laptop";
.@esc_str$ = escape_sql(.@name$); // Escaped string: John\'s Laptop
</example_code>
<example_code>
// Safe query building
.@player_name$ = escape_sql(strcharinfo(0));
query_sql("UPDATE \`char\` SET zeny = zeny + 1000 WHERE name = '" + .@player_name$ + "'");
</example_code>
<example_code>
// Using with parameters (recommended way)
query_sql("UPDATE \`char\` SET zeny = zeny + 1000 WHERE name = ?", .@player_name$);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setiteminfo(<item id>,<type>,<value>)

*setiteminfo(<aegis item name>,<type>,<value>)
</syntax>

<description>
This function will set some value of an item. Returns the new value on success, or -1 on failure (item_id not found or invalid type).

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
ITEMINFO_ARMORLEVEL     (19)   // armor LV
</example_code>
<example_code>
setiteminfo 7049, ITEMINFO_WEIGHT, 9990; // Stone now weighs 999.0
</example_code>
<example_code>
// Set buy price of Apple to 1000 zeny
setiteminfo 512, ITEMINFO_BUY, 1000;

// Set defense of Padded Armor to 10
setiteminfo "Padded Armor", ITEMINFO_DEFENSE, 10;

// Set weapon level of Sword to 3
setiteminfo 1201, ITEMINFO_WEAPONLEVEL, 3;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setitemscript(<item id>,<"{ new item script }">{,<type>});
</syntax>

<description>
Sets a new script bonus to the item. Very useful for game events. You can remove an item's item script by leaving the item script argument empty. Returns 1 on success, or 0 on failure (item_id not found or new item script is invalid).

Type can optionally be used to indicate which script to set (default is 0):
0 - Script
1 - EquipScript
2 - UnEquipScript

<example_code>
setitemscript 2637, "{ if (isequipped(2236) == 0) end; if (getskilllv(26)) { skill 40, 1; } else { skill 26, 1 + isequipped(2636); } }";
</example_code>
<example_code>
// Remove the script from the item
setitemscript 2637, "";
</example_code>
<example_code>
// Set an equip script for Apple (ID 512)
setitemscript 512, "{ bonus bStr, 5; }", 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*atoi("<string>")

*axtoi("<string>")

*strtol("<string>", <base>)
</syntax>

<description>
These commands are used to convert strings to numbers. atoi will interpret the given string as a decimal number (base 10), while axtoi interprets strings as hexadecimal numbers (base 16). strtol lets the user specify a base (valid range is between 2 and 36 inclusive, or the special value 0, which means auto-detection).

The atoi and strtol functions conform to the C functions with the same names, and axtoi is the same as strtol with a base of 16. Results are clamped to signed 32-bit int range (INT_MIN ~ INT_MAX).

<example_code>
.@var = atoi("11");        // Sets .@var to 11
.@var = axtoi("FF");       // Sets .@var to 255
mes axtoi("11");           // Displays 17 (1 = 1, 10 = 16)
.@var = strtol("11", 10);  // Sets .@var to 11 (11 base 10)
.@var = strtol("11", 16);  // Sets .@var to 17 (11 base 16)
.@var = strtol("11", 0);   // Sets .@var to 11 (11 base 10, auto-detected)
.@var = strtol("0x11", 0); // Sets .@var to 17 (11 base 16, auto-detected because of the "0x" prefix)
.@var = strtol("011", 0);  // Sets .@var to 9 (11 base 8, auto-detected because of the "0" prefix)
.@var = strtol("11", 2);   // Sets .@var to 3 (binary 11)
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*axtoi("<string>")

*strtol("<string>", <base>)

*atoi("<string>")
</syntax>

<description>
These commands are used to convert strings to numbers. atoi will interpret the given string as a decimal number (base 10), while axtoi interprets strings as hexadecimal numbers (base 16). strtol lets the user specify a base (valid range is between 2 and 36 inclusive, or the special value 0, which means auto-detection).

The atoi and strtol functions conform to the C functions with the same names, and axtoi is the same as strtol with a base of 16. Results are clamped to signed 32-bit int range (INT_MIN ~ INT_MAX).

<example_code>
.@var = atoi("11");        // Sets .@var to 11
.@var = axtoi("FF");       // Sets .@var to 255
mes axtoi("11");           // Displays 17 (1 = 1, 10 = 16)
.@var = strtol("11", 10);  // Sets .@var to 11 (11 base 10)
.@var = strtol("11", 16);  // Sets .@var to 17 (11 base 16)
.@var = strtol("11", 0);   // Sets .@var to 11 (11 base 10, auto-detected)
.@var = strtol("0x11", 0); // Sets .@var to 17 (11 base 16, auto-detected because of the "0x" prefix)
.@var = strtol("011", 0);  // Sets .@var to 9 (11 base 8, auto-detected because of the "0" prefix)
.@var = strtol("11", 2);   // Sets .@var to 3 (binary 11)
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*strtol("<string>", <base>)

*atoi("<string>")

*axtoi("<string>")
</syntax>

<description>
These commands are used to convert strings to numbers. atoi will interpret the given string as a decimal number (base 10), while axtoi interprets strings as hexadecimal numbers (base 16). strtol lets the user specify a base (valid range is between 2 and 36 inclusive, or the special value 0, which means auto-detection).

The atoi and strtol functions conform to the C functions with the same names, and axtoi is the same as strtol with a base of 16. Results are clamped to signed 32-bit int range (INT_MIN ~ INT_MAX).

<example_code>
.@var = atoi("11");        // Sets .@var to 11
.@var = axtoi("FF");       // Sets .@var to 255
mes axtoi("11");           // Displays 17 (1 = 1, 10 = 16)
.@var = strtol("11", 10);  // Sets .@var to 11 (11 base 10)
.@var = strtol("11", 16);  // Sets .@var to 17 (11 base 16)
.@var = strtol("11", 0);   // Sets .@var to 11 (11 base 10, auto-detected)
.@var = strtol("0x11", 0); // Sets .@var to 17 (11 base 16, auto-detected because of the "0x" prefix)
.@var = strtol("011", 0);  // Sets .@var to 9 (11 base 8, auto-detected because of the "0" prefix)
.@var = strtol("11", 2);   // Sets .@var to 3 (binary 11)
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*compare("<string>","<substring>")
</syntax>

<description>
This command returns 1 if the substring is in the main string, or 0 if it is not. This command is not case sensitive.

<example_code>
// dothis; will be executed ('Bloody Murderer' contains 'Blood')
if (compare("Bloody Murderer", "Blood"))
    dothis;
</example_code>
<example_code>
// dothat; will not be executed ('Blood Butterfly' does not contain 'Bloody')
if (compare("Blood Butterfly", "Bloody"))
    dothat;
</example_code>
<example_code>
// Check if player's name contains a certain substring
if (compare(strcharinfo(0), "GM"))
    mes "Your name contains 'GM'!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*strcmp("<string>","<string>")
</syntax>

<description>
This command compares two strings and returns a value:
1: string 1 > string 2
0: strings are equal
-1: string 1 < string 2

<example_code>
.@result = strcmp("Apple", "Apple");    // .@result = 0 (equal)
.@result = strcmp("Apple", "Banana");   // .@result = -1 (Apple < Banana)
.@result = strcmp("Banana", "Apple");   // .@result = 1 (Banana > Apple)
</example_code>
<example_code>
// Check if two player names are the same
.@name1$ = strcharinfo(0);
.@name2$ = "Daniel Jackson";
if (strcmp(.@name1$, .@name2$) == 0)
    mes "Your name matches Daniel Jackson!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getstrlen("<string>")
</syntax>

<description>
This function will return the length of the string given as an argument. It is useful to check if anything input by the player exceeds name length limits and other length limits, and asking them to try to input something else.

<example_code>
// Check if input exceeds 24 characters (name length limit)
input .@input$;
if (getstrlen(.@input$) > 24) {
    mes "Input too long! Please enter 24 characters or less.";
    close;
}
</example_code>
<example_code>
// Display the length of a string
.@name$ = strcharinfo(0);
.@len = getstrlen(.@name$);
mes "Your name has " + .@len + " characters.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*charisalpha("<string>",<position>)
</syntax>

<description>
This function will return 1 if the character at the specified position in the given string is a letter, 0 if it isn't a letter (digit, space, punctuation, etc.). The first letter is at position 0.

<example_code>
.@result = charisalpha("Apple123", 0); // .@result = 1 ('A' is a letter)
.@result = charisalpha("Apple123", 4); // .@result = 1 ('e' is a letter)
.@result = charisalpha("Apple123", 5); // .@result = 0 ('1' is not a letter)
</example_code>
<example_code>
// Validate that a player's input starts with a letter
input .@input$;
if (charisalpha(.@input$, 0))
    mes "Good, your input starts with a letter.";
else
    mes "Please start with a letter.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*charat(<string>,<index>)
</syntax>

<description>
Returns the character at the specified index. If the index is out of range, returns an empty string. The first letter of a string is index 0.

<example_code>
charat("This is a string", 10); // returns "s"
</example_code>
<example_code>
// Extract first character of player's name
.@first_char$ = charat(strcharinfo(0), 0);
mes "Your name starts with: " + .@first_char$;
</example_code>
<example_code>
// Extract last character
.@name$ = strcharinfo(0);
.@last_char$ = charat(.@name$, getstrlen(.@name$) - 1);
mes "Your name ends with: " + .@last_char$;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setchar(<string>,<char>,<index>)
</syntax>

<description>
Returns the original string with the character at the specified index set to the specified character. If the index is out of range, the original string will be returned. Only the first character in the <char> parameter will be used.

<example_code>
setchar("Cat", "B", 0); // returns "Bat"
</example_code>
<example_code>
// Change a specific character in a string
.@str$ = "Hello World";
.@new_str$ = setchar(.@str$, "X", 6); // Changes 'W' to 'X' -> "Hello Xorld"
mes "Original: " + .@str$;
mes "Modified: " + .@new_str$;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*insertchar(<string>,<char>,<index>)
</syntax>

<description>
Returns the original string with the specified character inserted at the specified index. If the index is out of range, the character will be inserted at the end of the string that it is closest to. Only the first character in the <char> parameter will be used.

<example_code>
insertchar("laughter", "s", 0); // returns "slaughter"
</example_code>
<example_code>
// Insert '!' at the end of a string
.@str$ = "Hello";
.@new_str$ = insertchar(.@str$, "!", 10); // index out of range -> appends "Hello!"
mes .@new_str$;
</example_code>
<example_code>
// Insert 'X' in the middle
.@str$ = "ABCD";
.@new_str$ = insertchar(.@str$, "X", 2); // returns "ABXCD"
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*delchar(<string>,<index>)
</syntax>

<description>
Returns the original string with the character at the specified index removed. If the index is out of range, the original string will be returned.

<example_code>
delchar("Diet", 3); // returns "Die"
</example_code>
<example_code>
// Remove first character
.@str$ = "Hello";
.@new_str$ = delchar(.@str$, 0); // returns "ello"
mes "Original: " + .@str$;
mes "After removing first char: " + .@new_str$;
</example_code>
<example_code>
// Remove last character
.@str$ = "World";
.@new_str$ = delchar(.@str$, getstrlen(.@str$) - 1); // returns "Worl"
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*strtoupper(<string>)

*strtolower(<string>)
</syntax>

<description>
Returns the specified string in its uppercase (strtoupper) or lowercase (strtolower) form. All non-alpha characters will be preserved.

<example_code>
strtoupper("The duck is blue!!"); // returns "THE DUCK IS BLUE!!"
</example_code>
<example_code>
strtolower("HELLO WORLD!!!"); // returns "hello world!!!"
</example_code>
<example_code>
// Case-insensitive comparison
.@input$ = input("Enter YES to continue: ");
if (strtoupper(.@input$) == "YES")
    mes "You entered YES!";
else
    mes "You did not enter YES.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*strtolower(<string>)

*strtoupper(<string>)
</syntax>

<description>
Returns the specified string in its uppercase (strtoupper) or lowercase (strtolower) form. All non-alpha characters will be preserved.

<example_code>
strtoupper("The duck is blue!!"); // returns "THE DUCK IS BLUE!!"
</example_code>
<example_code>
strtolower("HELLO WORLD!!!"); // returns "hello world!!!"
</example_code>
<example_code>
// Case-insensitive comparison
.@input$ = input("Enter YES to continue: ");
if (strtoupper(.@input$) == "YES")
    mes "You entered YES!";
else
    mes "You did not enter YES.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*charisupper(<string>,<index>)

*charislower(<string>,<index>)
</syntax>

<description>
Returns 1 if the character at the specified index of the specified string is uppercase (charisupper) or lowercase (charislower). Otherwise, returns 0. Characters not in the alphabet will return 0.

<example_code>
charisupper("rAthena", 1); // returns 1 ('A' is uppercase)
charislower("rAthena", 0); // returns 1 ('r' is lowercase)
charisupper("rAthena", 0); // returns 0 ('r' is not uppercase)
charislower("rAthena", 1); // returns 0 ('A' is not lowercase)
</example_code>
<example_code>
// Check if a password contains an uppercase letter
.@pass$ = input("Enter password: ");
.@has_upper = 0;
for (.@i = 0; .@i < getstrlen(.@pass$); .@i++) {
    if (charisupper(.@pass$, .@i)) {
        .@has_upper = 1;
        break;
    }
}
if (.@has_upper)
    mes "Password contains an uppercase letter.";
else
    mes "Password must contain at least one uppercase letter.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*substr(<string>,<start_index>,<end_index>)
</syntax>

<description>
Returns the sub-string of the specified string inclusively between the set indexes. If indexes are out of range, or the start index is after the end index, an empty string will be returned.

<example_code>
substr("foobar", 3, 5); // returns "bar"
</example_code>
<example_code>
// Extract first 3 characters
.@str$ = "Hello World";
.@first3$ = substr(.@str$, 0, 2); // returns "Hel"
mes "First 3 characters: " + .@first3$;
</example_code>
<example_code>
// Extract last 3 characters
.@str$ = "Hello World";
.@len = getstrlen(.@str$);
.@last3$ = substr(.@str$, .@len - 3, .@len - 1); // returns "rld"
mes "Last 3 characters: " + .@last3$;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*explode(<dest_array>,<string>,<delimiter>)
</syntax>

<description>
Breaks a string up into substrings based on the specified delimiter. Substrings will be stored within the specified string array. Only the first character of the delimiter parameter will be used. If an empty string is passed as a delimiter, the string will be placed in the array in its original form.

<example_code>
explode(.@my_array$, "Explode:Test:1965:red:PIE", ":");
// .@my_array$ contents will be:
// .@my_array$[0]: "Explode"
// .@my_array$[1]: "Test"
// .@my_array$[2]: "1965"
// .@my_array$[3]: "red"
// .@my_array$[4]: "PIE"
</example_code>
<example_code>
// Parse comma-separated values
.@input$ = "apple,banana,orange,grape";
explode(.@fruit$, .@input$, ",");
.@count = getarraysize(.@fruit$);
mes "You entered " + .@count + " fruits:";
for (.@i = 0; .@i < .@count; .@i++)
    mes (.@i + 1) + ": " + .@fruit$[.@i];
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*implode(<string_array>{,<glue>})
</syntax>

<description>
Combines all substrings within the specified string array into a single string. If the glue parameter is specified, it will be inserted between each substring.

<example_code>
setarray .@my_array$[0], "This", "is", "a", "test";
implode(.@my_array$, " "); // returns "This is a test"
</example_code>
<example_code>
// Implode with different glue
setarray .@colors$[0], "red", "green", "blue";
.@result$ = implode(.@colors$, ", "); // returns "red, green, blue"
mes "Colors: " + .@result$;
</example_code>
<example_code>
// Implode without glue
setarray .@letters$[0], "a", "b", "c";
.@result$ = implode(.@letters$); // returns "abc"
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sprintf(<format>[,<param>[,<param>[,...]]])
</syntax>

<description>
C-style sprintf. The resulting string is returned similarly to PHP. All C format specifiers are supported except %n. More info: sprintf at www.cplusplus.com. The number of parameters is only limited by rAthena's script engine.

<example_code>
.@format$ = "The %s contains %d monkeys";
dispbottom(sprintf(.@format$, "zoo", 5));        // prints "The zoo contains 5 monkeys"
dispbottom(sprintf(.@format$, "barrel", 82));    // prints "The barrel contains 82 monkeys"
</example_code>
<example_code>
// Format with multiple specifiers
.@result$ = sprintf("%s has %d zeny and is level %d", strcharinfo(0), Zeny, BaseLevel);
mes .@result$;
</example_code>
<example_code>
// Format with floating point
.@value = 3.14159;
.@result$ = sprintf("Pi is approximately %.2f", .@value); // returns "Pi is approximately 3.14"
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*sscanf(<string>,<format>[,<param>[,<param>[,...]]])
</syntax>

<description>
C-style sscanf. All C format specifiers are supported. More info: sscanf at www.cplusplus.com. The number of parameters is only limited by rAthena's script engine.

<example_code>
sscanf("This is a test: 42 foobar", "This is a test: %d %s", .@num, .@str$);
dispbottom(.@num + " " + .@str$); // prints "42 foobar"
</example_code>
<example_code>
// Parse formatted input
.@input$ = "Player: John, Level: 99, Class: Knight";
sscanf(.@input$, "Player: %[^,], Level: %d, Class: %[^,]", .@name$, .@level, .@class$);
mes "Name: " + .@name$;
mes "Level: " + .@level;
mes "Class: " + .@class$;
</example_code>
<example_code>
// Parse multiple values
.@data$ = "150,100,200,250";
sscanf(.@data$, "%d,%d,%d,%d", .@x, .@y, .@z, .@w);
mes "Values: " + .@x + ", " + .@y + ", " + .@z + ", " + .@w;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*strpos(<haystack>,<needle>{,<offset>})
</syntax>

<description>
PHP-style strpos. Finds a substring (needle) within a string (haystack). The offset parameter indicates the index of the string to start searching. Returns the index of the substring on successful search, otherwise -1. Comparison is case sensitive.

<example_code>
strpos("foobar", "bar", 0); // returns 3
strpos("foobarfoo", "foo", 0); // returns 0
strpos("foobarfoo", "foo", 1); // returns 6
</example_code>
<example_code>
// Check if a substring exists in player's name
.@name$ = strcharinfo(0);
if (strpos(.@name$, "GM") != -1)
    mes "Your name contains 'GM'!";
else
    mes "Your name does not contain 'GM'.";
</example_code>
<example_code>
// Find the second occurrence of a character
.@str$ = "hello world hello";
.@first = strpos(.@str$, "hello", 0); // returns 0
.@second = strpos(.@str$, "hello", .@first + 1); // returns 12
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*replacestr(<input>, <search>, <replace>{, <usecase>{, <count>}})
</syntax>

<description>
Replaces all instances of a search string in the input with the specified replacement string. By default, it is case sensitive unless <usecase> is set to 0. If specified, it will only replace as many instances as specified in the count parameter.

<example_code>
replacestr("testing tester", "test", "dash"); // returns "dashing dasher"
replacestr("Donkey", "don", "mon", 0); // returns "monkey"
replacestr("test test test test test", "test", "yay", 0, 3); // returns "yay yay yay test test"
</example_code>
<example_code>
// Case-sensitive replacement
.@result$ = replacestr("Hello Hello HELLO", "hello", "Hi"); // returns "Hello Hello HELLO" (no change)
// Case-insensitive replacement
.@result$ = replacestr("Hello Hello HELLO", "hello", "Hi", 0); // returns "Hi Hi Hi"
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*countstr(<input>, <search>{, <usecase>})
</syntax>

<description>
Counts all instances of a search string in the input. By default, it is case sensitive unless <usecase> is set to 0.

<example_code>
countstr("test test test Test", "test"); // returns 3
countstr("cake Cake", "Cake", 0); // returns 2
</example_code>
<example_code>
// Count how many times a word appears in player's input
input .@msg$;
.@count = countstr(.@msg$, "help", 0); // case-insensitive count
mes "You said 'help' " + .@count + " time(s).";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*preg_match(<regular expression pattern>,<string>{,<offset>})
</syntax>

<description>
Searches a string for a match to the regular expression provided. The offset parameter indicates the index of the string to start searching. Returns offsets to captured substrings, or 0 if no match is found.

This command is only available if the server is compiled with the regular expressions library enabled.

<example_code>
// Find a number in a string
.@result = preg_match("[0-9]+", "The number is 12345");
if (.@result)
    mes "Number found!";
</example_code>
<example_code>
// Extract email from a string
.@result = preg_match("([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})", "Contact me at test@example.com");
// Returns position of the email match
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setfont <font>;
</syntax>

<description>
This command sets the current RO client interface font to one of the fonts stored in data/*.eot by using an ID of the font. When the ID of the currently used font is used, the default interface font is used again.

0 - Default
1 - RixLoveangel
2 - RixSquirrel
3 - NHCgogo
4 - RixDiary
5 - RixMiniHeart
6 - RixFreshman
7 - RixKid
8 - RixMagic
9 - RixJJangu

<example_code>
// Change player's font to RixLoveangel
setfont 1;
</example_code>
<example_code>
// Reset to default font
setfont 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*showdigit <value>{,<type>};
</syntax>

<description>
Displays the given numeric value in large digital clock font on top of the screen. The optional parameter type specifies visual aspects of the clock and can be one of the following values:

0 - Displays the value for 5 seconds (default).
1 - Incremental counter (1 tick/second).
2 - Decremental counter (1 tick/second). Does not stop at zero, but overflows.
3 - Decremental counter (2 ticks/second). Two digits only, stops at zero.

Except for type 3, the value is interpreted as seconds and formatted as time in days, hours, minutes, and seconds. Note that the official script command does not have the optional parameter.

<example_code>
// displays 23:59:59 for 5 seconds
showdigit 86399;
</example_code>
<example_code>
// counter that starts at 60 and runs for 30 seconds
showdigit 60, 3;
</example_code>
<example_code>
// Countdown from 10 seconds
showdigit 10, 2;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setcell "<map name>",<x1>,<y1>,<x2>,<y2>,<type>,<flag>;
</syntax>

<description>
Each map cell has several flags that specify the properties of that cell. These include terrain properties (walkability, shootability, presence of water), skills (basilica, land protector, etc.), and others (NPC nearby, no vending, etc.). Each of these can be on or off. Together they define a cell's behavior.

This command lets you alter these flags for all map cells in the specified (x1, y1) to (x2, y2) rectangle. The flag can be 0 or 1 (0: clear flag, 1: set flag). The type defines which flag to modify. Possible options are found in src/map/script_constants.hpp.

<example_code>
setcell "arena", 0, 0, 300, 300, cell_basilica, 1;
setcell "arena", 140, 140, 160, 160, cell_basilica, 0;
setcell "arena", 135, 135, 165, 165, cell_walkable, 0;
setcell "arena", 140, 140, 160, 160, cell_walkable, 1;
</example_code>

This will add a makeshift ring into the center of the map. The ring will be surrounded by a 5-cell wide gap to prevent interference from outside, and the rest of the map will be marked as basilica, preventing observers from casting any offensive skills or fighting among themselves. Note that the wall will not be shown nor known client-side, which may cause movement problems.

<example_code>
OnBarricadeDeploy:
    setcell "schg_cas05", 114, 51, 125, 51, cell_walkable, 0;
    end;
OnBarricadeBreak:
    setcell "schg_cas05", 114, 51, 125, 51, cell_walkable, 1;
    end;
</example_code>

This could be a part of the WoE:SE script, where attackers are not allowed to proceed until all barricades are destroyed. This script would place and remove a non-walkable row of cells after the barricade mobs.

<example_code>
// Make a specific cell unwalkable (a hole)
setcell "prontera", 150, 150, 150, 150, cell_walkable, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkcell("<map name>",<x>,<y>,<type>);
</syntax>

<description>
This command will return 1 or 0, depending on whether the specified cell has the type flag set or not. There are various types to check, all mimicking the server's cell_chk enumeration. The types can be found in src/map/script_constants.hpp.

The meaning of the individual types can be confusing, so here's an overview:
- cell_chkwall/water/cliff: these check directly for the terrain component of the specified cell
- cell_chkpass/reach/nopass/noreach: passable = not wall & not cliff, reachable = passable with regard to no-stacking mod
- cell_chknpc/basilica/landprotector/novending/nochat: these check for specific dynamic flags (their name indicates what they do)

<example_code>
mes "Pick a destination map.";
input .@map$;
mes "Alright, now give me the coordinates.";
input .@x;
input .@y;
if (!checkcell(.@map$, .@x, .@y, cell_chkpass)) {
    mes "Can't warp you there, sorry!";
    close;
} else {
    mes "Ok, get ready...";
    close2;
    warp .@map$, .@x, .@y;
    end;
}
</example_code>
<example_code>
// Check if a cell is walkable before creating a portal
if (checkcell("prontera", 150, 150, cell_chkpass))
    warpportal 150, 150, "payon", 0, 0;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getfreecell "<map name>",<rX>,<rY>{,<x>,<y>,<rangeX>,<rangeY>,<flag>};
</syntax>

<description>
Finds a free cell on the given map and stores the reference to the found cell in <rX> and <rY>. Passing <x> and <y> with <rangeX> and <rangeY> allows for searching within a specified area on the given map. The <flag> is a bitmask and has the following possible values:
- 1 = Random cell on the map or from <x>,<y> range. (default)
- 2 = The target should be able to walk to the target tile.
- 4 = There should not be any players around the target tile (uses the no_spawn_on_player setting).

<example_code>
getfreecell("prontera", .@x, .@y); // Find a random empty cell in Prontera and store it within .@x and .@y
getfreecell("prontera", .@x, .@y, 150, 150, 5, 5); // Find a random empty cell within a 5x5 range of (150,150) in Prontera
</example_code>
<example_code>
// Find a free cell with no players around
getfreecell("prontera", .@x, .@y, 100, 100, 10, 10, 1|4);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setwall "<map name>",<x>,<y>,<size>,<dir>,<shootable>,"<name>";

*delwall "<name>";
</syntax>

<description>
Creates an invisible wall, an array of setcell starting from x,y and doing a line of the given size in the given direction. The difference with setcell is this one updates the client part too to avoid the glitch problem. Directions are the same as NPC sprite facing directions: 0=north, 1=northwest, 2=west, etc.

<example_code>
// Create a wall that blocks movement
setwall "prontera", 150, 150, 10, 0, 0, "MyWall";
</example_code>
<example_code>
// Delete the wall
delwall "MyWall";
</example_code>
---------------------- Breakline ----------------------
<syntax>
*delwall "<name>";

*setwall "<map name>",<x>,<y>,<size>,<dir>,<shootable>,"<name>";
</syntax>

<description>
Creates an invisible wall, an array of setcell starting from x,y and doing a line of the given size in the given direction. The difference with setcell is this one updates the client part too to avoid the glitch problem. Directions are the same as NPC sprite facing directions: 0=north, 1=northwest, 2=west, etc.

<example_code>
// Create a wall that blocks movement
setwall "prontera", 150, 150, 10, 0, 0, "MyWall";
</example_code>
<example_code>
// Delete the wall
delwall "MyWall";
</example_code>
---------------------- Breakline ----------------------
<syntax>
*checkwall "<name>";
</syntax>

<description>
This command will return true if the wall with the given name exists, false otherwise.

<example_code>
prontera,150,150,4  script  WallChecker 767,{

    mes "[Wall Checker]";
    if (checkwall("MyWall")) {
        mes "The wall exists!";
    } else {
        mes "The wall does not exist.";
    }
    close;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*readbook <book id>,<page>;
</syntax>

<description>
This command will open a book item at the specified page.

<example_code>
// Open book ID 1000 at page 5
readbook 1000, 5;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*open_roulette({<char_id>})
</syntax>

<description>
Opens the roulette window for the currently attached character or the character with the given character ID.

<example_code>
// Open roulette for attached player
open_roulette;
</example_code>
<example_code>
// Open roulette for another character
open_roulette(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*naviregisterwarp("<Name of Link>", "<dest_map>", <dest_x>, <dest_y>)
</syntax>

<description>
Only useful when using the map-server-generator. Registers an extra warp from this NPC to the destination map/x/y for the generated client files.

<example_code>
-   script  NaviWarpNPC -1,{

OnInit:
    // Registers a warp link for the map-server-generator
    naviregisterwarp("My Warp", "prontera", 150, 100);
    end;

OnNaviGenerate:
    // This label is triggered when the generator runs
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*navihide
</syntax>

<description>
Only useful when using the map-server-generator. Hides this NPC and all links from this NPC in the navigation generation.

<example_code>
-   script  NaviHideNPC -1,{

OnInit:
    // Hides this NPC and its links from navigation generation
    navihide;
    end;

OnNaviGenerate:
    // This label is triggered when the generator runs
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_create("<instance name>"{,<instance mode>{,<owner id>}});
</syntax>

<description>
Creates an instance for the <owner id> of <mode>. The instance name, along with all other instance data, is read from db/(pre-)re/instance_db.yml. Upon success, the command generates a unique instance ID, duplicates all listed maps and NPCs, sets the alive time, and triggers the OnInstanceInit label in all NPCs inside the instance.

Instance Mode options:
IM_NONE: Attached to no one.
IM_CHAR: Attached to a single character.
IM_PARTY: Attached to a party (default instance mode).
IM_GUILD: Attached to a guild.
IM_CLAN: Attached to a clan.

The command returns the instance ID upon success, and these values upon failure:
-1: Invalid type.
-2: Character/Party/Guild/Clan not found.
-3: Instance already exists.
-4: No free instances (MAX_INSTANCE exceeded).

<example_code>
// Create a party-based instance
.@instance_id = instance_create("Endless Tower", IM_PARTY, getcharid(1));
if (.@instance_id > 0)
    mes "Instance created with ID: " + .@instance_id;
else
    mes "Failed to create instance. Error code: " + .@instance_id;
</example_code>
<example_code>
// Create a character-based instance
.@instance_id = instance_create("Solo Dungeon", IM_CHAR, getcharid(0));
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_destroy {<instance id>};
</syntax>

<description>
Destroys the instance with the ID <instance id>. If no ID is specified, the instance the script is attached to is used. If that fails, the script will come to a halt. This will also trigger the OnInstanceDestroy label in all NPCs inside the instance.

<example_code>
// Destroy the current instance
instance_destroy;
</example_code>
<example_code>
// Destroy a specific instance by ID
instance_destroy(5);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_enter("<instance name>",{<x>,<y>,<char_id>,<instance id>});
</syntax>

<description>
Warps the attached player to the specified <instance id>. If no ID is specified, the IM_PARTY instance the invoking player is attached to is used.

The map and coordinates are located in db/(pre-)re/instance_db.yml.

The command returns IE_OK upon success, and these values upon failure:
IE_NOMEMBER:   Party/Guild/Clan not found (for party/guild/clan modes).
IE_NOINSTANCE: Character/Party/Guild/Clan does not have an instance.
IE_OTHER:      Other errors (invalid instance name, instance doesn't match with character/party/guild/clan).

Put -1 for x and y if you want to warp the player with default entrance coordinates.

<example_code>
// Warp player to their party instance with default coordinates
.@result = instance_enter("Endless Tower", -1, -1, getcharid(0));
if (.@result == IE_OK)
    mes "Entering instance...";
else
    mes "Failed to enter instance. Error: " + .@result;
</example_code>
<example_code>
// Warp to a specific instance with custom coordinates
instance_enter("Endless Tower", 100, 150, getcharid(0), 5);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_npcname("<npc name>"{,<instance id>})
</syntax>

<description>
Returns the unique name of the instanced script. If no ID is specified, the instance the script is attached to is used. If that fails, the script will come to a halt.

<example_code>
// Get the instanced version of NPC "QuestMaster"
.@npc_name$ = instance_npcname("QuestMaster");
if (.@npc_name$ != "")
    donpcevent .@npc_name$ + "::OnTimer";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_mapname("<map name>"{,<instance id>})
</syntax>

<description>
Returns the unique name of the instanced map. If no instance ID is specified, the instance the script is attached to is used. If that fails, the command returns an empty string instead.

<example_code>
// Get the instanced map name for "1@tower"
.@map_name$ = instance_mapname("1@tower");
if (.@map_name$ != "")
    warp .@map_name$, 0, 0;
else
    mes "Instance map not found!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_id({<instance mode>})
</syntax>

<description>
Returns the unique instance ID of the given mode.

By default (no parameter given), the command returns the instance ID from the attached NPC. If <instance mode> is provided, the instance ID of the currently attached player is returned. If that fails, the function will return 0.

Please note that the command always requires the parameter <instance mode> to get the instance ID of an attached player!

Instance Mode options:
<example_code>
IM_CHAR     //   Attached to character.
IM_PARTY    //   Attached to character's party.
IM_GUILD    //   Attached to character's guild.
IM_CLAN     //   Attached to character's clan.
</example_code>
<example_code>
// Example with an attached player
npctalk "The current instance ID (mode party) from the attached player is: " + instance_id(IM_PARTY);
</example_code>
<example_code>
// Example with an attached NPC on an instance map
npctalk "The current instance ID from the attached NPC is: " + instance_id();
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_warpall "<map name>",<x>,<y>{,<instance id>,{<flag>}};
</syntax>

<description>
Warps all players in the <instance id> to <map name> at the given coordinates. If no ID is specified, the IM_PARTY instance the invoking player is attached to is used. If that fails, the script will come to a halt.

<flag> bitmask allows adding restrictions.

Available values for the <flag> bitmask:
<example_code>
IWA_NONE           // No restriction. (default)
IWA_NOTDEAD        // If dead players are warped or not
</example_code>
<example_code>
// Warp all players in the current instance to a new map
instance_warpall "2@tower", 50, 50;
</example_code>
<example_code>
// Warp only living players in instance ID 5
instance_warpall "prontera", 150, 150, 5, IWA_NOTDEAD;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_announce <instance id>,"<text>",<flag>{,<fontColor>{,<fontType>{,<fontSize>{,<fontAlign>{,<fontY>}}}}};
</syntax>

<description>
Broadcasts a message to all players in the <instance id> currently residing on an instance map. If 0 is specified for <instance id>, the instance the script is attached to is used.

For details on the other parameters, see announce.

<example_code>
// Announce to all players in the current instance
instance_announce 0, "The boss has appeared!", bc_all, 0xFF0000;
</example_code>
<example_code>
// Announce to instance ID 5
instance_announce 5, "You have 5 minutes remaining!", bc_all, 0xFFFF00, FW_BOLD;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_check_party(<party id>{,<amount>{,<min>{,<max>}}})
</syntax>

<description>
This function checks if a party meets certain requirements, returning 1 if all conditions are met and 0 otherwise. It will only check online characters. The command returns 0 if the party ID does not exist.

amount - number of online party members (default is 1).
min    - minimum level of all characters in the party (default is 1).
max    - maximum level of all characters in the party (default is max level in conf).

<example_code>
if (instance_check_party(getcharid(1), 2, 2, 149)) {
    mes "Your party meets the Memorial Dungeon requirements.";
    mes "All online members are between levels 1-150 and at least two are online.";
    close;
} else {
    mes "Sorry, your party does not meet requirements.";
    close;
}
</example_code>
<example_code>
// Check if party has at least 3 online members of level 99 or higher
.@result = instance_check_party(getcharid(1), 3, 99);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_check_guild(<guild id>{,<amount>{,<min>{,<max>}}})
</syntax>

<description>
This function checks if a guild meets certain requirements, returning 1 if all conditions are met and 0 otherwise. It will only check online characters.

amount - number of online guild members (default is 1).
min    - minimum level of all characters in the guild (default is 1).
max    - maximum level of all characters in the guild (default is max level in conf).

<example_code>
if (instance_check_guild(getcharid(2), 2, 2, 149)) {
    mes "Your guild meets the Memorial Dungeon requirements.";
    mes "All online members are between levels 1-150 and at least two are online.";
    close;
} else {
    mes "Sorry, your guild does not meet requirements.";
    close;
}
</example_code>
<example_code>
// Check if guild has at least 5 online members of level 99 or higher
.@result = instance_check_guild(getcharid(2), 5, 99);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_check_clan(<clan id>{,<amount>{,<min>{,<max>}}})
</syntax>

<description>
This function checks if a clan meets certain requirements, returning 1 if all conditions are met and 0 otherwise. It will only check online characters.

amount - number of online clan members (default is 1).
min    - minimum level of all characters in the clan (default is 1).
max    - maximum level of all characters in the clan (default is max level in conf).

<example_code>
if (instance_check_clan(getcharid(5), 2, 2, 149)) {
    mes "Your clan meets the Memorial Dungeon requirements.";
    mes "All online members are between levels 1-150 and at least two are online.";
    close;
} else {
    mes "Sorry, your clan does not meet requirements.";
    close;
}
</example_code>
<example_code>
// Check if clan has at least 3 online members of level 80 or higher
.@result = instance_check_clan(getcharid(5), 3, 80);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_info("<instance name>",<info type>{,<instance_db map index>});
</syntax>

<description>
Returns the specified <info type> of the given <instance name> from the instance database. If the <instance name> is unknown or an invalid <info type> is supplied, -1 will be returned.

Valid info types:
<example_code>
IIT_ID   //  Instance database ID as integer.
IIT_TIME_LIMIT   //  Instance database total life time as integer.
IIT_IDLE_TIMEOUT   //  Instance database timeout time as integer.
IIT_ENTER_MAP   //  Instance database enter map as string.
IIT_ENTER_X   //  Instance database enter X location as integer.
IIT_ENTER_Y   //  Instance database enter Y location as integer.
IIT_MAPCOUNT   //  Instance database total maps as integer.
IIT_MAP   //  Instance database map name from the given <instance_db map index> as string. If the index is invalid, an empty string will be returned.
</example_code>
<example_code>
.@name$ = "Endless Tower";
mes .@name$ + " will be destroyed if no one is in the instance for " + instance_info(.@name$, IIT_IDLE_TIMEOUT) + " seconds.";
// Endless Tower will be destroyed if no one is in the instance for 300 seconds.
</example_code>
<example_code>
// Get the enter map and coordinates for an instance
.@enter_map$ = instance_info("Endless Tower", IIT_ENTER_MAP);
.@enter_x = instance_info("Endless Tower", IIT_ENTER_X);
.@enter_y = instance_info("Endless Tower", IIT_ENTER_Y);
mes "Enter at: " + .@enter_map$ + " (" + .@enter_x + ", " + .@enter_y + ")";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_live_info(<info type>{,<instance id>});
</syntax>

<description>
Returns the specified <info type> of the instance attached to the NPC or, if an instance ID is specified, of that instance.

Valid <info type>:
<example_code>
ILI_NAME    // Instance Name
            // Returns the name of the instance or "" if that fails.
ILI_MODE    // Instance Mode
            // Returns IM_NONE, IM_CHAR, IM_PARTY, IM_GUILD, IM_CLAN or -1 if that fails.
ILI_OWNER   // Owner ID
</example_code>
Returns an ID according to the instance mode of the instance attached/specified or -1 if that fails.
When the instance mode is:
<example_code>
IM_NONE   // returns the NPC ID that created the instance
IM_CHAR   // returns the owner char ID
IM_PARTY  // returns the party ID
IM_GUILD  // returns the guild ID
IM_CLAN   // returns the clan ID
</example_code>
<example_code>
// Return the instance name of the instance attached to the NPC
.@instance_name$ = instance_live_info(ILI_NAME);
</example_code>
<example_code>
// Return the guild owner ID of the given instance ID
.@owner = instance_live_info(ILI_OWNER, instance_id(IM_GUILD));
</example_code>
<example_code>
// Check the mode of the current instance
.@mode = instance_live_info(ILI_MODE);
switch (.@mode) {
    case IM_PARTY:
        mes "This is a party instance.";
        break;
    case IM_GUILD:
        mes "This is a guild instance.";
        break;
    default:
        mes "This is another type of instance.";
        break;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*instance_list(<"map name">{,<instance mode>});
</syntax>

<description>
Creates the array .@instance_list with possible instance IDs for the given <map name> and optional <mode>. Returns the .@instance_list array size.

Instance mode options: IM_NONE, IM_CHAR, IM_PARTY, IM_GUILD, or IM_CLAN. If the instance mode is not provided, then it will return all the instance IDs for that map.

<example_code>
// This example assumes that there are several instances on the map of Prontera
.@size = instance_list("prontera");
for (.@i = 0; .@i < .@size; ++.@i)
    mes instance_mapname("prontera", .@instance_list[.@i]);
// the output would be a list of all prontera copies that are active in the server
</example_code>
<example_code>
// List only party instances
.@size = instance_list("1@tower", IM_PARTY);
for (.@i = 0; .@i < .@size; ++.@i)
    mes "Party instance ID: " + .@instance_list[.@i];
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getinstancevar(<variable>,<instance id>);
</syntax>

<description>
Returns a reference to an instance variable (prefix) of the specific instance ID. This can only be used to get variables.

<example_code>
// This will set the .@s variable to the value of 'var variable of the specific instance ID
.@s = getinstancevar('var, instance_id(IM_PARTY));
</example_code>
<example_code>
// This will set the 'var variable of the specific instance ID to 1
set getinstancevar('var, instance_id(IM_GUILD)), 1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setinstancevar(<variable>,<value>,<instance id>);
</syntax>

<description>
This command will set an instance variable to the value that the expression results in. See the set command for more information.

Returns the variable reference.

<example_code>
// This will set the 'var variable of the specific instance ID to 9
setinstancevar('var, 9, instance_id(IM_GUILD));
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*questinfo <Icon>{,<Map Mark Color>{,"<condition>"}};
</syntax>

<description>
This command should only be used in OnInit/OnInstanceInit labels. Shows an emotion on top of an NPC, and optionally, a colored mark in the mini-map like viewpoint or viewpointmap. When a user is doing some action, each NPC is checked for questinfo that has been set on the map. If questinfo is present, it will check if the player fulfills the condition. If they do, or if no condition has been set, the bubble will appear.

Available <Icon>:
<example_code>
QTYPE_NONE // No Icon
QTYPE_QUEST // ! Quest Icon
QTYPE_QUEST2 // ? Quest Icon
QTYPE_JOB // ! Job Icon
QTYPE_JOB2 // ? Job Icon
QTYPE_EVENT // ! Event Icon
QTYPE_EVENT2 // ? Event Icon
QTYPE_WARG // Warg (Only for packetver < 20170315)
QTYPE_WARG2 // Warg Face (Only for packetver >= 20120410 and < 20170315)
QTYPE_CLICKME // Click Me (Only for packetver >= 20170315)
QTYPE_DAILYQUEST // Daily Quest (Only for packetver >= 20170315)
QTYPE_EVENT3 // ! Event Icon (Only for packetver >= 20170315)
QTYPE_JOBQUEST // Job Quest (Only for packetver >= 20170315)
QTYPE_JUMPING_PORING // Jumping Poring (Only for packetver >= 20170315)
</example_code>
<Map Mark Color>, when used, creates a mark in the user's mini-map at the position of the NPC. The available color values are:
<example_code>
QMARK_NONE   // No Marker (default)
QMARK_YELLOW // Yellow Marker
QMARK_GREEN  // Green Marker
QMARK_PURPLE // Purple Marker
</example_code>
<condition> can be any expression similarly to the condition in the if command.

List of the player's actions that trigger the questinfo condition:
- Item added to/removed from player inventory
- Base/Job level change
- Job change
- Quest given/erased/completed
- Quest objective updated (character killed a monster quest target)
- Warp

<example_code>
izlude,100,100,4    script  Test    844,{
    mes "[Test]";
    mes "Hello World.";
    close;

OnInit:
    // Display an icon if the player has completed the given hunting quest and their variable 'unknown_var' is above 0
    questinfo QTYPE_QUEST, QMARK_YELLOW, "checkquest(1001, HUNTING) == 2 && unknown_var > 0";

    // Or display an icon if the player didn't start the given quest and they have one red potion in inventory
    questinfo QTYPE_QUEST, QMARK_YELLOW, "!isbegin_quest(1001) && countitem(501) == 1";
    end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*questinfo_refresh {<char_id>};
</syntax>

<description>
This command refreshes each quest bubble that has been set on the map according to the questinfo condition for the attached or given player.

<example_code>
// Refresh quest bubbles for attached player
questinfo_refresh;
</example_code>
<example_code>
// Refresh quest bubbles for another character
questinfo_refresh(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setquest <ID>{,<char_id>};
</syntax>

<description>
Places the quest of <ID> in the user's quest log, with the state set to "active".

If questinfo is set and the same ID is specified here, the icon will be cleared when the quest is set.

<example_code>
// Activate quest ID 1001 for attached player
setquest 1001;
</example_code>
<example_code>
// Activate quest ID 1002 for another character
setquest 1002, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*completequest <ID>{,<char_id>};
</syntax>

<description>
Changes the state for the given quest <ID> to "complete" and removes it from the user's quest log.

<example_code>
// Complete quest ID 1001 for attached player
completequest 1001;
</example_code>
<example_code>
// Complete quest ID 1002 for another character
completequest 1002, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*erasequest <ID>{,<char_id>};
</syntax>

<description>
Removes the quest of the given <ID> from the user's quest log.

<example_code>
// Erase quest ID 1001 for attached player
erasequest 1001;
</example_code>
<example_code>
// Erase quest ID 1002 for another character
erasequest 1002, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*changequest <ID>,<ID2>{,<char_id>};
</syntax>

<description>
Removes the quest of the given <ID> from the user's quest log, then adds quest <ID2> to the quest log with the state set to "active".

<example_code>
// Replace quest 1001 with quest 1002 for attached player
changequest 1001, 1002;
</example_code>
<example_code>
// Replace quest 2001 with quest 2002 for another character
changequest 2001, 2002, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkquest(<ID>{,PLAYTIME|HUNTING{,<char_id>}})
</syntax>

<description>
If no additional argument is supplied, returns the state of the quest:
-1 = Quest not started (not in quest log)
0  = Quest has been given, but the state is "inactive"
1  = Quest has been given, and the state is "active"
2  = Quest completed

If the parameter PLAYTIME is supplied:
-1 = Quest not started (not in quest log)
0  = The time limit has not yet been reached
1  = The time limit has not been reached but the quest is marked as complete
2  = The time limit has been reached

If the parameter HUNTING is supplied:
-1 = Quest not started (not in quest log)
0  = You haven't killed all of the target monsters and the time limit has not been reached
1  = You haven't killed all of the target monsters but the time limit has been reached
2  = You have killed all of the target monsters

<example_code>
// Check if quest 1001 is active
if (checkquest(1001) == 1)
    mes "Quest 1001 is active!";
</example_code>
<example_code>
// Check hunting quest progress
if (checkquest(1002, HUNTING) == 2)
    mes "You have killed all target monsters!";
</example_code>
<example_code>
// Check time-limited quest
if (checkquest(1003, PLAYTIME) == 2)
    mes "The time limit for quest 1003 has been reached!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*isbegin_quest(<ID>{,<char_id>})
</syntax>

<description>
Returns the state of the quest:
0 = Quest not started (not in quest log)
1 = Quest has been given (state is either "inactive" or "active")
2 = Quest completed

<example_code>
// Check if quest has been started (either inactive or active)
if (isbegin_quest(1001))
    mes "You have started quest 1001!";
else
    mes "You have not started quest 1001.";
</example_code>
<example_code>
// Check for another character
if (isbegin_quest(1002, 150001))
    mes "That character has started quest 1002.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*showevent <icon>{,<mark color>{,<char_id>}}
</syntax>

<description>
Shows an emotion on top of an NPC, and optionally, a colored mark in the mini-map like viewpoint or viewpointmap. This is used to indicate that an NPC has a quest or an event for a certain player.

Available Icons:
<example_code>
QTYPE_NONE // No Icon
QTYPE_QUEST // ! Quest Icon
QTYPE_QUEST2 // ? Quest Icon
QTYPE_JOB // ! Job Icon
QTYPE_JOB2 // ? Job Icon
QTYPE_EVENT // ! Event Icon
QTYPE_EVENT2 // ? Event Icon
QTYPE_WARG // Warg (Only for packetver < 20170315)
QTYPE_WARG2 // Warg Face (Only for packetver >= 20120410 and < 20170315)
</example_code>
Mark Color:
<example_code>
QMARK_NONE   // No Marker (default)
QMARK_YELLOW // Yellow Marker
QMARK_GREEN  // Green Marker
QMARK_PURPLE // Purple Marker
</example_code>

<example_code>
// Show a quest icon with yellow marker for attached player
showevent QTYPE_QUEST, QMARK_YELLOW;
</example_code>
<example_code>
// Show a job icon with no marker for another player
showevent QTYPE_JOB, QMARK_NONE, 150001;
</example_code>
<example_code>
// Remove the event icon
showevent QTYPE_NONE;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*open_quest_ui {<quest ID>,{<char ID>}};
</syntax>

<description>
Opens the quest UI for the attached player or the given character ID. Use 0 as the quest ID to open the main quest UI. If the quest ID is not 0, then the quest UI is opened to the given quest. If the quest data is not populated in the client LUB, a message will be displayed saying the quest does not exist.

This command requires packet version 2015-12-02 or newer.

<example_code>
// Open main quest UI for attached player
open_quest_ui 0;
</example_code>
<example_code>
// Open quest UI for quest ID 1001
open_quest_ui 1001;
</example_code>
<example_code>
// Open quest UI for another character
open_quest_ui 1002, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*waitingroom2bg_single(<battle group>,{"<map name>",<x>,<y>{,"<npc name>"}});
</syntax>

<description>
Adds the first waiting player from the chat room of the given NPC to an existing battleground group. The player will also be warped to the default spawn point of the battle group or to the specified coordinates <x> and <y> on the given <map>.

Note: The map needs the mapflag MF_BATTLEGROUND, otherwise the player is removed from the Battleground team.

<example_code>
// Add first waiting player to battle group 1 and warp to default spawn
waitingroom2bg_single(1);

// Add first waiting player from NPC "BG_WaitingRoom" to battle group 2
waitingroom2bg_single(2, "prontera", 150, 150, "BG_WaitingRoom");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*waitingroom2bg("<map name>",<x>,<y>,{"<On Quit Event>","<On Death Event>"{,"<NPC Name>"}});
</syntax>

<description>
<map name>, <x>, <y> refer to where the respawn base is, where the player group will respawn when they die.
<On Quit Event> refers to an NPC label that attaches to the character and is run when they relog. (Optional)
<On Death Event> refers to an NPC label that attaches to the character and is run when they die. (Optional)

If "-" is supplied for <map name>, then the player will not automatically respawn after the 1 second delay. This allows for better manipulation of <On Death Event>. The player will have to be warped to the desired location at the end of <On Death Event>.

Unlike the prior command, this command will attach a GROUP in a waiting room to the battleground, and sets the array $@arenamembers[0] where 0 holds the IDs of the first group, and 1 holds the IDs of the second.

If the optional NPC Name parameter is left out, the waiting room of the current NPC is used.

<example_code>
// Battle Group will be referred to as $@KvM01BG_id1, and when they die, respawn at bat_c01,52,129
set $@KvM01BG_id1, waitingroom2bg("bat_c01", 52, 129, "KvM01_BG::OnGuillaumeQuit", "KvM01_BG::OnGuillaumeDie");
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_create("<map name>",<x>,<y>{,"<On Quit Event>","<On Death Event>"});
</syntax>

<description>
Creates an instance of a battleground battle group that can be used with other battleground commands.

<map name>, <x>, <y> refer to where the respawn base is, where the player group will respawn when they die.
<On Quit Event> refers to an NPC label that attaches to the character and is run when they relog. (Optional)
<On Death Event> refers to an NPC label that attaches to the character and is run when they die. (Optional)

If "-" is supplied for <map name>, then the player will not automatically respawn after the 1 second delay. This allows for better manipulation of <On Death Event>. The player will have to be warped to the desired location at the end of <On Death Event>.

Returns the battle group ID on success. Returns 0 on failure.

<example_code>
// Create a battleground group
.@bg_id = bg_create("bat_c01", 52, 129, "BG::OnQuit", "BG::OnDie");
if (.@bg_id)
    mes "Battleground created with ID: " + .@bg_id;
else
    mes "Failed to create battleground.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_join(<battle group>,{"<map name>",{<x>,<y>{,<char id>}});
</syntax>

<description>
Adds the attached player or <char id> if specified to an existing battleground group. The player will also be warped to the default spawn point of the battle group or to the specified coordinates <x> and <y> on the given <map>.

Note: The map needs the mapflag MF_BATTLEGROUND, otherwise the player is removed from the Battleground team.

Returns true on success. Returns false on failure.

<example_code>
// Add attached player to battle group 1 (warps to default spawn)
bg_join(1);
</example_code>
<example_code>
// Add another character to battle group 2 with custom warp
if (bg_join(2, "prontera", 150, 150, 150001))
    mes "Player added to battleground!";
else
    mes "Failed to add player.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_team_setxy <Battle Group ID>,<x>,<y>;
</syntax>

<description>
Updates the respawn point of the given Battle Group to x,y on the same map. <Battle Group ID> can be retrieved using getcharid(4).

<example_code>
bg_team_setxy getcharid(4), 56, 212;
mapannounce "bat_a01", "Group [1] has taken the workshop, and will now respawn there.", bc_map, "0xFFCE00";
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_reserve("<battleground_map_name>"{,<ended>});
</syntax>

<description>
Reserves a Battleground map for the Battleground UI System. When a map is booked, it prevents another similar queue from being created and will allow players to join an active Battlegrounds event.

If <ended> is true, then the Battleground is marked as over to prevent new players from joining. This state is meant for the period where players can get their Badges.

<example_code>
// Reserve a Battleground map
bg_reserve("bat_a01");
</example_code>
<example_code>
// Mark the Battleground as ended (no new players can join)
bg_reserve("bat_a01", true);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_unbook("<battleground_map_name>");
</syntax>

<description>
Removes a Battleground map from the Battleground UI System. When a map is unbooked, it allows a queue to be created.

<example_code>
// Unbook a Battleground map to allow new queues
bg_unbook("bat_a01");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_desert({<char_id>});
</syntax>

<description>
Same as bg_leave but slaps the player with a deserter status so they cannot enter another queue for the time defined in battleground_db (10 minutes by default).

With the Battleground Queue System, it will also warp the player to their previous position when they joined or to their save point if the map had MF_NOSAVE.

<example_code>
// Make the attached player a deserter
bg_desert;
</example_code>
<example_code>
// Make another character a deserter
bg_desert(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_warp <Battle Group>,"<map name>",<x>,<y>;
</syntax>

<description>
Similar to the warp command. Places all members of <Battle Group> at the specified map and coordinates.

<example_code>
// Place the battle group one for Tierra Gorge at starting position
bg_warp $@TierraBG1_id1, "bat_a01", 352, 342;
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_monster <Battle Group>,"<map name>",<x>,<y>,"<name to show>",<mob id>,"<event label>";

*bg_monster(<Battle Group>,"<map name>",<x>,<y>,"<name to show>",<mob id>,"<event label>");
</syntax>

<description>
Similar to the monster command. Spawns a monster with allegiance to the given Battle Group. Does not allow for the summoning of multiple monsters. Monsters are similar to those in War of Emperium, in that the specified Battle Group is considered friendly.

<example_code>
// It can be used in two different ways
bg_monster $@TierraBG1_id2, "bat_a01", 167, 50, "Food Depot", 1910, "Feed Depot#1::OnMyMobDead";
end;
</example_code>
<example_code>
// Alternatively, you can set an ID for the monster using set
// This becomes useful when used with the command below
set $@Guardian_3, bg_monster($@TierraBG1_id2, "bat_a01", 268, 204, "Guardian", 1949, "NPCNAME::OnMyMobDead");
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_monster_set_team <GID>,<Battle Group>;
</syntax>

<description>
This command will change the allegiance of a monster in a battleground. GID can be set when spawning the monster via the bg_monster command.

<example_code>
end;

OnEnable:
    mapannounce "A guardian has been summoned for Battle Group 2!", bc_map, "0xFFCE00";
    set $@Guardian, bg_monster($@BG_2, "bat_a01", 268, 204, "Guardian", 1949, "NPCNAME::OnMyMobDead");
    initnpctimer;
    end;

OnTimer1000:
    stopnpctimer;
    mapannounce "Erm, sorry about that! This monster was meant for Battle Group 1.", bc_map, "0xFFCE00";
    bg_monster_set_team $@Guardian, $@BG_1;
    end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_leave {<char_id>};
</syntax>

<description>
Removes the attached player from their Battle Group.

With the Battleground Queue System, it will also warp the player to their previous position when they joined or to their save point if the map had MF_NOSAVE.

<example_code>
// Remove attached player from their Battle Group
bg_leave;
</example_code>
<example_code>
// Remove another character from their Battle Group
bg_leave(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_destroy <Battle Group>;
</syntax>

<description>
Destroys the Battle Group created for that battleground.

<example_code>
// Destroy the Battle Group
bg_destroy $@TierraBG1_id1;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*areapercentheal "<map name>",<x1>,<y1>,<x2>,<y2>,<hp>,<sp>;
</syntax>

<description>
Restores a percentage of the maximum HP/SP of players within a defined area. This is primarily used in battleground scripts, but is not limited to them.

<example_code>
areapercentheal "bat_a01", 52, 208, 61, 217, 100, 100;
end;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_get_data(<Battle Group>,<type>);
</syntax>

<description>
Retrieves data related to the given Battle Group. Type can be one of the following:

0 - Returns the amount of players currently belonging to the group.
1 - Stores GIDs of players in <Battle Group> in a temporary global array $@arenamembers, and also returns the amount of players currently belonging to the group in $@arenamemberscount.

<example_code>
// Get the number of players in Battle Group
.@count = bg_get_data($@BG_id, 0);
mes "Players in group: " + .@count;
</example_code>
<example_code>
// Get array of players in Battle Group
.@count = bg_get_data($@BG_id, 1);
for (.@i = 0; .@i < $@arenamemberscount; .@i++)
    mes "Player " + (.@i + 1) + " GID: " + $@arenamembers[.@i];
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_getareausers(<Battle Group>,"<map name>",<x0>,<y0>,<x1>,<y1>);
</syntax>

<description>
Retrieves the number of players belonging to the given Battle Group on the given map within the specified rectangular area.

<example_code>
// Count players from Battle Group inside the flag area
.@count = bg_getareausers($@BG_id, "bat_a01", 52, 208, 61, 217);
mes "Battle Group players in flag area: " + .@count;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_updatescore "<map name>",<Guillaume Score>,<Croix Score>;
</syntax>

<description>
This command will force the update of the displayed scoreboard. It is only usable when the map is defined as a Type 2 Battleground:
mapflag <map name> battleground 2

<example_code>
// Update scoreboard for bat_a01 map
bg_updatescore "bat_a01", 5, 3;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bg_info("<battleground name>", <type>);
</syntax>

<description>
Retrieves data related to the given <battleground name> from the database. Requires feature.bgqueue to be enabled. <Type> can be one of the following:
<example_code>
BG_INFO_ID  //  Battleground ID.
BG_INFO_REQUIRED_PLAYERS  //  Required players to start a battleground (per side).
BG_INFO_MAX_PLAYERS  //  Maximum players allowed in a battleground.
BG_INFO_MIN_LEVEL  //  Minimum level allowed to join a battleground.
BG_INFO_MAX_LEVEL  //  Maximum level allowed to join a battleground.
BG_INFO_MAPS  //  Number of maps in a battleground. Stores an array of map names in @bgmaps[] and a count in @bgmapscount.
BG_INFO_DESERTER_TIME  //  Amount of time in seconds a player is marked as a deserter.
</example_code>
<example_code>
// Get required players for Tierra Gorge
.@required = bg_info("Tierra Gorge", BG_INFO_REQUIRED_PLAYERS);
mes "Required players per side: " + .@required;
</example_code>
<example_code>
// Get maps for a battleground
.@count = bg_info("Tierra Gorge", BG_INFO_MAPS);
mes "Number of maps: " + @bgmapscount;
for (.@i = 0; .@i < @bgmapscount; .@i++)
    mes "Map " + (.@i + 1) + ": " + @bgmaps$[.@i];
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*bpet;

*birthpet;
</syntax>

<description>
This command opens up a pet hatching window on the client connected to the invoking character. It is used in item scripts for pet incubators and will let the player hatch an owned egg. If the character has no eggs, it will just open up an empty incubator window. This is still usable outside item scripts.

<example_code>
// Open pet hatching window
bpet;
</example_code>
<example_code>
// Alternative syntax
birthpet;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*birthpet;

*bpet;
</syntax>

<description>
This command opens up a pet hatching window on the client connected to the invoking character. It is used in item scripts for pet incubators and will let the player hatch an owned egg. If the character has no eggs, it will just open up an empty incubator window. This is still usable outside item scripts.

<example_code>
// Open pet hatching window
bpet;
</example_code>
<example_code>
// Alternative syntax
birthpet;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*pet {<item_id>{,<flag>}};

*catchpet {<item_id>{,<flag>}};
</syntax>

<description>
This command is used in all the item scripts for taming items. Running this command will make the pet catching cursor appear on the client of the invoking character, and the player can then attempt to catch a monster.

If the item ID is not specified, the command will use the item ID from the invoking item script. It will also work outside of an item script if the item ID is provided.

The following constants can be used as the <flag> parameter:

PET_CATCH_NORMAL:               Will attempt to catch the targeted monster as long as it is in the pet database and the taming item corresponds with the required taming item in the pet database. This is the default if <flag> is not specified.
PET_CATCH_UNIVERSAL_NO_BOSS:    Will attempt to catch the targeted monster as long as it is in the pet database and does not have the MD_STATUS_IMMUNE monster mode.
PET_CATCH_UNIVERSAL_ALL:        Will attempt to catch the targeted monster as long as it is in the pet database.

See doc/mob_db_mode_list.txt for more information about monster modes.

A full list of pet IDs can be found inside db/(pre-)re/pet_db.yml.

<example_code>
// Open pet catching cursor with current item
pet;
</example_code>
<example_code>
// Catch any pet (including bosses)
catchpet 1002, PET_CATCH_UNIVERSAL_ALL;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*catchpet {<item_id>{,<flag>}};

*pet {<item_id>{,<flag>}};
</syntax>

<description>
This command is used in all the item scripts for taming items. Running this command will make the pet catching cursor appear on the client of the invoking character, and the player can then attempt to catch a monster.

If the item ID is not specified, the command will use the item ID from the invoking item script. It will also work outside of an item script if the item ID is provided.

The following constants can be used as the <flag> parameter:

PET_CATCH_NORMAL:               Will attempt to catch the targeted monster as long as it is in the pet database and the taming item corresponds with the required taming item in the pet database. This is the default if <flag> is not specified.
PET_CATCH_UNIVERSAL_NO_BOSS:    Will attempt to catch the targeted monster as long as it is in the pet database and does not have the MD_STATUS_IMMUNE monster mode.
PET_CATCH_UNIVERSAL_ALL:        Will attempt to catch the targeted monster as long as it is in the pet database.

See doc/mob_db_mode_list.txt for more information about monster modes.

A full list of pet IDs can be found inside db/(pre-)re/pet_db.yml.

<example_code>
// Open pet catching cursor with current item
pet;
</example_code>
<example_code>
// Catch any pet (including bosses)
catchpet 1002, PET_CATCH_UNIVERSAL_ALL;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*makepet <pet id>;
</syntax>

<description>
This command will create a pet egg and put it in the invoking character's inventory. The kind of pet is specified by pet ID numbers listed in db/(pre-)re/pet_db.yml. The egg is created exactly as if the character had just successfully caught a pet in the normal way.

Notice that you absolutely have to create pet eggs with this command. If you try to give a pet egg with getitem, pet data will not be created by the char server and the egg will disappear when anyone tries to hatch it.

<example_code>
// This will make you a Poring pet egg
makepet 1002;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getpetinfo(<type>{,<char_id>})
</syntax>

<description>
This function will return pet information for the pet the invoking character currently has active. 

Valid types are:
<example_code>
PETINFO_ID // Pet unique ID
PETINFO_CLASS // Pet class number as per db/(pre-)re/pet_db.yml - will tell you what kind of pet it is.
PETINFO_NAME // Pet name. Will return "null" if there is no pet.
PETINFO_INTIMATE // Pet friendly level (intimacy score). 1000 is full loyalty.
PETINFO_HUNGRY // Pet hungry level. 100 is full hunger.
PETINFO_RENAMED // Pet rename flag. 0 means this pet has not been named yet.
PETINFO_LEVEL // Pet level
PETINFO_BLOCKID // Pet Game ID
PETINFO_EGGID // Pet egg item ID
PETINFO_FOODID // Pet food item ID
</example_code>
PETINFO_INTIMATE can be used with the following constants for checking values:
<example_code>
PET_INTIMATE_NONE // 0
PET_INTIMATE_AWKWARD // 1 ~ 99
PET_INTIMATE_SHY // 100 ~ 249
PET_INTIMATE_NEUTRAL // 250 ~ 749
PET_INTIMATE_CORDIAL // 750 ~ 909
PET_INTIMATE_LOYAL // 910 ~ 1000
</example_code>
PETINFO_HUNGRY can be used with the following constants for checking values:
<example_code>
PET_HUNGRY_NONE // 0
PET_HUNGRY_VERY_HUNGRY // 1 ~ 10
PET_HUNGRY_HUNGRY // 11 ~ 25
PET_HUNGRY_NEUTRAL // 26 ~ 75
PET_HUNGRY_SATISFIED // 76 ~ 90
PET_HUNGRY_STUFFED // 91 ~ 100
</example_code>
<example_code>
mes "[Vet]";
mes "Your pet " + getpetinfo(PETINFO_NAME);
if (getpetinfo(PETINFO_INTIMATE) < PET_INTIMATE_LOYAL)
    mes "has some growing to do on you!";
else
    mes "seems to love you very much!";
close;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*petskillbonus <bonus type>,<value>,<duration>,<delay>;
</syntax>

<description>
This command will make the pet give a bonus to the owner's stat for a certain duration in seconds, and will be repeated after a certain delay in seconds.

For a full bonus list, see doc/item_bonus.txt.

NOTE: Currently ONLY supported for bonuses that are used by the bonus script.

<example_code>
// Pet gives +10 ATK to owner for 30 seconds, repeated every 60 seconds
petskillbonus bAtk, 10, 30, 60;
</example_code>
<example_code>
// Pet gives +5 AGI for 20 seconds, repeated every 40 seconds
petskillbonus bAgi, 5, 20, 40;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*petrecovery <status type>,<delay>;
</syntax>

<description>
This command will make the pet cure a specified status condition. The curing actions will occur once every Delay seconds. For a full list of status conditions that can be cured, see the list of SC_ status condition constants in src/map/script_constants.hpp.

<example_code>
// Pet cures Poison status every 30 seconds
petrecovery SC_POISON, 30;
</example_code>
<example_code>
// Pet cures Silence status every 20 seconds
petrecovery SC_SILENCE, 20;
</example_code>
<example_code>
// Pet cures Stun status every 25 seconds
petrecovery SC_STUN, 25;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*petloot <max items>;
</syntax>

<description>
This command will turn on pet looting, with a maximum number of items to loot specified. The pet will store items and return them when the maximum is reached or when pet performance is activated.

<example_code>
// Pet will loot up to 10 items
petloot 10;
</example_code>
<example_code>
// Pet will loot up to 5 items
petloot 5;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*petskillsupport <skill id>,<skill level>,<delay>,<percent hp>,<percent sp>;

*petskillsupport "<skill name>",<skill level>,<delay>,<percent hp>,<percent sp>;
</syntax>

<description>
This will make the pet use a specified support skill on the owner whenever the HP and SP are below the given percent values, with a specified delay time between activations. The skill numbers are as per db/(pre-)re/skill_db.yml.

It's not quite certain whose stats will be used for the skills cast, the character's or the pet's. Probably, Skotlex can answer that question.

<example_code>
// Pet will cast Heal level 5 when HP < 50% and SP < 30%, with a 10 second delay
petskillsupport "AL_HEAL", 5, 10, 50, 30;
</example_code>
<example_code>
// Pet will cast Blessing level 10 when HP < 70% and SP < 40%, with a 15 second delay
petskillsupport 34, 10, 15, 70, 40;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*petskillattack <skill id>,<skill level>,<rate>,<bonusrate>;

*petskillattack "<skill name>",<skill level>,<rate>,<bonusrate>;
</syntax>

<description>
This will make the pet use a specified attack skill on the enemy with a given rate in percent. bonusrate is added to the normal rate if the pet intimacy is at the maximum possible.

<example_code>
// Pet will use Fire Bolt level 5 with 30% chance, plus 10% if intimacy is max
petskillattack "MG_FIREBOLT", 5, 30, 10;
</example_code>
<example_code>
// Pet will use Cold Bolt level 3 with 20% chance, plus 5% if intimacy is max
petskillattack 19, 3, 20, 5;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*petskillattack2 <skill id>,<damage>,<number of attacks>,<rate>,<bonusrate>;

*petskillattack2 "<skill name>",<damage>,<number of attacks>,<rate>,<bonusrate>;
</syntax>

<description>
This will make the pet use a specified attack skill with fixed damage and a specified number of attacks. The skill is used with a given rate in percent. bonusrate is added to the normal rate if the pet intimacy is at the maximum possible.

<example_code>
// Pet will do 100 damage with 3 attacks using skill, 25% chance, plus 10% if intimacy is max
petskillattack2 "NPC_WIDESLEEP", 100, 3, 25, 10;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*petautobonus <bonus script>,<rate>,<duration>{,<flag>,{<other script>}};
</syntax>

<description>
This command is meant to be used in pet scripts only! It works similarly to autobonus, but for pets.

What this command does is attach a script to the pet which will get executed on attack. Rate is the trigger rate of the script (1000 = 100%). Duration is the time in milliseconds that the bonus will last for since the script has triggered.

The optional argument flag is used to classify the type of attack where the script can trigger (it shares the same flags as the bAutoSpell bonus script):

Range criteria:
BF_SHORT:  Trigger on melee attack
BF_LONG:   Trigger on ranged attack
Default:   BF_SHORT + BF_LONG

Attack type criteria:
BF_WEAPON: Trigger on weapon skills
BF_MAGIC:  Trigger on magic skills
BF_MISC:   Trigger on misc skills
Default:   BF_WEAPON

Skill criteria:
BF_NORMAL: Trigger on normal attacks
BF_SKILL:  Trigger on skills
Default:   If the attack type is BF_WEAPON (only) BF_NORMAL is used, otherwise BF_SKILL + BF_NORMAL is used.

The difference between the optional argument other script and the bonus script is that the former triggers only when attacking and the latter runs on status calculation as well, which makes sure, within the duration, the bonus that gets lost on status calculation is restored. So, bonus script is technically supposed to accept bonus commands only. And we usually use other script to show visual effects.

<example_code>
// Pet grants a 1% chance of +10 all stats for 10 seconds when using weapon attacks
petautobonus "{ bonus bAllStats, 10; }", 10, 10000, BF_WEAPON, "{ specialeffect2 EF_FIRESPLASHHIT; }";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*petautobonus2 <bonus script>,<rate>,<duration>{,<flag>,{<other script>}};
</syntax>

<description>
This command is meant to be used in pet scripts only. It works similarly to autobonus2, but for pets.

What this command does is attach a script to the pet which will get executed when the pet is attacked. Rate is the trigger rate of the script (1000 = 100%). Duration is the time in milliseconds that the bonus will last for since the script has triggered.

The optional argument flag is used to classify the type of attack where the script can trigger (it shares the same flags as the bAutoSpell bonus script):

Range criteria:
BF_SHORT:  Trigger on melee attack
BF_LONG:   Trigger on ranged attack
Default:   BF_SHORT + BF_LONG

Attack type criteria:
BF_WEAPON: Trigger on weapon skills
BF_MAGIC:  Trigger on magic skills
BF_MISC:   Trigger on misc skills
Default:   BF_WEAPON

Skill criteria:
BF_NORMAL: Trigger on normal attacks
BF_SKILL:  Trigger on skills
Default:   If the attack type is BF_WEAPON (only) BF_NORMAL is used, otherwise BF_SKILL + BF_NORMAL is used.

The difference between the optional argument other script and the bonus script is that the former triggers only when attacked and the latter runs on status calculation as well, which makes sure, within the duration, the bonus that gets lost on status calculation is restored. So, bonus script is technically supposed to accept bonus commands only. And we usually use other script to show visual effects.

<example_code>
// Pet grants a 5% chance of increasing DEF by 20 for 7 seconds when attacked
petautobonus2 "{ bonus bDef, 20; }", 50, 7000, BF_WEAPON, "{ specialeffect2 EF_SHIELD; }";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*petautobonus3 <bonus script>,<rate>,<duration>,<skill id>,{<other script>};

*petautobonus3 <bonus script>,<rate>,<duration>,"<skill name>",{<other script>};
</syntax>

<description>
This command is meant to be used in pet scripts only. It works similarly to autobonus3, but for pets.

What this command does is attach a script to the pet which will get executed when the pet uses the specified skill. Rate is the trigger rate of the script (1000 = 100%). Duration is the time in milliseconds that the bonus will last for since the script has triggered. Skill ID/skill name is the skill which will be used as a trigger to start the bonus.

The difference between the optional argument other script and the bonus script is that the former triggers only when using the skill and the latter runs on status calculation as well, which makes sure, within the duration, the bonus that gets lost on status calculation is restored. So, bonus script is technically supposed to accept bonus commands only. And we usually use other script to show visual effects.

<example_code>
// Pet grants a 10% chance of +5 AGI for 15 seconds when using the pet's attack skill
petautobonus3 "{ bonus bAgi, 5; }", 100, 15000, "PET_ATTACK";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*homevolution;
</syntax>

<description>
This command will try to evolve the current player's homunculus. If it doesn't work, the /swt emotion is shown.

To evolve a homunculus, the invoking player must have a homunculus, the homunculus must not be at the last evolution, and the homunculus must have above 91000 intimacy with its owner.

<example_code>
// Attempt to evolve the player's homunculus
homevolution;
mes "Your homunculus evolution has been attempted!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*morphembryo;
</syntax>

<description>
This command will try to put the invoking player's Homunculus in an uncallable state, required for mutation into a Homunculus S. The player will also receive a Strange Embryo (ID 6415) in their inventory if successful, which is deleted upon mutation.

The command will fail if the invoking player does not have an evolved Homunculus at level 99 or above. The /swt emotion is shown upon failure.

Returns 1 upon success and 0 for all failures.

<example_code>
// Attempt to create Strange Embryo from homunculus
if (morphembryo())
    mes "Your homunculus has been prepared for mutation!";
else
    mes "Failed. Your homunculus must be evolved and at level 99 or above.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*hommutate {<ID>};
</syntax>

<description>
This command will try to mutate the invoking player's Homunculus into a Homunculus S. The Strange Embryo (ID 6415) is deleted upon success.

The command will fail if the invoking player does not have an evolved Homunculus at level 99 or above, if it is not in the embryo state (from the morphembryo command), or if the invoking player does not possess a Strange Embryo. The /swt emotion is shown upon failure.

If the optional parameter <ID> is set, the invoking player's Homunculus will change into the specified Homunculus ID. Otherwise, a random Homunculus S will be chosen. See db/homunculus_db.txt for a full list of IDs.

Returns 1 upon success and 0 for all failures.

<example_code>
// Mutate into a random Homunculus S
if (hommutate())
    mes "Your homunculus has successfully mutated!";
else
    mes "Mutation failed. Please ensure your homunculus is ready.";
</example_code>
<example_code>
// Mutate into a specific Homunculus S by ID
if (hommutate(6048)) // Example ID for a specific Homunculus S
    mes "Your homunculus has transformed into the desired form!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*checkhomcall()
</syntax>

<description>
This function checks if the attached player's Homunculus is active, and returns the following values:
-1: The player has no Homunculus.
0: The player's Homunculus is active.
1: The player's Homunculus is vaporized.
2: The player's Homunculus is in morph state.

<example_code>
.@state = checkhomcall();
switch (.@state) {
    case -1:
        mes "You don't have a homunculus.";
        break;
    case 0:
        mes "Your homunculus is active!";
        break;
    case 1:
        mes "Your homunculus is vaporized.";
        break;
    case 2:
        mes "Your homunculus is in morph state.";
        break;
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*gethominfo(<type>{,<char_id>})
</syntax>

<description>
This function will return Homunculus information for the Homunculus of the invoking character, regardless of its vaporize state. It returns zero or "null" if the player does not own a Homunculus.

Valid types are:
0 - Homunculus ID
1 - Homunculus Class
2 - Homunculus Name
3 - Homunculus friendly level (intimacy score). 100000 is full loyalty.
4 - Homunculus hungry level. 100 is completely full.
5 - Homunculus rename flag. 0 means this homunculus has not been named yet.
6 - Homunculus level
7 - Homunculus Game ID

<example_code>
// Get homunculus name and intimacy
.@name$ = gethominfo(2);
.@intimacy = gethominfo(3);
mes "Your homunculus " + .@name$ + " has intimacy: " + .@intimacy;
</example_code>
<example_code>
// Check another player's homunculus
.@class = gethominfo(1, 150001);
.@level = gethominfo(6, 150001);
mes "That player's homunculus class: " + .@class + ", level: " + .@level;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*homshuffle;
</syntax>

<description>
This will recalculate the homunculus stats according to its level for the current invoking character.

<example_code>
// Recalculate homunculus stats after level up
homshuffle;
mes "Your homunculus stats have been recalculated!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*addhomintimacy <amount>{,<char_id>};
</syntax>

<description>
Increases or decreases a homunculus' intimacy value by the given <amount>. 100000 is full loyalty. Fails silently when no players are attached or if the player has no homunculus.

<example_code>
// Increase homunculus intimacy by 500
addhomintimacy 500;
mes "Your homunculus intimacy has increased!";
</example_code>
<example_code>
// Decrease homunculus intimacy for another character
addhomintimacy -1000, 150001;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mercenary_create <class>,<contract time>;
</syntax>

<description>
This command summons a mercenary for a given time (in milliseconds). For a list of all available classes, see db/mercenary_db.txt.

This command is typically used in item scripts of mercenary scrolls.

<example_code>
// Summon a mercenary of class 1 for 1 hour (3600000 ms)
mercenary_create 1, 3600000;
</example_code>
<example_code>
// Summon a mercenary of class 5 for 30 minutes (1800000 ms)
mercenary_create 5, 1800000;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mercenary_delete {<char id>{,<reply>}};
</syntax>

<description>
This command removes the mercenary from a player. The parameter reply can be one of the following values:

0 - Mercenary soldier's duty hour is over, faith increased by 1. (default)
1 - Your mercenary soldier has been killed, faith decreased by 1.
2 - Your mercenary soldier has been fired.
3 - Your mercenary soldier has ran away.

<example_code>
// Remove mercenary with default reply (duty hour over)
mercenary_delete;
</example_code>
<example_code>
// Remove mercenary for another character (killed)
mercenary_delete(150001, 1);
</example_code>
<example_code>
// Fire the mercenary
mercenary_delete(getcharid(0), 2);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mercenary_heal <hp>,<sp>;
</syntax>

<description>
This command works like heal, but affects the mercenary of the currently attached character.

<example_code>
// Heal mercenary by 1000 HP and 500 SP
mercenary_heal 1000, 500;
</example_code>
<example_code>
// Fully heal mercenary
mercenary_heal 999999, 999999;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mercenary_sc_start <type>,<tick>,<val1>;
</syntax>

<description>
This command works like sc_start, but affects the mercenary of the currently attached character.

<example_code>
// Apply Blessing to mercenary for 5 minutes (300000 ms)
mercenary_sc_start SC_BLESSING, 300000, 10;
</example_code>
<example_code>
// Apply Increase AGI to mercenary for 3 minutes
mercenary_sc_start SC_INCREASEAGI, 180000, 5;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mercenary_get_calls(<guild>);

*mercenary_set_calls <guild>,<value>;
</syntax>

<description>
Sets or gets the mercenary calls value for the given guild for the currently attached character. 

Guild can be one of the following constants:
<example_code>
ARCH_MERC_GUILD
SPEAR_MERC_GUILD
SWORD_MERC_GUILD
</example_code>
<example_code>
// Get current calls for Sword Mercenary Guild
.@calls = mercenary_get_calls(SWORD_MERC_GUILD);
mes "Sword Mercenary calls: " + .@calls;
</example_code>
<example_code>
// Set calls for Arch Mercenary Guild to 5
mercenary_set_calls ARCH_MERC_GUILD, 5;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mercenary_set_calls <guild>,<value>;

*mercenary_get_calls(<guild>);
</syntax>

<description>
Sets or gets the mercenary calls value for the given guild for the currently attached character. 

Guild can be one of the following constants:
<example_code>
ARCH_MERC_GUILD
SPEAR_MERC_GUILD
SWORD_MERC_GUILD
</example_code>
<example_code>
// Get current calls for Sword Mercenary Guild
.@calls = mercenary_get_calls(SWORD_MERC_GUILD);
mes "Sword Mercenary calls: " + .@calls;
</example_code>
<example_code>
// Set calls for Arch Mercenary Guild to 5
mercenary_set_calls ARCH_MERC_GUILD, 5;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mercenary_get_faith(<guild>);

*mercenary_set_faith <guild>,<value>;
</syntax>

<description>
Sets or gets the mercenary faith value for the given guild for the currently attached character. Guild can be one of the following constants:
<example_code>
ARCH_MERC_GUILD
SPEAR_MERC_GUILD
SWORD_MERC_GUILD
</example_code>
<example_code>
// Get current faith for Arch Mercenary Guild
.@faith = mercenary_get_faith(ARCH_MERC_GUILD);
mes "Arch Mercenary faith: " + .@faith;
</example_code>
<example_code>
// Set faith for Spear Mercenary Guild to 10
mercenary_set_faith SPEAR_MERC_GUILD, 10;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mercenary_set_faith <guild>,<value>;

*mercenary_get_faith(<guild>);
</syntax>

<description>
Sets or gets the mercenary faith value for the given guild for the currently attached character. Guild can be one of the following constants:
<example_code>
ARCH_MERC_GUILD
SPEAR_MERC_GUILD
SWORD_MERC_GUILD
</example_code>
<example_code>
// Get current faith for Arch Mercenary Guild
.@faith = mercenary_get_faith(ARCH_MERC_GUILD);
mes "Arch Mercenary faith: " + .@faith;
</example_code>
<example_code>
// Set faith for Spear Mercenary Guild to 10
mercenary_set_faith SPEAR_MERC_GUILD, 10;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getmercinfo(<type>{,<char id>});
</syntax>

<description>
Retrieves information about the mercenary of the currently attached character. If char id is given, the information of that character is retrieved instead. Type specifies what information to retrieve and can be one of the following:

0 - Mercenary ID
1 - Mercenary Class
2 - Mercenary Name
3 - Mercenary faith value for this mercenary's guild, if any
4 - Mercenary calls value for this mercenary's guild, if any
5 - Mercenary kill count
6 - Mercenary remaining life time in msec
7 - Mercenary level
8 - Mercenary Game ID

If the character does not have a mercenary, the command returns "" for name and 0 for all other types.

<example_code>
// Get mercenary name and remaining time
.@name$ = getmercinfo(2);
.@time = getmercinfo(6);
mes "Mercenary: " + .@name$;
mes "Remaining time: " + (.@time / 1000) + " seconds";
</example_code>
<example_code>
// Get mercenary info for another character
.@class = getmercinfo(1, 150001);
.@level = getmercinfo(7, 150001);
mes "That player's mercenary class: " + .@class + ", level: " + .@level;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getpartyname(<party id>)
</syntax>

<description>
This function will return the name of a party that has the specified ID number. If there is no such party ID, "null" will be returned.

<example_code>
// This would return the name of the party from the ID stored in a variable
mes "You're in the '" + getpartyname($@var) + "' party, I know!";
</example_code>
---------------------- Breakline ----------------------
<syntax>
*getpartymember <party id>{,<type>{,<array_variable>}};
</syntax>

<description>
This command will find all members of a specified party and returns their names (or character id or account id depending on the value of type) into an array of temporary global variables. There's actually quite a few commands like this which will fill a special variable with data upon execution and not do anything else.

Upon executing this:
<example_code>
$@partymembername$[] // is a global temporary string array which contains all the names of these party members (only set when type is 0 or not specified)
$@partymembercid[] // is a global temporary number array which contains the character id of these party members (only set when type is 1)
$@partymemberaid[] // is a global temporary number array which contains the account id of these party members (only set when type is 2)
$@partymembercount // is the number of party members that were found.
</example_code>
The party members will be found regardless of whether they are online or offline. Note that the names come in no particular order.

Be sure to use $@partymembercount to go through this array, and not getarraysize, because it is not cleared between runs of getpartymember. If someone with 7 party members invokes this script, the array would have 7 elements. But if another person calls up the NPC, and he has a party of 5, the server will not clear the array for you, overwriting the values instead. So in addition to returning the 5 member names, the 6th and 7th elements from the last call remain, and you will get 5+2 members, of which the last 2 don't belong to the new guy's party. $@partymembercount will always contain the correct number (5), unlike getarraysize() which will return 7 in this case.

If array_variable is set, the result will be stored to that variable instead using a global variable.

<example_code>
// Example 1: list party member names

// get the party member names
getpartymember getcharid(1), 0;

// It's a good idea to copy the global temporary $@partymember*****
// variables to your own scope variables because if you have pauses in this
// script (sleep, sleep2, next, close2, input, menu, select, or prompt),
// another player could click this NPC, trigger getpartymember, and
// overwrite the $@partymember***** variables.
.@count = $@partymembercount;
copyarray .@name$[0], $@partymembername$[0], $@partymembercount;

// list the party member names
for (.@i = 0; .@i < .@count; .@i++)
    mes (.@i + 1) + ". ^0000FF" + .@name$[.@i] + "^000000";
close;
</example_code>
<example_code>
// Example 2: check party count (with a next pause), before warping to event

.register_num = 5; // How many party members are required?

// get the charID and accountID of character's party members
getpartymember getcharid(1), 1;
getpartymember getcharid(1), 2;

if ($@partymembercount != .register_num) {
    mes "Please form a party of " + .register_num + " to continue";
    close;
}

// loop through both and use isloggedin to count online party members
for (.@i = 0; .@i < $@partymembercount; .@i++)
    if (isloggedin($@partymemberaid[.@i], $@partymembercid[.@i]))
        .@count_online++;

// We search accountID & charID because a single party can have multiple
// characters from the same account. Without searching through the charID,
// if a player has 2 characters from the same account inside the party but
// only 1 char online, it would count their online char twice.

if (.@count_online != .register_num) {
    mes "All your party members must be online to continue";
    close;
}

// copy the array to prevent players cheating the system
copyarray .@partymembercid, $@partymembercid, .register_num;

mes "Are you ready?";
next; // careful here
select("Yes");

// When a script hits a next, menu, sleep or input that pauses the script,
// players can invite or /leave and make changes in their party. To prevent
// this, we call getpartymember again and compare with the original values.

getpartymember getcharid(1), 1;
if ($@partymembercount != .register_num) {
    mes "You've made changes to your party!";
    close;
}
for (.@i = 0; .@i < $@partymembercount; .@i++) {
    if (.@partymembercid[.@i] != $@partymembercid[.@i]) {
        mes "You've made changes to your party!";
        close;
    }
}

// Finally, it's safe to start the event!
warpparty "event_map", 0, 0, getcharid(1);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getpartyleader(<party id>{,<type>})
</syntax>

<description>
This function returns some information about the given party ID's leader. When type is omitted, the default information retrieved is the leader's name. Possible types are:

1: Leader account id
2: Leader character id
3: Leader's class
4: Leader's current map name
5: Leader's current level as stored on the party structure (may not be current level if leader leveled up recently)

If retrieval fails (leader not found or party does not exist), this function returns "null" instead of the character name, and -1 for the other types.

<example_code>
.@party_id = getcharid(1);
if (.@party_id) {
    .@leader_name$ = getpartyleader(.@party_id);
    mes "Party leader: " + .@leader_name$;
    .@leader_class = getpartyleader(.@party_id, 3);
    mes "Leader class: " + .@leader_class;
} else {
    mes "You are not in a party.";
}
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*is_party_leader({<party ID>})
</syntax>

<description>
This command will return true if the player attached to the script is the leader of his/her party, or, if a party ID is specified, of that party.

<example_code>
// Check if attached player is their own party's leader
if (is_party_leader())
    mes "You are the leader of your party!";
else
    mes "You are not the party leader.";
</example_code>
<example_code>
// Check if attached player is the leader of party ID 10007
if (is_party_leader(10007))
    mes "You are the leader of party 10007!";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*party_create("<party name>"{,<character id>{,<item share>,<item share type>}});
</syntax>

<description>
Organizes a party with the attached or specified character as leader. If successful, the command returns 1 and sets the global temporary variable $@party_create_id to the ID of the party created.

Additionally, item sharing options can be provided:
- Item Share: 0-Each Take (default), 1-Party Share
- Item Share Type: 0-Each Take (default), 1-Even Share

These values are returned upon failure:
0: Unknown error.
-1: Player not found.
-2: Player already has a party.
-3: Party name exists.

<example_code>
// Create a party with attached player as leader
.@result = party_create("MyAwesomeParty");
if (.@result == 1)
    mes "Party created with ID: " + $@party_create_id;
else
    mes "Failed to create party. Error code: " + .@result;
</example_code>
<example_code>
// Create a party with item share enabled
.@result = party_create("SharedParty", getcharid(0), 1, 1);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*party_destroy(<party id>);
</syntax>

<description>
Disbands a party. The command returns 1 upon success and 0 upon failure.

<example_code>
// Disband the attached player's party
.@party_id = getcharid(1);
if (.@party_id && party_destroy(.@party_id))
    mes "Party disbanded successfully!";
else
    mes "Failed to disband party.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*party_addmember(<party id>,<character id>);
</syntax>

<description>
Adds a player to an existing party.

The command returns 1 upon success, and these values upon failure:
0: Unknown error.
-1: Player not found.
-2: Player already has a party.
-3: Party not found.
-4: Party is full.
-5: Another character from the same account is already in the party.

<example_code>
// Add player with character ID 150001 to party ID 10007
.@result = party_addmember(10007, 150001);
if (.@result == 1)
    mes "Player added to party successfully!";
else
    mes "Failed to add player. Error code: " + .@result;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*party_delmember({<character id>,<party id>});
</syntax>

<description>
Removes a player from his/her party. If no player is specified, the command will run for the invoking player. If that player is the only party member remaining, the party will be disbanded.

The command returns 1 upon success, and these values upon failure:
0: Unknown error.
-1: Player not found.
-2: Party not found.
-3: Player is not in the party.

<example_code>
// Remove attached player from their party
.@result = party_delmember();
if (.@result == 1)
    mes "You have been removed from the party.";
else
    mes "Failed to remove from party. Error code: " + .@result;
</example_code>
<example_code>
// Remove a specific player from a specific party
.@result = party_delmember(150001, 10007);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*party_changeleader(<party id>,<character id>);
</syntax>

<description>
Transfers leadership of a party to the specified character.

The command returns 1 upon success, and these values upon failure:
0: Unknown error.
-1: Party not found.
-2: Player not found.
-3: Player is not in the party.
-4: Player is already party leader.

<example_code>
// Transfer leadership of party 10007 to character 150001
.@result = party_changeleader(10007, 150001);
if (.@result == 1)
    mes "Party leadership transferred successfully!";
else
    mes "Failed to transfer leadership. Error code: " + .@result;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*party_changeoption(<party id>,<option>,<flag>);
</syntax>

<description>
Changes a party option.

Valid options are:
0 - Exp Share (flags: 0-Each Take, 1-Even Share)
1 - Item Share (flags: 0-Each Take, 1-Party Share)
2 - Item Share Type (flags: 0-Each Take, 1-Even Share)

The command returns 1 upon success, and these values upon failure:
0: Invalid option.
-1: Party not found.

<example_code>
// Set party 10007 to Even Share experience
.@result = party_changeoption(10007, 0, 1);
if (.@result == 1)
    mes "Party option changed successfully!";
else
    mes "Failed to change party option. Error code: " + .@result;
</example_code>
<example_code>
// Set party 10007 to Party Share items with Even Share type
party_changeoption(10007, 1, 1); // Item Share: Party Share
party_changeoption(10007, 2, 1); // Item Share Type: Even Share
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*opendressroom({<char_id>});
</syntax>

<description>
This will open the Dress Room window on the client connected to the invoking character.

<example_code>
mes "Close this window to open the Dress Room window.";
close2;
opendressroom();
end;
</example_code>
<example_code>
// Open dress room for another character
opendressroom(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*navigateto("<map>"{,<x>,<y>,<flag>,<hide_window>,<monster_id>,<char_id>});
</syntax>

<description>
Generates a navigation for the attached or specified character. Requires client 2011-10-10aRagEXE or newer.

The flag specifies how the client will calculate the specific route.

Valid flags are:
<example_code>
NAV_NONE // No services
NAV_AIRSHIP_ONLY // Airship only
NAV_SCROLL_ONLY // Scroll only
NAV_AIRSHIP_AND_SCROLL // Airship and Scroll
NAV_KAFRA_ONLY // Kafra only
NAV_KAFRA_AND_AIRSHIP // Kafra and Airship
NAV_KAFRA_AND_SCROLL // Kafra and Scroll
NAV_ALL // All services
</example_code>
When flag is not specified, the default value is NAV_KAFRA_AND_AIRSHIP.

The hide_window specifies whether to display (0) or hide (1) the navigation window. By default the window is hidden.

You can specify the monster_id in combination with a mapname to make the navigation system tell you that you have reached the desired mob.

Note: The client requires custom monster spawns to be in the navigation file for the embedded client Navigation feature to work properly. In this instance, sending the player to the map where the monster spawns is a simpler solution rather than sending the map and the monster_id.

<example_code>
// Navigate to Prontera town center
navigateto("prontera", 150, 150, NAV_ALL, 0);
</example_code>
<example_code>
// Navigate to a monster (find Poring on prontera)
navigateto("prontera", 0, 0, NAV_ALL, 0, 1002, getcharid(0));
</example_code>
<example_code>
// Navigate with hidden window for another character
navigateto("payon", 100, 100, NAV_KAFRA_ONLY, 1, 0, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*hateffect(<Hat Effect ID>,<State>);
</syntax>

<description>
This will set a Hat Effect onto the player. The state field allows you to enable (true) or disable (false) the effect on the player. The Hat Effect constants can be found in src/map/script_constants.hpp starting with HAT_EF_.

Requires client 2015-05-13aRagEXE or newer.

<example_code>
// Enable Angel Hat Effect on the attached player
hateffect(HAT_EF_ANGEL, true);
</example_code>
<example_code>
// Disable Hat Effect
hateffect(HAT_EF_ANGEL, false);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getrandomoptinfo(<type>);
</syntax>

<description>
Returns the value of an attribute of the current random option.

Valid attributes are:
ROA_ID - ID of current option
ROA_VALUE - Value field of current option
ROA_PARAM - Param field of current option

This script command is intended for use in random option scripts.

<example_code>
// In a random option script:
.@id = getrandomoptinfo(ROA_ID);
.@value = getrandomoptinfo(ROA_VALUE);
.@param = getrandomoptinfo(ROA_PARAM);
mes "Random Option ID: " + .@id;
mes "Value: " + .@value;
mes "Param: " + .@param;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getequiprandomoption(<equipment index>,<index>,<type>{,<char id>});
</syntax>

<description>
Returns the value of an attribute of a random option on an equipped item.

See getequipid for a full list of valid equipment slots.

index parameter can be 0 to MAX_ITEM_RDM_OPT-1 (default 0-4).

For valid attribute types, see the getrandomoptinfo command reference.

<example_code>
// Get the first random option ID from the equipped weapon
.@opt_id = getequiprandomoption(EQI_HAND_R, 0, ROA_ID);
mes "Weapon random option ID: " + .@opt_id;

// Get the value of the second random option from another character's armor
.@opt_value = getequiprandomoption(EQI_ARMOR, 1, ROA_VALUE, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setrandomoption(<equipment slot>,<index>,<id>,<value>,<param>{,<char id>});
</syntax>

<description>
Sets the <index+1>th random option for equipment equipped at <equipment slot> to <id>, <value>, and <param>.

See getequipid for a full list of valid equipment slots.

index parameter can be 0 to MAX_ITEM_RDM_OPT-1 (default 0-4).

ID - ID of random option. See db/item_randomopt_db.yml for constants.
Value - Value of random option
Param - Parameter of random option

<example_code>
// Set the first random option on the equipped weapon
setrandomoption(EQI_HAND_R, 0, RDMOPT_WEAPON_ATTR_FIRE, 10, 0);
</example_code>
<example_code>
// Set the second random option on another character's armor
setrandomoption(EQI_ARMOR, 1, RDMOPT_VAR_MAXHPAMOUNT, 1000, 0, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*randomoptgroup <random option group ID>;
</syntax>

<description>
This command fills the following arrays with the results of a random option group. The random option group IDs are specified in db/(pre-)re/item_randomopt_group.yml.

Arrays - from index 0 to MAX_ITEM_RDM_OPT-1:
.@opt_id[]    - array of random option ID
.@opt_value[] - array of value
.@opt_param[] - array of param

<example_code>
// Fill the arrays using the random option group ID 5 (group used for Crimson weapons)
randomoptgroup(5);

// Create a +9 Crimson Dagger [2] with the Group 5 applied
getitem3 28705, 1, 1, 9, 0, 0, 0, 0, 0, .@opt_id, .@opt_value, .@opt_param;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*clan_join(<clan id>{,<char id>});
</syntax>

<description>
The attached player joins the clan with the <clan id>. On a successful join, true is returned; otherwise, false is returned if the join failed.

If <char id> is specified, the specified player is used rather than the attached one.

<example_code>
// Join the clan with ID 10007
if (clan_join(10007))
    mes "You have successfully joined the clan!";
else
    mes "Failed to join the clan.";
</example_code>
<example_code>
// Join another character to a clan
clan_join(10008, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*clan_leave({<char id>});
</syntax>

<description>
The attached player will leave their clan. On a successful leave, true is returned; otherwise, false is returned if the leave failed.

If <char id> is specified, the specified player is used rather than the attached one.

<example_code>
// Leave the current clan
if (clan_leave())
    mes "You have successfully left the clan!";
else
    mes "Failed to leave the clan.";
</example_code>
<example_code>
// Make another character leave their clan
clan_leave(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*itemlink(<item_id>{,<refine>{,<card0>{,<card1>{,<card2>{,<card3>,{<enchantgrade>{,<RandomIDArray>,<RandomValueArray>,<RandomParamArray>}}}}}}});
</syntax>

<description>
Generates an item link string for an item that can be used for npctalk, message, dispbottom, and broadcast commands. The result is a clickable item name just like SHIFT+Click from a player's inventory/cart/equipment window. This command can be used with mes, but the item name will not be clickable. You should use the script command "mesitemlink" for displaying item links in mes dialogues, if the client supports them.

RandomIDArray, RandomValueArray, and RandomParamArray only work if the client (and server) supports the Item Random Options feature (PACKETVER >= 20150225).

<example_code>
npctalk "Knife [3] : " + itemlink(1201) + "";
</example_code>
<example_code>
npctalk "+16 Knife [3] : " + itemlink(1201, 16) + "";
</example_code>
<example_code>
npctalk "+13 BXB Bapho+VR+EA2+EA1 : " + itemlink(18110, 13, 4147, 4407, 4833, 4832) + "";
</example_code>
<example_code>
setarray .@opt_ids[0], RDMOPT_VAR_ATKPERCENT, RDMOPT_VAR_ATKPERCENT, RDMOPT_VAR_ATTMPOWER, 0, 0;
setarray .@opt_values[0], 3, 5, 20, 0, 0;
setarray .@opt_params[0], 0, 0, 0, 0, 0;
npctalk "+13 BXB Bapho+VR+EA2+EA1 + 3 Options : " + itemlink(18110, 13, 4147, 4407, 4833, 4832, 0, .@opt_ids, .@opt_values, .@opt_params) + "";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mesitemlink(<item_id>{,<use_brackets>{,<display_name>}});

*mesitemlink(<"item_name">{,<use_brackets>{,<display_name>}});
</syntax>

<description>
Generates an item link string for an item and can be used with an NPC's mes command. The NPC message will show the item's name which will be clickable and opens the item description client-side.

By default, <use_brackets> is true, which surrounds the link with brackets. Send false to disable.

By default, the link will be created with the name of the item stored in the item database, but in some cases it may be necessary to overwrite the <display_name> with something else.

<example_code>
mes mesitemlink(1201); // Will display "[Knife]" and will be clickable. If clicked, it opens the description for Knife [3]
mes mesitemlink("Knife"); // Will display "[Knife]" and will be clickable. If clicked, it opens the description for Knife [3]
mes "Bring me a " + mesitemlink(1201) + "."; // Will display "Bring me a [Knife]." and "[Knife]" will be clickable
mes "Bring me a " + mesitemlink(1201, false) + "."; // Will display "Bring me a Knife." and "Knife" will be clickable
mes "Bring me a " + mesitemlink(1201, true, "Super cutting knife") + "."; // Will display "Bring me a [Super cutting knife]." and "[Super cutting knife]" will be clickable
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*mesitemicon(<item_id>{,<display_name>});
</syntax>

<description>
Generates an item icon string for an item and can be used with an NPC's mes command. The NPC message will show the item's icon which will be clickable and opens the item description client-side.

If the feature is disabled, by default the database name of the item will be used. However, if you provide a <display_name>, this name will be displayed instead.

<example_code>
mes mesitemicon(1201); // Will display a Knife icon and will be clickable. If clicked, it opens the description for Knife [3]
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_create "<chname>","<alias>"{,"<password>"{,<option>{,<delay>{,<color>{,<char_id>}}}}};
</syntax>

<description>
Creates a public channel with <chname> as the channel name. To protect the channel, use <password> or write "null" to create it without a password. Channel name must start with '#' and cannot be the same as the map or ally channel names.

<alias> will be used to change the channel name when the channel message is displayed.

<option> values are:
<example_code>
CHAN_OPT_BASE           // Default option including CHAN_OPT_ANNOUNCE_SELF|CHAN_OPT_MSG_DELAY|CHAN_OPT_CAN_CHAT|CHAN_OPT_CAN_LEAVE
CHAN_OPT_ANNOUNCE_SELF  // Show info for the player itself if the player has joined/left the channel
CHAN_OPT_ANNOUNCE_JOIN  // Display message when a player is joining the channel
CHAN_OPT_ANNOUNCE_LEAVE // Display message when a player is leaving the channel
CHAN_OPT_MSG_DELAY      // Enable chat delay for the channel
CHAN_OPT_COLOR_OVERRIDE // Player's unique font color will override the channel's color
CHAN_OPT_CAN_CHAT       // Player can chat in the channel
CHAN_OPT_CAN_LEAVE      // Player can leave the channel
CHAN_OPT_AUTOJOIN       // Players will auto//join the channel at login
</example_code>
The <delay> is the minimum chat delay in milliseconds for a single player before the player can chat again in the same channel.

Use <color> hex code to set the color for this channel; if not defined, the default channel color will be used.

If <char_id> is defined, the channel will be a private channel and the player will be the channel owner.

Returns 1 on success.

<example_code>
/**
 * This example will show the message on this channel as
 * [rAthena] Admin : Hello world!
 * instead of
 * #rathena Admin : Hello world!
 **/
channel_create("#rathena", "[rAthena]");
channel_create("#vip", "[VIP]", "vipmemberonly");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_join "<channel_name>"{, <char_id>};
</syntax>

<description>
Joins an existing channel.

The command returns 0 upon success, and these values upon failure:
-1 : Invalid channel or player
-2 : Player already in channel
-3 : Player banned
-4 : Reached max limit

<example_code>
// Join channel "#rathena" for attached player
.@result = channel_join("#rathena");
if (.@result == 0)
    mes "Joined channel successfully!";
else
    mes "Failed to join channel. Error code: " + .@result;
</example_code>
<example_code>
// Join another character to a channel
channel_join("#vip", 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_setopt "<chname>",<option>,<value>;
</syntax>

<description>
Sets an option for the channel. Use 1 in <value> to set it, or 0 to unset. The <option> values are the same as the channel_create options.

For CHAN_OPT_MSG_DELAY, the delay in milliseconds must be sent, or use 0 to remove the delay in <value>.

Returns 1 on success.

Only works for public and private channels.

<example_code>
// Example to set delay
channel_setopt("#global", CHAN_OPT_MSG_DELAY, 5000);
</example_code>
<example_code>
// Disable auto-join for a channel
channel_setopt("#vip", CHAN_OPT_AUTOJOIN, 0);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_getopt "<chname>",<option>;
</syntax>

<description>
Gets the option value for the channel. The <option> values are the same as the channel_create options. Returns true or false except for CHAN_OPT_MSG_DELAY, which returns an integer.

Only works for public and private channels.

<example_code>
// Example to get the delay
.delay = channel_getopt("#global", CHAN_OPT_MSG_DELAY);
mes "Channel delay: " + .delay + " ms";
</example_code>
<example_code>
// Check if a channel has auto-join enabled
if (channel_getopt("#vip", CHAN_OPT_AUTOJOIN))
    mes "This channel has auto-join enabled.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_setcolor "<chname>",<color>;
</syntax>

<description>
Changes the channel color. <color> uses hex RGB values.

Returns 1 on success.

<example_code>
// Change channel color to red
channel_setcolor("#global", 0xFF0000);
</example_code>
<example_code>
// Change channel color to blue
channel_setcolor("#vip", 0x0000FF);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_setpass "<chname>","<password>";
</syntax>

<description>
Sets, unsets, or changes the password of a channel. Use "null" to remove the password.

Returns 1 on success.

Only works for public and private channels.

<example_code>
// Set a password for the channel
channel_setpass("#global", "secret123");
</example_code>
<example_code>
// Remove the password from the channel
channel_setpass("#global", "null");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_setgroup "<chname>",<group_id>{,...,<group_id>};

*channel_setgroup2 "<chname>",<array_of_groups>;
</syntax>

<description>
Sets group restrictions for a channel. Only players with matching <group_id> are allowed to join the channel.

By using 0 in the first group channel, the group restriction will be removed from the channel configuration.

channel_setgroup2 receives input for the group list as an array.

Returns 0 on failure, and 1 (or n groups count) on success.

Only works for public and private channels.

<example_code>
// Example 1: Remove groups
channel_setgroup("#event", 0);
</example_code>
<example_code>
// Example 2: Multiple values
channel_setgroup("#vip", 2, 5);
</example_code>
<example_code>
// Example 3: Using array
setarray .@staffs[0], 2, 3, 4, 10, 99;
channel_setgroup2("#staff", .@staffs);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_setgroup2 "<chname>",<array_of_groups>;

*channel_setgroup "<chname>",<group_id>{,...,<group_id>};
</syntax>

<description>
Sets group restrictions for a channel. Only players with matching <group_id> are allowed to join the channel.

By using 0 in the first group channel, the group restriction will be removed from the channel configuration.

channel_setgroup2 receives input for the group list as an array.

Returns 0 on failure, and 1 (or n groups count) on success.

Only works for public and private channels.

<example_code>
// Example 1: Remove groups
channel_setgroup("#event", 0);
</example_code>
<example_code>
// Example 2: Multiple values
channel_setgroup("#vip", 2, 5);
</example_code>
<example_code>
// Example 3: Using array
setarray .@staffs[0], 2, 3, 4, 10, 99;
channel_setgroup2("#staff", .@staffs);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_chat "<chname>","<message>"{,<color>};
</syntax>

<description>
Sends a message to the channel.

Returns 1 on success.

<example_code>
// Example if channel doesn't have alias
channel_chat("#rathena", "Hello World!"); // #rathena Hello World!
</example_code>
<example_code>
// Example if channel has alias
channel_chat("#rathena", "Hello World!"); // [rAthena] Hello World!
</example_code>
<example_code>
// Send a colored message to the channel
channel_chat("#vip", "Important announcement!", 0xFF0000);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_ban "<chname>",<char_id>;
</syntax>

<description>
Bans a player from a public or private channel. The channel's owner or a group with PC_PERM_CHANNEL_ADMIN cannot be banned.

Returns 1 on success.

<example_code>
// Ban character 150001 from channel "#global"
channel_ban("#global", 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_unban "<chname>",<char_id>;
</syntax>

<description>
Unbans a player from a public or private channel.

Returns 1 on success.

<example_code>
// Unban character 150001 from channel "#global"
channel_unban("#global", 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_kick "<chname>",<char_id>;

*channel_kick "<chname>","<char_name>";
</syntax>

<description>
Kicks a player from a public or private channel. The channel's owner or a group with PC_PERM_CHANNEL_ADMIN cannot be kicked.

Returns 1 on success.

<example_code>
// Kick character 150001 from channel "#global"
channel_kick("#global", 150001);
</example_code>
<example_code>
// Kick player by name from channel "#vip"
channel_kick("#vip", "BadPlayer");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*channel_delete "<chname>";
</syntax>

<description>
Deletes an existing public or private channel. Cannot delete ally or local map channels.

Returns 0 on success.

<example_code>
// Delete channel "#global"
channel_delete("#global");
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*achievementadd(<achievement id>{,<char id>})
</syntax>

<description>
This function will add an achievement to the player's log for the attached player or the supplied <char id>. The objective requirements are not ignored when using this function.

Returns true on success and false on failure.

<example_code>
// Add achievement 1001 to attached player
if (achievementadd(1001))
    mes "Achievement unlocked!";
else
    mes "Failed to add achievement.";
</example_code>
<example_code>
// Add achievement to another character
achievementadd(1002, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*achievementremove(<achievement id>{,<char id>})
</syntax>

<description>
This function will remove an achievement from the player's log for the attached player or the supplied <char id>.

Returns true on success and false on failure.

<example_code>
// Remove achievement 1001 from attached player
if (achievementremove(1001))
    mes "Achievement removed!";
else
    mes "Failed to remove achievement.";
</example_code>
<example_code>
// Remove achievement from another character
achievementremove(1002, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*achievementinfo(<achievement id>,<type>{,<char id>})
</syntax>

<description>
This function will return the specified <type> value for an achievement of the attached player or the supplied <char id>. If the player does not have the achievement active (no progress has been made): if the achievement does not exist, -1 will be returned, or -2 will be returned on any other error such as an invalid <type>.

Valid types:
<example_code>
ACHIEVEINFO_COUNT1
ACHIEVEINFO_COUNT2
ACHIEVEINFO_COUNT3
ACHIEVEINFO_COUNT4
ACHIEVEINFO_COUNT5
ACHIEVEINFO_COUNT6
ACHIEVEINFO_COUNT7
ACHIEVEINFO_COUNT8
ACHIEVEINFO_COUNT9
ACHIEVEINFO_COUNT10
ACHIEVEINFO_COMPLETE
ACHIEVEINFO_COMPLETEDATE
ACHIEVEINFO_GOTREWARD
ACHIEVEINFO_LEVEL // (<achievement id> is useless for this)
ACHIEVEINFO_SCORE // (<achievement id> is useless for this)
</example_code>
<example_code>
// Check if achievement 1001 is complete
.@complete = achievementinfo(1001, ACHIEVEINFO_COMPLETE);
if (.@complete)
    mes "Achievement 1001 is complete!";
</example_code>
<example_code>
// Get achievement level for attached player
.@level = achievementinfo(0, ACHIEVEINFO_LEVEL);
mes "Your achievement level: " + .@level;
</example_code>
<example_code>
// Get count1 progress for another character
.@count = achievementinfo(1002, ACHIEVEINFO_COUNT1, 150001);
mes "Progress: " + .@count;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*achievementcomplete(<achievement id>{,<char id>})
</syntax>

<description>
This function will complete an achievement for the attached player or the supplied <char id>. The objective requirements are ignored when using this function.

Returns true on success and false on failure.

<example_code>
// Complete achievement 1001 for attached player
if (achievementcomplete(1001))
    mes "Achievement 1001 completed!";
else
    mes "Failed to complete achievement.";
</example_code>
<example_code>
// Complete achievement for another character
achievementcomplete(1002, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*achievementexists(<achievement id>{,<char id>});
</syntax>

<description>
This function will return true if the achievement exists for the player or the supplied <char id> and is completed. Returns false otherwise.

<example_code>
// Check if achievement 1001 is completed for attached player
if (achievementexists(1001))
    mes "You have completed achievement 1001!";
else
    mes "You have not completed achievement 1001 yet.";
</example_code>
<example_code>
// Check for another character
if (achievementexists(1002, 150001))
    mes "That player has completed achievement 1002.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*achievementupdate(<achievement id>,<type>,<value>{,<char id>})
</syntax>

<description>
This function will update an achievement's value for an achievement of the attached player or the supplied <char id>. If the player does not have the achievement active (no progress has been made), it will be added to the player's log first before updating the <type> value.

Returns true on success and false on failure.

See achievementinfo for valid <type> values.
- ACHIEVEINFO_COMPLETE, ACHIEVEINFO_COMPLETEDATE, and ACHIEVEINFO_GOTREWARD require the specific value returned from gettimetick(2).
- Excludes ACHIEVEINFO_LEVEL and ACHIEVEINFO_SCORE.

<example_code>
// Update count1 for achievement 1001
achievementupdate(1001, ACHIEVEINFO_COUNT1, 5);

// Complete achievement with timestamp
.@timestamp = gettimetick(2);
achievementupdate(1002, ACHIEVEINFO_COMPLETE, .@timestamp);
</example_code>
<example_code>
// Update for another character
achievementupdate(1003, ACHIEVEINFO_COUNT2, 10, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*addfame(<amount>,{,<char id>})
</syntax>

<description>
Increases the fame of the attached player or the supplied <char id> by the <amount> given.

Note: Only works with classes that use the ranking system.

<example_code>
// Increase attached player's fame by 10
addfame(10);
</example_code>
<example_code>
// Increase another character's fame by 50
addfame(50, 150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getfame({<char id>})
</syntax>

<description>
Gets the fame points of the attached player or the supplied <char id>.

Note: Only works with classes that use the ranking system.

<example_code>
// Get attached player's fame points
.@fame = getfame();
mes "Your fame points: " + .@fame;
</example_code>
<example_code>
// Get another character's fame points
.@fame = getfame(150001);
mes "That player's fame points: " + .@fame;
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*getfamerank({<char id>})
</syntax>

<description>
Returns the fame rank (starting from 1 to MAX_FAME_LIST), otherwise returns 0.

Note: Only works with classes that use the ranking system.

<example_code>
// Get attached player's fame rank
.@rank = getfamerank();
if (.@rank > 0)
    mes "Your fame rank: " + .@rank;
else
    mes "You are not ranked.";

// Get another character's fame rank
.@rank = getfamerank(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*isdead({<account id>})
</syntax>

<description>
Returns true if the player is dead, otherwise false.

<example_code>
// Check if attached player is dead
if (isdead())
    mes "You are dead!";
else
    mes "You are alive.";
</example_code>
<example_code>
// Check if another character is dead
if (isdead(2000000))
    mes "That player is dead.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*has_autoloot({<char_id>});
</syntax>

<description>
This command checks whether a player has configured autoloot. Returns the current autoloot value on success.

<example_code>
// Check attached player's autoloot setting
.@autoloot = has_autoloot();
if (.@autoloot > 0)
    mes "Autoloot is enabled with rate: " + .@autoloot;
else
    mes "Autoloot is disabled.";
</example_code>
<example_code>
// Check another character's autoloot
.@autoloot = has_autoloot(150001);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*autoloot({<rate>{, <char_id>}});
</syntax>

<description>
This command sets the rate of autoloot.

If no rate is provided and the user has autoloot disabled, it will default to 10000 = 100% (enabled). If the user has autoloot enabled, it will default to 0 = 0% (disabled).

Returns true on success and false on failure.

<example_code>
autoloot();      // toggle on/off depending on existing autoloot
autoloot(0);     //   0.00% or off
autoloot(100);   //   1.00%
autoloot(3333);  //  33.33%
autoloot(10000); // 100.00%
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setdialogalign(<align>);
</syntax>

<description>
Sets vertical or horizontal alignment in the NPC dialog.

Valid aligns:
- Horizontal align:
<example_code>
DIALOG_ALIGN_LEFT
DIALOG_ALIGN_CENTER
DIALOG_ALIGN_RIGHT
</example_code>
- Vertical align:
<example_code>
DIALOG_ALIGN_TOP
DIALOG_ALIGN_MIDDLE
DIALOG_ALIGN_BOTTOM
</example_code>
<example_code>
// Center the dialog text
setdialogalign(DIALOG_ALIGN_CENTER);
mes "This text is centered!";

// Reset to left alignment
setdialogalign(DIALOG_ALIGN_LEFT);
mes "This text is left aligned.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setdialogsize(<width>, <height>)
</syntax>

<description>
Sets the size for the NPC dialog in pixels.

<example_code>
// Set dialog size to 400x300 pixels
setdialogsize(400, 300);
mes "This message appears in a larger dialog box!";
</example_code>
<example_code>
// Reset to default size
setdialogsize(0, 0);
mes "This message appears in the default dialog box.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setdialogpos(<x>, <y>)
</syntax>

<description>
Sets the position for the NPC dialog in pixels.

<example_code>
// Move dialog to position (100, 50)
setdialogpos(100, 50);
mes "This dialog appears at position (100, 50)!";
</example_code>
<example_code>
// Reset to default position
setdialogpos(0, 0);
mes "This dialog appears at the default position.";
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*setdialogpospercent(<x>, <y>)
</syntax>

<description>
Sets the position for the NPC dialog as a percentage of screen size.

<example_code>
// Position dialog at 25% from left and 30% from top
setdialogpospercent(25, 30);
mes "This dialog appears at the specified percentage position.";
</example_code>
<example_code>
// Reset to default
setdialogpospercent(0, 0);
</example_code>
</description>
---------------------- Breakline ----------------------
<syntax>
*OnInit:
    <code>
end;
</syntax>
<description>
OnInit will execute every time the scripts loading is complete, including when
they are reloaded with @reloadscript or @reloadnpcfile command. 

<example_code>
-   script  InitializationExample   -1,{
    OnTouch:
        mes "[System]";
        mes "The current global counter is: " + $GlobalCounter;
        close;

    OnInit:
        // Initialize global variables when the script loads
        $GlobalCounter = 0;
        debugmes "InitializationExample: GlobalCounter has been reset to 0.";
        end;
}
</example_code>
</description>
---------------------- Breakline ----------------------
`;