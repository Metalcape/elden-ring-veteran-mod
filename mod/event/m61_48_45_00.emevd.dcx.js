// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.4.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(2048450000, 2048451950, 0, 0, 0, 0);
    InitializeCommonEvent(0, 900005571, 60860, 111, 2048457510, 0);
    InitializeEvent(0, 2048452500, 2048450500);
    InitializeCommonEvent(0, 900005580, 580600, 2048451500, 2048450500);
    InitializeEvent(0, 2048450700, 2048450700, 4366, 90100, 90101, 4360, 4363, 4898, 2048452703, 4927, 2048452702);
    InitializeEvent(0, 2048450701, 2048450700, 4368, 2048452704, 90101, 90102, 4360, 4363, 2048452706, 4898, 2048452705, 2048452702);
    InitializeEvent(0, 2048450702, 2048450700, 4927, 90101);
    InitializeEvent(0, 2048450703, 21019225, 21019226);
    InitializeEvent(0, 2048450704, 2048459230, 400612, 2046429221, 4366, 4368, 21019214, 2048459217, 2048459223, 2048452703, 2048452704, 21019226, 2048452705, 21019215, 2048452706);
    InitializeEvent(0, 2048450710, 2048451700, 4350, 106140, 400610, 400612, 2048459223, 6102, 6100, 400610, 400611);
    InitializeCommonEvent(0, 90005744, 2048450700, 2048452701, 2048459229, 90201);
    InitializeCommonEvent(0, 90005749, 2048450701, 2048450700, 2048459217, 2048452702);
    InitializeEvent(0, 2048450705, 2048450710, 4440, 4443, 4446, 90100, 90101, 4896, 4927, 2048452710);
    InitializeCommonEvent(0, 90005749, 2048450711, 2048450710, 4446, 2048452710);
    InitializeEvent(0, 2048450706, 4927, 2048450710, 90101);
    InitializeCommonEvent(0, 90005744, 2048450710, 2048459264, 2048459264, 90200);
    InitializeCommonEvent(0, 90005744, 2048450710, 2048459270, 2048459270, 90200);
    InitializeEvent(0, 2048450707, 4926, 4458);
    InitializeEvent(0, 2048450708, 2048451710, 4350, 6102);
    InitializeEvent(0, 2048450709, 2048451720, 206021, 1030024, 1106247680, 4914, 2048452717, 4896, 4446);
    // [Veteran] evento npc
    InitializeEvent(0, 2048450720, 2048450750, 1040649004, 1040640000);
});

$Event(2048452500, Restart, function(X0_4) {
    EndIf(EventFlag(X0_4));
    EndIf(!PlayerIsInOwnWorld());
    WaitFor(EventFlag(9146) && EventFlag(4896));
    SetEventFlagID(X0_4, ON);
});

$Event(2048450700, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4, X32_4, X36_4) {
    DisableNetworkSync();
    WaitFixedTimeFrames(1);
    if (EventFlag(X4_4)) {
        WaitFixedTimeFrames(1);
    }
    if (PlayerIsInOwnWorld()) {
    }
L10:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    if (!(EventFlag(X4_4) && !EventFlag(X28_4))) {
        WaitFor(EventFlag(X4_4) && !EventFlag(X28_4));
        RestartEvent();
    }
L0:
    GotoIf(L1, EventFlag(X16_4));
    GotoIf(L4, EventFlag(X20_4));
L1:
    if (!EventFlag(X36_4)) {
        if (!EventFlag(X24_4)) {
            EnableCharacter(X0_4);
            SetCharacterBackreadState(X0_4, false);
            WaitFor(CharacterBackreadStatus(X0_4));
            ResetCharacterPosition(X0_4);
            SetCharacterTeamType(X0_4, TeamType.Disabled);
            if (!EventFlag(X32_4)) {
                ForceAnimationPlayback(X0_4, X8_4, false, false, false);
            } else {
                ForceAnimationPlayback(X0_4, X12_4, false, false, false);
            }
        }
    }
    WaitFixedTimeRealFrames(1);
    Goto(L20);
L4:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    ForceCharacterTreasure(X0_4);
    Goto(L20);
L20:
    WaitFor(!(EventFlag(X4_4) && !EventFlag(X28_4)));
    RestartEvent();
});

