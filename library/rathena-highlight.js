/* This keywords is the Data we can use for rathena syntax highlights and custom autocomplete */
const itemCommands = [
  "getitem", "getitem2", "getitem3", "getinventorylist", "getitemname",
  "clearitem", "equip", "autoequip", "itemskill", "getarraysize",
  "rentitem", "rentitem2", "rentitem3", "rentitem4",
  "delitem", "delitem2", "delitem3", "delitem4",
  "countitem", "countitem2", "countitem3", "countitem4",
  "cartcountitem", "getitembound", "getitembound2", "getitembound3",
  "getequipid", "getequipcardid", "isequipped"
].join("|");

const functionCommands = [
  "callfunc", "sleep", "strcharinfo", "strnpcinfo", "input", "select", "rand",
  "unitwarp", "unittalk", "getfreecell", "initnpctimer", "getnpcid", "duplicate",
  "readparam", "gettimetick", "getgroupid", "getcharid", "getmapxy",
  "getequipisequiped", "getequipname", "mobcount"
].join("|");

const variableCommands = [
  "set", "setarray", "copyarray", "cleararray", "setrandomoption",
  "bStr", "bAgi", "bVit", "bInt", "bDex", "bLuk", "Zeny", "Weight", "MaxWeight"
].join("|");

const controlStructures = [
  "if", "else", "switch", "case", "default",
  "while", "for", "break", "end", "script", "goto", "return"
].join("|");

const dialogCommands = [
  "mes", "next", "close", "close2", "npctalk", "waitingroom", "delwaitingroom",
  "menu", "announce", "message", "emotion", "showscript", "cutin", "monster", "callsub"
].join("|");

const systemCommands = [
  "recalculatestat", "jobcanentermap", "freeloop", "get_revision",
  "get_githash", "getbattleflag", "function"
].join("|");


const mapCommands = [
  "pvpon", "pvpoff", "navigateto", "mapflag", "warpwaitingpc", "shop", "itemshop",
  "callshop", "pcblockmove", "sleep", "sleep2", "progressbar", "warp",
  "attachrid", "mapannounce", "killmonsterall"
].join("|");

const channelCommands = [
  "channel_chat", "channel_ban", "channel_kick", "channel_unban",
  "channel_delete", "channel_setgroup", "channel_setgroup2"
].join("|");

const petCommands = [
  "petloot", "petrecovery", "petskillbonus", "petskillsupport",
  "petskillattack", "petskillattack2"
].join("|");

const scCommands = [
  "sc_start", "sc_start2", "sc_start4", "sc_end", "sc_end_class"
].join("|");

const bonusCommands = [
  "bonus", "bonus2", "bonus3", "bonus4", "bonus5",
  "autobonus", "autobonus2", "autobonus3",
  "statusup2", "specialeffect2", "specialeffect", "percentheal"
].join("|");

const atCommands = [
  "atcommand", "charcommand", "bindatcmd", "unbindatcmd", "useatcmd"
].join("|");

const trueOrFalse = [
  "true", "TRUE", "false", "FALSE"
].join("|");

const operators = [
  "\\+", "\\*", "\\/", "-", "%", "=", "==", "!=", "<=", ">=", "<", ">", 
  "\\|\\|", "&&", "!", "\\^", "&", "\\|", "\\?"
].join("|");

const mapNames = [
  "prontera", "prt_in", "morocc", "geffen", "gef_fild10", "payon", "pay_arche",
  "alberta", "izlude", "aldebaran", "xmas", "comodo", "yuno", "amatsu", "gonryun",
  "umbala", "niflheim", "louyang", "ayothaya", "jawaii", "einbroch", "lighthalzen",
  "einbech", "hugel", "rachel", "veins", "moscovia", "mid_camp", "manuk", "splendide",
  "brasilis", "dicastes01", "mora", "dewata", "malangdo", "malaya", "eclage", "lasagna",
  "new_1-1", "new_1-2", "turbo_room", "moc_ruins", "thor_camp", "ecl_in01", "kame_house"
].join("|");

