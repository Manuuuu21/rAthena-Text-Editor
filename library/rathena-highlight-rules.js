/* This keywords is the Data we can use for rathena syntax highlights and custom autocomplete */
// Blue highlight - General commands and functions
const supportFunctionKeywords = [
  "achievementadd", "achievementcomplete", "achievementexists", "achievementinfo", "achievementremove", "achievementupdate", "activatepset", "active_transform", "add_reputation_points", "addfame",
  "addhomintimacy", "addmonsterdrop", "addrid", "addspiritball", "addtimer", "addtimercount", "addtoskill", "adopt", "agitcheck", "agitcheck2", "agitcheck3", "agitend", "agitend2", "agitend3",
  "agitstart", "agitstart2", "agitstart3", "announce", "areaannounce", "areamobuseskill", "areamonster", "areapercentheal", "areawarp", "atcommand", "atoi", "attachnpctimer", "attachrid",
  "autobonus", "autobonus2", "autobonus3", "autoequip", "autoloot", "awake", "axtoi", "basicskillcheck", "bg_create", "bg_desert", "bg_destroy", "bg_get_data", "bg_getareausers", "bg_info",
  "bg_join", "bg_leave", "bg_monster", "bg_monster_set_team", "bg_reserve", "bg_team_setxy", "bg_unbook", "bg_updatescore", "bg_warp", "bindatcmd", "birthpet", "bonus", "bonus2", "bonus3",
  "bonus4", "bonus5", "bonus_script", "bonus_script_clear", "bpet", "breakequip", "buyingstore", "callshop", "camerainfo", "cap_value", "cardscnt", "cartcountitem", "cartcountitem2",
  "cartdelitem", "cartdelitem2", "catchpet", "ceil", "changebase", "changecharsex", "changelook", "changequest", "changesex", "channel_ban", "channel_chat", "channel_create", 
  "channel_delete", "channel_getopt", "channel_join", "channel_kick", "channel_setcolor", "channel_setgroup", "channel_setgroup2", "channel_setopt", "channel_setpass", "channel_unban", 
  "charat", "charcommand", "charisalpha", "charislower", "charisupper", "chatmes", "checkcart", "checkcell", "checkchatting", "checkdragon", "checkequipedcard", "checkfalcon", "checkhomcall",
  "checkidle", "checkidlehom", "checkidlemer", "checkmadogear", "checkoption", "checkoption1", "checkoption2", "checkquest", "checkre", "checkriding", "checkvending", "checkwall", 
  "checkweight", "checkweight2", "checkwug", "clan_join", "clan_leave", "classchange", "cleanarea", "cleanmap", "clear", "clearitem", "cloakoffnpc", "cloakoffnpcself", "cloakonnpc", 
  "cloakonnpcself", "clone", "close", "close2", "close3", "cmdothernpc", "compare", "completequest", "consumeitem", "convertpcinfo", "cooking", "countbound", "countinarray", "countitem", 
  "countitem2", "countitem3", "countitem4", "countspiritball", "countstr", "cutin", "day", "deactivatepset", "debugmes", "defpattern", "delchar", "delequip", "deletearray", "deletepset", 
  "delitem", "delitem2", "delitem3", "delitem4", "delitemidx", "delmonsterdrop", "delspiritball", "deltimer", "delwaitingroom", "delwall", "detachnpctimer", "detachrid", "disable_command", 
  "disable_items", "disablearena", "disablenpc", "disablewaitingroomevent", "disguise", "dispbottom", "distance", "divorce", "doevent", "donpcevent", "downrefitem", "duplicate", 
  "duplicate_dynamic", "eaclass", "emotion", "enable_command", "enable_items", "enablearena", "enablenpc", "enablewaitingroomevent", "enchantgradeui", "equip", "erasequest", "errormes", 
  "escape_sql", "explode", "failedrefitem", "failedremovecards", "flagemblem", "floor", "freeloop", "get_githash", "get_reputation_points", "get_revision", "getareadropitem", "getareaunits", 
  "getareausers", "getattachedrid", "getbaseexp_ratio", "getbattleflag", "getbrokenid", "getcastledata", "getcastlename", "getcharid", "getcharip", "getchildid", "geteleminfo", 
  "getenchantgrade", "getequiparmorlv", "getequipcardcnt", "getequipcardid", "getequipid", "getequipisenableref", "getequipisequiped", "getequipname", "getequippercentrefinery", 
  "getequiprandomoption", "getequiprefinecost", "getequiprefinerycnt", "getequiptradability", "getequipuniqueid", "getequipweaponlv", "getexp", "getexp2", "getfame", "getfamerank", 
  "getfatherid", "getfreecell", "getgdskilllv", "getgmlevel", "getgroupid", "getgroupitem", "getguildalliance", "getguildinfo", "getguildmaster", "getguildmasterid", "getguildmember", 
  "getguildname", "gethominfo", "getinstancevar", "getinventorylist", "getitem", "getitem2", "getitem3", "getitem4", "getitembound", "getitembound2", "getitembound3", "getitembound4", 
  "getiteminfo", "getitemname", "getitempos", "getitemslots", "getjobexp_ratio", "getlook", "getmapflag", "getmapguildusers", "getmapunits", "getmapusers", "getmapxy", "getmercinfo", 
  "getmobdrops", "getmonsterinfo", "getmotherid", "getnameditem", "getnpcid", "getnpctimer", "getpartnerid", "getpartyleader", "getpartymember", "getpartyname", "getpcblock", "getpetinfo", 
  "getrandgroupitem", "getrandmobid", "getrandomoptinfo", "getrefine", "getsavepoint", "getscrate", "getskilllist", "getskilllv", "getstatus", "getstrlen", "gettime", "gettimestr", "gettimetick", 
  "getunitdata", "getunitname", "getunits", "getunittitle", "getunittype", "getusers", "getwaitingroomstate", "getwaitingroomusers", "globalmes", "groupranditem", "guardian", "guardianinfo", 
  "guild_has_permission", "guildchangegm", "guildgetexp", "guildopenstorage", "guildopenstorage_log", "guildskill", "guildstoragecountitem", "guildstoragecountitem2", "guildstoragedelitem", 
  "guildstoragedelitem2", "gvgoff", "gvgoff3", "gvgon", "gvgon3", "has_autoloot", "has_hateffect", "hateffect", "heal", "healap", "hideoffnpc", "hideonnpc", "homevolution", "hommutate", 
  "homshuffle", "identifyall", "ignoretimeout", "implode", "inarray", "initnpctimer", "input", "insertchar", "instance_announce", "instance_check_clan", "instance_check_guild", 
  "instance_check_party", "instance_create", "instance_destroy", "instance_enter", "instance_id", "instance_info", "instance_list", "instance_live_info", "instance_mapname", "instance_npcname", 
  "instance_warpall", "is_function", "is_guild_leader", "is_party_leader", "isbegin_quest", "isday", "isdead", "isequipped", "isequippedcnt", "isloggedin", "ismounting", "isnight", 
  "isnpccloaked", "ispartneron", "item_enchant", "item_reform", "itemheal", "itemlink", "itemskill", "jobcanentermap", "jobchange", "jobname", "jump_zero", "kick", "kickwaitingroomall", 
  "killmonster", "killmonsterall", "laphine_synthesis", "laphine_upgrade", "logmes", "macro_detector", "mail", "makeitem", "makeitem2", "makeitem3", "makeitem4", "makepet", "makerune", 
  "mapannounce", "mapid2name", "mapname2id", "maprespawnguildid", "mapwarp", "marriage", "max", "maximum", "md5", "menu", "mercenary_create", "mercenary_delete", "mercenary_get_calls", 
  "mercenary_get_faith", "mercenary_heal", "mercenary_sc_start", "mercenary_set_calls", "mercenary_set_faith", "mergeitem", "mergeitem2", "mes", "mesemotion", "meshyperlink", "mesitemicon", 
  "mesitemlink", "message", "min", "minimum", "misceffect", "mob_setidleevent", "mobcount", "monster", "morphembryo", "movenpc", "navigateto", "navihide", "naviregisterwarp", 
  "needed_status_point", "next", "night", "npcshopadditem", "npcshopattach", "npcshopdelitem", "npcshopitem", "npcshopupdate", "npcskill", "npcskilleffect", "npcspeed", "npcstop", 
  "npctalk", "npcwalkto", "nude", "open_quest_ui", "open_roulette", "openauction", "openbank", "opendressroom", "openmail", "openstorage", "openstorage2", "openstylist", "opentips", 
  "party_addmember", "party_changeleader", "party_changeoption", "party_create", "party_delmember", "party_destroy", "pcblockmove", "pcblockskill", "pcfollow", "pcstopfollow", "percentheal", 
  "permission_add", "permission_check", "permission_remove", "pet", "petautobonus", "petautobonus2", "petautobonus3", "petloot", "petrecovery", "petskillattack", "petskillattack2", 
  "petskillbonus", "petskillsupport", "plagiarizeskill", "plagiarizeskillreset", "playBGM", "playBGMall", "playerattached", "pow", "preg_match", "produce", "progressbar", "progressbar_npc", 
  "prompt", "pushpc", "pvpoff", "pvpon", "query_logsql", "query_sql", "questinfo", "questinfo_refresh", "rand", "randomoptgroup", "readbook", "readparam", "recalculatestat", "recovery", 
  "refineui", "removemapflag", "removespecialeffect", "removespecialeffect2", "rentalcountitem", "rentalcountitem2", "rentalcountitem3", "rentalcountitem4", "rentitem", "rentitem2", "rentitem3", 
  "rentitem4", "repair", "repairall", "replacestr", "reputationui", "requestguildinfo", "resetfeel", "resethate", "resetlvl", "resetskill", "resetstatus", "rid2name", "roclass", "round", 
  "save", "savepoint", "sc_end", "sc_end_class", "sc_start", "sc_start2", "sc_start4", "searchitem", "searchstores", "select", "set_reputation_points", "setbattleflag", "setcart", 
  "setcastledata", "setcell", "setchar", "setdialogalign", "setdialogpos", "setdialogpospercent", "setdialogsize", "setdragon", "setfalcon", "setfont", "setinstancevar", "setiteminfo", 
  "setitemscript", "setlook", "setmadogear", "setmapflag", "setmapflagnosave", "setmounting", "setnpcdisplay", "setnpctimer", "setoption", "setpcblock", "setquest", "setrandomoption", 
  "setriding", "setunitdata", "setunitname", "setunittitle", "setwall", "showdigit", "showevent", "showscript", "sit", "skill", "skilleffect", "skillpointcount", "sleep", "sleep2", 
  "soundeffect", "soundeffectall", "specialeffect", "specialeffect2", "specialpopup", "sprintf", "sqrt", "sscanf", "stand", "startnpctimer", "statusup", "statusup2", "stopnpctimer", 
  "storagecountitem", "storagecountitem2", "storagedelitem", "storagedelitem2", "strcharinfo", "strcmp", "strnpcinfo", "strpos", "strtol", "strtolower", "strtoupper", "substr", "successrefitem", 
  "successremovecards", "summon", "traitstatusup", "traitstatusup2", "transform", "unbindatcmd", "undisguise", "unequip", "unitattack", "unitblockmove", "unitblockskill", "unitexists", 
  "unitkill", "unitskilluseid", "unitskillusepos", "unitstopattack", "unitstopwalk", "unittalk", "unitwalk", "unitwalkto", "unitwarp", "unloadnpc", "useatcmd", "viewpoint", "viewpointmap", 
  "vip_status", "vip_time", "waitingroom", "waitingroom2bg", "waitingroom2bg_single", "waitingroomkick", "warp", "warpguild", "warppartner", "warpparty", "warpportal", "wedding","getarraysize",
  "strmobinfo", "shop", "itemshop", "warpwaitingpc",
  // Additional commands registered in the local src/map/script.cpp.
  "setr", "needed_trait_point", "achievement_condition", "warpchar",
  // Top-level declarations from doc/script_commands.txt.
  "mapflag", "warp2", "cashshop", "pointshop", "marketshop",
];

// Red highlight - Control flow and declarations
const controlFlowKeywords = [
  "if", "else", "switch", "case", "default", "while", "do", "for", "break", "continue",
  "end", "script", "goto", "return", "callfunc", "callsub", "function" 
];