$Event(2048450701, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4, X32_4, X36_4, X40_4) {
    DisableNetworkSync();
    WaitFixedTimeFrames(1);
    if (EventFlag(X4_4)) {
        WaitFixedTimeFrames(1);
    }
    if (PlayerIsInOwnWorld()) {
    }
L10:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    if (!(EventFlag(X4_4) && EventFlag(X8_4) && !EventFlag(X36_4))) {
        WaitFor(EventFlag(X4_4) && EventFlag(X8_4) && !EventFlag(X36_4));
        RestartEvent();
    }
L0:
    GotoIf(L1, EventFlag(X20_4));
    GotoIf(L4, EventFlag(X24_4));
L1:
    if (!EventFlag(X40_4)) {
        if (!EventFlag(X32_4)) {
            EnableCharacter(X0_4);
            SetCharacterBackreadState(X0_4, false);
            WaitFor(CharacterBackreadStatus(X0_4));
            ResetCharacterPosition(X0_4);
            SetCharacterTeamType(X0_4, TeamType.Disabled);
            if (!EventFlag(X28_4)) {
                ForceAnimationPlayback(X0_4, X16_4, false, false, false);
            } else {
                ForceAnimationPlayback(X0_4, X12_4, false, false, false);
            }
        }
    }
    WaitFixedTimeRealFrames(1);
    Goto(L20);
L4:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    ForceCharacterTreasure(X0_4);
    Goto(L20);
L20:
    WaitFor(!(EventFlag(X4_4) && EventFlag(X8_4) && !EventFlag(X36_4)));
    RestartEvent();
});

$Event(2048450702, Restart, function(X0_4, X4_4, X8_4) {
    EndIf(!PlayerIsInOwnWorld());
    EndIf(EventFlag(X4_4));
    WaitFor(EventFlag(X4_4));
    ForceAnimationPlayback(X0_4, X8_4, false, false, false);
    EndEvent();
});

$Event(2048450703, Restart, function(X0_4, X4_4) {
    EndIf(!PlayerIsInOwnWorld());
    EndIf(EventFlag(X4_4));
    if (EventFlag(X0_4)) {
        SetEventFlagID(X4_4, ON);
    }
    EndEvent();
});

$Event(2048450704, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4, X32_4, X36_4, X40_4, X44_4, X48_4, X52_4) {
    EndIf(!PlayerIsInOwnWorld());
    WaitFixedTimeFrames(1);
    GotoIf(L0, EventFlag(X12_4));
    GotoIf(L1, EventFlag(X16_4));
    WaitFor(EventFlag(X12_4) || EventFlag(X16_4));
    RestartEvent();
L0:
    if (!EventFlag(X0_4)) {
        if (!EventFlag(X8_4)) {
            SetEventFlagID(X4_4, ON);
        }
        SetEventFlagID(X0_4, ON);
    }
    if (EventFlag(X28_4)) {
        SetEventFlagID(X32_4, ON);
    } else {
        SetEventFlagID(X24_4, ON);
    }
    EndEvent();
L1:
    if (EventFlag(X20_4)) {
        SetEventFlagID(X24_4, ON);
        SetEventFlagID(X36_4, ON);
    }
    if (EventFlag(X40_4)) {
        SetEventFlagID(X44_4, ON);
        SetEventFlagID(X24_4, OFF);
    }
    if (EventFlag(X48_4)) {
        SetEventFlagID(X52_4, ON);
    }
    SetEventFlagID(X28_4, ON);
    EndEvent();
});

$Event(2048450705, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4, X32_4) {
    DisableNetworkSync();
    WaitFixedTimeFrames(1);
    if (PlayerIsInOwnWorld()) {
    }
L10:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    if (!EventFlag(X12_4)) {
        WaitFor(EventFlag(X12_4));
        RestartEvent();
    }
L0:
    GotoIf(L20, EventFlag(X24_4));
    GotoIf(L1, EventFlag(X4_4));
    GotoIf(L4, EventFlag(X8_4));
    Goto(L20);
L1:
    GotoIf(L20, EventFlag(X32_4));
    EnableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, false);
    WaitFor(CharacterBackreadStatus(X0_4));
    ResetCharacterPosition(X0_4);
    SetCharacterTeamType(X0_4, TeamType.Disabled);
    if (!EventFlag(X28_4)) {
        ForceAnimationPlayback(X0_4, X16_4, true, false, false);
    }
    if (EventFlag(X28_4)) {
        ForceAnimationPlayback(X0_4, X20_4, true, false, false);
    }
    WaitFixedTimeRealFrames(1);
    Goto(L20);
L3:
    Goto(L20);
L4:
    Goto(L20);
L20:
    WaitFor(!EventFlag(X12_4));
    RestartEvent();
});

