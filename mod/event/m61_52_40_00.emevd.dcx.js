// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.4.2
// ==/EMEVD==

$Event(0, Default, function() {
    RegisterBonfire(2052400000, 2052401950, 0, 0, 0, 5);
    InitializeCommonEvent(0, 90005860, 2052400800, 0, 2052400800, 1, 30800, 0);
    InitializeEvent(0, 2052400202, 2052400800, 905580600, 920300, 1116471296, 1123024896, 2052400200);
    InitializeEvent(0, 2052402812, 0);
    InitializeEvent(0, 2052402800, 2052400800);
    InitializeEvent(0, 2052402203, 2052400800);
    InitializeEvent(1, 2052402203, 2052400200);
    InitializeEvent(0, 2052402811, 0);
    InitializeEvent(0, 2052402201, 2052400200);
    InitializeEvent(0, 2052402200, 2052405200, 2052402200);
    InitializeEvent(0, 2052400700, 2052400700, 4260, 4261, 4262, 4263, 4267, 4268, 2052409202, 1128792064, 2052409211);
    InitializeEvent(0, 2052400702, 4267, 4261, 90405, 2052400700, 4263, 1088421888, 1073741824);
    InitializeCommonEvent(0, 90005744, 2052400700, 2052409209, 4268, 90207);
    InitializeEvent(0, 2052400701, 2052409209, 2052402703, 2052402705, 1092616192, 4261, 4263, 2052402706, 2052402707);
    InitializeCommonEvent(0, 90005703, 2052400700, 4261, 4262, 2052409201, 4261, 4260, 4264, 0);
    InitializeCommonEvent(0, 90005704, 2052400700, 4261, 4260, 2052409201, 3);
    InitializeCommonEvent(0, 90005702, 2052400700, 4263, 4260, 4264);
    InitializeCommonEvent(0, 90005750, 2052401700, 4350, 107110, 400712, 400712, 2052409211, 6102);
    InitializeCommonEvent(0, 90005750, 2052401700, 4350, 107120, 400714, 400714, 2052409212, 6102);
    InitializeEvent(0, 2052400704, 2052400800, 4278, 4265);
    InitializeEvent(0, 2052400703, 2052400701, 4260, 4261, 4262, 4263, 4268);
    // NPC
    InitializeEvent(0, 2052400707, 2052400710, 1040649013, 1040640001);
});

$Event(2052402200, Restart, function(X0_4, X4_4) {
    SetSpEffect(X0_4, 4800);
    SetSpEffect(X0_4, 5651);
    WaitFor(
        ((CharacterType(10000, TargetType.BlackPhantom) && CharacterHasSpEffect(10000, 3710))
            || CharacterType(10000, TargetType.Alive)
            || CharacterType(10000, TargetType.GrayPhantom)
            || CharacterType(10000, TargetType.WhitePhantom))
            && (HasDamageType(X0_4, 10000, DamageType.Unspecified)
                || HasDamageType(X0_4, 35000, DamageType.Unspecified)
                || HasDamageType(35000, X0_4, DamageType.Unspecified)
                || EntityInRadiusOfEntity(10000, X0_4, 10, 1)
                || EntityInRadiusOfEntity(35000, X0_4, 10, 1)
                || InArea(10000, X4_4)
                || InArea(35000, X4_4)));
    if (PlayerIsInOwnWorld()) {
        SetNetworkUpdateAuthority(X0_4, AuthorityLevel.Forced);
        SetNetworkUpdateRate(X0_4, true, CharacterUpdateFrequency.AtLeastEvery2Frames);
    }
    ClearSpEffect(X0_4, 5651);
    ClearSpEffect(X0_4, 4800);
});

$Event(2052402201, Restart, function(X0_4) {
    if (EventFlag(2052400800)) {
        DisableCharacter(X0_4);
        DisableCharacterCollision(X0_4);
        ForceCharacterDeath(X0_4, false);
        EndEvent();
    }
    DisableCharacterHPBarDisplay(X0_4);
    SetSpEffect(X0_4, 4403);
    SetSpEffect(X0_4, 20012700);
    SetCharacterTeamType(X0_4, TeamType.Unknown70);
    WaitFixedTimeSeconds(3);
    EnableCharacterHPBarDisplay(X0_4);
    WaitFor(CharacterDead(2052400800));
    SetSpEffect(X0_4, 20012700);
});

