// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.4.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(2048390000, 2048391950, 0, 0, 0, 5);
    RegisterBonfire(2048390001, 2048391951, 0, 0, 0, 5);
    InitializeCommonEvent(0, 90005211, 2048390200, 30014, 20014, 0, 1099956224, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390201, 30014, 20014, 0, 1099956224, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390202, 30014, 20014, 0, 1099956224, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390203, 30014, 20014, 0, 1099956224, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390204, 30016, 20016, 0, 1097859072, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390205, 30016, 20016, 0, 1097859072, 1065353216, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390206, 30016, 20016, 0, 1092616192, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390207, 30016, 20016, 0, 1092616192, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390208, 30016, 20016, 0, 1097859072, 1077936128, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390209, 30016, 20016, 0, 1097859072, 1073741824, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390210, 30016, 20016, 0, 1097859072, 1065353216, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390216, 30014, 20014, 0, 1092616192, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390218, 30014, 20014, 0, 1092616192, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390219, 30014, 20014, 0, 1092616192, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390220, 30019, 20019, 0, 1101004800, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048390221, 30019, 20019, 0, 1101004800, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005250, 2048390300, 2048392300, 1050253722, -1);
    InitializeCommonEvent(0, 90005250, 2048390301, 2048392300, 1036831949, -1);
    InitializeCommonEvent(0, 90005250, 2048390303, 2048392300, 1060320051, -1);
    InitializeCommonEvent(0, 90005250, 2048390305, 2048392300, 1061997773, -1);
    InitializeCommonEvent(0, 90005250, 2048390306, 2048392300, 1053609165, -1);
    InitializeCommonEvent(0, 90005250, 2048390307, 2048392300, 0, -1);
    InitializeEvent(0, 2048390700, 0);
    // [Veteran] Grazia argentata (grazia shadow keep main gate plaza)
    InitializeCommonEvent(0, 90005103, 72101, 72101, 61480000, 1040648000, 3, 1040648000, 1040648001, 1040648002, 1040648003, 1040648004, 1040648005, 1040648006, 1040648007, 1040648008, 1040648009);
});

$Event(2048390700, Restart, function() {
    WaitFixedTimeFrames(1);
    EndIf(!PlayerIsInOwnWorld());
    SetEventFlagID(2051459751, OFF);
    EndIf(EventFlag(2048380850));
    EndIf(!EventFlag(2051459708) && !EventFlag(2051459719) && !EventFlag(2051459720));
    EndIf(EventFlag(25000800));
    SetEventFlagID(2051459751, ON);
    WaitFor(EventFlag(2048380850) || EventFlag(25000800));
    SetEventFlagID(2051459751, OFF);
});
