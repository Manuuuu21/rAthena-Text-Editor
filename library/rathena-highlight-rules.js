/* This keywords is the Data we can use for rathena syntax highlights and custom autocomplete */
// Blue highlight - General commands and functions
const supportFunctionKeywords = [
	// Original itemKeywords
	"getitem","getitem2","getitem3","getitembound","getnameditem","getpartyinventory","getitemgroup","getitemgroupbound","getitemrandom",
	"getitemlink","delitem","delitem2","clearitem","clearpartyinventory","getinventorylist","countitem","checkweight","checkitem","checkworn",
	"countwornitem","hasitem","hasdropitem","getequipid","getequipname","getequipweaponlv","getequiprefinerycnt","getequipisenable","getequipisequiped",
	"getequipoption","getequiprandomoption","getequipcardid","getequipitemid","equip","unequip","getiteminfo","getitemname","getitemslots","getitemlook",
	"getitemscript","getitemtype","getstoragelist","getcartlist","getmailitem","sendmail","openbuyingstore","openitemshop","opensellstore","addtoselllist",
	"bindatcmditem","binditem","setitemscript","bounditem","refine","unrefine","enchant","additemoption","removeitemoption","setrandomoption","itemskill",
	"getitemamount","getchariditem","getitemrate","getgroupitemrate", "getarraysize", "getitembound2", "getitembound3", "getitembound4", "isequipped",
	"rentitem", "getmonsterinfo", "playerattached", "getlook",
	// Original npcInteractionKeywords
	"mes", "next", "clear", "close", "close2", "close3", "menu", "select", "prompt", "emotion", "dispbottom", "message",
	// Original mapCommands
	"pvpon", "pvpoff", "navigateto", "mapflag", "warpwaitingpc", "shop", "itemshop", "buyingstore",
	"pointshop", "cashshop", "soundeffect", "soundeffectall", "mapid2name", "removemapflag", "setmapflag",
	"callshop", "pcblockmove", "sleep", "sleep2", "progressbar", "warp", "mapwarp",
	"attachrid", "mapannounce", "killmonsterall", "getmapusers", "enablenpc", "disablenpc",
	// Original otherBlueKeywords (some might be recategorized)
	"rand", "delwaitingroom", "waitingroom", "getfreecell", "unitwarp", "unitskillusepos", "unittalk", "cutin", "announce", "initnpctimer", "stopnpctimer",
	"npctalk", "unitwalk", "bindatcmd", "atcommand", "getcharid", "bonus", "bonus2", "bonus3", "bonus4", "bonus5", "autobonus", "autobonus2", "autobonus3",
	"statusup2", "specialeffect2", "specialeffect", "percentheal", "sc_start", "getnpcid", "duplicate", "readparam", "gettimetick", "getgroupid", 
	"getmapxy", "getskilllv", "checkoption", "checkfalcon", "setcart", "setfalcon", "setriding", "setdragon", "setmadogear", "query_sql", "mobcount", "monster", "showscript", "strnpcinfo", "strcharinfo",
	"getstrlen", "checkvending", "checkchatting", "escape_sql", "input", "getbattleflag", "debugmes", "freeloop", "roclass", "eaclass", "setlook",
	"jobname", "addtimer", "mercenary_create", "mercenary_delete", "mercenary_heal", "mercenary_sc_start", "mercenary_get_calls",
	"mercenary_set_calls", "mercenary_get_faith", "mercenary_set_faith", "getmercinfo", "party_create", "party_destroy", "party_addmember",
	"party_delmember", "party_changeleader", "party_changeoption", "openstorage", "openstorage2", "openmail", "mail", "openauction", "guildopenstorage", "guildopenstorage_log",
	"guild_has_permission", "guildchangegm", "guildgetexp", "guildskill", "resetlvl", "resetstatus", "resetskill", "resetfeel", "resethate",
	"sc_start2", "sc_start4", "sc_end", "sc_end_class", "getstatus", "skilleffect", "npcskilleffect", "removespecialeffect", "removespecialeffect2", "statusup", "traitstatusup", "traitstatusup2",
	"bonus_script", "bonus_script_clear", "skill", "addtoskill", "nude", "sit", "stand", "disguise", "undisguise", "transform", "active_transform",
	"marriage", "wedding", "divorce", "adopt", "pcfollow", "pcstopfollow", "unitblockskill", "errormes", "logmes", "globalmes", "viewpoint",
	"misceffect", "playBGM", "playBGMall", "charcommand", "unbindatcmd", "useatcmd", "camerainfo", "day", "night", "defpattern",
	"activatepset", "deactivatepset", "deletepset", "pow", "sqrt", "distance", "min", "minimum", "max", "maximum", "round", "ceil", "floor", "md5", "query_logsql",
	"setiteminfo", "atoi", "axtoi", "strtol", "compare", "strcmp", "charisalpha", "charat", "setchar", "insertchar", "delchar", "strtoupper",
	"strtolower", "charisupper", "charislower", "substr", "explode", "implode", "sprintf", "sscanf", "strpos", "replacestr", "countstr",
	"preg_match", "setfont", "showdigit", "setcell", "setwall", "delwall", "readbook", "open_roulette", "opendressroom", "hateffect",
	"getrandomoptinfo", "getequiprandomoption", "clan_join", "clan_leave", "geteleminfo", "channel_create", "channel_setopt", "channel_getopt",
	"channel_setcolor", "channel_setpass", "channel_setgroup", "channel_setgroup2", "channel_chat", "channel_ban", "channel_unban",
	"channel_kick", "channel_delete", "achievementadd", "achievementremove", "achievementinfo", "achievementcomplete", "achievementexists",
	"achievementupdate", "areamonster", "areamobuseskill", "killmonster", "strmobinfo", "clone", "summon", "addmonsterdrop", "delmonsterdrop",
	"mob_setidleevent", "hideonnpc", "hideoffnpc", "unloadnpc", "cloakonnpc", "cloakoffnpc", "isnpccloaked", "doevent", "donpcevent", "cmdothernpc", "chatmes", "setnpcdisplay",
	"deltimer", "addtimercount", "startnpctimer", "setnpctimer", "getnpctimer", "attachnpctimer", "detachnpctimer", "awake", "progressbar_npc",
	"unitwalkto", "unitattack", "unitkill", "unitstopattack", "unitstopwalk", "unitskilluseid", "unitexists", "getunittype", "getunitname",
	"setunitname", "setunittitle", "getunittitle", "getunitdata", "setunitdata", "npcskill", "instance_create", "instance_destroy", "instance_enter",
	"instance_npcname", "instance_mapname", "instance_id", "instance_warpall", "instance_announce", "instance_check_party", "instance_check_guild",
	"instance_check_clan", "instance_info", "instance_live_info", "getvariableofinstance", "questinfo", "questinfo_refresh", "setquest", "completequest",
	"erasequest", "changequest", "checkquest", "isbegin_quest", "showevent", "waitingroom2bg_single", "waitingroom2bg", "bg_create", "bg_join",
	"bg_team_setxy", "bg_reserve", "bg_unbook", "bg_desert", "bg_warp", "bg_monster", "bg_monster_set_team", "bg_leave", "bg_destroy",
	"areapercentheal", "bg_get_data", "bg_getareausers", "bg_updatescore", "bg_info", "bpet", "birthpet", "pet", "catchpet", "makepet", "getpetinfo",
	"petskillbonus", "petrecovery", "petloot", "petskillsupport", "petskillattack", "petskillattack2", "homevolution", "morphembryo",
	"hommutate", "checkhomcall", "gethominfo", "homshuffle", "addhomintimacy", "getguildname", "getpartymember", "getguildmember", "getguildmaster",
	"getguildmasterid", "is_guild_leader", "getcastlename", "getcastledata", "setcastledata", "getgdskilllv", "requestguildinfo", "getmapguildusers",
	"maprespawnguildid", "agitstart", "agitend", "agitstart2", "agitend2", "agitstart3", "agitend3", "gvgon", "gvgoff", "gvgon3", "gvgoff3", "flagemblem", "guardian", "guardianinfo",
	"getguildalliance", "getskilllist", "skillpointcount", "getscrate", "checkweight2", "checkoption1", "checkoption2", "setoption",
	"checkcart", "checkfalcon", "checkriding", "checkdragon", "checkmadogear", "checkmounting", "checkwug", "checkidle", "checkidlehom", "checkidlemer",
	"agitcheck2", "agitcheck3", "isnight", "isday", "checkre", "isequippedcnt", "checkequipedcard", "jobcanentermap", "checkcell", "checkwall",
	"getequipuniqueid", "getbrokenid", "getequipisenableref", "getequiparmorlv", "getequippercentrefinery", "getequiprefinecost",
	"getareadropitem", "getequipcardcnt", "cardscnt", "getrefine", "getitemslots", "getequipcardid", "mergeitem", "mergeitem2",
	"getequiptradability", "identifyall", "getenchantgrade", "convertpcinfo", "getchildid", "getmotherid", "getfatherid", "ispartneron", "getpartnerid",
	"getcharip", "vip_status", "vip_time", "addspiritball", "delspiritball", "countspiritball", "ignoretimeout",
	"rentitem2", "rentitem3", "makeitem", "makeitem2", "makeitem3", "cleanarea", "cleanmap", "searchitem",
	"cartdelitem", "storagedelitem", "guildstoragedelitem", "delitem3", "cartdelitem2", "storagedelitem2", "guildstoragedelitem2",
	"cartcountitem", "storagecountitem", "guildstoragecountitem", "countitem2", "countitem3", "cartcountitem2", "storagecountitem2",
	"guildstoragecountitem2", "rentalcountitem", "rentalcountitem2", "rentalcountitem3", "countbound", "groupranditem", "getrandgroupitem",
	"getgroupitem", "enable_items", "disable_items", "consumeitem", "produce", "cooking", "makerune", "successremovecards",
	"failedremovecards", "repair", "repairall", "successrefitem", "failedrefitem", "downrefitem", "delequip", "breakequip", "autoequip",
	"searchstores", "enable_command", "disable_command",
	"getpartyleader", "is_party_leader"
];

