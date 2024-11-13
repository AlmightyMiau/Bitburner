let growhost = ["home"]; // Initialize the growhost array -- Include "home" if you want to grow servers from home as well as pservs
let targets;
let full = false;
let grown = [];
let running = [];
const debug = false; // True to print debugging logs
let hostmax = 25; // Set the maximum number of hosts -- Useful for changing between using home and not

/** @param {NS} ns */
export async function main(ns) {
	const hackram = ns.getScriptRam("temphack.js");
	const growram = ns.getScriptRam("tempgrow.js");
	if (ns.args[0] == "-f") {
		full = true;
	}

	ns.tail();
	ns.moveTail(1075, 350);
	ns.resizeTail(300, 200);

	ns.tail();
	if (!debug) {ns.disableLog("ALL")}
	if (debug) {ns.disableLog("sleep")}

	targets = Array(ns.read("moneyServers.txt"))[0].split("\n");
	
	if (debug) {ns.print("Line 27")}
	for (let i = targets.length - 1; i >= 0; i--) {
		if (ns.getRunningScript("temphack.js", "home", targets[i], true)) {
			ns.print("Already running ", targets[i]);
			running.push(targets[i]);
		}
		await ns.sleep(100);
	}
	
	gethosts(ns);

	if (debug) {ns.print("Line 38")}
	// if (growhost.length < 5) {
	// 	ns.print("waiting for pservs");
	// 	while (growhost.length < 5) {
	// 		gethosts(ns);
	// 		await ns.sleep(1000);
	// 	}
	// 	ns.print("done waiting for pservs");
	// }
	
	if (debug) {ns.print("Line 48")}
	let m = false;
	if (growhost.length == 1 || growhost.length == 0) {
		ns.print("Growhost length:", growhost.length);
		ns.exec("hack.js", "home", Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam("hack.js")), "foodnstuff", true);
		m = true;
	}

	if (debug) {ns.print("Line 56")}
	if (m == true) {
		ns.kill("hack.js", "home", "foodnstuff", true);
	}

	// Wait until we have FTPCrack.exe
	// if (!ns.fileExists("FTPCrack.exe")) {
	// 	ns.print("Waiting for FTPCrack.exe");
	// 	while (!ns.fileExists("FTPCrack.exe")) {
	// 		await ns.sleep(6000);
	// 	}
	// }
	
	// Main Loop
	let n = 0;
	while (n < targets.length) {
		if (debug) {ns.print("Beginning of loop")}
		n = 0;

		// Check for new pserv's
		if (growhost.length < 25) {
			gethosts(ns);
		}

		// correct grown[] by reseting and counting all that are currently being grown
		// so that they can be hacked afterward
		grown = [];
		if (debug) {ns.print("Before first for loop"); ns.print("Growhost length: ", growhost.length); ns.print("Targets length: ", targets.length)}
		for (let i = 0; i < growhost.length; i++) {
			for (let j = 0; j < targets.length; j++) {
				if (debug) {ns.clearLog(); ns.print("Checking grown  ", i, ":", j)}
				if (ns.getRunningScript("tempgrow.js", growhost[i], targets[j])) {
					grown.push(targets[j]);
				}
				await ns.sleep(10);
			}
			await ns.sleep(100);
		}

		running = [];
		if (debug) {ns.print("Before second for loop")}
		for (let i = targets.length - 1; i >= 0; i--) {
			if (ns.getRunningScript("temphack.js", "home", targets[i], true)) {
				ns.print("Already running ", targets[i]);
				running.push(targets[i]);
			}
			await ns.sleep(100);
		}

		
		if (debug) {ns.print("Targets: ");ns.print(targets);ns.print("Before third for loop")}
		for (let i = targets.length - 1; i >= 0; i--) { // for every target, going backwards from most to least money
		// for (let i = 0; i < targets.length; i++) { // for every target, going backwards from most to least money
			if (!grown.includes(targets[i]) && !running.includes(targets[i])) { // not running or grown
				// ns.print("Don't have ", targets[i], " running");
				let hacklevel = ns.getHackingLevel() * 0.9; // get the player's hacking level
				if (hacklevel >= ns.getServerRequiredHackingLevel(targets[i])) { // when the target is hackable
					if (!ns.hasRootAccess(targets[i])) { // if we don't have access
						ns.print(i + 1, ": ", targets[i], "\n");
						ns.brutessh(targets[i]);
						try {
							ns.ftpcrack(targets[i]);
							ns.relaysmtp(targets[i]);
							ns.httpworm(targets[i]);
							ns.sqlinject(targets[i]);
						} catch {}
						try {
							ns.nuke(targets[i]);
							ns.print("Gained root access to ", targets[i]);
						} catch {
							continue;
						}
					}
					if (ns.getServerMoneyAvailable(targets[i]) != ns.getServerMaxMoney(targets[i])) { // if it needs to be grown
						let host = ghost(ns);
						ns.print("Host: ", host);
						if (!ns.getRunningScript("tempgrow.js", host, targets[i])) {
							ns.print("Host: ", host);
							let threads = growthreads(ns, targets[i]);
							if (threads * growram > netram(ns, host)) {
								threads = Math.floor(netram(ns, host) / growram);
							}
							ns.print("Host: ", host);
							if (threads > 0) {
								ns.print("Growing ", targets[i]);
								ns.exec("tempgrow.js", host, threads, targets[i]);
								grown.push(targets[i]);
								break;
							}
						}
					} else { // if it can now be hacked
						let threads = hackthreads(ns, targets[i]);
						let host = "home"
						if (threads * hackram < netram(ns, host)) {
							if (threads > 0) {
								ns.print("Threads for: ", targets[i], ", ", hackthreads(ns, targets[i]), "\n");
								ns.exec("temphack.js", "home", threads, targets[i], true);
								running.push(targets[i]);
							}
						} else {
							host = ghost(ns);
							if (threads * hackram > netram(ns, host)) {
								threads = Math.floor(netram(ns, host) / hackram);
							}
							if (threads > 0) {
								ns.exec("temphack.js", host, threads, targets[i], true);
								running.push(targets[i]);
							}
						}
					}
				}
			}
			await ns.sleep(100);
		}
		if (debug) {ns.print("End of loop")}
		display(ns);
		await ns.sleep(100);
	}
	ns.tprint("All targets grown and being hacked");
}

