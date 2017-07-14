# Change Log

All notable changes to this project will be documented in this file. This
project adheres to [Semantic Versioning][semver].

## [Unreleased]

### Breaking Changes
 - Package: Drop support for Node.js 4

### New Features
 - Package: Add support for Node.js 8
 - Package: Add `start` npm script
 - Bot: Allow joining / leaving a user or group chat
 - Bot: Allow befriending / unfriending a user
 - Trigger: `acceptChatInvite` - Accept a chat invite
 - Trigger: `acceptFriendRequest` - Accept a friend request

### Bug Fixes
 - Trigger: `execCmd` - Ignore blacklisted users

## 0.1.0 - 2017-03-07

### New Features
 - Command: `blacklist` - Blacklist a user or group
 - Command: `dice` - Simulate a dice roll
 - Command: `help` - Show help
 - Command: `mute` - Mute the bot for a user or group chat
 - Command: `uptime` - Show bot uptime
 - Command: `whitelist` - Whitelist a user or group
 - Trigger: `execCmd` - Execute a command

[semver]: http://semver.org/

[Unreleased]: https://github.com/scriptdaemon/cheevobot/compare/v0.1.0...HEAD