// Red highlight - Control flow and declarations
const controlFlowKeywords = [
  "if", "else", "switch", "case", "default", "while", "do", "for", "break", "continue",
  "end", "script", "goto", "return", "callfunc", "callsub", "function" // 'function' keyword for declaration
];

// Orange highlight - Named constants and parameters
const constantLibraryKeywords = [
  // Original equipmentLocConstant
	"EQI_HEAD_LOW", "EQI_HEAD_MID", "EQI_HEAD_TOP", "EQI_ARMOR", "EQI_HAND_L", "EQI_HAND_R", "EQI_GARMENT", "EQI_SHOES", "EQI_ACC_L", "EQI_ACC_R", 
	"EQI_COSTUME_HEAD_TOP", "EQI_COSTUME_HEAD_MID", "EQI_COSTUME_HEAD_LOW", "EQI_COSTUME_GARMENT", "EQI_COSTUME_ROBE", "EQI_SHADOW_ARMOR", 
	"EQI_SHADOW_WEAPON", "EQI_SHADOW_SHIELD", "EQI_SHADOW_SHOES", "EQI_SHADOW_ACC_R", "EQI_SHADOW_ACC_L", "EQI_COMPOUND_ON", "EQI_AMMO",
  // Original emotionConstants
  "ET_SURPRISE", "ET_QUESTION", "ET_DELIGHT", "ET_THROB", "ET_SWEAT", "ET_AHA", "ET_FRET", "ET_ANGER", "ET_MONEY", "ET_THINK",
  "ET_SCISSOR", "ET_ROCK", "ET_WRAP", "ET_FLAG", "ET_BIGTHROB", "ET_THANKS", "ET_KEK", "ET_SORRY", "ET_SMILE", "ET_PROFUSELY_SWEAT",
  "ET_SCRATCH", "ET_BEST", "ET_STARE_ABOUT", "ET_HUK", "ET_O", "ET_X", "ET_HELP", "ET_GO", "ET_CRY", "ET_KIK", "ET_CHUP",
  "ET_CHUPCHUP", "ET_HNG", "ET_OK", "ET_CHAT_PROHIBIT", "ET_INDONESIA_FLAG", "ET_STARE", "ET_HUNGRY", "ET_COOL", "ET_MERONG",
  "ET_SHY", "ET_GOODBOY", "ET_SPTIME", "ET_SEXY", "ET_COMEON", "ET_SLEEPY", "ET_CONGRATULATION", "ET_HPTIME", "ET_PH_FLAG",
  "ET_MY_FLAG", "ET_SI_FLAG", "ET_BR_FLAG", "ET_SPARK", "ET_CONFUSE", "ET_OHNO", "ET_HUM", "ET_BLABLA", "ET_OTL", "ET_DICE1",
  "ET_DICE2", "ET_DICE3", "ET_DICE4", "ET_DICE5", "ET_DICE6", "ET_INDIA_FLAG", "ET_LUV", "ET_FLAG8", "ET_FLAG9", "ET_MOBILE",
  "ET_MAIL", "ET_ANTENNA0", "ET_ANTENNA1", "ET_ANTENNA2", "ET_ANTENNA3", "ET_HUM2", "ET_ABS", "ET_OOPS", "ET_SPIT", "ET_ENE",
  "ET_PANIC", "ET_WHISP", "ET_YUT1", "ET_YUT2", "ET_YUT3", "ET_YUT4", "ET_YUT5", "ET_YUT6", "ET_YUT7", "ET_MAX",
  // Original randomStatOptionVars
  "RDMOPT_VAR_STRAMOUNT", "RDMOPT_VAR_AGIAMOUNT", "RDMOPT_VAR_VITAMOUNT", "RDMOPT_VAR_INTAMOUNT", "RDMOPT_VAR_DEXAMOUNT", "RDMOPT_VAR_LUKAMOUNT",
  // Original boundVars
  "BOUND_CHAR", "BOUND_ACCOUNT", "BOUND_GUILD", "BOUND_PARTY", "LOOK_BASE", "LOOK_HAIR", "LOOK_WEAPON", "LOOK_HEAD_BOTTOM", "LOOK_HEAD_TOP", 
	"LOOK_HEAD_MID", "LOOK_HAIR_COLOR", "LOOK_CLOTHES_COLOR", "LOOK_SHIELD", "LOOK_SHOES", "LOOK_BODY2",
  // Original broadcastTargets
  "bc_all", "bc_map", "bc_self", "bc_area", "self", "SELF", "area", "AREA", "bc_pc", "bc_npc", "bc_yellow", "bc_blue", "bc_woe",
  // Original mapNames
  "prontera","prt_castle","prt_church","prt_in","prt_weapon","prt_tool","prt_gld","prt_sewb1","prt_sewb2","prt_sewb3","prt_sewb4","prt_fild00",
  "prt_fild01","prt_fild02","prt_fild03","prt_fild04","prt_fild05","prt_fild06","prt_fild07","prt_fild08","prt_fild09","prt_fild10",
  "morocc","morocc_in","morocc_in02","morocc_in03","morocc_in04","morocc_in05","moc_ruins","moc_fild01","moc_fild02","moc_fild03","moc_fild04",
  "moc_fild05","moc_fild06","moc_fild07","moc_fild08","moc_fild09","moc_fild10","moc_fild11","moc_fild12","moc_fild13","moc_fild14","moc_fild15",
  "moc_fild16","moc_pryd01","moc_pryd02","moc_pryd03","moc_pryd04",
  "geffen","gef_tower", "geffen_in","geffen_tool","geffen_weapon","geffen_armory","geffenblack","geffenia","gef_fild00","gef_fild01","gef_fild02","gef_fild03",
  "gef_fild04","gef_fild05","gef_fild06","gef_fild07","gef_fild08","gef_fild09","gef_fild10","gef_dun00","gef_dun01","gef_dun02","gef_dun03", 
  "payon","payon_in01","payon_in02","payon_in03","payon_in04","pay_arche","pay_gld","pay_fild01","pay_fild02","pay_fild03","pay_fild04",
  "pay_fild05","pay_fild06","pay_fild07","pay_dun00","pay_dun01","pay_dun02","pay_dun03","pay_dun04",
  "alberta", "izlude","izlude_in","iz_dun00","iz_dun01","iz_dun02","iz_dun03","iz_dun04","iz_dun05",
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
  "new_1-1", "new_1-2", "turbo_room", "moc_ruins", "thor_camp", "ecl_in01", "kame_house",
  // Original mapflagConstant
  "mf_restricted", "mf_noskill", "mf_novending", "mf_nocommand", "mf_nomemo", "mf_noteleport", "mf_nowarp", "mf_nosave", "mf_nobranch",
	"mf_nopenalty", "mf_nozenypenalty", "mf_pvp","mf_gvg", "mf_battleground", "mf_nightenabled", "mf_snow","mf_fog", "mf_sakura", "mf_leaves",
	"mf_rain", "mf_clouds", "mf_fireworks", "mf_skill_damage", "mf_skill_duration", "mf_loadevent", "mf_instakill", "MF_RESTRICTED",
  // Original optionsConstant
  "Option_Nothing","Option_Sight","Option_Hide","Option_Cloak","Option_Falcon","Option_Riding","Option_Invisible",
	"Option_Orcish","Option_Wedding","Option_Chasewalk","Option_Flying","Option_Xmas","Option_Transform","Option_Summer",
	"Option_Dragon1","Option_Wug","Option_Wugrider","Option_Madogear","Option_Dragon2","Option_Dragon3","Option_Dragon4",
	"Option_Dragon5","Option_Hanbok","Option_Oktoberfest","Option_Dragon","Option_Costume",
  // Other constants from documentation
  "ITEMINFO_BUY", "ITEMINFO_SELL", "ITEMINFO_TYPE", "ITEMINFO_MAXCHANCE", "ITEMINFO_GENDER", "ITEMINFO_LOCATIONS", "ITEMINFO_WEIGHT", "ITEMINFO_ATTACK",
  "ITEMINFO_DEFENSE", "ITEMINFO_RANGE", "ITEMINFO_SLOT", "ITEMINFO_VIEW", "ITEMINFO_EQUIPLEVELMIN", "ITEMINFO_WEAPONLEVEL", "ITEMINFO_ALIASNAME",
  "ITEMINFO_EQUIPLEVELMAX", "ITEMINFO_MAGICATTACK", "ITEMINFO_ID", "ITEMINFO_AEGISNAME", "ITEMINFO_ARMORLEVEL", "ITEMINFO_SUBTYPE",
  "MOB_NAME", "MOB_LV", "MOB_MAXHP", "MOB_BASEEXP", "MOB_JOBEXP", "MOB_ATK1", "MOB_ATK2", "MOB_DEF", "MOB_MDEF", "MOB_RES", "MOB_MRES", "MOB_STR", "MOB_AGI", "MOB_VIT", "MOB_INT", "MOB_DEX", "MOB_LUK",
  "MOB_RANGE", "MOB_RANGE2", "MOB_RANGE3", "MOB_SIZE", "MOB_RACE", "MOB_ELEMENT", "MOB_MODE", "MOB_MVPEXP",
  "PETINFO_ID", "PETINFO_CLASS", "PETINFO_NAME", "PETINFO_INTIMATE", "PETINFO_HUNGRY", "PETINFO_RENAMED", "PETINFO_LEVEL", "PETINFO_BLOCKID",
  "PETINFO_EGGID", "PETINFO_FOODID", "PET_INTIMATE_NONE", "PET_INTIMATE_AWKWARD", "PET_INTIMATE_SHY", "PET_INTIMATE_NEUTRAL", "PET_INTIMATE_CORDIAL", "PET_INTIMATE_LOYAL",
  "PET_HUNGRY_NONE", "PET_HUNGRY_VERY_HUNGRY", "PET_HUNGRY_HUNGRY", "PET_HUNGRY_NEUTRAL", "PET_HUNGRY_SATISFIED", "PET_HUNGRY_STUFFED",
  "HOMINFO_ID", "HOMINFO_CLASS", "HOMINFO_NAME", "HOMINFO_INTIMATE", "HOMINFO_HUNGRY", "HOMINFO_RENAMED", "HOMINFO_LEVEL", "HOMINFO_BLOCKID", // Assuming similar structure to PETINFO
  "MERCINFO_ID", "MERCINFO_CLASS", "MERCINFO_NAME", "MERCINFO_FAITH", "MERCINFO_CALLS", "MERCINFO_KILLS", "MERCINFO_LIFETIME", "MERCINFO_LEVEL", "MERCINFO_BLOCKID",
  "ELEMINFO_ID", "ELEMINFO_CLASS", "ELEMINFO_NAME", // Simplified example
  "GUILD_PERM_INVITE", "GUILD_PERM_EXPEL", "GUILD_PERM_STORAGE", "GUILD_PERM_ALL",
  "PCBLOCK_MOVE", "PCBLOCK_ATTACK", "PCBLOCK_SKILL", "PCBLOCK_USEITEM", "PCBLOCK_CHAT", "PCBLOCK_IMMUNE", "PCBLOCK_SITSTAND",
  "PCBLOCK_COMMANDS", "PCBLOCK_NPCCLICK", "PCBLOCK_EMOTION", "PCBLOCK_NPC", "PCBLOCK_ALL",
  "QTYPE_NONE", "QTYPE_QUEST", "QTYPE_QUEST2", "QTYPE_JOB", "QTYPE_JOB2", "QTYPE_EVENT", "QTYPE_EVENT2", "QTYPE_WARG", "QTYPE_WARG2",
  "QTYPE_CLICKME", "QTYPE_DAILYQUEST", "QTYPE_EVENT3", "QTYPE_JOBQUEST", "QTYPE_JUMPING_PORING",
  "QMARK_NONE", "QMARK_YELLOW", "QMARK_GREEN", "QMARK_PURPLE",
  "IM_NONE", "IM_CHAR", "IM_PARTY", "IM_GUILD", "IM_CLAN",
  "IIT_ID", "IIT_TIME_LIMIT", "IIT_IDLE_TIMEOUT", "IIT_ENTER_MAP", "IIT_ENTER_X", "IIT_ENTER_Y", "IIT_MAPCOUNT", "IIT_MAP",
  "ILI_NAME", "ILI_MODE", "ILI_OWNER",
  "ACHIEVEINFO_COUNT1", "ACHIEVEINFO_COUNT2", "ACHIEVEINFO_COUNT3", "ACHIEVEINFO_COUNT4", "ACHIEVEINFO_COUNT5", "ACHIEVEINFO_COUNT6",
  "ACHIEVEINFO_COUNT7", "ACHIEVEINFO_COUNT8", "ACHIEVEINFO_COUNT9", "ACHIEVEINFO_COUNT10", "ACHIEVEINFO_COMPLETE", "ACHIEVEINFO_COMPLETEDATE",
  "ACHIEVEINFO_GOTREWARD", "ACHIEVEINFO_LEVEL", "ACHIEVEINFO_SCORE",
  "CHAN_OPT_BASE", "CHAN_OPT_ANNOUNCE_SELF", "CHAN_OPT_ANNOUNCE_JOIN", "CHAN_OPT_ANNOUNCE_LEAVE", "CHAN_OPT_MSG_DELAY",
  "CHAN_OPT_COLOR_OVERRIDE", "CHAN_OPT_CAN_CHAT", "CHAN_OPT_CAN_LEAVE", "CHAN_OPT_AUTOJOIN",
  "SKILL_PERM", "SKILL_TEMP", "SKILL_TEMPLEVEL", "SKILL_PERM_GRANT",
  "SCSTART_NOAVOID", "SCSTART_NOTICKDEF", "SCSTART_LOADED", "SCSTART_NORATEDEF", "SCSTART_NOICON",
  "BF_SHORT", "BF_LONG", "BF_WEAPON", "BF_MAGIC", "BF_MISC", "BF_NORMAL", "BF_SKILL",
  "USW_NONE", "USW_FIXPOS", "USW_MOVE_ONCE", "USW_MOVE_FULL_CELL", "USW_FORCE_STOP",
  "NAV_NONE", "NAV_AIRSHIP_ONLY", "NAV_SCROLL_ONLY", "NAV_AIRSHIP_AND_SCROLL", "NAV_KAFRA_ONLY", "NAV_KAFRA_AND_AIRSHIP",
  "NAV_KAFRA_AND_SCROLL", "NAV_ALL",
  "DIR_NORTH", "DIR_NORTHEAST", "DIR_EAST", "DIR_SOUTHEAST", "DIR_SOUTH", "DIR_SOUTHWEST", "DIR_WEST", "DIR_NORTHWEST",
  "DT_SECOND", "DT_MINUTE", "DT_HOUR", "DT_DAYOFWEEK", "DT_DAYOFMONTH", "DT_MONTH", "DT_YEAR", "DT_DAYOFYEAR", "DT_YYYYMMDD",
  "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY",
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
  "BL_PC", "BL_NPC", "BL_PET", "BL_MOB", "BL_HOM", "BL_MER", "BL_ELEM",
  "REFINE_COST_NORMAL", "REFINE_COST_HD", "REFINE_COST_ENRICHED", "REFINE_ZENY_COST", "REFINE_MATERIAL_ID",
  "STOR_MODE_NONE", "STOR_MODE_GET", "STOR_MODE_PUT",
  "ADOPT_ALLOWED", "ADOPT_ALREADY_ADOPTED", "ADOPT_MARRIED_AND_PARTY", "ADOPT_EQUIP_RINGS", "ADOPT_NOT_NOVICE",
  "ADOPT_CHARACTER_NOT_FOUND", "ADOPT_MORE_CHILDREN", "ADOPT_LEVEL_70", "ADOPT_MARRIED",
  "GSTORAGE_OPEN", "GSTORAGE_STORAGE_ALREADY_OPEN", "GSTORAGE_ALREADY_OPEN", "GSTORAGE_NO_GUILD", "GSTORAGE_NO_STORAGE", "GSTORAGE_NO_PERMISSION",
  "GUILDSTORAGE_LOG_FINAL_SUCCESS", "GUILDSTORAGE_LOG_EMPTY", "GUILDSTORAGE_LOG_FAILED",
  "Size_Small", "Size_Medium", "Size_Large",
  "AI_NONE", "AI_ATTACK", "AI_SPHERE", "AI_FLORA", "AI_ZANZOU", "AI_LEGION", "AI_FAW", "AI_WAVEMODE",
  "SKILLDMG_MAX", "SKILLDMG_PC", "SKILLDMG_MOB", "SKILLDMG_BOSS", "SKILLDMG_OTHER", "SKILLDMG_CASTER",
  "ROA_ID", "ROA_VALUE", "ROA_PARAM",
  "MADO_ROBOT", "MADO_SUIT",
  "PET_CATCH_UNIVERSAL", "PET_CATCH_UNIVERSAL_ITEM",
  "INFINITE_TICK",
  "HAT_EF_BLIND", "HAT_EF_TALK", "HAT_EF_WATER", "HAT_EF_FIRE", "HAT_EF_STUN", "HAT_EF_SLEEP", "HAT_EF_CURSE", "HAT_EF_SILENCE", "HAT_EF_CONFUSION",
  "HAT_EF_POISON", "HAT_EF_PETRIFY", "HAT_EF_FREEZE", "HAT_EF_UP", "HAT_EF_DOWN", "HAT_EF_TALK2", "HAT_EF_MAX",
  // Unit Parameters (UMOB_*, UHOM_*, etc.) - These are very numerous and specific.
  // Adding a few common examples, but a full list might be too extensive for manual maintenance here
  // and might be better suited for a more dynamic system if possible.
  // For now, just add the prefixes as a general rule or a few key ones.
  "UMOB_LEVEL", "UMOB_HP", "UMOB_MAXHP", "UHOM_LEVEL", "UNPC_LEVEL",
  // Script constants from src/map/script_constants.hpp
  "MAX_LEVEL", "MAX_STORAGE", "MAX_INVENTORY", "MAX_CART", "MAX_ZENY", "MAX_PARTY", "MAX_GUILD", "MAX_GUILDLEVEL",
  "MAX_GUILD_STORAGE", "MAX_BG_MEMBERS", "MAX_CHAT_USERS", "VIP_SCRIPT", "MIN_STORAGE",
  "cell_walkable", "cell_shootable", "cell_water", "cell_cliff", "cell_npcantalk", "cell_basilica", "cell_landprotector",
  "cell_novending", "cell_nochat", "cell_removebasilica", "cell_removelandprotector", "cell_chknpc", "cell_chkpass",
  "cell_chkreach", "cell_chknoreach", "cell_chknopass",
  "NPC_NAME", "NPC_CLASS", "NPC_SIZE",
  "PET_CLASS", "PET_NAME", "PET_FRIENDLY", "PET_HUNGRY", "PET_LEVEL",
  "HOM_CLASS", "HOM_NAME", "HOM_FRIENDLY", "HOM_HUNGRY", "HOM_LEVEL",
  "MERC_CLASS", "MERC_NAME", "MERC_FAITH", "MERC_CALLS", "MERC_KILLS", "MERC_LIFETIME", "MERC_LEVEL",
  "ELEM_CLASS", "ELEM_NAME", "ELEM_LIFETIME", "ELEM_MODE", "ELEM_LEVEL",
  // BC Type
  "bc_all", "bc_map", "bc_self", "bc_area", "self", "SELF", "area", "AREA",
	"bc_pc", "bc_npc", "bc_yellow", "bc_blue", "bc_woe",
	// Start of SC_ constants
  "SC_STONE", "SC_FREEZE", "SC_STUN", "SC_SLEEP", "SC_POISON", "SC_CURSE", "SC_SILENCE", "SC_CONFUSION",
  "SC_BLIND", "SC_BLEEDING", "SC_DPOISON", "SC_PROVOKE", "SC_ENDURE", "SC_TWOHANDQUICKEN", "SC_CONCENTRATE",
  "SC_HIDING", "SC_CLOAKING", "SC_ENCPOISON", "SC_POISONREACT", "SC_QUAGMIRE", "SC_ANGELUS", "SC_BLESSING",
  "SC_SIGNUMCRUCIS", "SC_INCREASEAGI", "SC_DECREASEAGI", "SC_SLOWPOISON", "SC_IMPOSITIO", "SC_SUFFRAGIUM",
  "SC_ASPERSIO", "SC_BENEDICTIO", "SC_KYRIE", "SC_MAGNIFICAT", "SC_GLORIA", "SC_AETERNA", "SC_ADRENALINE",
  "SC_WEAPONPERFECTION", "SC_OVERTHRUST", "SC_MAXIMIZEPOWER", "SC_TRICKDEAD", "SC_LOUD", "SC_ENERGYCOAT",
  "SC_BROKENARMOR", "SC_BROKENWEAPON", "SC_HALLUCINATION", "SC_WEIGHT50", "SC_WEIGHT90", "SC_ASPDPOTION0",
  "SC_ASPDPOTION1", "SC_ASPDPOTION2", "SC_ASPDPOTION3", "SC_SPEEDUP0", "SC_SPEEDUP1", "SC_ATKPOTION",
  "SC_MATKPOTION", "SC_WEDDING", "SC_SLOWDOWN", "SC_ANKLE", "SC_KEEPING", "SC_BARRIER", "SC_STRIPWEAPON",
  "SC_STRIPSHIELD", "SC_STRIPARMOR", "SC_STRIPHELM", "SC_CP_WEAPON", "SC_CP_SHIELD", "SC_CP_ARMOR",
  "SC_CP_HELM", "SC_AUTOGUARD", "SC_REFLECTSHIELD", "SC_SPLASHER", "SC_PROVIDENCE", "SC_DEFENDER",
  "SC_MAGICROD", "SC_SPELLBREAKER", "SC_AUTOSPELL", "SC_SIGHTTRASHER", "SC_AUTOBERSERK", "SC_SPEARQUICKEN",
  "SC_AUTOCOUNTER", "SC_SIGHT", "SC_SAFETYWALL", "SC_RUWACH", "SC_EXTREMITYFIST", "SC_EXPLOSIONSPIRITS",
  "SC_COMBO", "SC_BLADESTOP_WAIT", "SC_BLADESTOP", "SC_FIREWEAPON", "SC_WATERWEAPON", "SC_WINDWEAPON",
  "SC_EARTHWEAPON", "SC_VOLCANO", "SC_DELUGE", "SC_VIOLENTGALE", "SC_WATK_ELEMENT", "SC_ARMOR",
  "SC_ARMOR_ELEMENT", "SC_NOCHAT", "SC_BABY", "SC_AURABLADE", "SC_PARRYING", "SC_CONCENTRATION",
  "SC_TENSIONRELAX", "SC_BERSERK", "SC_FURY", "SC_GOSPEL", "SC_ASSUMPTIO", "SC_BASILICA", "SC_GUILDAURA",
  "SC_MAGICPOWER", "SC_EDP", "SC_TRUESIGHT", "SC_WINDWALK", "SC_MELTDOWN", "SC_CARTBOOST", "SC_CHASEWALK",
  "SC_REJECTSWORD", "SC_MARIONETTE", "SC_MARIONETTE2", "SC_CHANGEUNDEAD", "SC_JOINTBEAT", "SC_MINDBREAKER",
  "SC_MEMORIZE", "SC_FOGWALL", "SC_SPIDERWEB", "SC_DEVOTION", "SC_SACRIFICE", "SC_STEELBODY", "SC_ORCISH",
  "SC_READYSTORM", "SC_READYDOWN", "SC_READYTURN", "SC_READYCOUNTER", "SC_DODGE", "SC_RUN", "SC_SHADOWWEAPON",
  "SC_ADRENALINE2", "SC_GHOSTWEAPON", "SC_KAIZEL", "SC_KAAHI", "SC_KAUPE", "SC_ONEHAND", "SC_PRESERVE",
  "SC_BATTLEORDERS", "SC_REGENERATION", "SC_DOUBLECAST", "SC_GRAVITATION", "SC_MAXOVERTHRUST", "SC_LONGING",
  "SC_HERMODE", "SC_SHRINK", "SC_SIGHTBLASTER", "SC_WINKCHARM", "SC_CLOSECONFINE", "SC_CLOSECONFINE2",
  "SC_DANCING", "SC_ELEMENTALCHANGE", "SC_RICHMANKIM", "SC_ETERNALCHAOS", "SC_DRUMBATTLE", "SC_NIBELUNGEN",
  "SC_ROKISWEIL", "SC_INTOABYSS", "SC_SIEGFRIED", "SC_WHISTLE", "SC_ASSNCROS", "SC_POEMBRAGI", "SC_APPLEIDUN",
  "SC_MODECHANGE", "SC_HUMMING", "SC_DONTFORGETME", "SC_FORTUNE", "SC_SERVICE4U", "SC_STOP", "SC_SPURT",
  "SC_SPIRIT", "SC_COMA", "SC_INTRAVISION", "SC_INCALLSTATUS", "SC_INCSTR", "SC_INCAGI", "SC_INCVIT",
  "SC_INCINT", "SC_INCDEX", "SC_INCLUK", "SC_INCHIT", "SC_INCHITRATE", "SC_INCFLEE", "SC_INCFLEERATE",
  "SC_INCMHPRATE", "SC_INCMSPRATE", "SC_INCATKRATE", "SC_INCMATKRATE", "SC_INCDEFRATE", "SC_STRFOOD",
  "SC_AGIFOOD", "SC_VITFOOD", "SC_INTFOOD", "SC_DEXFOOD", "SC_LUKFOOD", "SC_HITFOOD", "SC_FLEEFOOD",
  "SC_BATKFOOD", "SC_WATKFOOD", "SC_MATKFOOD", "SC_SCRESIST", "SC_XMAS", "SC_WARM", "SC_SUN_COMFORT",
  "SC_MOON_COMFORT", "SC_STAR_COMFORT", "SC_FUSION", "SC_SKILLRATE_UP", "SC_SKE", "SC_KAITE", "SC_SWOO",
  "SC_SKA", "SC_EARTHSCROLL", "SC_MIRACLE", "SC_MADNESSCANCEL", "SC_ADJUSTMENT", "SC_INCREASING",
  "SC_MAGICALBULLET", "SC_GATLINGFEVER", "SC_TATAMIGAESHI", "SC_UTSUSEMI", "SC_BUNSINJYUTSU", "SC_KAENSIN",
  "SC_SUITON", "SC_NEN", "SC_KNOWLEDGE", "SC_SMA", "SC_FLING", "SC_AVOID", "SC_CHANGE", "SC_BLOODLUST",
  "SC_FLEET", "SC_SPEED", "SC_DEFENCE", "SC_INCASPDRATE", "SC_INCFLEE2", "SC_JAILED", "SC_ENCHANTARMS",
  "SC_MAGICALATTACK", "SC_ARMORCHANGE", "SC_CRITICALWOUND", "SC_MAGICMIRROR", "SC_SLOWCAST", "SC_SUMMER",
  "SC_EXPBOOST", "SC_ITEMBOOST", "SC_BOSSMAPINFO", "SC_LIFEINSURANCE", "SC_INCCRI", "SC_INCDEF",
  "SC_INCBASEATK", "SC_FASTCAST", "SC_MDEF_RATE", "SC_HPREGEN", "SC_INCHEALRATE", "SC_PNEUMA", "SC_AUTOTRADE",
  "SC_KSPROTECTED", "SC_ARMOR_RESIST", "SC_SPCOST_RATE", "SC_COMMONSC_RESIST", "SC_SEVENWIND", "SC_DEF_RATE",
  "SC_SPREGEN", "SC_WALKSPEED", "SC_MERC_FLEEUP", "SC_MERC_ATKUP", "SC_MERC_HPUP", "SC_MERC_SPUP",
  "SC_MERC_HITUP", "SC_MERC_QUICKEN", "SC_REBIRTH", "SC_SKILLCASTRATE", "SC_DEFRATIOATK", "SC_HPDRAIN",
  "SC_SKILLATKBONUS", "SC_ITEMSCRIPT", "SC_S_LIFEPOTION", "SC_L_LIFEPOTION", "SC_JEXPBOOST", "SC_IGNOREDEF",
  "SC_HELLPOWER", "SC_INVINCIBLE", "SC_INVINCIBLEOFF", "SC_MANU_ATK", "SC_MANU_DEF", "SC_SPL_ATK",
  "SC_SPL_DEF", "SC_MANU_MATK", "SC_SPL_MATK", "SC_FOOD_STR_CASH", "SC_FOOD_AGI_CASH", "SC_FOOD_VIT_CASH",
  "SC_FOOD_DEX_CASH", "SC_FOOD_INT_CASH", "SC_FOOD_LUK_CASH", "SC_FEAR", "SC_BURNING", "SC_FREEZING",
  "SC_ENCHANTBLADE", "SC_DEATHBOUND", "SC_MILLENNIUMSHIELD", "SC_CRUSHSTRIKE", "SC_REFRESH",
  "SC_REUSE_REFRESH", "SC_GIANTGROWTH", "SC_STONEHARDSKIN", "SC_VITALITYACTIVATION", "SC_STORMBLAST",
  "SC_FIGHTINGSPIRIT", "SC_ABUNDANCE", "SC_ADORAMUS", "SC_EPICLESIS", "SC_ORATIO", "SC_LAUDAAGNUS",
  "SC_LAUDARAMUS", "SC_RENOVATIO", "SC_EXPIATIO", "SC_DUPLELIGHT", "SC_SECRAMENT", "SC_WHITEIMPRISON",
  "SC_MARSHOFABYSS", "SC_RECOGNIZEDSPELL", "SC_STASIS", "SC_SPHERE_1", "SC_SPHERE_2", "SC_SPHERE_3",
  "SC_SPHERE_4", "SC_SPHERE_5", "SC_READING_SB", "SC_FREEZE_SP", "SC_FEARBREEZE", "SC_ELECTRICSHOCKER",
  "SC_WUGDASH", "SC_BITE", "SC_CAMOUFLAGE", "SC_ACCELERATION", "SC_HOVERING", "SC_SHAPESHIFT",
  "SC_INFRAREDSCAN", "SC_ANALYZE", "SC_MAGNETICFIELD", "SC_NEUTRALBARRIER", "SC_NEUTRALBARRIER_MASTER",
  "SC_STEALTHFIELD", "SC_STEALTHFIELD_MASTER", "SC_OVERHEAT", "SC_OVERHEAT_LIMITPOINT", "SC_VENOMIMPRESS",
  "SC_POISONINGWEAPON", "SC_WEAPONBLOCKING", "SC_CLOAKINGEXCEED", "SC_HALLUCINATIONWALK",
  "SC_HALLUCINATIONWALK_POSTDELAY", "SC_ROLLINGCUTTER", "SC_TOXIN", "SC_PARALYSE", "SC_VENOMBLEED",
  "SC_MAGICMUSHROOM", "SC_DEATHHURT", "SC_PYREXIA", "SC_OBLIVIONCURSE", "SC_LEECHESEND", "SC_REFLECTDAMAGE",
  "SC_FORCEOFVANGUARD", "SC_SHIELDSPELL_DEF", "SC_SHIELDSPELL_MDEF", "SC_SHIELDSPELL_REF", "SC_EXEEDBREAK",
  "SC_PRESTIGE", "SC_BANDING", "SC_BANDING_DEFENCE", "SC_EARTHDRIVE", "SC_INSPIRATION", "SC_SPELLFIST",
  "SC_CRYSTALIZE", "SC_STRIKING", "SC_WARMER", "SC_VACUUM_EXTREME", "SC_PROPERTYWALK", "SC_SWINGDANCE",
  "SC_SYMPHONYOFLOVER", "SC_MOONLITSERENADE", "SC_RUSHWINDMILL", "SC_ECHOSONG", "SC_HARMONIZE",
  "SC_VOICEOFSIREN", "SC_DEEPSLEEP", "SC_SIRCLEOFNATURE", "SC_GLOOMYDAY", "SC_GLOOMYDAY_SK", "SC_SONGOFMANA",
  "SC_DANCEWITHWUG", "SC_SATURDAYNIGHTFEVER", "SC_LERADSDEW", "SC_MELODYOFSINK", "SC_BEYONDOFWARCRY",
  "SC_UNLIMITEDHUMMINGVOICE", "SC_SITDOWN_FORCE", "SC_NETHERWORLD", "SC_CRESCENTELBOW",
  "SC_CURSEDCIRCLE_ATKER", "SC_CURSEDCIRCLE_TARGET", "SC_LIGHTNINGWALK", "SC_RAISINGDRAGON",
  "SC_GT_ENERGYGAIN", "SC_GT_CHANGE", "SC_GT_REVITALIZE", "SC_GN_CARTBOOST", "SC_THORNSTRAP",
  "SC_BLOODSUCKER", "SC_SMOKEPOWDER", "SC_TEARGAS", "SC_MANDRAGORA", "SC_STOMACHACHE",
  "SC_MYSTERIOUS_POWDER", "SC_MELON_BOMB", "SC_BANANA_BOMB", "SC_BANANA_BOMB_SITDOWN", "SC_SAVAGE_STEAK",
  "SC_COCKTAIL_WARG_BLOOD", "SC_MINOR_BBQ", "SC_SIROMA_ICE_TEA", "SC_DROCERA_HERB_STEAMED",
  "SC_PUTTI_TAILS_NOODLES", "SC_BOOST500", "SC_FULL_SWING_K", "SC_MANA_PLUS", "SC_MUSTLE_M",
  "SC_LIFE_FORCE_F", "SC_EXTRACT_WHITE_POTION_Z", "SC_VITATA_500", "SC_EXTRACT_SALAMINE_JUICE",
  "SC__REPRODUCE", "SC__AUTOSHADOWSPELL", "SC__SHADOWFORM", "SC__BODYPAINT", "SC__INVISIBILITY",
  "SC__DEADLYINFECT", "SC__ENERVATION", "SC__GROOMY", "SC__IGNORANCE", "SC__LAZINESS", "SC__UNLUCKY",
  "SC__WEAKNESS", "SC__STRIPACCESSORY", "SC__MANHOLE", "SC__BLOODYLUST", "SC_CIRCLE_OF_FIRE",
  "SC_CIRCLE_OF_FIRE_OPTION", "SC_FIRE_CLOAK", "SC_FIRE_CLOAK_OPTION", "SC_WATER_SCREEN",
  "SC_WATER_SCREEN_OPTION", "SC_WATER_DROP", "SC_WATER_DROP_OPTION", "SC_WATER_BARRIER", "SC_WIND_STEP",
  "SC_WIND_STEP_OPTION", "SC_WIND_CURTAIN", "SC_WIND_CURTAIN_OPTION", "SC_ZEPHYR", "SC_SOLID_SKIN",
  "SC_SOLID_SKIN_OPTION", "SC_STONE_SHIELD", "SC_STONE_SHIELD_OPTION", "SC_POWER_OF_GAIA", "SC_PYROTECHNIC",
  "SC_PYROTECHNIC_OPTION", "SC_HEATER", "SC_HEATER_OPTION", "SC_TROPIC", "SC_TROPIC_OPTION", "SC_AQUAPLAY",
  "SC_AQUAPLAY_OPTION", "SC_COOLER", "SC_COOLER_OPTION", "SC_CHILLY_AIR", "SC_CHILLY_AIR_OPTION", "SC_GUST",
  "SC_GUST_OPTION", "SC_BLAST", "SC_BLAST_OPTION", "SC_WILD_STORM", "SC_WILD_STORM_OPTION", "SC_PETROLOGY",
  "SC_PETROLOGY_OPTION", "SC_CURSED_SOIL", "SC_CURSED_SOIL_OPTION", "SC_UPHEAVAL", "SC_UPHEAVAL_OPTION",
  "SC_TIDAL_WEAPON", "SC_TIDAL_WEAPON_OPTION", "SC_ROCK_CRUSHER", "SC_ROCK_CRUSHER_ATK", "SC_LEADERSHIP",
  "SC_GLORYWOUNDS", "SC_SOULCOLD", "SC_HAWKEYES", "SC_ODINS_POWER", "SC_RAID", "SC_FIRE_INSIGNIA",
  "SC_WATER_INSIGNIA", "SC_WIND_INSIGNIA", "SC_EARTH_INSIGNIA", "SC_PUSH_CART", "SC_SPELLBOOK1",
  "SC_SPELLBOOK2", "SC_SPELLBOOK3", "SC_SPELLBOOK4", "SC_SPELLBOOK5", "SC_SPELLBOOK6", "SC_MAXSPELLBOOK",
  "SC_INCMHP", "SC_INCMSP", "SC_PARTYFLEE", "SC_MEIKYOUSISUI", "SC_JYUMONJIKIRI", "SC_KYOUGAKU", "SC_IZAYOI",
  "SC_ZENKAI", "SC_KAGEHUMI", "SC_KYOMU", "SC_KAGEMUSYA", "SC_ZANGETSU", "SC_GENSOU", "SC_AKAITSUKI",
  "SC_STYLE_CHANGE", "SC_TINDER_BREAKER", "SC_TINDER_BREAKER2", "SC_CBC", "SC_EQC", "SC_GOLDENE_FERSE",
  "SC_ANGRIFFS_MODUS", "SC_OVERED_BOOST", "SC_LIGHT_OF_REGENE", "SC_ASH", "SC_GRANITIC_ARMOR",
  "SC_MAGMA_FLOW", "SC_PYROCLASTIC", "SC_PARALYSIS", "SC_PAIN_KILLER", "SC_HANBOK", "SC_DEFSET", "SC_MDEFSET",
  "SC_DARKCROW", "SC_FULL_THROTTLE", "SC_REBOUND", "SC_UNLIMIT", "SC_KINGS_GRACE", "SC_TELEKINESIS_INTENSE",
  "SC_OFFERTORIUM", "SC_FRIGG_SONG", "SC_MONSTER_TRANSFORM", "SC_ANGEL_PROTECT", "SC_ILLUSIONDOPING",
  "SC_FLASHCOMBO", "SC_MOONSTAR", "SC_SUPER_STAR", "SC_HEAT_BARREL", "SC_P_ALTER", "SC_E_CHAIN",
  "SC_C_MARKER", "SC_ANTI_M_BLAST", "SC_B_TRAP", "SC_H_MINE", "SC_QD_SHOT_READY", "SC_MTF_ASPD",
  "SC_MTF_ASPD2", "SC_MTF_RANGEATK", "SC_MTF_RANGEATK2", "SC_MTF_MATK", "SC_MTF_MATK2", "SC_MTF_MLEATKED",
  "SC_MTF_CRIDAMAGE", "SC_OKTOBERFEST", "SC_STRANGELIGHTS", "SC_DECORATION_OF_MUSIC", "SC_QUEST_BUFF1",
  "SC_QUEST_BUFF2", "SC_QUEST_BUFF3", "SC_ALL_RIDING", "SC_TEARGAS_SOB", "SC__FEINTBOMB", "SC__CHAOS",
  "SC_ELEMENTAL_SHIELD", "SC_CHASEWALK2", "SC_SUHIDE", "SC_SU_STOOP", "SC_SPRITEMABLE", "SC_CATNIPPOWDER",
  "SC_SV_ROOTTWIST", "SC_BITESCAR", "SC_ARCLOUSEDASH", "SC_TUNAPARTY", "SC_SHRIMP", "SC_FRESHSHRIMP",
  "SC_HISS", "SC_NYANGGRASS", "SC_GROOMING", "SC_SHRIMPBLESSING", "SC_CHATTERING", "SC_DORAM_WALKSPEED",
  "SC_DORAM_MATK", "SC_DORAM_FLEE2", "SC_DORAM_SVSP", "SC_GVG_GIANT", "SC_GVG_GOLEM", "SC_GVG_STUN",
  "SC_GVG_STONE", "SC_GVG_FREEZ", "SC_GVG_SLEEP", "SC_GVG_CURSE", "SC_GVG_SILENCE", "SC_GVG_BLIND",
  "SC_EXTREMITYFIST2", "SC_LHZ_DUN_N1", "SC_LHZ_DUN_N2", "SC_LHZ_DUN_N3", "SC_LHZ_DUN_N4", "SC_DORAM_BUF_01",
  "SC_DORAM_BUF_02", "SC_INCREASE_MAXHP", "SC_INCREASE_MAXSP", "SC_REF_T_POTION", "SC_ADD_ATK_DAMAGE",
  "SC_ADD_MATK_DAMAGE", "SC_HELPANGEL", "SC_SOUNDOFDESTRUCTION", "SC_LUXANIMA", "SC_REUSE_LIMIT_LUXANIMA",
  "SC_ENSEMBLEFATIGUE", "SC_MISTY_FROST", "SC_MAGIC_POISON", "SC_EP16_2_BUFF_SS", "SC_EP16_2_BUFF_SC",
  "SC_EP16_2_BUFF_AC", "SC_EMERGENCY_MOVE", "SC_PACKING_ENVELOPE1", "SC_PACKING_ENVELOPE2",
  "SC_PACKING_ENVELOPE3", "SC_PACKING_ENVELOPE4", "SC_PACKING_ENVELOPE5", "SC_PACKING_ENVELOPE6",
  "SC_PACKING_ENVELOPE7", "SC_PACKING_ENVELOPE8", "SC_PACKING_ENVELOPE9", "SC_PACKING_ENVELOPE10",
  "SC_WEAPONBREAKER", "SC_POWERUP", "SC_AGIUP", "SC_BATH_FOAM_A", "SC_BATH_FOAM_B", "SC_BATH_FOAM_C",
  "SC_BUCHEDENOEL", "SC_EP16_DEF", "SC_STR_SCROLL", "SC_INT_SCROLL", "SC_CONTENTS_1", "SC_CONTENTS_2",
  "SC_CONTENTS_3", "SC_CONTENTS_4", "SC_CONTENTS_5", "SC_CONTENTS_6", "SC_CONTENTS_7", "SC_CONTENTS_8",
  "SC_CONTENTS_9", "SC_CONTENTS_10"
];