// Map names from the local db/map_index.txt, retaining existing custom/legacy entries.
// Keep separate from constants so unquoted instance map names can be matched as a whole.
const mapNameKeywords = [
  "06guild_01", "06guild_02", "06guild_03", "06guild_04", "06guild_05", "06guild_06", "06guild_07", "06guild_08", "06guild_r",
  "1@20cn1", "1@20cn2", "1@4cdn", "1@4drk", "1@4igd", "1@4inq", "1@4mag", "1@4mst", "1@4sac", "1@4tro", "1@4win", "1@adv",
  "1@advs", "1@air1", "1@air2", "1@ba_go", "1@bamn", "1@bamq", "1@begi", "1@cash", "1@cata", "1@ch1a", "1@ch1b", "1@ch_t",
  "1@ch_u", "1@cor", "1@crd", "1@def01", "1@def02", "1@def03", "1@dime", "1@drdo", "1@dth1", "1@dth2", "1@dth3", "1@ecl",
  "1@eom", "1@ep21a", "1@ep21b", "1@ep21c", "1@exds", "1@exhn", "1@exnw", "1@exse", "1@exsh", "1@exsr", "1@f_lake", "1@face",
  "1@ffp", "1@ge_sn", "1@ge_st", "1@gef", "1@gef_in", "1@ghg", "1@gl_he", "1@gl_he2", "1@gl_k", "1@gl_k2", "1@gl_kh", "1@gl_prq",
  "1@glast", "1@gol1", "1@gol2", "1@halo", "1@herbs", "1@infi", "1@iwp", "1@jorchs", "1@jorlab", "1@jtb", "1@lab", "1@lhz",
  "1@lost", "1@ma_b", "1@ma_c", "1@ma_h", "1@mcd", "1@md_gef", "1@md_pay", "1@mdtem", "1@mir", "1@mist", "1@mjo1", "1@mjo2",
  "1@nyd", "1@nyr", "1@odin", "1@orcs", "1@os_a", "1@os_b", "1@oz", "1@pdb", "1@pop1", "1@pop2", "1@pop3", "1@pump", "1@rev",
  "1@rgsr", "1@sara", "1@slug", "1@slw", "1@soul", "1@spa", "1@spa2", "1@sthb", "1@sthc", "1@sthd", "1@swat", "1@tcamp",
  "1@thts", "1@tnm1", "1@tnm2", "1@tnm3", "1@tower", "1@tre", "1@twas", "1@twbs", "1@twbs2", "1@twig", "1@twsd", "1@uns",
  "1@vrac1", "1@vrac2", "1@vrcas", "1@vrclo", "1@vrev", "1@vrgen", "1@vrhha", "1@vrpo", "1@vrpop", "1@vrsn", "1@whl", "1@wtgs",
  "1@xm_d", "1@xm_d2", "2009rwc_01", "2009rwc_02", "2009rwc_03", "2009rwc_04", "2009rwc_05", "2009rwc_06", "2009rwc_07",
  "2009rwc_08", "2009rwc_f01", "2012rwc_01", "2012rwc_02", "2012rwc_03", "2012rwc_04", "2012rwc_05", "2012rwc_06", "2012rwc_07",
  "2012rwc_08", "2@cata", "2@ch_t", "2@exds", "2@gl_k", "2@gl_k2", "2@gl_kh", "2@mdtem", "2@mir", "2@nyd", "2@nyr", "2@orcs",
  "2@pump", "2@thts", "2@tower", "2@vrclo", "2@vrpop", "3@ch_t", "3@thts", "3@tower", "3@vrpop", "4@thts", "4@tower", "5@thts",
  "5@tower", "6@thts", "6@tower", "7@thts", "8@thts", "abbey01", "abbey02", "abbey03", "abyss_01", "abyss_02", "abyss_03",
  "abyss_04", "air_if", "airplane", "airplane2", "airplane_01", "airport", "alb2trea", "alb_ship", "alberta", "alberta_in",
  "alde_alche", "alde_dun01", "alde_dun02", "alde_dun03", "alde_dun04", "alde_gld", "alde_tt02", "alde_tt03", "aldeba_in",
  "aldebaran", "aldeg_cas01", "aldeg_cas02", "aldeg_cas03", "aldeg_cas04", "aldeg_cas05", "ama_dun01", "ama_dun02", "ama_dun03",
  "ama_fild01", "ama_in01", "ama_in02", "ama_test", "amatsu", "amicitia1", "amicitia2", "ant_d02_i", "anthell01", "anthell02",
  "arena_room", "aru_gld", "arug_cas01", "arug_cas02", "arug_cas03", "arug_cas04", "arug_cas05", "arug_dun01", "arug_que01",
  "auction_01", "auction_02", "ayo_dun01", "ayo_dun02", "ayo_fild01", "ayo_fild02", "ayo_in01", "ayo_in02", "ayothaya",
  "ba_2whs01", "ba_2whs02", "ba_bath", "ba_chess", "ba_go", "ba_in01", "ba_lib", "ba_lost", "ba_maison", "ba_pw01", "ba_pw02",
  "ba_pw03", "bat_a01", "bat_a02", "bat_b01", "bat_b02", "bat_c01", "bat_c02", "bat_c03", "bat_room", "beach_dun", "beach_dun2",
  "beach_dun3", "bif_fild01", "bif_fild02", "bl_death", "bl_depth1", "bl_depth2", "bl_grass", "bl_ice", "bl_lava", "bl_soul",
  "bl_temple", "bl_venom", "bossnia_01", "bossnia_02", "bossnia_03", "bossnia_04", "bra_dun01", "bra_dun02", "bra_fild01",
  "bra_in01", "brasilis", "c_tower1", "c_tower2", "c_tower2_", "c_tower3", "c_tower3_", "c_tower4", "cave", "ch1_dw",
  "ch1_gef_in", "ch1_geffen", "ch1_gfn01", "ch1_gfn03", "ch1_que01", "ch1_sf01", "ch1_sf02", "ch1_sf03", "ch1_vrgef1",
  "ch1_vrgef2", "clock_01", "cmd_bhole", "cmd_fild01", "cmd_fild02", "cmd_fild03", "cmd_fild04", "cmd_fild05", "cmd_fild06",
  "cmd_fild07", "cmd_fild08", "cmd_fild09", "cmd_in01", "cmd_in02", "com_d02_i", "comodo", "conch_in", "dali", "dali02",
  "dew_dun01", "dew_dun02", "dew_fild01", "dew_in01", "dewata", "dic_dun01", "dic_dun02", "dic_dun03", "dic_fild01",
  "dic_fild02", "dic_in01", "dicastes01", "dicastes02", "e_hugel", "e_tower", "ecl_fild01", "ecl_hub01", "ecl_in01", "ecl_in02",
  "ecl_in03", "ecl_in04", "ecl_tdun01", "ecl_tdun02", "ecl_tdun03", "ecl_tdun04", "eclage", "ein_d02_i", "ein_dun01",
  "ein_dun02", "ein_dun03", "ein_fild01", "ein_fild02", "ein_fild03", "ein_fild04", "ein_fild05", "ein_fild06", "ein_fild07",
  "ein_fild08", "ein_fild09", "ein_fild10", "ein_in01", "einbech", "einbroch", "einbroch_in", "evt_bomb", "evt_mobroom",
  "evt_swar_b", "evt_swar_r", "evt_swar_s", "evt_swar_t", "for_dun01", "for_dun02", "force_1-1", "force_1-2", "force_1-3",
  "force_2-1", "force_2-2", "force_2-3", "force_3-1", "force_3-2", "force_3-3", "force_4-1", "force_5-1", "force_map1",
  "force_map2", "force_map3", "g_room1-1", "g_room1-2", "g_room1-3", "g_room2", "gef_d01_i", "gef_dun00", "gef_dun01",
  "gef_dun02", "gef_dun03", "gef_fild00", "gef_fild01", "gef_fild02", "gef_fild03", "gef_fild04", "gef_fild05", "gef_fild06",
  "gef_fild07", "gef_fild08", "gef_fild09", "gef_fild10", "gef_fild11", "gef_fild12", "gef_fild13", "gef_fild14", "gef_tower",
  "gefenia01", "gefenia02", "gefenia03", "gefenia04", "geffen", "geffen_armory", "geffen_in", "geffen_tool", "geffen_weapon",
  "geffenblack", "geffenia", "gefg_cas01", "gefg_cas02", "gefg_cas03", "gefg_cas04", "gefg_cas05", "gl_cas01", "gl_cas01_",
  "gl_cas02", "gl_cas02_", "gl_church", "gl_chyard", "gl_chyard_", "gl_dun01", "gl_dun02", "gl_in01", "gl_knt01", "gl_knt02",
  "gl_prison", "gl_prison1", "gl_sew01", "gl_sew02", "gl_sew03", "gl_sew04", "gl_step", "glast_01", "gld2_ald", "gld2_gef",
  "gld2_pay", "gld2_prt", "gld_dun01", "gld_dun01_2", "gld_dun02", "gld_dun02_2", "gld_dun03", "gld_dun03_2", "gld_dun04",
  "gld_dun04_2", "gon_dun01", "gon_dun02", "gon_dun03", "gon_fild01", "gon_in", "gon_test", "gonryun", "grademk", "guild_room",
  "guild_vs1", "guild_vs1-1", "guild_vs1-2", "guild_vs1-3", "guild_vs1-4", "guild_vs2", "guild_vs2-1", "guild_vs2-2",
  "guild_vs3", "guild_vs4", "guild_vs5", "gw_fild01", "gw_fild02", "har_in01", "harboro1", "harboro2", "hem_dun01", "hem_dun02",
  "hem_fild", "hero_dun1", "hero_ent1", "hero_ent2", "hero_ent3", "hero_in1", "hero_in2", "hero_in3", "hero_in4", "hero_lb",
  "hero_out1", "hero_out2", "hero_out3", "hero_out4", "hero_tra", "herosria", "himinn", "hu_fild01", "hu_fild02", "hu_fild03",
  "hu_fild04", "hu_fild05", "hu_fild06", "hu_fild07", "hu_in01", "hugel", "hunter_1-1", "hunter_2-1", "hunter_3-1", "icas_in",
  "icas_in2", "ice_d03_i", "ice_dun01", "ice_dun02", "ice_dun03", "ice_dun04", "icecastle", "in_hunter", "in_moc_16",
  "in_orcs01", "in_rogue", "in_sphinx1", "in_sphinx2", "in_sphinx3", "in_sphinx4", "in_sphinx5", "int_land", "int_land01",
  "int_land02", "int_land03", "int_land04", "itemmall", "iz_ac01", "iz_ac01_a", "iz_ac01_b", "iz_ac01_c", "iz_ac01_d", "iz_ac02",
  "iz_ac02_a", "iz_ac02_b", "iz_ac02_c", "iz_ac02_d", "iz_d04_i", "iz_d05_i", "iz_dun00", "iz_dun01", "iz_dun02", "iz_dun03",
  "iz_dun04", "iz_dun05", "iz_in_a", "iz_in_b", "iz_in_c", "iz_in_d", "iz_int", "iz_int01", "iz_int02", "iz_int03", "iz_int04",
  "iz_ng01", "izlu2dun", "izlude", "izlude_a", "izlude_b", "izlude_c", "izlude_d", "izlude_in", "jalbe_in", "jawaii",
  "jawaii_in", "jawaii_in01", "job3_arch01", "job3_arch02", "job3_arch03", "job3_gen01", "job3_guil01", "job3_guil02",
  "job3_guil03", "job3_rang01", "job3_rang02", "job3_rune01", "job3_rune02", "job3_rune03", "job3_sha01", "job3_war01",
  "job3_war02", "job4_bio", "job4_mag", "job4_tro", "job_cru", "job_duncer", "job_gun", "job_hunte", "job_hunter", "job_knight",
  "job_knt", "job_ko", "job_monk", "job_priest", "job_prist", "job_sage", "job_soul", "job_star", "job_sword1", "job_thief1",
  "job_wiz", "job_wizard", "jor_ab01", "jor_ab02", "jor_albe", "jor_back1", "jor_back2", "jor_back3", "jor_back4", "jor_back5",
  "jor_back6", "jor_base", "jor_crk", "jor_crk_p", "jor_dun01", "jor_dun02", "jor_dun03", "jor_maze", "jor_mbase", "jor_nest",
  "jor_que", "jor_raise1", "jor_raise2", "jor_root1", "jor_root2", "jor_root3", "jor_safty1", "jor_safty2", "jor_sanct",
  "jor_sklf1", "jor_sklf2", "jor_tail", "jor_tmple1", "jor_tmple2", "jor_twice", "jor_twig", "jupe_area1", "jupe_area2",
  "jupe_cave", "jupe_core", "jupe_core2", "jupe_ele", "jupe_ele_r", "jupe_gate", "juperos_01", "juperos_02", "kame_house",
  "kh_dun01", "kh_dun02", "kh_kiehl01", "kh_kiehl02", "kh_mansion", "kh_rossi", "kh_school", "kh_vila", "knight_1-1",
  "knight_2-1", "knight_3-1", "lasa_dun01", "lasa_dun02", "lasa_dun03", "lasa_dun_q", "lasa_fild01", "lasa_fild02", "lasa_in01",
  "lasa_sea", "lasagna", "lhz_airport", "lhz_cube", "lhz_d_n2", "lhz_dun01", "lhz_dun02", "lhz_dun03", "lhz_dun04", "lhz_dun_n",
  "lhz_fild01", "lhz_fild02", "lhz_fild03", "lhz_in01", "lhz_in02", "lhz_in03", "lhz_que01", "lighthalzen", "lou_dun01",
  "lou_dun02", "lou_dun03", "lou_fild01", "lou_in01", "lou_in02", "louyang", "luna_sf1", "luna_sf2", "ma_dun01", "ma_fild01",
  "ma_fild02", "ma_in01", "ma_scene01", "ma_zif01", "ma_zif02", "ma_zif03", "ma_zif04", "ma_zif05", "ma_zif06", "ma_zif07",
  "ma_zif08", "ma_zif09", "mag_dun01", "mag_dun02", "mag_dun03", "mal_dun01", "mal_in01", "mal_in02", "malangdo", "malaya",
  "man_fild01", "man_fild02", "man_fild03", "man_in01", "manuk", "mbase_in", "memohall", "mid_camp", "mid_campin", "mjo_dun01",
  "mjo_dun02", "mjo_dun03", "mjo_wst01", "mjolnir_01", "mjolnir_02", "mjolnir_03", "mjolnir_04", "mjolnir_05", "mjolnir_06",
  "mjolnir_07", "mjolnir_08", "mjolnir_09", "mjolnir_10", "mjolnir_11", "mjolnir_12", "moc_akhet", "moc_castle", "moc_fild01",
  "moc_fild02", "moc_fild03", "moc_fild04", "moc_fild05", "moc_fild06", "moc_fild07", "moc_fild08", "moc_fild09", "moc_fild10",
  "moc_fild11", "moc_fild12", "moc_fild13", "moc_fild14", "moc_fild15", "moc_fild16", "moc_fild17", "moc_fild18", "moc_fild19",
  "moc_fild20", "moc_fild21", "moc_fild22", "moc_fild22b", "moc_para01", "moc_pryd01", "moc_pryd02", "moc_pryd03", "moc_pryd04",
  "moc_pryd05", "moc_pryd06", "moc_prydb1", "moc_prydn1", "moc_prydn2", "moc_ruins", "monk_in", "monk_test", "mora", "moro_cav",
  "moro_vol", "morocc", "morocc_in", "morocc_in02", "morocc_in03", "morocc_in04", "morocc_in05", "moscovia", "mosk_dun01",
  "mosk_dun02", "mosk_dun03", "mosk_fild01", "mosk_fild02", "mosk_in", "mosk_que", "mosk_ship", "mu_fild01", "n_castle",
  "nakhyang", "nameless_i", "nameless_in", "nameless_n", "new_1-1", "new_1-2", "new_1-3", "new_1-4", "new_2-1", "new_2-2",
  "new_2-3", "new_2-4", "new_3-1", "new_3-2", "new_3-3", "new_3-4", "new_4-1", "new_4-2", "new_4-3", "new_4-4", "new_5-1",
  "new_5-2", "new_5-3", "new_5-4", "new_event", "new_zone01", "new_zone02", "new_zone03", "new_zone04", "nguild_alde",
  "nguild_gef", "nguild_pay", "nguild_prt", "nif_dun01", "nif_dun02", "nif_fild01", "nif_fild02", "nif_fild03", "nif_in",
  "niflheim", "niflxmas", "nyd_dun01", "nyd_dun02", "odin_past", "odin_tem01", "odin_tem02", "odin_tem03", "orcsdun01",
  "orcsdun02", "ordeal_1-1", "ordeal_1-2", "ordeal_2-1", "ordeal_2-2", "ordeal_3-1", "ordeal_3-2", "ordeal_a00", "ordeal_a02",
  "oz_dun01", "oz_dun02", "p_track01", "p_track02", "paramk", "pay_arche", "pay_d03_i", "pay_dun00", "pay_dun01", "pay_dun02",
  "pay_dun03", "pay_dun04", "pay_fild01", "pay_fild02", "pay_fild03", "pay_fild04", "pay_fild05", "pay_fild06", "pay_fild07",
  "pay_fild08", "pay_fild09", "pay_fild10", "pay_fild11", "pay_gld", "payg_cas01", "payg_cas02", "payg_cas03", "payg_cas04",
  "payg_cas05", "payon", "payon_in01", "payon_in02", "payon_in03", "payon_in04", "poring_c01", "poring_c02", "poring_w01",
  "poring_w02", "pprontera", "priest_1-1", "priest_2-1", "priest_3-1", "prontera", "prt_are01", "prt_are_in", "prt_cas",
  "prt_cas_q", "prt_castle", "prt_church", "prt_elib", "prt_evt_in", "prt_fild00", "prt_fild01", "prt_fild02", "prt_fild03",
  "prt_fild04", "prt_fild05", "prt_fild06", "prt_fild07", "prt_fild08", "prt_fild08a", "prt_fild08b", "prt_fild08c",
  "prt_fild08d", "prt_fild09", "prt_fild10", "prt_fild11", "prt_gld", "prt_in", "prt_lib", "prt_lib_q", "prt_maze01",
  "prt_maze02", "prt_maze03", "prt_mk", "prt_monk", "prt_mz03_i", "prt_pri00", "prt_prison", "prt_q", "prt_sewb1", "prt_sewb2",
  "prt_sewb3", "prt_sewb4", "prt_tool", "prt_weapon", "prtg_cas01", "prtg_cas02", "prtg_cas03", "prtg_cas04", "prtg_cas05",
  "pub_cat", "pvp_2vs2", "pvp_c_room", "pvp_n_1-1", "pvp_n_1-2", "pvp_n_1-3", "pvp_n_1-4", "pvp_n_1-5", "pvp_n_2-1", "pvp_n_2-2",
  "pvp_n_2-3", "pvp_n_2-4", "pvp_n_2-5", "pvp_n_3-1", "pvp_n_3-2", "pvp_n_3-3", "pvp_n_3-4", "pvp_n_3-5", "pvp_n_4-1",
  "pvp_n_4-2", "pvp_n_4-3", "pvp_n_4-4", "pvp_n_4-5", "pvp_n_5-1", "pvp_n_5-2", "pvp_n_5-3", "pvp_n_5-4", "pvp_n_5-5",
  "pvp_n_6-1", "pvp_n_6-2", "pvp_n_6-3", "pvp_n_6-4", "pvp_n_6-5", "pvp_n_7-1", "pvp_n_7-2", "pvp_n_7-3", "pvp_n_7-4",
  "pvp_n_7-5", "pvp_n_8-1", "pvp_n_8-2", "pvp_n_8-3", "pvp_n_8-4", "pvp_n_8-5", "pvp_n_room", "pvp_room", "pvp_y_1-1",
  "pvp_y_1-2", "pvp_y_1-3", "pvp_y_1-4", "pvp_y_1-5", "pvp_y_2-1", "pvp_y_2-2", "pvp_y_2-3", "pvp_y_2-4", "pvp_y_2-5",
  "pvp_y_3-1", "pvp_y_3-2", "pvp_y_3-3", "pvp_y_3-4", "pvp_y_3-5", "pvp_y_4-1", "pvp_y_4-2", "pvp_y_4-3", "pvp_y_4-4",
  "pvp_y_4-5", "pvp_y_5-1", "pvp_y_5-2", "pvp_y_5-3", "pvp_y_5-4", "pvp_y_5-5", "pvp_y_6-1", "pvp_y_6-2", "pvp_y_6-3",
  "pvp_y_6-4", "pvp_y_6-5", "pvp_y_7-1", "pvp_y_7-2", "pvp_y_7-3", "pvp_y_7-4", "pvp_y_7-5", "pvp_y_8-1", "pvp_y_8-2",
  "pvp_y_8-3", "pvp_y_8-4", "pvp_y_8-5", "pvp_y_room", "que_avan01", "que_ba", "que_bingo", "que_dan01", "que_dan02",
  "que_god01", "que_god02", "que_house_s", "que_hugel", "que_job01", "que_job02", "que_job03", "que_lhz", "que_moc_16",
  "que_moon", "que_ng", "que_qaru01", "que_qaru02", "que_qaru03", "que_qaru04", "que_qaru05", "que_qsch01", "que_qsch02",
  "que_qsch03", "que_qsch04", "que_qsch05", "que_rachel", "que_san04", "que_sign01", "que_sign02", "que_swat", "que_temsky",
  "que_thor", "que_thr", "quiz_00", "quiz_01", "quiz_02", "quiz_test", "ra_fild01", "ra_fild02", "ra_fild03", "ra_fild04",
  "ra_fild05", "ra_fild06", "ra_fild07", "ra_fild08", "ra_fild09", "ra_fild10", "ra_fild11", "ra_fild12", "ra_fild13", "ra_in01",
  "ra_pol01", "ra_san01", "ra_san02", "ra_san03", "ra_san04", "ra_san05", "ra_temin", "ra_temple", "ra_temsky", "rachel",
  "rag_fes", "rag_fes_a", "rebel_in", "rgsr_in", "rockmi1", "rockmi2", "rockrdg1", "rockrdg2", "s_atelier", "sch_gld", "sch_lab",
  "schg_cas01", "schg_cas02", "schg_cas03", "schg_cas04", "schg_cas05", "schg_dun01", "schg_que01", "sec_in01", "sec_in02",
  "sec_pri", "siege_test", "silk_lair", "slabw01", "sp_cor", "sp_os", "sp_rudus", "sp_rudus2", "sp_rudus3", "sp_rudus4",
  "spl_fild01", "spl_fild02", "spl_fild03", "spl_in01", "spl_in02", "splendide", "star_frst", "star_in", "sword_1-1",
  "sword_2-1", "sword_3-1", "t_garden", "te_alde_gld", "te_aldecas1", "te_aldecas2", "te_aldecas3", "te_aldecas4", "te_aldecas5",
  "te_prt_gld", "te_prtcas01", "te_prtcas02", "te_prtcas03", "te_prtcas04", "te_prtcas05", "teg_dun01", "teg_dun02",
  "tha_scene01", "tha_t01", "tha_t02", "tha_t03", "tha_t04", "tha_t05", "tha_t06", "tha_t07", "tha_t08", "tha_t09", "tha_t10",
  "tha_t11", "tha_t12", "thana_boss", "thana_step", "thor_camp", "thor_v01", "thor_v02", "thor_v03", "tra_fild", "treasure01",
  "treasure02", "treasure_n1", "treasure_n2", "tur_d03_i", "tur_d04_i", "tur_d04ia", "tur_d04ib", "tur_dun01", "tur_dun02",
  "tur_dun03", "tur_dun04", "tur_dun05", "tur_dun06", "turbo_e_16", "turbo_e_4", "turbo_e_8", "turbo_n_1", "turbo_n_16",
  "turbo_n_4", "turbo_n_8", "turbo_room", "uknw_ruin", "uknw_ruin2", "um_dun01", "um_dun02", "um_fild01", "um_fild02",
  "um_fild03", "um_fild04", "um_in", "umbala", "un_bk_q", "un_bunker", "un_myst", "valkyrie", "ve_fild01", "ve_fild02",
  "ve_fild03", "ve_fild04", "ve_fild05", "ve_fild06", "ve_fild07", "ve_in", "ve_in02", "veins", "ver_eju", "ver_tunn", "verus01",
  "verus02", "verus02_a", "verus02_b", "verus03", "verus04", "vis_h01", "vis_h02", "vis_h03", "vis_h04", "vr_bob", "wizard_1-1",
  "wizard_2-1", "wizard_3-1", "wolfvill", "x_lhz", "x_prt", "x_ra", "xmas", "xmas_dun01", "xmas_dun02", "xmas_fild01", "xmas_in",
  "y_airport", "ygg_edge", "ygg_fruit", "ygg_roots", "yggdrasil01", "yuno", "yuno_fild01", "yuno_fild02", "yuno_fild03",
  "yuno_fild04", "yuno_fild05", "yuno_fild06", "yuno_fild07", "yuno_fild08", "yuno_fild09", "yuno_fild10", "yuno_fild11",
  "yuno_fild12", "yuno_in01", "yuno_in02", "yuno_in03", "yuno_in04", "yuno_in05", "yuno_pre", "z_agit", "alb2trea", "glast_01", "izlu2dun",
  "nameless_n"
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
  // Original mapflagConstant
  "mf_restricted", "mf_noskill", "mf_novending", "mf_nocommand", "mf_nomemo", "mf_noteleport", "mf_nowarp", "mf_nosave", "mf_nobranch",
  "mf_nopenalty", "mf_nozenypenalty", "mf_pvp","mf_gvg", "mf_battleground", "mf_nightenabled", "mf_snow","mf_fog", "mf_sakura", "mf_leaves",
  "mf_rain", "mf_clouds", "mf_fireworks", "mf_skill_damage", "mf_skill_duration", "mf_loadevent", "mf_instakill", "MF_RESTRICTED",
  "mf_nodrop","mf_nomobloot","mf_nomvploot","mf_nowarpto",
  // Original optionsConstant
  "Option_Nothing","Option_Sight","Option_Hide","Option_Cloak","Option_Falcon","Option_Riding","Option_Invisible",
  "Option_Orcish","Option_Wedding","Option_Chasewalk","Option_Flying","Option_Xmas","Option_Transform","Option_Summer",
  "Option_Dragon1","Option_Wug","Option_Wugrider","Option_Madogear","Option_Dragon2","Option_Dragon3","Option_Dragon4",
  "Option_Dragon5","Option_Hanbok","Option_Oktoberfest","Option_Dragon","Option_Costume",
  // Other constants from documentation
  "MD_CANATTACK","MD_AGGRESSIVE","MD_CANMOVE","MD_SKILL","MD_ANGRY","MD_LOOTER",
  "ITEMINFO_BUY", "ITEMINFO_SELL", "ITEMINFO_TYPE", "ITEMINFO_MAXCHANCE", "ITEMINFO_GENDER", "ITEMINFO_LOCATIONS", "ITEMINFO_WEIGHT", "ITEMINFO_ATTACK",
  "ITEMINFO_DEFENSE", "ITEMINFO_RANGE", "ITEMINFO_SLOT", "ITEMINFO_VIEW", "ITEMINFO_EQUIPLEVELMIN", "ITEMINFO_WEAPONLEVEL", "ITEMINFO_ALIASNAME",
  "ITEMINFO_EQUIPLEVELMAX", "ITEMINFO_MAGICATTACK", "ITEMINFO_ID", "ITEMINFO_AEGISNAME", "ITEMINFO_ARMORLEVEL", "ITEMINFO_SUBTYPE",
  "MOB_NAME", "MOB_LV", "MOB_MAXHP", "MOB_BASEEXP", "MOB_JOBEXP", "MOB_ATK1", "MOB_ATK2", "MOB_DEF", "MOB_MDEF", "MOB_RES", "MOB_MRES", "MOB_STR", "MOB_AGI", "MOB_VIT", "MOB_INT", "MOB_DEX", "MOB_LUK",
  "MOB_RANGE", "MOB_RANGE2", "MOB_RANGE3", "MOB_SIZE", "MOB_RACE", "MOB_ELEMENT", "MOB_MODE", "MOB_MVPEXP", "MOB_ID",
  "PETINFO_ID", "PETINFO_CLASS", "PETINFO_NAME", "PETINFO_INTIMATE", "PETINFO_HUNGRY", "PETINFO_RENAMED", "PETINFO_LEVEL", "PETINFO_BLOCKID",
  "PETINFO_EGGID", "PETINFO_FOODID", "PET_INTIMATE_NONE", "PET_INTIMATE_AWKWARD", "PET_INTIMATE_SHY", "PET_INTIMATE_NEUTRAL", "PET_INTIMATE_CORDIAL", "PET_INTIMATE_LOYAL",
  "PET_HUNGRY_NONE", "PET_HUNGRY_VERY_HUNGRY", "PET_HUNGRY_HUNGRY", "PET_HUNGRY_NEUTRAL", "PET_HUNGRY_SATISFIED", "PET_HUNGRY_STUFFED",
  "HOMINFO_ID", "HOMINFO_CLASS", "HOMINFO_NAME", "HOMINFO_INTIMATE", "HOMINFO_HUNGRY", "HOMINFO_RENAMED", "HOMINFO_LEVEL", "HOMINFO_BLOCKID", // Assuming similar structure to PETINFO
  "MERCINFO_ID", "MERCINFO_CLASS", "MERCINFO_NAME", "MERCINFO_FAITH", "MERCINFO_CALLS", "MERCINFO_KILLS", "MERCINFO_LIFETIME", "MERCINFO_LEVEL", "MERCINFO_BLOCKID",
  "ELEMINFO_ID", "ELEMINFO_CLASS", "ELEMINFO_NAME", "ELEMINFO_GAMEID", // Simplified example
  "GUILD_PERM_INVITE", "GUILD_PERM_EXPEL", "GUILD_PERM_STORAGE", "GUILD_PERM_ALL", "ARCH_MERC_GUILD", "SPEAR_MERC_GUILD", "SWORD_MERC_GUILD",
  "PCBLOCK_MOVE", "PCBLOCK_ATTACK", "PCBLOCK_SKILL", "PCBLOCK_USEITEM", "PCBLOCK_CHAT", "PCBLOCK_IMMUNE", "PCBLOCK_SITSTAND",
  "PCBLOCK_COMMANDS", "PCBLOCK_NPCCLICK", "PCBLOCK_EMOTION", "PCBLOCK_NPC", "PCBLOCK_ALL", "PCBLOCK_EQUIP",
  "QTYPE_NONE", "QTYPE_QUEST", "QTYPE_QUEST2", "QTYPE_JOB", "QTYPE_JOB2", "QTYPE_EVENT", "QTYPE_EVENT2", "QTYPE_WARG", "QTYPE_WARG2",
  "QTYPE_CLICKME", "QTYPE_DAILYQUEST", "QTYPE_EVENT3", "QTYPE_JOBQUEST", "QTYPE_JUMPING_PORING",
  "QMARK_NONE", "QMARK_YELLOW", "QMARK_GREEN", "QMARK_PURPLE", "BG_INFO_ID", "BG_INFO_REQUIRED_PLAYERS", "BG_INFO_MAX_PLAYERS", "BG_INFO_MIN_LEVEL", "BG_INFO_MAX_LEVEL", "BG_INFO_MAPS", "BG_INFO_DESERTER_TIME",
  "IM_NONE", "IM_CHAR", "IM_PARTY", "IM_GUILD", "IM_CLAN", "IWA_NONE", "IWA_NOTDEAD",
  "PC_PERM_TRADE", "PC_PERM_PARTY", "PC_PERM_ALL_SKILL", "PC_PERM_USE_ALL_EQUIPMENT", "PC_PERM_SKILL_UNCONDITIONAL", "PC_PERM_JOIN_ALL_CHAT", "PC_PERM_NO_CHAT_KICK", "PC_PERM_HIDE_SESSION", "PC_PERM_WHO_DISPLAY_AID", "PC_PERM_RECEIVE_HACK_INFO", "PC_PERM_WARP_ANYWHERE", "PC_PERM_VIEW_HPMETER", "PC_PERM_VIEW_EQUIPMENT", "PC_PERM_USE_CHECK", "PC_PERM_USE_CHANGEMAPTYPE", "PC_PERM_USE_ALL_COMMANDS", "PC_PERM_RECEIVE_REQUESTS", "PC_PERM_SHOW_BOSS", "PC_PERM_DISABLE_PVM", "PC_PERM_DISABLE_PVP", "PC_PERM_DISABLE_CMD_DEAD", "PC_PERM_CHANNEL_ADMIN", "PC_PERM_TRADE_BOUNDED", "PC_PERM_ITEM_UNCONDITIONAL", "PC_PERM_ENABLE_COMMAND", "PC_PERM_BYPASS_STAT_ONCLONE", "PC_PERM_BYPASS_MAX_STAT", "PC_PERM_ATTENDANCE", "PC_PERM_MACRO_DETECT", "PC_PERM_MACRO_REGISTER", "PC_PERM_TRADE_UNCONDITIONAL", "PC_PERM_MAX",
  "IIT_ID", "IIT_TIME_LIMIT", "IIT_IDLE_TIMEOUT", "IIT_ENTER_MAP", "IIT_ENTER_X", "IIT_ENTER_Y", "IIT_MAPCOUNT", "IIT_MAP",
  "ILI_NAME", "ILI_MODE", "ILI_OWNER", "SP_SITTING", "Sitting",
  "ACHIEVEINFO_COUNT1", "ACHIEVEINFO_COUNT2", "ACHIEVEINFO_COUNT3", "ACHIEVEINFO_COUNT4", "ACHIEVEINFO_COUNT5", "ACHIEVEINFO_COUNT6",
  "ACHIEVEINFO_COUNT7", "ACHIEVEINFO_COUNT8", "ACHIEVEINFO_COUNT9", "ACHIEVEINFO_COUNT10", "ACHIEVEINFO_COMPLETE", "ACHIEVEINFO_COMPLETEDATE",
  "ACHIEVEINFO_GOTREWARD", "ACHIEVEINFO_LEVEL", "ACHIEVEINFO_SCORE",
  "CHAN_OPT_BASE", "CHAN_OPT_ANNOUNCE_SELF", "CHAN_OPT_ANNOUNCE_JOIN", "CHAN_OPT_ANNOUNCE_LEAVE", "CHAN_OPT_MSG_DELAY",
  "CHAN_OPT_COLOR_OVERRIDE", "CHAN_OPT_CAN_CHAT", "CHAN_OPT_CAN_LEAVE", "CHAN_OPT_AUTOJOIN",
  "SKILL_PERM", "SKILL_TEMP", "SKILL_TEMPLEVEL", "SKILL_PERM_GRANT",
  "RC2_NONE", "RC2_GOBLIN", "RC2_KOBOLD", "RC2_ORC", "RC2_GOLEM", "RC2_NINJA", "RC2_GVG", "RC2_TREASURE", "RC2_BIOLAB", "RC2_MANUK", "RC2_SPLENDIDE", "RC2_SCARABA", "RC2_OGH_ATK_DEF", 
  "RC2_OGH_HIDDEN", "RC2_BIO5_SWORDMAN_THIEF", "RC2_BIO5_ACOLYTE_MERCHANT", "RC2_BIO5_MAGE_ARCHER", "RC2_BIO5_MVP", "RC2_CLOCKTOWER", "RC2_THANATOS",
  "RC2_FACEWORM", "RC2_HEARTHUNTER", "RC2_ROCKRIDGE", "RC2_WERNER_LAB", "RC2_TEMPLE_DEMON", "RC2_ILLUSION_VAMPIRE", "RC2_MALANGDO", "RC2_EP172ALPHA", "RC2_EP172BETA", "RC2_EP172BATH", 
  "RC2_ILLUSION_TURTLE", "RC2_RACHEL_SANCTUARY", "RC2_ILLUSION_LUANDA", "RC2_ILLUSION_FROZEN", "RC2_ILLUSION_MOONLIGHT", "RC2_EP16_DEF", "RC2_EDDA_ARUNAFELTZ", "RC2_MAX",
  "SCSTART_NOAVOID", "SCSTART_NOTICKDEF", "SCSTART_LOADED", "SCSTART_NORATEDEF", "SCSTART_NOICON",
  "BF_SHORT", "BF_LONG", "BF_NONE", "BF_WEAPON", "BF_MAGIC", "BF_MISC", "BF_NORMAL", "BF_SKILL",
  "USW_NONE", "USW_FIXPOS", "USW_MOVE_ONCE", "USW_MOVE_FULL_CELL", "USW_FORCE_STOP",
  "NAV_NONE", "NAV_AIRSHIP_ONLY", "NAV_SCROLL_ONLY", "NAV_AIRSHIP_AND_SCROLL", "NAV_KAFRA_ONLY", "NAV_KAFRA_AND_AIRSHIP",
  "NAV_KAFRA_AND_SCROLL", "NAV_ALL", "ATF_SELF", "ATF_TARGET", "ATF_SHORT", "ATF_LONG", "ATF_WEAPON", "ATF_MAGIC", "ATF_MISC",
  "DIR_NORTH", "DIR_NORTHEAST", "DIR_EAST", "DIR_SOUTHEAST", "DIR_SOUTH", "DIR_SOUTHWEST", "DIR_WEST", "DIR_NORTHWEST",
  "DT_SECOND", "DT_MINUTE", "DT_HOUR", "DT_DAYOFWEEK", "DT_DAYOFMONTH", "DT_MONTH", "DT_YEAR", "DT_DAYOFYEAR", "DT_YYYYMMDD",
  "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY",
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
  "BL_PC", "BL_NPC", "BL_PET", "BL_MOB", "BL_HOM", "BL_MER", "BL_ELEM",
  "REFINE_COST_NORMAL", "REFINE_COST_HD", "REFINE_COST_ENRICHED", "REFINE_ZENY_COST", "REFINE_MATERIAL_ID",
  "STOR_MODE_NONE", "STOR_MODE_GET", "STOR_MODE_PUT", "DIALOG_ALIGN_LEFT", "DIALOG_ALIGN_RIGHT", "DIALOG_ALIGN_CENTER", "DIALOG_ALIGN_TOP", "DIALOG_ALIGN_MIDDLE", "DIALOG_ALIGN_BOTTOM",
  "ADOPT_ALLOWED", "ADOPT_ALREADY_ADOPTED", "ADOPT_MARRIED_AND_PARTY", "ADOPT_EQUIP_RINGS", "ADOPT_NOT_NOVICE",
  "ADOPT_CHARACTER_NOT_FOUND", "ADOPT_MORE_CHILDREN", "ADOPT_LEVEL_70", "ADOPT_MARRIED",
  "GSTORAGE_OPEN", "GSTORAGE_STORAGE_ALREADY_OPEN", "GSTORAGE_ALREADY_OPEN", "GSTORAGE_NO_GUILD", "GSTORAGE_NO_STORAGE", "GSTORAGE_NO_PERMISSION",
  "GUILDSTORAGE_LOG_FINAL_SUCCESS", "GUILDSTORAGE_LOG_EMPTY", "GUILDSTORAGE_LOG_FAILED",
  "Size_Small", "Size_Medium", "Size_Large",
  "AI_NONE", "AI_ATTACK", "AI_SPHERE", "AI_FLORA", "AI_ZANZOU", "AI_LEGION", "AI_FAW", "AI_WAVEMODE",
  "SKILLDMG_MAX", "SKILLDMG_PC", "SKILLDMG_MOB", "SKILLDMG_BOSS", "SKILLDMG_OTHER", "SKILLDMG_CASTER",
  "ROA_ID", "ROA_VALUE", "ROA_PARAM",
  "MADO_ROBOT", "MADO_SUIT", "ENCHANTGRADE_NONE","ENCHANTGRADE_A","ENCHANTGRADE_B","ENCHANTGRADE_C","ENCHANTGRADE_D",
  "PET_CATCH_UNIVERSAL", "PET_CATCH_UNIVERSAL_ITEM",
  "INFINITE_TICK", "CPC_NAME", "CPC_CHAR", "CPC_ACCOUNT",
  "HAT_EF_BLIND", "HAT_EF_TALK", "HAT_EF_WATER", "HAT_EF_FIRE", "HAT_EF_STUN", "HAT_EF_SLEEP", "HAT_EF_CURSE", "HAT_EF_SILENCE", "HAT_EF_CONFUSION",
  "HAT_EF_POISON", "HAT_EF_PETRIFY", "HAT_EF_FREEZE", "HAT_EF_UP", "HAT_EF_DOWN", "HAT_EF_TALK2", "HAT_EF_MAX",
  // Unit Parameters (UMOB_*, UHOM_*, etc.) - These are very numerous and specific.
  // For now, just add the prefixes as a general rule or a few key ones.
  "UMOB_SIZE", "UMOB_LEVEL", "UMOB_HP", "UMOB_MAXHP", "UMOB_MASTERAID", "UMOB_MAPID", "UMOB_X", "UMOB_Y", "UMOB_SPEED", "UMOB_MODE", "UMOB_AI", "UMOB_SCOPTION", "UMOB_SEX", "UMOB_CLASS", "UMOB_HAIRSTYLE", "UMOB_HAIRCOLOR", "UMOB_HEADBOTTOM", "UMOB_HEADMIDDLE", "UMOB_HEADTOP", "UMOB_CLOTHCOLOR",
  "UMOB_SHIELD", "UMOB_WEAPON", "UMOB_LOOKDIR", "UMOB_CANMOVETICK", "UMOB_STR", "UMOB_AGI", "UMOB_VIT", "UMOB_INT", "UMOB_DEX", "UMOB_LUK", "UMOB_SLAVECPYMSTRMD", "UMOB_DMGIMMUNE", "UMOB_ATKRANGE", "UMOB_ATKMIN", "UMOB_ATKMAX", "UMOB_MATKMIN", "UMOB_MATKMAX", "UMOB_DEF", "UMOB_MDEF", "UMOB_HIT",
  "UMOB_FLEE", "UMOB_PDODGE", "UMOB_CRIT", "UMOB_RACE", "UMOB_ELETYPE", "UMOB_ELELEVEL", "UMOB_AMOTION", "UMOB_ADELAY", "UMOB_DMOTION", "UMOB_TARGETID", "UMOB_ROBE", "UMOB_BODY2", "UMOB_GROUP_ID", "UMOB_IGNORE_CELL_STACK_LIMIT", "UMOB_RES", "UMOB_MRES", "UMOB_DAMAGETAKEN", "UHOM_SIZE", "UHOM_LEVEL", "UHOM_HP",
  "UHOM_MAXHP", "UHOM_SP", "UHOM_MAXSP", "UHOM_MASTERCID", "UHOM_MAPID", "UHOM_X", "UHOM_Y", "UHOM_HUNGER", "UHOM_INTIMACY", "UHOM_SPEED", "UHOM_LOOKDIR", "UHOM_CANMOVETICK", "UHOM_STR", "UHOM_AGI", "UHOM_VIT", "UHOM_INT", "UHOM_DEX", "UHOM_LUK", "UHOM_DMGIMMUNE", "UHOM_ATKRANGE",
  "UHOM_ATKMIN", "UHOM_ATKMAX", "UHOM_MATKMIN", "UHOM_MATKMAX", "UHOM_DEF", "UHOM_MDEF", "UHOM_HIT", "UHOM_FLEE", "UHOM_PDODGE", "UHOM_CRIT", "UHOM_RACE", "UHOM_ELETYPE", "UHOM_ELELEVEL", "UHOM_AMOTION", "UHOM_ADELAY", "UHOM_DMOTION", "UHOM_TARGETID", "UHOM_GROUP_ID", "UPET_SIZE", "UPET_LEVEL",
  "UPET_HP", "UPET_MAXHP", "UPET_MASTERAID", "UPET_MAPID", "UPET_X", "UPET_Y", "UPET_HUNGER", "UPET_INTIMACY", "UPET_SPEED", "UPET_LOOKDIR", "UPET_CANMOVETICK", "UPET_STR", "UPET_AGI", "UPET_VIT", "UPET_INT", "UPET_DEX", "UPET_LUK", "UPET_DMGIMMUNE", "UPET_ATKRANGE", "UPET_ATKMIN",
  "UPET_ATKMAX", "UPET_MATKMIN", "UPET_MATKMAX", "UPET_DEF", "UPET_MDEF", "UPET_HIT", "UPET_FLEE", "UPET_PDODGE", "UPET_CRIT", "UPET_RACE", "UPET_ELETYPE", "UPET_ELELEVEL", "UPET_AMOTION", "UPET_ADELAY", "UPET_DMOTION", "UPET_GROUP_ID", "UMER_SIZE", "UMER_HP", "UMER_MAXHP", "UMER_MASTERCID",
  "UMER_MAPID", "UMER_X", "UMER_Y", "UMER_KILLCOUNT", "UMER_LIFETIME", "UMER_SPEED", "UMER_LOOKDIR", "UMER_CANMOVETICK", "UMER_STR", "UMER_AGI", "UMER_VIT", "UMER_INT", "UMER_DEX", "UMER_LUK", "UMER_DMGIMMUNE", "UMER_ATKRANGE", "UMER_ATKMIN", "UMER_ATKMAX", "UMER_MATKMIN", "UMER_MATKMAX",
  "UMER_DEF", "UMER_MDEF", "UMER_HIT", "UMER_FLEE", "UMER_PDODGE", "UMER_CRIT", "UMER_RACE", "UMER_ELETYPE", "UMER_ELELEVEL", "UMER_AMOTION", "UMER_ADELAY", "UMER_DMOTION", "UMER_TARGETID", "UMER_GROUP_ID", "UELE_SIZE", "UELE_HP", "UELE_MAXHP", "UELE_SP", "UELE_MAXSP", "UELE_MASTERCID",
  "UELE_MAPID", "UELE_X", "UELE_Y", "UELE_LIFETIME", "UELE_MODE", "UELE_SPEED", "UELE_LOOKDIR", "UELE_CANMOVETICK", "UELE_STR", "UELE_AGI", "UELE_VIT", "UELE_INT", "UELE_DEX", "UELE_LUK", "UELE_DMGIMMUNE", "UELE_ATKRANGE", "UELE_ATKMIN", "UELE_ATKMAX", "UELE_MATKMIN", "UELE_MATKMAX",
  "UELE_DEF", "UELE_MDEF", "UELE_HIT", "UELE_FLEE", "UELE_PDODGE", "UELE_CRIT", "UELE_RACE", "UELE_ELETYPE", "UELE_ELELEVEL", "UELE_AMOTION", "UELE_ADELAY", "UELE_DMOTION", "UELE_TARGETID", "UELE_GROUP_ID", "UNPC_LEVEL", "UNPC_HP", "UNPC_MAXHP", "UNPC_MAPID", "UNPC_X", "UNPC_Y",
  "UNPC_LOOKDIR", "UNPC_STR", "UNPC_AGI", "UNPC_VIT", "UNPC_INT", "UNPC_DEX", "UNPC_LUK", "UNPC_PLUSALLSTAT", "UNPC_DMGIMMUNE", "UNPC_ATKRANGE", "UNPC_ATKMIN", "UNPC_ATKMAX", "UNPC_MATKMIN", "UNPC_MATKMAX", "UNPC_DEF", "UNPC_MDEF", "UNPC_HIT", "UNPC_FLEE", "UNPC_PDODGE", "UNPC_CRIT",
  "UNPC_RACE", "UNPC_ELETYPE", "UNPC_ELELEVEL", "UNPC_AMOTION", "UNPC_ADELAY", "UNPC_DMOTION", "UNPC_SEX", "UNPC_CLASS", "UNPC_HAIRSTYLE", "UNPC_HAIRCOLOR", "UNPC_HEADBOTTOM", "UNPC_HEADMIDDLE", "UNPC_HEADTOP", "UNPC_CLOTHCOLOR", "UNPC_SHIELD", "UNPC_WEAPON", "UNPC_ROBE", "UNPC_BODY2", "UNPC_DEADSIT", "UNPC_GROUP_ID",
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
  "bc_all", "bc_map", "bc_self", "bc_area", "SELF", "AREA", "bc_pc", "bc_npc", "bc_yellow", "bc_blue", "bc_woe",
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
  "SC_CONTENTS_9", "SC_CONTENTS_10",

  // Jobs Constant
  "EA_NOVICE", "Job_Novice", "EA_SWORDMAN", "Job_Swordman", "EA_MAGE", "Job_Mage", "EA_ARCHER", "Job_Archer", "EA_ACOLYTE", "Job_Acolyte", "EA_MERCHANT", "Job_Merchant", "EA_THIEF", "Job_Thief", "EA_KNIGHT", "Job_Knight", "EA_PRIEST", "Job_Priest", "EA_WIZARD", "Job_Wizard", "EA_BLACKSMITH", "Job_Blacksmith", "EA_HUNTER", "Job_Hunter", "EA_ASSASSIN", "Job_Assassin", 
  "EA_CRUSADER", "Job_Crusader", "EA_MONK", "Job_Monk", "EA_SAGE", "Job_Sage", "EA_ALCHEMIST", "Job_Alchemist", "EA_BARD", "Job_Bard", "EA_DANCER", "Job_Dancer", "EA_KNIGHT2", "Job_Knight2", "EA_CRUSADER2", "Job_Crusader2", "EA_ROGUE", "Job_Rogue", "EA_HIGH_NOVICE", "Job_Novice_High", "EA_HIGH_SWORDMAN", "Job_Swordman_High", "EA_HIGH_MAGE", "Job_Mage_High", "EA_HIGH_ARCHER", 
  "Job_Archer_High", "EA_HIGH_ACOLYTE", "Job_Acolyte_High", "EA_HIGH_MERCHANT", "Job_Merchant_High", "EA_HIGH_THIEF", "Job_Thief_High", "EA_LORD_KNIGHT", "Job_Lord_Knight", "EA_HIGH_PRIEST", "Job_High_Priest", "EA_HIGH_WIZARD", "Job_High_Wizard", "EA_WHITESMITH", "Job_Whitesmith", "EA_SNIPER", "Job_Sniper", "EA_ASSASSIN_CROSS", "Job_Assassin_Cross", "EA_PALADIN", "Job_Paladin", "EA_CHAMPION", 
  "Job_Champion", "EA_PROFESSOR", "Job_Professor", "EA_CREATOR", "Job_Creator", "EA_CLOWN", "Job_Clown", "EA_GYPSY", "Job_Gypsy", "EA_LORD_KNIGHT2", "Job_Lord_Knight2", "EA_PALADIN2", "Job_Paladin2", "EA_STALKER", "Job_Stalker", "EA_RUNE_KNIGHT", "Job_Rune_Knight", "EA_WARLOCK", "Job_Warlock", "EA_RANGER", "Job_Ranger", "EA_ARCH_BISHOP", "Job_Arch_Bishop", "EA_MECHANIC", "Job_Mechanic", "EA_GUILLOTINE_CROSS", 
  "Job_Guillotine_Cross", "EA_ROYAL_GUARD", "Job_Royal_Guard", "EA_SORCERER", "Job_Sorcerer", "EA_MINSTREL", "Job_Minstrel", "EA_WANDERER", "Job_Wanderer", "EA_SURA", "Job_Sura", "EA_GENETIC", "Job_Genetic", "EA_SHADOW_CHASER", "Job_Shadow_Chaser", "EA_RUNE_KNIGHT2", "Job_Rune_Knight2", "EA_ROYAL_GUARD2", "Job_Royal_Guard2", "EA_MECHANIC2", "Job_Mechanic2", "EA_RUNE_KNIGHT_T", "Job_Rune_Knight_T", "EA_WARLOCK_T", 
  "Job_Warlock_T", "EA_RANGER_T", "Job_Ranger_T", "EA_ARCH_BISHOP_T", "Job_Arch_Bishop_T", "EA_MECHANIC_T", "Job_Mechanic_T", "EA_GUILLOTINE_CROSS_T", "Job_Guillotine_Cross_T", "EA_ROYAL_GUARD_T", "Job_Royal_Guard_T", "EA_SORCERER_T", "Job_Sorcerer_T", "EA_MINSTREL_T", "Job_Minstrel_T", "EA_WANDERER_T", "Job_Wanderer_T", "EA_SURA_T", "Job_Sura_T", "EA_GENETIC_T", "Job_Genetic_T", "EA_SHADOW_CHASER_T", "Job_Shadow_Chaser_T", 
  "EA_RUNE_KNIGHT_T2", "Job_Rune_Knight_T2", "EA_ROYAL_GUARD_T2", "Job_Royal_Guard_T2", "EA_MECHANIC_T2", "Job_Mechanic_T2", "EA_DRAGON_KNIGHT", "Job_Dragon_Knight", "EA_MEISTER", "Job_Meister", "EA_SHADOW_CROSS", "Job_Shadow_Cross", "EA_ARCH_MAGE", "Job_Arch_Mage", "EA_CARDINAL", "Job_Cardinal", "EA_WINDHAWK", "Job_Windhawk", "EA_IMPERIAL_GUARD", "Job_Imperial_Guard", "EA_BIOLO", "Job_Biolo", "EA_ABYSS_CHASER", "Job_Abyss_Chaser", 
  "EA_ELEMENTAL_MASTER", "Job_Elemental_Master", "EA_INQUISITOR", "Job_Inquisitor", "EA_TROUBADOUR", "Job_Troubadour", "EA_TROUVERE", "Job_Trouvere", "EA_DRAGON_KNIGHT2", "Job_Dragon_Knight2", "EA_IMPERIAL_GUARD2", "Job_Imperial_Guard2", "EA_MEISTER2", "Job_Meister2", "EA_SUPER_NOVICE", "Job_Super_Novice", "EA_SUPER_NOVICE_E", "Job_Super_Novice_E", "EA_GUNSLINGER", "Job_Gunslinger", "EA_NINJA", "Job_Ninja", "EA_TAEKWON", "Job_Taekwon", 
  "EA_STAR_GLADIATOR", "Job_Star_Gladiator", "EA_SOUL_LINKER", "Job_Soul_Linker", "EA_REBELLION", "Job_Rebellion", "EA_KAGEROU", "Job_Kagerou", "EA_OBORO", "Job_Oboro", "EA_STAR_EMPEROR", "Job_Star_Emperor", "EA_SOUL_REAPER", "Job_Soul_Reaper", "EA_NIGHT_WATCH", "Job_Night_Watch", "EA_SHINKIRO", "Job_Shinkiro", "EA_SHIRANUI", "Job_Shiranui", "EA_SKY_METEOR", "Job_Sky_Meteor", "EA_SOUL_ASCETIC", "Job_Soul_Ascetic", "EA_HYPER_NOVICE", 
  "Job_Hyper_Novice", "EA_SPIRIT_HANDLER", "Job_Spirit_Handler", "EA_SUMMONER", "Job_Summoner", "EA_BABY", "Job_Baby", "EA_BABY_SWORDMAN", "Job_Baby_Swordman", "EA_BABY_MAGE", "Job_Baby_Mage", "EA_BABY_ARCHER", "Job_Baby_Archer", "EA_BABY_ACOLYTE", "Job_Baby_Acolyte", "EA_BABY_MERCHANT", "Job_Baby_Merchant", "EA_BABY_THIEF", "Job_Baby_Thief", "EA_BABY_KNIGHT", "Job_Baby_Knight", "EA_BABY_PRIEST", "Job_Baby_Priest", "EA_BABY_WIZARD", 
  "Job_Baby_Wizard", "EA_BABY_BLACKSMITH", "Job_Baby_Blacksmith", "EA_BABY_HUNTER", "Job_Baby_Hunter", "EA_BABY_ASSASSIN", "Job_Baby_Assassin", "EA_BABY_CRUSADER", "Job_Baby_Crusader", "EA_BABY_MONK", "Job_Baby_Monk", "EA_BABY_SAGE", "Job_Baby_Sage", "EA_BABY_ROGUE", "Job_Baby_Rogue", "EA_BABY_ALCHEMIST", "Job_Baby_Alchemist", "EA_BABY_BARD", "Job_Baby_Bard", "EA_BABY_DANCER", "Job_Baby_Dancer", "EA_BABY_RUNE_KNIGHT", "Job_Baby_Rune_Knight", 
  "EA_BABY_WARLOCK", "Job_Baby_Warlock", "EA_BABY_RANGER", "Job_Baby_Ranger", "EA_BABY_ARCH_BISHOP", "Job_Baby_Arch_Bishop", "EA_BABY_MECHANIC", "Job_Baby_Mechanic", "EA_BABY_GUILLOTINE_CROSS", "Job_Baby_Guillotine_Cross", "EA_BABY_ROYAL_GUARD", "Job_Baby_Royal_Guard", "EA_BABY_SORCERER", "Job_Baby_Sorcerer", "EA_BABY_MINSTREL", "Job_Baby_Minstrel", "EA_BABY_WANDERER", "Job_Baby_Wanderer", "EA_BABY_SURA", "Job_Baby_Sura", "EA_BABY_GENETIC", 
  "Job_Baby_Genetic", "EA_BABY_SHADOW_CHASER", "Job_Baby_Shadow_Chaser", "EA_BABY_SUPER_NOVICE", "Job_Baby_Super_Novice", "EA_BABY_SUPER_NOVICE_E", "Job_Baby_Super_Novice_E", "EA_BABY_GUNSLINGER", "Job_Baby_Gunslinger", "EA_BABY_NINJA", "Job_Baby_Ninja", "EA_BABY_TAEKWON", "Job_Baby_Taekwon", "EA_BABY_STAR_GLADIATOR", "Job_Baby_Star_Gladiator", "EA_BABY_SOUL_LINKER", "Job_Baby_Soul_Linker", "EA_BABY_REBELLION", "Job_Baby_Rebellion", "EA_BABY_KAGEROU", 
  "Job_Baby_Kagerou", "EA_BABY_OBORO", "Job_Baby_Oboro", "EA_BABY_STAR_EMPEROR", "Job_Baby_Star_Emperor", "EA_BABY_SOUL_REAPER", "Job_Baby_Soul_REaper", "EA_BABY_SUMMONER", "Job_Baby_Summoner",
  // EFFECT CONSTANT
  "EF_HIT1", "EF_HIT2", "EF_HIT3", "EF_HIT4", "EF_HIT5", "EF_HIT6", "EF_ENTRY", "EF_EXIT", "EF_WARP", "EF_ENHANCE", "EF_COIN", "EF_ENDURE", "EF_BEGINSPELL", "EF_GLASSWALL", "EF_HEALSP", "EF_SOULSTRIKE", "EF_BASH_ALT", "EF_MAGNUMBREAK", "EF_STEAL", "EF_HIDING",
  "EF_PATTACK", "EF_DETOXICATION", "EF_SIGHT", "EF_STONECURSE", "EF_FIREBALL", "EF_FIREWALL", "EF_ICEARROW", "EF_FROSTDIVER", "EF_FROSTDIVER2", "EF_LIGHTBOLT", "EF_THUNDERSTORM", "EF_FIREARROW", "EF_NAPALMBEAT", "EF_RUWACH", "EF_TELEPORTATION", "EF_READYPORTAL", "EF_PORTAL", "EF_INCAGILITY", "EF_DECAGILITY", "EF_AQUA",
  "EF_SIGNUM", "EF_ANGELUS", "EF_BLESSING", "EF_INCAGIDEX", "EF_SMOKE", "EF_FIREFLY", "EF_SANDWIND", "EF_TORCH", "EF_SPRAYPOND", "EF_FIREHIT", "EF_FIRESPLASHHIT", "EF_COLDHIT", "EF_WINDHIT", "EF_POISONHIT", "EF_BEGINSPELL2", "EF_BEGINSPELL3", "EF_BEGINSPELL4", "EF_BEGINSPELL5", "EF_BEGINSPELL6", "EF_BEGINSPELL7",
  "EF_LOCKON", "EF_WARPZONE", "EF_SIGHTRASHER", "EF_BARRIER", "EF_ARROWSHOT", "EF_INVENOM", "EF_CURE", "EF_PROVOKE", "EF_MVP", "EF_SKIDTRAP", "EF_BRANDISHSPEAR", "EF_CONE", "EF_SPHERE", "EF_BOWLINGBASH", "EF_ICEWALL", "EF_GLORIA", "EF_MAGNIFICAT", "EF_RESURRECTION", "EF_RECOVERY", "EF_EARTHSPIKE",
  "EF_SPEARBMR", "EF_PIERCE", "EF_TURNUNDEAD", "EF_SANCTUARY", "EF_IMPOSITIO", "EF_LEXAETERNA", "EF_ASPERSIO", "EF_LEXDIVINA", "EF_SUFFRAGIUM", "EF_STORMGUST", "EF_LORD", "EF_BENEDICTIO", "EF_METEORSTORM", "EF_YUFITEL", "EF_YUFITELHIT", "EF_QUAGMIRE", "EF_FIREPILLAR", "EF_FIREPILLARBOMB", "EF_HASTEUP", "EF_FLASHER",
  "EF_REMOVETRAP", "EF_REPAIRWEAPON", "EF_CRASHEARTH", "EF_PERFECTION", "EF_MAXPOWER", "EF_BLASTMINE", "EF_BLASTMINEBOMB", "EF_CLAYMORE", "EF_FREEZING", "EF_BUBBLE", "EF_GASPUSH", "EF_SPRINGTRAP", "EF_KYRIE", "EF_MAGNUS", "EF_BOTTOM", "EF_BLITZBEAT", "EF_WATERBALL", "EF_WATERBALL2", "EF_FIREIVY", "EF_DETECTING",
  "EF_CLOAKING", "EF_SONICBLOW", "EF_SONICBLOWHIT", "EF_GRIMTOOTH", "EF_VENOMDUST", "EF_ENCHANTPOISON", "EF_POISONREACT", "EF_POISONREACT2", "EF_OVERTHRUST", "EF_SPLASHER", "EF_TWOHANDQUICKEN", "EF_AUTOCOUNTER", "EF_GRIMTOOTHATK", "EF_FREEZE", "EF_FREEZED", "EF_ICECRASH", "EF_SLOWPOISON", "EF_BOTTOM2", "EF_FIREPILLARON", "EF_SANDMAN",
  "EF_REVIVE", "EF_PNEUMA", "EF_HEAVENSDRIVE", "EF_SONICBLOW2", "EF_BRANDISH2", "EF_SHOCKWAVE", "EF_SHOCKWAVEHIT", "EF_EARTHHIT", "EF_PIERCESELF", "EF_BOWLINGSELF", "EF_SPEARSTABSELF", "EF_SPEARBMRSELF", "EF_HOLYHIT", "EF_CONCENTRATION", "EF_REFINEOK", "EF_REFINEFAIL", "EF_JOBCHANGE", "EF_LVUP", "EF_JOBLVUP", "EF_TOPRANK",
  "EF_PARTY", "EF_RAIN", "EF_SNOW", "EF_SAKURA", "EF_STATUS_STATE", "EF_BANJJAKII", "EF_MAKEBLUR", "EF_TAMINGSUCCESS", "EF_TAMINGFAILED", "EF_ENERGYCOAT", "EF_CARTREVOLUTION", "EF_VENOMDUST2", "EF_CHANGEDARK", "EF_CHANGEFIRE", "EF_CHANGECOLD", "EF_CHANGEWIND", "EF_CHANGEFLAME", "EF_CHANGEEARTH", "EF_CHAINGEHOLY", "EF_CHANGEPOISON",
  "EF_HITDARK", "EF_MENTALBREAK", "EF_MAGICALATTHIT", "EF_SUI_EXPLOSION", "EF_DARKATTACK", "EF_SUICIDE", "EF_COMBOATTACK1", "EF_COMBOATTACK2", "EF_COMBOATTACK3", "EF_COMBOATTACK4", "EF_COMBOATTACK5", "EF_GUIDEDATTACK", "EF_POISONATTACK", "EF_SILENCEATTACK", "EF_STUNATTACK", "EF_PETRIFYATTACK", "EF_CURSEATTACK", "EF_SLEEPATTACK", "EF_TELEKHIT", "EF_PONG",
  "EF_LEVEL99", "EF_LEVEL99_2", "EF_LEVEL99_3", "EF_GUMGANG", "EF_POTION1","EF_INCREASEAGI","EF_HEAL2", "EF_HEAL", "EF_POTION", "EF_POTION2",
  // ITEM SCRIPT CONSTANT
  "ELE_NEUTRAL", "ELE_WATER", "ELE_EARTH", "ELE_FIRE", "ELE_WIND", "ELE_POISON", "ELE_HOLY", "ELE_DARK", "ELE_GHOST", "ELE_UNDEAD", "ELE_ALL", "ELE_WEAPON", 
  "ELE_ENDOWED", "ELE_RANDOM", "RC_FORMLESS", "RC_UNDEAD", "RC_BRUTE", "RC_PLANT", "RC_INSECT", "RC_FISH", "RC_DEMON", "RC_DEMIHUMAN", "RC_ANGEL", "RC_DRAGON", 
  "RC_PLAYER_HUMAN", "RC_PLAYER_DORAM", "RC_ALL", "CLASS_NONE", "CLASS_NORMAL", "CLASS_BOSS", "CLASS_GUARDIAN", "CLASS_BATTLEFIELD", 
  "CLASS_EVENT", "CLASS_ALL", "CLASS_MAX", "Size_Small", "SZ_SMALL", "Size_Medium", "SZ_MEDIUM", "Size_Large", "SZ_BIG", "Size_All", "SZ_ALL", "Eff_Stone", "SC_STONEWAIT", 
  "Eff_Freeze", "SC_FREEZE", "Eff_Stun", "SC_STUN", "Eff_Sleep", "SC_SLEEP", "Eff_Poison", "SC_POISON", "Eff_Curse", "SC_CURSE", 
  "Eff_Silence", "SC_SILENCE", "Eff_Confusion", "SC_CONFUSION", "Eff_Blind", "SC_BLIND", "Eff_Bleeding", "SC_BLEEDING", "Eff_DPoison", "SC_DPOISON", "Eff_Fear", "SC_FEAR", 
  "Eff_Burning", "SC_BURNING", "Eff_Crystalize", "SC_CRYSTALIZE", "Eff_Freezing", "SC_FREEZING", "Eff_Heat", "SC_BURNT", "Eff_Deepsleep", "SC_DEEPSLEEP", "Eff_WhiteImprison", 
  "SC_WHITEIMPRISON", "Eff_Hallucination", "SC_HALLUCINATION", "SC_ALL", "SC_NONE", "EAJL_2_1", "JOBL_2_1", "EAJL_2_2", "JOBL_2_2", "EAJL_2", "JOBL_2", "EAJL_UPPER", "JOBL_UPPER", "EAJL_THIRD", "JOBL_THIRD", "EAJL_FOURTH", "JOBL_FOURTH", "EAJ_BASEMASK", "MAPID_BASEMASK", "EAJ_UPPERMASK", "MAPID_UPPERMASK", "EAJ_THIRDMASK", "MAPID_THIRDMASK", "EAJ_FOURTHMASK", "MAPID_FOURTHMASK",
  "MAPID_FOURTHMASK", "EAJ_NOVICE", "MAPID_NOVICE", "EAJ_SWORDMAN", "MAPID_SWORDMAN", "EAJ_MAGE", "MAPID_MAGE", "EAJ_ARCHER", "MAPID_ARCHER", "EAJ_ACOLYTE", "MAPID_ACOLYTE", "EAJ_MERCHANT", "MAPID_MERCHANT", "EAJ_THIEF", "MAPID_THIEF", "EAJ_TAEKWON", "MAPID_TAEKWON", "EAJ_GUNSLINGER", "MAPID_GUNSLINGER",
  "EAJ_NINJA", "MAPID_NINJA", "EAJ_GANGSI", "MAPID_GANGSI", "EAJ_KNIGHT", "MAPID_KNIGHT", "EAJ_WIZARD", "MAPID_WIZARD", "EAJ_HUNTER", "MAPID_HUNTER", "EAJ_PRIEST", "MAPID_PRIEST", "EAJ_BLACKSMITH", "MAPID_BLACKSMITH", "EAJ_ASSASSIN", "MAPID_ASSASSIN", "EAJ_STAR_GLADIATOR", "MAPID_STAR_GLADIATOR", "EAJ_STARGLADIATOR", "EAJ_REBELLION",
  "MAPID_REBELLION", "EAJ_KAGEROUOBORO", "MAPID_KAGEROUOBORO", "EAJ_DEATH_KNIGHT", "MAPID_DEATH_KNIGHT", "EAJ_DEATHKNIGHT", "EAJ_CRUSADER", "MAPID_CRUSADER", "EAJ_SAGE", "MAPID_SAGE", "EAJ_BARDDANCER", "MAPID_BARDDANCER", "EAJ_MONK", "MAPID_MONK", "EAJ_ALCHEMIST", "MAPID_ALCHEMIST", "EAJ_ROGUE", "MAPID_ROGUE", "EAJ_SOUL_LINKER", "MAPID_SOUL_LINKER", "EAJ_SOULLINKER", "MAPID_SOUL_LINKER", "EAJ_DARK_COLLECTOR", "MAPID_DARK_COLLECTOR", "EAJ_DARKCOLLECTOR", "MAPID_DARK_COLLECTOR",
  "EAJ_NOVICE_HIGH", "MAPID_NOVICE_HIGH", "EAJ_SWORDMAN_HIGH", "MAPID_SWORDMAN_HIGH", "EAJ_MAGE_HIGH", "MAPID_MAGE_HIGH", "EAJ_ARCHER_HIGH", "MAPID_ARCHER_HIGH", "EAJ_ACOLYTE_HIGH", "MAPID_ACOLYTE_HIGH", "EAJ_MERCHANT_HIGH", "MAPID_MERCHANT_HIGH", "EAJ_THIEF_HIGH", "MAPID_THIEF_HIGH", "EAJ_LORD_KNIGHT", "MAPID_LORD_KNIGHT", "EAJ_HIGH_WIZARD", "MAPID_HIGH_WIZARD", "EAJ_SNIPER", "MAPID_SNIPER",
  "EAJ_HIGH_PRIEST", "MAPID_HIGH_PRIEST", "EAJ_WHITESMITH", "MAPID_WHITESMITH", "EAJ_ASSASSIN_CROSS", "MAPID_ASSASSIN_CROSS", "EAJ_PALADIN", "MAPID_PALADIN", "EAJ_PROFESSOR", "MAPID_PROFESSOR", "EAJ_CLOWNGYPSY", "MAPID_CLOWNGYPSY", "EAJ_CHAMPION", "MAPID_CHAMPION", "EAJ_CREATOR", "MAPID_CREATOR", "EAJ_STALKER", "MAPID_STALKER", "EAJ_BABY", "MAPID_BABY",
  "EAJ_BABY_SWORDMAN", "MAPID_BABY_SWORDMAN", "EAJ_BABY_MAGE", "MAPID_BABY_MAGE", "EAJ_BABY_ARCHER", "MAPID_BABY_ARCHER", "EAJ_BABY_ACOLYTE", "MAPID_BABY_ACOLYTE", "EAJ_BABY_MERCHANT", "MAPID_BABY_MERCHANT", "EAJ_BABY_THIEF", "MAPID_BABY_THIEF", "EAJ_BABY_TAEKWON", "MAPID_BABY_TAEKWON", "EAJ_BABY_GUNSLINGER", "MAPID_BABY_GUNSLINGER", "EAJ_BABY_NINJA", "MAPID_BABY_NINJA", "EAJ_BABY_SUMMONER", "MAPID_BABY_SUMMONER",
  "EAJ_BABY_KNIGHT", "MAPID_BABY_KNIGHT", "EAJ_BABY_WIZARD", "MAPID_BABY_WIZARD", "EAJ_BABY_HUNTER", "MAPID_BABY_HUNTER", "EAJ_BABY_PRIEST", "MAPID_BABY_PRIEST", "EAJ_BABY_BLACKSMITH", "MAPID_BABY_BLACKSMITH", "EAJ_BABY_ASSASSIN", "MAPID_BABY_ASSASSIN", "EAJ_BABY_STAR_GLADIATOR", "MAPID_BABY_STAR_GLADIATOR", "EAJ_BABY_REBELLION", "MAPID_BABY_REBELLION", "EAJ_BABY_KAGEROUOBORO", "MAPID_BABY_KAGEROUOBORO", "EAJ_BABY_CRUSADER", "MAPID_BABY_CRUSADER",
  "EAJ_BABY_SAGE", "MAPID_BABY_SAGE", "EAJ_BABY_BARDDANCER", "MAPID_BABY_BARDDANCER", "EAJ_BABY_MONK", "MAPID_BABY_MONK", "EAJ_BABY_ALCHEMIST", "MAPID_BABY_ALCHEMIST", "EAJ_BABY_ROGUE", "MAPID_BABY_ROGUE", "EAJ_BABY_SOUL_LINKER", "MAPID_BABY_SOUL_LINKER", "EAJ_RUNE_KNIGHT", "MAPID_RUNE_KNIGHT", "EAJ_WARLOCK", "MAPID_WARLOCK", "EAJ_RANGER", "MAPID_RANGER", "EAJ_ARCH_BISHOP", "MAPID_ARCH_BISHOP",
  "EAJ_MECHANIC", "MAPID_MECHANIC", "EAJ_GUILLOTINE_CROSS", "MAPID_GUILLOTINE_CROSS", "EAJ_STAR_EMPEROR", "MAPID_STAR_EMPEROR", "EAJ_ROYAL_GUARD", "MAPID_ROYAL_GUARD", "EAJ_SORCERER", "MAPID_SORCERER", "EAJ_MINSTRELWANDERER", "MAPID_MINSTRELWANDERER", "EAJ_SURA", "MAPID_SURA", "EAJ_GENETIC", "MAPID_GENETIC", "EAJ_SHADOW_CHASER", "MAPID_SHADOW_CHASER", "EAJ_SOUL_REAPER", "MAPID_SOUL_REAPER",
  "EAJ_RUNE_KNIGHT_T", "MAPID_RUNE_KNIGHT_T", "EAJ_WARLOCK_T", "MAPID_WARLOCK_T", "EAJ_RANGER_T", "MAPID_RANGER_T", "EAJ_ARCH_BISHOP_T", "MAPID_ARCH_BISHOP_T", "EAJ_MECHANIC_T", "MAPID_MECHANIC_T", "EAJ_GUILLOTINE_CROSS_T", "MAPID_GUILLOTINE_CROSS_T", "EAJ_ROYAL_GUARD_T", "MAPID_ROYAL_GUARD_T", "EAJ_SORCERER_T", "MAPID_SORCERER_T", "EAJ_MINSTRELWANDERER_T", "MAPID_MINSTRELWANDERER_T", "EAJ_SURA_T", "MAPID_SURA_T",
  "EAJ_GENETIC_T", "MAPID_GENETIC_T", "EAJ_SHADOW_CHASER_T", "MAPID_SHADOW_CHASER_T", "EAJ_BABY_RUNE_KNIGHT", "MAPID_BABY_RUNE_KNIGHT", "EAJ_BABY_WARLOCK", "MAPID_BABY_WARLOCK", "EAJ_BABY_RANGER", "MAPID_BABY_RANGER", "EAJ_BABY_ARCH_BISHOP", "MAPID_BABY_ARCH_BISHOP", "EAJ_BABY_MECHANIC", "MAPID_BABY_MECHANIC", "EAJ_BABY_GUILLOTINE_CROSS", "MAPID_BABY_GUILLOTINE_CROSS", "EAJ_BABY_STAR_EMPEROR", "MAPID_BABY_STAR_EMPEROR", "EAJ_BABY_ROYAL_GUARD", "MAPID_BABY_ROYAL_GUARD",
  "EAJ_BABY_SORCERER", "MAPID_BABY_SORCERER", "EAJ_BABY_MINSTRELWANDERER", "MAPID_BABY_MINSTRELWANDERER", "EAJ_BABY_SURA", "MAPID_BABY_SURA", "EAJ_BABY_GENETIC", "MAPID_BABY_GENETIC", "EAJ_BABY_SHADOW_CHASER", "MAPID_BABY_SHADOW_CHASER", "EAJ_BABY_SOUL_REAPER", "MAPID_BABY_SOUL_REAPER", "EAJ_SUPER_NOVICE", "MAPID_SUPER_NOVICE", "EAJ_SUPERNOVICE", "EAJ_SUPER_BABY", "MAPID_SUPER_BABY", "EAJ_SUPER_NOVICE_E", "MAPID_SUPER_NOVICE_E", "EAJ_SUPER_BABY_E",
  "MAPID_SUPER_BABY_E", "EAJ_SUMMONER", "MAPID_SUMMONER", "EAJ_SPIRIT_HANDLER", "MAPID_SPIRIT_HANDLER", "EAJ_HYPER_NOVICE", "MAPID_HYPER_NOVICE", "EAJ_DRAGON_KNIGHT", "MAPID_DRAGON_KNIGHT", "EAJ_ARCH_MAGE", "MAPID_ARCH_MAGE", "EAJ_WINDHAWK", "MAPID_WINDHAWK", "EAJ_CARDINAL", "MAPID_CARDINAL", "EAJ_MEISTER", "MAPID_MEISTER", "EAJ_SHADOW_CROSS", "MAPID_SHADOW_CROSS", "EAJ_SKY_EMPEROR",
  "MAPID_SKY_EMPEROR", "EAJ_NIGHT_WATCH", "MAPID_NIGHT_WATCH", "EAJ_SHINKIRO_SHIRANUI", "MAPID_SHINKIRO_SHIRANUI", "EAJ_IMPERIAL_GUARD", "MAPID_IMPERIAL_GUARD", "EAJ_ELEMENTAL_MASTER", "MAPID_ELEMENTAL_MASTER", "EAJ_TROUBADOURTROUVERE", "MAPID_TROUBADOURTROUVERE", "EAJ_INQUISITOR", "MAPID_INQUISITOR", "EAJ_BIOLO", "MAPID_BIOLO", "EAJ_ABYSS_CHASER", "MAPID_ABYSS_CHASER", "EAJ_SOUL_ASCETIC", "MAPID_SOUL_ASCETIC",
  "EQP_ACC_L", "EQP_ACC_R", "EQP_SHOES", "EQP_GARMENT", "EQP_HEAD_LOW", "EQP_HEAD_MID", "EQP_HEAD_TOP", "EQP_ARMOR", "EQP_HAND_L", "EQP_HAND_R", "EQP_COSTUME_HEAD_TOP", "EQP_COSTUME_HEAD_MID", "EQP_COSTUME_HEAD_LOW", "EQP_COSTUME_GARMENT", "EQP_AMMO", "EQP_SHADOW_ARMOR", "EQP_SHADOW_WEAPON", "EQP_SHADOW_SHIELD", "EQP_SHADOW_SHOES", "EQP_SHADOW_ACC_R", "EQP_SHADOW_ACC_L", "EQP_ACC_RL", "EQP_SHADOW_ACC_RL", "CARD0_FORGE", "CARD0_CREATE", "CARD0_PET",
  "GUILDINFO_NAME", "GUILDINFO_LEVEL", "GUILDINFO_AVERAGELEVEL", "GUILDINFO_ONLINECOUNT", "GUILDINFO_MEMBERCOUNT", "GUILDINFO_MAXMEMBERCOUNT", "GUILDINFO_EXP", "GUILDINFO_NEXTEXP", "GUILDINFO_MASTERID", "GUILDINFO_MASTERNAME", "VIP_STATUS_ACTIVE",
  "CD_GUILD_ID", "CD_CURRENT_ECONOMY", "CD_CURRENT_DEFENSE", "CD_INVESTED_ECONOMY", "CD_INVESTED_DEFENSE", "CD_NEXT_TIME", "CD_PAY_TIME", "CD_CREATE_TIME", "CD_ENABLED_KAFRA", "CD_ENABLED_GUARDIAN0", "CD_ENABLED_GUARDIAN1", "CD_ENABLED_GUARDIAN2", "CD_ENABLED_GUARDIAN3", "CD_ENABLED_GUARDIAN4", "CD_ENABLED_GUARDIAN5", "CD_ENABLED_GUARDIAN6", "CD_ENABLED_GUARDIAN7",
  "MOBG_BRANCH_OF_DEAD_TREE", "MOBG_PORING_BOX", "MOBG_BLOODY_DEAD_BRANCH", "MOBG_RED_POUCH_OF_SURPRISE", "MOBG_CLASSCHANGE", "MOBG_TAEKWON_MISSION", "RMF_NONE", "RMF_DB_RATE", "RMF_CHECK_MOB_LV", "RMF_MOB_NOT_BOSS", "RMF_MOB_NOT_SPAWN", "RMF_MOB_NOT_PLANT", "RMF_ALL", "SEX_FEMALE", "SEX_MALE", "SEX_BOTH", "SEARCHSTORE_EFFECT_NORMAL", "SEARCHSTORE_EFFECT_REMOTE",
  "FW_DONTCARE", "FW_THIN", "FW_EXTRALIGHT", "FW_LIGHT", "FW_NORMAL", "FW_MEDIUM", "FW_SEMIBOLD", "FW_BOLD", "FW_EXTRABOLD", "FW_HEAVY",
  // Documented constants verified against src/map/script_constants.hpp.
  "INT_MIN", "INT_MAX", "PACKETVER", "MAX_ITEM_RDM_OPT", "NAME_LENGTH", "IT_ARMOR", "IT_WEAPON", "IT_PETARMOR", "IT_SHADOWGEAR",
  "PLAYTIME", "HUNTING", "STOR_MODE_ALL", "IE_OK", "IE_NOMEMBER", "IE_NOINSTANCE", "IE_OTHER", "VIP_STATUS_EXPIRE",
  "VIP_STATUS_REMAINING", "EF_ANGEL2", "PET_CATCH_UNIVERSAL_NO_BOSS", "PET_CATCH_UNIVERSAL_ALL", "MIN_WALK_SPEED",
  "MAX_WALK_SPEED", "DEFAULT_NPC_WALK_SPEED",
  // Remaining mapflag constants exported by the local emulator.
  "MF_PVP_NOPARTY", "MF_PVP_NOGUILD", "MF_GVG_NOPARTY", "MF_NOTRADE", "MF_PARTYLOCK", "MF_NOICEWALL", "MF_NOGO", "MF_CLOUDS2",
  "MF_GVG_CASTLE", "MF_GVG_DUNGEON", "MF_NOBASEEXP", "MF_NOJOBEXP", "MF_NORETURN", "MF_PVP_NIGHTMAREDROP", "MF_JEXP", "MF_BEXP",
  "MF_NOCHAT", "MF_NOEXPPENALTY", "MF_GUILDLOCK", "MF_TOWN", "MF_AUTOTRADE", "MF_ALLOWKS", "MF_MONSTER_NOTELEPORT",
  "MF_PVP_NOCALCRANK", "MF_RESET", "MF_NOMAPCHANNELAUTOJOIN", "MF_NOUSECART", "MF_NOITEMCONSUMPTION", "MF_NOSUNMOONSTARMIRACLE",
  "MF_FORCEMINEFFECT", "MF_NOLOCKON", "MF_NOTOMB", "MF_NOCOSTUME", "MF_GVG_TE_CASTLE", "MF_GVG_TE", "MF_HIDEMOBHPBAR",
  "MF_NOLOOT", "MF_NOEXP", "MF_PRIVATEAIRSHIP_SOURCE", "MF_PRIVATEAIRSHIP_DESTINATION", "MF_NOCASHSHOP", "MF_NORODEX",
  "MF_NORENEWALDROPPENALTY", "MF_NORENEWALEXPPENALTY", "MF_NOPETCAPTURE", "MF_NOBUYINGSTORE", "MF_NODYNAMICNPC", "MF_NOBANK",
  "MF_SPECIALPOPUP", "MF_NOMACROCHECKER",
  // Bare mapflag names used in top-level mapflag declarations.
  "nomemo", "noteleport", "nosave", "nobranch", "nopenalty", "nozenypenalty", "pvp", "pvp_noparty", "pvp_noguild", "gvg",
  "gvg_noparty", "notrade", "noskill", "nowarp", "partylock", "noicewall", "snow", "fog", "sakura", "leaves", "nogo", "clouds",
  "clouds2", "fireworks", "gvg_castle", "gvg_dungeon", "nightenabled", "nobaseexp", "nojobexp", "nomobloot", "nomvploot",
  "noreturn", "nowarpto", "pvp_nightmaredrop", "restricted", "nocommand", "nodrop", "jexp", "bexp", "novending", "loadevent",
  "nochat", "noexppenalty", "guildlock", "town", "autotrade", "allowks", "monster_noteleport", "pvp_nocalcrank", "battleground",
  "reset", "nomapchannelautojoin", "nousecart", "noitemconsumption", "nosunmoonstarmiracle", "forcemineffect", "nolockon",
  "notomb", "skill_damage", "nocostume", "gvg_te_castle", "gvg_te", "hidemobhpbar", "noloot", "noexp", "privateairship_source",
  "privateairship_destination", "skill_duration", "nocashshop", "norodex", "norenewaldroppenalty", "norenewalexppenalty",
  "nopetcapture", "nobuyingstore", "nodynamicnpc", "nobank", "nomacrochecker",
];

