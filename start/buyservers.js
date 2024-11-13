
//	enter ram size, number of servers, upgrade yes or no.


/** @param {NS} ns */
export async function main(ns) {
	const HOME = "home";
	let size = ns.args[0];      // int;  home many GB of ram to buy			standard: 2048
	let number = ns.args[1];    // int;  how many pservs to obtain			standard: "max"
	const upgrade = ns.args[2]; // bool; does it upgrade existing pservs	standard: true
	const debug = ns.args[3];   // bool; does it log what happens			standard: false
	const LIMIT = 64000;     // sets the max on how much ram a pserv can have (64 TB)

	if (size == "--help") {
		ns.tprint("\n 1st arg is the Ram size of the servers; does not do anything if upgrade is true; Mandatory.\n 2nd arg is the number of servers; does not do anything if upgrade is true; default to 24.\n 3rd arg is whether to continously upgrade servers; default to false.\n 4th arg is whether to enable debug logs; default is false.");
		ns.exit();
	}
	if (debug != true) {
		ns.disableLog("getServerMaxRam");
		ns.disableLog("sleep");
		ns.disableLog("getServerMoneyAvailable");
	}
	
	if (size === undefined) {
		ns.print("Arguments for this script are RAM size of the servers, number of servers, and true or false for if existing servers should be upgraded.");
		ns.exit();
	} else if (Math.log2(size) % 1 != 0) {
		ns.print("The RAM size must be a power of two.");
		ns.exit();
	} else if (number === undefined) {
		number = 1;
	} if (number > 25 || number == "max") {
		number = 25;
		ns.print("The Maximum number of servers is 25. Reverting to 25 servers");
	}

	if (upgrade) {
		const homeram = ns.getServerMaxRam(HOME);
		let fullservs = 0;
		while (fullservs < 24) {
			// start a for loop that goes through each server name
			for (let i = 0; i < number; i++) {
				// set the server name
				let serv;
				if (i < 10) {
					serv = "pserv-0" + i;
				} else {
					serv = "pserv-" + i;
				}
				// check if the server already exists, if it does, upgrade it up to 1/2 of home
				if (ns.serverExists(serv)) {
					let servram = ns.getServerMaxRam(serv);
					// upgrading until server ram is 1/2 home ram
					if (servram < LIMIT) {
						// wait to upgrade the server until we have enough money
						if (ns.getPurchasedServerUpgradeCost(serv, servram * 2) > ns.getServerMoneyAvailable(HOME)) {
								ns.print("Not enough money yet to upgrade ", serv);
								ns.print("Need ", ns.getPurchasedServerUpgradeCost(serv, servram * 2), " to upgrade ", serv);
							while (ns.getPurchasedServerUpgradeCost(serv, servram * 2) > ns.getServerMoneyAvailable(HOME)) {
								await ns.sleep(60000);
							}
						}
						ns.print("Upgrading ", serv, " from ", servram, " to ", servram * 2);
						ns.upgradePurchasedServer(serv, servram * 2);
					}
				} else {
					// wait to buy the server until we have enough money
					while (ns.getPurchasedServerCost(size) > ns.getServerMoneyAvailable(HOME)) {
						ns.print("Not enough money yet for new server.");
						await ns.sleep(60000);
					}
					// buy the server (root.js will take care of hacking)
					ns.purchaseServer(serv, size);
				}
			}
			for (let i = 0; i < number; i++) {
				// set the server name
				let serv = "pserv-" + i;
				// check if the server already exists, if it does, see if it is upgraded
				if (ns.serverExists(serv)) {
					let servram = ns.getServerMaxRam(serv);
					// counting how many servers are fully upgraded
					if (servram >= LIMIT) {
						fullservs++;
					} else {
						fullservs = 0;
						break;
					}
				}
			}
			await ns.sleep(100);
		}
		ns.print("All servers fully upgraded");
	} else {
		// start a for loop that goes through each server name
		for (let i = 0; i < number; i++) {
			// set the server name
			let serv;
			if (i < 10) {
				serv = "pserv-0" + i;
			} else {
				serv = "pserv-" + i;
			}
			// check if the server already exists, if it does, skip it
			for (let j = 0; j < 24 && ns.serverExists(serv); j++) {
				if ((i + j) < 10) {
					serv = "pserv-0" + (i + j);
				} else {
					serv = "pserv-" + (i + j);
				}
				if ((i + j) >= 24) {
					ns.print("Maximum amount of purchased servers acquired.");
					ns.exit();
				}
			}
			// wait to buy the server until we have enough money
			while (ns.getPurchasedServerCost(size) > ns.getServerMoneyAvailable(HOME)) {
				ns.print("Not enough money yet for new server.");
				await ns.sleep(60000);
			}
			// buy the server (root.js will take care of hacking)
			ns.purchaseServer(serv, size);
		}
	}
	
	if (debug == true) {
		ns.print("Debug time!");
		await ns.sleep(60000);
	}
}


//	enter ram size, number of servers, upgrade yes or no.
//	auto copy and exec hack.js at maximum threads