// Green highlight - Variables and variable manipulation
const variableLanguageKeywords = [
	// Original varHolderKeywords
	"set", "killedrid", "setarray", "copyarray", "cleararray", "setd", "getd", "getvar", "getvariableofnpc", "getelementofarray", // Added from commands
	// Original specialVarKeywords
	"Zeny", "Hp", "MaxHp", "Sp", "MaxSp", "StatusPoint", "SkillPoint", "BaseLevel",
	"JobLevel", "BaseExp", "JobExp", "NextBaseExp", "NextJobExp", "Weight", "MaxWeight",
	"Sex", "Class", "Upper", "BaseClass", "BaseJob", "Karma", "Manner", "Ap", "MaxAp",
	// Original inventoryVar as prefixed vars - rule will handle prefix
	"getarg", "getargcount", "strcharinfo", "strnpcinfo", "readparam", "getarraysize",
	"bStr", "bAgi", "bVit", "bInt", "bDex", "bLuk", "bPow", "bSta", "bWis", "bSpl", "bCon", "bCrt" // base stats and traits
];

const inventoryVarNames = [ // Just the names, prefix handled by regex
	"inventorylist_id", "inventorylist_idx", "inventorylist_amount", "inventorylist_equip", "inventorylist_refine", 
	"inventorylist_identify", "inventorylist_attribute", "inventorylist_card1", "inventorylist_card2", "inventorylist_card3", 
	"inventorylist_card4", "inventorylist_expire", "inventorylist_bound", "inventorylist_enchantgrade", "inventorylist_count", 
	"inventorylist_option_id1", "inventorylist_option_value1", "inventorylist_option_parameter1", "inventorylist_option_id2", 
	"inventorylist_option_value2", "inventorylist_option_parameter2", "inventorylist_option_id3", "inventorylist_option_value3", 
	"inventorylist_option_parameter3", "inventorylist_option_id4", "inventorylist_option_value4", "inventorylist_option_parameter4", 
	"inventorylist_option_id5", "inventorylist_option_value5", "inventorylist_option_parameter5", "inventorylist_tradable", "inventorylist_favorite",
	// from getpartymember / getguildmember
	"partymembername", "partymembercid", "partymemberaid", "partymembercount",
	"guildmembername", "guildmembercid", "guildmemberaid", "guildmembercount",
	// from getmobdrops
	"MobDrop_item", "MobDrop_rate", "MobDrop_nosteal", "MobDrop_randomopt", "MobDrop_count",
	// from getskilllist
	"skilllist_id", "skilllist_lv", "skilllist_flag", "skilllist_count",
	// from warpwaitingpc
	"warpwaitingpc", "warpwaitingpcnum",
	// from bg_get_data
	"arenamembers", "arenamemberscount",
	// from countbound
	"bound_items", "bound_amount",
	// from getwaitingroomusers
	"waitingroom_users", "waitingroom_usercount",
	// from @atcmd_
	"atcmd_command", "atcmd_parameters", "atcmd_numparameters"
];

