# Change Log

The format is based on [Keep a Changelog][keep-a-changelog] and this project
adheres to [Semantic Versioning][semver].

## [Unreleased]

### Added
 - Package: Add support for Node.js 8
 - Package: Add `start` npm script
 - Bot: Allow joining / leaving a user or group chat
 - Bot: Allow befriending / unfriending a user
 - Trigger: `acceptChatInvite` - Accept a chat invite
 - Trigger: `acceptFriendRequest` - Accept a friend request

### Changed
 - Package: Drop support for Node.js 4

### Fixes
 - Trigger: `execCmd` - Ignore blacklisted users

## 0.1.0 - 2017-03-07

### Added
 - Command: `blacklist` - Blacklist a user or group
 - Command: `dice` - Simulate a dice roll
 - Command: `help` - Show help
 - Command: `mute` - Mute the bot for a user or group chat
 - Command: `uptime` - Show bot uptime
 - Command: `whitelist` - Whitelist a user or group
 - Trigger: `execCmd` - Execute a command

[keep-a-changelog]: http://keepachangelog.com/en/1.0.0/
[semver]: http://semver.org/spec/v2.0.0.html

[Unreleased]: https://github.com/scriptdaemon/cheevobot/compare/v0.1.0...HEAD