// Green highlight - Variables and variable manipulation
const variableLanguageKeywords = [
  // Original varHolderKeywords
  "set", "killedrid", "killerrid", "setarray", "copyarray", "cleararray", "setd", "getd", "getvar", "getvariableofnpc", "getelementofarray", "killermobgid", // Added from commands
  // Original specialVarKeywords
  "Zeny", "Hp", "MaxHp", "Sp", "MaxSp", "StatusPoint", "SkillPoint", "BaseLevel",
  "JobLevel", "BaseExp", "JobExp", "NextBaseExp", "NextJobExp", "Weight", "MaxWeight",
  "Sex", "Class", "Upper", "BaseClass", "BaseJob", "Karma", "Manner", "Ap", "MaxAp",
  // Original inventoryVar as prefixed vars - rule will handle prefix
  "getarg", "getargcount", "strcharinfo", "strnpcinfo", "readparam", "getarraysize",
  "bStr", "bAgi", "bVit", "bInt", "bDex", "bLuk", "bPow", "bSta", "bWis", "bSpl", "bCon", "bCrt", // base stats and traits
  // Item Scripting
  "bMaxHP", "bMaxSP", "bMaxAP", "bStr", "bAgi", "bVit", "bInt", "bDex", 
  "bLuk", "bPow", "bSta", "bWis", "bSpl", "bCon", "bCrt", "bAtk", 
  "bAtk2", "bDef", "bDef2", "bMdef", "bMdef2", "bHit", "bFlee", "bFlee2", 
  "bCritical", "bAspd", "bFame", "bUnbreakable", "bPatk", "bSmatk", "bHplus", 
  "bCrate", "bRes", "bMres", "bAtkRange", "bAtkEle", "bDefEle", "bCastrate", "bMaxHPrate", "bMaxSPrate", 
  "bMaxAPrate", "bUseSPrate", "bAddEle", "bAddRace", "bAddSize", "bSubEle", 
  "bSubRace", "bAddEff", "bResEff", "bBaseAtk", "bAspdRate", "bHPrecovRate", 
  "bSPrecovRate", "bSpeedRate", "bCriticalDef", "bNearAtkDef", "bLongAtkDef", "bDoubleRate", 
  "bDoubleAddRate", "bSkillHeal", "bMatkRate", "bWeaponMatkRate", "bIgnoreDefEle", "bIgnoreDefRace", 
  "bAtkRate", "bWeaponAtkRate", "bSpeedAddRate", "bSPRegenRate", "bMagicAtkDef", "bMiscAtkDef", 
  "bIgnoreMdefEle", "bIgnoreMdefRace", "bMagicAddEle", "bMagicAddRace", "bMagicAddSize", "bPerfectHitRate", 
  "bPerfectHitAddRate", "bCriticalRate", "bGetZenyNum", "bAddGetZenyNum", "bAddDamageClass", "bAddMagicDamageClass", 
  "bAddDefMonster", "bAddMdefMonster", "bAddMonsterDropItem", "bDefRatioAtkEle", "bDefRatioAtkRace", "bUnbreakableGarment", 
  "bHitRate", "bFleeRate", "bFlee2Rate", "bDefRate", "bDef2Rate", "bMdefRate", 
  "bMdef2Rate", "bPAtkRate", "bSMatkRate", "bResRate", "bMResRate", "bHPlusRate", 
  "bCRateRate", "bSplashRange", "bSplashAddRange", "bAutoSpell", "bHPDrainRate", "bSPDrainRate", 
  "bShortWeaponDamageReturn", "bLongWeaponDamageReturn", "bWeaponComaEle", "bWeaponComaRace", "bAddEff2", "bBreakWeaponRate", 
  "bBreakArmorRate", "bAddStealRate", "bMagicDamageReturn", "bAllStats", "bAllTraitStats", "bAgiVit", 
  "bAgiDexStr", "bPerfectHide", "bNoKnockback", "bClassChange", "bHPDrainValue", "bSPDrainValue", 
  "bWeaponAtk", "bWeaponDamageRate", "bDelayrate", "bHPDrainValueRace", "bSPDrainValueRace", "bIgnoreMdefRaceRate", 
  "bIgnoreDefRaceRate", "bSkillHeal2", "bAddEffOnSkill", "bHealPower", "bHealPower2", "bIgnoreResRaceRate", 
  "bIgnoreMResRaceRate", "bRestartFullRecover", "bNoCastCancel", "bNoSizeFix", "bNoMagicDamage", "bNoWeaponDamage", "bNoGemStone", 
  "bNoCastCancel2", "bNoMiscDamage", "bUnbreakableWeapon", "bUnbreakableArmor", "bUnbreakableHelm", "bUnbreakableShield", 
  "bShortAtkRate", "bLongAtkRate", "bCritAtkRate", "bCriticalAddRace", "bNoRegen", "bAddEffWhenHit", 
  "bAutoSpellWhenHit", "bSkillAtk", "bUnstripable", "bAutoSpellOnSkill", "bSPGainValue", "bHPRegenRate", 
  "bHPLossRate", "bAddRace2", "bHPGainValue", "bSubSize", "bHPDrainValueClass", "bAddItemHealRate", 
  "bSPDrainValueClass", "bExpAddRace", "bSPGainRace", "bSubRace2", "bUnbreakableShoes", "bUnstripableWeapon", 
  "bUnstripableArmor", "bUnstripableHelm", "bUnstripableShield", "bIntravision", "bAddMonsterDropItemGroup", "bSPLossRate", 
  "bAddSkillBlow", "bSPVanishRate", "bMagicSPGainValue", "bMagicHPGainValue", "bAddMonsterIdDropItem", "bMatk", 
  "bComaClass", "bComaRace", "bSkillUseSPrate", "bSkillCooldown", "bSkillFixedCast", "bSkillVariableCast", 
  "bFixedCastrate", "bVariableCastrate", "bSkillUseSP", "bMagicAtkEle", "bFixedCast", "bVariableCast", 
  "bSetDefRace", "bSetMDefRace", "bHPVanishRate", "bIgnoreDefClass", "bDefRatioAtkClass", "bAddClass", 
  "bSubClass", "bMagicAddClass", "bWeaponComaClass", "bIgnoreMdefClassRate", "bExpAddClass", "bAddClassDropItem", 
  "bAddClassDropItemGroup", "bAddMaxWeight", "bAddItemGroupHealRate", "bHPVanishRaceRate", "bSPVanishRaceRate", "bAbsorbDmgMaxHP", 
  "bSubSkill", "bSubDefEle", "bStateNoRecoverRace", "bCriticalLong", "bMagicAddRace2", "bIgnoreMdefRace2Rate", 
  "bDropAddRace", "bDropAddClass", "bNoMadoFuel", "bIgnoreDefClassRate", "bRegenPercentHP", "bRegenPercentSP", 
  "bSkillDelay", "bNoWalkDelay", "bLongSPGainValue", "bLongHPGainValue", "bMagicSubSize", "bCritDefRate", 
  "bMagicSubDefEle", "bReduceDamageReturn", "bAbsorbDmgMaxHP2", "bAddItemSPHealRate", "bAddItemGroupSPHealRate", "bWeaponSubSize",
  // Additional player parameters exported by the local emulator.
  "TraitPoint", "killedgid", "CharMoves", "CharRename", "Font", "BankVault",
];

