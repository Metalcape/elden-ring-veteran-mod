// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.4.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(2048420000, 2048421950, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005201, 2048420200, 30001, 20001, 1092616192, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005201, 2048420202, 30001, 20001, 1092616192, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005557, 2048421680);
    InitializeCommonEvent(0, 90005557, 2048421681);
    InitializeCommonEvent(0, 90005557, 2048421682);
    InitializeCommonEvent(0, 90005557, 2048421683);
    InitializeCommonEvent(0, 90005557, 2048421684);
    InitializeCommonEvent(0, 90005557, 2048421685);
    InitializeCommonEvent(0, 90005557, 2048421686);
    InitializeCommonEvent(0, 90005557, 2048421687);
    InitializeCommonEvent(0, 90005557, 2048421688);
    InitializeCommonEvent(0, 90005556, 2048421689, 2048427900);
    InitializeEvent(0, 2048420700, 2048420700, 4260, 4261, 4262, 4263, 4265, 2048429202, 1116471296, 2048422703, 2048422704, 90100, 90101, 2048429222, 2048429223);
    InitializeEvent(0, 2048420702, 4265, 2048429210, 2048429211, 2048422703, 2048422704, 2048429212, 2048429216, 4261);
    InitializeEvent(0, 2048420703, 2048422707, 4265, 2048422706, 1101004800, 2048422703);
    InitializeEvent(1, 2048420703, 2048422708, 4265, 2048422706, 1101004800, 2048422704);
    InitializeCommonEvent(0, 90005703, 2048420700, 4261, 4262, 2048429201, 4261, 4260, 4264, 0);
    InitializeCommonEvent(0, 90005704, 2048420700, 4261, 4260, 2048429201, 3);
    InitializeCommonEvent(0, 90005702, 2048420700, 4263, 4260, 4264);
    InitializeEvent(0, 2048420701, 4265, 4261, 2048422703, 2048422704, 90403, 90404, 2048420700, 4263, 1088421888, 1073741824);
    // [Veteran] Grazia argentata (grazia shadow keep main gate plaza)
    InitializeCommonEvent(0, 90005103, 72101, 72101, 61480000, 1040648000, 0, 1040648000, 1040648001, 1040648002, 1040648003, 1040648004, 1040648005, 1040648006, 1040648007, 1040648008, 1040648009);
});

$Event(2048420700, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4, X32_4, X36_4, X40_4, X44_4, X48_4, X52_4) {
    DisableNetworkSync();
    WaitFixedTimeFrames(1);
    SetEventFlagID(X52_4, OFF);
    if (PlayerIsInOwnWorld()) {
        if (EventFlag(X4_4)) {
            SetEventFlagID(X24_4, OFF);
        }
    }
L10:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    if (!EventFlag(X20_4)) {
        WaitFor(EventFlag(X20_4));
        RestartEvent();
    }
L0:
    GotoIf(L1, EventFlag(X4_4));
    GotoIf(L2, EventFlag(X8_4));
    GotoIf(L3, EventFlag(X12_4));
    GotoIf(L4, EventFlag(X16_4));
L1:
    GotoIf(L20, EventFlag(X48_4));
    WaitFor(EventFlag(X32_4) || EventFlag(X36_4));
    WaitFixedTimeRealFrames(1);
    EnableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, false);
    WaitFor(CharacterBackreadStatus(X0_4));
    ResetCharacterPosition(X0_4);
    if (EventFlag(X32_4)) {
        ForceAnimationPlayback(X0_4, X40_4, true, false, false);
    }
    if (EventFlag(X36_4)) {
        ForceAnimationPlayback(X0_4, X44_4, true, false, false);
    }
    SetCharacterTalkRange(X0_4, X28_4);
    WaitFixedTimeRealFrames(1);
    Goto(L20);
L2:
    EnableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, false);
    SetCharacterTeamType(X0_4, TeamType.HostileNPC);
    ForceAnimationPlayback(X0_4, X40_4, true, false, false);
    Goto(L20);
L3:
    EnableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, false);
    SetCharacterTeamType(X0_4, TeamType.HostileNPC);
    ForceAnimationPlayback(X0_4, X40_4, true, false, false);
    Goto(L20);
L4:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    ForceCharacterTreasure(X0_4);
    Goto(L20);
L20:
    WaitFor(!EventFlag(X20_4) || EventFlag(X52_4));
    RestartEvent();
});

$Event(2048420701, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4, X32_4, X36_4) {
    WaitFixedTimeFrames(2);
    EndIf(!PlayerIsInOwnWorld());
    EndIf(!EventFlag(X0_4));
    EndIf(EventFlag(X28_4));
    if (!(EventFlag(X0_4) && !EventFlag(X4_4))) {
        WaitFor(
            EventFlag(X0_4)
                && EventFlag(X4_4)
                && (HasDamageType(X24_4, 20000, DamageType.Unspecified)
                    || (EntityInRadiusOfEntity(20000, X24_4, X32_4, 1) && ElapsedSeconds(X36_4))));
        if (EventFlag(X8_4)) {
            ForceAnimationPlayback(X24_4, X16_4, true, false, false);
        }
        if (EventFlag(X12_4)) {
            ForceAnimationPlayback(X24_4, X20_4, true, false, false);
        }
        WaitFixedTimeSeconds(5.5);
        RestartEvent();
    }
L10:
    WaitFor(EventFlag(X0_4) && EventFlag(X4_4));
    if (EventFlag(X8_4)) {
        ForceAnimationPlayback(X24_4, X16_4, true, false, false);
    }
    if (EventFlag(X12_4)) {
        ForceAnimationPlayback(X24_4, X20_4, true, false, false);
    }
    WaitFixedTimeSeconds(5.5);
    RestartEvent();
});

$Event(2048420702, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4) {
    WaitFixedTimeFrames(1);
    EndIf(!PlayerIsInOwnWorld());
    EndIf(!EventFlag(X0_4));
    GotoIf(L1, EventFlag(X28_4));
    GotoIf(L1, !EventFlag(X4_4));
    GotoIf(L2, !EventFlag(X8_4));
    Goto(L3);
L1:
    SetEventFlagID(X12_4, ON);
    EndEvent();
L2:
    SetEventFlagID(X16_4, ON);
    EndEvent();
L3:
    BatchSetEventFlags(X20_4, X24_4, OFF);
    RandomlySetEventFlagInRange(X20_4, X24_4, ON);
    if (EventFlag(X24_4)) {
        SetEventFlagID(X16_4, ON);
        EndEvent();
    }
    SetEventFlagID(X12_4, ON);
    EndEvent();
});

$Event(2048420703, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4) {
    WaitFixedTimeFrames(1);
    EndIf(!PlayerIsInOwnWorld());
    EndIf(EventFlag(X0_4));
    if (EventFlag(X4_4)) {
        WaitFor((EventFlag(X0_4) || EventFlag(X8_4)) && EventFlag(X16_4));
        EndIf(EventFlag(X0_4));
        WaitFixedTimeSeconds(X12_4);
        SetEventFlagID(X8_4, OFF);
        RestartEvent();
    }
L10:
    WaitFor(EventFlag(X4_4));
    RestartEvent();
});