$Event(2052400202, Default, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4) {
    DisableNetworkSync();
    WaitFor(
        CharacterAIState(X0_4, AIStateType.Combat)
            && !EventFlag(9000)
            && (HasDamageType(X0_4, 10000, DamageType.Unspecified)
                || HasDamageType(X0_4, 35000, DamageType.Unspecified)
                || HasDamageType(35000, X0_4, DamageType.Unspecified)
                || EntityInRadiusOfEntity(10000, X0_4, X12_4, 1)
                || EntityInRadiusOfEntity(35000, X0_4, X12_4, 1)));
    SetSpEffect(X0_4, 20012704);
    ClearSpEffect(X20_4, 4800);
    ClearSpEffect(X0_4, 4800);
    if (EventFlag(9290)) {
        GotoIf(L1, !EventFlag(9291));
        WaitFixedTimeSeconds(5);
        RestartEvent();
    }
L0:
    SetBossBGM(X8_4, BossBGMState.Start);
    SetEventFlagID(9290, ON);
    WaitFixedTimeSeconds(1);
    DisplayBossHealthBar(Enabled, X0_4, 0, X4_4);
    if (PlayerIsInOwnWorld()) {
        SetNetworkUpdateAuthority(X0_4, AuthorityLevel.Forced);
        SetNetworkUpdateRate(X0_4, true, CharacterUpdateFrequency.AtLeastEvery2Frames);
    }
    cond = !CharacterAIState(X0_4, AIStateType.Combat);
    WaitFor(
        CharacterDead(X0_4)
            || EventFlag(9000)
            || !(EntityInRadiusOfEntity(10000, X0_4, X16_4, 1)
                || (!(CharacterType(10001, TargetType.BlackPhantom)
                    || CharacterType(10001, TargetType.Invader)
                    || CharacterType(10001, TargetType.Invader3)
                    || CharacterType(10001, TargetType.Invader2))
                    && EntityInRadiusOfEntity(10001, X0_4, X16_4, 1))
                || (!(CharacterType(10002, TargetType.BlackPhantom)
                    || CharacterType(10002, TargetType.Invader)
                    || CharacterType(10002, TargetType.Invader3)
                    || CharacterType(10002, TargetType.Invader2))
                    && EntityInRadiusOfEntity(10002, X0_4, X16_4, 1))
                || (!(CharacterType(10003, TargetType.BlackPhantom)
                    || CharacterType(10003, TargetType.Invader)
                    || CharacterType(10003, TargetType.Invader3)
                    || CharacterType(10003, TargetType.Invader2))
                    && EntityInRadiusOfEntity(10003, X0_4, X16_4, 1))
                || (!(CharacterType(10004, TargetType.BlackPhantom)
                    || CharacterType(10004, TargetType.Invader)
                    || CharacterType(10004, TargetType.Invader3)
                    || CharacterType(10004, TargetType.Invader2))
                    && EntityInRadiusOfEntity(10004, X0_4, X16_4, 1))
                || (!(CharacterType(10004, TargetType.BlackPhantom)
                    || CharacterType(10004, TargetType.Invader)
                    || CharacterType(10004, TargetType.Invader3)
                    || CharacterType(10004, TargetType.Invader2))
                    && EntityInRadiusOfEntity(10004, X0_4, X16_4, 1))
                || EntityInRadiusOfEntity(35000, X0_4, X16_4, 1)));
    SetSpEffect(X20_4, 4800);
    SetSpEffect(X0_4, 4800);
    SetBossBGM(X8_4, BossBGMState.Stop2);
    if (CharacterDead(X0_4)) {
        SetNetworkUpdateAuthority(X0_4, AuthorityLevel.Normal);
        SetNetworkUpdateRate(X0_4, false, CharacterUpdateFrequency.AtLeastEvery2Frames);
        EndEvent();
    }
    if (!EventFlag(9000)) {
        WaitFixedTimeSeconds(1);
    }
    DisplayBossHealthBar(Disabled, X0_4, 0, X4_4);
    if (PlayerIsInOwnWorld()) {
        SetNetworkUpdateAuthority(X0_4, AuthorityLevel.Normal);
        SetNetworkUpdateRate(X0_4, false, CharacterUpdateFrequency.AtLeastEvery2Frames);
    }
    SetEventFlagID(9290, OFF);
    RestartEvent();
});