const varParamNames = [
  "EQI_COSTUME_HEAD_TOP",
  "EQI_COSTUME_HEAD_MID",
  "EQI_COSTUME_HEAD_LOW",
  "EQI_COSTUME_GARMENT",
  "bc_all",
  "bc_map",
  "bc_self",
  "bc_area"
].join("|");

const boundConstant = [
  "BOUND_CHAR",
  "BOUND_ACCOUNT",
  "RDMOPT_VAR_STRAMOUNT",
  "RDMOPT_VAR_AGIAMOUNT",
  "RDMOPT_VAR_VITAMOUNT",
  "RDMOPT_VAR_INTAMOUNT",
  "RDMOPT_VAR_DEXAMOUNT",
  "RDMOPT_VAR_LUKAMOUNT"
].join("|");

const emotionConstants = [
  "ET_SURPRISE", "ET_QUESTION", "ET_DELIGHT", "ET_THROB", "ET_SWEAT", "ET_AHA", "ET_FRET", "ET_ANGER", "ET_MONEY", "ET_THINK",
  "ET_SCISSOR", "ET_ROCK", "ET_WRAP", "ET_FLAG", "ET_BIGTHROB", "ET_THANKS", "ET_KEK", "ET_SORRY", "ET_SMILE", "ET_PROFUSELY_SWEAT",
  "ET_SCRATCH", "ET_BEST", "ET_STARE_ABOUT", "ET_HUK", "ET_O", "ET_X", "ET_HELP", "ET_GO", "ET_CRY", "ET_KIK", "ET_CHUP",
  "ET_CHUPCHUP", "ET_HNG", "ET_OK", "ET_CHAT_PROHIBIT", "ET_INDONESIA_FLAG", "ET_STARE", "ET_HUNGRY", "ET_COOL", "ET_MERONG",
  "ET_SHY", "ET_GOODBOY", "ET_SPTIME", "ET_SEXY", "ET_COMEON", "ET_SLEEPY", "ET_CONGRATULATION", "ET_HPTIME", "ET_PH_FLAG",
  "ET_MY_FLAG", "ET_SI_FLAG", "ET_BR_FLAG", "ET_SPARK", "ET_CONFUSE", "ET_OHNO", "ET_HUM", "ET_BLABLA", "ET_OTL", "ET_DICE1",
  "ET_DICE2", "ET_DICE3", "ET_DICE4", "ET_DICE5", "ET_DICE6", "ET_INDIA_FLAG", "ET_LUV", "ET_FLAG8", "ET_FLAG9", "ET_MOBILE",
  "ET_MAIL", "ET_ANTENNA0", "ET_ANTENNA1", "ET_ANTENNA2", "ET_ANTENNA3", "ET_HUM2", "ET_ABS", "ET_OOPS", "ET_SPIT", "ET_ENE",
  "ET_PANIC", "ET_WHISP", "ET_YUT1", "ET_YUT2", "ET_YUT3", "ET_YUT4", "ET_YUT5", "ET_YUT6", "ET_YUT7", "ET_MAX"
].join("|");

// Your list of custom keywords/functions for Auto Complete
const keywords = [
  itemCommands, functionCommands, variableCommands, controlStructures, dialogCommands, systemCommands,
  mapCommands, channelCommands, petCommands, scCommands, bonusCommands, atCommands, mapNames, varParamNames,
  boundConstant, emotionConstants
].join("|").split("|");

// Custom Completer
const customCompleter = {
  getCompletions: function (editor, session, pos, prefix, callback) {
    if (prefix.length === 0) { callback(null, []); return; }
    const completions = keywords.map(function (word) {
      return {
        caption: word,
        value: word,
        meta: "custom"
      };
    });
    callback(null, completions);
  }
};