const inventoryVarNames = [ // Just the names, prefix handled by regex
  "inventorylist_id", "inventorylist_idx", "inventorylist_amount", "inventorylist_equip", "inventorylist_refine", 
  "inventorylist_identify", "inventorylist_attribute", "inventorylist_card1", "inventorylist_card2", "inventorylist_card3", 
  "inventorylist_card4", "inventorylist_expire", "inventorylist_bound", "inventorylist_enchantgrade", "inventorylist_count", 
  "inventorylist_option_id1", "inventorylist_option_value1", "inventorylist_option_parameter1", "inventorylist_option_id2", 
  "inventorylist_option_value2", "inventorylist_option_parameter2", "inventorylist_option_id3", "inventorylist_option_value3", 
  "inventorylist_option_parameter3", "inventorylist_option_id4", "inventorylist_option_value4", "inventorylist_option_parameter4", 
  "inventorylist_option_id5", "inventorylist_option_value5", "inventorylist_option_parameter5", "inventorylist_tradable", "inventorylist_favorite",
  "sold_nameid", "sold_quantity", "sold_refine", "sold_attribute", "sold_identify", "sold_enchantgrade", "sold_card1", "sold_card2", "sold_card3", "sold_card4", "sold_option_id1", "sold_option_val1", 
  "sold_option_param1", "sold_option_id2", "sold_option_val2", "sold_option_param2", "sold_option_id3", "sold_option_val3", "sold_option_param3", "sold_option_id4", "sold_option_val4", "sold_option_param4", 
  "sold_option_id5", "sold_option_val5", "sold_option_param5", "bought_nameid", "bought_quantity",
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
  "atcmd_command", "atcmd_parameters", "atcmd_numparameters",
  // Output of party_create (global temporary variable).
  "party_create_id",
];

