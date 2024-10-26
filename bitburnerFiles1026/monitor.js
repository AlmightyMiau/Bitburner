import { setOfObjects } from "/batch/batcher.js"

// Monitors the specified server, process, or the player's cash
// [Server] monitors the server's security level and available cash
// "money" or "cash" does nothing :3
// "batcher" displays the maximum cash for the servers found in Arr, rounded to multiples of 1 billion


/** @param {NS} ns */
export async function main(ns) {
	ns.tail();

	ns.disableLog("ALL");

	const target = ns.args[0];

	if (target === undefined) {
		ns.print("No target specified\nExiting...");
		ns.exit();
	}

	if (target == "deltaone") {

		// let server = ns.getServer();
		while (true) {
			ns.clearLog();
			
			ns.print("Security: ", Math.round(ns.getServerSecurityLevel(target)), " / ", ns.getServerMinSecurityLevel(target));
			ns.print("Money: ", Math.round(ns.getServerMoneyAvailable(target)), " / ", Math.round(ns.getServerMaxMoney(target)));
			await ns.sleep(500);
		}
	} else if (target == "money" || target == "cash") {
		let last = ns.getPlayer().money;
		await ns.sleep(1000);
		let total = ns.getPlayer().money;
		while (true) {
			ns.clearLog();
			
			await ns.sleep(1000);
		}
	} else if (target == "batcher") {
		while (true) {
			ns.clearLog();
			let arr = [
				'zb-institute',
				'galactic-cyber',
				'aerocorp',
				'omnia',
				'deltaone',
				'taiyang-digital',
				'icarus',
				'zeus-med',
				'infocomm',
				'solaris',
				'defcomm'
			];
			for (let i = 0; i < arr.length; i++) {
				ns.print(arr[i], ": ", (ns.getServerMaxMoney(arr[i]) / 1e9).toFixed(3));
			}
			await ns.sleep(1000);
		}
	}
}