const langTools = ace.require("ace/ext/language_tools");
const textCompleter = langTools.textCompleter;
// Set default completer (custom only)
langTools.setCompleters([customCompleter]);

// Toggle checkbox for local autocomplete
document.getElementById("toggleLocalCompletion").addEventListener("change", function () {
  if (this.checked) {
    langTools.setCompleters([customCompleter, textCompleter]);
  } else {
    langTools.setCompleters([customCompleter]);
  }
});

ace.define("ace/mode/rathena_highlight_rules", ["require", "exports", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
  const oop = require("ace/lib/oop");
  const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
  const RathenaHighlightRules = function() {
    this.$rules = {
      "start": [
        { token: "keyword.control", regex: "\\b(?:" + controlStructures + ")\\b" },
        { token: "variable.language", regex: "\\b(?:" + variableCommands + ")\\b" },
        { token:"support.function.dialog",regex:"\\b(?:" + dialogCommands + ")\\b", onMatch:function(v,s,st,l){let i=l.indexOf(v);return i>0&&(/[.@\\w]/.test(l[i-1]))?"identifier":this.token;}},
        { token: "support.function.item", regex: "\\b(?:" + itemCommands + ")\\b" },
        { token: "support.function.map", regex: "\\b(?:" + mapCommands + ")\\b" },
        { token: "support.function.pet", regex: "\\b(?:" + petCommands + ")\\b" },
        { token: "support.function.channel", regex: "\\b(?:" + channelCommands + ")\\b" },
        { token: "support.function.sc", regex: "\\b(?:" + scCommands + ")\\b" },
        { token: "support.function.bonus", regex: "\\b(?:" + bonusCommands + ")\\b" },
        { token: "support.function.system", regex: "\\b(?:" + systemCommands + ")\\b" },
        { token: "support.function.atcmd", regex: "\\b(?:" + atCommands + ")\\b" },
        { token: "support.function.rathena", regex: "(?<![@\\w\\.])\\b(?:" + functionCommands + ")\\b" },
        { token: "variable.parameter", regex: "\\b(?:" + mapNames + ")\\b" },
        { token: "variable.parameter", regex: "\\b(?:" + varParamNames + ")\\b" },
        { token: "variable.parameter", regex: "\\b(?:" + emotionConstants + ")\\b" },
        { token: "variable.parameter", regex: "\\b(?:" + boundConstant + ")\\b" },
        { token: "constant.numeric", regex: "\\b(?:" + trueOrFalse + ")\\b" },
        { token: "keyword.control", regex: "\\bOn\\w+:" },
        { token: "string", regex: '".*?"' },
        { token: "constant.numeric", regex: "\\b\\d+\\b" },
        { token: "comment.line", regex: "//.*$" },
        { token: "comment.block.start", regex: "/\\*", next: "comment" },
        { token: "keyword.operator", regex: new RegExp("(?:" + operators + ")") }
      ],

      comment: [
        { token: "comment.block.end", regex: "\\*/", next: "start" },
        { token: "comment.block", regex: "[^*]+" },
        { token: "comment.block", regex: "\\*" }
      ]
    };

    this.normalizeRules();
  };

  oop.inherits(RathenaHighlightRules, TextHighlightRules);
  exports.RathenaHighlightRules = RathenaHighlightRules;
});

ace.define("ace/mode/rathena", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/behaviour/cstyle", "ace/mode/rathena_highlight_rules"], function(require, exports) {
  const oop = require("ace/lib/oop");
  const TextMode = require("ace/mode/text").Mode;
  const RathenaHighlightRules = require("ace/mode/rathena_highlight_rules").RathenaHighlightRules;
  var CstyleBehaviour = require("ace/mode/behaviour/cstyle").CstyleBehaviour;
  const Mode = function() {
    this.HighlightRules = RathenaHighlightRules;
    this.$behaviour = new CstyleBehaviour();
    this.$id = "ace/mode/rathena";
  };

  oop.inherits(Mode, TextMode);
  exports.Mode = Mode;
});