// Violet Highlight - Language constants
const constantLanguageKeywords = [
  "true", "false", "null"
];

const operators = [
  "\\+", "\\*", "\\/", "-", "%", "=", "==", "!=", "<=", ">=", "<", ">", 
  "\\|\\|", "&&", "!", "\\^", "&", "\\|", "\\?", "\\+=", "-=", "\\*=", "/=", "%=", ">>=", "<<="
];

const constantLibKeywordsConf = [
  "YES", "NO", "ON", "OFF"
];

/* Declare the keywords here and to RathenaHighlightRules to display on autocomplete except operators */
const keywords = [
  ...supportFunctionKeywords, 
  ...controlFlowKeywords, 
  ...constantLibraryKeywords,
  ...mapNameKeywords,
  ...variableLanguageKeywords, // Add base names of special vars
  ...inventoryVarNames, // Add prefixed special global array names
  ...constantLanguageKeywords,

  ...constantLibKeywordsConf
];

const langTools = ace.require("ace/ext/language_tools");
const cachedKeywordCompletions = [...new Set(keywords)].map(word => ({
  caption: word,
  value: word,
  meta: "rAthena"
}));

const customCompleter = {
  getCompletions: function (editor, session, pos, prefix, callback) {
    if (!prefix.length && !editor.completers.some(c => c.triggerCharacters && c.triggerCharacters.includes(session.getPrecedingCharacter()))) {
         return callback(null, []);
    }
    callback(null, cachedKeywordCompletions);
  }
};