$Event(2052402800, Restart, function(X0_4) {
    EndIf(EventFlag(2052400800));
    SetSpEffect(X0_4, 20012700);
    SetCharacterTeamType(X0_4, TeamType.Unknown67);
    WaitFor(CharacterDead(2052400200));
    SetSpEffect(X0_4, 20012700);
});

$Event(2052402811, Restart, function() {
    EndIf(EventFlag(2052400800));
    SetSpEffect(2052400800, 20012706);
    WaitFixedTimeSeconds(20.1);
    RestartEvent();
});

$Event(2052402812, Restart, function() {
    SetCharacterEnableDistanceAndUnknown200484(2052400800, 300, 100);
    SetCharacterEnableDistanceAndUnknown200484(2052400200, 300, 100);
});

$Event(2052402203, Restart, function(X0_4) {
    EndIf(CharacterDead(2052400200) || CharacterDead(2052400800));
    WaitFor(!InArea(X0_4, 2052402803) && !CharacterHasSpEffect(X0_4, 20011655));
    SetCharacterEventTarget(X0_4, 2052400803);
    SetSpEffect(X0_4, 20011655);
    RestartEvent();
});

$Event(2052400700, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4, X32_4, X36_4) {
    DisableNetworkSync();
    WaitFixedTimeFrames(1);
    if (PlayerIsInOwnWorld()) {
        if (EventFlag(X4_4)) {
            SetEventFlagID(X28_4, OFF);
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
    EnableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, false);
    WaitFor(CharacterBackreadStatus(X0_4));
    ResetCharacterPosition(X0_4);
    if (EventFlag(X20_4)) {
        SetCharacterTalkRange(X0_4, X32_4);
        ForceAnimationPlayback(X0_4, 90102, false, false, false);
    }
    if (EventFlag(X24_4)) {
        SetCharacterTeamType(X0_4, TeamType.Disabled);
        ForceAnimationPlayback(X0_4, 90103, false, false, false);
    }
    WaitFixedTimeRealFrames(1);
    Goto(L20);
L2:
    EnableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, false);
    WaitFor(CharacterBackreadStatus(X0_4));
    ResetCharacterPosition(X0_4);
    SetCharacterTeamType(X0_4, TeamType.HostileNPC);
    ForceAnimationPlayback(X0_4, 90102, false, false, false);
    WaitFixedTimeRealFrames(1);
    Goto(L20);
L3:
    EnableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, false);
    SetCharacterTeamType(X0_4, TeamType.HostileNPC);
    ForceAnimationPlayback(X0_4, 90102, false, false, false);
    Goto(L20);
L4:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    if (!EventFlag(X36_4)) {
        ForceCharacterTreasure(X0_4);
    }
    Goto(L20);
L20:
    WaitFor(!(EventFlag(X20_4) || EventFlag(X24_4)));
    RestartEvent();
});

$Event(2052400701, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4) {
    WaitFixedTimeFrames(1);
    EndIf(!PlayerIsInOwnWorld());
    EndIf(EventFlag(X0_4));
    EndIf(EventFlag(X16_4));
    EndIf(EventFlag(X20_4));
    GotoIf(L1, !EventFlag(X4_4) && !EventFlag(X8_4));
    GotoIf(L2, EventFlag(X4_4) && !EventFlag(X8_4));
    EndEvent();
L1:
    WaitFor(EventFlag(X4_4) && !EventFlag(X8_4));
    RestartEvent();
L2:
    if (EventFlag(X24_4)) {
        SetEventFlagID(X24_4, OFF);
    }
    WaitFor(
        ElapsedSeconds(X12_4)
            || EventFlag(X16_4)
            || EventFlag(X20_4)
            || EventFlag(X24_4)
            || EventFlag(X28_4));
    EndIf(EventFlag(X16_4));
    EndIf(EventFlag(X20_4));
    RestartIf(EventFlag(X24_4));
    if (EventFlag(X28_4)) {
        SetEventFlagID(X4_4, OFF);
        SetEventFlagID(X8_4, OFF);
        SetEventFlagID(X28_4, OFF);
        RestartEvent();
    }
    SetEventFlagID(X8_4, ON);
    SetEventFlagID(X4_4, OFF);
    WaitFixedTimeFrames(1);
    RestartEvent();
});

