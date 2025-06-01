/* This keywords is the Data we can use for rathena syntax highlights and custom autocomplete */
const itemKeywords = [
	"getitem","getitem2","getitem3","getitembound","getnameditem","getpartyinventory","getitemgroup","getitemgroupbound","getitemrandom",
	"getitemlink","delitem","delitem2","clearitem","clearpartyinventory","getinventorylist","countitem","checkweight","checkitem","checkworn",
	"countwornitem","hasitem","hasdropitem","getequipid","getequipname","getequipweaponlv","getequiprefinerycnt","getequipisenable","getequipisequiped",
	"getequipoption","getequiprandomoption","getequipcardid","getequipitemid","equip","unequip","getiteminfo","getitemname","getitemslots","getitemlook",
	"getitemscript","getitemtype","getstoragelist","getcartlist","getmailitem","sendmail","openbuyingstore","openitemshop","opensellstore","addtoselllist",
	"bindatcmditem","binditem","setitemscript","bounditem","refine","unrefine","enchant","additemoption","removeitemoption","setrandomoption","itemskill",
	"getitemamount","getchariditem","getitemrate","getgroupitemrate", "getarraysize", "getitembound2", "getitembound3", "getitembound4", "isequipped",
	"rentitem"
];

const npcInteractionKeywords = [
	"mes", "next", "clear", "close", "close2", "close3", "menu", "select", "prompt", "emotion", "dispbottom", "message"
];

const otherBlueKeywords = [
	"rand", "delwaitingroom", "waitingroom", "getfreecell", "unitwarp", "unitskillusepos", "unittalk", "cutin", "announce", "initnpctimer", "stopnpctimer",
	"npctalk", "unitwalk", "bindatcmd", "atcommand", "getcharid", "bonus", "bonus2", "bonus3", "bonus4", "bonus5", "autobonus", "autobonus2", "autobonus3",
	"statusup2", "specialeffect2", "specialeffect", "percentheal", "sc_start", "getnpcid", "duplicate", "readparam", "gettimetick", "getgroupid", 
	"getmapxy", "getskilllv", "checkoption", "checkfalcon", "setfalcon", "query_sql", "mobcount", "monster", "showscript", "strnpcinfo", "strcharinfo",
	"getstrlen", "checkvending", "checkchatting", "escape_sql", "input", "getbattleflag", "debugmes", "freeloop", "roclass", "eaclass", "setlook", "setd",
	"getd", "jobname", "addtimer"
];

const controlFlowKeywords = [
  "if", "else", "switch", "case", "default", "while", "do", "for", "break", "continue",
  "end", "script", "goto", "return", "callfunc", "callsub", "for", "function"
];

const optionsConstant = [
  "Option_Nothing","Option_Sight","Option_Hide","Option_Cloak","Option_Falcon","Option_Riding","Option_Invisible",
  "Option_Orcish","Option_Wedding","Option_Chasewalk","Option_Flying","Option_Xmas","Option_Transform","Option_Summer",
  "Option_Dragon1","Option_Wug","Option_Wugrider","Option_Madogear","Option_Dragon2","Option_Dragon3","Option_Dragon4",
  "Option_Dragon5","Option_Hanbok","Option_Oktoberfest","Option_Dragon","Option_Costume"
];

const equipmentLocConstant = [
	"EQI_HEAD_LOW", "EQI_HEAD_MID", "EQI_HEAD_TOP", "EQI_ARMOR", "EQI_HAND_L", "EQI_HAND_R", "EQI_GARMENT", "EQI_SHOES", "EQI_ACC_L", "EQI_ACC_R", 
	"EQI_COSTUME_HEAD_TOP", "EQI_COSTUME_HEAD_MID", "EQI_COSTUME_HEAD_LOW", "EQI_COSTUME_GARMENT", "EQI_COSTUME_ROBE", "EQI_SHADOW_ARMOR", 
	"EQI_SHADOW_WEAPON", "EQI_SHADOW_SHIELD", "EQI_SHADOW_SHOES", "EQI_SHADOW_ACC_R", "EQI_SHADOW_ACC_L"
];