const fastTextCompleter = {
  getCompletions: function (editor, session, pos, prefix, callback) {
    if (!prefix || prefix.length < 2) return callback(null, []);

    const totalRows = session.getLength ? session.getLength() : 0;
    if (totalRows === 0) return callback(null, []);

    const wordSet = new Set();
    const splitRegex = /[^a-zA-Z_0-9$#@]+/;
    const lowerPrefix = prefix.toLowerCase();

    // For large files (> 1500 lines), scan a generous window around cursor (350 lines above and below)
    const isLarge = totalRows > 1500;
    const startRow = isLarge ? Math.max(0, pos.row - 350) : 0;
    const endRow = isLarge ? Math.min(totalRows - 1, pos.row + 350) : totalRows - 1;

    for (let r = startRow; r <= endRow; r++) {
      const line = session.getLine(r);
      if (!line) continue;
      const words = line.split(splitRegex);
      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        if (w.length >= 2 && w !== prefix && w.toLowerCase().startsWith(lowerPrefix)) {
          wordSet.add(w);
          if (wordSet.size > 150) break;
        }
      }
      if (wordSet.size > 150) break;
    }

    const results = [];
    wordSet.forEach(word => {
      results.push({
        caption: word,
        value: word,
        score: 50,
        meta: "local"
      });
    });
    callback(null, results);
  }
};