$Event(2052400702, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4) {
    WaitFixedTimeFrames(2);
    EndIf(!PlayerIsInOwnWorld());
    EndIf(EventFlag(X16_4));
    WaitForEventFlag(ON, TargetEventFlagType.EventFlag, X0_4);
    if (!(EventFlag(X0_4) && !EventFlag(X4_4))) {
        WaitFor(
            EventFlag(X0_4)
                && EventFlag(X4_4)
                && (HasDamageType(X12_4, 20000, DamageType.Unspecified)
                    || (EntityInRadiusOfEntity(20000, X12_4, X20_4, 1) && ElapsedSeconds(X24_4))));
        ForceAnimationPlayback(X12_4, X8_4, true, false, false);
        WaitFixedTimeSeconds(5.5);
        RestartEvent();
    }
L10:
    WaitFor(EventFlag(X0_4) && EventFlag(X4_4));
    ForceAnimationPlayback(X12_4, X8_4, true, false, false);
    WaitFixedTimeSeconds(5.5);
    RestartEvent();
});

$Event(2052400703, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4) {
    DisableNetworkSync();
    WaitFixedTimeFrames(1);
    GotoIf(L10, !PlayerIsInOwnWorld());
    GotoIf(S0, !EventFlag(X4_4));
L10:
S0:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    if (!EventFlag(X20_4)) {
        WaitFor(EventFlag(X20_4));
        RestartEvent();
    }
L0:
    GotoIf(L1, EventFlag(X4_4));
    GotoIf(L1, EventFlag(X8_4));
    GotoIf(L1, EventFlag(X12_4));
    GotoIf(L4, EventFlag(X16_4));
L1:
    EnableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, false);
    WaitFor(CharacterBackreadStatus(X0_4));
    ResetCharacterPosition(X0_4);
    SetCharacterTeamType(X0_4, TeamType.Disabled);
    ForceAnimationPlayback(X0_4, 90103, false, false, false);
    WaitFixedTimeRealFrames(1);
    Goto(L20);
L4:
    DisableCharacter(X0_4);
    SetCharacterBackreadState(X0_4, true);
    Goto(L20);
L20:
    WaitFor(!EventFlag(X20_4));
    RestartEvent();
});

$Event(2052400704, Restart, function(X0_4, X4_4, X8_4) {
    WaitFixedTimeFrames(1);
    EndIf(!PlayerIsInOwnWorld());
    EndIf(!EventFlag(X8_4));
    EndIf(EventFlag(X0_4));
    WaitFor(EventFlag(X0_4));
    SetEventFlagID(X4_4, ON);
});

$Event(2052400705, Restart, function(X0_4, X4_4, X8_4) {
    WaitFixedTimeFrames(1);
    EndIf(!PlayerIsInOwnWorld());
    SetEventFlagID(X0_4, OFF);
    EndIf(EventFlag(X8_4));
    WaitFor(PlayerHasItem(ItemType.Goods, X4_4));
    SetEventFlagID(X0_4, ON);
});

$Event(2052400706, Restart, function(X0_4, X4_4, X8_4, X12_4, X16_4, X20_4, X24_4, X28_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    WaitFor(EventFlag(X20_4) && !AllBatchEventFlags(X12_4, X16_4) && !EventFlag(X28_4));
    if (Signed(X24_4) != 0) {
        CreateAssetfollowingSFX(X0_4, 90, X24_4);
    } else {
        CreateAssetfollowingSFX(X0_4, 90, 6101);
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

// Ghost appears after taking igon's items
$Event(2052400707, Restart, function(X0_4, X4_4, X8_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    DisableCharacter(X0_4);
    if(!EventFlag(X8_4)) {
        // Wait for itemLot flag
        WaitFor(EventFlag(400712) || EventFlag(400714));
        // Enable NPC
        EnableCharacter(X0_4);
        // Perform animation fade-in
        ForceAnimationPlayback(X0_4, 60502, false, true, false);    // Comparsa spirito (funziona)
        WaitFixedTimeSeconds(1);
        // ForceAnimationPlayback(X0_4, 81100, false, true, false);    // Inizio gesto (non funziona)
        // ForceAnimationPlayback(X0_4, 81101, false, false, false);   // Gesto (funziona)
        // Wait for flag (from ESD)
        WaitFor(EventFlag(X4_4));
        // Fade out animation
        // ForceAnimationPlayback(X0_4, 81102, false, false, false);   // Fine gesto (non funziona)
        WaitFixedTimeSeconds(1);
        ForceAnimationPlayback(X0_4, 60505, false, true, false);    // Scomparsa spirito (funziona)
        WaitFixedTimeSeconds(3);
        DisableCharacter(X0_4);
        SetEventFlagID(X8_4, ON);
    }
});