$Event(2048450706, Restart, function(X0_4, X4_4, X8_4) {
    EndIf(!PlayerIsInOwnWorld());
    EndIf(EventFlag(X0_4));
    WaitFor(EventFlag(X0_4));
    ForceAnimationPlayback(X4_4, X8_4, false, false, false);
    EndEvent();
});

$Event(2048450707, Restart, function(X0_4, X4_4) {
    EndIf(!PlayerIsInOwnWorld());
    EndIf(EventFlag(X0_4));
    SetEventFlagID(X0_4, ON);
    SetEventFlagID(X4_4, ON);
});

$Event(2048450708, Restart, function(X0_4, X4_4, X8_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    GotoIf(L1, !EventFlag(4446) && EventFlag(7623) && !EventFlag(400590));
    GotoIf(L2, !EventFlag(4446) && EventFlag(7621) && !EventFlag(400592));
    EndEvent();
L1:
    if (Signed(X8_4) != 0) {
        CreateAssetfollowingSFX(X0_4, 90, X8_4);
    } else {
        CreateAssetfollowingSFX(X0_4, 90, 6101);
    }
    WaitFor(ActionButtonInArea(X4_4, X0_4));
    DeleteAssetfollowingSFX(X0_4, true);
    AwardItemsIncludingClients(105900);
    EzstateInstructionRequest(10000, 60070, 0);
    EndEvent();
L2:
    if (Signed(X8_4) != 0) {
        CreateAssetfollowingSFX(X0_4, 90, X8_4);
    } else {
        CreateAssetfollowingSFX(X0_4, 90, 6101);
    }
    WaitFor(ActionButtonInArea(X4_4, X0_4));
    DeleteAssetfollowingSFX(X0_4, true);
    AwardItemsIncludingClients(105910);
    EzstateInstructionRequest(10000, 60070, 0);
    EndEvent();
});

$Event(2048450709, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4) {
    EndIf(!PlayerIsInOwnWorld());
    WaitFor(ActionButtonInArea(X4_4, X0_4) || EventFlag(X20_4));
    GotoIf(L0, EventFlag(X20_4));
    Goto(L1);
L0:
    WaitFor(!EventFlag(X20_4) || (EventFlag(X24_4) || !EventFlag(X28_4)));
    if (EventFlag(X20_4)) {
        SetEventFlagID(X20_4, OFF);
    }
    RestartEvent();
L1:
    DisplayGenericDialog(X8_4, PromptType.YESNO, NumberofOptions.NoButtons, 0, X12_4);
    SetEventFlagID(X16_4, ON);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(2048450710, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4, X32_4, X36_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    WaitFor(EventFlag(X20_4) && !AllBatchEventFlags(X12_4, X16_4));
    if (!(EventFlag(X32_4) && EventFlag(X36_4))) {
        CreateAssetfollowingSFX(X0_4, 90, X24_4);
    } else {
        CreateAssetfollowingSFX(X0_4, 90, X28_4);
    }
    flag = !EventFlag(X20_4) || AllBatchEventFlags(X12_4, X16_4);
    WaitFor(ActionButtonInArea(X4_4, X0_4) || flag);
    if (!flag.Passed) {
        DeleteAssetfollowingSFX(X0_4, true);
        AwardItemsIncludingClients(X8_4);
        EzstateInstructionRequest(10000, 60070, 0);
        EndEvent();
    }
L0:
    DeleteAssetfollowingSFX(X0_4, true);
    RestartEvent();
});

// [Veteran]
$Event(2048450720, Restart, function(X0_4, X4_4, X8_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    WaitFixedTimeFrames(1);
    DisableCharacter(X0_4);
    if (!EventFlag(X8_4)) {
        EnableCharacter(X0_4);
        // Miquella's ring animation
        ForceAnimationPlayback(X0_4, 81101, false, false, false);
        // Wait for disable character flag
        WaitFor(EventFlag(X4_4));
        // End gesture animation
        // ForceAnimationPlayback(X0_4, 81102, false, true, false);
        // WaitFixedTimeFrames(1);
        // Disappearing animation
        // 50570: mimic's veil
        // 60130: phantom disappears standing
        // 60265: disappears without skeleton movement (t-pose)
        // 60470: disappears walking
        // 60505: disappear idle with spirits sounds
        // 60600: custom copy
        // 420000: original fade with spirits sounds
        ForceAnimationPlayback(X0_4, 60505, false, true, false);
        // Set flag to disable character
        WaitFixedTimeSeconds(5);
        SetEventFlagID(X8_4, ON);
    }
    EndEvent();
});
