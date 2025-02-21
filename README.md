<p align="center">
    <img width="15%" src="./img/logo.png">
    <h1 align="center">Alias</h1>
</p>
<a href="https://github.com/zer0code9" style="text-decoration: none"><p align="center">
    <img src="https://img.shields.io/badge/zer0code9-alias-red?logo=javascript&logoColor=red">
</p></a>
<a href="https://github.com/zer0code9/alias" style="text-decoration: none"><p align="center">
    <img alt="GitHub" src="https://img.shields.io/github/license/zer0code9/alias?logo=github">
    <img alt="Issues" src="https://img.shields.io/github/issues/zer0code9/alias?logo=github">
    <img alt="Commit Activity" src="https://img.shields.io/github/commit-activity/m/zer0code9/alias?label=activity&logo=github">
    <img alt="Lastest Commit" src="https://img.shields.io/github/last-commit/zer0code9/alias?label=commit&logo=github">
</p></a>

A simple multitask bot for discord. Kinda cool right?

This bot is not online though. It might be in the future.

# Commands

## Info

> info (int & msg)

    channel [channel: channel-mention|id]

    role [role: role-mention|id]

    member [member: user-mention|id]

    guild

    bot

    emoji [emoji: emoji-id]

## Moderation

> ban (int & msg)

    create [member: user-mention|id] [option: string-'soft'|'harsh'] [reason: string-phrase]

    delete [user: user-id] [reason: string-phrase]

> kick (int & msg)

    [member: user-mention|id] [reason*: string-phrase]

> mute (int & msg)

    create [member: user-mention|id] [reason: string-phrase]

    delete [member: user-mention|id] [reason: string-phrase]

> timeout (int & msg)

    create [member: user-mention|id] [time: number-seconds] [reason: string-phrase]

    delete [member: user-mention|id] [reason: string-phrase]

> warn (int & msg)

    create [member: user-mention|id] [reason: string-phrase]

    delete [member: user-mention|id] [reason: string-phrase]

## Utility

> calc (int & msg)

    [expression: string-phrase]

> channel (int & msg)

    create [name: string] [type?: integer]

    edit [channel: channel-mention|id] [name?: string-phrase] [parent?: channel-id] [position?: integer] [topic?: string-phrase] [rate?: string-second] [limit?: integer]

    delete [channel: channel-mention|id] [reason?: string-phrase]

> role (int & msg)

    create [name: string]

    edit [role: role-mention|id] [name?: string-phrase] [position?: integer] [color?: string-hex] [mention?: boolean] [hoist?: boolean] [unicode?: string-phrase]

    delete [role: role-mention|id] [reason?: string-phrase]

Made by zer0code