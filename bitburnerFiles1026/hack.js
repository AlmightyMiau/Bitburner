/** @param {NS} ns */
export async function main(ns) {
	// What server will be targeted?
	let target = ns.args[0];
	if (target === undefined) {
		target = "iron-gym";
	} else if (target == "help") {
		ns.tprint("\n1st arg is target server to hack.\n2nd arg is boolean to enable debug Logs.\n");
		ns.exit();
	}

    let debug = ns.args[1];
	if (debug == true) {
		ns.enableLog("weaken");
		ns.enableLog("grow");
		ns.enableLog("hack");
		ns.enableLog("getServerSecurityLevel");
		ns.enableLog("getServerMoneyAvailable");
		ns.enableLog("getServerMaxMoney");
		ns.enableLog("getServerMinSecurityLevel");
	} else {
		ns.disableLog("weaken");
		ns.disableLog("grow");
		ns.disableLog("hack");
		ns.disableLog("getServerSecurityLevel");
		ns.disableLog("getServerMoneyAvailable");
		ns.disableLog("getServerMaxMoney");
		ns.disableLog("getServerMinSecurityLevel");
	}


	//How much money does target have?
	const moneyThresh = ns.getServerMaxMoney(target);

	// When do we start hacking?
	const securityThresh = ns.getServerMinSecurityLevel(target);

	// Infinite loop that continously hacks/grows/weakens the target server
	while (true) {
		if (ns.getServerSecurityLevel(target) > (securityThresh + 2)) {
			// If the server's security level is above our threshold, weaken it
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			// If the server's money is less than our threshold, grow it
			await ns.grow(target);
		} else {
			// Otherwise, hack it
			await ns.hack(target);
		}
	}
}