ace.define("ace/mode/rathena_highlight_rules", ["require", "exports", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
  const oop = require("ace/lib/oop");
  const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

  const RathenaHighlightRules = function() {
    const itemCommands = "getitem|getitem2|getitem3|getinventorylist|getitemname|clearitem|equip|autoequip|itemskill|getarraysize|rentitem|rentitem2|rentitem3|rentitem4|delitem|delitem2|delitem3|delitem4|countitem|countitem2|countitem3|countitem4|cartcountitem|getitembound|getitembound2|getitembound3";
    const functionCommands = "callfunc|sleep|strcharinfo|input|select|rand|unitwarp|getfreecell|initnpctimer|getnpcid|duplicate|readparam";
    const variableCommands = "set|setarray|copyarray|cleararray|setrandomoption|bStr|bAgi|bVit|bInt|bDex|bLuk|Zeny";
    const controlStructures = "if|else|switch|case|default|while|for|break|end|script|goto|function";
    const dialogCommands = "mes|next|close|close2|npctalk|waitingroom|delwaitingroom|menu|announce|message";
    const systemCommands = "recalculatestat|jobcanentermap|freeloop|get_revision|get_githash|getbattleflag";
    const mapCommands = "pvpon|pvpoff|navigateto|mapflag|warpwaitingpc";
    const channelCommands = "channel_chat|channel_ban|channel_kick|channel_unban|channel_delete|channel_setgroup|channel_setgroup2";
    const petCommands = "petloot|petrecovery|petskillbonus|petskillsupport|petskillattack|petskillattack2";
    const scCommands = "sc_start|sc_start2|sc_start4|sc_end|sc_end_class";
    const bonusCommands = "bonus|bonus2|bonus3|bonus4|bonus5|autobonus|autobonus2|autobonus3|statusup2";
    const atCommands = "atcommand|charcommand|bindatcmd|unbindatcmd|useatcmd";
    const mapNames = "prontera|morocc|geffen|gef_fild10|payon|pay_arche|alberta|izlude|aldebaran|xmas|comodo|yuno|amatsu|gonryun|umbala|niflheim|louyang|ayothaya|jawaii|einbroch|lighthalzen|einbech|hugel|rachel|veins|moscovia|mid_camp|manuk|splendide|brasilis|dicastes01|mora|dewata|malangdo|malaya|eclage|lasagna|new_1-1|new_1-2|turbo_room"; // <-- Extend this list

    this.$rules = {
      "start": [
        { token: "keyword.control", regex: "\\b(?:" + controlStructures + ")\\b" },
        { token: "variable.language", regex: "\\b(?:" + variableCommands + ")\\b" },
        { token: "support.function.dialog", regex: "\\b(?:" + dialogCommands + ")\\b" },
        { token: "support.function.item", regex: "\\b(?:" + itemCommands + ")\\b" },
        { token: "support.function.map", regex: "\\b(?:" + mapCommands + ")\\b" },
        { token: "support.function.pet", regex: "\\b(?:" + petCommands + ")\\b" },
        { token: "support.function.channel", regex: "\\b(?:" + channelCommands + ")\\b" },
        { token: "support.function.sc", regex: "\\b(?:" + scCommands + ")\\b" },
        { token: "support.function.bonus", regex: "\\b(?:" + bonusCommands + ")\\b" },
        { token: "support.function.system", regex: "\\b(?:" + systemCommands + ")\\b" },
        { token: "support.function.atcmd", regex: "\\b(?:" + atCommands + ")\\b" },
        { token: "support.function.rathena", regex: "\\b(?:" + functionCommands + ")\\b" },
        { token: "support.function.mapNames", regex: "\\b(?:" + mapNames + ")\\b" },
        { token: "keyword.control", regex: "\\bOn\\w+:" },
        { token: "string", regex: '".*?"' },
        { token: "constant.numeric", regex: "\\b\\d+\\b" },
        { token: "comment.line", regex: "//.*$" },
        { token: "comment.block.start", regex: "/\\*", next: "comment" }
      ],

      comment: [
        { token: "comment.block.end", regex: ".*?\\*/", next: "start" },
        { token: "comment.block", regex: ".+" }
      ]
    };

    this.normalizeRules();
  };

  oop.inherits(RathenaHighlightRules, TextHighlightRules);
  exports.RathenaHighlightRules = RathenaHighlightRules;
});

ace.define("ace/mode/rathena", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/rathena_highlight_rules"], function(require, exports) {
  const oop = require("ace/lib/oop");
  const TextMode = require("ace/mode/text").Mode;
  const RathenaHighlightRules = require("ace/mode/rathena_highlight_rules").RathenaHighlightRules;

  const Mode = function() {
    this.HighlightRules = RathenaHighlightRules;
    this.$id = "ace/mode/rathena";
  };

  oop.inherits(Mode, TextMode);
  exports.Mode = Mode;
});