const boundVars = [
  "BOUND_CHAR", "BOUND_ACCOUNT", "BOUND_GUILD", "BOUND_PARTY", "LOOK_BASE", "LOOK_HAIR", "LOOK_WEAPON", "LOOK_HEAD_BOTTOM", "LOOK_HEAD_TOP", 
  "LOOK_HEAD_MID", "LOOK_HAIR_COLOR", "LOOK_CLOTHES_COLOR", "LOOK_SHIELD", "LOOK_SHOES", "LOOK_BODY2"
];

const randomStatOptionVars = [
  "RDMOPT_VAR_STRAMOUNT", "RDMOPT_VAR_AGIAMOUNT", "RDMOPT_VAR_VITAMOUNT",
  "RDMOPT_VAR_INTAMOUNT", "RDMOPT_VAR_DEXAMOUNT", "RDMOPT_VAR_LUKAMOUNT"
];

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
];

const mapNames = [
  "prontera","prt_castle","prt_church","prt_in","prt_weapon","prt_tool","prt_gld","prt_sewb1","prt_sewb2","prt_sewb3","prt_sewb4","prt_fild00",
  "prt_fild01","prt_fild02","prt_fild03","prt_fild04","prt_fild05","prt_fild06","prt_fild07","prt_fild08","prt_fild09","prt_fild10",
  "morocc","morocc_in","morocc_in02","morocc_in03","morocc_in04","morocc_in05","moc_ruins","moc_fild01","moc_fild02","moc_fild03","moc_fild04",
  "moc_fild05","moc_fild06","moc_fild07","moc_fild08","moc_fild09","moc_fild10","moc_fild11","moc_fild12","moc_fild13","moc_fild14","moc_fild15",
  "moc_fild16","moc_pryd01","moc_pryd02","moc_pryd03","moc_pryd04",
  "geffen","gef_tower", "geffen_in","geffen_tool","geffen_weapon","geffen_armory","geffenblack","geffenia","gef_fild00","gef_fild01","gef_fild02","gef_fild03",
  "gef_fild04","gef_fild05","gef_fild06","gef_fild07","gef_fild08","gef_fild09","gef_fild10","gef_dun00","gef_dun01","gef_dun02","gef_dun03", 
  "payon","payon_in01","payon_in02","payon_in03","payon_in04","pay_arche","pay_gld","pay_fild01","pay_fild02","pay_fild03","pay_fild04",
  "pay_fild05","pay_fild06","pay_fild07","pay_dun00","pay_dun01","pay_dun02","pay_dun03","pay_dun04",
  "alberta", "izlude", "izlude","izlude_in","iz_dun00","iz_dun01","iz_dun02","iz_dun03","iz_dun04","iz_dun05",
  "aldebaran","aldeba_in","alde_alche","alde_gld","alde_dun01","alde_dun02","alde_dun03","alde_dun04","c_tower1","c_tower2","c_tower3","c_tower4","alde_tt02","alde_tt03", 
  "xmas","xmas_in","xmas_fild01","xmas_dun01","xmas_dun02", 
  "comodo","cmd_in01","cmd_in02","cmd_fild01","cmd_fild02","cmd_fild03","cmd_fild04","cmd_fild05","cmd_fild06","cmd_fild07",
  "cmd_fild08","cmd_fild09","beach_dun","beach_dun2","beach_dun3", 
  "yuno","yuno_in01","yuno_in02","yuno_in03","yuno_in04","yuno_fild01","yuno_fild02","yuno_fild03","yuno_fild04","yuno_fild05",
  "yuno_fild06","yuno_fild07","yuno_fild08","yuno_fild09","yuno_fild10","yuno_fild11","yuno_fild12","mag_dun01","mag_dun02","juperos_01","juperos_02","jupe_core", 
  "amatsu","ama_in01","ama_fild01","ama_dun01","ama_dun02","ama_dun03", 
  "gonryun","gon_in","gon_fild01","gon_dun01","gon_dun02","gon_dun03",
  "umbala","um_in","um_fild01","um_fild02","um_fild03","um_fild04","um_dun01","um_dun02", 
  "niflheim","nif_fild01","nif_fild02",
  "louyang", "lou_in01", "lou_in02", "lou_fild01", "lou_dun01", "lou_dun02", "lou_dun03", 
  "ayothaya", "ayo_in01", "ayo_fild01", "ayo_fild02", "ayo_dun01", "ayo_dun02", 
  "jawaii", "jawaii_in01", 
  "einbroch", "einbroch_in", "ein_fild01", "ein_fild02", "ein_fild03", "ein_fild04", "ein_fild05", "ein_fild06", "ein_fild07", "ein_fild08", "ein_fild09",
  "lighthalzen", "lhz_in01", "lhz_in02", "lhz_in03", "lhz_fild01", "lhz_fild02", "lhz_fild03", "lhz_dun01", "lhz_dun02", "lhz_dun03",
  "einbech","ein_in01","ein_fild01","ein_dun01","ein_dun02", 
  "hugel","hu_in01","hu_fild01","hu_fild02","hu_fild03", 
  "rachel","ra_in01","ra_fild01","ra_fild02","ra_fild03","ra_san01","ra_san02","ra_san03", "ra_san04", "ra_san05",
  "veins", "ve_fild03", "moscovia", "mid_camp", "manuk", "splendide","brasilis", "dicastes01", "mora", "dewata", "malangdo", "malaya", "eclage", "lasagna",
  "mjolnir_01","mjolnir_02","mjolnir_03","mjolnir_04","mjolnir_05","mjolnir_06","mjolnir_07","mjolnir_08","mjolnir_09","mjolnir_10","mjolnir_11","mjolnir_12",
  "new_1-1", "new_1-2", "turbo_room", "moc_ruins", "thor_camp", "ecl_in01", "kame_house"
];

