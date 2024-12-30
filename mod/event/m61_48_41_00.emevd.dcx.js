// ==EMEVD==
// @docs    er-common.emedf.json
// @compress    DCX_KRAK
// @game    Sekiro
// @string    "N:\\GR\\data\\Param\\event\\common_func.emevd\u0000N:\\GR\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.4.2
// ==/EMEVD==

$Event(0, Default, function() {
    InitializeCommonEvent(0, 90005301, 2048410300, 2048410300, 2048410980, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048410204, 30001, 20001, 2048412204, 1092616192, 1065353216, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048410205, 30001, 20001, 2048412204, 1092616192, 0, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005211, 2048410207, 30001, 20001, 2048412204, 1092616192, 1073741824, 0, 0, 0, 0);
    InitializeCommonEvent(0, 90005271, 2048410252, 0, -1);
    InitializeCommonEvent(0, 90005271, 2048410254, 0, -1);
    InitializeEvent(0, 2048412256, 2048410256, 2048412256);
    InitializeEvent(1, 2048412256, 2048410257, 2048412256);
    InitializeEvent(0, 2048412250, 2048410250);
    InitializeEvent(1, 2048412250, 2048410251);
    InitializeEvent(2, 2048412250, 2048410255);
    InitializeEvent(0, 2048412510, 0);
    InitializeCommonEvent(0, 90005501, 2048410510, 2048410511, 0, 2048411510, 2048411511, 2048411512, 2048410512);
    InitializeEvent(0, 61482920, 61481920, 61481921);
    InitializeEvent(0, 2048412500, 0);
    // [Veteran] spirit putrid flesh
    // InitializeEvent(0, 2048412560, 61480000, 1040647020, 1040640002);
});

$Event(50, Default, function() {
    InitializeEvent(0, 2048410519, 0);
});

$Event(2048412510, Default, function() {
    InitializeCommonEvent(0, 90005500, 2048410510, 2048410511, 0, 2048411510, 2048411511, 2048413511, 2048411512, 2048413512, 2048412511, 2048412512, 2048410512, 2048410513, 0);
});

$Event(2048410519, Default, function() {
    EndIf(ThisEventSlot());
    SetThisEventSlot(ON);
});

$Event(61482920, Restart, function(X0_4, X4_4) {
    DeleteAssetfollowingSFX(X0_4, true);
    DeleteAssetfollowingSFX(X4_4, true);
    CreateAssetfollowingSFX(X0_4, 90, 6100);
    CreateAssetfollowingSFX(X4_4, 90, 6100);
    onlineAct = PlayerIsInOwnWorld() && ActionButtonInArea(9000, X0_4);
    onlineAct2 = PlayerIsInOwnWorld() && ActionButtonInArea(9000, X4_4);
    WaitFor(onlineAct || onlineAct2);
    if (!onlineAct2.Passed) {
        WarpCharacterAndCopyFloorWithFadeout(10000, TargetEntityType.Asset, X4_4, 100, 10000, false, true);
        WaitFixedTimeSeconds(1);
        RestartEvent();
    }
L0:
    WarpCharacterAndCopyFloorWithFadeout(10000, TargetEntityType.Asset, X0_4, 100, 10000, false, true);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(2048412500, Default, function() {
    EndIf(!PlayerIsInOwnWorld());
    WaitFor(PlayerIsInOwnWorld() && ActionButtonInArea(209529, 2048411500));
    DisplayGenericDialog(2062000, PromptType.YESNO, NumberofOptions.NoButtons, 2048411500, 3);
    WaitFixedTimeSeconds(3);
    RestartEvent();
});

$Event(2048412250, Restart, function(X0_4) {
    EndIf(ThisEventSlot());
    DisableCharacterAI(X0_4);
    WaitFor(
        HasDamageType(X0_4, 0, DamageType.Unspecified)
            || CharacterHasStateInfo(X0_4, 436)
            || CharacterHasStateInfo(X0_4, 2)
            || CharacterHasStateInfo(X0_4, 5)
            || CharacterHasStateInfo(X0_4, 6)
            || CharacterHasStateInfo(X0_4, 260)
            || (CharacterHasSpEffect(X0_4, 481)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90110)
                && !CharacterHasSpEffect(X0_4, 90160))
            || (CharacterHasSpEffect(X0_4, 482)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90120)
                && !CharacterHasSpEffect(X0_4, 90160)
                && !CharacterHasSpEffect(X0_4, 90162))
            || (CharacterHasSpEffect(X0_4, 483)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90140)
                && !CharacterHasSpEffect(X0_4, 90160)
                && !CharacterHasSpEffect(X0_4, 90161))
            || (CharacterHasSpEffect(X0_4, 484)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90130)
                && !CharacterHasSpEffect(X0_4, 90161)
                && !CharacterHasSpEffect(X0_4, 90162))
            || (CharacterHasSpEffect(X0_4, 487)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90150)
                && !CharacterHasSpEffect(X0_4, 90160))
            || CharacterHasSpEffect(X0_4, 20010336));
    EnableCharacterAI(X0_4);
});

$Event(2048412256, Restart, function(X0_4, X4_4) {
    EndIf(ThisEventSlot());
    DisableCharacterAI(X0_4);
    WaitFor(
        HasDamageType(X0_4, 0, DamageType.Unspecified)
            || CharacterHasStateInfo(X0_4, 436)
            || CharacterHasStateInfo(X0_4, 2)
            || CharacterHasStateInfo(X0_4, 5)
            || CharacterHasStateInfo(X0_4, 6)
            || CharacterHasStateInfo(X0_4, 260)
            || (CharacterHasSpEffect(X0_4, 481)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90110)
                && !CharacterHasSpEffect(X0_4, 90160))
            || (CharacterHasSpEffect(X0_4, 482)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90120)
                && !CharacterHasSpEffect(X0_4, 90160)
                && !CharacterHasSpEffect(X0_4, 90162))
            || (CharacterHasSpEffect(X0_4, 483)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90140)
                && !CharacterHasSpEffect(X0_4, 90160)
                && !CharacterHasSpEffect(X0_4, 90161))
            || (CharacterHasSpEffect(X0_4, 484)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90130)
                && !CharacterHasSpEffect(X0_4, 90161)
                && !CharacterHasSpEffect(X0_4, 90162))
            || (CharacterHasSpEffect(X0_4, 487)
                && !CharacterHasSpEffect(X0_4, 90100)
                && !CharacterHasSpEffect(X0_4, 90150)
                && !CharacterHasSpEffect(X0_4, 90160))
            || InArea(10000, X4_4));
    EnableCharacterAI(X0_4);
});

// [Veteran] Aggro finger putrid flesh (disabled)
$Event(2048412560, Restart, function(X0_4, X4_4, X8_4) {
    DisableNetworkSync();
    EndIf(!PlayerIsInOwnWorld());
    WaitFixedTimeFrames(1);
    DisableCharacter(X0_4);
    if (!EventFlag(X8_4)) {
        EnableCharacter(X0_4);
        WaitFor(EventFlag(X4_4));
        ForceCharacterDeath(X0_4, false);
        SetEventFlagID(X8_4, ON);
        WaitFixedTimeSeconds(5);
    }
    RestartEvent();
});