function netram(ns, serv) {
	ns.print("netram");
	return ns.getServerMaxRam(serv) - ns.getServerUsedRam(serv);
}

// Finds the minimum number of threads to hack a target server
function hackthreads(ns, serv) {
	ns.print("hackthreads");
	try {
		return Math.ceil(1 / (ns.formulas.hacking.hackPercent(ns.getServer(serv), ns.getPlayer())));
	} catch {
		return 1000
	}
}

function ghost(ns) {
	ns.print("ghosts");
	for (let i = 0; i < growhost.length; i++) {
		if (ns.getServerUsedRam(growhost[i]) == 0) {
			return growhost[i];
		}
	}
	for (let i = 0; i < growhost.length; i++) {
		if (netram(ns, growhost[i]) > 2000) {
			return growhost[i];
		}
	}
	return growhost[0];
}

function growthreads(ns, serv) {
	ns.print("growthreads");
	try {
		return Math.max(
			(ns.formulas.hacking.growThreads(ns.getServer(serv), ns.getPlayer(), ns.getServerMaxMoney(serv))) * 2,
			Math.ceil((ns.getServerSecurityLevel(serv) - ns.getServerMinSecurityLevel(serv)) / 0.05)
		);
	} catch {
		return 500;
	}
}

function gethosts (ns) {
	ns.print("gethosts");
	for (let s = growhost.length - 1; s < 25; s++) {
		if (s < 10) {
			if (ns.serverExists("pserv-0" + s) && !growhost.includes("pserv-0" + s)) {
				growhost.push("pserv-0" + s);
				ns.scp("tempgrow.js", growhost[growhost.length - 1]);
				ns.scp("temphack.js", growhost[growhost.length - 1]);
			}
		} else {
			if (ns.serverExists("pserv-" + s) && !growhost.includes("pserv-" + s)) {
				growhost.push("pserv-" + s);
				ns.scp("tempgrow.js", growhost[growhost.length - 1]);
				ns.scp("temphack.js", growhost[growhost.length - 1]);
			}
		}
	}
}

function display(ns) {
	ns.clearLog();
	for (let i = 0; i < targets.length; i++) {
		if (ns.getRunningScript("temphack.js", "home", targets[i], true)) {
			ns.print(targets[i], ": Running\n");
		} else if (full == true) {
			ns.print(targets[i], ": Idle\n");
		} else {
			for (let j = 0; j < growhost.length; j++) {
				if (ns.getRunningScript("tempgrow.js", growhost[j], targets[i])) {
					ns.print(targets[i], ": Growing\n");
					break;
				}
			}
		}
	}
	ns.print("Growhosts: ", growhost.length);
}