const mapCommands = [
  "pvpon", "pvpoff", "navigateto", "mapflag", "warpwaitingpc", "shop", "itemshop", "buyingstore",
  "pointshop", "cashshop", "soundeffect", "soundeffectall", "mapid2name", "removemapflag", "setmapflag",
  "callshop", "pcblockmove", "sleep", "sleep2", "progressbar", "warp", "mapwarp",
  "attachrid", "mapannounce", "killmonsterall", "getmapusers", "enablenpc", "disablenpc"
];

const mapflagConstant = [
  "mf_restricted", "mf_noskill", "mf_novending", "mf_nocommand", "mf_nomemo", "mf_noteleport", "mf_nowarp", "mf_nosave", "mf_nobranch",
  "mf_nopenalty", "mf_nozenypenalty", "mf_pvp","mf_gvg", "mf_battleground", "mf_nightenabled", "mf_snow","mf_fog", "mf_sakura", "mf_leaves",
  "mf_rain", "mf_clouds", "mf_fireworks", "mf_skill_damage", "mf_skill_duration", "mf_loadevent", "mf_instakill"
];

const varHolderKeywords = [
  "set", "setarray", "copyarray", "cleararray",
  "bStr", "bAgi", "bVit", "bInt", "bDex", "bLuk"
];

const specialVarKeywords = [
  "Zeny", "Hp", "MaxHp", "Sp", "MaxSp", "StatusPoint", "SkillPoint", "BaseLevel",
  "JobLevel", "BaseExp", "JobExp", "NextBaseExp", "NextJobExp", "Weight", "MaxWeight",
  "Sex", "Class", "Upper", "BaseClass", "BaseJob", "Karma", "Manner", "Ap", "MaxAp"
];

const trueFalseNull = [
  "true", "false", "null"
];

const inventoryVar = [
	"inventorylist_id", "inventorylist_idx", "inventorylist_amount", "inventorylist_equip", "inventorylist_refine", 
	"inventorylist_identify", "inventorylist_attribute", "inventorylist_card1", "inventorylist_card2", "inventorylist_card3", 
	"inventorylist_card4", "inventorylist_expire", "inventorylist_bound", "inventorylist_enchantgrade", "inventorylist_count", 
	"inventorylist_option_id1", "inventorylist_option_value1", "inventorylist_option_parameter1", "inventorylist_option_id2", 
	"inventorylist_option_value2", "inventorylist_option_parameter2", "inventorylist_option_id3", "inventorylist_option_value3", 
	"inventorylist_option_parameter3", "inventorylist_option_id4", "inventorylist_option_value4", "inventorylist_option_parameter4", 
	"inventorylist_option_id5", "inventorylist_option_value5", "inventorylist_option_parameter5", "inventorylist_tradable", "inventorylist_favorite"
];

const broadcastTargets = [
  "bc_all", "bc_map", "bc_self", "bc_area", "self", "SELF", "area", "AREA",
  "bc_pc", "bc_npc", "bc_yellow", "bc_blue", "bc_woe"
];

