let ports;
const HOME = "home";

/** @param {NS} ns */
export async function main(ns) {
	let lvlpercent = 2 / 3;
	let ram = ns.getServerMaxRam(HOME);

	let debug = false;
	if (ns.args[0] == "debugging") {
		debug = true;
	} else if (ns.args[0] == "--help") {
		ns.tprint("\n This script should be run to start all automated programs.\n Such programs include:\n Hacking the best server available using every server available.\n Buying and upgrading max hacknet nodes.\n Purchasing the maximum amount of servers with 1/2 Ram of the home server.");
		ns.exit();
	}

	ports = [
		"NUKE.exe",
		"BruteSSH.exe",
		"FTPCrack.exe",
		"RelaySMTP.exe",
		"HTTPWorm.exe",
		"SQLInject.exe"
	];
	// List of targets for each level of root function
	const targets = [
		"harakiri-sushi",
		"iron-gym",
		"the-hub",
		"rho-construction",
		"global-pharm",
		"deltaone",
	];

	ns.tail();
	ns.moveTail(1050, 425);
	ns.resizeTail(250, 100);

	// stop logging certain actions
	ns.disableLog("ALL");
	ns.clearLog();

	// too expensive
	// Only write to these files if its been less than a minute since last aug 
	if (ns.getResetInfo().lastAugReset < 60000) {
		ns.write("stockgains.txt", "", "w");
		ns.write("augbaseprice.txt", ns.singularity.getAugmentationPrice("NeuroFlux Governor"), "w");
	}

	// Kill all instances of batch and batcher on startup
	// to prevent errors from batch trying to use the object from batcher
	ns.scriptKill("batch/batcher.js", HOME);
	ns.scriptKill("batch/batch.js", HOME);

	if (ns.getHackingLevel() < 40) {
		ns.scriptKill("hack.js", HOME);
		ns.print("Running root script #0, hacking ", "joesguns");
		ns.nuke("joesguns");
		ns.exec("hack.js", HOME, (ns.getServerMaxRam(HOME) > 200) ? (Math.max(Math.floor((ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME) - 200) / 2.4), 10)) : (Math.max(Math.floor((ns.getServerMaxRam(HOME) - ns.getScriptRam("start.js")) / 2.4), 10)), "joesguns", true);
	}

	// too expensive
	// start working for Sector-12 to get hacking exp
	if (ns.getServerMoneyAvailable(HOME) >= 15000000) {
		const invites = ns.singularity.checkFactionInvitations();
		for (let i = 0; i < invites.length; i++) {
			if (invites[i] == "Sector-12") {
				ns.singularity.joinFaction(invites[i]);
			}
		}
		ns.singularity.workForFaction("Sector-12", "hacking", false);
	}

	// start autoinfil
	ns.exec("misc/autoinfiltrate.js", HOME, 1, "--quiet");

	// start backdooring faction servers to get invites
	ns.print("Running start/milestones.js");
	ns.scriptKill("start/milestones.js", HOME);
	ns.exec("start/milestones.js", HOME);

	// start augment monitor
	ns.print("Running start/augments.js");
	ns.scriptKill("start/augments.js", HOME);
	ns.exec("start/augments.js", HOME);

	// start home monitor
	// upgrades ram and cores
	// joins factions
	ns.print("Running start/home.js");
	ns.scriptKill("start/home.js", HOME);
	ns.exec("start/home.js", HOME);

	// too expensive
	if (ns.getPlayer().money > 200000) {
		ns.singularity.purchaseTor();
	}

	// Buy all of the .exe's
	let m = 0;
	for (let i = 0; i < ports.length; ++i) {
		// too expensive
		if (!ns.fileExists(ports[i])) {
			// too expensive
			if (ns.getServerMoneyAvailable(HOME) > ns.singularity.getDarkwebProgramCost(ports[i])) {
				ns.singularity.purchaseProgram(ports[i]);
			}
			ns.print("Waiting for ", ports[i]);
			while (!ns.fileExists(ports[i])) {
				if (ns.getServerMoneyAvailable(HOME) > 250000000) {
					buyall(ns);
				}
				await ns.sleep(10000);
			}
		}
		// too expensive
		if (ns.getServerRequiredHackingLevel(targets[i]) > (ns.getHackingLevel() * lvlpercent)) {
			ns.print("Waiting to reach hacking level ", (ns.getServerRequiredHackingLevel(targets[i]) / lvlpercent), " to hack ", targets[i]);
			while (ns.getServerRequiredHackingLevel(targets[i]) > (ns.getHackingLevel() * lvlpercent)) {
				if (ns.getServerMoneyAvailable(HOME) > 5000000000) {
					buyall(ns);
				}
				await ns.sleep(60000);
			}
		}

		// Try to root all targets
		if (!ns.hasRootAccess("deltaone") && ns.fileExists("SQLInject.exe") && !ns.isRunning("root.js")) {
			ns.exec("root.js", HOME)
		}
		// Kill hack.js for foodnstuff
		if (ns.getHackingLevel() > 200) {
			ns.scriptKill("hack.js", HOME);
		}
		// Run hacker.js
		if (!(ns.scriptRunning("start/hacker.js", HOME))) {
			ns.print("Running start/hacker.js");
			ns.exec("start/hacker.js", HOME);
		}		

		// too expensive
		if (ns.getServerMoneyAvailable(HOME) > 5000000000) {
			buyall(ns);
		}
		

		if (ports[i] == "NUKE.exe") {
		} else if (ports[i] == "BruteSSH.exe") {
			// ns.print("Running start/hacknet2.js");
			// ns.scriptKill("start/hacknet2.js", HOME);
			// ns.exec("start/hacknet2.js", HOME, 1, debug);
		} else if (ports[i] == "FTPCrack.exe") {
			ns.print("Running the server purchasing script");
			ns.scriptKill("start/buyservers.js", HOME);
			ns.exec("start/buyservers.js", HOME, 1, 512, "max", false, debug);
		} else if (ports[i] == "RelaySMTP.exe" && ns.stock.has4SDataTIXAPI()) {
			ns.print("Running the stocker script");
			ns.scriptKill("stocks/stocks.js", HOME);
			ns.exec("stocks/stocks.js", HOME, 1);
		}
	}

	await ns.sleep(1000);

	ns.print("Going idle now");
	
	// while loop to check every minute if something should be done
	// (checks if home has more RAM than before)
	while (true) {
		// too expensive
		if (ram != ns.getServerMaxRam(HOME)) {
			if (ns.getServerMoneyAvailable(HOME) >= ns.singularity.getUpgradeHomeRamCost()) {
				ns.singularity.upgradeHomeRam();
			}
		}
		// Run batcher on top 4 targets
		if (!ns.getRunningScript("batch/batcher.js", HOME, "deltaone") && ns.getHackingLevel() > ns.getServerRequiredHackingLevel("deltaone")) {
			ns.print("Running batch/batcher.js");
			ns.exec("batch/batcher.js", HOME, 1, "deltaone");
		}
		if (!ns.getRunningScript("batch/batcher.js", HOME, "zeus-med") && ns.getHackingLevel() > ns.getServerRequiredHackingLevel("deltaone")) {
			ns.print("Running batch/batcher.js");
			ns.exec("batch/batcher.js", HOME, 1, "zeus-med");
		}
		if (!ns.getRunningScript("batch/batcher.js", HOME, "aerocorp") && ns.getHackingLevel() > ns.getServerRequiredHackingLevel("deltaone")) {
			ns.print("Running batch/batcher.js");
			ns.exec("batch/batcher.js", HOME, 1, "aerocorp");
		}
		if (!ns.getRunningScript("batch/batcher.js", HOME, "zb-institute") && ns.getHackingLevel() > ns.getServerRequiredHackingLevel("deltaone")) {
			ns.print("Running batch/batcher.js");
			ns.exec("batch/batcher.js", HOME, 1, "zb-institute");
		}
		if (!ns.fileExists("Formulas.exe") && ns.getServerMoneyAvailable(HOME) > 5000000000) {
			// too expensive
			buyall(ns);
			ns.print("Running the server upgrading script");
			ns.scriptKill("start/buyservers.js", HOME);
			ns.exec("start/buyservers.js", HOME, 1, 2048, "max", true, debug);
		}
		if (ns.serverExists("pserv-00")) {
			if (ns.getPurchasedServerUpgradeCost("pserv-00", ns.getServerMaxRam("pserv-00") * 2) < 1000000000) {
				if (ns.isRunning("start/buyservers.js", HOME, 1, 512, "max", false, debug) || !ns.isRunning("start/buyservers.js", HOME, 1, 2048, "max", true, debug)) {
					ns.scriptKill("start/buyservers.js", HOME);
					ns.exec("start/buyservers.js", HOME, 1, 2048, "max", true, debug);
				}
			}
		}
		if (m < 4) {
			// start backdooring faction servers to get invites
			ns.print("Running milestones.js");
			ns.scriptKill("start/milestones.js", HOME);
			ns.exec("start/milestones.js", HOME);
			m++;
		}
		await ns.sleep(60000);
	}
}

function buyall(ns) {
	// too expensive
	for (let i = 1; i < ports.length; ++i) {
		if (!ns.fileExists(ports[i])) {
			ns.singularity.purchaseProgram(ports[i]);
		}
	}
	if (ns.getServerMoneyAvailable(HOME) > 5000000000) {
		ns.singularity.purchaseProgram("Formulas.exe");
	}
}

/*
	Start.js should continuously check if new .exe files have been made, then re-run root.js when they have been made,
	so that better servers are targeted, servers that will make more money.
*/