// Violet Highlight - Language constants
const constantLanguageKeywords = [
  "true", "false", "null"
];

const operators = [
  "\\+", "\\*", "\\/", "-", "%", "=", "==", "!=", "<=", ">=", "<", ">", 
  "\\|\\|", "&&", "!", "\\^", "&", "\\|", "\\?", "\\+=", "-=", "\\*=", "/=", "%=", ">>=", "<<="
];

/* Declare the keywords here and to RathenaHighlightRules to display on autocomplete except operators */
const keywords = [
	...supportFunctionKeywords, 
	...controlFlowKeywords, 
	...constantLibraryKeywords,
	...variableLanguageKeywords, // Add base names of special vars
	...inventoryVarNames, // Add prefixed special array names
	...inventoryVarNames, // Add prefixed special global array names
	...constantLanguageKeywords
];

const langTools = ace.require("ace/ext/language_tools");
const customCompleter = {
  getCompletions: function (editor, session, pos, prefix, callback) {
    if (!prefix.length && !editor.completers.some(c => c.triggerCharacters && c.triggerCharacters.includes(session.getPrecedingCharacter()))) {
         return callback(null, []);
    }
    const completions = keywords.map(word => ({
      caption: word,
      value: word,
      meta: "rAthena" // Generic meta, could be improved with categorization
    }));
    callback(null, completions);
  }
};
langTools.setCompleters([customCompleter]); // Initially set only custom completer
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
    const createKeywordMapper = this.createKeywordMapper;
		this.$rules = {
		  start: [
		  	{ token: "comment.line", regex: "//.*$" },
		    { token: "comment.block.start", regex: "/\\*", next: "comment" },
        { token: "string", regex: '".*?"' },
        { token: "keyword.control", regex: "\\bOn\\w+:" },// Labels like OnMyLabel:
        { token: "keyword.control", regex: "(?<![@\\w\\.])\\b(?:" + controlFlowKeywords.join("|") + ")\\b" },
        { token: "support.function", regex: "(?<![@\\w\\.])\\b(?:" + supportFunctionKeywords.join("|") + ")\\b" },
        { token: "variable.parameter", regex: "(?<![@\\w\\.])\\b(?:" + constantLibraryKeywords.join("|") + ")\\b" }, // Using constant.library for map names, item IDs etc.
        { token: "variable.language", regex: "(?<![@\\w\\.])\\b(?:" + variableLanguageKeywords.join("|") + ")\\b" },
        { token: "variable.language", regex: "(@(?:" + inventoryVarNames.join("|") + "))\\b" },
        { token: "constant.language", regex: "(?<![@\\w\\.])\\b(?:" + constantLanguageKeywords.join("|") + ")\\b" },
    		{ token: "constant.numeric", regex: "\\b\\d+\\b" },
    		{ token: "keyword.operator", regex: new RegExp("(?:" + operators.join("|") + ")") },
        // { token: "variable.other", regex: "\\b\\w+\\b" } // General variable rule color green
		  ],
		  comment: [
		    { token: "comment.block.end", regex: "\\*/", next: "start" },
		    { defaultToken: "comment.block" }
		  ]
		};
        this.normalizeRules();
	};

	oop.inherits(RathenaHighlightRules, TextHighlightRules);
	exports.RathenaHighlightRules = RathenaHighlightRules;
});

ace.define("ace/mode/rathena", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/rathena_highlight_rules", "ace/mode/behaviour/cstyle"], function (require, exports) {
	const oop = require("ace/lib/oop");
	const TextMode = require("ace/mode/text").Mode;
	const RathenaHighlightRules = require("ace/mode/rathena_highlight_rules").RathenaHighlightRules;
	const CstyleBehaviour = require("ace/mode/behaviour/cstyle").CstyleBehaviour; // Added CstyleBehaviour
	const Mode = function () {
		this.HighlightRules = RathenaHighlightRules;
		this.$behaviour = new CstyleBehaviour(); // Instantiate CstyleBehaviour
	};
	oop.inherits(Mode, TextMode);
	exports.Mode = Mode;
});