const operators = [
  "\\+", "\\*", "\\/", "-", "%", "=", "==", "!=", "<=", ">=", "<", ">", 
  "\\|\\|", "&&", "!", "\\^", "&", "\\|", "\\?"
];

/* Declare the keywords here and to RathenaHighlightRules to display on autocomplete except operators */
const keywords = [
	...itemKeywords, ...npcInteractionKeywords, ...mapCommands, ...otherBlueKeywords,  										// Blue highlight
	...controlFlowKeywords, 																								// Red highlight
	...equipmentLocConstant, ...emotionConstants, ...randomStatOptionVars, ...boundVars, ...broadcastTargets, ...mapNames, 	// Orange highlight
	...mapflagConstant, ...optionsConstant,
	...varHolderKeywords, ...specialVarKeywords, ...inventoryVar, 															// Green highlight
	...trueFalseNull 																										// Violet Highlight
];

const langTools = ace.require("ace/ext/language_tools");
const customCompleter = {
  getCompletions: function (editor, session, pos, prefix, callback) {
    if (!prefix.length) return callback(null, []);
    const completions = keywords.map(word => ({
      caption: word,
      value: word,
      meta: "Keyword"
    }));
    callback(null, completions);
  }
};
langTools.setCompleters([customCompleter]);
document.getElementById("toggleLocalCompletion").addEventListener("change", function () {
  if (this.checked) {
    langTools.setCompleters([customCompleter, langTools.textCompleter]);
  } 
  else {
    langTools.setCompleters([customCompleter]);
  }
});

ace.define("ace/mode/rathena_highlight_rules", ["require", "exports", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
	const oop = require("ace/lib/oop");
	const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
	const RathenaHighlightRules = function () {
		this.$rules = {
		  start: [
		  	{ token: "support.function", regex: "(?<![@\\w\\.])\\b(?:" + [...itemKeywords, ...npcInteractionKeywords, ...mapCommands, ...otherBlueKeywords].join("|") + ")\\b" },
		    { token: "keyword.control", regex: "(?<![@\\w\\.])\\b(?:" + controlFlowKeywords.join("|") + ")\\b" },
		    { token: "variable.parameter", regex: "(?<![@\\w\\.])\\b(?:" + [...optionsConstant, ...broadcastTargets, ...equipmentLocConstant, ...emotionConstants, ...randomStatOptionVars, ...boundVars, ...mapNames, ...mapflagConstant].join("|") + ")\\b" },
		    { token: "variable.language", regex: "(?<![@\\w\\.])\\b(?:" + [...varHolderKeywords, ...specialVarKeywords].join("|") + ")\\b" },
		    { token: "constant.numeric", regex: "(?<![@\\w\\.])\\b(?:" + trueFalseNull.join("|") + ")\\b" },
		    { token: "variable.language", regex: "(@(?:" + inventoryVar.join("|") + "))\\b" },
		    { token: "keyword.control", regex: "\\bOn\\w+:" },
		    { token: "string", regex: '".*?"' },
		    { token: "constant.numeric", regex: "\\b\\d+\\b" },
		    { token: "comment.line", regex: "//.*$" },
		    { token: "comment.block.start", regex: "/\\*", next: "comment" },
		    { token: "keyword.operator", regex: new RegExp("(?:" + operators.join("|") + ")") }
		  ],
		  comment: [
		    { token: "comment.block.end", regex: "\\*/", next: "start" },
		    { token: "comment.block", regex: "[^*]+" },
		    { token: "comment.block", regex: "\\*" }
		  ]
		};
	};

	oop.inherits(RathenaHighlightRules, TextHighlightRules);
	exports.RathenaHighlightRules = RathenaHighlightRules;
});

ace.define("ace/mode/rathena", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/rathena_highlight_rules"], function (require, exports) {
	const oop = require("ace/lib/oop");
	const TextMode = require("ace/mode/text").Mode;
	const RathenaHighlightRules = require("ace/mode/rathena_highlight_rules").RathenaHighlightRules;
	const CstyleBehaviour = require("ace/mode/behaviour/cstyle").CstyleBehaviour;
	const Mode = function () {
		this.HighlightRules = RathenaHighlightRules;
		this.$behaviour = new CstyleBehaviour();
	};
	oop.inherits(Mode, TextMode);
	exports.Mode = Mode;
});