window.updateRathenaCompleters = function(enableLocal) {
  if (enableLocal) {
    langTools.setCompleters([customCompleter, fastTextCompleter]);
  } else {
    langTools.setCompleters([customCompleter]);
  }
};

(function() {
  const initialLocalEnabled = (typeof localStorage !== "undefined" && localStorage.getItem("localCompletionEnabled") !== "false");
  window.updateRathenaCompleters(initialLocalEnabled);

  const toggleEl = document.getElementById("toggleLocalCompletion");
  if (toggleEl) {
    toggleEl.addEventListener("change", function () {
      window.updateRathenaCompleters(this.checked);
    });
  }
})();

// Escape database names (including punctuation) before using them in Ace regexes.
const mapNamePattern = mapNameKeywords.slice().sort((a, b) => b.length - a.length)
  .map(name => name.replace(/[.*+?^$()|[\]{}\\]/g, "\\$&")).join("|");

function mapHighlightRule() {
  // Apply after the string rule so quoted map names retain string coloring.
  return { token: "variable.parameter", regex: "(?<![\\w.$#@-])(?:" + mapNamePattern + ")(?![\\w.$#@-])", caseInsensitive: true };
}

// Color custom CONSTANT_NAMES without adding them to the keyword completion list.
function customConstantHighlightRule() {
  return {
    // Ace applies case-insensitive matching to the whole state, so check case here.
    token: value => /^[A-Z][A-Z0-9]*_[A-Z0-9_]+$/.test(value) ? "variable.parameter" : "text",
    regex: "(?<![@\\w.$#])\\b[A-Z][A-Z0-9]*_[A-Z0-9_]+\\b(?![$\\w])"
  };
}

function httpUrlHighlightRule() {
  // Consume the whole URL before its slashes can start a comment.
  // Include leading indentation so a standalone URL is not parsed as a label.
  return { token: "text", regex: "(?:^[ \\t]*)?\\bhttps?://[^\\s\"'<>]*" };
}

function jumpTargetHighlightRule() {
  // Keep the parenthesized and bare forms separate. Two whitespace repetitions
  // around an optional '(' backtrack over every possible split on long lines.
  // Check for an identifier boundary first so whitespace and identifier tails
  // never trigger a backwards scan. Let Ace skip plain text without counting
  // extra matches toward its per-line tokenizer limit.
  return {
    token: "keyword.control",
    regex: "\\b(?=[a-zA-Z_])(?<=\\b(?:goto|callsub)(?:[ \\t]*\\([ \\t]*|[ \\t]*))[a-zA-Z_][a-zA-Z0-9_]*\\b"
  };
}

function addMenuHighlightRules(rules) {
  // Track caption/target pairs so only menu labels receive control-flow coloring.
  rules.menuBase = rules.start.slice();
  const common = () => [
    { token: "comment.line", regex: "//.*$" },
    { token: "comment.block.start", regex: "/\\*", push: "menuComment" },
    { token: "string", regex: '"(?:[^"\\\\]|\\\\.)*"' },
    { token: "keyword.operator", regex: ";", next: "start" }
  ];
  rules.menuCaption = [
    ...common(),
    { token: "text", regex: ",", next: "menuTarget" },
    { token: "keyword.operator", regex: "[([]", push: "menuExpression" },
    { include: "menuBase" }
  ];
  rules.menuTarget = [
    ...common(),
    { token: "keyword.control", regex: "[a-zA-Z_][a-zA-Z0-9_]*\\b", next: "menuSeparator" },
    { token: "keyword.operator", regex: "-", next: "menuSeparator" },
    { include: "menuBase" }
  ];
  rules.menuSeparator = [
    ...common(),
    { token: "text", regex: ",", next: "menuCaption" },
    { include: "menuBase" }
  ];
  rules.menuExpression = [
    ...common().slice(0, 3),
    { token: "keyword.operator", regex: "[([]", push: "menuExpression" },
    { token: "keyword.operator", regex: "[)\\]]", next: "pop" },
    { include: "menuBase" }
  ];
  rules.menuComment = [
    { token: "comment.block.end", regex: "\\*/", next: "pop" },
    { defaultToken: "comment.block" }
  ];
  const commandIndex = rules.start.findIndex(rule => rule.token === "support.function");
  rules.start.splice(commandIndex, 0, {
    token: "support.function",
    regex: "(?<![@\\w.$#])\\bmenu\\b(?:[ \\t]*\\()?(?![$\\w])",
    next: "menuCaption"
  });
}

ace.define("ace/mode/rathena_highlight_rules", ["require", "exports", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
  const oop = require("ace/lib/oop");
  const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
  const RathenaHighlightRules = function () {
    const createKeywordMapper = this.createKeywordMapper;
    this.$rules = {
      start: [
        httpUrlHighlightRule(),
        { token: "comment.line", regex: "//.*$" },
        { token: "comment.block.start", regex: "/\\*", next: "comment" },
        { token: "string", regex: '"(?:[^"\\\\]|\\\\.)*"' },
        { token: ["text", "keyword.operator", "keyword.operator"], regex: "^([ \\t]*)([a-zA-Z_][a-zA-Z0-9_]*)(:)" },
        mapHighlightRule(),
        // An NPC display name follows `script` in a declaration. Consume it as
        // plain text so command names used in the name are not mistaken for
        // script syntax; the final numeric NPC ID keeps its normal color.
        { token: ["keyword.control", "text"], regex: "(?<![@\\w\\.])\\b(script(?:\\((?:CLOAKED|HIDDEN|DISABLED)\\))?)([ \\t]+)", next: "npcName" },
        { token: "keyword.control", regex: "(?<![@\\w\\.])\\b(?:" + controlFlowKeywords.join("|") + ")\\b" },
        { token: "support.function", regex: "(?<![@\\w\\.])\\b(?:" + supportFunctionKeywords.join("|") + ")\\b" },
        { token: "variable.parameter", regex: "(?<![@\\w\\.])\\b(?:" + constantLibraryKeywords.join("|") + ")\\b", caseInsensitive: true}, // Using constant.library for map names, item IDs etc.
        { token: "variable.language", regex: "\\$?(?<![@\\w\\.])\\b(?:" + variableLanguageKeywords.join("|") + ")\\b" },
        { token: "variable.language", regex: "(@(?:" + inventoryVarNames.join("|") + "))\\b" },
        { token: "constant.language", regex: "(?<![@\\w\\.])\\b(?:" + constantLanguageKeywords.join("|") + ")\\b" },
        { token: "constant.numeric", regex: "\\b\\d+\\b" },
        { token: "keyword.operator", regex: new RegExp("(?:" + operators.join("|") + ")") },
        // { token: "variable.other", regex: "\\b\\w+\\b" } // General variable rule color green
        // Function names like player()
        { token: "support.function", regex: "\\b[a-zA-Z_][a-zA-Z0-9_]*(?=\\()" },
        // A comma alone does not identify a jump target (for example, setarray values).
        jumpTargetHighlightRule(),
        customConstantHighlightRule(),
      ],
      comment: [
        { token: "comment.block.end", regex: "\\*/", next: "start" },
        { defaultToken: "comment.block" }
      ],
      npcName: [
        { token: "text", regex: "[^,\\r\\n{}]+?(?=[ \\t]+\\d+[ \\t]*,[ \\t]*\\{)", next: "npcId" },
        { token: "text", regex: "[^,\\r\\n{}]+", next: "start" },
        { token: "text", regex: "(?=,|\\{|$)", next: "start" }
      ],
      npcId: [
        { token: "text", regex: "[ \\t]+" },
        { token: "constant.numeric", regex: "\\d+", next: "start" },
        { token: "text", regex: "(?=,|\\{|$)", next: "start" }
      ]
    };
    addMenuHighlightRules(this.$rules);
    this.normalizeRules();
  };

  oop.inherits(RathenaHighlightRules, TextHighlightRules);
  exports.RathenaHighlightRules = RathenaHighlightRules;
});

ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("ace/lib/oop");
var Range = require("ace/range").Range;
var BaseFoldMode = require("ace/mode/folding/fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source + "|" + commentRegex.start
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source + "|" + commentRegex.end
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.foldingStartMarker = /(\{|\[)(?=[^}\]]*$)|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*#region\b)/;
    this._getFoldWidgetBase = this.getFoldWidget;
    
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // support for #region
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceFold) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getSectionRange(session, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceFold) {
                    range = this.getSectionRange(session, row);
                } else {
                    range = null;
                }
            }
            
            return range;
        }

        if (foldStyle === "markbeginend")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var maxRow = session.getLength();
        row += 1;
        
        var endRow = startRow;
        while (row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent !== -1) {
                if (indent < startIndent)
                    break;
                endRow = row;
            }
            row++;
        }
        
        return new Range(startRow, session.getLine(startRow).length, endRow, session.getLine(endRow).length);
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/rathena", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/rathena_highlight_rules", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function (require, exports) {
  const oop = require("ace/lib/oop");
  const TextMode = require("ace/mode/text").Mode;
  const RathenaHighlightRules = require("ace/mode/rathena_highlight_rules").RathenaHighlightRules;
  const CstyleBehaviour = require("ace/mode/behaviour/cstyle").CstyleBehaviour;
  const FoldMode = require("ace/mode/folding/cstyle").FoldMode;
  const Mode = function () {
    this.HighlightRules = RathenaHighlightRules;
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new FoldMode();
    this.lineCommentStart = "//";
    this.blockComment = { start: "/*", end: "*/" };
  };
  oop.inherits(Mode, TextMode);
  exports.Mode = Mode;
});

ace.define("ace/mode/rathena_yaml_highlight_rules", ["require", "exports", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
  const oop = require("ace/lib/oop");
  const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
  const RathenaYamlHighlightRules = function () {
    this.$rules = {
      start: [
        { token: "comment.line", regex: "#.*$" },
        { token: "string", regex: '"(?:[^"\\\\]|\\\\.)*"' },
        { token: ["text", "keyword.operator", "text", "keyword.operator", "keyword.operator"], regex: "^([ \\t]*)(-)([ \\t]+)([a-zA-Z_][a-zA-Z0-9_]*)(:)" },
        { token: ["text", "keyword.operator", "keyword.operator"], regex: "^([ \\t]*)([a-zA-Z_][a-zA-Z0-9_]*)(:)" },
        mapHighlightRule(),
        { token: "keyword.control", regex: "(?<![@\\w\\.])\\b(?:" + controlFlowKeywords.join("|") + ")\\b" },
        { token: "support.function", regex: "(?<![@\\w\\.])\\b(?:" + supportFunctionKeywords.join("|") + ")\\b" },
        { token: "variable.parameter", regex: "\\b(?:" + constantLibraryKeywords.join("|") + ")\\b", caseInsensitive: true},
        { token: "variable.language", regex: "\\$?(?<![@\\w\\.])\\b(?:" + variableLanguageKeywords.join("|") + ")\\b" },
        { token: "variable.language", regex: "(@(?:" + inventoryVarNames.join("|") + "))\\b" },
        { token: "constant.language", regex: "(?<![@\\w\\.])\\b(?:" + constantLanguageKeywords.join("|") + ")\\b" },
        { token: "constant.numeric", regex: "\\b\\d+\\b" },
        { token: "keyword.operator", regex: new RegExp("(?:" + operators.join("|") + ")") },
        { token: "support.function", regex: "\\b[a-zA-Z_][a-zA-Z0-9_]*(?=\\()" },
        jumpTargetHighlightRule(),
        customConstantHighlightRule(),
      ]
    };
    addMenuHighlightRules(this.$rules);
    this.normalizeRules();
  };

  oop.inherits(RathenaYamlHighlightRules, TextHighlightRules);
  exports.RathenaYamlHighlightRules = RathenaYamlHighlightRules;
});

ace.define("ace/mode/rathena_yaml", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/rathena_yaml_highlight_rules", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function (require, exports) {
  const oop = require("ace/lib/oop");
  const TextMode = require("ace/mode/text").Mode;
  const RathenaYamlHighlightRules = require("ace/mode/rathena_yaml_highlight_rules").RathenaYamlHighlightRules;
  const CstyleBehaviour = require("ace/mode/behaviour/cstyle").CstyleBehaviour;
  const FoldMode = require("ace/mode/folding/cstyle").FoldMode;
  const Mode = function () {
    this.HighlightRules = RathenaYamlHighlightRules;
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new FoldMode();
    this.lineCommentStart = "#";
  };
  oop.inherits(Mode, TextMode);
  exports.Mode = Mode;
});

