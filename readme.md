# Generals.io Bot Runner

Everything you need to run and develop [generals.io](http://generals.io/) bots.

**Vaporware alert! - This is just getting started. Design by readme.**

When you are developing a bot, you shouldn't have to wait 20 minutes to see a replay with your changes in action. The Generals.io Bot Runner will watch your files for changes, automatically load your code in, and restart a local game played at high speed right in a browser window. You'll be able to see your bot running in less than a second after you make a change.

Have plenty of CPU power? Spin off multiple workers in tournament mode to quickly get hundreds of games played allowing you to compare how much your bot has improved.

Ready for online play? Press a button and your bot code will be run against the generals.io bot server. The best part? You don't have to write any network code at all.

Good debugging information is is a key part of bot development. Bots can emit debugging maps for each turn, which you can overlay onto the main map. You can also emit debugging values to the sidebar.

# Where we are actually at

We can draw a map in the browser. There are no cities, generals, or mountains. Oh. Plain squares grow. Bots move. The end.

The first overall goal is **running javascript bots in local browser games**. 

To do this, we need:

- [-] Drawing maps
- [x] A nice way to organize our model files
- [x] Get tests up and running for models
- [ ] Map generation
- [ ] Handle the full generals game elements (mountains, cities, generals, winning)
- [ ] Good interface to bots
- [ ] A few simple example bots
- [ ] Documentation for bot writing
- [ ] Show bot information in sidebar
- [ ] End a round after 2000 steps


# Contributing

Contributions are super welcome! I'll try to merge all pull requests withen 24 hours that match the below standards.

1. Create a pull request for a single improvement.
2. Squashed commits preferred, but if you don't know how, don't worry about it.
3. In the commit message, describe the problem you are solving, then a blank line, then how this commit solves it.
4. If you are working on model code, make sure that the unit tests pass, and add unit tests for anything you've added.

To run unit tests, just do `npm test`

Rock on, tool builders!