ace.define("ace/mode/rathena_conf_highlight_rules", ["require", "exports", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
  const oop = require("ace/lib/oop");
  const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
  const RathenaConfHighlightRules = function () {
    this.$rules = {
      start: [
        httpUrlHighlightRule(),
        { token: "comment.line", regex: "//.*$" },
        { token: "comment.block.start", regex: "/\\*", next: "comment" },
        { token: "string", regex: '".*?"' },
        { token: "variable.parameter", regex: "0x.*$" },
        { token: ["text", "keyword.operator", "keyword.operator"], regex: "^([ \\t]*)([a-zA-Z_][a-zA-Z0-9_\\.]*)(:)" },
        { token: ["text", "keyword.operator", "keyword.operator"], regex: "^([ \\t]*)([a-zA-Z_][a-zA-Z0-9_]*)(:)" },
        { token: "variable.parameter", regex: "\\b(?:" + constantLibKeywordsConf.join("|") + ")\\b", caseInsensitive: true},
        { token: "variable.language", regex: "\\$?(?<![@\\w\\.])\\b(?:" + variableLanguageKeywords.join("|") + ")\\b" },
        { token: "constant.language", regex: "(?<![@\\w\\.])\\b(?:" + constantLanguageKeywords.join("|") + ")\\b" },
        { token: "constant.numeric", regex: "\\b\\d+\\b" },
        { token: "keyword.operator", regex: new RegExp("(?:" + operators.join("|") + ")") },
        { token: "support.function", regex: "\\b[a-zA-Z_][a-zA-Z0-9_]*(?=\\()" },
        jumpTargetHighlightRule(),
        customConstantHighlightRule(),
      ],
      comment: [
        { token: "comment.block.end", regex: "\\*/", next: "start" },
        { defaultToken: "comment.block" }
      ]
    };
    this.normalizeRules();
  };

  oop.inherits(RathenaConfHighlightRules, TextHighlightRules);
  exports.RathenaConfHighlightRules = RathenaConfHighlightRules;
});

ace.define("ace/mode/rathena_conf", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/rathena_conf_highlight_rules", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function (require, exports) {
  const oop = require("ace/lib/oop");
  const TextMode = require("ace/mode/text").Mode;
  const RathenaConfHighlightRules = require("ace/mode/rathena_conf_highlight_rules").RathenaConfHighlightRules;
  const CstyleBehaviour = require("ace/mode/behaviour/cstyle").CstyleBehaviour;
  const FoldMode = require("ace/mode/folding/cstyle").FoldMode;
  const Mode = function () {
    this.HighlightRules = RathenaConfHighlightRules;
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new FoldMode();
    this.lineCommentStart = "//";
    this.blockComment = { start: "/*", end: "*/" };
  };
  oop.inherits(Mode, TextMode);
  exports.Mode = Mode;
});

// C / C++ Highlight Rules & Mode Definition
ace.define("ace/mode/c_cpp_highlight_rules", ["require", "exports", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
  const oop = require("ace/lib/oop");
  const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

  const keywordControls = (
    "if|else|switch|case|default|while|do|for|break|continue|" +
    "goto|return|try|catch|throw|new|delete|operator|" +
    "co_await|co_yield|co_return"
  );

  const keywords = (
    "auto|class|struct|union|enum|typedef|template|typename|namespace|" +
    "using|public|protected|private|virtual|friend|explicit|inline|" +
    "static|const|constexpr|consteval|constinit|volatile|mutable|register|" +
    "extern|thread_local|noexcept|export|concept|requires|" +
    "static_assert|sizeof|alignof|alignas|decltype|typeid|" +
    "static_cast|dynamic_cast|reinterpret_cast|const_cast"
  );

  const storageTypes = (
    "void|bool|char|char8_t|char16_t|char32_t|wchar_t|" +
    "short|int|long|signed|unsigned|float|double|" +
    "size_t|ssize_t|intptr_t|uintptr_t|ptrdiff_t|time_t|" +
    "int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|" +
    "int_least8_t|int_least16_t|int_least32_t|int_least64_t|" +
    "uint_least8_t|uint_least16_t|uint_least32_t|uint_least64_t|" +
    "int_fast8_t|int_fast16_t|int_fast32_t|int_fast64_t|" +
    "uint_fast8_t|uint_fast16_t|uint_fast32_t|uint_fast64_t|" +
    "intmax_t|uintmax_t|" +
    "string|string_view|wstring|u16string|u32string|" +
    "vector|map|unordered_map|set|unordered_set|multimap|multiset|" +
    "pair|tuple|unique_ptr|shared_ptr|weak_ptr|array|list|deque|stack|queue|priority_queue|" +
    "optional|variant|any|span|function|bitset|" +
    "map_session_data|block_list|unit_data|npc_data|mob_data|pet_data|homun_data|merc_data|elemental_data"
  );

  const builtinConstants = (
    "true|false|nullptr|NULL|TRUE|FALSE|EOF|stdin|stdout|stderr|" +
    "EXIT_SUCCESS|EXIT_FAILURE"
  );

  const supportFunctions = (
    "printf|sprintf|snprintf|fprintf|scanf|sscanf|fscanf|" +
    "malloc|calloc|realloc|free|memcpy|memset|memmove|memcmp|" +
    "strlen|strcpy|strncpy|strcat|strncat|strcmp|strncmp|strchr|strrchr|strstr|" +
    "atoi|atof|atol|strtol|strtoul|abs|labs|min|max|clamp|" +
    "ShowError|ShowWarning|ShowNotice|ShowInfo|ShowDebug|ShowFatalError|ShowMessage|" +
    "CREATE|RECREATE|safestrncpy|aMalloc|aFree|aCalloc|aRealloc|aStrdup"
  );

  const CPPHighlightRules = function() {
    this.$rules = {
      start: [
        {
          token: "comment.line.double-slash",
          regex: "//.*$"
        },
        {
          token: "comment.block",
          regex: "/\\*",
          next: "comment"
        },
        {
          token: "string.raw",
          regex: 'R"[^(]*\\(',
          next: "rawString"
        },
        {
          token: "string",
          regex: '"(?:[^\\\\]|\\\\.)*?"'
        },
        {
          token: "constant.character",
          regex: "'(?:[^\\\\]|\\\\.)*?'"
        },
        // Preprocessor directives
        {
          token: "keyword.control.directive",
          regex: "^\\s*#\\s*include\\b",
          next: "includeDirective"
        },
        {
          token: "keyword.control.directive",
          regex: "^\\s*#\\s*(?:define|undef|ifdef|ifndef|if|elif|else|endif|pragma|error|warning|line)\\b"
        },
        // Numbers
        {
          token: "constant.numeric.hex",
          regex: "\\b0[xX][0-9a-fA-F]+(?:'[0-9a-fA-F]+)*(?:[uU]?[lL]{0,2}|[lL]{0,2}[uU]?)?\\b"
        },
        {
          token: "constant.numeric.binary",
          regex: "\\b0[bB][01]+(?:'[01]+)*(?:[uU]?[lL]{0,2}|[lL]{0,2}[uU]?)?\\b"
        },
        {
          token: "constant.numeric.float",
          regex: "\\b(?:\\d+(?:'\\d+)*\\.\\d*(?:'\\d+)*(?:[eE][+-]?\\d+)?|\\.\\d+(?:'\\d+)*(?:[eE][+-]?\\d+)?|\\d+(?:'\\d+)*[eE][+-]?\\d+)[fFlL]?\\b"
        },
        {
          token: "constant.numeric.decimal",
          regex: "\\b\\d+(?:'\\d+)*(?:[uU]?[lL]{0,2}|[lL]{0,2}[uU]?)?\\b"
        },
        // Built-ins and keywords
        {
          token: "constant.language",
          regex: "\\b(?:" + builtinConstants + ")\\b"
        },
        {
          token: "keyword.control",
          regex: "\\b(?:" + keywordControls + ")\\b"
        },
        {
          token: "keyword",
          regex: "\\b(?:" + keywords + ")\\b"
        },
        {
          token: "storage.type",
          regex: "\\b(?:" + storageTypes + ")\\b"
        },
        {
          token: "support.function",
          regex: "\\b(?:" + supportFunctions + ")\\b"
        },
        {
          token: "support.function",
          regex: "\\b[a-zA-Z_]\\w*(?=\\s*\\()"
        },
        {
          token: "keyword.operator",
          regex: "::|->|\\+\\+|--|==|!=|<=|>=|&&|\\|\\||<<=|>>=|\\+=|-=|\\*=|/=|%=|&=|\\|=|\\^=|<<|>>|<=>|[\\+\\-\\*/%!=&|\\^~<>=?:.,;]"
        },
        {
          token: "paren.lparen",
          regex: "[\\{\\[\\(]"
        },
        {
          token: "paren.rparen",
          regex: "[\\}\\]\\)]"
        },
        {
          token: "text",
          regex: "\\s+"
        }
      ],
      comment: [
        {
          token: "comment.block",
          regex: "\\*/",
          next: "start"
        },
        {
          defaultToken: "comment.block"
        }
      ],
      includeDirective: [
        {
          token: "string.include",
          regex: '<[^>]*>|"(?:[^\\\\]|\\\\.)*?"',
          next: "start"
        },
        {
          token: "text",
          regex: "\\s+"
        },
        {
          regex: "$",
          next: "start"
        }
      ],
      rawString: [
        {
          token: "string.raw",
          regex: '\\)[^"]*"',
          next: "start"
        },
        {
          defaultToken: "string.raw"
        }
      ]
    };
    this.normalizeRules();
  };

  oop.inherits(CPPHighlightRules, TextHighlightRules);
  exports.c_cppHighlightRules = CPPHighlightRules;
  exports.CPPHighlightRules = CPPHighlightRules;
});

ace.define("ace/mode/c_cpp", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/c_cpp_highlight_rules", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function (require, exports) {
  const oop = require("ace/lib/oop");
  const TextMode = require("ace/mode/text").Mode;
  const CPPHighlightRules = require("ace/mode/c_cpp_highlight_rules").CPPHighlightRules;
  const CstyleBehaviour = require("ace/mode/behaviour/cstyle").CstyleBehaviour;
  const FoldMode = require("ace/mode/folding/cstyle").FoldMode;

  const Mode = function () {
    this.HighlightRules = CPPHighlightRules;
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new FoldMode();
    this.lineCommentStart = "//";
    this.blockComment = { start: "/*", end: "*/" };
  };
  oop.inherits(Mode, TextMode);
  exports.Mode = Mode;
});

ace.define("ace/mode/cpp", ["require", "exports", "ace/mode/c_cpp"], function (require, exports) {
  const c_cpp = require("ace/mode/c_cpp");
  exports.Mode = c_cpp.Mode;
});

ace.define("ace/mode/lua_highlight_rules", ["require", "exports", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
  const oop = require("ace/lib/oop");
  const TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

  const LuaHighlightRules = function() {
    const keywords = (
      "break|do|else|elseif|end|for|function|goto|if|in|repeat|return|then|until|while"
    );

    const logicalOperators = "and|not|or";
    const storageTypes = "local";
    const builtinConstants = "true|false|nil|_G|_VERSION";
    const builtinFunctions = (
      "assert|collectgarbage|dofile|error|getmetatable|ipairs|load|loadfile|loadstring|" +
      "module|next|pairs|pcall|print|rawequal|rawget|rawlen|rawset|require|select|" +
      "setmetatable|tonumber|tostring|type|unpack|warn|xpcall"
    );
    const standardLibraries = (
      "coroutine|package|string|table|math|io|os|debug|bit32|utf8|" +
      "ReqJobName|JobNameTable|ItemSlotTable|AccTable|MonsterTable"
    );

    const keywordMapper = this.createKeywordMapper({
      "keyword.control": keywords,
      "keyword.operator": logicalOperators,
      "storage.type": storageTypes,
      "constant.language": builtinConstants,
      "support.function": builtinFunctions,
      "support.class": standardLibraries
    }, "identifier", true);

    const decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    const hexInteger = "(?:0[xX][\\da-fA-F]+)";
    const integer = "(?:" + decimalInteger + "|" + hexInteger + ")";
    const fraction = "(?:\\.\\d+)";
    const intPartStart = "(?:\\d+)";
    const pointFloat = "(?:(?:" + intPartStart + "?" + fraction + ")|(?:" + intPartStart + "\\.))";
    const exponentFloat = "(?:(?:" + pointFloat + "|" + intPartStart + ")[eE][+-]?\\d+)";
    const floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    this.$rules = {
      "start": [
        {
          token: "comment.block",
          regex: "--\\[\\[",
          next: "block_comment"
        },
        {
          token: "comment.block",
          regex: "--\\[=\\[",
          next: "block_comment_eq"
        },
        {
          token: "comment.line",
          regex: "--.*$"
        },
        {
          token: "string.block",
          regex: "\\[\\[",
          next: "block_string"
        },
        {
          token: "string.block",
          regex: "\\[=\\[",
          next: "block_string_eq"
        },
        {
          token: "string",
          regex: '"(?:[^"\\\\]|\\\\.)*"'
        },
        {
          token: "string",
          regex: "'(?:[^'\\\\]|\\\\.)*'"
        },
        {
          token: "constant.numeric",
          regex: floatNumber
        },
        {
          token: "constant.numeric",
          regex: integer + "\\b"
        },
        {
          token: "support.function",
          regex: "(?<=(?:string|table|math|io|os|debug|coroutine|bit32|utf8)\\.)[a-zA-Z_]\\w*"
        },
        {
          token: "support.function",
          regex: "\\b[a-zA-Z_]\\w*(?=\\s*\\()"
        },
        {
          token: "support.function",
          regex: "\\b[a-zA-Z_]\\w*(?=\\s*\\{)"
        },
        {
          token: "support.function",
          regex: "(?<=:)[a-zA-Z_]\\w*(?=\\s*\\()"
        },
        {
          token: keywordMapper,
          regex: "[a-zA-Z_]\\w*"
        },
        {
          token: "keyword.operator",
          regex: "\\+|-|\\*|\\/|\\/\\/|\\^|\\%|\\&|\\~|\\||>>|<<|\\.\\.\\.|\\.\\.|<|<=|>|>=|==|~=|#|="
        },
        {
          token: "paren.lparen",
          regex: "[\\[\\{\\(]"
        },
        {
          token: "paren.rparen",
          regex: "[\\]\\}\\)]"
        },
        {
          token: "punctuation.operator",
          regex: "[,;:]"
        },
        {
          token: "text",
          regex: "\\s+"
        }
      ],
      "block_comment": [
        {
          token: "comment.block",
          regex: "\\]\\]",
          next: "start"
        },
        {
          defaultToken: "comment.block"
        }
      ],
      "block_comment_eq": [
        {
          token: "comment.block",
          regex: "\\]=\\]",
          next: "start"
        },
        {
          defaultToken: "comment.block"
        }
      ],
      "block_string": [
        {
          token: "string.block",
          regex: "\\]\\]",
          next: "start"
        },
        {
          defaultToken: "string.block"
        }
      ],
      "block_string_eq": [
        {
          token: "string.block",
          regex: "\\]=\\]",
          next: "start"
        },
        {
          defaultToken: "string.block"
        }
      ]
    };

    this.normalizeRules();
  };

  oop.inherits(LuaHighlightRules, TextHighlightRules);
  exports.LuaHighlightRules = LuaHighlightRules;
});

ace.define("ace/mode/folding/lua", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(require, exports, module) {
  "use strict";

  const oop = require("ace/lib/oop");
  const Range = require("ace/range").Range;
  const BaseFoldMode = require("ace/mode/folding/fold_mode").FoldMode;

  const FoldMode = exports.FoldMode = function() {};
  oop.inherits(FoldMode, BaseFoldMode);

  (function() {
    this.foldingStartMarker = /(?:\b(?:function|then|do|repeat)\b)|(?:\{|\[(?=[^}\]]*$)|^\s*--\[\[)/;
    this.foldingStopMarker = /(?:\b(?:end|until)\b)|(?:^[^\[\{]*(\}|\]))|(?:\s*\]\])/;

    this.getFoldWidget = function(session, foldStyle, row) {
      const line = session.getLine(row);
      const isStart = this.foldingStartMarker.test(line);
      const isEnd = this.foldingStopMarker.test(line);

      if (isStart && !isEnd) {
        return "start";
      }
      if (foldStyle === "markbeginend" && isEnd && isStart) {
        return "end";
      }
      if (isEnd) {
        return "end";
      }
      return "";
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
      const line = session.getLine(row);
      if (/[\{\[]/.test(line)) {
        const match = line.match(/[\{\[]/);
        if (match) {
          const i = match.index;
          return session.getBracketRange({row: row, column: i + 1});
        }
      }
      if (/--\[\[/.test(line)) {
        const startCol = line.indexOf("--[[");
        const maxRow = session.getLength();
        for (let r = row; r < maxRow; r++) {
          const l = session.getLine(r);
          const endCol = l.indexOf("]]");
          if (endCol !== -1) {
            return new Range(row, startCol + 4, r, endCol);
          }
        }
      }
      if (/\b(?:function|then|do|repeat)\b/.test(line)) {
        const maxRow = session.getLength();
        let depth = 1;
        for (let r = row + 1; r < maxRow; r++) {
          const l = session.getLine(r);
          if (/\b(?:function|then|do|repeat)\b/.test(l)) {
            depth++;
          }
          if (/\b(?:end|until)\b/.test(l)) {
            depth--;
            if (depth === 0) {
              return new Range(row, line.length, r, l.length);
            }
          }
        }
      }
      return null;
    };
  }).call(FoldMode.prototype);
});

ace.define("ace/mode/lua", ["require", "exports", "ace/lib/oop", "ace/mode/text", "ace/mode/lua_highlight_rules", "ace/mode/folding/lua"], function (require, exports) {
  const oop = require("ace/lib/oop");
  const TextMode = require("ace/mode/text").Mode;
  const LuaHighlightRules = require("ace/mode/lua_highlight_rules").LuaHighlightRules;
  const LuaFoldMode = require("ace/mode/folding/lua").FoldMode;

  const Mode = function () {
    this.HighlightRules = LuaHighlightRules;
    this.foldingRules = new LuaFoldMode();
    this.$id = "ace/mode/lua";
    this.lineCommentStart = "--";
    this.blockComment = { start: "--[[", end: "]]" };
  };
  oop.inherits(Mode, TextMode);
  exports.Mode = Mode;
});
